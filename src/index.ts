class LLNode {
	constructor(
		public next: LLNode | null,
		public data: any
	) {}
}

class LinkedList {
	size: number;
	head: LLNode;
	tail: LLNode;

	constructor(size?: number) {
		if (size <= 0) throw new Error("Can't have a list with, negative no size")
		if (size === 1) {
			// Size of one, circularly linked head element. 
			// This can still be a valid linked list
				this.head = new LLNode(null, "circular head");
				this.head.next = this.head;
				return;
		}

		this.createEnds();
		if (size > 1) {

			let tmpNode = new LLNode(null, 1);
			this.head.next = tmpNode;
			// Create middle nodes
			for (let i = 0; i < size - 1; ++i) {
				tmpNode.next = new LLNode(null, i + 2);
				tmpNode = tmpNode.next;
			}
			tmpNode.next = this.tail;


			// Link all nodes
			
			this.size = size;
		}
	}
	private checkBounds(index: number) {
		if (index < 0) throw new Error(`You've requested a negative position! This is a simple singly linked list`);
		else if (index > this.size + 1) 
			throw new Error(`
												You requested an element at position:${index}, 
												whereas the list is of size: ${this.size},
												and the tail of the list is at position ${this.size + 1}
			`);
	}
	private createEnds() {
		this.tail = new LLNode(null, "tail");
		this.head = new LLNode(this.tail, "head");
		this.size = 2;
	}
	printList() {
		console.log("--------------LinkedList--------------")
		for (let tmpNode = this.head; tmpNode.next !== null; tmpNode = tmpNode.next)
			console.log("Link Number: ", tmpNode.data, " ---> ", tmpNode.next.data);
	}
	getNodeAtIndex(index: number): LLNode {
		this.checkBounds(index);
		if (index === 0) return this.head;

		let tmpNode = this.head;
		for (let i = 0; i < index; tmpNode = tmpNode.next,++i);
		return tmpNode;

	}
	insertBeforeTail(data: any): LLNode {
		let tmpNode = this.getNodeAtIndex(this.size);
		tmpNode.next = new LLNode(this.tail, data);
		return tmpNode;
	}
	insertBeforeHead(data: any) : LLNode {
		let tmpNode = new LLNode(this.head.next, data);
		this.head.next = tmpNode;
		return tmpNode;
	}
	insertAt(data: any, index: number) : LLNode {
		this.checkBounds(index);
	
		let nodeAtIndex = this.getNodeAtIndex(index);
		let tmpNode = new LLNode(nodeAtIndex.next, data);
		nodeAtIndex.next = tmpNode;
		return tmpNode;
	}
}

// Testing the LinkedList
//let ll = new LinkedList();		// Create a list of 2 elements -- Works!
//let ll = new LinkedList(5);		// Create a list of 5 elements -- YES!
//let ll = new LinkedList(1);		// YES!
//ll.printList();
//let ll = new LinkedList(10);
//ll.insertBeforeTail("new data"); // YES!
//ll.insertBeforeHead("new data"); // YES!
//ll.insertAt("new data", 0);
//ll.insertAt("new data", 12);
//ll.printList();