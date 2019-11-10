class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      this.left = node;
      node.parent = this;
    } else if (this.left && !this.right) {
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (node === this.left) {
      node.parent = null;
      this.left = null;
    } else if (node === this.right) {
      node.parent = null;
      this.right = null;
    } else {
      throw new SyntaxError("Node is not a child of this node");
    }
  }

  remove() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    const tempParent = new Node();
    const tempThis = new Node();
    // Create clone This
    if (this.left !== null) {
      this.left.parent = tempThis;
      tempThis.left = this.left;
      this.left = null;
    }
    if (this.right !== null) {
      this.right.parent = tempThis;
      tempThis.right = this.right;
      this.right = null;
    }
    // Create clone Parent
    if (
      this.parent !== null &&
      this.parent.right !== null &&
      this.parent.left === this
    ) {
      this.parent.right.parent = tempParent;
      tempParent.right = this.parent.right;
      this.parent.right = null;
    }
    if (
      this.parent !== null &&
      this.parent.left !== null &&
      this.parent.right === this
    ) {
      this.parent.left.parent = tempParent;
      tempParent.left = this.parent.left;
      this.parent.left = null;
    }
    if (
      this.parent !== null &&
      this.parent.parent !== null &&
      this.parent.parent.left === this.parent
    ) {
      this.parent.parent.left = tempParent;
      tempParent.parent = this.parent.parent;
      this.parent.parent = null;
    }
    if (
      this.parent !== null &&
      this.parent.parent !== null &&
      this.parent.parent.right === this.parent
    ) {
      this.parent.parent.right = tempParent;
      tempParent.parent = this.parent.parent;
      this.parent.parent = null;
    }
    // Change Parent and This
    if (this.parent !== null && this.parent.left === this) {
      this.parent.left = null;
      this.parent.parent = this;
      this.left = this.parent;
      this.parent = null;
      // Get information from clone This
      if (this.left !== null && tempThis.left !== null) {
        this.left.left = tempThis.left;
        this.left.left.parent = this.left;
        tempThis.left = null;
        if (tempThis.right !== null) {
          this.left.right = tempThis.right;
          this.left.right.parent = this.left;
          tempThis.right = null;
        }
      }
    }
    if (this.parent !== null && this.parent.right === this) {
      this.parent.right = null;
      this.parent.parent = this;
      this.right = this.parent;
      this.parent = null;
      if (this.right !== null && tempThis.left !== null) {
        this.right.left = tempThis.left;
        this.right.left.parent = this.right;
        tempThis.left = null;
        if (tempThis.right !== null) {
          this.right.right = tempThis.right;
          this.right.right.parent = this.right;
          tempThis.right = null;
        }
      }
    }
    // Get information from clone Parent
    this.parent = tempParent.parent;
    if (
      this.parent !== null &&
      this.parent.left !== null &&
      this.parent.left === tempParent
    ) {
      this.parent.left = this;
      tempParent.parent = null;
    }
    if (
      this.parent !== null &&
      this.parent.right !== null &&
      this.parent.right === tempParent
    ) {
      this.parent.right = this;
      tempParent.parent = null;
    }
    if (tempParent.right === null && tempParent.left !== null) {
      tempParent.left.parent = this;
      this.left = tempParent.left;
      tempParent.left = null;
    }
    if (tempParent.left === null && tempParent.right !== null) {
      tempParent.right.parent = this;
      this.right = tempParent.right;
      tempParent.right = null;
    }
  }
}

module.exports = Node;
