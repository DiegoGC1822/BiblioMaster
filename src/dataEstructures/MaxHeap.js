export default class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insertar(valor) { 
        this.heap.push(valor);
        this.ascender(this.heap.length - 1);
    }

    extraerMax() {
        if (this.heap.length < 2) return this.heap.pop();
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.descender(0);
        return max;
    }

    ascender(index) {
        while (index > 0) {
            const indexPadre = Math.floor((index - 1) / 2);
            if (this.heap[index] <= this.heap[indexPadre]) break;
            [this.heap[index], this.heap[indexPadre]] = [this.heap[indexPadre], this.heap[index]];
            index = indexPadre;
        }
    }

    descender(index) {
        const ultindex = this.heap.length - 1;
        while (true) {
            const indexHijoIzq = 2 * index + 1;
            const indexHijoDer = 2 * index + 2;
            let indexMayor = index;

            if (indexHijoIzq <= ultindex && this.heap[indexHijoIzq] > this.heap[indexMayor]) {
                indexMayor = indexHijoIzq;
            }
            if (indexHijoDer <= ultindex && this.heap[indexHijoDer] > this.heap[indexMayor]) {
                indexMayor = indexHijoDer;
            }
            if (indexMayor === index) break;
            [this.heap[index], this.heap[indexMayor]] = [this.heap[indexMayor], this.heap[index]];
            index = indexMayor;
        }
    }
}
