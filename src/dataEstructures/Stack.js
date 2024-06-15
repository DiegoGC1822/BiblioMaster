import Node from "./Node"

class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(value) {
        const newNode = new Node(value);
        if (this.top) {
            newNode.next = this.top;
        }
        this.top = newNode;
        this.size++;
    }

    pop() {
        if (!this.top) {
            return null;
        }
        const value = this.top.value;
        this.top = this.top.next;
        this.size--;
        return value;
    }

    peek() {
        return this.top ? this.top.value : null;
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }
}