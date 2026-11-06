// Extension médecine générale : situations cliniques courantes.
// Chaque arbre part d'une situation clinique et oriente vers l'examen recommandé.

Object.assign(SOURCES, {
  SFEMC: { label: "SFEMC 2021 – Migraine de l'adulte : quand demander une imagerie (synthèse Vidal)", url: "https://www.vidal.fr/actualites/30481-migraine-au-dela-de-la-cephalee-tout-un-corpus-de-signes.html" },
  CEN: { label: "Collège des enseignants de neurologie – Céphalée inhabituelle aiguë et chronique", url: "https://www.cen-neurologie.fr/second-cycle/cephalee-inhabituelle-aigue-et-chronique-chez-ladulte-et-lenfant" },
  HAS_CEPH_ENF: { label: "HAS – Céphalées de l'enfant et de l'adolescent : pertinence de l'imagerie (2024)", url: "https://www.has-sante.fr/jcms/p_3383435/fr/cephalees-de-l-enfant-et-l-adolescent-pertinence-de-l-imagerie" },
  SFMU_TC: { label: "SFMU – Traumatisme crânien léger de l'adulte, recommandations 2022", url: "https://www.sfmu.org/upload/consensus/RPP-TCL-2022.pdf" },
  HAS_CERV: { label: "HAS / G4 – Pertinence de l'imagerie cervicale (2020)", url: "https://www.has-sante.fr/jcms/p_3217591/fr/cervicalgie-l-imagerie-uniquement-dans-des-cas-bien-definis" },
  HAS_CERV_FICHE: { label: "HAS / G4 – Cervicalgie non traumatique de l'adulte, fiche (2020)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2020-11/app_356_fiche_pertinence_imagerie_cervicalgie_non_trauma_mel.pdf" },
  HAS_EPAULE: { label: "HAS – Épaule douloureuse non traumatique de l'adulte (2023)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2023-08/conduite_diagnostique_devant_une_epaule_douloureuse_non_traumatique_de_ladulte_et_prise_en_charge_des_tendinopathies_de_la_c.pdf" },
  HAS_CHEV: { label: "HAS – Entorse du ligament collatéral latéral de la cheville (2025)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2025-05/_reco475_entorse_cheville_recommandation.pdf" },
  SFMU_CHEV: { label: "SFMU – L'entorse de cheville au service d'urgences (règles d'Ottawa)", url: "https://www.sfmu.org/upload/consensus/cc_cheville.pdf" },
  HAS_THYR: { label: "HAS / G4 – Exploration des pathologies thyroïdiennes de l'adulte (2021)", url: "https://www.has-sante.fr/upload/docs/application/pdf/2021-09/fiche_exploration_des_pathologies_thyroidiennes_chez_ladulte_pertinence_et_criteres_de_qualite_de_lechographie_pertinence_de.pdf" },
  HAS_OSTEO: { label: "HAS – Ostéoporose : indications de l'ostéodensitométrie (synthèse, avis 2006)", url: "https://www.has-sante.fr/upload/docs/application/pdf/osteoporose_synthese.pdf" },
  HAS_SEIN: { label: "HAS – Dépistage du cancer du sein : femmes à haut risque et modalités (2014)", url: "https://www.has-sante.fr/jcms/c_1741170/fr/depistage-du-cancer-du-sein-en-france-identification-des-femmes-a-haut-risque-et-modalites-de-depistage" },
  CNGOF_SEIN: { label: "CNGOF – Tumeurs bénignes du sein, RPC 2015", url: "https://cngof.fr/app/uploads/2025/11/Tumeurs20bC3A9nignes20du20sein202015-RPC.pdf?x92631" },
  AFU: { label: "AFU – Lithiase urinaire : diagnostic, recommandations 2022", url: "https://www.urofrance.org/recommandation/2022-recommendations-of-the-afu-lithiasis-committee-diagnosis/" },
  SPLF: { label: "SPLF et sociétés associées – Maladie veineuse thromboembolique, recommandations 2019", url: "https://splf.fr/wp-content/uploads/2020/07/recos-veineuse-thromboembolique.pdf" },
  INCA_POUMON: { label: "INCa – Programme pilote IMPULSION de dépistage du cancer du poumon", url: "https://www.cancer.fr/Media/documents/publications/depliant-le-depistage-des-cancers-du-poumon-a5" },
  HAS_POUMON: { label: "HAS – Dépistage du cancer du poumon : programme pilote (2022)", url: "https://www.has-sante.fr/jcms/p_3312901/fr/depistage-du-cancer-du-poumon-la-has-recommande-l-engagement-d-un-programme-pilote" },
  COFER: { label: "COFER (Collège français des enseignants en rhumatologie) – Arthrose", url: "https://www.lecofer.org/item-cours-1-8-0.php" }
});

Object.assign(EXAMS, {
  IRM_CEREBRALE: { label: "IRM cérébrale", irm: true },
  TDM_CEREBRAL: { label: "Scanner cérébral sans injection", irm: false },
  RX_CERVICAL: { label: "Radiographies du rachis cervical", irm: false },
  IRM_CERVICAL: { label: "IRM du rachis cervical", irm: true },
  RX_EPAULE: { label: "Radiographies de l'épaule : face en rotation neutre, interne et externe, et faux profil de Lamy", irm: false, cote: true },
  ECHO_EPAULE: { label: "Échographie de l'épaule (échographiste expérimenté en ostéo-articulaire)", irm: false, cote: true },
  IRM_EPAULE: { label: "IRM de l'épaule (radiologue expérimenté en ostéo-articulaire)", irm: true, cote: true },
  RX_CHEVILLE: { label: "Radiographies de la cheville et/ou du pied (selon la zone douloureuse)", irm: false, cote: true },
  ECHO_CHEVILLE: { label: "Échographie de la cheville et du pied", irm: false, cote: true },
  ECHO_THYR: { label: "Échographie thyroïdienne et cervicale", irm: false },
  SCINTI_THYR: { label: "Scintigraphie thyroïdienne", irm: false },
  DMO: { label: "Ostéodensitométrie (DXA) : rachis lombaire et extrémité supérieure du fémur", irm: false },
  MAMMO_DO: { label: "Mammographie de dépistage (programme de dépistage organisé, 50 à 74 ans)", irm: false },
  MAMMO_HR: { label: "Mammographie bilatérale (± échographie mammaire) – surveillance d'une femme à risque élevé", irm: false },
  ECHO_SEIN: { label: "Échographie mammaire", irm: false, cote: true },
  MAMMO_ECHO: { label: "Mammographie et échographie mammaires", irm: false, cote: true },
  TDM_URO: { label: "Scanner abdomino-pelvien sans injection (faible dose si possible) – suspicion de colique néphrétique", irm: false },
  ECHO_RENALE: { label: "Échographie rénale et vésicale", irm: false },
  ECHODOPPLER_MI: { label: "Écho-Doppler veineux complet des membres inférieurs (veines proximales et distales)", irm: false, cote: true },
  TDM_CHEVILLE: { label: "Scanner de la cheville et/ou du pied", irm: false, cote: true },
  RX_HANCHE: { label: "Radiographies : bassin debout de face et faux profil de Lequesne des deux hanches", irm: false },
  IRM_HANCHE: { label: "IRM de la hanche", irm: true, cote: true }
});

