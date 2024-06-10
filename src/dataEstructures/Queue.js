class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class Queue {
    constructor() {
      this.front = null; // Primer nodo en la cola
      this.rear = null;  // Último nodo en la cola
      this.size = 0;
    }
  
    // Método para añadir un elemento al final de la cola
    enqueue(value) {
      const newNode = new Node(value);
      if (this.rear === null) {
        this.front = this.rear = newNode;
      } else {
        this.rear.next = newNode;
        this.rear = newNode;
      }
      this.size++;
    }
  
    // Método para eliminar un elemento del frente de la cola
    dequeue() {
      if (this.front === null) {
        return null;
      }
      const dequeuedNode = this.front;
      this.front = this.front.next;
      if (this.front === null) {
        this.rear = null;
      }
      this.size--;
      return dequeuedNode.value;
    }
  
    // Método para verificar si la cola está vacía
    isEmpty() {
      return this.size === 0;
    }
  
}
