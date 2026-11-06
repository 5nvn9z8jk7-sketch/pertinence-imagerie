// Extension : échographie abdominale, échographie pelvienne, appendicite, poignet.

Object.assign(SOURCES, {
  BE_G: { label: "SPF Santé publique (Belgique) – Recommandations de prescription en imagerie, appareil digestif (adaptées du guide français 2005)", url: "https://www.health.belgium.be/sites/default/files/media/files/2025-07/g_appareil_digestif.pdf" },
  BE_I: { label: "SPF Santé publique (Belgique) – Recommandations de prescription en imagerie, obstétrique et gynécologie (adaptées du guide français 2005)", url: "https://www.health.belgium.be/sites/default/files/media/files/2025-07/i_obstetrique_et_gynecologie.pdf" },
  BE_K: { label: "SPF Santé publique (Belgique) – Recommandations de prescription en imagerie, traumatismes (adaptées du guide français 2005)", url: "https://www.health.belgium.be/sites/default/files/media/files/2025-07/k_traumatismes_0.pdf" },
  SNFGE_BIL: { label: "SNFGE – Cholécystite et angiocholite", url: "https://www.snfge.org/grand-public/maladies-digestives/cholecystite-angiocholite" },
  AFEF: { label: "AFEF – Recommandations 2020 (bilan hépatique perturbé : place de l'échographie)", url: "https://afef.asso.fr/wp-content/uploads/2023/06/DNI-VERSION-FINALE-RECO-2020-V2.pdf" },
  HAS_AAA: { label: "HAS – Dépistage ciblé de l'anévrisme de l'aorte abdominale (2013)", url: "https://www.has-sante.fr/jcms/c_1361253/fr/anevrismes-de-l-aorte-abdominale-en-france-proposer-un-depistage-cible-opportuniste-unique-chez-les-hommes-presentant-des-facteurs-de-risque" },
  SFCD: { label: "SFCD-SIAD – Appendicite aiguë de l'adulte, recommandations 2021", url: "https://www.sfchirurgiedigestive.fr/recommandations/recommandations-appendicite-2021/" },
  CNGOF_GEU: { label: "CNGOF – Prise en charge de la grossesse extra-utérine (RPC 2003)", url: "https://cngof.fr/app/uploads/2025/11/Grossesse20extra-utC3A9rine202003-Prise20en20charge.pdf" },
  CNGOF_MENO: { label: "CNGOF – Ménopause, RPC 2021", url: "https://cngof.fr/app/uploads/2025/11/Menopause202021-RPC-1.pdf" },
  HAS_ENDO: { label: "HAS – Endométriose : messages clés pour le médecin généraliste (2017)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2018-01/prise_en_charge_de_lendiometriose_-_messages_cles_destines_au_medecin_generaliste.pdf" },
  MERCK_SCAPHO: { label: "Manuel MSD – Fractures du scaphoïde carpien", url: "https://www.merckmanuals.com/fr-ca/professional/blessures-empoisonnement/fractures/fractures-du-scapho%C3%AFde-carpien-os-naviculaire" }
});

Object.assign(EXAMS, {
  ECHO_ABDO: { label: "Échographie abdominale", irm: false },
  ECHODOPPLER_AORTE: { label: "Écho-Doppler de l'aorte abdominale – dépistage unique d'anévrisme", irm: false },
  ECHO_APP: { label: "Échographie abdominale – suspicion d'appendicite (examinateur entraîné)", irm: false },
  TDM_APP: { label: "Scanner abdomino-pelvien avec injection – suspicion d'appendicite", irm: false },
  IRM_APP: { label: "IRM abdomino-pelvienne sans injection – suspicion d'appendicite chez la femme enceinte", irm: true },
  ECHO_PELV: { label: "Échographie pelvienne sus-pubienne et endovaginale", irm: false },
  IRM_PELV: { label: "IRM pelvienne (protocole spécifique, radiologue référent)", irm: true },
  RX_POIGNET: { label: "Radiographies du poignet de face et de profil (avec incidences du scaphoïde si suspicion)", irm: false, cote: true },
  RX_SCAPHO_CTRL: { label: "Radiographies de contrôle du poignet avec incidences du scaphoïde (10 à 14 jours après le traumatisme)", irm: false, cote: true },
  IRM_POIGNET: { label: "IRM du poignet – suspicion de fracture du scaphoïde", irm: true, cote: true },
  TDM_POIGNET: { label: "Scanner du poignet – suspicion de fracture du scaphoïde", irm: false, cote: true }
});

