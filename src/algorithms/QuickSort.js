function partition(head, end, criterion) {
    let pivot = head;
    let current = head.next;
    let prev = head;
  
    while (current !== end) {
      if (current.value[criterion] > pivot.value[criterion]) {
        prev = prev.next;
        [prev.value[criterion], current.value[criterion]] = [current.value[criterion], prev.value[criterion]];
      }
      current = current.next;
    }
    [pivot.value[criterion], prev.value[criterion]] = [prev.value[criterion], pivot.value[criterion]];
    return prev;
}
  
function quickSortRecursive(head, end, criterion) {
    if (head !== end) {
        const pivot = partition(head, end, criterion);
        quickSortRecursive(head, pivot);
        quickSortRecursive(pivot.next, end);
    }
}
  
export default function quickSort(linkedList, criterion) {
    quickSortRecursive(linkedList.head, null, criterion);
    return linkedList
}