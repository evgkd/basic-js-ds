const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }
  add(data) {
    const insert = (node, data) => {
      if (!node) return new Node(data);
      if (data === node.data) return node;
      if (data < node.data) node.left = insert(node.left, data);
      else node.right = insert(node.right, data);
      return node;
    };
    this._root = insert(this._root, data);
  }
  find(data) {
    const dfs = (node) => {
      if (!node) return null;
      if (data === node.data) return node;
      return data < node.data ? dfs(node.left) : dfs(node.right);
    };
    return dfs(this._root);
  }
  has(data) {
    return this.find(data) !== null;
  }
  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };
    this._root = removeNode(this._root, data);
  }
  min() {
    if (!this._root) return null;
    let curr = this._root;
    while (curr.left) curr = curr.left;
    return curr.data;
  }
  max() {
    if (!this._root) return null;
    let curr = this._root;
    while (curr.right) curr = curr.right;
    return curr.data;
  }
}

module.exports = {
  BinarySearchTree,
};
