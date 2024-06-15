import Node from "./Node"

export default class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    isEmpty() {
        return this.head === null
    }

    add(value) {
        const newNode = new Node(value)      
        if(this.isEmpty()) {
            this.head = newNode
        }else{
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.length++
    }

    delete(value){
        if(!this.isEmpty()){
          let current = this.head
          let previous = null
          while(current) {
              if(current.value === value) {
                  if(previous === null) {
                      this.head = current.next
                  }else{
                      previous.next = current.next
                  }
                  this.length--
                  return
              }
              previous = current
              current = current.next
          }
        }
    }

    find(key,value) {
        let current = this.head
        while(current) {
            if(current.value.username === key && current.value.password === value) {
                return current
            }
            current = current.next
        }
        return null
    }
}