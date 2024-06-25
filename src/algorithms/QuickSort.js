function partition(head, end, criterion, books, users) {
  let pivot = head;
  let current = head.next;
  let prev = head;

  const getValue = (node) => {
      if (criterion === "bookTitle") {
          const book = books.find(book => book.id === node.value.bookId)
          return book ? book.title : ""
      } else if (criterion === "username") {
          const user = users.find(user => user.id === node.value.userId)
          return user ? user.username : ""
      }
      return node.value[criterion]
  }

  while (current !== end) {
      if (getValue(current) < getValue(pivot)) {
          prev = prev.next
          ;[prev.value, current.value] = [current.value, prev.value]
      }
      current = current.next
  }
  ;[pivot.value, prev.value] = [prev.value, pivot.value]
  return prev
}

function quickSortRecursive(head, end, criterion, books, users) {
  if (head !== end) {
      const pivot = partition(head, end, criterion, books, users)
      quickSortRecursive(head, pivot, criterion, books, users)
      quickSortRecursive(pivot.next, end, criterion, books, users)
  }
}

export default function quickSort(linkedList, criterion, books, users) {
  quickSortRecursive(linkedList.head, null, criterion, books, users)
  return linkedList
}
