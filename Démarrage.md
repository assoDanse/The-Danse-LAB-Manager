## Sujet

#### Sujet 2 
gestion association de Dance
#### Client
nom : Yann Riquier 
contact : yann.riquier@junia.com
riquier.y@sfeir.com



## Equipe

- Antonin LEDEE
- Rich Trésor TSAGUE ZANGUE
- Hur Claudin BOMBA
- Rachid LAKRIMI
- Yann Charles FONIE MEKIEDJE


## Outils de gestion

- équipe teams
- github
- gestion des tâches
- planning
- whatsapp
- relation client


## Idées d'outils et techno

- figma (front)
- balsamic mokup
- looping (bdd)
- docker
- react/Next.js
- supabase
- tailwind.css
- Flowbite


## Analyse du cahier des charges

- chacun lit le cahier des charges et note les question qui lui vienne -> mise en commun
- rédaction d'une fiche de question client
- décomposition du cdc pour identifier les jalons
- choisir les technos (voir initialisation)
- découper les jalons en tâches


## Initialisation du projet

#### Se renseigner sur les techno : 
- lire la doc d'installation
- faire un README pour chaque techno pour que les autres puisse au minimum comprendre la techno

#### Après avoir choisi les technos : 
- initialiser le projet avec un premier git commit
- vérifier la synchronisation de tout le monde avec le git ( voir README )


## Github

- [ ] Créer l'organisation
- [ ] Créer un premier repository
- [ ] Créer le Projet pour la gestion des tâches
- [ ] 
- [ ] Initialiser avec les fichiers de configuration des différentes techno


## A faire

- [x] remplir le formulaire de groupe
- [ ] ajouter les documents de gestion de projet au github
- [ ] effectuer une roadmap pour chaque type de profils pour lister toutes les interactions qu'ils peuvent avoir
- [ ] liste des contraintes avec classification par ordre de priorité
- [ ] faire les services de base et améliorer par la suite


## Questions sur le cahier des charges

- combien d'adhérants ?
adhérents (150), profs(30), visiteur() -> rajouter un grade
- combien de cours ? (lieux)
sur 1 semaine : 14 cours max (cours régulier ou soirée), cours régulier -> 3 lieux réguliers + x lieux exeptionnels
- quelle type de gestion financière ?
2 parties : 
	- comptabilité : rétribution des professeurs après déduction
	- caisse : nombre d'entrées = x €
- entrées des élèves -> système d'appel ?
pas d'appel -> présentation ponctuel(paiement en caisse) ou préinscription via helloassos
- achats sur place -> qu'est ce que c'est ?
caisse
- coût supportable -> fourchette de prix
libre (pas trop cher)
- qu'est ce que veut dire "carte accepté"

- quelles informations précises doit rentrer un élève ou un professeur pour se créer un compte ?
numéro d'adhérent, professeur(type de danse)
- dans les informations pertinentes, à quoi correspond les "contacts" ?
responsable asso, facebook, 
- combien de tarifs de séances y a-t-il ?
tarif ajustable
- qui créer les cours ?
administrateur -> un admin
- comment fonctionne le système de "crédit" par rapport à la durée d'un abonnement
abonnement = carte transformer la carte uniquement numérique pour faire foi
- au delà de quelle période, l'historique des cours doit-il être supprimé ?
option : garder à l'infini -> proposer une purge à l'année
- quels tags ?
par professeur, par type de danse
- ajouter un lien de quoi ? où ?
lien vidéo du cours fait par l'élève
- photos et vidéo des cours ? des représentation ?
pas les vidéo de cours, accès aux vidéo des autres élèves du même cours
- pour la participation a un cours, il faut payer à l'unité, par abonnement, les deux
- admin création de différents type de carte
nombre de place différents par abonnement avec différentes réduction
- quelle est la finalité pour l'expoitation du site (VPS, server)
hébergement externe
- professeur fait participer un élève à un cours

- annulation d'un cours ?
par le professeur, option : avant le début 
- page de suivi des règlement ?
page de synthèse compta ( résumé avec barre de recherche précise)

-> abonnement = carte avec un grand nombre d'entrée

La première analyse de cahier des charges ne prends pas en compte les critères optionnels.

option : superadmin

prévoir les scénarios en fonction des contraintes

a voir le fonctionnement actuel : https://www.helloasso.com/associations/the-dancelab