Object.assign(TREES, {
  // ───────────────────────── ÉCHOGRAPHIE ABDOMINALE ─────────────────────────
  ABDO: {
    title: "Échographie abdominale", group: "Abdomen et vaisseaux", context: "Biliaire, foie, masse, douleur, aorte",
    requestable: ["ECHO_ABDO", "ECHODOPPLER_AORTE"], start: "ab_ctx",
    nodes: {
      ab_ctx: { type: "question", text: "Quelle est la situation ?",
        options: [
          { label: "Douleur de l'hypochondre droit, suspicion de lithiase biliaire (colique hépatique)", next: "ab_bil" },
          { label: "Ictère", next: "ab_r_ictere" },
          { label: "Bilan hépatique perturbé (cytolyse, cholestase)", next: "ab_r_bh" },
          { label: "Masse abdominale palpable", next: "ab_r_masse" },
          { label: "Douleur abdominale aiguë inexpliquée", next: "ab_dou" },
          { label: "Dépistage d'un anévrisme de l'aorte abdominale", next: "ab_aaa" },
          { label: "Suspicion d'appendicite", next: "ab_r_app" }
        ] },
      ab_bil: { type: "checklist", text: "Y a-t-il des signes de complication ?",
        groups: [{ title: "Complication (cholécystite, angiocholite)", items: [
          "Fièvre, frissons", "Ictère"
        ]}], any: "ab_r_bil_urg", none: "ab_r_bil" },
      ab_dou: { type: "checklist", text: "La douleur est-elle assez forte pour faire suspecter une urgence chirurgicale ?",
        groups: [{ title: "Urgence chirurgicale suspectée", items: [
          "Défense ou contracture abdominale", "Fièvre élevée ou altération de l'état général", "Douleur intense justifiant une hospitalisation", "Signes d'occlusion"
        ]}], any: "ab_r_dou_urg", none: "ab_r_dou" },
      ab_aaa: { type: "question", text: "Le patient correspond-il à l'un de ces profils ?",
        options: [
          { label: "Homme de 65 à 75 ans, fumeur ou ancien fumeur chronique", next: "ab_r_aaa" },
          { label: "Homme de 50 à 75 ans avec un antécédent familial d'anévrisme de l'aorte abdominale", next: "ab_r_aaa" },
          { label: "Aucun de ces profils, ou dépistage déjà réalisé", next: "ab_r_aaa_no" }
        ] },
      ab_r_bil_urg: { type: "result", verdict: "urgent", title: "Suspicion de cholécystite ou d'angiocholite",
        text: "Fortes douleurs de type colique hépatique avec fièvre : symptômes typiques d'une cholécystite aiguë ; fièvre et ictère font évoquer une angiocholite. Prise en charge urgente. L'échographie abdominale est l'examen de choix pour le diagnostic.",
        sources: ["SNFGE_BIL"] },
      ab_r_bil: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "L'échographie est l'examen de base pour rechercher une lithiase vésiculaire ; elle ne permet pas d'exclure avec certitude une lithiase du cholédoque (la cholangio-IRM et l'écho-endoscopie relèvent du spécialiste). L'ASP n'est pas indiqué : seuls 10 % des calculs biliaires sont visibles.",
        exam: "ECHO_ABDO", sources: ["BE_G"] },
      ab_r_ictere: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "L'échographie est l'examen majeur pour affirmer une dilatation des voies biliaires et localiser un éventuel obstacle ; la dilatation peut être très modérée au début. Le scanner et l'IRM sont des examens spécialisés de 2e intention. Un ictère fébrile fait évoquer une angiocholite : prise en charge urgente.",
        exam: "ECHO_ABDO", sources: ["BE_G", "SNFGE_BIL"] },
      ab_r_bh: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "Devant une perturbation des tests hépatiques, une échographie abdominale est réalisée à la recherche d'un diagnostic différentiel : elle élimine une dilatation des voies biliaires (cholestase obstructive) ou une lésion tumorale du foie, et recherche des signes d'hépatopathie chronique. La stéatopathie métabolique est la cause la plus fréquente d'un bilan hépatique perturbé.",
        exam: "ECHO_ABDO", sources: ["AFEF"] },
      ab_r_masse: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "Toute masse palpable est visible en échographie : elle en précise la topographie, les rapports et donne des arguments de caractérisation. Le scanner ou l'IRM précisent ensuite la structure de la masse si besoin. L'ASP n'a d'intérêt que pour rechercher des calcifications.",
        exam: "ECHO_ABDO", sources: ["BE_G"] },
      ab_r_dou_urg: { type: "result", verdict: "urgent", title: "Urgence chirurgicale suspectée",
        text: "La stratégie d'imagerie (échographie, scanner, parfois ASP) dépend de la présentation clinique, de la localisation de la douleur et des signes associés. Adressez le patient en urgence.",
        sources: ["BE_G"] },
      ab_r_dou: { type: "result", verdict: "ok", title: "Échographie en orientation",
        text: "Devant une douleur abdominale aiguë inexpliquée, l'échographie est un examen d'orientation avant de poser l'indication d'autres explorations ; le scanner est utile selon la présentation clinique. L'ASP n'est pas indiqué en routine (seulement pour rechercher un pneumopéritoine ou une occlusion).",
        exam: "ECHO_ABDO", sources: ["BE_G"] },
      ab_r_aaa: { type: "result", verdict: "ok", title: "Dépistage unique par écho-Doppler",
        text: "La HAS recommande de proposer une seule fois un dépistage par écho-Doppler aux hommes de 65 à 75 ans fumeurs ou anciens fumeurs chroniques, et aux hommes de 50 à 75 ans ayant un antécédent familial d'anévrisme. Ce dépistage n'a pas vocation à être répété.",
        exam: "ECHODOPPLER_AORTE", sources: ["HAS_AAA"] },
      ab_r_aaa_no: { type: "result", verdict: "no", title: "Pas de dépistage",
        text: "Le dépistage ciblé est réservé aux profils à risque définis par la HAS, et il est unique : il n'a pas vocation à être réitéré.",
        sources: ["HAS_AAA"] },
      ab_r_app: { type: "result", verdict: "discuss", title: "Utilisez le parcours « Suspicion d'appendicite »",
        text: "La suspicion d'appendicite a son propre parcours, avec des examens adaptés au profil du patient (grossesse, obésité, âge).",
        goto: "APPENDICITE", sources: ["SFCD"] }
    }
  },

  // ───────────────────────── APPENDICITE ─────────────────────────
  APPENDICITE: {
    title: "Suspicion d'appendicite", group: "Abdomen et vaisseaux", context: "Échographie, scanner ou IRM",
    requestable: ["ECHO_APP", "TDM_APP"], start: "ap_age",
    nodes: {
      ap_age: { type: "question", text: "Le patient est-il adulte ?",
        options: [ { label: "Oui", next: "ap_grav" }, { label: "Non (enfant, adolescent)", next: "ap_r_enf" } ] },
      ap_grav: { type: "checklist", text: "Y a-t-il des signes de gravité ?",
        groups: [{ title: "Gravité", items: [ "Défense généralisée ou contracture (péritonite)", "Signes de sepsis ou altération de l'état général" ] }],
        any: "ap_r_grav", none: "ap_bio" },
      ap_bio: { type: "question", text: "Y a-t-il au moins un des éléments suivants : douleur migrant vers la fosse iliaque droite, hyperleucocytose, CRP augmentée ?",
        options: [ { label: "Oui, au moins un", next: "ap_pop" }, { label: "Non, aucun des trois", next: "ap_r_peu" } ] },
      ap_pop: { type: "question", text: "Quel est le profil du patient ?",
        options: [
          { label: "Adulte sans particularité", next: "ap_r_std" },
          { label: "Femme enceinte", next: "ap_r_preg" },
          { label: "Patient obèse", next: "ap_r_obese" },
          { label: "Patient âgé", next: "ap_r_age" }
        ] },
      ap_r_enf: { type: "result", verdict: "discuss", title: "Hors du champ de l'outil",
        text: "Les recommandations SFCD-SIAD 2021 concernent l'adulte. Chez l'enfant, demandez l'avis du radiologue ou référez-vous à ADERIM.",
        sources: ["SFCD", "ADERIM"] },
      ap_r_grav: { type: "result", verdict: "urgent", title: "Urgence : avis chirurgical",
        text: "Signes de gravité : adressez le patient en urgence pour un avis chirurgical. L'imagerie sera organisée dans ce cadre.",
        sources: ["SFCD"] },
      ap_r_peu: { type: "result", verdict: "discuss", title: "Appendicite peu probable, mais non exclue",
        text: "En l'absence conjointe de douleur migrant vers la fosse iliaque droite, d'hyperleucocytose et de CRP augmentée, le diagnostic est peu probable sans pouvoir être exclu (grade C). Le choix entre une imagerie systématique et une surveillance adaptée au contexte est à discuter (avis d'experts).",
        exams: ["ECHO_APP"], sources: ["SFCD"] },
      ap_r_std: { type: "result", verdict: "ok", title: "Imagerie indispensable : échographie ou scanner",
        text: "Les critères cliniques et biologiques, même combinés dans un score, ne suffisent pas : une imagerie est indispensable (grade B). En 1re intention : échographie (par un examinateur entraîné) ou scanner avec injection (grade B). Après une échographie normale ou non concluante : scanner avec injection, IRM ou nouvelle échographie quelques heures plus tard (grade B). L'ASP n'a pas de place.",
        exams: ["ECHO_APP", "TDM_APP"], sources: ["SFCD"] },
      ap_r_preg: { type: "result", verdict: "ok", title: "Échographie ou IRM sans injection",
        text: "Chez la femme enceinte, l'échographie ou l'IRM sans injection peuvent être réalisées en 1re intention (grade B). Après une échographie normale ou non concluante, et sans accès à l'IRM, un scanner avec injection peut être réalisé en 2e intention (grade C).",
        exams: ["ECHO_APP", "IRM_APP"], sources: ["SFCD"] },
      ap_r_obese: { type: "result", verdict: "ok", title: "Scanner en 1re intention",
        text: "Chez le patient obèse, le scanner abdomino-pelvien avec injection peut être réalisé en 1re intention (grade C).",
        exam: "TDM_APP", sources: ["SFCD"] },
      ap_r_age: { type: "result", verdict: "ok", title: "Scanner en 1re intention",
        text: "Chez le patient âgé, le scanner abdomino-pelvien, avec ou sans injection, peut être réalisé en 1re intention (grade C).",
        exam: "TDM_APP", sources: ["SFCD"] }
    }
  },

  // ───────────────────────── ÉCHOGRAPHIE PELVIENNE ─────────────────────────
  PELVIS: {
    title: "Échographie pelvienne", group: "Abdomen et vaisseaux", context: "Douleur, saignement, masse, endométriose, DIU",
    requestable: ["ECHO_PELV", "IRM_PELV"], start: "pv_ctx",
    nodes: {
      pv_ctx: { type: "question", text: "Quelle est la situation ?",
        options: [
          { label: "Douleur pelvienne ou saignement chez une femme en âge de procréer", next: "pv_hcg" },
          { label: "Saignement après la ménopause", next: "pv_r_post" },
          { label: "Ménométrorragies avant la ménopause", next: "pv_r_meno" },
          { label: "Symptômes évocateurs d'endométriose (dysménorrhée intense, dyspareunie…)", next: "pv_endo" },
          { label: "Suspicion de masse pelvienne", next: "pv_r_masse" },
          { label: "Stérilet : fils non vus ou perte suspectée", next: "pv_r_diu" },
          { label: "Infertilité féminine", next: "pv_r_inf" }
        ] },
      pv_hcg: { type: "question", text: "Quel est le résultat du test de grossesse (hCG) ?",
        options: [ { label: "Positif", next: "pv_geu" }, { label: "Négatif", next: "pv_r_douleur" }, { label: "Non fait", next: "pv_r_hcg" } ] },
      pv_geu: { type: "checklist", text: "Grossesse débutante : y a-t-il des signes de gravité ?",
        groups: [{ title: "Gravité", items: [ "Douleur intense, défense ou douleur à la décompression", "Malaise, signes de choc", "Saignement abondant" ] }],
        any: "pv_r_geu_urg", none: "pv_r_geu" },
      pv_endo: { type: "question", text: "Y a-t-il des signes d'endométriose profonde, une infertilité, un endométriome ou une résistance au traitement médical ?",
        options: [ { label: "Non : premier bilan", next: "pv_r_endo1" }, { label: "Oui", next: "pv_r_endo2" }, { label: "Endométriose traitée et asymptomatique (surveillance)", next: "pv_r_endo_surv" } ] },
      pv_r_hcg: { type: "result", verdict: "no", title: "Faire d'abord un test de grossesse",
        text: "Le test de grossesse est essentiel au dépistage d'une grossesse extra-utérine et devrait être réalisé avant toute autre procédure. L'échographie s'interprète en fonction du dosage quantitatif de l'hCG.",
        sources: ["CNGOF_GEU", "BE_I"] },
      pv_r_geu_urg: { type: "result", verdict: "urgent", title: "Suspicion de grossesse extra-utérine compliquée",
        text: "Douleur à la mobilisation utérine, à la décompression ou défense abdominale : ces signes justifient un transfert sans retard en milieu spécialisé.",
        sources: ["CNGOF_GEU"] },
      pv_r_geu: { type: "result", verdict: "ok", title: "Échographie pelvienne indiquée",
        text: "Devant des douleurs pelviennes ou des métrorragies en début de grossesse, une échographie pelvienne est recommandée pour localiser la grossesse et évaluer son évolutivité ; la voie endovaginale améliore la rapidité et la sensibilité du diagnostic. Elle s'interprète avec un dosage quantitatif de l'hCG, à joindre à la demande.",
        exam: "ECHO_PELV", sources: ["CNGOF_GEU", "BE_I"] },
      pv_r_douleur: { type: "result", verdict: "ok", title: "Échographie pelvienne indiquée",
        text: "Devant des douleurs pelviennes (notamment suspicion d'infection pelvienne ou d'endométriose), l'échographie est indiquée. L'IRM est un complément en cas de doute diagnostique ou pour le bilan pré-opératoire (examen spécialisé).",
        exam: "ECHO_PELV", sources: ["BE_I"] },
      pv_r_post: { type: "result", verdict: "ok", title: "Échographie endovaginale indiquée",
        text: "Un saignement après la ménopause doit faire rechercher une cause organique, notamment un cancer de l'endomètre : l'échographie endovaginale est indiquée. Au-delà d'une épaisseur de l'endomètre de 4 à 5 mm selon les référentiels (seuil plus élevé sous traitement hormonal), ou en cas de saignements récidivants, des explorations complémentaires (hystéroscopie, histologie) sont recommandées.",
        exam: "ECHO_PELV", sources: ["CNGOF_MENO", "BE_I"] },
      pv_r_meno: { type: "result", verdict: "ok", title: "Échographie pelvienne indiquée",
        text: "Devant des ménométrorragies, l'échographie endovaginale recherche une cause au niveau de l'endomètre, du myomètre, voire de l'ovaire.",
        exam: "ECHO_PELV", sources: ["BE_I"] },
      pv_r_endo1: { type: "result", verdict: "ok", title: "Échographie pelvienne en 1re intention",
        text: "Les examens de 1re intention sont l'examen clinique (gynécologique si possible) et l'échographie pelvienne. Aucun dosage biologique n'est utile. L'absence de lésion visible à l'échographie n'élimine pas une endométriose profonde.",
        exam: "ECHO_PELV", sources: ["HAS_ENDO"] },
      pv_r_endo2: { type: "result", verdict: "ok", title: "Examens de 2e intention par un référent",
        text: "Les examens de 2e intention sont l'IRM pelvienne (radiologue référent) et l'échographie endovaginale (échographiste référent) : pour évaluer l'extension, en cas de discordance entre symptômes et examens de 1re intention négatifs, ou avant une chirurgie. Ils apportent des informations complémentaires.",
        exams: ["IRM_PELV", "ECHO_PELV"], sources: ["HAS_ENDO"] },
      pv_r_endo_surv: { type: "result", verdict: "no", title: "Pas de surveillance systématique",
        text: "Une surveillance systématique par imagerie n'est pas nécessaire chez une patiente traitée pour endométriose et asymptomatique.",
        sources: ["HAS_ENDO"] },
      pv_r_masse: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "L'association des voies sus-pubienne et endovaginale est souvent nécessaire pour confirmer la lésion, déterminer l'organe en cause et sa nature. L'IRM est la meilleure exploration quand l'échographie ne peut pas préciser l'origine ou la nature de la masse (examen spécialisé).",
        exam: "ECHO_PELV", sources: ["BE_I"] },
      pv_r_diu: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "Échographie par voie sus-pubienne et/ou endovaginale. Si le stérilet n'est pas visible en échographie, un ASP est indiqué.",
        exam: "ECHO_PELV", sources: ["BE_I"] },
      pv_r_inf: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "L'échographie évalue l'utérus (malformation, pathologie de l'endomètre ou du myomètre), les ovaires et recherche une dilatation tubaire. L'hystérosalpingographie et l'IRM sont des examens de 2e intention.",
        exam: "ECHO_PELV", sources: ["BE_I"] }
    }
  },

  // ───────────────────────── POIGNET ─────────────────────────
  POIGNET: {
    title: "Traumatisme du poignet", group: "Membres", context: "Radiographie, scanner ou IRM",
    requestable: ["RX_POIGNET", "IRM_POIGNET", "TDM_POIGNET"], start: "pg_rx",
    nodes: {
      pg_rx: { type: "question", text: "Des radiographies du poignet ont-elles déjà été faites depuis le traumatisme ?",
        options: [ { label: "Non", next: "pg_r_rx" }, { label: "Oui, elles sont normales", next: "pg_scapho" }, { label: "Oui, elles montrent une fracture", next: "pg_r_fract" } ] },
      pg_scapho: { type: "question", text: "Une fracture du scaphoïde reste-t-elle suspectée cliniquement ?",
        options: [ { label: "Oui", next: "pg_r_scapho" }, { label: "Non", next: "pg_r_no" } ] },
      pg_r_rx: { type: "result", verdict: "ok", title: "Radiographies indiquées",
        text: "Les radiographies (face, profil, et incidences du scaphoïde si une fracture du scaphoïde est suspectée) sont l'examen initial. Seules environ 70 % des fractures du scaphoïde sont visibles sur les radiographies initiales.",
        exam: "RX_POIGNET", sources: ["BE_K", "MERCK_SCAPHO"] },
      pg_r_scapho: { type: "result", verdict: "discuss", title: "Fracture du scaphoïde suspectée, radios normales",
        text: "Au départ, une fracture du scaphoïde peut être invisible, même sur les incidences spécifiques. Le plus souvent : immobilisation présomptive (attelle prenant le pouce) puis radiographies de contrôle 10 à 14 jours plus tard si les signes cliniques sont importants. Pour exclure plus vite une fracture, certains centres recourent au scanner ou à l'IRM (examens spécialisés) ; l'IRM est la plus précise en phase aiguë.",
        exams: ["RX_SCAPHO_CTRL", "IRM_POIGNET", "TDM_POIGNET"], sources: ["BE_K", "MERCK_SCAPHO"] },
      pg_r_fract: { type: "result", verdict: "discuss", title: "Fracture : prise en charge orthopédique",
        text: "Une fracture visible relève d'une prise en charge orthopédique ; une imagerie complémentaire éventuelle se décide dans ce cadre.",
        sources: ["BE_K"] },
      pg_r_no: { type: "result", verdict: "no", title: "Pas d'autre imagerie",
        text: "Radiographies normales sans suspicion clinique persistante de fracture du scaphoïde : pas d'imagerie complémentaire. Réévaluez si la douleur persiste.",
        sources: ["BE_K"] }
    }
  }
});

