'use strict';

/*
                    3
                   / \
                  1   4
                   \   \
                    2   6
                       / \
                      5   9
                       \
                        7
*/

/*
                          E
                         / \
                        A    E 
                              \
                               S
                              / \____
                             I       S
                              \     / \
                               O   Q   Y
                              /   /
                             N   U
                                /
                               T
*/

/*
                    2
                   / \
                  1   4
                       \
                        6
                       / \
                      5   9
                       \
                         7
*/

/*
                          A
                           \
                            E 
                             \
                              S
                             / \
                            I   S__
                             \    / \
                              O  Q   Y
                             /       /
                            N       U
                                   /
                                  T
*/

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }
}

function mainNum(){
  const BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  BST.insert(10);
  BST.insert(11);
  BST.insert(0);
  BST.insert(-1);
  BST.insert(-2);
  BST.insert(-3);
  BST.insert(-4);
  BST.insert(-5);
  BST.insert(-6);
  BST.insert(-7);
  BST.insert(-8);
  BST.insert(-9);
  BST.insert(-10);
  return BST;
}

function mainStr(){
  const BST = new BinarySearchTree();
  BST.insert('E');
  BST.insert('A');
  BST.insert('S');
  BST.insert('Y');
  BST.insert('Q');
  BST.insert('U');
  BST.insert('E');
  BST.insert('S');
  BST.insert('T');
  BST.insert('I');
  BST.insert('O');
  BST.insert('N');
  return BST;
}

// 4
// This function adds all the values of the tree together.
// Runtime: O(n)
function tree(t){
  if(!t){
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

//5
// Time complexity: O(n)
function height(t){
  if(!t.left && !t.right){
    return 1;
  }
  else if(t.left && !t.right){
    return height(t.left) + 1;
  }
  else if(!t.left && t.right){
    return height(t.right) + 1;
  }
  else{
    if(height(t.left) > height(t.right)){
      return height(t.left) + 1;
    }
    if(height(t.left) < height(t.right)){
      return height(t.right) + 1;
    }
    if(height(t.left) === height(t.right)){
      return height(t.left) + 1;
    }
  }
}

// console.log(height(mainNum()));

//6
function bstCheck(t){
  if(t.left > t || t.left > t.right){
    return false;
  }
  if(t.right < t || t.right < t.left){
    return false;
  }
  if(!t.left && !t.right){
    if(!t.parent){
      return false;
    }
    else return;
  }
  if(t.left){
    bstCheck(t.left);
  }
  if(t.right){
    bstCheck(t.right);
  }
  return true;
}

// console.log(bstCheck(mainNum()));

//7
// this is stupid but it works ¯\_(ツ)_/¯ 
function thirdLargest(t){
  t.remove(t._findMax().key);
  t.remove(t._findMax().key);
  return t._findMax().key;
}

function isBalanced(t){
  // At each split, check the height of each branch. If the difference is greater than 1, return false. Else return true; 
  if(t.left && t.right){
    if(height(t.left) - height(t.right > 1) || height(t.right) - height(t.left) > 1){
      return false;
    }
    isBalanced(t.left);
    isBalanced(t.right);
  }
  return true;
}

function sameBST(arr, arr2){
  if(arr[0] !== arr2[0] || arr.length !== arr2.length){
    return false;
  }
  if(arr.length === 1 && arr2.length === 1){
    return true;
  }

  let root = arr[0]; // 3       // 6
  let rArr1 = [];    // [6,4,5] // []
  let lArr1 = [];    // [1,0,2] // [4,5]
  let rArr2 = [];    // [6,4,5] // []
  let lArr2 = [];    // [1,2,0] // [1,2,0]
  for(let i = 1; i < arr.length; i++){
    if(arr[i] > root){
      rArr1.push(arr[i]);
    }
    else{
      lArr1.push(arr[i]);
    }
    if(arr2[i] > root){
      rArr2.push(arr2[i]);
    }
    else{
      lArr2.push(arr2[i]);
    }
  }
  if(rArr1.length && rArr2.length){
    return sameBST(rArr1, rArr2);
  }
  if(lArr1.length && lArr2.length){
    return sameBST(rArr1, rArr2);
  }
  return true;
}

console.log(sameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])); // orig input - true
console.log(sameBST([3, 6, 4, 5, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])); // swap 5/6 arr - false
console.log(sameBST([3, 6, 4, 5, 1, 0, 2], [3, 1, 6, 2, 4, 5, 0])); // max call stack?
















// function sameBST(arr, arr2){
//   if(arr[0] !== arr2[0] || arr.length !== arr2.length){
//     return false;
//   }
//   if(arr.length === 1 && arr2.length === 1){
//     return true;
//   }

//   let root = arr[0]; // 3       // 6
//   let rArr1 = [];    // [6,4,5] // []
//   let lArr1 = [];    // [1,0,2] // [4,5]
//   let rArr2 = [];    // [6,4,5] // []
//   let lArr2 = [];    // [1,2,0] // [1,2,0]
//   for(let i = 1; i < arr.length; i++){
//     if(arr[i] > root){
//       rArr1.push(arr[i]);
//     }
//     else{
//       lArr1.push(arr[i]);
//     }
//     if(arr2[i] > root){
//       rArr2.push(arr2[i]);
//     }
//     else{
//       lArr2.push(arr2[i]);
//     }
//   }
//   return sameBST(rArr1, rArr2) && sameBST(lArr1, lArr2);
// }

// console.log(sameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])); // orig input - true
// console.log(sameBST([3, 6, 4, 5, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])); // swap 5/6 arr - false
// console.log(sameBST([3, 6, 4, 5, 1, 0, 2], [3, 1, 6, 2, 4, 5, 0])); // max call stack?