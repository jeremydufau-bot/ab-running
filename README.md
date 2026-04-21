# AB Running Loisir — Aviron Bayonnais Athlétisme

Site de la section Running Loisir du club AB Athlétisme — affilié FFA.

## Structure

- **`index.html`** — page publique
- **`admin.html`** — espace coach (édition, publication GitHub)
- **`data.js`** — toutes les données modifiables
- **`app.js`** — logique JavaScript (rendering, calculateur, difficulté)
- **`logo_ab.avif`** — logo du club

## Programme 52 semaines — Saison 2025/2026

Construit selon le *Guide de l'Entraîneur AB Running Loisir* et la méthode Foster (UA/RPE).

### Architecture annuelle

| Période | Phase | Thème | UA sem. moy. |
|---|---|---|---|
| Sept | Reprise | Foncier doux | ~790 |
| Oct | Foncier | Endurance + côtes | ~835 |
| Nov | VMA courte | 30/30, fractions 400m | ~870 |
| Déc | VMA longue + trêve | 1000m, pyramide | ~970 |
| Janv | Seuil | Tempo, 1000-2000m | ~750 |
| Fév | Seuil+ | Allure objectif | ~870 |
| Mars | Spécifique route | Allures marathon/semi | ~855 |
| Avril | Compétitions route | Affûtage + semi | ~520 |
| Mai | Transition trail | Dénivelé, excentrique | ~830 |
| Juin | Trail compétition | Trail des Colombes | ~640 |
| Juillet | Relâche Fêtes | Fêtes de Bayonne | ~540 |
| Août | Pré-reprise | Retour progressif | ~650 |

### Règle PPG (spécificité AB)

**La PPG n'est JAMAIS faite sur séances plat (halage, piste, intramuros, Chiberta, plage).**

Raison biomécanique : pré-fatiguer les quadriceps/mollets avant un fractionné plat :
- Détruit la raideur tendineuse nécessaire au rebond de foulée → risque de blessure (périostite, tendinopathie d'Achille)
- Épuise le glycogène intramusculaire → impossible d'atteindre sa VMA

**La PPG est INTÉGRÉE sur les séances côte** (Floride, Voulgre, VW, VVF, escaliers, Girouettes, Douves, montagne).

Raison : en côte, la vitesse est lente et les chocs articulaires minimes. La fatigue musculaire déjà installée permet de recruter les fibres profondes quand on enchaîne avec 8-10 squats en haut. C'est un **entraînement en contraste** — spécificité trail parfaite.

Dans le programme, on voit bien le pattern : toutes les séances côte se terminent par `🏋 PPG en haut de côte — ...`, et les séances plat se terminent par `⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité.`

### Bloc 3:1

Chaque mois suit le schéma guide :
- **S1-S2-S3** : montée progressive (650 / 750 / 900 UA cibles)
- **S4 décharge** : -40% pour surcompensation (≤ 500 UA)

15 semaines de décharge réparties sur l'année.

### Règles d'or respectées

✅ Jamais plus de 1050 UA sur une semaine
✅ Jamais 2 séances Rouge/Noir dans la même semaine
✅ Décharges en Vert/Bleu (≤ 500 UA)
✅ Affûtages 2 semaines avant semi-marathon et Trail des Colombes
✅ Trêve Noël (S16-17) et Fêtes de Bayonne (S44) intégrés culturellement

### Événements marqués dans le programme

- **S17** 🎄 Trêve de Noël
- **S32** 🏁 Semi-Marathon
- **S41** 🏔 Trail des Colombes
- **S44** 🎊 Fêtes de Bayonne
- **S52** 🏆 Bilan de saison

## Fonctionnalités

### Pages publiques

- **🏠 Accueil** — hero + bandeau Infos Club + 3 prochaines semaines
- **📅 Programme** — 52 semaines avec pastilles difficulté type piste de ski
- **📊 Calculateur** — 4 semaines vierges pour tester sa charge hebdo (RPE × durée)
- **🗓 Sorties** — calendrier + sorties membres
- **🗺 Terrains** — les lieux d'entraînement
- **💡 Idées** — boîte à propositions
- **💪 Renforcement** — séances PPG vendredi
- **🌅 Routines** — routines matin
- **ℹ️ Infos** — infos pratiques

### Pastilles de difficulté (5 niveaux, type piste de ski)

Calculées automatiquement à partir du titre de séance :

| Pastille | Niveau | UA |
|---|---|---|
| 🟢 Vert | Facile | ≤ 280 |
| 🔵 Bleu | Modéré | ≤ 380 |
| 🟠 Orange | Soutenu | ≤ 480 |
| 🔴 Rouge | Difficile | ≤ 600 |
| ⚫ Noir | Très difficile | > 600 |

Les séances en décharge sont automatiquement plafonnées à Vert/Bleu.

### Admin — 6 onglets

| Onglet | Fonction |
|---|---|
| 📅 Programme | Modifier les 52 semaines |
| 📋 Séances | Bibliothèque des types |
| 📢 Infos club | Messages bandeau accueil |
| 📊 Calculateur | Textes RPE/UA + seuils |
| 🗓 Calendrier | Sorties et événements |
| ⚙️ Configuration | Connexion GitHub |

Le bouton **📤 Publier** pousse toutes les modifications vers GitHub.

---

*Saison 2025/2026 — Aviron Bayonnais Athlétisme — Affilié FFA*
