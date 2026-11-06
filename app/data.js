// Arbres décisionnels — contenu repris des fiches FNMR (HAS/SFR) et des recommandations HAS.
// Types de nœuds :
//  question  : choix unique (options[].next)
//  checklist : cases à cocher ; any -> nœud si au moins une case, none -> nœud sinon
//  result    : verdict final : ok | no | discuss | urgent

const SOURCES = {
  FNMR: { label: "FNMR – Pertinence en imagerie médicale (fiches HAS / SFR)", url: "https://fnmr.fr/pertinence-en-imagerie-medicale/" },
  HAS_LOMB: { label: "HAS – Prise en charge du patient présentant une lombalgie commune (2019)", url: "https://www.has-sante.fr/jcms/c_2961499/fr/prise-en-charge-du-patient-presentant-une-lombalgie-commune" },
  HAS_GNT: { label: "HAS / G4 – Gonalgie non traumatique de l'adulte (2022)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2022-06/app_445_fiche_imagerie_gonalgie_non_trauma_mel_2022-06-24_12-03-4_460.pdf" },
  HAS_GT: { label: "HAS / G4 – Gonalgie après un traumatisme du genou (2022)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2022-06/app_445_fiche_imagerie_gonalgie_post_trauma_mel.pdf" },
  ADERIM: { label: "SFR – ADERIM, aide à la demande d'examens d'imagerie", url: "https://aderim.radiologie.fr" }
};

// Examens prescriptibles (libellé imprimé sur la demande)
const EXAMS = {
  RX_LOMB: { label: "Radiographie du rachis lombaire", irm: false },
  IRM_LOMB: { label: "IRM du rachis lombaire (scanner si contre-indication à l'IRM)", irm: true },
  RX_CRANE: { label: "Radiographie standard du crâne", irm: false },
  RX_ORBITES: { label: "Radiographie des orbites, incidence de profil (complétée si nécessaire par une incidence de face) – recherche de corps étranger intra-orbitaire", irm: false },
  RX_THORAX: { label: "Radiographie du thorax", irm: false },
  ASP: { label: "Abdomen sans préparation (ASP)", irm: false },
  ECHO_ABDO: { label: "Échographie abdominale et/ou pelvienne (scanner si nécessaire, à discuter avec le radiologue)", irm: false },
  RX_GENOU: { label: "Radiographies des genoux en charge", irm: false, genou: true, incidences: true },
  RX_GENOU_TRAUMA: { label: "Radiographies du genou (face et profil au minimum ; défilé fémoro-patellaire si suspicion de lésion patellaire ou choc direct)", irm: false, cote: true },
  IRM_GENOU: { label: "IRM du genou", irm: true, cote: true },
  TDM_GENOU: { label: "Scanner du genou (dans les 48 heures) – suspicion de fracture occulte", irm: false, cote: true },
  TDM_GENOU_FRACT: { label: "Scanner du genou – bilan de fracture (indication discutée avec l'équipe chirurgicale)", irm: false, cote: true },
  TDM_GENOU_2: { label: "Scanner du genou", irm: false, cote: true },
  ECHO_GENOU: { label: "Échographie du genou", irm: false, cote: true }
};

