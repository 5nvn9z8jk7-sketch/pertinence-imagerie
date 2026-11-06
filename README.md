# Pertinence imagerie – aide à la demande

Application web statique destinée aux médecins prescripteurs : quelques questions fondées sur les recommandations HAS / SFR / FNMR indiquent si l'examen d'imagerie est pertinent, proposent une alternative, puis préparent une demande d'examen imprimable (PDF).

- `app/` : l'application (HTML/CSS/JS, aucune dépendance de build). Ouvrir `app/index.html` ou servir le dossier (`python3 -m http.server`).
- `fiches/` : fiches réflexes (Markdown et PDF à imprimer).

Aucune donnée patient n'est enregistrée ni transmise. Outil d'aide à la décision : il ne remplace pas le jugement clinique.
