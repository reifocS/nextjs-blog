---
title: 'Applying FC Patterns in Object Oriented Programming.'
date: '2021-04-10'
tags: ['functionnal programming','Object Oriented Programming', 'typescript']
---

 
	
- Définir un type abstrait de données.
 
 3 Implémentation dans les langages à objets
Comment rendre compte dans un langage à objets comme Java ou Typescript des définitions inductives ?

Dans le cas d'une définition ne comportant que des cas de base, il est assez naturel d'utiliser une interface pour désigner l'ensemble défini et ses opérations, en un mot le type abstrait, et une classe d'implémentation pour chaque cas de base.

Par exemple, définissons une forme géométrique plane comme étant soit un cercle, soit un triangle, soit un carré ; les formes géométriques en général sont alors représentées par une interface, les cercles par une classe concrète d'implémentation, et de même pour les triangles et les rectangles. L'interface contiendra en plus des services des méthodes particulières:

des sélecteurs, qui permettent de déterminer si une forme géométrique est un cercle, un triangle ou un rectangle respectivement,
des projecteurs (réalisant des projections) ou des destructeurs (attention : le mot est surchargé, un destructeur pouvant être aussi la procédure associée à la destruction en mémoire d'un objet), qui sont les accesseurs aux composantes de chaque forme géométrique, comme le centre et le rayon pour le cercle, le centre et un vecteur (demi-diagonale) pour un carré, etc.
Généralisons cette méthode, fondée sur la définition d'une interface pour l'ensemble engendré inductivement et de classes d'implémentation pour chaque cas de définition. Seule nouveauté, les attributs des classes peuvent contenir des références à des objets ayant pour type l'interface en cours d'implémentation : c'est cet auto-référencement par chaînage qui traduit la récursivité des définitions inductives. A ces attributs correspondent des accesseurs déclarés dans l'interface, les projecteurs.

En résumé, l'interface contient :

les services offerts par le type abstrait de données,
les sélecteurs, permettant de déterminer le cas de définition auquel correspond l'objet cible,
les projecteurs, permettant de décomposer l'objet cible, lorsqu'il s'agit d'un cas construit.
Une classe d'implémentation correspond à un cas de définition, et implémente les services et les sélecteurs suivant ce cas, ainsi que les projecteurs propres à ce cas, les autres n'étant pas définis (et déclenchant des exceptions).

Cette méthode est si commune qu'elle porte un nom : le patron de conception Composite.

Exemple

Interface Liste<E> contenant les sélecteurs, projecteurs et fabriques associés à la définition inductive
Deux classes d'implémentation : Vide<E> et Cons<E>
Il est possible de définir des types algébriques directement en Typescript, en utilisant le langage de données Json et l'union |.C'est une alternative au patron Composite.

Étant donné une interface pour les listes, il devient donc possible de l'implémenter par un adaptateur :

couche basse : la structure Json pure,
couche haute : les méthodes de l'interface implémentées par délégation.
Cette pratique est intéressante parce qu'elle fournit un format brut pour les données. C'est utile lors de communications en réseau par exemple.
