import  LinkedList  from './LinkedList.js'
export default class HashTable {
    constructor() {
        this.users = new Array(10)
        for(let i = 0; i < 10; i++) {
            this.users[i] = new LinkedList()
        }
    }

    hash(key) {
        let hash = 0
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % 10
    }

    add(key, value) {
        const index = this.hash(key)
        this.users[index].add(value)
    }

    delete(key) {
        const index = this.hash(key)
        this.users[index].delete(key)
    }

    find(key,value) {
        const index = this.hash(key)
        return this.users[index].find(key,value)
    }
}