# AB Running Loisir — Site v3 (Saison 2026-2027)

## Vue d'ensemble

Site de la section Running Loisir de l'Aviron Bayonnais Athlétisme (FFA).

**Refonte v3** : passage du système niveaux ski (🟢🔵🔴) au **système d'équivalence terrain** (Route / Piste / Trail). L'auto-régulation se fait par **RPE** (effort ressenti) et modulation du volume (reprise / standard / forme).

## Architecture

| Fichier | Rôle |
|---------|------|
| `index.html` | Interface publique (accueil, programme 52 sem, calculateur, terrains, muscu) |
| `app.js` | Logique frontend (rendu, navigation, calcul charge, modal détail) |
| `data.js` | Données : 80 séances, programme 52 sem, 7 objectifs, seuils, calendrier, circuits |
| `admin.html` | Interface coach (édition programme, séances, calendrier, publication GitHub) |
| `logo_ab.avif` | Logo Aviron Bayonnais |

## Données clés (data.js)

### seancesData (80 séances)
Chaque séance a 3 variantes terrain :
- **Route** : halage, intramuros, plage
- **Piste** : stade, 400m
- **Trail** : Chiberta, sentiers, côtes

Plus : RPE, catégorie, volume/modulation, notes coach.

### programme (52 semaines, S1 = 31 août 2026)
Tronc commun mardi/jeudi + sortie WE en 2 variantes (Route ou Trail).
Chaque semaine pointe vers des clés de `seancesData`.

### objectifsCalendrier (7 objectifs)
Repères saison : Marathon La Rochelle (S13), France de Cross (S27), Semi Saint-Sébastien (S33), Marathon Biarritz (S35), Euskal Raid (S36), Trails Pays Basque (S44).

### chargeHebdoSeuils (7 seuils)
De "Récupération" (≤280 UA) à "Surcharge" (>1050 UA).

## Philosophie

- **RPE individualise** : chacun dose son effort. Pas de vitesse prescrite.
- **UA mesure la charge** : RPE × durée en minutes. Permet le suivi hebdomadaire.
- **Terrain apporte la variété** : même séance, 3 façons de la vivre.
- **PPG exclusivement en côtes** : principe physiologique non-négociable.
- **Modulation du volume** : reprise / standard / forme — l'athlète choisit.

## Palette AB

- Sky blue : `#7BC3E5`
- Navy : `#1B3A6B`
- Mousse : `#4A8A5A`

## Déploiement

Fichiers statiques (HTML + JS). Pas de backend. Publication via GitHub Pages depuis l'admin.
