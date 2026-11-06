# Pertinence imagerie – aide à la demande d'examen

Application web statique destinée aux médecins prescripteurs : quelques questions fondées sur les recommandations (HAS, FNMR, SFMU, SFEMC, SFCD, AFU, AFEF, SPLF, CNGOF, COFER, SFIP…) indiquent si un examen d'imagerie est recommandé, lequel, puis préparent une demande d'examen imprimable (PDF). 25 situations cliniques courantes de médecine générale.

Site publié : https://5nvn9z8jk7-sketch.github.io/pertinence-imagerie/

## Contenu

- `app/` : l'application (HTML/CSS/JS, sans étape de build). Les arbres de décision sont dans `app/data.js`, `app/data2.js` et `app/data3.js`.
- `fiches/` : fiches réflexes à imprimer
  - `fiches-aide-prescription.pdf` : version prescripteur (5 fiches, une page par thème) ;
  - `fiches-reflexes-cabinet.pdf` : version cabinet (avec réflexe accueil et phrase type) ;
  - `fiches-reflexes.md` : version texte.
- `.github/workflows/pages.yml` : à chaque modification de `app/`, le site est republié sur la branche `gh-pages` (GitHub Pages).

## Avertissement

Aucune donnée patient n'est enregistrée ni transmise. Outil d'aide à la décision : il ne remplace pas le jugement clinique, et le radiologue peut adapter l'examen demandé. Prototype dont le contenu doit être validé par les radiologues avant diffusion.

Created with [Perplexity](https://www.perplexity.ai/computer/tasks/14890782-bd7a-4ce3-97fb-7087ee51e72c)