Object.assign(CLIN, {
  "ABDO.ab_ctx": ["Douleur de l'hypochondre droit, suspicion de lithiase biliaire", "Ictère", "Bilan hépatique perturbé", "Masse abdominale palpable", "Douleur abdominale aiguë inexpliquée", "Dépistage d'anévrisme de l'aorte abdominale", "Suspicion d'appendicite"],
  "ABDO.ab_bil": { any: "", none: "Pas de fièvre ni d'ictère" },
  "ABDO.ab_dou": { any: "", none: "Pas de signe d'urgence chirurgicale" },
  "ABDO.ab_aaa": ["Homme de 65 à 75 ans, fumeur ou ancien fumeur", "Homme de 50 à 75 ans, antécédent familial d'anévrisme", ""],
  "APPENDICITE.ap_age": ["", ""],
  "APPENDICITE.ap_grav": { any: "", none: "Pas de signe de gravité" },
  "APPENDICITE.ap_bio": ["Douleur migrant en fosse iliaque droite et/ou hyperleucocytose et/ou CRP augmentée", "Ni douleur migratrice, ni hyperleucocytose, ni CRP augmentée"],
  "APPENDICITE.ap_pop": ["", "Grossesse en cours", "Obésité", "Patient âgé"],
  "PELVIS.pv_ctx": ["Douleur pelvienne ou saignement, femme en âge de procréer", "Saignement après la ménopause", "Ménométrorragies", "Symptômes évocateurs d'endométriose", "Suspicion de masse pelvienne", "Stérilet : fils non vus", "Infertilité féminine"],
  "PELVIS.pv_hcg": ["Test de grossesse positif (joindre le dosage quantitatif d'hCG)", "Test de grossesse négatif", ""],
  "PELVIS.pv_geu": { any: "", none: "Pas de signe de gravité" },
  "PELVIS.pv_endo": ["Premier bilan", "Signes d'endométriose profonde, infertilité, endométriome ou résistance au traitement", ""],
  "POIGNET.pg_rx": ["Traumatisme du poignet, pas de radiographie", "Traumatisme du poignet, radiographies initiales normales", "Fracture à la radiographie"],
  "POIGNET.pg_scapho": ["Suspicion clinique persistante de fracture du scaphoïde", ""]
});

