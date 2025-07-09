import mergeSort from "./mergeSort.js";

export default function Tree(dataArray = []) {
  let root = null;

  // Takes an unsorted or sorted array of data and turns it into a balanced binary tree full of Node objects appropriately placed
  // Sort and remove duplicates
  // The buildTree function should return the level-0 root node
  function buildTree(array) {
    array = mergeSort(array);
    return array;
  }

  // Insert the given value
  // Do not use the original input array
  // Traverse the tree, manipulate the nodes and connections
  function insert(value) {}

  // Delete the given value
  // Deal with several cases for delete, such as when a node has children or not
  function deleteItem(value) {}

  // Returns the node with the given value
  function find(value) {}

  function levelOrder(callback) {}

  function inOrder(callback) {}

  function preOrder(callback) {}

  function postOrder(callback) {}

  // Returns the height of the node containing the given value
  function height(value) {}

  // Returns the depth of the node containing the given value
  function depth(value) {}

  // Checks if the tree is balanced
  function isBalanced() {}

  // Rebalances an unbalanced tree
  // Use a traversal method to provide a new array to the buildTree function
  function rebalance() {}

  return { buildTree };
}
