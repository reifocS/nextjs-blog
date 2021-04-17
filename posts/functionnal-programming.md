---
title: 'Functionnal programming in typescript.'
date: '2021-04-10'
tags: ['functionnal programming', 'typescript']
description: 'Presentation of functionnal programming patterns in typescript'
---


<h2>Introduction</h2>


Language like javascript, java and C++ tends to adopt more and more functionnal programming characteristics.
This is not surprising as functionnal paradigm is particularly adapted to subjects like data processing, parallelism and repartition.
Immutability and function composition are very usefull tools when it comes to these subjects.

Functionnal Programming is based on functions, defined recursively, and data belonging to inductive types (to allow recursion). 
It may not make much sense for now but we will cover it along this post.  


<h2>Inductive definition</h2>

Such definitions are presented under the following form:
1. Base cases, to start recursion.
2. Constructed cases, using what is already defined.  

Here's some example of inductive types:

1. lists: a list is either empty, either one element followed by a sublist.
2. words: a word is either the empty word, either a letter followed by a word.
3. integers: an integer is either zero, either the follower of an integer.
4. binary tree: a tree is either empty, either one element, the root and two trees, the left and the right.


It is easy to construct recursiv functions on inductive types. We will do what we call pattern matching. Taking each element at a time and, if it is a constructed element, destructuring it in simpler elements.
We will illustrate this with two examples, lists and binary trees.

<h2>Lists and Binary Trees</h2>

It is possible to directly define algebric types in typescript using JSON and the union "|"
```javascript
// Unity type singleton
export type Unity = undefined
export type List<T> = { empty: Unity } | readonly [T, List<T>];
```
Let's code some usefull functions to use our list.
```javascript
export const EMPTY_singleton: { empty: Unity } = { empty: undefined };

// The return type is a predicate:
// ... it tells the compilator that the list is empty.
// It is usefull to narrowing union types.
export function isEmpty<T>(l: List<T>): l is { empty: Unity } {
    return ("empty" in l);
}

// Empty constructor
export function EMPTY<E>(): List<E> {
    return EMPTY_singleton;
}

export function head<T>(l: List<T>): T {
    if (isEmpty(l))
        throw new Error('head undefined : empty list')
    return l[0]
}

export function rest<T>(l: Liste<T>): Liste<T> {
    if (isEmpty(l))
        throw new Error('rest undefined : empty list')
    return l[1]
}
```
Now to build our list, we would do something like this:
```javascript
// [1, 2]
let l: List<number> = [1, [2, EMPTY<number>()]]
```
As you can see, it's not very convenient, especially for long lists.
```javascript
// [5, 4, 1, 2]
let ll: List<number> = [5,[4,[1, [2, EMPTY<number>()]]]]
```
Let's make a function to construct a list as a array.
```javascript
export function arrayAsList<T>(tab: Array<T>): List<T> {
    let l: List<T> = EMPTY()
    for (let i = tab.length - 1; i >= 0; i--) {
        l = [tab[i], l]
    }
    return l;
}

const l = arrayAsList([1, 3, 4, 5, 6, 9]);
```

One great thing with inductive definitions is that you can use pattern matching. We will define a function that can handle the two cases:
1. when the list is empty.
2. when it's an element of type T followed by a sublist of type T.

```javascript
export function filter<T, R>(
    l: List<T>,
    caseEmpty: () => R,
    caseCons: (t: T, r: List<T>) => R): R {
    if (isEmpty(l)) {
        return caseEmpty();
    } else {
        return caseCons(l[0], l[1]);
    }
}

```

We can now use our fitler function to make a toString function.
```javascript
export function recursivRepresentation<T>(l: List<T>): string {
    return filter(l,
        () => "[]",
        (t, r) => t + "::" + recursivRepresentation(r)
    )
}
```

Let's test this.
```javascript
const l = arrayAsList([1, 3, 4, 5, 6, 9]);
console.log(recursivRepresentation(l));
//1::3::4::5::6::9::[]
```
You can see that inductive definitions are really powerfull as we can use our filter function to make operations on our list like computing its length.
```javascript
export function length<T>(l: List<T>): number {
    return filter(l,
        () => 0,
        (t, l) => 1 + length(l));
}
```
For completeness let's give another example with binary trees wich are a very common inductive structure
. As for lists, we will use an object literal. This time i considered the base case as an element without children (say a leaf of the tree) to illustrate the NonNullable type from typescript.
```javascript
export type BinaryTree<T> = {
  children: {
    left: BinaryTree<T>;
    right: BinaryTree<T>;
  } | null;
  root: T;
}

export function hasChildren<T>(tree: BinaryTree<T>): tree is { root: T, children: NonNullable<BinaryTree<T>["children"]> } {
  return tree.children != null;
}

export function getRight<T>(tree: BinaryTree<T>): BinaryTree<T> {
  if (hasChildren(tree))
    return tree.children.right
  else
    throw new Error("Leaf has no children");
}

export function getLeft<T>(tree: BinaryTree<T>): BinaryTree<T> {
  if (hasChildren(tree))
    return tree.children.left
  else
    throw new Error("Leaf has no children");
}

export function getRoot<T>(tree: BinaryTree<T>): T {
  return tree.root;
}

export function LEAF<T>(t: T): BinaryTree<T> {
  return {
    root: t,
    children: null
  }
}


//        1
//       / \
//      2   3
//         / \
//        9  10
//       / \    
//      9  12
const tree: BinaryTree<number> = {
  root: 1,
  children: {
    left: LEAF(2),
    right: {
      root: 3,
      children: {
        right: LEAF(10),
        left: {
          root: 9,
          children: {
            right: LEAF(12),
            left: LEAF(9),
          }
        },
      }
    }
  }
}

export function filtrage<T, R>(
  tree: BinaryTree<T>,
  caseLeaf: (root: T) => R,
  caseCons: (root: T, right: BinaryTree<T>, left: BinaryTree<T>) => R): R {
  if (hasChildren(tree)) {
    return caseCons(getRoot(tree), getRight(tree), getLeft(tree));
  } else {
    return caseLeaf(getRoot(tree));
  }
}

export function depth<T>(tree: BinaryTree<T>): number {
  return filtrage(tree,
    () => 0,
    (root, right, left) => Math.max(depth(right), depth(left)) + 1
  )
}

export function invert<T>(tree: BinaryTree<T>): BinaryTree<T> {
  return filtrage(tree,
    (root) => LEAF(root),
    (root, right, left) => ({
      root: root,
      children: {
        left: { ...invert(right) },
        right: { ...invert(left) }
      }
    })
  )
}


export function print<T>(tree: BinaryTree<T>): string {
  return filtrage(tree,
    (root) => "" + (root as any).toString() + "",
    (root, right, left) => "[" + root + "]" + "=>" + "(" + print(left) + ", " + print(right) + ")"
  )
}


```

**Applying FC patterns in Object Oriented Programming**

In a futur article we will reproduce the same example with classes, and we will see how we can apply those functionnal patterns to Object Oriented Programming.

* Inductive definitions => Composit pattern.
* Recursiv funtions => Interpretor and Visitor Pattern.
* Pattern matching => Visitor Pattern..