const TREES = {
  // ───────────────────────── LOMBALGIE ─────────────────────────
  // Référence principale : HAS 2019 (la plus récente). Les urgences reprennent la fiche FNMR.
  RX_LOMB: {
    title: "Radiographie du rachis lombaire",
    group: "Rachis",
    context: "Douleur lombaire de l'adulte",
    start: "l_urg",
    nodes: {
      l_urg: {
        type: "checklist",
        text: "Le patient présente-t-il un signe d'urgence ?",
        groups: [{ title: "Urgences", items: [
          "Sciatique hyperalgique rebelle aux opiacés",
          "Sciatique paralysante (déficit moteur < 3 sur l'échelle MRC ou progressif)",
          "Syndrome de la queue de cheval (troubles sphinctériens, anesthésie en selle)"
        ]}],
        any: "l_r_urg", none: "l_rf"
      },
      l_rf: {
        type: "checklist",
        text: "Y a-t-il un drapeau rouge (signe d'alerte) ?",
        help: "Liste HAS 2019. Pris isolément, ces signes ont une spécificité limitée : c'est leur combinaison qui doit faire suspecter une pathologie sous-jacente.",
        groups: [
          { title: "Douleur et neurologie", items: [
            "Douleur de type non mécanique : aggravation progressive, présente au repos et en particulier la nuit",
            "Symptôme neurologique étendu (sphincters, atteinte motrice des jambes)",
            "Paresthésies du pubis ou du périnée",
            "Douleur thoracique (rachialgies dorsales)",
            "Déformation structurale importante de la colonne" ] },
          { title: "Terrain et contexte", items: [
            "Traumatisme important (chute de hauteur…)",
            "Âge d'apparition inférieur à 20 ans ou supérieur à 55 ans",
            "Antécédent de cancer",
            "Usage de drogue intraveineuse ou usage prolongé de corticoïdes" ] },
          { title: "Signes généraux", items: [
            "Fièvre ou syndrome fébrile",
            "Altération de l'état général",
            "Perte de poids inexpliquée" ] }
        ],
        any: "l_r_rf", none: "l_sit"
      },
      l_sit: {
        type: "question",
        text: "Sans drapeau rouge, quelle est la situation ?",
        options: [
          { label: "Poussée aiguë de lombalgie, avec ou sans radiculalgie", next: "l_r_aigu" },
          { label: "Douleur persistante malgré le traitement, depuis moins de 3 mois", next: "l_r_persist" },
          { label: "Lombalgie chronique (plus de 3 mois)", next: "l_r_chron" },
          { label: "Geste invasif envisagé (infiltration épidurale, voire chirurgie)", next: "l_r_geste" },
          { label: "Recherche d'une instabilité ou d'un trouble statique rachidien", next: "l_r_stat" },
          { label: "Imagerie déjà faite, symptômes inchangés", next: "l_r_renouv" }
        ]
      },
      l_r_urg: { type: "result", verdict: "urgent", title: "Urgence : prise en charge spécialisée",
        text: "Ces situations relèvent d'un examen en urgence et/ou d'un avis spécialisé. Contactez le radiologue ou le spécialiste pour définir l'examen et le délai : la radiographie standard n'est pas l'examen à prescrire ici.",
        sources: ["FNMR", "HAS_LOMB"] },
      l_r_rf: { type: "result", verdict: "discuss", title: "Drapeau rouge : imagerie justifiée, examen à adapter",
        text: "Il ne s'agit plus d'une lombalgie commune : une prise en charge spécifique est nécessaire. Le choix de l'examen (radiographie, IRM ou scanner) dépend de la pathologie suspectée et peut être adapté par le radiologue. Précisez le signe d'alerte dans la demande.",
        exams: ["RX_LOMB", "IRM_LOMB"], sources: ["HAS_LOMB", "FNMR"] },
      l_r_aigu: { type: "result", verdict: "no", title: "Pas d'imagerie",
        text: "Sans drapeau rouge, il n'y a pas d'indication à une imagerie rachidienne lors d'une poussée aiguë, avec ou sans radiculalgie (HAS, grade C). Expliquez au patient pourquoi l'imagerie n'est pas nécessaire et revoyez-le 2 à 4 semaines plus tard.",
        sources: ["HAS_LOMB"] },
      l_r_persist: { type: "result", verdict: "no", title: "Radiographie non indiquée à ce stade",
        text: "Sans drapeau rouge, les radiographies isolées ne sont pas indiquées (sauf recherche d'instabilité ou de trouble statique). Réévaluez le patient en recherchant à nouveau les drapeaux rouges. Au-delà de 3 mois, ou si un geste invasif est envisagé, c'est une IRM qui est recommandée.",
        sources: ["HAS_LOMB"] },
      l_r_chron: { type: "result", verdict: "no", title: "Radiographie isolée non recommandée : IRM",
        text: "Lombalgie chronique sans drapeau rouge : une imagerie rachidienne est recommandée, par IRM (ou scanner en cas de contre-indication). Les radiographies isolées ne sont pas indiquées, sauf recherche d'instabilité ou de trouble statique.",
        alt: "IRM_LOMB", sources: ["HAS_LOMB"] },
      l_r_geste: { type: "result", verdict: "no", title: "Avant un geste invasif : IRM",
        text: "Si une infiltration épidurale, voire une chirurgie, est envisagée, une imagerie rachidienne par IRM (ou scanner en cas de contre-indication) est conseillée, sauf chez le patient hyperalgique pour ne pas retarder sa prise en charge.",
        alt: "IRM_LOMB", sources: ["HAS_LOMB"] },
      l_r_stat: { type: "result", verdict: "ok", title: "Radiographie indiquée",
        text: "La recherche d'une instabilité ou d'un trouble statique rachidien est la seule situation, sans drapeau rouge, où des radiographies isolées sont indiquées.",
        exam: "RX_LOMB", sources: ["HAS_LOMB"] },
      l_r_renouv: { type: "result", verdict: "no", title: "Pas de nouvelle imagerie",
        text: "Il n'y a pas d'indication à renouveler l'imagerie si les symptômes n'ont pas changé.",
        sources: ["HAS_LOMB"] }
    }
  },

  // ───────────────────────── CRÂNE ─────────────────────────
  RX_CRANE: {
    title: "Radiographie du crâne",
    group: "Tête",
    context: "Radiographie standard",
    start: "c1",
    nodes: {
      c1: {
        type: "checklist",
        text: "La demande correspond-elle à l'une des indications restantes (HAS 2008) ?",
        groups: [{ title: "Indications restantes", items: [
          "Maltraitance suspectée chez l'enfant", "Myélome", "Tumeur osseuse primitive", "Recherche de métastases osseuses",
          "Maladies osseuses métaboliques", "Maladie de Paget", "Ostéomalacie", "Ostéomyélite"
        ]}],
        any: "c_ok", none: "c_no"
      },
      c_ok: { type: "result", verdict: "ok", title: "Radiographie possible",
        text: "Indication restante selon la HAS (octobre 2008). Ces indications sont « exceptionnelles » et appelées à évoluer : en 2018, la plupart doivent être remplacées par une imagerie en coupe (TDM ou IRM). Le radiologue pourra proposer d'adapter l'examen.",
        exam: "RX_CRANE", sources: ["FNMR"] },
      c_no: { type: "result", verdict: "no", title: "Radiographie du crâne non indiquée",
        text: "La radiographie standard du crâne n'est pas indiquée en règle générale. Si une imagerie est nécessaire : scanner ou IRM, à discuter avec le radiologue.",
        sources: ["FNMR", "ADERIM"] }
    }
  },

  // ───────────────────────── SINUS / MASSIF FACIAL ─────────────────────────
  RX_SINUS: {
    title: "Radiographie des sinus ou du massif facial",
    group: "Tête",
    context: "Radiographie standard",
    start: "s1",
    nodes: {
      s1: {
        type: "question",
        text: "S'agit-il du dépistage d'un corps étranger intra-orbitaire ?",
        options: [ { label: "Oui", next: "s_ok" }, { label: "Non (sinusite, traumatisme facial, céphalée…)", next: "s_no" } ]
      },
      s_ok: { type: "result", verdict: "ok", title: "Radiographie indiquée",
        text: "C'est la seule indication restante : incidence de profil, complétée si nécessaire par une incidence de face.",
        exam: "RX_ORBITES", sources: ["FNMR"] },
      s_no: { type: "result", verdict: "no", title: "Radiographie des sinus / du massif facial non indiquée",
        text: "La radiographie des sinus et du massif facial n'est pas indiquée, sauf exception. Si une imagerie est nécessaire : scanner ou IRM, à discuter avec le radiologue.",
        sources: ["FNMR", "ADERIM"] }
    }
  },

  // ───────────────────────── THORAX ─────────────────────────
  RX_THORAX: {
    title: "Radiographie du thorax",
    group: "Thorax",
    context: "Radiographie standard",
    start: "t1",
    nodes: {
      t1: {
        type: "checklist",
        text: "La demande correspond-elle à l'une de ces situations ?",
        help: "Ce sont des situations où la radiographie du thorax n'est pas indiquée, soit parce que l'imagerie est inutile, soit parce qu'une autre technique est nécessaire.",
        groups: [
          { title: "Urgences", items: [
            { label: "Suspicion de dissection aiguë de l'aorte thoracique", urgent: true },
            { label: "Suspicion de rupture d'anévrisme de l'aorte thoracique", urgent: true },
            { label: "Suspicion de perforation œsophagienne", urgent: true },
            "Admission sans trouble cardio-pulmonaire aigu" ] },
          { title: "Bilan pré-opératoire", items: ["Chirurgie non cardiothoracique, patient de moins de 60 ans, sans pathologie cardio-vasculaire ou avec une pathologie stable"] },
          { title: "Cardio-vasculaire (hors péri-opératoire)", items: ["HTA", "Suivi d'une insuffisance cardiaque congestive chronique ou d'une cardiomyopathie"] },
          { title: "Respiratoire", items: ["Infection des voies aériennes hautes", "Bronchite aiguë", "Bronchiolite de l'enfant (1er épisode non compliqué)", "Douleur thoracique non spécifique hors urgence", "Dépistage du cancer bronchique", "Dépistage du mésothéliome"] },
          { title: "Réanimation", items: ["Suivi d'un patient stable et ventilé", "Suivi à distance de la position d'un matériel implanté"] }
        ],
        any: "t_no", anyUrgent: "t_urg", none: "t_ok"
      },
      t_urg: { type: "result", verdict: "urgent", title: "Urgence : la radiographie n'est pas l'examen adapté",
        text: "Ce contexte nécessite une autre technique (TDM, IRM, échographie-doppler…). Orientez le patient en urgence.",
        sources: ["FNMR"] },
      t_no: { type: "result", verdict: "no", title: "Radiographie du thorax non indiquée",
        text: "Cette situation ne justifie pas de radiographie du thorax : l'imagerie est inutile, ou une autre technique est nécessaire (TDM, IRM, échographie-doppler…).",
        sources: ["FNMR"] },
      t_ok: { type: "result", verdict: "ok", title: "Pas de non-indication identifiée",
        text: "La demande ne correspond à aucune non-indication listée. L'utilité de la radiographie du thorax a été démontrée dans de multiples situations cliniques ; le détail des indications figure dans le rapport complet de la HAS. Précisez bien le contexte et la question posée.",
        exam: "RX_THORAX", sources: ["FNMR"] }
    }
  },

  // ───────────────────────── ASP ─────────────────────────
  ASP: {
    title: "Abdomen sans préparation (ASP)",
    group: "Abdomen",
    context: "Adulte et enfant",
    start: "a1",
    nodes: {
      a1: { type: "question", text: "Le patient est-il un adulte ou un enfant ?",
        options: [ { label: "Adulte", next: "a_ad" }, { label: "Enfant ou nouveau-né", next: "a_enf" } ] },
      a_ad: {
        type: "checklist", text: "La demande correspond-elle à l'une de ces indications (adulte) ?",
        groups: [{ title: "Indications chez l'adulte", items: [
          "Suspicion de colectasie : colite aiguë grave (maladie de Crohn, RCH)",
          "Corps étranger, surtout acéré ou potentiellement toxique",
          "Lithiase rénale : suivi de colique néphrétique ou exploration péri-opératoire",
          "Recherche d'un stérilet non visible en échographie"
        ]}],
        any: "a_ok_ad", none: "a_no_ad"
      },
      a_enf: {
        type: "checklist", text: "La demande correspond-elle à l'une de ces indications (enfant) ?",
        groups: [{ title: "Indications chez l'enfant", items: [
          "Douleurs abdominales avec échographie non contributive",
          "Suspicion d'occlusion", "Suspicion de perforation",
          "Suspicion de colectasie (maladie inflammatoire chronique de l'intestin)",
          "Nouveau-né : suspicion d'entérocolite",
          "Masse abdominale : recherche de calcifications après échographie (pas de scanner envisagé)",
          "Lithiase rénale avec échographie non contributive",
          "Corps étranger, surtout acéré ou potentiellement toxique"
        ]}],
        any: "a_ok_enf", none: "a_no_enf"
      },
      a_ok_ad: { type: "result", verdict: "ok", title: "ASP possible",
        text: "Indication retenue chez l'adulte. Pour la lithiase, l'échographie et le scanner sont des alternatives selon la taille et la localisation du calcul.",
        exam: "ASP", sources: ["FNMR"] },
      a_no_ad: { type: "result", verdict: "no", title: "ASP non indiqué",
        text: "L'ASP est très rarement indiqué chez l'adulte. Il est le plus souvent remplacé par l'échographie et/ou le scanner, si un examen d'imagerie est justifié.",
        alt: "ECHO_ABDO", sources: ["FNMR"] },
      a_ok_enf: { type: "result", verdict: "ok", title: "ASP possible",
        text: "Indication retenue chez l'enfant.",
        exam: "ASP", sources: ["FNMR"] },
      a_no_enf: { type: "result", verdict: "no", title: "ASP non indiqué",
        text: "L'ASP est très rarement indiqué chez l'enfant. Si un examen d'imagerie est justifié, il s'agit le plus souvent d'une échographie.",
        alt: "ECHO_ABDO", sources: ["FNMR"] }
    }
  },

  // ───────────────────────── GENOU : RADIOGRAPHIE ─────────────────────────
  RX_GENOU: {
    title: "Radiographie du genou",
    group: "Genou (adulte)",
    context: "Gonalgie de l'adulte",
    start: "g_age",
    nodes: {
      g_age: { type: "question", text: "Le patient est-il adulte ?",
        options: [ { label: "Oui", next: "g_urg" }, { label: "Non (enfant, adolescent)", next: "g_r_enfant" } ] },
      g_urg: { type: "checklist", text: "Y a-t-il une situation d'urgence ?",
        groups: [{ title: "Urgences", items: [
          { label: "Suspicion d'arthrite septique (douleur permanente et insomniante, érythème, chaleur, épanchement ± fièvre, terrain à risque)", urgent: true },
          { label: "Luxation fémoro-tibiale avérée (traumatisme à haute énergie)", urgent: true }
        ]}],
        any: "g_r_urg", none: "g_trauma" },
      g_trauma: { type: "question", text: "La douleur fait-elle suite à un traumatisme ?",
        options: [ { label: "Traumatisme aigu de moins de 7 jours", next: "g_ottawa" }, { label: "Traumatisme de plus de 7 jours (gonalgie à distance)", next: "g_distance" }, { label: "Pas de traumatisme", next: "g_known" } ] },
      g_ottawa: { type: "checklist", text: "Règle d'Ottawa : le patient présente-t-il au moins un de ces critères ?",
        help: "Ne s'applique pas en cas de grossesse, de troubles de conscience, de paraplégie, de traumatismes ou fractures multiples, ni si des radiographies ont déjà été faites.",
        groups: [{ title: "Critères d'Ottawa", items: [
          "Âge de 55 ans ou plus", "Douleur isolée de la patella (sans autre douleur osseuse du genou)", "Douleur de la tête de la fibula",
          "Incapacité de fléchir le genou à 90°", "Incapacité de faire 4 pas en charge, immédiatement et lors de la consultation"
        ]}],
        any: "g_r_rx_trauma", none: "g_autres" },
      g_autres: { type: "checklist", text: "Aucun critère d'Ottawa : y a-t-il l'un de ces éléments ?",
        groups: [{ title: "Situations où les radiographies peuvent se discuter", items: [
          "Point douloureux osseux autre que la patella ou la tête de la fibula",
          "Plaie profonde (à risque septique) en regard du genou"
        ]}],
        any: "g_r_rx_discut", none: "g_r_no_ottawa" },
      g_distance: { type: "question", text: "Des radiographies ont-elles déjà été réalisées depuis le traumatisme ?",
        options: [ { label: "Non", next: "g_r_rx_distance" }, { label: "Oui", next: "g_r_deja" } ] },
      g_known: { type: "question", text: "S'agit-il d'un nouvel épisode chez un patient ayant une pathologie du genou connue, avec ses symptômes habituels ?",
        options: [ { label: "Oui, pathologie connue et symptômes habituels", next: "g_r_known" }, { label: "Non : premier épisode ou épisode inhabituel", next: "g_r_rx_nt" } ] },
      g_r_enfant: { type: "result", verdict: "discuss", title: "Hors du champ de l'outil",
        text: "Les fiches HAS 2022 concernent uniquement l'adulte. Pour l'enfant, référez-vous à ADERIM ou demandez l'avis du radiologue.",
        sources: ["ADERIM"] },
      g_r_urg: { type: "result", verdict: "urgent", title: "Urgence",
        text: "Arthrite septique suspectée : ponction articulaire diagnostique (et hémocultures) en urgence, avant toute antibiothérapie, et prise en charge en milieu spécialisé. La biologie et l'imagerie ne doivent pas retarder cette prise en charge. Luxation fémoro-tibiale : hospitalisation en urgence pour avis chirurgical et angioscanner (lésion vasculaire), puis IRM pour le bilan ligamentaire dans les jours qui suivent.",
        sources: ["HAS_GNT", "HAS_GT"] },
      g_r_no_ottawa: { type: "result", verdict: "no", title: "Pas de radiographie indiquée",
        text: "Aucun critère d'Ottawa : les radiographies ne sont pas requises. L'examen du genou après un traumatisme est souvent difficile : il est à refaire après quelques jours de repos et de traitement initial. À distance, si la gonalgie persiste, l'indication d'imagerie se rediscute, en commençant par des radiographies.",
        sources: ["HAS_GT"] },
      g_r_rx_trauma: { type: "result", verdict: "ok", title: "Radiographies indiquées en urgence",
        text: "Règle d'Ottawa positive : radiographies à la recherche d'une fracture (face et profil au minimum, plus défilé fémoro-patellaire en cas de suspicion de lésion patellaire ou de choc direct). Pas de cliché du genou opposé s'il est asymptomatique. En cas de doute sur l'appareil extenseur, une échographie peut compléter. Pas d'IRM en 1re intention.",
        exam: "RX_GENOU_TRAUMA", sources: ["HAS_GT"] },
      g_r_rx_discut: { type: "result", verdict: "discuss", title: "Radiographies à discuter",
        text: "Sans critère d'Ottawa, les radiographies peuvent se discuter en cas de point douloureux osseux autre que la patella ou la tête de la fibula, ou de plaie profonde à risque septique en regard du genou.",
        exams: ["RX_GENOU_TRAUMA"], sources: ["HAS_GT"] },
      g_r_rx_distance: { type: "result", verdict: "ok", title: "Commencer par les radiographies",
        text: "À distance du traumatisme, l'indication et le type d'imagerie se discutent après réévaluation clinique. Si aucune radiographie n'a été faite, il faut commencer par elles.",
        exam: "RX_GENOU_TRAUMA", sources: ["HAS_GT"] },
      g_r_deja: { type: "result", verdict: "discuss", title: "Réévaluation clinique avant toute nouvelle imagerie",
        text: "À distance du traumatisme, l'indication et le type d'imagerie se discutent après réévaluation clinique, en tenant compte de l'imagerie déjà faite. Si une IRM est envisagée, utilisez le parcours « IRM du genou ».",
        sources: ["HAS_GT"] },
      g_r_known: { type: "result", verdict: "no", title: "Pas de nouvelle imagerie",
        text: "Il n'est pas recommandé de refaire une imagerie lors d'un nouvel épisode chez un patient ayant une pathologie connue et ses symptômes habituels.",
        sources: ["HAS_GNT"] },
      g_r_rx_nt: { type: "result", verdict: "ok", title: "Radiographies indiquées en 1re intention",
        text: "Si l'examen clinique oriente vers une atteinte articulaire du genou, des radiographies sont indiquées en 1re intention, quelle que soit la cause suspectée : face et profil en charge au minimum, défilé fémoro-patellaire à 30° et/ou Schuss selon le contexte, clichés bilatéraux pour le premier bilan. Pas d'IRM en 1re intention. Pensez aussi à une douleur projetée depuis la hanche ou le rachis lombaire.",
        exam: "RX_GENOU", sources: ["HAS_GNT"] }
    }
  },

  // ───────────────────────── GENOU : IRM ─────────────────────────
  IRM_GENOU: {
    title: "IRM du genou",
    group: "Genou (adulte)",
    context: "Gonalgie de l'adulte",
    start: "i_age",
    nodes: {
      i_age: { type: "question", text: "Le patient est-il adulte ?",
        options: [ { label: "Oui", next: "i_urg" }, { label: "Non (enfant, adolescent)", next: "i_r_enfant" } ] },
      i_urg: { type: "checklist", text: "Y a-t-il une situation d'urgence ?",
        groups: [{ title: "Urgences", items: [
          { label: "Suspicion d'arthrite septique (douleur permanente et insomniante, érythème, chaleur, épanchement ± fièvre, terrain à risque)", urgent: true },
          { label: "Luxation fémoro-tibiale avérée (traumatisme à haute énergie)", urgent: true }
        ]}],
        any: "i_r_urg", none: "i_trauma" },
      i_trauma: { type: "question", text: "La douleur fait-elle suite à un traumatisme ?",
        options: [ { label: "Oui, après un traumatisme", next: "i_t_rx" }, { label: "Non, gonalgie non traumatique", next: "i_nt_known" } ] },

      // --- branche post-traumatique
      i_t_rx: { type: "question", text: "Des radiographies du genou ont-elles été réalisées depuis le traumatisme ?",
        options: [ { label: "Oui", next: "i_t_res" }, { label: "Non", next: "i_t_delai" } ] },
      i_t_delai: { type: "question", text: "De quand date le traumatisme ?",
        options: [ { label: "Moins de 7 jours", next: "i_r_rx_ottawa" }, { label: "Plus de 7 jours", next: "i_r_rx_distance" } ] },
      i_t_res: { type: "question", text: "Que montrent les radiographies ?",
        options: [ { label: "Une fracture", next: "i_r_fracture" }, { label: "Elles sont normales", next: "i_t_susp" } ] },
      i_t_susp: { type: "question", text: "Radiographies normales : que fait suspecter l'examen clinique ?",
        options: [
          { label: "Une fracture occulte (douleur intense, en particulier à la mobilisation ou à l'appui)", next: "i_r_occulte" },
          { label: "Une anse de seau méniscale (blocage vrai : flexum irréductible)", next: "i_r_blocage" },
          { label: "Une lésion méniscale sans blocage vrai, ou ligamentaire (traumatisme indirect, craquement, instabilité)", next: "i_t_cond" },
          { label: "Aucune lésion particulière", next: "i_r_reeval" }
        ] },
      i_t_cond: { type: "question", text: "Après réévaluation clinique, l'IRM conditionne-t-elle la prise en charge thérapeutique ?",
        help: "La fracture de Segond (signe indirect de lésion du ligament croisé antérieur) entre dans ce cadre.",
        options: [ { label: "Oui", next: "i_r_ml_ok" }, { label: "Non", next: "i_r_ml_no" } ] },

      // --- branche non traumatique
      i_nt_known: { type: "question", text: "S'agit-il d'un nouvel épisode chez un patient ayant une pathologie du genou connue, avec ses symptômes habituels ?",
        options: [ { label: "Oui, pathologie connue et symptômes habituels", next: "i_r_known" }, { label: "Non : premier épisode ou épisode inhabituel", next: "i_nt_rx" } ] },
      i_nt_rx: { type: "question", text: "Le patient a-t-il des radiographies du genou en charge, réalisées pour cet épisode ?",
        options: [ { label: "Oui", next: "i_nt_res" }, { label: "Non", next: "i_r_rx_first_nt" } ] },
      i_nt_res: { type: "question", text: "Que montrent les radiographies ?",
        options: [
          { label: "Des signes typiques d'arthrose (pincement, ostéophytes, condensation sous-chondrale, géodes)", next: "i_nt_arth" },
          { label: "Une image d'allure tumorale agressive, atypique ou indéterminée", next: "i_r_tumeur" },
          { label: "D'autres signes d'atteinte articulaire ou abarticulaire (os, parties molles, articulation)", next: "i_r_autre" },
          { label: "Rien qui explique les symptômes (radiographies ± échographie normales), et la douleur persiste", next: "i_r_normal" }
        ] },
      i_nt_arth: { type: "checklist", text: "Arthrose à la radio : y a-t-il l'un de ces éléments ?",
        groups: [{ title: "Éléments justifiant une IRM", items: [
          "Présentation clinique atypique",
          "Symptômes qui progressent rapidement de façon inattendue (suspicion de fracture par insuffisance osseuse ou d'arthrose destructrice rapide)",
          "Changement des caractéristiques cliniques"
        ]}],
        any: "i_r_arth_ok", none: "i_nt_echec" },
      i_nt_echec: { type: "question", text: "Le traitement symptomatique a-t-il échoué ?",
        options: [ { label: "Non", next: "i_nt_typ" }, { label: "Oui, échec du traitement symptomatique", next: "i_r_arth_echec" } ] },
      i_nt_typ: { type: "question", text: "Le tableau est-il typique : patient de plus de 40 ans, douleur liée aux mouvements, raideur matinale absente ou de moins de 30 minutes, épisode résolu en moins de 10 jours sous traitement symptomatique ?",
        options: [ { label: "Oui, tous ces critères", next: "i_r_arth_no" }, { label: "Non (par exemple patient de 40 ans ou moins)", next: "i_r_arth_hors" } ] },

      // --- résultats
      i_r_enfant: { type: "result", verdict: "discuss", title: "Hors du champ de l'outil",
        text: "Les fiches HAS 2022 concernent uniquement l'adulte. Pour l'enfant, référez-vous à ADERIM ou demandez l'avis du radiologue.", sources: ["ADERIM"] },
      i_r_urg: { type: "result", verdict: "urgent", title: "Urgence : l'IRM n'est pas l'examen de 1re intention",
        text: "Arthrite septique suspectée : ponction articulaire diagnostique (et hémocultures) en urgence, avant toute antibiothérapie, et prise en charge en milieu spécialisé ; la biologie et l'imagerie ne doivent pas la retarder. Luxation fémoro-tibiale : hospitalisation en urgence pour avis chirurgical et angioscanner ; l'IRM du bilan ligamentaire se fait dans les jours qui suivent.",
        sources: ["HAS_GNT", "HAS_GT"] },
      i_r_rx_ottawa: { type: "result", verdict: "no", title: "Pas d'IRM en 1re intention : appliquer la règle d'Ottawa",
        text: "Après un traumatisme aigu, l'IRM n'est pas indiquée en 1re intention. Des radiographies sont indiquées si la règle d'Ottawa est positive. Utilisez le parcours « Radiographie du genou » pour l'appliquer.",
        sources: ["HAS_GT"] },
      i_r_rx_distance: { type: "result", verdict: "no", title: "Commencer par les radiographies",
        text: "À distance du traumatisme, l'indication et le type d'imagerie se discutent après réévaluation clinique. Si aucune radiographie n'a été faite, il faut commencer par elles.",
        alt: "RX_GENOU_TRAUMA", sources: ["HAS_GT"] },
      i_r_fracture: { type: "result", verdict: "discuss", title: "Fracture : imagerie de 2e intention à décider avec l'équipe chirurgicale",
        text: "Une autre imagerie peut être nécessaire pour planifier le traitement, à discuter avec l'équipe chirurgicale : un scanner en urgence est parfois indiqué ; une IRM peut être indiquée dans les meilleurs délais en cas de suspicion de lésion tendino-musculaire, méniscale ou ligamentaire nécessitant une prise en charge en urgence.",
        exams: ["TDM_GENOU_FRACT", "IRM_GENOU"], sources: ["HAS_GT"] },
      i_r_occulte: { type: "result", verdict: "no", title: "Scanner plutôt qu'IRM",
        text: "Radiographies normales et suspicion de fracture occulte : scanner dans les 48 heures.",
        alt: "TDM_GENOU", sources: ["HAS_GT"] },
      i_r_blocage: { type: "result", verdict: "no", title: "Avis chirurgical plutôt qu'IRM",
        text: "Suspicion d'anse de seau méniscale (blocage vrai) : avis chirurgical dans les jours qui suivent.",
        sources: ["HAS_GT"] },
      i_r_ml_ok: { type: "result", verdict: "ok", title: "IRM indiquée, à distance du traumatisme",
        text: "Radiographies normales, suspicion de lésion méniscale ou ligamentaire sans blocage vrai, IRM qui conditionne la prise en charge : IRM à distance du traumatisme, après réévaluation clinique.",
        exam: "IRM_GENOU", sources: ["HAS_GT"] },
      i_r_ml_no: { type: "result", verdict: "no", title: "IRM non indiquée à ce stade",
        text: "L'IRM n'est à discuter, après réévaluation clinique, que si elle conditionne la prise en charge thérapeutique.",
        sources: ["HAS_GT"] },
      i_r_reeval: { type: "result", verdict: "no", title: "IRM non indiquée à ce stade",
        text: "Radiographies normales sans suspicion clinique particulière : refaire l'examen clinique après quelques jours. À distance du traumatisme, l'indication et le type d'imagerie se discutent après cette réévaluation.",
        sources: ["HAS_GT"] },
      i_r_known: { type: "result", verdict: "no", title: "Pas de nouvelle imagerie",
        text: "Il n'est pas recommandé de refaire une imagerie lors d'un nouvel épisode chez un patient ayant une pathologie connue et ses symptômes habituels.",
        sources: ["HAS_GNT"] },
      i_r_rx_first_nt: { type: "result", verdict: "no", title: "Commencer par les radiographies",
        text: "Premier épisode ou épisode inhabituel : des radiographies sont indiquées en 1re intention, quelle que soit la cause suspectée. L'IRM n'est pas recommandée en 1re intention.",
        alt: "RX_GENOU", sources: ["HAS_GNT"] },
      i_r_tumeur: { type: "result", verdict: "urgent", title: "Adresser en centre spécialisé",
        text: "Image d'allure tumorale agressive, atypique ou indéterminée : adressez le patient dans les meilleurs délais en centre spécialisé.",
        sources: ["HAS_GNT"] },
      i_r_autre: { type: "result", verdict: "discuss", title: "Imagerie de 2e intention à discuter",
        text: "À discuter avec un radiologue ou un spécialiste ostéo-articulaire, selon le contexte clinique, biologique et l'évolution : scanner et/ou IRM pour une anomalie osseuse ; échographie et/ou IRM pour une anomalie des parties molles ; IRM pour une anomalie de l'articulation (arthroscanner à discuter si l'IRM est contre-indiquée).",
        exams: ["IRM_GENOU", "TDM_GENOU_2", "ECHO_GENOU"], sources: ["HAS_GNT"] },
      i_r_normal: { type: "result", verdict: "ok", title: "IRM indiquée",
        text: "Radiographies (± échographie) non contributives et douleur persistante : IRM recommandée après réévaluation clinique, avec éventuellement un avis spécialisé (arthroscanner en cas de contre-indication). Pensez à une douleur projetée (hanche, rachis lombaire).",
        exam: "IRM_GENOU", sources: ["HAS_GNT"] },
      i_r_arth_ok: { type: "result", verdict: "ok", title: "IRM indiquée",
        text: "Arthrose avec présentation atypique, aggravation rapide inattendue ou changement des caractéristiques cliniques : IRM recommandée pour rechercher une lésion associée (scanner ou scintigraphie osseuse si l'IRM est contre-indiquée).",
        exam: "IRM_GENOU", sources: ["HAS_GNT"] },
      i_r_arth_no: { type: "result", verdict: "no", title: "IRM non indiquée",
        text: "Arthrose typique à la radio, patient de plus de 40 ans, présentation et évolution typiques : aucune autre imagerie n'est nécessaire.",
        sources: ["HAS_GNT"] },
      i_r_arth_hors: { type: "result", verdict: "discuss", title: "Situation non décrite par la HAS",
        text: "La HAS conclut à l'absence d'IRM seulement si le tableau est typique, chez un patient de plus de 40 ans ; elle ne détaille pas les autres cas. Si la présentation est atypique, revenez aux questions précédentes pour le signaler. Sinon, la décision est à prendre avec le radiologue.",
        exams: ["IRM_GENOU"], sources: ["HAS_GNT"] },
      i_r_arth_echec: { type: "result", verdict: "no", title: "Orientation spécialisée plutôt qu'IRM",
        text: "Arthrose et échec du traitement symptomatique : orientez le patient vers une prise en charge médico-chirurgicale spécialisée.",
        sources: ["HAS_GNT"] }
    }
  }
};