// ───────────────────────── APPENDICITE DE L'ENFANT ─────────────────────────
Object.assign(SOURCES, {
  HAS_CHIR_PED: { label: "HAS – Pertinence des soins en chirurgie pédiatrique : 5 messages", url: "https://www.has-sante.fr/jcms/c_2831488/fr/pertinence-des-soins-en-chirurgie-pediatrique" },
  PEDIA_UNIV: { label: "Collège national des pédiatres universitaires – Douleurs abdominopelviennes de l'enfant", url: "https://www.pedia-univ.fr/deuxieme-cycle/referentiel/gastroenterologie-nutrition-chirurgie-abdomino-pelvienne/douleurs-abdominopelviennes" },
  SFIP_DAA: { label: "SFIP (imagerie pédiatrique) – Douleurs abdominales aiguës chez l'enfant", url: "https://sfip-radiopediatrie.org/wp-content/uploads/2025/02/Douleurs-abdominales-aigues-chez-lenfant-F-Avni-M-Cassart.pdf" },
  SFIP_APP: { label: "SFIP – Appendicite aiguë de l'enfant (Trousseau, 2017)", url: "https://www.sfip-radiopediatrie.org/wp-content/uploads/2018/07/kotobi_trousseau_2017.pdf" }
});

Object.assign(EXAMS, {
  ECHO_APP_ENF: { label: "Échographie abdomino-pelvienne – suspicion d'appendicite (enfant)", irm: false },
  IRM_APP_ENF: { label: "IRM abdomino-pelvienne – suspicion d'appendicite (enfant), après avis du chirurgien", irm: true },
  TDM_APP_ENF: { label: "Scanner abdomino-pelvien avec injection – suspicion d'appendicite (enfant), après avis du chirurgien", irm: false }
});

