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

    insert(book) {
        const newNode = new BSTNode(book);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.book.title < node.book.title) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
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
