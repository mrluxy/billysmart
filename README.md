# BillySmart

## Equipe
- Fayolle Estelle DFS15
- Bouchez Crystal DFS15
- Grandclément Viktor DFS16
- Moreau Alexandre DFS16
- Azoulay Lucas DFS15

## Concept
Billysmart est une gamelle connectée ayant pour objectif de contrôler totalement l'alimentation de l'animal. Une trappe empêche tout autre animal que celui associé à la gamelle de manger. La gamelle reconnait la présence ou non de l'animal pour savoir quand se refermer. Un système de mise à jour permet de programmer le régime souhaité et des écrans statistiques permettent de suivre la progression de l'animal.

## Architecture
Le projet est composé d'un serveur hébergé sur Heroku contient une base de données en PostgreSql et une Api un expressJS.
L'application mobile est réalisée en ReactNative.
La gamelle contient la raspberry. Des scripts Cron sont en charge de la mise à jour du fichier de configuration et de la distribution des croquettes. Un script d'instance est chargé de gérer la trappe de reconnaissance de l'animal.
Un websocket est mis en place entre l'application mobile et la gamelle pour permettre de distribuer une dose instantanément via l'application.

## Difficultés
Il s'est avéré que la version gratuite de l'hébergement Heroku n'accepte que 10 requêtes par minute avant de bloquer les ports. Il faut repusher l'api pour la remettre en fonction. Cela nous a obligé à modifier les requêtes pour en fusionner et programmer en limitant un maximum nos requêtes. C'est aussi pour cette raison qu'on ne mettra pas l'application sur le PlayStore car les requêtes dépasseraient très vite le maximum.
Nous avons eu aussi des difficultés importantes avec les servomoteurs qui manquent de précision et ne se comportent pas correctement lors d'une seconde demande d'activation.

## Evolutions
- Ajout d'une balance pour peser les croquettes dans la gamelle afin de pouvoir faire du "multi-animal" : grâce au RFID, la gamelle saura quel animal mange et quelle quantité.
- Ajout d'une caméra pour pouvoir surveiller le comportement de l'animal quand l'utilisateur n'est pas là.
- Ajout de notifications pour signaler que l'animal est en train de manger
- Ajout d'un micro pour pouvoir parler à l'animal
- Connexion à une Api précisant le régime idéal de races d'animaux et travail avec des vétérinaires pour établir un régime idéal en fonction de la marque et des spécificités de l'alimentation choisie
- Ajout de régimes prédéfinis qui serontsélectionnés en fonction de l'animal, de son poids actuel et poids souhaité
- Ajout d'une gestion de l'eau avec une fontaine et réserve d'eau
- Conseils quotidiens établis avec le vétérinaire sous forme de notification
- Personnalisation de l'application (thème en fonction du sexe de l'animal, de sa race etc)
- Ajout d'un QRCode sur la gamelle pour facilement l'ajouter à l'application
- Ajout d'un lancement de friandise pour capter l'attention de l'animal lorsque l'utilisateur se connecte à la gamelle via la caméra