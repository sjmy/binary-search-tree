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
  // Although, it could be refactored to be recursive if root was passed in as a parameter with a default value
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

    return null;
  }

  // Visit all nodes at a level before traversing to a deeper level. Breadth-first
  // FIFO queue
  // At each discovered node, enqueue its children
  // Iterative solution
  function levelOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function required");
    }

    if (root === null) {
      return;
    }

    let queue = [];
    let current = root;
    queue.unshift(current);

    while (queue.length > 0) {
      current = queue.pop();
      callback(current);

      if (current.left !== null) {
        queue.unshift(current.left);
      }

      if (current.right !== null) {
        queue.unshift(current.right);
      }
    }
  }

  // inOrder, preOrder, postOrder are depth-first

  // Visit left subtree, then root, then right subtree
  // Recursive solution, uses inOrderRecursion to pass in a pointer to root
  function inOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function required");
    }

    let current = root;
    inOrderRecursion(current, callback);
  }

  function inOrderRecursion(node, callback) {
    if (node == null) {
      return;
    }

    inOrderRecursion(node.left, callback);
    callback(node);
    inOrderRecursion(node.right, callback);
  }

  // Visit root, then left subtree, then right subtree
  // Recursive solution, uses preOrderRecursion to pass in a pointer to root
  function preOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function required");
    }

    let current = root;
    preOrderRecursion(current, callback);
  }

  function preOrderRecursion(node, callback) {
    if (node === null) {
      return;
    }

    callback(node);
    preOrderRecursion(node.left, callback);
    preOrderRecursion(node.right, callback);
  }

  // Visit left subtree, then right subtree, then root
  // Recursive solution, uses postOrderRecursion to pass in a pointer to root
  function postOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function required");
    }

    let current = root;
    postOrderRecursion(current, callback);
  }

  function postOrderRecursion(node, callback) {
    if (node === null) {
      return;
    }

    postOrderRecursion(node.left, callback);
    postOrderRecursion(node.right, callback);
    callback(node);
  }

  // Returns the height of the node containing the given value
  // Height is defined as the number of edges in the longest path from that node to a leaf node
  // If the value is not found in the tree, the function should return null
  // Recursive solution https://www.geeksforgeeks.org/dsa/find-the-maximum-depth-or-height-of-a-tree/
  function height(value) {
    let node = find(value);

    if (node === null) {
      return null;
    }

    return getHeight(node);
  }

  function getHeight(node) {
    if (node === null) {
      return -1;
    }

    let leftHeight = getHeight(node.left);
    let rightHeight = getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Returns the depth of the node containing the given value
  // Depth is defined as the number of edges in the path from that node to the root node
  // If the value is not found in the tree, the function should return null
  function depth(value) {
    let node = find(value);

    if (node === null) {
      return null;
    }

    if (node === root) {
      return 0;
    }

    // Initialize a queue to traverse the tree level by level
    // Increment depth after each level
    // If node is found, return the current depth
    let depth = 0;
    let queue = [];
    let current = root;
    queue.unshift(current);

    // Loop until the queue is empty
    while (queue.length > 0) {
      let levelSize = queue.length;

      // Traverse all nodes at the current level
      for (let i = 0; i < levelSize; i++) {
        current = queue.pop();

        // If the node is one of the children, increment and return depth
        if (current.left === node || current.right === node) {
          depth++;
          return depth;
        }

        if (current.left !== null) {
          queue.unshift(current.left);
        }

        if (current.right !== null) {
          queue.unshift(current.right);
        }
      }
      // Increment depth after traversing a level
      depth++;
    }

    return depth - 1;
  }

  // Checks if the tree is balanced
  // A binary tree is considered balanced if, for every node in the tree,
  // the height difference between its left and right subtrees is no more than 1,
  // and both the left and right subtrees are also balanced
  // Must check the balance condition for every node
  function isBalanced(current = root) {
    if (current === null) {
      return true;
    }

    let leftHeight = getHeight(current.left);
    let rightHeight = getHeight(current.right);

    if (
      Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight) >
      1
    ) {
      return false;
    }

    return isBalanced(current.left) && isBalanced(current.right);
  }

  // Rebalances an unbalanced tree
  // Use a traversal method to provide a new array to the buildTree function
  function rebalance() {
    if (root === null) {
      return;
    }

    let newArray = [];
    let queue = [];
    let current = root;
    queue.unshift(current);

    while (queue.length > 0) {
      current = queue.pop();
      newArray.push(current.data);

      if (current.left !== null) {
        queue.unshift(current.left);
      }

      if (current.right !== null) {
        queue.unshift(current.right);
      }
    }
    root = buildTree(newArray);
    return;
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