Object.assign(TREES, {
  // ───────────────────────── CÉPHALÉE ADULTE ─────────────────────────
  CEPH_AD: {
    title: "Céphalée de l'adulte", group: "Tête et cou", context: "Scanner ou IRM cérébrale",
    requestable: ["IRM_CEREBRALE", "TDM_CEREBRAL"], start: "ca_urg",
    nodes: {
      ca_urg: { type: "checklist", text: "Y a-t-il un signe imposant une prise en charge en urgence ?",
        groups: [{ title: "Urgence", items: [
          "Céphalée brutale (maximale en moins d'une heure), voire en coup de tonnerre (maximale en moins d'une minute)",
          "Céphalée récente ou d'aggravation récente (moins de 7 jours) et inhabituelle",
          "Fièvre associée, sans cause générale évidente",
          "Signes neurologiques ou anomalie de l'examen clinique",
          "Symptômes évocateurs d'une intoxication (monoxyde de carbone en particulier)",
          "Contexte d'immunosuppression"
        ]}], any: "ca_r_urg", none: "ca_susp" },
      ca_susp: { type: "checklist", text: "Y a-t-il un élément faisant suspecter une autre cause que la migraine ?",
        groups: [{ title: "Imagerie indiquée (hors urgence)", items: [
          "Crises de migraine apparues après 50 ans",
          "Aura atypique : début brutal, durée de plus de 60 minutes ou absence de signes visuels",
          "Migraine chronique depuis moins d'un an",
          "Céphalée inhabituelle, présente ou aggravée depuis plus de 7 jours"
        ]}], any: "ca_r_irm", none: "ca_typ" },
      ca_typ: { type: "question", text: "S'agit-il de crises de migraine ou de céphalées de tension typiques, avec un examen clinique normal ?",
        options: [ { label: "Oui, céphalée primaire typique", next: "ca_r_no" }, { label: "Non ou doute diagnostique", next: "ca_r_doute" } ] },
      ca_r_urg: { type: "result", verdict: "urgent", title: "Urgence : adresser le patient",
        text: "Le patient doit être adressé en urgence pour une imagerie cérébrale et les examens adaptés. Une céphalée brutale impose un scanner cérébral sans injection en urgence, à la recherche d'une hémorragie sous-arachnoïdienne, complété d'un angioscanner.",
        sources: ["SFEMC", "CEN"] },
      ca_r_irm: { type: "result", verdict: "ok", title: "IRM cérébrale indiquée",
        text: "La suspicion d'une autre cause que la migraine justifie une IRM cérébrale et/ou d'autres examens complémentaires.",
        exam: "IRM_CEREBRALE", sources: ["SFEMC", "CEN"] },
      ca_r_no: { type: "result", verdict: "no", title: "Pas d'imagerie",
        text: "Aucun examen complémentaire, imagerie cérébrale ou autre, n'est indiqué chez un patient ayant des crises de migraine typiques avec un examen clinique normal. Une IRM sans indication expose à la découverte d'incidentalomes, sources d'angoisse et d'examens répétés.",
        sources: ["SFEMC"] },
      ca_r_doute: { type: "result", verdict: "discuss", title: "Avis spécialisé",
        text: "En cas de doute diagnostique, il est recommandé d'adresser le patient au spécialiste (neurologue), qui jugera de l'imagerie.",
        sources: ["SFEMC"] }
    }
  },

  // ───────────────────────── CÉPHALÉE ENFANT ─────────────────────────
  CEPH_ENF: {
    title: "Céphalée de l'enfant ou de l'adolescent", group: "Tête et cou", context: "Scanner ou IRM cérébrale",
    requestable: ["IRM_CEREBRALE", "TDM_CEREBRAL"], start: "ce_rf",
    nodes: {
      ce_rf: { type: "checklist", text: "Après anamnèse et examen neurologique rigoureux : y a-t-il un drapeau rouge ?",
        groups: [{ title: "Drapeaux rouges (HAS 2024)", items: [
          "Céphalée « en coup de tonnerre »", "Anomalie neurologique, avec ou sans fièvre", "Signe(s) d'hypertension intracrânienne",
          "Trouble endocrinien central", "Céphalée récente, inhabituelle et continue, d'intensité croissante"
        ]}], any: "ce_inst", none: "ce_r_no" },
      ce_inst: { type: "question", text: "L'état clinique est-il instable, y a-t-il un trouble de la conscience ou une céphalée en coup de tonnerre ?",
        options: [ { label: "Oui", next: "ce_r_tdm" }, { label: "Non", next: "ce_r_irm" } ] },
      ce_r_no: { type: "result", verdict: "no", title: "Pas d'imagerie",
        text: "Une imagerie cérébrale n'est pas indiquée en cas de céphalée primaire (migraine et/ou céphalée de tension) sans drapeau rouge.",
        sources: ["HAS_CEPH_ENF"] },
      ce_r_tdm: { type: "result", verdict: "urgent", title: "Urgence : scanner en 1re intention",
        text: "En cas d'état clinique instable, de trouble de la conscience ou de céphalée en coup de tonnerre, le scanner est préconisé en 1re intention. Adressez l'enfant en urgence.",
        sources: ["HAS_CEPH_ENF"] },
      ce_r_irm: { type: "result", verdict: "ok", title: "IRM cérébrale en 1re intention",
        text: "Lorsqu'une imagerie cérébrale est indiquée, l'IRM est préconisée en 1re intention.",
        exam: "IRM_CEREBRALE", sources: ["HAS_CEPH_ENF"] }
    }
  },

  // ───────────────────────── TRAUMATISME CRÂNIEN LÉGER ─────────────────────────
  TC_AD: {
    title: "Traumatisme crânien léger de l'adulte", group: "Tête et cou", context: "Scanner cérébral",
    requestable: ["TDM_CEREBRAL"], start: "tc_high",
    nodes: {
      tc_high: { type: "checklist", text: "Y a-t-il un facteur de risque élevé de lésion intracrânienne ?",
        groups: [
          { title: "Anamnèse", items: ["Anticoagulant, bithérapie antiplaquettaire ou maladie hémorragique (hémophilie, Willebrand…)"] },
          { title: "Clinique", items: [
            "Signes de fracture de la base du crâne (otorrhée, rhinorrhée, ecchymose mastoïdienne ou périorbitaire, hémotympan) ou de la voûte (embarrure)",
            "Score de Glasgow inférieur à 15 deux heures après le traumatisme, sans intoxication",
            "Plus d'un épisode de vomissements", "Convulsions post-traumatiques", "Déficit neurologique focalisé"
          ] }
        ], any: "tc_r_high", none: "tc_inter" },
      tc_inter: { type: "checklist", text: "Y a-t-il un facteur de risque intermédiaire ?",
        groups: [{ title: "Risque intermédiaire", items: [
          "65 ans ou plus et traitement par un seul antiagrégant plaquettaire",
          "Score de Glasgow inférieur à 15 deux heures après le traumatisme, avec intoxication",
          "Traumatisme à cinétique élevée (éjection, véhicule retourné, piéton ou cycliste renversé sans casque, chute de plus de 2 m ou de plus de 5 marches)",
          "Amnésie des faits survenus plus de 30 minutes avant le traumatisme"
        ]}], any: "tc_r_inter", none: "tc_r_low" },
      tc_r_high: { type: "result", verdict: "urgent", title: "Urgence : scanner cérébral dans l'heure",
        text: "Risque élevé : scanner cérébral sans injection, idéalement dans l'heure suivant l'admission. Adressez le patient aux urgences. La radiographie du crâne n'a pas d'indication.",
        sources: ["SFMU_TC"] },
      tc_r_inter: { type: "result", verdict: "urgent", title: "Scanner cérébral dans les 8 heures",
        text: "Risque intermédiaire : scanner cérébral au plus tard dans les 8 heures. Un dosage de biomarqueurs (S100B dans les 3 heures, ou GFAP et UCH-L1 dans les 12 heures) peut permettre de l'éviter, s'il est disponible. Adressez le patient aux urgences.",
        sources: ["SFMU_TC"] },
      tc_r_low: { type: "result", verdict: "no", title: "Pas de scanner systématique",
        text: "Sans facteur de risque, les règles de décision identifient des patients à faible risque qui ne nécessitent ni surveillance prolongée à l'hôpital ni scanner. Une surveillance par un tiers est possible, en l'absence d'intoxication et de symptôme autre que des céphalées. La radiographie du crâne n'a pas d'indication.",
        sources: ["SFMU_TC", "FNMR"] }
    }
  },

  // ───────────────────────── CERVICALGIE ─────────────────────────
  CERV: {
    title: "Cervicalgie de l'adulte", group: "Rachis", context: "Radiographie ou IRM cervicale",
    requestable: ["RX_CERVICAL", "IRM_CERVICAL"], start: "cv_tr",
    nodes: {
      cv_tr: { type: "question", text: "La cervicalgie fait-elle suite à un traumatisme ?",
        options: [ { label: "Non, cervicalgie non traumatique", next: "cv_rf" }, { label: "Oui, après un traumatisme non pénétrant", next: "cv_t" } ] },
      cv_rf: { type: "checklist", text: "Y a-t-il un drapeau rouge ?",
        help: "Liste HAS non exhaustive, fondée sur l'avis d'experts.",
        groups: [
          { title: "Douleur et neurologie", items: [
            "Douleur d'aggravation progressive, permanente et insomniante",
            "Déficit moteur radiculaire, avec ou sans névralgie cervico-brachiale",
            "Atteinte médullaire (déficit sous-lésionnel, signes pyramidaux, troubles vésico-sphinctériens)" ] },
          { title: "Terrain", items: [
            "Antécédent de cancer, altération de l'état général ou perte de poids inexpliquée",
            "Antécédent de maladie inflammatoire rhumatismale",
            "Fièvre inexpliquée, drogues IV, immunosuppression ou bactériémie récente",
            "Antécédent de chirurgie du rachis avec modification des symptômes" ] },
          { title: "Vasculaire", items: [ { label: "Signes évocateurs d'une dissection artérielle cervicale", urgent: true } ] }
        ], any: "cv_r_irm_rf", anyUrgent: "cv_r_dissec", none: "cv_dur" },
      cv_dur: { type: "question", text: "Depuis combien de temps évolue cette cervicalgie commune ?",
        options: [
          { label: "Moins de 4 à 6 semaines (avec ou sans radiculalgie)", next: "cv_r_no" },
          { label: "Plus de 4 à 6 semaines, avec radiculalgie", next: "cv_r_irm" },
          { label: "Plus de 4 à 6 semaines, sans radiculalgie", next: "cv_r_rx" },
          { label: "Geste invasif envisagé", next: "cv_r_geste" }
        ] },
      cv_t: { type: "checklist", text: "Après le traumatisme, y a-t-il l'une de ces situations ?",
        groups: [{ title: "Imagerie indiquée", items: [
          "Patient instable, troubles de conscience ou signes neurologiques",
          "Imagerie préconisée par la règle NEXUS ou la règle Canadian C-Spine",
          "Âge de 65 ans ou plus",
          "Rachis ankylosé (spondyloarthrite, hyperostose…)",
          "Suspicion de dissection artérielle cervicale"
        ]}], any: "cv_r_t_urg", none: "cv_t_dist" },
      cv_t_dist: { type: "question", text: "La cervicalgie persiste-t-elle à distance, après une imagerie initiale sans lésion significative ?",
        options: [ { label: "Oui", next: "cv_r_t_irm" }, { label: "Non, pas d'imagerie initiale ou traumatisme récent sans critère", next: "cv_r_t_no" } ] },
      cv_r_dissec: { type: "result", verdict: "urgent", title: "Suspicion de dissection : angio-IRM en urgence",
        text: "En cas de signes de dissection artérielle cervicale, l'examen de 1re intention est l'angio-IRM. Adressez le patient en urgence.",
        sources: ["HAS_CERV_FICHE"] },
      cv_r_irm_rf: { type: "result", verdict: "ok", title: "IRM indiquée d'emblée",
        text: "En présence d'un drapeau rouge, l'imagerie est indiquée d'emblée. Si les signes évoquent une maladie inflammatoire rhumatismale, une infection ou une tumeur : IRM.",
        exam: "IRM_CERVICAL", sources: ["HAS_CERV_FICHE"] },
      cv_r_no: { type: "result", verdict: "no", title: "Pas d'imagerie",
        text: "L'imagerie n'est pas indiquée en cas de cervicalgie commune, avec ou sans radiculalgie, évoluant depuis moins de 4 à 6 semaines. La douleur s'améliore généralement en 4 à 6 semaines avec un traitement symptomatique.",
        sources: ["HAS_CERV_FICHE"] },
      cv_r_irm: { type: "result", verdict: "ok", title: "IRM indiquée",
        text: "Cervicalgie commune persistant plus de 4 à 6 semaines avec radiculalgie : l'imagerie se discute, et l'examen de 1re intention est l'IRM.",
        exam: "IRM_CERVICAL", sources: ["HAS_CERV_FICHE"] },
      cv_r_rx: { type: "result", verdict: "ok", title: "Radiographies indiquées",
        text: "Cervicalgie commune persistant plus de 4 à 6 semaines sans radiculalgie : l'imagerie se discute, et l'examen de 1re intention est la radiographie.",
        exam: "RX_CERVICAL", sources: ["HAS_CERV_FICHE"] },
      cv_r_geste: { type: "result", verdict: "ok", title: "IRM avant un geste invasif",
        text: "Avant un geste invasif, l'imagerie de 1re intention est l'IRM.",
        exam: "IRM_CERVICAL", sources: ["HAS_CERV_FICHE"] },
      cv_r_t_urg: { type: "result", verdict: "urgent", title: "Imagerie en urgence : scanner",
        text: "Dans ces situations, l'imagerie est indiquée dans le contexte de l'urgence : scanner sans injection en 1re intention (angio-scanner si lésion à risque vasculaire ; angio-IRM ou, à défaut, angio-scanner si suspicion de dissection). Chez la femme enceinte, à discuter au cas par cas.",
        sources: ["HAS_CERV"] },
      cv_r_t_irm: { type: "result", verdict: "ok", title: "IRM indiquée",
        text: "Cervicalgie persistant à distance du traumatisme, sans lésion significative à l'imagerie initiale : IRM.",
        exam: "IRM_CERVICAL", sources: ["HAS_CERV"] },
      cv_r_t_no: { type: "result", verdict: "no", title: "Pas d'imagerie cervicale",
        text: "En dehors des situations listées, l'imagerie cervicale n'est pas indiquée après un traumatisme non pénétrant. La cervicalgie évolue favorablement dans environ la moitié des cas.",
        sources: ["HAS_CERV"] }
    }
  },

  // ───────────────────────── ÉPAULE ─────────────────────────
  EPAULE: {
    title: "Épaule douloureuse non traumatique", group: "Membres", context: "Radiographie, échographie ou IRM",
    requestable: ["RX_EPAULE", "ECHO_EPAULE", "IRM_EPAULE"], start: "ep_age",
    nodes: {
      ep_age: { type: "question", text: "Le patient est-il adulte ?",
        options: [ { label: "Oui", next: "ep_dur" }, { label: "Non", next: "ep_r_enf" } ] },
      ep_dur: { type: "question", text: "Après examen clinique, quelle est la situation ?",
        options: [
          { label: "Douleur depuis moins de 4 à 6 semaines, sans suspicion de pathologie sévère", next: "ep_r_attente" },
          { label: "Suspicion clinique d'une pathologie sévère", next: "ep_rx" },
          { label: "Absence d'amélioration après 4 à 6 semaines, avec ou sans traitement", next: "ep_rx" }
        ] },
      ep_rx: { type: "question", text: "Des radiographies de l'épaule ont-elles déjà été réalisées pour cet épisode ?",
        options: [ { label: "Non", next: "ep_r_rx" }, { label: "Oui", next: "ep_ttt" } ] },
      ep_ttt: { type: "question", text: "Le traitement associant kinésithérapie et infiltration a-t-il échoué, après réévaluation clinique ?",
        options: [ { label: "Non, ou traitement non encore réalisé", next: "ep_r_pas2" }, { label: "Oui, échec", next: "ep_echo" } ] },
      ep_echo: { type: "question", text: "Où en est le bilan ?",
        options: [
          { label: "Pas encore d'échographie", next: "ep_r_echo" },
          { label: "Échographie faite, mais elle n'explique pas les symptômes, ou forte suspicion de rupture tendineuse", next: "ep_r_irm" },
          { label: "Échographie faite et contributive", next: "ep_r_stop" }
        ] },
      ep_r_enf: { type: "result", verdict: "discuss", title: "Hors du champ de l'outil", text: "La fiche HAS concerne l'adulte. Référez-vous à ADERIM ou demandez l'avis du radiologue.", sources: ["ADERIM"] },
      ep_r_attente: { type: "result", verdict: "no", title: "Pas d'imagerie à ce stade",
        text: "La prescription d'imagerie n'est envisagée d'emblée que si l'examen clinique fait suspecter une pathologie sévère. Environ un quart des douleurs d'épaule s'améliorent spontanément en 4 à 6 semaines : les radiographies sont indiquées en cas de persistance au-delà.",
        sources: ["HAS_EPAULE"] },
      ep_r_rx: { type: "result", verdict: "ok", title: "Radiographies en 1re intention",
        text: "Radiographies de l'épaule symptomatique (face en rotation neutre, interne et externe, et faux profil de Lamy ; bilatérales et comparatives si besoin), à la recherche de calcifications et d'un autre diagnostic. Une échographie ou une IRM ne doivent être prescrites qu'après un bilan radiographique.",
        exam: "RX_EPAULE", sources: ["HAS_EPAULE"] },
      ep_r_pas2: { type: "result", verdict: "no", title: "Pas d'échographie ni d'IRM à ce stade",
        text: "L'échographie se discute en cas d'échec d'un traitement associant kinésithérapie et infiltration, après réévaluation clinique. Sans nouvel événement clinique, les radiographies n'ont pas à être renouvelées.",
        sources: ["HAS_EPAULE"] },
      ep_r_echo: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "En cas d'échec du traitement (kinésithérapie et infiltration), une échographie réalisée par un échographiste expérimenté en ostéo-articulaire peut préciser le diagnostic lésionnel. En l'absence d'échographiste expérimenté, une IRM peut être prescrite.",
        exams: ["ECHO_EPAULE", "IRM_EPAULE"], sources: ["HAS_EPAULE"] },
      ep_r_irm: { type: "result", verdict: "ok", title: "IRM indiquée",
        text: "IRM (sauf contre-indication), par un radiologue expérimenté en ostéo-articulaire, si l'échographie n'explique pas les symptômes ou en cas de forte suspicion de rupture tendineuse. L'arthroscanner, l'arthro-IRM et le scanner relèvent du spécialiste.",
        exam: "IRM_EPAULE", sources: ["HAS_EPAULE"] },
      ep_r_stop: { type: "result", verdict: "no", title: "Pas d'imagerie supplémentaire",
        text: "L'échographie a expliqué les symptômes. L'arthroscanner, l'arthro-IRM et le scanner se discutent en cas de doute diagnostique, de dissociation radio-clinique ou d'indication opératoire, et sont prescrits par le spécialiste.",
        sources: ["HAS_EPAULE"] }
    }
  },

  // ───────────────────────── HANCHE ─────────────────────────
  HANCHE: {
    title: "Hanche douloureuse : suspicion de coxarthrose", group: "Membres", context: "Radiographie ou IRM",
    requestable: ["RX_HANCHE", "IRM_HANCHE"], start: "h_rx",
    nodes: {
      h_rx: { type: "question", text: "Des radiographies de la hanche ont-elles été réalisées ?",
        options: [ { label: "Non", next: "h_r_rx" }, { label: "Oui", next: "h_res" } ] },
      h_res: { type: "question", text: "Que montrent les radiographies, au regard de la clinique ?",
        options: [
          { label: "Une coxarthrose typique", next: "h_r_no" },
          { label: "Un doute avec un autre diagnostic (ostéonécrose, fissure, algodystrophie)", next: "h_r_irm" }
        ] },
      h_r_rx: { type: "result", verdict: "ok", title: "Radiographies en 1re intention",
        text: "Le diagnostic d'arthrose est radio-clinique : cliché du bassin debout de face et faux profil de Lequesne de chaque hanche.",
        exam: "RX_HANCHE", sources: ["COFER"] },
      h_r_no: { type: "result", verdict: "no", title: "IRM non utile",
        text: "L'IRM de hanche n'a pas d'intérêt en présence d'une coxarthrose typique, et l'arthroscanner non plus. L'importance de l'atteinte radiologique n'est pas toujours corrélée à la douleur.",
        sources: ["COFER"] },
      h_r_irm: { type: "result", verdict: "ok", title: "IRM à discuter",
        text: "L'IRM se discute en cas de doute avec un autre diagnostic : ostéonécrose, fissure, algodystrophie.",
        exam: "IRM_HANCHE", sources: ["COFER"] }
    }
  },

  // ───────────────────────── CHEVILLE ─────────────────────────
  CHEVILLE: {
    title: "Traumatisme de la cheville (entorse)", group: "Membres", context: "Radiographie ou échographie",
    requestable: ["RX_CHEVILLE", "ECHO_CHEVILLE"], start: "ch_age",
    nodes: {
      ch_age: { type: "question", text: "Quel est l'âge du patient ?",
        options: [ { label: "5 ans ou plus", next: "ch_ott" }, { label: "Moins de 5 ans", next: "ch_r_enf" } ] },
      ch_ott: { type: "checklist", text: "Règles d'Ottawa : y a-t-il au moins un critère ?",
        help: "Douleur de la cheville ou du tarse associée à l'un de ces critères.",
        groups: [{ title: "Critères d'Ottawa", items: [
          "Incapacité de faire 4 pas en appui, immédiatement après le traumatisme et lors de l'examen",
          "Douleur à la palpation du bord postérieur ou de la pointe d'une des deux malléoles",
          "Douleur à la palpation du scaphoïde (naviculaire)",
          "Douleur à la palpation de la base du 5e métatarsien"
        ]}], any: "ch_r_rx", none: "ch_synd" },
      ch_synd: { type: "checklist", text: "Sans critère d'Ottawa : y a-t-il l'un de ces éléments ?",
        groups: [{ title: "Autres situations", items: [
          { label: "Douleur à la palpation du ligament tibio-fibulaire antéro-inférieur (suspicion de lésion de la syndesmose)", key: "synd" }
        ]}], any: "ch_r_echo", none: "ch_reeval" },
      ch_reeval: { type: "question", text: "À la réévaluation (vers J5 à J7), persiste-t-il une impotence fonctionnelle importante à la marche ?",
        options: [ { label: "Non, ou première consultation", next: "ch_r_no" }, { label: "Oui, sans radiographie faite", next: "ch_r_rx_reeval" }, { label: "Oui, radiographies déjà faites", next: "ch_r_tdm" } ] },
      ch_r_enf: { type: "result", verdict: "discuss", title: "Hors du champ de l'outil", text: "La HAS ne formule pas de recommandation d'imagerie avant 5 ans. Demandez l'avis du radiologue.", sources: ["HAS_CHEV"] },
      ch_r_rx: { type: "result", verdict: "ok", title: "Radiographies indiquées",
        text: "Critère d'Ottawa positif : radiographies de la cheville et/ou du pied selon la zone douloureuse. Le diapason à 128 Hz et les critères Bernois peuvent aider à décider si la radiographie est nécessaire, notamment quand l'accès à la radiographie n'est pas aisé (accord d'experts).",
        exam: "RX_CHEVILLE", sources: ["HAS_CHEV", "SFMU_CHEV"] },
      ch_r_echo: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "Douleur à la palpation du ligament tibio-fibulaire antéro-inférieur : échographie de la cheville et du pied.",
        exam: "ECHO_CHEVILLE", sources: ["HAS_CHEV"] },
      ch_r_no: { type: "result", verdict: "no", title: "Pas de radiographie",
        text: "Aucun critère d'Ottawa : la probabilité de fracture est faible et la radiographie n'est pas nécessaire. Prévoyez une réévaluation entre J5 et J7.",
        sources: ["HAS_CHEV"] },
      ch_r_rx_reeval: { type: "result", verdict: "ok", title: "Radiographies indiquées",
        text: "En cas de persistance d'une impotence fonctionnelle importante à la marche, une radiographie standard est indiquée si elle n'a pas été faite.",
        exam: "RX_CHEVILLE", sources: ["HAS_CHEV"] },
      ch_r_tdm: { type: "result", verdict: "discuss", title: "Scanner et/ou échographie",
        text: "Impotence fonctionnelle importante persistante, radiographies déjà faites : scanner et/ou échographie, à discuter avec le radiologue.",
        exams: ["TDM_CHEVILLE", "ECHO_CHEVILLE"], sources: ["HAS_CHEV"] }
    }
  },

  // ───────────────────────── THYROÏDE ─────────────────────────
  THYRO: {
    title: "Thyroïde : échographie ou scintigraphie", group: "Tête et cou", context: "Adulte",
    requestable: ["ECHO_THYR", "SCINTI_THYR"], start: "th_ctx",
    nodes: {
      th_ctx: { type: "question", text: "Quelle est la situation ?",
        options: [
          { label: "Hypothyroïdie", next: "th_hypo" },
          { label: "Hyperthyroïdie ou thyrotoxicose", next: "th_hyper" },
          { label: "Nodule palpé, ou découvert fortuitement à l'imagerie", next: "th_nod" },
          { label: "Goitre homogène, patient euthyroïdien", next: "th_goitre" }
        ] },
      th_hypo: { type: "checklist", text: "Hypothyroïdie : y a-t-il l'un de ces éléments ?",
        groups: [{ title: "Échographie indiquée", items: [
          "Anomalie à la palpation cervicale (nodule, ganglion suspect)",
          "Signes compressifs : dysphagie, dysphonie, dyspnée persistante, syndrome cave supérieur, Claude-Bernard-Horner"
        ]}], any: "th_r_echo", none: "th_hypo2" },
      th_hypo2: { type: "checklist", text: "Y a-t-il une situation où l'échographie peut se discuter ?",
        groups: [{ title: "À discuter", items: [
          "TSH élevée persistante avec anticorps anti-TPO négatifs, si le résultat peut influencer la prise en charge",
          "Palpation difficile (obésité, cicatrice, lésions cutanées)",
          "Facteur de risque de cancer thyroïdien (irradiation cervicale dans l'enfance, antécédent familial au 1er degré, maladie génétique)",
          "Anxiété persistante du patient"
        ]}], any: "th_r_hypo_disc", none: "th_r_hypo_no" },
      th_hyper: { type: "question", text: "Hyperthyroïdie : quel est le contexte ?",
        options: [
          { label: "Maladie de Basedow typique ou anticorps anti-récepteurs de la TSH positifs, sans nodule ni ganglion suspect", next: "th_r_baso" },
          { label: "Début d'une thyroïdite de De Quervain typique", next: "th_r_dq" },
          { label: "Basedow typique ou anti-RTSH positifs avec nodule ; thyrotoxicose iodo-induite (amiodarone) ; thyropathie du post-partum", next: "th_r_endoc" },
          { label: "Avant un traitement radical (chirurgie ou iode 131)", next: "th_r_radical" },
          { label: "Autres cas", next: "th_r_hyper" }
        ] },
      th_nod: { type: "question", text: "Quel est le résultat de la TSH ?",
        options: [
          { label: "TSH normale ou haute", next: "th_r_nod" },
          { label: "TSH basse, sans insuffisance thyréotrope", next: "th_r_nod_bas" },
          { label: "TSH non dosée", next: "th_r_tsh" }
        ] },
      th_goitre: { type: "question", text: "S'agit-il de la découverte du goitre ou de sa surveillance ?",
        options: [ { label: "Découverte", next: "th_r_goitre" }, { label: "Surveillance d'un goitre simple, sans évolution clinique", next: "th_r_goitre_no" } ] },
      th_r_echo: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "En cas d'hypothyroïdie, l'échographie est indiquée devant une anomalie à la palpation cervicale ou des signes compressifs, initialement ou au cours du suivi.",
        exam: "ECHO_THYR", sources: ["HAS_THYR"] },
      th_r_hypo_disc: { type: "result", verdict: "discuss", title: "Échographie à discuter avec le patient",
        text: "L'échographie peut se discuter dans le cadre d'une décision partagée, en tenant compte du risque de découvrir des anomalies anxiogènes qui peuvent conduire à une surmédicalisation.",
        exams: ["ECHO_THYR"], sources: ["HAS_THYR"] },
      th_r_hypo_no: { type: "result", verdict: "no", title: "Échographie non utile",
        text: "L'échographie thyroïdienne n'est pas utile de manière systématique dans la prise en charge d'une hypothyroïdie.",
        sources: ["HAS_THYR"] },
      th_r_baso: { type: "result", verdict: "no", title: "Imagerie non utile",
        text: "Sans nodule ni ganglion suspect à la palpation, l'imagerie n'est pas utile au diagnostic d'une maladie de Basedow cliniquement typique ou avec anticorps anti-récepteurs de la TSH positifs.",
        sources: ["HAS_THYR"] },
      th_r_dq: { type: "result", verdict: "no", title: "Imagerie non utile",
        text: "Au début d'une thyroïdite de De Quervain typique, l'imagerie n'est pas utile. Elle peut se discuter dans les formes atypiques, après avis endocrinologique.",
        sources: ["HAS_THYR"] },
      th_r_endoc: { type: "result", verdict: "discuss", title: "Avis endocrinologique",
        text: "Dans ces situations, l'indication d'une imagerie (échographie, scintigraphie) se discute dans le cadre d'un avis endocrinologique spécialisé.",
        sources: ["HAS_THYR"] },
      th_r_radical: { type: "result", verdict: "ok", title: "Échographie (± scintigraphie) indiquée",
        text: "Avant tout traitement radical, une échographie mesure le volume à traiter et écarte un nodule suspect. La scintigraphie est recommandée avant un traitement par iode 131.",
        exams: ["ECHO_THYR", "SCINTI_THYR"], sources: ["HAS_THYR"] },
      th_r_hyper: { type: "result", verdict: "ok", title: "Échographie et scintigraphie indiquées",
        text: "La scintigraphie est l'examen étiologique de référence ; l'échographie en optimise l'interprétation. En cas de grossesse ou d'allaitement, l'échographie est le seul examen réalisable.",
        exams: ["SCINTI_THYR", "ECHO_THYR"], sources: ["HAS_THYR"] },
      th_r_nod: { type: "result", verdict: "ok", title: "Échographie indiquée",
        text: "Avec une TSH normale ou haute, l'échographie est l'examen de référence pour caractériser le nodule, quel que soit son mode de découverte. Pour un incidentalome, si la balance bénéfice/risque d'une prise en charge n'est pas favorable, il est envisageable de ne pas la faire, après discussion avec le patient. Le scanner et l'IRM ne sont pas indiqués.",
        exam: "ECHO_THYR", sources: ["HAS_THYR"] },
      th_r_nod_bas: { type: "result", verdict: "ok", title: "Échographie et scintigraphie indiquées",
        text: "Nodule avec TSH basse, sans insuffisance thyréotrope : l'échographie et la scintigraphie sont indiquées.",
        exams: ["ECHO_THYR", "SCINTI_THYR"], sources: ["HAS_THYR"] },
      th_r_tsh: { type: "result", verdict: "no", title: "Doser la TSH d'abord",
        text: "La découverte d'un nodule doit conduire à rechercher les facteurs de risque de cancer, à examiner le patient et à doser la TSH. Le choix de l'imagerie en dépend.",
        sources: ["HAS_THYR"] },
      th_r_goitre: { type: "result", verdict: "ok", title: "Échographie utile",
        text: "Lors de la découverte d'un goitre homogène chez un patient euthyroïdien, l'échographie élimine des nodules, recherche un goitre plongeant et donne un volume de référence.",
        exam: "ECHO_THYR", sources: ["HAS_THYR"] },
      th_r_goitre_no: { type: "result", verdict: "no", title: "Pas de surveillance échographique",
        text: "En cas de goitre simple, une surveillance échographique n'est pas indiquée en l'absence d'évolution clinique.",
        sources: ["HAS_THYR"] }
    }
  },

  // ───────────────────────── OSTÉODENSITOMÉTRIE ─────────────────────────
  OSTEO: {
    title: "Ostéodensitométrie", group: "Os et dépistages", context: "Ostéoporose",
    requestable: ["DMO"], start: "o_type",
    nodes: {
      o_type: { type: "question", text: "S'agit-il d'une première ostéodensitométrie ou d'un contrôle ?",
        options: [ { label: "Première ostéodensitométrie", next: "o_gen" }, { label: "Contrôle (femme ménopausée)", next: "o_ctrl" } ] },
      o_gen: { type: "checklist", text: "Quels que soient l'âge et le sexe : y a-t-il l'une de ces indications ?",
        groups: [
          { title: "Signes d'ostéoporose", items: [
            "Fracture vertébrale découverte ou confirmée à la radio, sans contexte traumatique ni tumoral évident",
            "Antécédent de fracture périphérique sans traumatisme majeur (hors crâne, orteils, doigts et rachis cervical)" ] },
          { title: "Pathologie ou traitement inducteur", items: [
            "Corticothérapie systémique prévue au moins 3 mois consécutifs, à au moins 7,5 mg/j d'équivalent prednisone (de préférence au début)",
            "Antécédent d'hyperthyroïdie évolutive non traitée, d'hypercorticisme, d'hyperparathyroïdie primitive ou d'ostéogenèse imparfaite",
            "Hypogonadisme prolongé, y compris androgénoprivation chirurgicale ou médicamenteuse (analogue de la Gn-RH)" ] }
        ], any: "o_modif", none: "o_meno" },
      o_meno: { type: "question", text: "La patiente est-elle ménopausée ?",
        options: [ { label: "Oui", next: "o_fem" }, { label: "Non (ou homme)", next: "o_r_no" } ] },
      o_fem: { type: "checklist", text: "Femme ménopausée : y a-t-il l'une de ces indications supplémentaires ?",
        groups: [{ title: "Femme ménopausée (y compris sous traitement hormonal à dose non osseuse)", items: [
          "Fracture du col du fémur sans traumatisme majeur chez un parent au 1er degré",
          "Indice de masse corporelle inférieur à 19 kg/m²",
          "Ménopause avant 40 ans, quelle qu'en soit la cause",
          "Antécédent de corticothérapie d'au moins 3 mois consécutifs, à au moins 7,5 mg/j d'équivalent prednisone"
        ]}], any: "o_modif", none: "o_r_no" },
      o_modif: { type: "question", text: "Le résultat peut-il conduire à modifier la prise en charge ?",
        options: [ { label: "Oui", next: "o_r_ok" }, { label: "Non", next: "o_r_nomodif" } ] },
      o_ctrl: { type: "question", text: "Quel est le motif du contrôle ?",
        options: [
          { label: "Arrêt d'un traitement anti-ostéoporotique (hors arrêt précoce pour effet indésirable)", next: "o_r_ctrl_ok" },
          { label: "3 à 5 ans après une 1re mesure normale ou ostéopénique sans traitement, avec de nouveaux facteurs de risque", next: "o_r_ctrl_ok2" },
          { label: "Suivi de l'efficacité ou de l'observance d'un traitement", next: "o_r_ctrl_no" }
        ] },
      o_r_ok: { type: "result", verdict: "ok", title: "Ostéodensitométrie indiquée",
        text: "Indication retenue par la HAS. L'ostéodensitométrie biphotonique (DXA) est réalisée sur deux sites, de préférence le rachis lombaire et l'extrémité supérieure du fémur.",
        exam: "DMO", sources: ["HAS_OSTEO"] },
      o_r_nomodif: { type: "result", verdict: "no", title: "Ostéodensitométrie non indiquée",
        text: "Pour chaque indication, l'examen n'est justifié que si son résultat peut a priori modifier la prise en charge du patient.",
        sources: ["HAS_OSTEO"] },
      o_r_no: { type: "result", verdict: "no", title: "Pas d'indication retenue",
        text: "La situation ne correspond à aucune des indications retenues par la HAS (et remboursées). L'examen n'a d'intérêt qu'en présence de signes ou de facteurs de risque d'ostéoporose, et si un traitement peut être envisagé.",
        sources: ["HAS_OSTEO"] },
      o_r_ctrl_ok: { type: "result", verdict: "ok", title: "Contrôle recommandé",
        text: "Chez la femme ménopausée, une 2e ostéodensitométrie est recommandée à l'arrêt du traitement anti-ostéoporotique, sauf arrêt précoce pour effet indésirable.",
        exam: "DMO", sources: ["HAS_OSTEO"] },
      o_r_ctrl_ok2: { type: "result", verdict: "ok", title: "Contrôle possible",
        text: "Si aucun traitement n'a été mis en route après une 1re mesure normale ou ostéopénique, une 2e ostéodensitométrie peut être proposée 3 à 5 ans plus tard, selon l'apparition de nouveaux facteurs de risque.",
        exam: "DMO", sources: ["HAS_OSTEO"] },
      o_r_ctrl_no: { type: "result", verdict: "no", title: "Contrôle non utile",
        text: "La mesure de la densité osseuse n'est pas utile pour suivre l'efficacité d'un traitement anti-ostéoporotique ni pour apprécier son observance.",
        sources: ["HAS_OSTEO"] }
    }
  },

  // ───────────────────────── SEIN ─────────────────────────
  SEIN: {
    title: "Sein : dépistage ou symptôme", group: "Os et dépistages", context: "Mammographie, échographie",
    requestable: ["MAMMO_DO", "MAMMO_ECHO", "ECHO_SEIN"], start: "s_ctx",
    nodes: {
      s_ctx: { type: "question", text: "Quelle est la situation ?",
        options: [
          { label: "Dépistage, sans symptôme", next: "s_risk" },
          { label: "Masse palpable du sein", next: "s_r_masse" },
          { label: "Écoulement du mamelon unilatéral, unipore, non lactescent", next: "s_r_ecoul" }
        ] },
      s_risk: { type: "question", text: "Quel est le niveau de risque ?",
        options: [
          { label: "Pas de facteur de risque particulier", next: "s_age" },
          { label: "Antécédent familial : apparentée au 1er degré ou nièce par un frère d'une personne ayant eu un cancer du sein", next: "s_r_hr" },
          { label: "Mutation génétique connue, ou antécédent personnel de cancer du sein", next: "s_r_spe" }
        ] },
      s_age: { type: "question", text: "Quel est l'âge de la patiente ?",
        options: [ { label: "Entre 50 et 74 ans", next: "s_r_do" }, { label: "Moins de 50 ans ou plus de 74 ans", next: "s_r_hors" } ] },
      s_r_do: { type: "result", verdict: "ok", title: "Dépistage organisé",
        text: "Entre 50 et 74 ans : examen clinique des seins et mammographie de dépistage tous les 2 ans, avec double lecture des clichés normaux ou bénins, dans le cadre du programme national (invitation par courrier).",
        exam: "MAMMO_DO", sources: ["HAS_SEIN"] },
      s_r_hors: { type: "result", verdict: "no", title: "Pas de mammographie de dépistage",
        text: "Sans facteur de risque justifiant un dépistage spécifique, il n'y a pas lieu de faire une mammographie ou une échographie mammaire de dépistage en dehors de la tranche d'âge 50 à 74 ans.",
        sources: ["HAS_SEIN"] },
      s_r_hr: { type: "result", verdict: "discuss", title: "Surveillance adaptée au risque",
        text: "La surveillance radiologique débute 5 ans avant l'âge du cancer le plus jeune dans la famille. Avant 50 ans (au plus tôt à 40 ans) : mammographie annuelle, éventuellement avec échographie ; un suivi plus précoce (avec IRM éventuelle) se discute au cas par cas. À partir de 50 ans : mammographie tous les 2 ans (dépistage organisé). Examen clinique annuel dès 20 ans.",
        exams: ["MAMMO_HR"], sources: ["HAS_SEIN"] },
      s_r_spe: { type: "result", verdict: "discuss", title: "Suivi spécialisé",
        text: "Les femmes porteuses d'une mutation ou ayant un antécédent personnel de cancer du sein relèvent d'un suivi spécifique, défini avec l'équipe d'oncogénétique ou d'oncologie qui les suit.",
        sources: ["HAS_SEIN"] },
      s_r_masse: { type: "result", verdict: "ok", title: "Imagerie indiquée : échographie au minimum",
        text: "Devant une masse palpable, une imagerie du sein est recommandée, avec au moins une échographie (grade B). La mammographie est associée selon le contexte (âge, antécédents, examen clinique) ; elle est moins facile à interpréter avant 30 ans. L'association des deux a une valeur prédictive négative proche de 100 %.",
        exams: ["MAMMO_ECHO", "ECHO_SEIN"], sources: ["CNGOF_SEIN"] },
      s_r_ecoul: { type: "result", verdict: "ok", title: "Mammographie et échographie",
        text: "Devant un écoulement mamelonnaire unilatéral, unipore et non lactescent, une imagerie est recommandée (grade B), par mammographie et échographie en 1re intention (grade C).",
        exam: "MAMMO_ECHO", sources: ["CNGOF_SEIN"] }
    }
  },

  // ───────────────────────── DÉPISTAGE POUMON ─────────────────────────
  POUMON: {
    title: "Dépistage du cancer du poumon", group: "Os et dépistages", context: "Scanner thoracique faible dose",
    requestable: [], start: "p_sympt",
    nodes: {
      p_sympt: { type: "question", text: "Le patient a-t-il des symptômes respiratoires ou généraux évocateurs ?",
        options: [ { label: "Non, il s'agit d'un dépistage", next: "p_elig" }, { label: "Oui", next: "p_r_sympt" } ] },
      p_elig: { type: "question", text: "Le patient a-t-il 50 à 74 ans, est-il fumeur ou ex-fumeur sevré depuis moins de 15 ans, avec au moins 20 paquets-années (ou 15 cigarettes/j pendant 25 ans, ou 10 cigarettes/j pendant 30 ans) ?",
        options: [ { label: "Oui", next: "p_r_impulsion" }, { label: "Non", next: "p_r_no" } ] },
      p_r_sympt: { type: "result", verdict: "discuss", title: "Hors dépistage",
        text: "En présence de symptômes, il ne s'agit plus d'un dépistage : l'exploration diagnostique est à définir selon le contexte clinique, avec le radiologue ou le pneumologue.",
        sources: ["HAS_POUMON"] },
      p_r_impulsion: { type: "result", verdict: "discuss", title: "Orienter vers le programme pilote IMPULSION",
        text: "Il n'existe pas de dépistage organisé du cancer du poumon. Le dépistage par scanner thoracique faible dose sans injection se fait dans le cadre du programme pilote IMPULSION (inclusions à partir de début 2026, selon les régions) : inclusion par un médecin investigateur, un centre d'examen de santé, sur depistage-cancer-poumon.fr ou au 34 33. Le médecin traitant est informé et associé au suivi.",
        sources: ["INCA_POUMON", "HAS_POUMON"] },
      p_r_no: { type: "result", verdict: "no", title: "Non éligible au dépistage",
        text: "Le patient ne correspond pas aux critères d'éligibilité du programme pilote de dépistage par scanner faible dose.",
        sources: ["INCA_POUMON"] }
    }
  },

  // ───────────────────────── COLIQUE NÉPHRÉTIQUE ─────────────────────────
  COLIQUE: {
    title: "Suspicion de colique néphrétique", group: "Abdomen et vaisseaux", context: "Scanner ou échographie",
    requestable: ["TDM_URO", "ECHO_RENALE"], start: "cn_comp",
    nodes: {
      cn_comp: { type: "checklist", text: "Y a-t-il un signe de gravité ou de complication ?",
        groups: [{ title: "Colique néphrétique compliquée ou terrain à risque", items: [
          "Fièvre ou infection", "Anurie, ou insuffisance rénale aiguë", "Rein unique", "Douleur résistante au traitement"
        ]}], any: "cn_r_urg", none: "cn_preg" },
      cn_preg: { type: "question", text: "La patiente est-elle enceinte ?",
        options: [ { label: "Non", next: "cn_r_std" }, { label: "Oui", next: "cn_r_preg" } ] },
      cn_r_urg: { type: "result", verdict: "urgent", title: "Urgence",
        text: "Une imagerie en urgence est indiquée en cas de fièvre, d'insuffisance rénale aiguë, de rein unique ou de diagnostic incertain. Une colique compliquée (infection, anurie, douleur résistante) relève d'une prise en charge urgente. L'imagerie ne doit pas retarder le traitement de la douleur.",
        sources: ["AFU"] },
      cn_r_std: { type: "result", verdict: "ok", title: "Scanner sans injection : examen de référence",
        text: "Le scanner sans injection est l'examen standard devant une douleur lombaire aiguë (sensibilité 93 %, spécificité 97 %) ; une technique faible dose réduit l'irradiation. L'échographie, non irradiante, détecte bien la dilatation mais moins bien les calculs de l'uretère (sensibilité 45 %). L'ASP n'est pas un examen diagnostique de 1re intention ; il peut servir au suivi.",
        exams: ["TDM_URO", "ECHO_RENALE"], sources: ["AFU"] },
      cn_r_preg: { type: "result", verdict: "discuss", title: "Grossesse : à discuter avec le radiologue",
        text: "Les recommandations de l'AFU 2022 ne détaillent pas la conduite chez la femme enceinte. L'échographie, non irradiante, est à discuter en priorité avec le radiologue.",
        exams: ["ECHO_RENALE"], sources: ["AFU"] }
    }
  },

  // ───────────────────────── TVP ─────────────────────────
  TVP: {
    title: "Suspicion de phlébite (TVP)", group: "Abdomen et vaisseaux", context: "Écho-Doppler veineux",
    requestable: ["ECHODOPPLER_MI"], start: "tv_ep",
    nodes: {
      tv_ep: { type: "checklist", text: "Y a-t-il des signes d'embolie pulmonaire ou une instabilité ?",
        groups: [{ title: "Urgence", items: [ "Dyspnée, douleur thoracique, syncope ou instabilité hémodynamique" ] }],
        any: "tv_r_ep", none: "tv_proba" },
      tv_proba: { type: "question", text: "Quelle est la probabilité clinique de TVP, estimée par un score validé (score de Wells) ?",
        options: [ { label: "Forte", next: "tv_r_echo_forte" }, { label: "Faible ou intermédiaire", next: "tv_dd" } ] },
      tv_dd: { type: "question", text: "Quel est le résultat des D-dimères (technique quantitative très sensible) ?",
        options: [ { label: "Négatifs", next: "tv_r_exclu" }, { label: "Positifs", next: "tv_r_echo_dd" }, { label: "Non dosés", next: "tv_r_dd" } ] },
      tv_r_ep: { type: "result", verdict: "urgent", title: "Suspicion d'embolie pulmonaire : urgence",
        text: "Adressez le patient en urgence. En cas de probabilité clinique forte d'embolie pulmonaire, les D-dimères sont inutiles.",
        sources: ["SPLF"] },
      tv_r_echo_forte: { type: "result", verdict: "ok", title: "Écho-Doppler d'emblée",
        text: "Probabilité clinique forte : ne pas doser les D-dimères, et réaliser un écho-Doppler veineux complet (veines proximales et distales, test de compression).",
        exam: "ECHODOPPLER_MI", sources: ["SPLF"] },
      tv_r_dd: { type: "result", verdict: "no", title: "Doser d'abord les D-dimères",
        text: "Avec une probabilité clinique faible ou intermédiaire, il est recommandé de doser les D-dimères : un résultat négatif exclut la TVP sans écho-Doppler.",
        sources: ["SPLF"] },
      tv_r_exclu: { type: "result", verdict: "no", title: "TVP exclue",
        text: "Probabilité clinique non forte et D-dimères négatifs : il est recommandé de ne pas poursuivre les investigations.",
        sources: ["SPLF"] },
      tv_r_echo_dd: { type: "result", verdict: "ok", title: "Écho-Doppler indiqué",
        text: "D-dimères positifs : écho-Doppler veineux complet (veines proximales et distales, test de compression). Des D-dimères positifs sans signe clinique évocateur ne doivent pas, à eux seuls, faire suspecter une thrombose.",
        exam: "ECHODOPPLER_MI", sources: ["SPLF"] }
    }
  }
});

