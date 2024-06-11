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

    search(word, criterion) { // Agregar el criterio como parámetro
        return this.searchNode(this.root, word, criterion);
    }

    searchNode(node, word, criterion) {
        if (node === null) {
            return null;
        }

        const nodeValue = node.book[criterion].toLowerCase();
        const searchValue = word.toLowerCase();

        if (searchValue < nodeValue) {
            return this.searchNode(node.left, word, criterion);
        } else if (searchValue > nodeValue) {
            return this.searchNode(node.right, word, criterion);
        } else {
            return node.book;
        }
    }
}

export default BST;
