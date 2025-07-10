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
  // Three cases:
  // Deleting a leaf node. Set parent to null
  // Deleting a node with one child. Set parent to node's child, removing the node from the chain
  // Deleting a node with two children:
  //  Find the node that is next largest
  //  Start with nodeToDelete.right, then go left as far as possible and select the last node (savedNode)
  //  If savedNode has no children:
  //    "Delete" savedNode by setting its parent.left to null, and use savedNode to replace nodeToDelete by
  //    copying saveNode.data to nodeToDelete.data
  //  If savedNode has children:
  //    We know that savedNode will only have one right tree child
  //    "Delete" savedNode by setting parent.left to savedNode.right, and use saveNode to replace nodeToDelete by
  //    copying saveNode.data to nodeToDelete.data
  function deleteItem(value) {
    let parent = null;
    let current = root;

    while (current !== null && current.data !== value) {
      parent = current;

      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // Value not found
    if (current === null) {
      return root;
    }

    // Check if the node to be deleted has at most one child
    // This also handles leaf nodes
    if (current.left === null || current.right === null) {
      let newCurrent = current.left === null ? current.right : current.left;

      // Check if the node to be deleted is the root
      if (parent === null) {
        return newCurrent;
      }

      // Check if the node to be deleted is parent's left or right child, and then replace this with newCurrent
      if (current === parent.left) {
        parent.left = newCurrent;
      } else {
        parent.right = newCurrent;
      }
    } else {
      // Node to be deleted has two children
      let nextLParent = null;
      let nextLargest = current.right;

      // Find the next largest node
      while (nextLargest.left !== null) {
        nextLParent = nextLargest;
        nextLargest = nextLargest.left;
      }

      if (nextLParent !== null) {
        // After we went right, there were left branches
        nextLParent.left = nextLargest.right;
      } else {
        // After we went right, there were no left branches, so we stop
        current.right = nextLargest.right;
      }

      // Copy the data, replacing the node to be deleted with the correct node value
      current.data = nextLargest.data;
    }
  }

  // Returns the node with the given value
  function find(value) {
    let current = root;

    while (current !== null) {
      if (current.data === value) {
        return current;
      }

      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return "Value not found";
  }

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

  return { root, insert, deleteItem, find };
}
