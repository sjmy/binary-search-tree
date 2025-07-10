import Node from "./Node.js";
import mergeSort from "./mergeSort.js";

export default function Tree(array = []) {
  let root = buildTree(array);

  // Takes an unsorted or sorted array of data and turns it into a balanced binary tree full of Node objects appropriately placed
  // Sort and remove duplicates
  // The buildTree function should return the level-0 root node
  function buildTree(array) {
    array = mergeSort(array);
    return sortedArrayToBSTRecur(array, 0, array.length - 1);
  }

  // Recursively build a sorted array into a balanced binary search tree
  function sortedArrayToBSTRecur(array, start, end) {
    if (start > end) {
      return null;
    }

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = Node(array[mid]);

    // Create left subtree
    root.left = sortedArrayToBSTRecur(array, start, mid - 1);

    // Create right subtree
    root.right = sortedArrayToBSTRecur(array, mid + 1, end);

    return root;
  }

  // Insert the given value
  // Do not use the original input array
  // Traverse the tree, manipulate the nodes and connections
  // Used an iterative approach instead of recursive because the root variable is in the module scope
  function insert(value) {
    const tempNode = Node(value);

    // If tree is empty
    if (root === null) {
      return tempNode;
    }

    // Find the node who is going to have tempNode as its child
    let parent = null;
    let current = root;

    while (current !== null) {
      parent = current;

      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return root; // Duplicate value
      }
    }

    if (parent.data > value) {
      parent.left = tempNode;
    } else {
      parent.right = tempNode;
    }
  }

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

  return { root, insert };
}
