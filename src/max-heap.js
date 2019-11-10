const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
  }

  static correctState(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].left !== null) {
        arr.push(arr[i].left);
      }
      if (arr[i].right !== null) {
        arr.push(arr[i].right);
      }
      if (arr[i].left !== null && arr[i].right !== null) {
        arr.shift();
        i--;
      }
    }
    return arr;
  }

  push(data, priority) {
    const node = new Node(data, priority);

    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (this.root === null) {
      return;
    }

    let detached = {};
    detached = this.detachRoot();

    this.restoreRootFromLastInsertedNode(detached);
    this.shiftNodeDown(this.root);

    if (this.root !== null) {
      this.parentNodes = MaxHeap.correctState([this.root]);
    }

    return detached.data;
  }

  detachRoot() {
    for (let i = 0; i < this.parentNodes.length; i++) {
      if (
        this.parentNodes[i].priority === this.root.priority &&
        this.parentNodes[i].data === this.root.data
      ) {
        this.parentNodes.splice([i], 1);
      }
    }

    let temp = this.root;
    this.root = null;

    return temp;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (Object.keys(detached).length === 0) {
      return;
    }
    if (detached.left !== null) {
      let temp = detached;

      while (temp.left !== null && temp.right !== null) {
        if (temp.right !== null && temp.left.left === null) {
          temp = temp.right;
          break;
        }
        if (temp.right.priority <= temp.left.priority) {
          temp = temp.left;
        } else {
          temp = temp.right;
        }
      }
      if (temp.left !== null && temp.right === null) {
        temp = temp.left;
      }
      if (temp.left === null && temp.right !== null) {
        temp = temp.right;
      }

      while (temp.parent !== null) {
        temp.swapWithParent();
      }

      while (detached.left !== null && detached.right !== null) {
        if (detached.right.priority <= detached.left.priority) {
          detached.left.swapWithParent();
        } else {
          detached.right.swapWithParent();
        }
      }

      if (detached.left !== null && detached.right === null) {
        detached.left.swapWithParent();
      }
      if (detached.left === null && detached.right !== null) {
        detached.right.swapWithParent();
      }

      this.root = temp;

      if (
        detached.parent !== null &&
        detached.parent.left !== null &&
        detached.parent.left === detached
      ) {
        detached.parent.left = null;
      }
      if (
        detached.parent !== null &&
        detached.parent.right !== null &&
        detached.parent.right === detached
      ) {
        detached.parent.right = null;
      }
      if (this.root !== null) {
        this.parentNodes = MaxHeap.correctState([this.root]);
      }
    }
  }

  size() {
    const node = this.root;
    let size = [0]; // size as array for chages by reference in recursion

    function calcSize(node) {
      if (node === null) return;
      calcSize(node.left);
      size[0] += 1;
      calcSize(node.right);
    }

    calcSize(node);

    return size[0];
  }

  isEmpty() {
    if (this.parentNodes.length === 0) {
      return true;
    }

    return false;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
  }

  insertNode(node) {
    if (this.root === null) {
      this.root = node;
      this.parentNodes[0] = node;
    } else {
      this.parentNodes.push(node);
      if (this.parentNodes[0].left === null) {
        this.parentNodes[0].left = node;
        node.parent = this.parentNodes[0];
      } else if (this.parentNodes[0].right === null) {
        this.parentNodes[0].right = node;
        node.parent = this.parentNodes[0];
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (node.parent !== null && node.priority > node.parent.priority) {
      node.swapWithParent();
      this.shiftNodeUp(node);
    }

    let temp = node;

    while (temp.parent !== null) {
      temp = temp.parent;
    }

    this.root = temp;

    if (this.root !== null) {
      this.parentNodes = MaxHeap.correctState([this.root]);
    }
  }

  shiftNodeDown(node) {
    if (this.root === null || node === null) {
      return;
    }
    if (this.root.left === null && this.root.right === null) {
      return;
    }
    if (node.left === null && node.right === null) {
      return;
    }

    if (node.left !== null && node.right === null) {
      if (node.priority >= node.left.priority) {
        return;
      } else {
        node.left.swapWithParent();
        let temp = node;
        while (temp.parent !== null) {
          temp = temp.parent;
        }
        this.root = temp;
        this.shiftNodeDown(node);
      }
    }
    if (node.right !== null && node.left === null) {
      if (node.priority >= node.right.priority) {
        return;
      } else {
        node.right.swapWithParent();
        let temp = node;
        while (temp.parent !== null) {
          temp = temp.parent;
        }
        this.root = temp;
        this.shiftNodeDown(node);
      }
    }
    if (node.right !== null && node.left !== null) {
      if (node.left.priority >= node.right.priority) {
        if (node.priority >= node.left.priority) {
          return;
        } else {
          node.left.swapWithParent();
          let temp = node;
          while (temp.parent !== null) {
            temp = temp.parent;
          }
          this.root = temp;
          this.shiftNodeDown(node);
        }
      } else {
        if (node.priority >= node.right.priority) {
          return;
        } else {
          node.right.swapWithParent();
          let temp = node;
          while (temp.parent !== null) {
            temp = temp.parent;
          }
          this.root = temp;
          this.shiftNodeDown(node);
        }
      }
      if (this.root !== null) {
        this.parentNodes = MaxHeap.correctState([this.root]);
      }
    }
  }
}

module.exports = MaxHeap;