TREES.APPENDICITE_ENF = {
  title: "Suspicion d'appendicite de l'enfant", group: "Abdomen et vaisseaux", context: "Échographie en 1re intention",
  requestable: ["ECHO_APP_ENF"], start: "ae_grav",
  nodes: {
    ae_grav: { type: "checklist", text: "Y a-t-il des signes de gravité ?",
      groups: [{ title: "Gravité", items: [
        "Défense généralisée ou contracture (péritonite)",
        "Signes de sepsis ou altération de l'état général",
        "Signes d'occlusion (vomissements bilieux, ballonnement progressif)"
      ]}], any: "ae_r_urg", none: "ae_diag" },
    ae_diag: { type: "question", text: "Après l'examen clinique et la biologie, comment est le diagnostic d'appendicite ?",
      options: [
        { label: "Incertain", next: "ae_echo" },
        { label: "Très probable (forte suspicion clinique)", next: "ae_echo" },
        { label: "Peu probable : examen clinique normal", next: "ae_r_normal" }
      ] },
    ae_echo: { type: "question", text: "Une échographie a-t-elle déjà été faite pour cet épisode ?",
      options: [
        { label: "Non", next: "ae_r_echo" },
        { label: "Oui, mais elle est non contributive ou discordante avec la clinique", next: "ae_r_2e" }
      ] },
    ae_r_urg: { type: "result", verdict: "urgent", title: "Urgence : avis chirurgical pédiatrique",
      text: "Signes de gravité : adressez l'enfant en urgence pour un avis chirurgical. La prescription d'examens irradiants (ASP, scanner) ne devrait se faire qu'après l'examen clinique du chirurgien.",
      sources: ["SFIP_APP", "BE_M"] },
    ae_r_echo: { type: "result", verdict: "ok", title: "Échographie en 1re intention",
      text: "Chez l'enfant, le diagnostic repose sur un faisceau d'arguments cliniques et biologiques. Lorsqu'une imagerie est nécessaire, l'échographie est l'examen de 1re intention, quel que soit l'âge. Ne pas prescrire de scanner en 1re intention.",
      exam: "ECHO_APP_ENF", sources: ["HAS_CHIR_PED", "SFIP_DAA", "PEDIA_UNIV"] },
    ae_r_2e: { type: "result", verdict: "discuss", title: "2e intention : à décider avec le chirurgien et le radiologue",
      text: "Une nouvelle échographie peut être réalisée. Le scanner (injecté) ou l'IRM ont de rares indications : enfant obèse, ou cas ambigus avec échographie répétée non contributive (appendicite pelvienne ou ectopique, discordance avec la clinique). Certaines équipes préfèrent l'IRM au scanner. Ces examens se décident après avis spécialisé.",
      exams: ["ECHO_APP_ENF", "IRM_APP_ENF", "TDM_APP_ENF"], sources: ["PEDIA_UNIV", "SFIP_DAA", "SFIP_APP"] },
    ae_r_normal: { type: "result", verdict: "no", title: "Pas d'imagerie systématique",
      text: "Douleur abdominale avec examen clinique normal : l'ASP n'est pas indiqué (il n'est utile qu'en présence de signes orientant vers une pathologie chirurgicale). L'échographie n'est pas un examen de routine dans ce cas ; elle reste l'examen à privilégier si une imagerie devient nécessaire.",
      sources: ["BE_M"] }
  }
};
SOURCES.BE_M = { label: "SPF Santé publique (Belgique) – Recommandations de prescription en imagerie, pédiatrie (adaptées du guide français 2005)", url: "https://www.health.belgium.be/sites/default/files/media/files/2025-07/m_pediatrie_1.pdf" };

Object.assign(CLIN, {
  "APPENDICITE_ENF.ae_grav": { any: "", none: "Pas de signe de gravité" },
  "APPENDICITE_ENF.ae_diag": ["Suspicion d'appendicite, diagnostic clinico-biologique incertain", "Forte suspicion clinique d'appendicite", "Examen clinique normal"],
  "APPENDICITE_ENF.ae_echo": ["", "Échographie antérieure non contributive ou discordante avec la clinique"]
});

// L'appendicite de l'adulte renvoie désormais vers le parcours enfant
TREES.APPENDICITE.title = "Suspicion d'appendicite de l'adulte";
TREES.APPENDICITE.nodes.ap_r_enf = { type: "result", verdict: "discuss", title: "Utilisez le parcours de l'enfant",
  text: "Chez l'enfant, la stratégie d'imagerie est différente : l'échographie est l'examen de 1re intention et le scanner n'est pas indiqué d'emblée.",
  goto: "APPENDICITE_ENF", sources: ["HAS_CHIR_PED"] };
TREES.ABDO.nodes.ab_r_app.text = "La suspicion d'appendicite a ses propres parcours, chez l'adulte et chez l'enfant, avec des examens adaptés au profil du patient.";
