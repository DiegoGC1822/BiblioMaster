export function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }

    const medio = Math.floor(array.length / 2);
    const izq = array.slice(0, medio);
    const der = array.slice(medio);

    return merge(mergeSort(izq), mergeSort(der));
}

function merge(izq, der) {
    const result = [];
    while (izq.length && der.length) {
        if (izq[0] <= der[0]) {
            result.push(izq.shift());
        } else {
            result.push(der.shift());
        }
    }
    return result.concat(izq, der);
}
