const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize = 30) {
    this.heap = new MaxHeap();
    this.maxSize = maxSize;
    this.length = 0;
  }

  push(data, priority) {
    this.length += 1;

    if (this.length > this.maxSize) {
      this.length -= 1;
      throw new SyntaxError("Queue has max size");
    }

    this.heap.push(data, priority);
  }

  shift() {
    if (this.length === 0) {
      throw new SyntaxError("Queue is empty");
    }

    this.length -= 1;
    return this.heap.pop();
  }

  size() {
    return this.length;
  }

  isEmpty() {
    if (this.length === 0) {
      return true;
    }

    return false;
  }
}

module.exports = PriorityQueue;
