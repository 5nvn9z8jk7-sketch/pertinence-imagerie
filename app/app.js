(() => {
  "use strict";
  const $view = document.getElementById("view");
  const $print = document.getElementById("printArea");

  // Examen demandé par défaut pour chaque arbre (utilisé si le prescripteur maintient sa demande)
  EXAMS.RX_SINUS = { label: "Radiographie des sinus / du massif facial", irm: false };
  const TREE_EXAM = { RX_LOMB: "RX_LOMB", RX_CRANE: "RX_CRANE", RX_SINUS: "RX_SINUS", RX_THORAX: "RX_THORAX", ASP: "ASP", RX_GENOU: "RX_GENOU", IRM_GENOU: "IRM_GENOU" };
  const ORDER = ["CEPH_AD", "CEPH_ENF", "TC_AD", "RX_CRANE", "RX_SINUS", "THYRO", "RX_LOMB", "CERV", "EPAULE", "HANCHE", "POIGNET", "RX_GENOU", "IRM_GENOU", "CHEVILLE", "RX_THORAX", "ABDO", "APPENDICITE", "APPENDICITE_ENF", "PELVIS", "ASP", "COLIQUE", "TVP", "SEIN", "OSTEO", "POUMON"];
  const GROUP_ORDER = ["Tête et cou", "Rachis", "Membres", "Thorax", "Abdomen et vaisseaux", "Os et dépistages"];

  // État en mémoire uniquement (aucune donnée patient conservée)
  let state = { tree: null, node: null, history: [], answers: [], clin: [] };
  let prescriber = { nom: "", spec: "", rpps: "", adresse: "" };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const itemLabel = (it) => (typeof it === "string" ? it : it.label);
  const isUrgent = (it) => typeof it === "object" && it.urgent;
  const top = () => window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  // ───────────── Accueil
  function renderHome(filter) {
    state = { tree: null, node: null, history: [], answers: [], clin: [] };
    const q = (filter || "").trim().toLowerCase();
    const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const groups = {};
    ORDER.forEach((id) => {
      const t = TREES[id];
      if (q && !norm(t.title + " " + t.context + " " + t.group).includes(norm(q))) return;
      (groups[t.group] = groups[t.group] || []).push(id);
    });
    const ordered = GROUP_ORDER.filter((g) => groups[g]);
    $view.innerHTML = `
      <p class="eyebrow">Aide à la prescription</p>
      <h1>Quelle situation clinique ?</h1>
      <p class="lead">Choisissez la situation ou l'examen envisagé. Quelques questions suffisent pour savoir si une imagerie est recommandée, laquelle, puis préparer la demande à imprimer.</p>
      <div class="search"><label for="q" class="sr">Rechercher</label>
        <input type="search" id="q" placeholder="Rechercher : genou, IRM, thyroïde, céphalée…" value="${esc(filter || "")}" autocomplete="off"></div>
      ${ordered.length ? ordered.map((g) => `
        <section class="group" aria-label="${esc(g)}">
          <h3>${esc(g)}</h3>
          <div class="cards">${groups[g].map((id) => `
            <button class="card" type="button" data-tree="${id}">
              <strong>${esc(TREES[id].title)}</strong><span>${esc(TREES[id].context)}</span>
            </button>`).join("")}
          </div>
        </section>`).join("") : `<p class="empty">Aucune situation ne correspond à « ${esc(filter)} ». Essayez un autre mot, ou consultez <a href="https://aderim.radiologie.fr" target="_blank" rel="noopener">ADERIM</a>.</p>`}`;
    $view.querySelectorAll("[data-tree]").forEach((b) => b.addEventListener("click", () => startTree(b.dataset.tree)));
    const inp = document.getElementById("q");
    inp.addEventListener("input", () => { const v = inp.value; renderHome(v); const n = document.getElementById("q"); n.focus(); n.setSelectionRange(v.length, v.length); });
    if (!filter) top();
  }

  function startTree(id) {
    state = { tree: id, node: TREES[id].start, history: [], answers: [], clin: [] };
    renderNode();
  }

  function go(next, answerText, clinText) {
    state.history.push({ node: state.node, answersLen: state.answers.length, clinLen: state.clin.length });
    if (answerText) state.answers.push(answerText);
    if (clinText) state.clin.push(clinText);
    state.node = next;
    renderNode();
  }

  function back() {
    if (!state.history.length) return renderHome();
    const h = state.history.pop();
    state.node = h.node;
    state.answers = state.answers.slice(0, h.answersLen);
    state.clin = state.clin.slice(0, h.clinLen);
    renderNode();
  }

  function crumbs() {
    if (!state.answers.length) return "";
    return `<ul class="crumbs" aria-label="Réponses précédentes">${state.answers.map((a) => `<li title="${esc(a)}">${esc(a)}</li>`).join("")}</ul>`;
  }

  // ───────────── Questions
  function renderNode() {
    const tree = TREES[state.tree];
    const n = tree.nodes[state.node];
    if (n.type === "result") return renderResult(n);
    let body = "";
    if (n.type === "question") {
      body = `<div class="options" role="group" aria-label="Réponses">${n.options.map((o, i) => `<button class="opt" type="button" data-i="${i}">${esc(o.label)}</button>`).join("")}</div>`;
    } else if (n.type === "checklist") {
      let k = 0;
      body = `<form id="chkForm">${n.groups.map((g) => `
          <fieldset><legend>${esc(g.title)}</legend>
          ${g.items.map((it) => `<label class="chk"><input type="checkbox" name="c" value="${k}" data-urgent="${isUrgent(it) ? 1 : 0}" data-label="${esc(itemLabel(it))}" data-i="${k++}"><span>${esc(itemLabel(it))}</span></label>`).join("")}
          </fieldset>`).join("")}
        <div class="row-actions" style="margin-top:var(--space-4)">
          <button class="btn btn-ghost" type="button" id="noneBtn">Aucun de ces éléments</button>
          <button class="btn btn-primary" type="submit">Valider la sélection</button>
        </div>
        <p class="err" id="chkErr" hidden>Cochez au moins un élément, ou choisissez « Aucun de ces éléments ».</p>
      </form>`;
    }
    $view.innerHTML = `
      <p class="eyebrow">${esc(tree.title)} · ${esc(tree.context)}</p>
      <div class="panel">
        ${crumbs()}
        <p class="q-title" id="qt">${esc(n.text)}</p>
        ${n.help ? `<p class="help">${esc(n.help)}</p>` : ""}
        ${body}
        <div class="row-actions">
          <button class="btn btn-link" type="button" id="backBtn">← ${state.history.length ? "Question précédente" : "Changer d'examen"}</button>
          <button class="btn btn-link" type="button" id="restartBtn">Recommencer</button>
        </div>
      </div>`;
    document.getElementById("backBtn").onclick = back;
    document.getElementById("restartBtn").onclick = () => renderHome();
    if (n.type === "question") {
      $view.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
        const i = +b.dataset.i, o = n.options[i];
        const c = CLIN[state.tree + "." + state.node];
        go(o.next, o.label, Array.isArray(c) ? c[i] : o.label);
      }));
    } else {
      const f = document.getElementById("chkForm");
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const checked = [...f.querySelectorAll("input:checked")];
        if (!checked.length) { document.getElementById("chkErr").hidden = false; return; }
        const urgent = checked.some((c) => c.dataset.urgent === "1");
        const labels = checked.map((c) => c.dataset.label);
        const next = urgent && n.anyUrgent ? n.anyUrgent : n.any;
        const c = CLIN[state.tree + "." + state.node];
        go(next, labels.join(" ; "), (c ? c.any : "") + labels.join(" ; "));
      });
      document.getElementById("noneBtn").addEventListener("click", () => {
        const c = CLIN[state.tree + "." + state.node];
        go(n.none, "Aucun : " + n.groups.map((g) => g.title).join(", "), c ? c.none : "");
      });
    }
    top();
    document.getElementById("qt").focus?.();
  }

  // ───────────── Résultat
  const VERDICT = {
    ok: { cls: "v-ok", tag: "Pertinent" },
    no: { cls: "v-no", tag: "Non pertinent" },
    discuss: { cls: "v-discuss", tag: "À discuter" },
    urgent: { cls: "v-urgent", tag: "Urgence" }
  };

  function srcList(ids) {
    return `<ul class="srcs">${ids.map((id) => `<li><a href="${SOURCES[id].url}" target="_blank" rel="noopener">${esc(SOURCES[id].label)}</a></li>`).join("")}</ul>`;
  }

  function renderResult(n) {
    const tree = TREES[state.tree];
    const v = VERDICT[n.verdict];
    const reqList = tree.requestable || (TREE_EXAM[state.tree] ? [TREE_EXAM[state.tree]] : []);
    let actions = "";
    if (n.exam) {
      actions += `<button class="btn btn-primary" type="button" data-act="exam">Rédiger la demande : ${esc(shortLabel(n.exam))}</button>`;
    }
    if (n.goto) actions += `<button class="btn btn-primary" type="button" data-act="goto">Ouvrir le parcours : ${esc(TREES[n.goto].title)}</button>`;
    (n.exams || []).forEach((id, i) => {
      actions += `<button class="btn ${i === 0 ? "btn-primary" : "btn-ghost"}" type="button" data-act="exams" data-ex="${id}">Rédiger la demande : ${esc(shortLabel(id))}</button>`;
    });
    if (n.alt) {
      actions += `<button class="btn btn-primary" type="button" data-act="alt">Prescrire à la place : ${esc(shortLabel(n.alt))}</button>`;
    }
    const canOverride = (n.verdict === "no" || n.verdict === "discuss") && !n.exam && !n.exams && !n.goto && reqList.length > 0;
    $view.innerHTML = `
      <p class="eyebrow">${esc(tree.title)} · Résultat</p>
      <div class="panel">
        ${crumbs()}
        <div class="verdict ${v.cls}" role="status">
          <span class="tag">${v.tag}</span>
          <h2>${esc(n.title)}</h2>
          <p>${esc(n.text)}</p>
          ${srcList(n.sources)}
        </div>
        <div class="actions-col">${actions}</div>
        ${canOverride ? `
        <details class="override">
          <summary class="btn btn-link">Je souhaite quand même prescrire un examen</summary>
          ${reqList.length > 1 ? `<div class="field" style="margin-top:var(--space-4)"><label for="reqSel">Examen</label>
            <select id="reqSel">${reqList.map((id) => `<option value="${id}">${esc(EXAMS[id].label)}</option>`).join("")}</select></div>` : (reqList.length ? `<p class="exam-box" style="margin-top:var(--space-4)">${esc(EXAMS[reqList[0]].label)}</p>` : "")}
          <div class="field" style="margin-top:var(--space-4)">
            <label for="just">Justification clinique (obligatoire)</label>
            <span class="hint">La demande portera la mention « hors recommandation ». Le radiologue pourra la réévaluer avec vous.</span>
            <textarea id="just" placeholder="Ex. : contexte particulier, élément clinique non couvert par l'outil…"></textarea>
            <p class="err" id="justErr" hidden>Merci de préciser la justification.</p>
          </div>
          <button class="btn btn-ghost" type="button" data-act="override">Rédiger la demande hors recommandation</button>
        </details>` : ""}
        <div class="row-actions">
          <button class="btn btn-link" type="button" id="backBtn">← Question précédente</button>
          <button class="btn btn-link" type="button" id="restartBtn">Nouvel examen</button>
        </div>
      </div>`;
    document.getElementById("backBtn").onclick = back;
    document.getElementById("restartBtn").onclick = () => renderHome();
    const conf = { verdict: n.verdict, title: n.title, sources: n.sources };
    $view.querySelector('[data-act="exam"]')?.addEventListener("click", () => renderForm(n.exam, conf, null));
    $view.querySelector('[data-act="goto"]')?.addEventListener("click", () => startTree(n.goto));
    $view.querySelectorAll('[data-act="exams"]').forEach((b) => b.addEventListener("click", () => renderForm(b.dataset.ex, conf, null)));
    $view.querySelector('[data-act="alt"]')?.addEventListener("click", () => renderForm(n.alt, { verdict: "ok", title: "Alternative recommandée : " + n.title, sources: n.sources }, null));
    $view.querySelector('[data-act="override"]')?.addEventListener("click", () => {
      const j = document.getElementById("just").value.trim();
      if (!j) { document.getElementById("justErr").hidden = false; return; }
      const chosen = document.getElementById("reqSel")?.value || reqList[0];
      renderForm(chosen, { verdict: "override", title: n.title, sources: n.sources }, j);
    });
    top();
  }

  function shortLabel(id) {
    const l = EXAMS[id].label;
    const cut = l.split(" (")[0].split(" – ")[0];
    return cut;
  }

  // ───────────── Formulaire de demande
  function renderForm(examId, conf, justification) {
    const ex = EXAMS[examId];
    const today = new Date().toISOString().slice(0, 10);
    const clin = state.clin.join("\n");
    $view.innerHTML = `
      <p class="eyebrow">Demande d'examen</p>
      <h1>Compléter la demande</h1>
      <p class="lead">Les renseignements cliniques sont pré-remplis à partir de vos réponses ; vous pouvez les modifier. Rien n'est enregistré ni transmis.</p>
      <form class="panel" id="reqForm" novalidate>
        <div class="exam-box">${esc(ex.label)}</div>

        ${ex.cote || ex.genou ? `
        <div class="field"><span class="lbl">Côté</span>
          <div class="seg" role="radiogroup">
            ${["Droit", "Gauche", "Bilatéral"].map((c, i) => `<label><input type="radio" name="cote" value="${c}" ${(ex.genou ? i === 2 : i === 0) ? "checked" : ""}> ${c}</label>`).join("")}
          </div>
          ${ex.genou ? `<span class="hint">Clichés bilatéraux recommandés pour le premier bilan (HAS 2022).</span>` : ""}
        </div>` : ""}

        ${ex.incidences ? `
        <div class="field"><span class="lbl">Incidences</span>
          <label class="chk"><input type="checkbox" checked disabled> <span>Face et profil en charge (minimum)</span></label>
          <label class="chk"><input type="checkbox" name="inc" value="Défilé fémoro-patellaire à 30°"> <span>Défilé fémoro-patellaire à 30° (suspicion d'atteinte fémoro-patellaire)</span></label>
          <label class="chk"><input type="checkbox" name="inc" value="Schuss"> <span>Schuss (suspicion d'arthrose fémoro-tibiale)</span></label>
        </div>` : ""}

        <p class="section-t">Renseignements cliniques</p>
        <div class="field"><label for="clin">Contexte clinique</label>
          <textarea id="clin" rows="4">${esc(clin)}</textarea></div>
        <div class="field"><label for="qpos">Question posée / diagnostic évoqué</label>
          <textarea id="qpos" rows="2" placeholder="Ex. : diagnostic suspecté, élément à confirmer ou éliminer"></textarea></div>

        <div class="field"><span class="lbl">Contre-indications et précautions</span>
          ${(ex.irm ? ["Stimulateur ou défibrillateur cardiaque", "Implant ou neurostimulateur", "Corps étranger métallique (notamment intra-oculaire)", "Claustrophobie", "Grossesse possible", "Insuffisance rénale connue"] : ["Grossesse possible"]).map((c) => `<label class="chk"><input type="checkbox" name="ci" value="${esc(c)}"> <span>${esc(c)}</span></label>`).join("")}
        </div>

        <p class="section-t">Patient</p>
        <div class="grid2">
          <div class="field"><label for="pnom">Nom</label><input type="text" id="pnom" autocomplete="off"></div>
          <div class="field"><label for="pprenom">Prénom</label><input type="text" id="pprenom" autocomplete="off"></div>
        </div>
        <div class="grid2">
          <div class="field"><label for="pddn">Date de naissance</label><input type="date" id="pddn"></div>
          <div class="field"><label for="ddate">Date de la demande</label><input type="date" id="ddate" value="${today}"></div>
        </div>

        <p class="section-t">Prescripteur</p>
        <div class="grid2">
          <div class="field"><label for="mnom">Nom du médecin</label><input type="text" id="mnom" value="${esc(prescriber.nom)}" placeholder="Dr …"></div>
          <div class="field"><label for="mspec">Spécialité</label><input type="text" id="mspec" value="${esc(prescriber.spec)}" placeholder="Médecine générale"></div>
        </div>
        <div class="grid2">
          <div class="field"><label for="mrpps">N° RPPS</label><input type="text" id="mrpps" inputmode="numeric" value="${esc(prescriber.rpps)}"></div>
          <div class="field"><label for="madr">Adresse / téléphone</label><input type="text" id="madr" value="${esc(prescriber.adresse)}"></div>
        </div>
        <p class="note">Les informations du prescripteur sont conservées le temps de la session pour enchaîner les demandes. Les données patient ne sont jamais conservées.</p>

        <div class="row-actions">
          <button class="btn btn-link" type="button" id="backRes">← Retour au résultat</button>
          <button class="btn btn-primary" type="submit">Aperçu de la demande</button>
        </div>
      </form>`;
    document.getElementById("backRes").onclick = () => renderNode();
    document.getElementById("reqForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const g = (id) => document.getElementById(id)?.value.trim() || "";
      prescriber = { nom: g("mnom"), spec: g("mspec"), rpps: g("mrpps"), adresse: g("madr") };
      const data = {
        exam: ex.label,
        cote: document.querySelector('input[name="cote"]:checked')?.value || "",
        inc: ex.incidences ? ["Face et profil en charge", ...[...document.querySelectorAll('input[name="inc"]:checked')].map((i) => i.value)] : [],
        clin: g("clin"), qpos: g("qpos"),
        ci: [...document.querySelectorAll('input[name="ci"]:checked')].map((i) => i.value),
        pnom: g("pnom"), pprenom: g("pprenom"), pddn: g("pddn"), date: g("ddate"),
        presc: { ...prescriber }, conf, justification
      };
      renderPreview(data, examId, conf, justification);
    });
    top();
  }

  const frDate = (iso) => (iso ? iso.split("-").reverse().join("/") : "");

  function confText(d) {
    if (d.conf.verdict === "override") return { off: true, txt: "Demande hors recommandation. Justification du prescripteur : " + d.justification };
    if (d.conf.verdict === "discuss") return { off: false, txt: "Indication à discuter avec le radiologue ou le spécialiste, selon : " + d.conf.sources.map((s) => SOURCES[s].label).join(" ; ") + "." };
    return { off: false, txt: "Demande conforme aux recommandations : " + d.conf.sources.map((s) => SOURCES[s].label).join(" ; ") + "." };
  }

  function docHTML(d) {
    const c = confText(d);
    return `<article class="doc">
      <h2>Demande d'examen d'imagerie médicale</h2>
      <div class="d-head">
        <div><div class="d-lbl">Prescripteur</div>
          <p><strong>${esc(d.presc.nom || "……………………")}</strong>${d.presc.spec ? "\n" + esc(d.presc.spec) : ""}${d.presc.rpps ? "\nRPPS : " + esc(d.presc.rpps) : ""}${d.presc.adresse ? "\n" + esc(d.presc.adresse) : ""}</p></div>
        <div><div class="d-lbl">Patient</div>
          <p><strong>${esc((d.pnom || "……………").toUpperCase())} ${esc(d.pprenom)}</strong>${d.pddn ? "\nNé(e) le " + frDate(d.pddn) : ""}</p>
          <div class="d-lbl">Date</div><p>${frDate(d.date)}</p></div>
      </div>
      <div class="d-lbl">Examen demandé</div>
      <div class="d-exam">${esc(d.exam)}${d.cote ? " — côté : " + esc(d.cote.toLowerCase()) : ""}</div>
      ${d.inc.length ? `<div class="d-lbl">Incidences</div><p>${esc(d.inc.join(" ; "))}</p>` : ""}
      <div class="d-lbl">Renseignements cliniques</div><p>${esc(d.clin || "—")}</p>
      <div class="d-lbl">Question posée / diagnostic évoqué</div><p>${esc(d.qpos || "—")}</p>
      <div class="d-lbl">Contre-indications / précautions signalées</div><p>${esc(d.ci.length ? d.ci.join(" ; ") : "Aucune signalée")}</p>
      <div class="d-conf ${c.off ? "off" : ""}">${esc(c.txt)}</div>
      <div class="d-sign"><div>Signature et cachet du prescripteur</div></div>
      <div class="d-foot">Le radiologue peut adapter l'examen demandé en fonction du contexte clinique. Document généré par un outil d'aide à la pertinence des demandes d'imagerie.</div>
    </article>`;
  }

  function renderPreview(d, examId, conf, justification) {
    $view.innerHTML = `
      <p class="eyebrow">Demande d'examen</p>
      <h1>Aperçu</h1>
      <p class="lead">Vérifiez la demande, puis téléchargez-la en PDF ou imprimez-la. Elle doit être signée par le prescripteur.</p>
      ${docHTML(d)}
      <div class="row-actions">
        <button class="btn btn-link" type="button" id="editBtn">← Modifier</button>
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap">
          <button class="btn btn-ghost" type="button" id="printBtn">Imprimer</button>
          <button class="btn btn-primary" type="button" id="pdfBtn">Télécharger le PDF</button>
        </div>
      </div>
      <p class="err" id="pdfErr" hidden></p>
      <div class="row-actions" style="justify-content:flex-start"><button class="btn btn-link" type="button" id="newBtn">Nouvelle demande</button></div>`;
    document.getElementById("editBtn").onclick = () => renderForm(examId, conf, justification);
    document.getElementById("newBtn").onclick = () => renderHome();
    document.getElementById("printBtn").onclick = () => { $print.innerHTML = docHTML(d); window.print(); };
    document.getElementById("pdfBtn").onclick = () => downloadPDF(d);
    top();
  }

  // ───────────── PDF (jsPDF, polices standard)
  function pdfSafe(s) { return String(s || "").replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/[–—]/g, "-").replace(/…/g, "...").replace(/±/g, "+/-").replace(/[’]/g, "'"); }

  function downloadPDF(d) {
    const errEl = document.getElementById("pdfErr");
    if (!window.jspdf) { errEl.hidden = false; errEl.textContent = "Le module PDF n'a pas pu être chargé. Utilisez le bouton Imprimer (choisir « Enregistrer en PDF »)."; return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setProperties({ title: "Demande d'examen d'imagerie", author: "Perplexity Computer" });
    const L = 18, W = 174; let y = 20;
    const line = (txt, size = 10.5, style = "normal", gap = 1.5) => {
      doc.setFont("helvetica", style); doc.setFontSize(size);
      const lines = doc.splitTextToSize(pdfSafe(txt), W);
      lines.forEach((l) => { if (y > 280) { doc.addPage(); y = 20; } doc.text(l, L, y); y += size * 0.42; });
      y += gap;
    };
    const lbl = (t) => { y += 2.5; doc.setTextColor(90); line(t.toUpperCase(), 8.5, "bold", 0.8); doc.setTextColor(0); };

    doc.setFont("helvetica", "bold"); doc.setFontSize(15);
    doc.text(pdfSafe("DEMANDE D'EXAMEN D'IMAGERIE MÉDICALE"), 105, y, { align: "center" }); y += 10;

    // Bloc prescripteur / patient en deux colonnes
    const colY = y;
    doc.setFontSize(8.5); doc.setTextColor(90); doc.text("PRESCRIPTEUR", L, y); doc.text("PATIENT", 112, y); doc.setTextColor(0);
    y += 5;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
    doc.text(pdfSafe(d.presc.nom || "......................"), L, y);
    doc.text(pdfSafe(((d.pnom || "...............").toUpperCase() + " " + d.pprenom).trim()), 112, y);
    doc.setFont("helvetica", "normal");
    const pl = [d.presc.spec, d.presc.rpps ? "RPPS : " + d.presc.rpps : "", d.presc.adresse].filter(Boolean);
    const rl = [d.pddn ? "Né(e) le " + frDate(d.pddn) : "", "Date : " + frDate(d.date)].filter(Boolean);
    let yl = y + 5, yr = y + 5;
    pl.forEach((t) => doc.splitTextToSize(pdfSafe(t), 88).forEach((s) => { doc.text(s, L, yl); yl += 4.6; }));
    rl.forEach((t) => { doc.text(pdfSafe(t), 112, yr); yr += 4.6; });
    y = Math.max(yl, yr, colY + 14) + 3;

    lbl("Examen demandé");
    y += 3.5;
    doc.setDrawColor(0); doc.setLineWidth(0.4);
    const exTxt = d.exam + (d.cote ? " - côté : " + d.cote.toLowerCase() : "");
    doc.setFont("helvetica", "bold"); doc.setFontSize(11.5);
    const exLines = doc.splitTextToSize(pdfSafe(exTxt), W - 6);
    doc.rect(L, y - 4.5, W, exLines.length * 5 + 3.5);
    exLines.forEach((l) => { doc.text(l, L + 3, y); y += 5; });
    y += 3;
    if (d.inc.length) { lbl("Incidences"); line(d.inc.join(" ; ")); }
    lbl("Renseignements cliniques"); line(d.clin || "-");
    lbl("Question posée / diagnostic évoqué"); line(d.qpos || "-");
    lbl("Contre-indications / précautions signalées"); line(d.ci.length ? d.ci.join(" ; ") : "Aucune signalée");
    y += 2;
    const c = confText(d);
    doc.setFillColor(c.off ? 253 : 242, c.off ? 241 : 250, c.off ? 240 : 245);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.5);
    const cl = doc.splitTextToSize(pdfSafe(c.txt), W - 8);
    doc.rect(L, y - 4, W, cl.length * 4.2 + 3.5, "F");
    doc.setDrawColor(c.off ? 163 : 31, c.off ? 38 : 122, c.off ? 29 : 76); doc.setLineWidth(1); doc.line(L, y - 4, L, y - 0.5 + cl.length * 4.2);
    cl.forEach((l) => { doc.text(l, L + 4, y); y += 4.2; });
    y += 14;
    if (y > 250) { doc.addPage(); y = 30; }
    doc.setDrawColor(0); doc.setLineWidth(0.3); doc.line(122, y, 192, y);
    doc.setFontSize(9); doc.text("Signature et cachet du prescripteur", 157, y + 4.5, { align: "center" });
    doc.setFontSize(8); doc.setTextColor(110);
    doc.text(doc.splitTextToSize(pdfSafe("Le radiologue peut adapter l'examen demandé en fonction du contexte clinique. Document généré par un outil d'aide à la pertinence des demandes d'imagerie."), W), L, 285);
    const name = "demande-imagerie-" + (d.pnom ? d.pnom.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" : "") + (d.date || "") + ".pdf";
    try { doc.save(name); } catch (e) {
      errEl.hidden = false; errEl.textContent = "Téléchargement impossible dans cet aperçu. Utilisez le bouton Imprimer.";
    }
  }

  document.getElementById("homeBtn").addEventListener("click", () => renderHome());
  renderHome();
})();
