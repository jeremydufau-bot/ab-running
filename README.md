# AB Running Loisir — Aviron Bayonnais Athlétisme

Site de la nouvelle section Running Loisir du club AB Athlétisme.

## Structure du site

- **`index.html`** — page publique (tous les membres)
- **`admin.html`** — espace coach (édition du contenu, publication sur GitHub)
- **`data.js`** — toutes les données modifiables (programme, séances, infos club, etc.)
- **`app.js`** — logique JavaScript (rendering, calculateur, difficulté)
- **`logo_ab.avif`** — logo du club

## Nouveautés de cette refonte

### 1. Bandeau Infos Club sur la page d'accueil
Sous le hero, un bandeau dynamique affiche les messages de l'encadrement (infos, événements, urgences). Les messages ont une date de fin optionnelle — ils disparaissent automatiquement quand la date est dépassée. **Éditable via l'admin, onglet "📢 Infos club".**

### 2. Pastilles de difficulté sur le programme
Chaque séance du programme affiche désormais une pastille de couleur type piste de ski :
- 🟢 **Vert** — facile (UA ≤ 280)
- 🔵 **Bleu** — modéré (UA ≤ 380)
- 🟠 **Orange** — soutenu (UA ≤ 480)
- 🔴 **Rouge** — difficile (UA ≤ 600)
- ⚫ **Noir** — très difficile (UA > 600)

Le calcul se fait automatiquement à partir du titre de séance (RPE × durée estimée, incluant échauffement 30min + PPG 15min). **Les seuils sont modifiables via l'admin, onglet "📊 Calculateur".**

### 3. Page Calculateur de charge
Nouvelle page dans la navigation qui permet à chaque coureur de :
- Comprendre ce qu'est le RPE et l'UA (textes éditables par l'admin)
- Saisir durée + RPE pour les 7 jours × 4 semaines
- Voir sa charge hebdomadaire avec badge couleur (léger / normal / chargé / surcharge)
- Obtenir l'analyse de son bloc 4 semaines (progression S1→S3, ratio récup S4/S3)

Les données ne sont **pas enregistrées** — c'est un outil indicatif qui se réinitialise à chaque rechargement.

### 4. Refonte visuelle générale
- Nouvelle palette respectant les couleurs officielles AB (bleu ciel + marine)
- Logo AB intégré dans le hero
- Typographie et espacement revus
- Page Terrains repensée avec cartes descriptives

## Administration

L'admin dispose désormais de **6 onglets** :

| Onglet | Fonction |
|---|---|
| 📅 Programme | Modifier les 48 semaines annuelles |
| 📋 Séances | Bibliothèque des types de séances |
| 📢 Infos club | **NOUVEAU** — Messages du bandeau accueil |
| 📊 Calculateur | **NOUVEAU** — Textes RPE/UA + seuils difficulté & charge |
| 🗓 Calendrier | Sorties et événements |
| ⚙️ Configuration | Connexion GitHub pour publier |

Le bouton **"📤 Publier"** pousse toutes les modifications (y compris les nouvelles structures) vers le dépôt GitHub, et les membres voient les changements dans 1-2 minutes.

## Règles de charge (référence)

Chaque séance club (mardi/jeudi) a une charge fixe de **150 UA** avant la séance principale :
- Échauffement : 30min × RPE 3 = 90 UA
- PPG : 15min × RPE 4 = 60 UA

La charge totale = 150 + (durée séance × RPE séance).

**Référentiel semaine** (configurable via admin) :
- < 400 UA : très légère
- 400-600 UA : débutant
- 600-800 UA : intermédiaire standard
- 800-1050 UA : chargée
- \> 1050 UA : surcharge

**Référentiel bloc 4 semaines** :
- S1 = base
- S2 = S1 × 1.10 à 1.15
- S3 = S1 × 1.20 à 1.25 (pic)
- S4 = S3 × 0.55 à 0.65 (récupération)