Object.assign(CLIN, {
  "CEPH_AD.ca_urg": { any: "", none: "Pas de signe d'urgence" },
  "CEPH_AD.ca_susp": { any: "", none: "" },
  "CEPH_AD.ca_typ": ["Céphalée primaire typique, examen normal", "Doute diagnostique"],
  "CEPH_ENF.ce_rf": { any: "Drapeau rouge : ", none: "Pas de drapeau rouge" },
  "CEPH_ENF.ce_inst": ["État instable, trouble de conscience ou coup de tonnerre", "État stable, conscience normale"],
  "TC_AD.tc_high": { any: "Facteur de risque élevé : ", none: "Pas de facteur de risque élevé" },
  "TC_AD.tc_inter": { any: "Facteur de risque intermédiaire : ", none: "Pas de facteur de risque intermédiaire" },
  "CERV.cv_tr": ["Cervicalgie non traumatique", "Cervicalgie post-traumatique"],
  "CERV.cv_rf": { any: "Drapeau rouge : ", none: "Pas de drapeau rouge" },
  "CERV.cv_dur": ["Cervicalgie commune de moins de 4 à 6 semaines", "Cervicalgie commune de plus de 4 à 6 semaines avec radiculalgie", "Cervicalgie commune de plus de 4 à 6 semaines sans radiculalgie", "Geste invasif envisagé"],
  "CERV.cv_t": { any: "", none: "" },
  "CERV.cv_t_dist": ["Cervicalgie persistante à distance, imagerie initiale sans lésion significative", ""],
  "EPAULE.ep_age": ["", ""],
  "EPAULE.ep_dur": ["Douleur de moins de 4 à 6 semaines", "Suspicion clinique de pathologie sévère", "Pas d'amélioration après 4 à 6 semaines"],
  "EPAULE.ep_rx": ["Pas de radiographie pour cet épisode", "Radiographies déjà réalisées"],
  "EPAULE.ep_ttt": ["Pas d'échec du traitement à ce stade", "Échec de la kinésithérapie et de l'infiltration"],
  "EPAULE.ep_echo": ["Pas d'échographie", "Échographie non contributive ou forte suspicion de rupture tendineuse", "Échographie contributive"],
  "HANCHE.h_rx": ["Pas de radiographie", "Radiographies réalisées"],
  "HANCHE.h_res": ["Coxarthrose typique", "Doute : ostéonécrose, fissure ou algodystrophie"],
  "CHEVILLE.ch_age": ["", ""],
  "CHEVILLE.ch_ott": { any: "Ottawa positif : ", none: "Ottawa négatif" },
  "CHEVILLE.ch_synd": { any: "", none: "" },
  "CHEVILLE.ch_reeval": ["", "Impotence fonctionnelle persistante à la réévaluation", "Impotence fonctionnelle persistante, radiographies faites"],
  "THYRO.th_ctx": ["Hypothyroïdie", "Hyperthyroïdie / thyrotoxicose", "Nodule thyroïdien", "Goitre homogène, euthyroïdie"],
  "THYRO.th_hypo": { any: "", none: "" },
  "THYRO.th_hypo2": { any: "", none: "" },
  "THYRO.th_nod": ["TSH normale ou haute", "TSH basse", ""],
  "THYRO.th_goitre": ["Découverte du goitre", "Surveillance"],
  "OSTEO.o_type": ["", "Contrôle"],
  "OSTEO.o_gen": { any: "Indication : ", none: "" },
  "OSTEO.o_meno": ["Femme ménopausée", ""],
  "OSTEO.o_fem": { any: "Indication : ", none: "" },
  "OSTEO.o_modif": ["Résultat susceptible de modifier la prise en charge", ""],
  "SEIN.s_ctx": ["Dépistage", "Masse palpable du sein", "Écoulement mamelonnaire unilatéral unipore non lactescent"],
  "SEIN.s_risk": ["Risque moyen", "Antécédent familial de cancer du sein", "Mutation ou antécédent personnel"],
  "SEIN.s_age": ["Âge entre 50 et 74 ans", ""],
  "COLIQUE.cn_comp": { any: "", none: "Pas de signe de complication" },
  "COLIQUE.cn_preg": ["", "Grossesse en cours"],
  "TVP.tv_ep": { any: "", none: "Pas de signe d'embolie pulmonaire" },
  "TVP.tv_proba": ["Probabilité clinique forte (score de Wells)", "Probabilité clinique faible ou intermédiaire"],
  "TVP.tv_dd": ["D-dimères négatifs", "D-dimères positifs", ""]
});

// Regroupement de l'accueil
TREES.RX_LOMB.group = "Rachis"; TREES.RX_CRANE.group = "Tête et cou"; TREES.RX_SINUS.group = "Tête et cou";
TREES.RX_THORAX.group = "Thorax"; TREES.ASP.group = "Abdomen et vaisseaux";
TREES.RX_GENOU.group = "Membres"; TREES.IRM_GENOU.group = "Membres";
TREES.RX_LOMB.title = "Lombalgie de l'adulte"; TREES.RX_LOMB.context = "Radiographie ou IRM lombaire";
TREES.RX_LOMB.requestable = ["RX_LOMB", "IRM_LOMB"];