// Formulation des renseignements cliniques imprimés sur la demande.
// question : un texte par option ("" = ne pas imprimer) ; checklist : préfixe si coché, texte si aucun.
const CLIN = {
  "RX_LOMB.l_urg": { any: "Signe d'urgence : ", none: "Pas de signe d'urgence neurologique" },
  "RX_LOMB.l_rf": { any: "Drapeau rouge : ", none: "Pas de drapeau rouge" },
  "RX_LOMB.l_sit": ["Poussée aiguë de lombalgie", "Douleur persistante malgré le traitement (moins de 3 mois)", "Lombalgie chronique (plus de 3 mois)", "Geste invasif envisagé (infiltration épidurale ou chirurgie)", "Recherche d'instabilité ou de trouble statique rachidien", "Imagerie antérieure, symptômes inchangés"],
  "RX_CRANE.c1": { any: "Indication : ", none: "" },
  "RX_SINUS.s1": ["Dépistage d'un corps étranger intra-orbitaire", ""],
  "RX_THORAX.t1": { any: "Contexte : ", none: "" },
  "ASP.a1": ["", ""],
  "ASP.a_ad": { any: "Indication : ", none: "" },
  "ASP.a_enf": { any: "Indication : ", none: "" },
  "RX_GENOU.g_age": ["", ""],
  "RX_GENOU.g_urg": { any: "", none: "Pas de suspicion d'arthrite septique ni de luxation" },
  "RX_GENOU.g_trauma": ["Traumatisme aigu du genou (moins de 7 jours)", "Gonalgie à distance d'un traumatisme (plus de 7 jours)", "Gonalgie non traumatique"],
  "RX_GENOU.g_ottawa": { any: "Règle d'Ottawa positive : ", none: "Règle d'Ottawa négative" },
  "RX_GENOU.g_autres": { any: "", none: "" },
  "RX_GENOU.g_distance": ["Pas de radiographie depuis le traumatisme", "Radiographies déjà réalisées"],
  "RX_GENOU.g_known": ["Pathologie connue, symptômes habituels", "Premier épisode ou épisode inhabituel"],
  "IRM_GENOU.i_age": ["", ""],
  "IRM_GENOU.i_urg": { any: "", none: "Pas de suspicion d'arthrite septique ni de luxation" },
  "IRM_GENOU.i_trauma": ["Gonalgie post-traumatique", "Gonalgie non traumatique"],
  "IRM_GENOU.i_t_rx": ["Radiographies réalisées après le traumatisme", "Pas de radiographie depuis le traumatisme"],
  "IRM_GENOU.i_t_delai": ["Traumatisme de moins de 7 jours", "Traumatisme de plus de 7 jours"],
  "IRM_GENOU.i_t_res": ["Radiographies : fracture", "Radiographies normales"],
  "IRM_GENOU.i_t_susp": ["Suspicion clinique de fracture occulte", "Blocage vrai (suspicion d'anse de seau méniscale)", "Suspicion clinique de lésion méniscale (sans blocage vrai) ou ligamentaire", "Pas de suspicion clinique de lésion particulière"],
  "IRM_GENOU.i_t_cond": ["IRM conditionnant la prise en charge thérapeutique (après réévaluation clinique)", "IRM ne conditionnant pas la prise en charge"],
  "IRM_GENOU.i_nt_known": ["Pathologie connue, symptômes habituels", "Premier épisode ou épisode inhabituel"],
  "IRM_GENOU.i_nt_rx": ["Radiographies du genou en charge réalisées pour cet épisode", "Pas de radiographie pour cet épisode"],
  "IRM_GENOU.i_nt_res": ["Radiographies : arthrose", "Radiographies : image d'allure tumorale", "Radiographies : autre atteinte articulaire ou abarticulaire", "Radiographies (± échographie) non contributives ; douleur persistante"],
  "IRM_GENOU.i_nt_arth": { any: "", none: "" },
  "IRM_GENOU.i_nt_echec": ["Pas d'échec du traitement symptomatique", "Échec du traitement symptomatique"],
  "IRM_GENOU.i_nt_typ": ["Tableau typique, patient de plus de 40 ans", "Tableau ne remplissant pas tous les critères typiques"]
};

