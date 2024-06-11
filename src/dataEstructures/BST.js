class BSTNode {
    constructor(book) {
        this.book = book;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(book, criterion) {
        const newNode = new BSTNode(book);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode , criterion);
        }
    }

    insertNode(node, newNode, criterion) {
        const nodeValue = node.book[criterion].toLowerCase();
        const newNodeValue = newNode.book[criterion].toLowerCase();

        if (newNodeValue < nodeValue) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode, criterion);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode, criterion);
            }
        }
    }

    search(word, criterion) {
        const results = [];
        this.searchNode(this.root, word.trim().toLowerCase(), criterion, results);
        return results;
    }

    searchNode(node, word, criterion, results) {
        if (node === null) {
            return;
        }

        const nodeValue = node.book[criterion].toLowerCase();
        const searchValue = word.toLowerCase();

        // Perform the binary search and collect matching nodes
        if (searchValue < nodeValue) {
            this.searchNode(node.left, word, criterion, results);
        } else if (searchValue > nodeValue) {
            this.searchNode(node.right, word, criterion, results);
        } else {
            results.push(node.book);
            // Continue searching in both left and right subtrees
            this.searchNode(node.left, word, criterion, results);
            this.searchNode(node.right, word, criterion, results);
        }
    }
}

export default BST;
