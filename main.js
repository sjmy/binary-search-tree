import Tree from "./Tree.js";

// Function to help visualize BST
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Callback function
function printNode(node) {
  console.log(node.data);
}

function createRandomArray(n) {
  let array = [];

  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

const tree = Tree(createRandomArray(17));

prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.insert(101);
tree.insert(102);
tree.insert(111);
tree.insert(102);
tree.insert(131);
tree.insert(141);
tree.insert(171);

prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.postOrder(printNode);
