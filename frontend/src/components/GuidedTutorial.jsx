import React, { useState, useEffect } from 'react';
import { Button } from './ui/common';
import { BookOpen, CheckCircle, Circle, ArrowRight, ArrowLeft, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Tutorial steps for each algorithm
const TUTORIALS = {
    bubble_sort: {
        title: "Bubble Sort Tutorial",
        steps: [
            {
                title: "Welcome to Bubble Sort!",
                content: "Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly comparing adjacent elements and swapping them if they're in the wrong order.",
                highlight: "description",
                checkpoint: "Do you understand what adjacent elements means?"
            },
            {
                title: "How It Works",
                content: "The algorithm makes multiple passes through the array. In each pass, the largest unsorted element 'bubbles up' to its correct position at the end.",
                highlight: "visualization",
                checkpoint: "Can you see how elements move in pairs?"
            },
            {
                title: "Watch the First Pass",
                content: "Click 'Visualize' and watch the first pass. Notice how the algorithm compares each pair of adjacent elements from left to right.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see elements being compared?"
            },
            {
                title: "Observe the Pattern",
                content: "Use the speed slider to slow down the animation. Watch how after each pass, one more element is in its final sorted position at the end.",
                highlight: "speed",
                checkpoint: "Can you identify which element is sorted after each pass?"
            },
            {
                title: "Time Complexity",
                content: "Bubble Sort has O(n²) time complexity because it needs nested loops. It's great for learning but not efficient for large datasets.",
                highlight: "complexity",
                checkpoint: "Do you understand why it's O(n²)?"
            }
        ]
    },
    merge_sort: {
        title: "Merge Sort Tutorial",
        steps: [
            {
                title: "Welcome to Merge Sort!",
                content: "Merge Sort is a divide-and-conquer algorithm. It splits the array into smaller pieces, sorts them, then merges them back together.",
                highlight: "description",
                checkpoint: "Do you understand the divide-and-conquer strategy?"
            },
            {
                title: "The Divide Phase",
                content: "First, the algorithm recursively divides the array into halves until each piece has only one element. Single elements are already sorted!",
                highlight: "visualization",
                checkpoint: "Can you visualize the splitting process?"
            },
            {
                title: "Watch the Visualization",
                content: "Click 'Visualize' and observe how the array splits. Use the step controls to move forward and backward through the process.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the array being divided?"
            },
            {
                title: "The Merge Phase",
                content: "After dividing, pairs of sorted subarrays are merged together in order. This is where the actual sorting happens!",
                highlight: "visualization",
                checkpoint: "Can you see how sorted pieces combine?"
            },
            {
                title: "Efficiency",
                content: "Merge Sort always runs in O(n log n) time, making it much faster than Bubble Sort for large datasets. The trade-off is it needs O(n) extra space.",
                highlight: "complexity",
                checkpoint: "Do you understand the time/space trade-off?"
            }
        ]
    },
    binary_search: {
        title: "Binary Search Tutorial",
        steps: [
            {
                title: "Welcome to Binary Search!",
                content: "Binary Search is incredibly fast but requires a SORTED array. It finds elements by repeatedly halving the search space.",
                highlight: "description",
                checkpoint: "Do you understand why the array must be sorted?"
            },
            {
                title: "The Middle Element",
                content: "The algorithm always checks the middle element first. If it's your target, done! If not, you can eliminate half the array.",
                highlight: "visualization",
                checkpoint: "Can you see the advantage of starting in the middle?"
            },
            {
                title: "Watch It Work",
                content: "Set a target value and click 'Visualize'. Watch how the search space shrinks by half with each comparison.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you observe the halving behavior?"
            },
            {
                title: "Left or Right?",
                content: "If the target is smaller than the middle, search the left half. If larger, search the right half. Simple decision, huge impact!",
                highlight: "visualization",
                checkpoint: "Can you predict which half will be searched?"
            },
            {
                title: "Logarithmic Speed",
                content: "O(log n) means doubling the array size only adds one more step. In an array of 1 million items, Binary Search finds any element in ~20 steps!",
                highlight: "complexity",
                checkpoint: "Do you appreciate how fast logarithmic time is?"
            }
        ]
    },
    infix_to_postfix: {
        title: "Infix to Postfix Conversion Tutorial",
        steps: [
            {
                title: "Welcome to Expression Conversion!",
                content: "This algorithm converts human-readable infix notation (A+B*C) to computer-friendly postfix notation (ABC*+) using a stack.",
                highlight: "description",
                checkpoint: "Do you understand the difference between infix and postfix?"
            },
            {
                title: "Operator Precedence",
                content: "Operators have different priorities: ^ (power) > * / (multiply/divide) > + - (add/subtract). The stack helps us maintain this order!",
                highlight: "visualization",
                checkpoint: "Can you rank operators by precedence?"
            },
            {
                title: "Watch the Conversion",
                content: "Click 'Visualize' and observe how operands (A,B,C) go directly to output, while operators are managed by the stack based on precedence.",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see how the stack handles operators?"
            },
            {
                title: "Parentheses Power",
                content: "Opening '(' gets pushed to stack. Closing ')' triggers popping all operators until we find the matching '('. This respects calculation order!",
                highlight: "visualization",
                checkpoint: "Can you see how parentheses control evaluation order?"
            },
            {
                title: "Why Postfix?",
                content: "Postfix notation is easier for computers to evaluate - no precedence rules or parentheses needed! Just scan left to right.",
                highlight: "complexity",
                checkpoint: "Do you see why compilers prefer postfix?"
            }
        ]
    },
    circular_queue: {
        title: "Circular Queue Tutorial",
        steps: [
            {
                title: "Welcome to Circular Queue!",
                content: "Unlike linear queues, circular queues reuse empty spaces by wrapping around. Perfect for efficient space utilization!",
                highlight: "description",
                checkpoint: "Do you understand the wraparound concept?"
            },
            {
                title: "The Circular Nature",
                content: "When rear reaches the end of the array, it wraps back to index 0 if there's space. Front and rear chase each other in a circle!",
                highlight: "visualization",
                checkpoint: "Can you visualize the circular behavior?"
            },
            {
                title: "Watch Enqueue & Dequeue",
                content: "Click 'Visualize' and see how elements are added at rear and removed from front. Notice the wraparound when rear reaches the end!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the wraparound happen?"
            },
            {
                title: "Full vs Empty",
                content: "We use a count variable to distinguish between full and empty states. Without it, front==rear could mean either!",
                highlight: "visualization",
                checkpoint: "Can you explain why we need the count variable?"
            },
            {
                title: "Real-World Usage",
                content: "Circular queues are used in OS task scheduling, buffering in keyboards, and anywhere efficient reuse of fixed-size buffers is needed!",
                highlight: "complexity",
                checkpoint: "Can you think of other applications?"
            }
        ]
    },
    avl_tree: {
        title: "AVL Tree (Self-Balancing) Tutorial",
        steps: [
            {
                title: "Welcome to AVL Trees!",
                content: "AVL trees are BSTs that automatically balance themselves after every insertion/deletion. This guarantees O(log n) search time!",
                highlight: "description",
                checkpoint: "Do you understand why balance matters?"
            },
            {
                title: "The Balance Factor",
                content: "For each node, Balance Factor = height(left) - height(right). AVL trees keep this between -1, 0, and +1. If it goes outside this range, we rotate!",
                highlight: "visualization",
                checkpoint: "Can you calculate balance factors in your head?"
            },
            {
                title: "Watch Self-Balancing",
                content: "Click 'Visualize' and insert 10, 20, 30. See how the tree detects imbalance and automatically performs a rotation to stay balanced!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the rotation happen?"
            },
            {
                title: "The Four Rotation Cases",
                content: "LL (Left-Left): Right rotate. RR (Right-Right): Left rotate. LR (Left-Right): Left then right. RL (Right-Left): Right then left.",
                highlight: "visualization",
                checkpoint: "Can you identify which case applies when?"
            },
            {
                title: "Guaranteed Performance",
                content: "Unlike regular BSTs that can degrade to O(n), AVL trees ALWAYS guarantee O(log n) for search, insert, and delete. The cost is more complex insertion logic.",
                highlight: "complexity",
                checkpoint: "Do you see the trade-off between simplicity and guaranteed performance?"
            }
        ]
    },
    heap_sort: {
        title: "Heap Sort Tutorial",
        steps: [
            {
                title: "Welcome to Heap Sort!",
                content: "Heap Sort uses a binary heap data structure to sort. It's in-place and always O(n log n) - no worst case like Quick Sort!",
                highlight: "description",
                checkpoint: "Do you know what a binary heap is?"
            },
            {
                title: "Building the Max Heap",
                content: "First, we rearrange the array into a max heap where each parent >= its children. This takes O(n) time using heapify from bottom up.",
                highlight: "visualization",
                checkpoint: "Can you visualize the heap structure?"
            },
            {
                title: "Watch the Heapify Process",
                content: "Click 'Visualize' and watch how the array transforms into a max heap. The largest element bubbles up to the root (index 0)!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see how the max element reaches the top?"
            },
            {
                title: "Extract and Sort",
                content: "Repeatedly: swap root (max) with last element, reduce heap size by 1, then heapify. Each extraction puts one more element in its final sorted position!",
                highlight: "visualization",
                checkpoint: "Can you see how the sorted portion grows from right to left?"
            },
            {
                title: "Why Use Heap Sort?",
                content: "Heap Sort guarantees O(n log n) in all cases, uses O(1) space, and is great when you need predictable performance without extra memory.",
                highlight: "complexity",
                checkpoint: "When would you choose Heap Sort over Quick Sort?"
            }
        ]
    },
    bst_insert: {
        title: "BST Insert Tutorial",
        steps: [
            {
                title: "Welcome to BST Insertion!",
                content: "Binary Search Trees maintain the property: left child < parent < right child. This makes searching fast - O(log n) in balanced trees!",
                highlight: "description",
                checkpoint: "Do you understand the BST property?"
            },
            {
                title: "The Recursive Journey",
                content: "To insert: start at root. If value < current, go left. If value > current, go right. When you reach NULL, create the new node!",
                highlight: "visualization",
                checkpoint: "Can you trace the path for inserting a value?"
            },
            {
                title: "Watch Insertion",
                content: "Click 'Visualize' and insert values like 50, 30, 70, 20. See how each value finds its place by comparing with existing nodes!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you observe the comparison decisions?"
            },
            {
                title: "Maintaining Order",
                content: "After insertion, an inorder traversal (left-root-right) always gives values in sorted order. This is the magic of BSTs!",
                highlight: "visualization",
                checkpoint: "Can you perform inorder traversal mentally?"
            },
            {
                title: "Performance Considerations",
                content: "Best case: O(log n) for balanced tree. Worst case: O(n) for skewed tree (inserting sorted data). This is why AVL/Red-Black trees exist!",
                highlight: "complexity",
                checkpoint: "Can you explain when BST degrades to O(n)?"
            }
        ]
    },
    bst_delete: {
        title: "BST Delete Tutorial",
        steps: [
            {
                title: "Welcome to BST Deletion!",
                content: "Deleting from a BST is trickier than insertion because we need to maintain the BST property after removal. There are 3 cases to handle!",
                highlight: "description",
                checkpoint: "Are you ready to learn the 3 deletion cases?"
            },
            {
                title: "Case 1: Leaf Node",
                content: "If the node has no children (it's a leaf), simply remove it. This is the easiest case - no restructuring needed!",
                highlight: "visualization",
                checkpoint: "Can you identify leaf nodes?"
            },
            {
                title: "Case 2: One Child",
                content: "If the node has one child, bypass it by connecting its parent directly to its child. The child takes the deleted node's place!",
                highlight: "visualization",
                checkpoint: "Do you see how we bypass the node?"
            },
            {
                title: "Case 3: Two Children",
                content: "The complex case! Find the inorder successor (smallest in right subtree), copy its value to the node being deleted, then delete the successor.",
                highlight: "visualization",
                checkpoint: "Can you find the inorder successor?"
            },
            {
                title: "Watch All Cases",
                content: "Click 'Visualize' and try deleting different nodes. Observe which case applies and how the tree restructures!",
                highlight: "controls",
                action: "run",
                checkpoint: "Can you predict which case applies before deletion?"
            }
        ]
    },
    towers_of_hanoi: {
        title: "Towers of Hanoi Tutorial",
        steps: [
            {
                title: "Welcome to Towers of Hanoi!",
                content: "This classic recursive puzzle involves moving disks from one peg to another, with the rule that no disk can be placed on a smaller disk.",
                highlight: "description",
                checkpoint: "Do you understand the disk size constraint?"
            },
            {
                title: "The Recursive Insight",
                content: "To move n disks from A to C: 1) Move n-1 disks from A to B, 2) Move disk n from A to C, 3) Move n-1 disks from B to C. Base case: 1 disk is easy!",
                highlight: "visualization",
                checkpoint: "Can you see how the problem breaks down?"
            },
            {
                title: "Watch the Magic",
                content: "Click 'Visualize' with 3 disks. Count the moves - it should be 2^n - 1. For 3 disks = 7 moves. For 64 disks = 18 quintillion years!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you count 7 moves for 3 disks?"
            },
            {
                title: "Auxiliary Peg Strategy",
                content: "The middle peg (B) acts as temporary storage. We can't go directly A→C because we need somewhere to put the smaller disks first!",
                highlight: "visualization",
                checkpoint: "Do you see why we need the auxiliary peg?"
            },
            {
                title: "Exponential Growth",
                content: "Time complexity is O(2^n). Each additional disk doubles the number of moves! This demonstrates how fast exponential functions grow.",
                highlight: "complexity",
                checkpoint: "Can you calculate moves for 4 disks?"
            }
        ]
    },
    dfs_graph: {
        title: "Depth-First Search Tutorial",
        steps: [
            {
                title: "Welcome to DFS!",
                content: "DFS explores a graph by going as deep as possible along each branch before backtracking. Think of it like exploring a maze by always taking the first unexplored path.",
                highlight: "description",
                checkpoint: "Can you visualize the 'go deep' strategy?"
            },
            {
                title: "Stack-Based Exploration",
                content: "DFS uses a stack (or recursion, which uses the call stack). Push starting node, pop and visit, push unvisited neighbors, repeat!",
                highlight: "visualization",
                checkpoint: "Do you see how LIFO (stack) creates depth-first behavior?"
            },
            {
                title: "Watch DFS Traverse",
                content: "Click 'Visualize' and watch DFS explore the graph. Notice how it commits to one path completely before backtracking to explore others!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the deep exploration before backtracking?"
            },
            {
                title: "Visited Tracking",
                content: "We mark nodes as visited to avoid infinite loops in cyclic graphs. Without this, we'd get stuck in cycles forever!",
                highlight: "visualization",
                checkpoint: "Can you explain why visited tracking is crucial?"
            },
            {
                title: "DFS Applications",
                content: "DFS is used for: finding connected components, topological sorting, cycle detection, pathfinding in mazes, and solving puzzles. O(V+E) time complexity!",
                highlight: "complexity",
                checkpoint: "Can you think of a problem where DFS is ideal?"
            }
        ]
    },
    open_hashing: {
        title: "Open Hashing (Chaining) Tutorial",
        steps: [
            {
                title: "Welcome to Hash Tables!",
                content: "Hash tables provide O(1) average-case lookup by mapping keys to array indices using a hash function. Open hashing handles collisions with linked lists!",
                highlight: "description",
                checkpoint: "Do you understand the hash function concept?"
            },
            {
                title: "The Hash Function",
                content: "A hash function takes a key and produces an index: hash(key) = key % table_size. Same key always gives same index, but different keys might collide!",
                highlight: "visualization",
                checkpoint: "Can you calculate hash(23) for table size 10?"
            },
            {
                title: "Collision Resolution",
                content: "When two keys hash to the same index, open hashing chains them in a linked list at that index. Each bucket can store multiple values!",
                highlight: "visualization",
                checkpoint: "Can you visualize the chains growing?"
            },
            {
                title: "Watch Insertions",
                content: "Click 'Visualize' and insert values. Watch how some go to empty buckets while others chain with existing values. Observe collision handling!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see collisions being resolved with chains?"
            },
            {
                title: "Performance Analysis",
                content: "Average case: O(1). Worst case: O(n) if all keys hash to same bucket. Load factor (n/table_size) should stay below 1 for good performance!",
                highlight: "complexity",
                checkpoint: "Do you see why load factor matters?"
            }
        ]
    },
    // Stack Algorithms
    stack_ll: {
        title: "Stack using Linked List Tutorial",
        steps: [
            {
                title: "Welcome to Stack!",
                content: "A stack is a LIFO (Last In, First Out) data structure. Think of a stack of plates - you can only add or remove from the top!",
                highlight: "description",
                checkpoint: "Can you think of real-world LIFO examples?"
            },
            {
                title: "Push Operation",
                content: "Push adds an element to the top of the stack. Using a linked list, we insert at the head (O(1) time). The new node becomes the new top!",
                highlight: "visualization",
                checkpoint: "Do you see why head insertion is O(1)?"
            },
            {
                title: "Watch Push Operations",
                content: "Click 'Visualize' and watch elements being pushed. Notice how each new element becomes the top and the stack grows upward!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you observe the LIFO order?"
            },
            {
                title: "Pop Operation",
                content: "Pop removes and returns the top element. We simply move the head pointer to the next node and free the old top. Also O(1)!",
                highlight: "visualization",
                checkpoint: "Can you trace what happens to pointers during pop?"
            },
            {
                title: "Applications",
                content: "Stacks are used in: function call management (call stack), undo/redo features, expression evaluation, backtracking algorithms, and browser history!",
                highlight: "complexity",
                checkpoint: "Can you explain how browser's back button uses a stack?"
            }
        ]
    },
    valid_parentheses: {
        title: "Valid Parentheses Tutorial",
        steps: [
            {
                title: "The Matching Problem",
                content: "Given a string with brackets like '({[]})', we need to check if every opening bracket has a matching closing bracket in the right order. Stacks are perfect for this!",
                highlight: "description",
                checkpoint: "Do you see why order matters?"
            },
            {
                title: "The Stack Strategy",
                content: "For each character: if it's an opening bracket (, [, or {, push it. If it's a closing bracket, pop and check if it matches. Stack ensures correct nesting!",
                highlight: "visualization",
                checkpoint: "Can you trace through '([])'?"
            },
            {
                title: "Watch the Algorithm",
                content: "Click 'Visualize' and see how opening brackets go into the stack, and closing brackets pop for matching. Invalid strings leave stack non-empty or cause mismatch!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see how mismatches are detected?"
            },
            {
                title: "Edge Cases",
                content: "Remember to check: 1) Stack shouldn't be empty when popping, 2) Brackets must match type (not ')' matching '['), 3) Stack must be empty at the end!",
                highlight: "visualization",
                checkpoint: "Can you identify what makes '([)]' invalid?"
            },
            {
                title: "Real-World Usage",
                content: "This algorithm validates code syntax in compilers, checks HTML/XML tags, and verifies mathematical expressions. O(n) time and space!",
                highlight: "complexity",
                checkpoint: "Why is this important for programming languages?"
            }
        ]
    },
    postfix_evaluation: {
        title: "Postfix Expression Evaluation Tutorial",
        steps: [
            {
                title: "What is Postfix?",
                content: "Postfix (Reverse Polish) notation writes operators after operands: 'AB+' instead of 'A+B'. It eliminates the need for parentheses and operator precedence!",
                highlight: "description",
                checkpoint: "Can you convert '3+4' to postfix?"
            },
            {
                title: "The Evaluation Algorithm",
                content: "Scan left to right. If you see a number, push it. If you see an operator, pop two numbers, apply the operation, push the result. Simple!",
                highlight: "visualization",
                checkpoint: "Can you trace '34+' mentally?"
            },
            {
                title: "Watch Step-by-Step",
                content: "Click 'Visualize' with expression like '53+82-*'. Watch how numbers stack up, operators pop two values, compute, and push result back!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the push-pop-push pattern?"
            },
            {
                title: "Order Matters!",
                content: "When popping for subtraction/division, order is crucial: second_pop - first_pop (not the reverse!). The stack naturally handles this correctly.",
                highlight: "visualization",
                checkpoint: "Can you explain why '52-' gives 3, not -3?"
            },
            {
                title: "Why Use Postfix?",
                content: "Compilers love postfix because it's trivial to evaluate - just one linear scan with a stack. No parsing precedence or parentheses! O(n) time complexity.",
                highlight: "complexity",
                checkpoint: "Do you see why calculators use postfix internally?"
            }
        ]
    },
    infix_to_prefix: {
        title: "Infix to Prefix Conversion Tutorial",
        steps: [
            {
                title: "What is Prefix Notation?",
                content: "Prefix notation writes operators before operands: '+AB' instead of 'A+B'. Like postfix, it eliminates parentheses. Also called Polish Notation!",
                highlight: "description",
                checkpoint: "Can you see the difference from postfix?"
            },
            {
                title: "The Clever Trick",
                content: "To convert infix to prefix: 1) Reverse the infix expression, 2) Swap ( and ), 3) Convert to postfix, 4) Reverse the result. Four simple steps!",
                highlight: "visualization",
                checkpoint: "Can you trace why this works?"
            },
            {
                title: "Watch the Transformation",
                content: "Click 'Visualize' with 'A+B*C'. See how it becomes 'C*B+A', then converts to postfix 'CB*A+', then reverses to '+A*BC'. Magic!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you follow all four steps?"
            },
            {
                title: "Handling Precedence",
                content: "During the postfix conversion step (step 3), operator precedence is handled the same way as infix→postfix, but with reversed input!",
                highlight: "visualization",
                checkpoint: "Do precedence rules still apply?"
            },
            {
                title: "Prefix Applications",
                content: "Prefix is used in LISP programming language and some calculators. Evaluation is similar to postfix but scan right-to-left. O(n) conversion time!",
                highlight: "complexity",
                checkpoint: "Can you evaluate '+34' mentally?"
            }
        ]
    },
    // Queue Algorithms
    queue_ll: {
        title: "Queue using Linked List Tutorial",
        steps: [
            {
                title: "Welcome to Queue!",
                content: "A queue is a FIFO (First In, First Out) data structure. Like a line at a store - first person in line is served first. Front and rear pointers manage it!",
                highlight: "description",
                checkpoint: "Can you name a real-world queue example?"
            },
            {
                title: "Enqueue Operation",
                content: "Enqueue adds an element to the rear of the queue. Using linked list, we insert at the tail. The rear pointer moves to the new node. O(1) time!",
                highlight: "visualization",
                checkpoint: "Why do we add at rear, not front?"
            },
            {
                title: "Watch Enqueue",
                content: "Click 'Visualize' and enqueue several elements. Notice how each new element joins the back of the line, and rear pointer moves forward!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the queue growing from rear?"
            },
            {
                title: "Dequeue Operation",
                content: "Dequeue removes from the front. We return the front element, move front pointer to next node, and free the old front. Also O(1)!",
                highlight: "visualization",
                checkpoint: "Can you explain why we remove from front?"
            },
            {
                title: "Queue Applications",
                content: "Queues are used in: CPU task scheduling, printer job management, BFS graph traversal, handling requests in web servers, and message passing systems!",
                highlight: "complexity",
                checkpoint: "Which OS component uses queues heavily?"
            }
        ]
    },
    deque_ll: {
        title: "Deque (Double-Ended Queue) Tutorial",
        steps: [
            {
                title: "Welcome to Deque!",
                content: "Deque (deck) is a queue where you can add/remove from BOTH ends! It's more flexible than regular queues and stacks. Doubly linked list is perfect for this.",
                highlight: "description",
                checkpoint: "Can you see how deque combines stack and queue?"
            },
            {
                title: "Four Core Operations",
                content: "1) addFront: insert at front, 2) addRear: insert at rear, 3) deleteFront: remove from front, 4) deleteRear: remove from rear. All O(1)!",
                highlight: "visualization",
                checkpoint: "Which data structure can't do all four in O(1)?"
            },
            {
                title: "Watch Both-Ended Operations",
                content: "Click 'Visualize' and try operations from both ends. Notice how the doubly linked list allows efficient insertion/deletion anywhere!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see operations from both ends?"
            },
            {
                title: "Why Doubly Linked?",
                content: "Doubly linked list has prev and next pointers. This allows O(1) deletion from rear (impossible with singly linked list without tail traverse)!",
                highlight: "visualization",
                checkpoint: "Can you explain why singly linked list struggles with deleteRear?"
            },
            {
                title: "Deque Applications",
                content: "Used in: browser history (forward/back), undo/redo with multi-level, sliding window algorithms, job scheduling with priorities, palindrome checking!",
                highlight: "complexity",
                checkpoint: "How would you check palindrome with deque?"
            }
        ]
    },
    message_queue: {
        title: "Message Queue Application Tutorial",
        steps: [
            {
                title: "Real-World Queue Usage",
                content: "Message queues are used in chat apps, notification systems, and distributed systems. They ensure messages are processed in order - FIFO principle!",
                highlight: "description",
                checkpoint: "Can you think of apps that need message ordering?"
            },
            {
                title: "Circular Queue Implementation",
                content: "This uses a circular queue to efficiently manage fixed-size message buffer. When rear reaches the end, it wraps to index 0, reusing space!",
                highlight: "visualization",
                checkpoint: "Why circular instead of linear queue?"
            },
            {
                title: "Watch Message Flow",
                content: "Click 'Visualize' and watch messages being sent and received. Notice how old messages are dequeued as new ones arrive, simulating a real chat!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the wraparound behavior?"
            },
            {
                title: "Buffer Management",
                content: "The circular nature prevents wasted space. In linear queues, dequeue leaves gaps. Circular queues reuse those gaps by wrapping around!",
                highlight: "visualization",
                checkpoint: "Can you spot when wraparound occurs?"
            },
            {
                title: "Production Systems",
                content: "Real message queues (RabbitMQ, Kafka) use similar concepts but add: persistence, multiple consumers, priority handling, and distributed operation!",
                highlight: "complexity",
                checkpoint: "What happens if queue fills up?"
            }
        ]
    },
    // Array Algorithms
    two_sum: {
        title: "Two Sum Problem Tutorial",
        steps: [
            {
                title: "The Classic Interview Problem!",
                content: "Given an array and a target, find two numbers that add up to the target. This is THE most common coding interview question. Let's master it!",
                highlight: "description",
                checkpoint: "Can you solve it with brute force?"
            },
            {
                title: "Hash Map Strategy",
                content: "For each number, check if (target - number) exists in hash map. If yes, we found the pair! If no, add current number to map. One pass, O(n) time!",
                highlight: "visualization",
                checkpoint: "Why is hash map lookup O(1)?"
            },
            {
                title: "Watch the Algorithm",
                content: "Click 'Visualize' with array [2,7,11,15] and target 9. Watch how when we see 7, we check for (9-7=2) in the map and find it!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the complement lookup?"
            },
            {
                title: "The Complement Concept",
                content: "The key insight: instead of checking all pairs, we store what we've seen and check if the 'complement' (target - current) was seen before. Brilliant!",
                highlight: "visualization",
                checkpoint: "Can you calculate complements for target=10?"
            },
            {
                title: "Trade-off Analysis",
                content: "Brute force: O(n²) time, O(1) space. Hash map: O(n) time, O(n) space. We trade space for speed - a common algorithmic pattern!",
                highlight: "complexity",
                checkpoint: "When would you prefer brute force?"
            }
        ]
    },
    three_sum: {
        title: "Three Sum Problem Tutorial",
        steps: [
            {
                title: "The 3-Number Challenge",
                content: "Find all unique triplets in an array that sum to zero. This extends Two Sum but requires handling duplicates and finding ALL solutions, not just one!",
                highlight: "description",
                checkpoint: "How is this harder than Two Sum?"
            },
            {
                title: "Sort + Two Pointer Approach",
                content: "First, sort the array. Then: fix one number, use two pointers (left, right) to find pairs that complete the triplet. Sorting enables duplicate skipping!",
                highlight: "visualization",
                checkpoint: "Why does sorting help?"
            },
            {
                title: "Watch the Algorithm",
                content: "Click 'Visualize' with array [-1,0,1,2,-1,-4]. See how we fix -1, then use pointers to find [0,1] that sum to 1, giving triplet [-1,0,1]!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the pointer movements?"
            },
            {
                title: "Handling Duplicates",
                content: "After finding a triplet, skip duplicate values by advancing pointers past repeated numbers. This ensures unique triplets only! Critical detail.",
                highlight: "visualization",
                checkpoint: "What happens if we don't skip duplicates?"
            },
            {
                title: "Complexity Analysis",
                content: "O(n²) time: O(n log n) for sorting + O(n²) for nested loops (outer fixes number, inner uses two pointers). O(1) extra space if we don't count output!",
                highlight: "complexity",
                checkpoint: "Can you beat O(n²) time?"
            }
        ]
    },
    longest_substring: {
        title: "Longest Substring Without Repeating Characters Tutorial",
        steps: [
            {
                title: "The Sliding Window Problem",
                content: "Find the length of the longest substring without repeating characters in a string. This is a classic sliding window problem with hash map tracking!",
                highlight: "description",
                checkpoint: "Can you think of an example string?"
            },
            {
                title: "The Window Concept",
                content: "We maintain a window [left, right] that contains no duplicates. Expand right to grow window. When duplicate found, shrink from left until it's removed!",
                highlight: "visualization",
                checkpoint: "Can you visualize the expanding/shrinking window?"
            },
            {
                title: "Watch the Sliding Window",
                content: "Click 'Visualize' with string 'abcabcbb'. Watch the window grow to 'abc' (length 3), then shrink when second 'a' appears, maintaining no duplicates!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the window adjust?"
            },
            {
                title: "Hash Map for Tracking",
                content: "We use a hash map to store last seen index of each character. When we see a character we've seen before, we know where to move left pointer to!",
                highlight: "visualization",
                checkpoint: "Why store index, not just boolean?"
            },
            {
                title: "Linear Time Solution",
                content: "O(n) time because each character is visited at most twice (once by right, once by left). O(min(n, m)) space where m is charset size (26 for lowercase).",
                highlight: "complexity",
                checkpoint: "Why is each character visited at most twice?"
            }
        ]
    },
    bst_search: {
        title: "BST Search Tutorial",
        steps: [
            {
                title: "Searching in Binary Search Tree",
                content: "BSTs maintain order: left < parent < right. This makes searching efficient - at each node, we know which subtree must contain our target!",
                highlight: "description",
                checkpoint: "How is BST different from binary tree?"
            },
            {
                title: "The Decision Process",
                content: "At each node: if value equals target, found! If target < value, go left. If target > value, go right. We eliminate half the remaining tree each time!",
                highlight: "visualization",
                checkpoint: "Sounds familiar? Like binary search?"
            },
            {
                title: "Watch the Search",
                content: "Click 'Visualize' searching for a value. Notice how the algorithm traverses down the tree, making binary decisions at each node. Very efficient!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the path taken?"
            },
            {
                title: "Balanced vs Skewed",
                content: "In balanced BST: O(log n) search - height is log n. In skewed BST (essentially a linked list): O(n) search. Balance matters tremendously!",
                highlight: "visualization",
                checkpoint: "Can you visualize a completely skewed BST?"
            },
            {
                title: "BST vs Binary Search Array",
                content: "Both are O(log n) search, but BST allows O(log n) insertion/deletion too! Arrays need O(n) for insertions. This is BST's killer advantage!",
                highlight: "complexity",
                checkpoint: "When would you use array over BST?"
            }
        ]
    },
    // New Sem 4 Tutorials
    quick_sort: {
        title: "Quick Sort Tutorial",
        steps: [
            {
                title: "Welcome to Quick Sort!",
                content: "Quick Sort is a divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it. Elements smaller go left, larger go right!",
                highlight: "description",
                checkpoint: "Do you understand the pivot concept?"
            },
            {
                title: "The Partition Step",
                content: "Partition rearranges the array so all elements < pivot are on its left, all elements > pivot are on its right. The pivot ends up in its final sorted position!",
                highlight: "visualization",
                checkpoint: "Can you trace the partition of [3,6,8,10,1,2,1]?"
            },
            {
                title: "Watch the Partition",
                content: "Click 'Visualize' and observe how the pivot is placed at the correct position, and then Quick Sort is recursively applied to the two sub-arrays!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see where the pivot landed?"
            },
            {
                title: "Recursion on Sub-arrays",
                content: "After partition, the pivot is fixed. Quick Sort is called on the left sub-array and right sub-array. Base case: arrays of size 0 or 1 are already sorted!",
                highlight: "visualization",
                checkpoint: "Can you see how the recursion tree looks?"
            },
            {
                title: "Complexity & Pivot Choice",
                content: "Average case: O(n log n). Worst case: O(n²) if always picking smallest/largest as pivot (sorted array). Randomized pivot selection avoids this!",
                highlight: "complexity",
                checkpoint: "Why is random pivot selection important?"
            }
        ]
    },
    knapsack_01: {
        title: "0/1 Knapsack Problem Tutorial",
        steps: [
            {
                title: "The Classic DP Problem!",
                content: "Given items with weights and values, and a knapsack with weight capacity W, select items to maximize total value without exceeding capacity. Each item can only be taken once (0 or 1)!",
                highlight: "description",
                checkpoint: "Why can't we use a greedy approach here?"
            },
            {
                title: "The DP Table",
                content: "Build a 2D table dp[i][w] = max value using first i items with weight capacity w. For each item: either exclude it (take dp[i-1][w]) or include it (take value[i] + dp[i-1][w-weight[i]])!",
                highlight: "visualization",
                checkpoint: "Can you see the optimal substructure?"
            },
            {
                title: "Watch Table Construction",
                content: "Click 'Visualize' and watch the DP table fill up row by row. Each cell represents the best value achievable with the current item set and capacity!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see how each row builds on the previous?"
            },
            {
                title: "The Decision Rule",
                content: "dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]]) if weight[i] <= w, else dp[i-1][w]. The key: we only include an item if it improves the solution!",
                highlight: "visualization",
                checkpoint: "Can you apply the rule for an item of weight 3 and value 5?"
            },
            {
                title: "Backtracking the Solution",
                content: "The answer is dp[n][W]. To find WHICH items to include: trace back from dp[n][W]. If dp[i][w] != dp[i-1][w], item i was included! O(nW) time and space.",
                highlight: "complexity",
                checkpoint: "Can you trace back which items were selected?"
            }
        ]
    },
    horspool_algorithm: {
        title: "Horspool String Matching Tutorial",
        steps: [
            {
                title: "Welcome to Horspool's Algorithm!",
                content: "Horspool's algorithm is an improved string matching method. Instead of shifting the pattern by 1 every time a mismatch occurs, it uses a shift table to jump further!",
                highlight: "description",
                checkpoint: "What is the problem with naive string matching?"
            },
            {
                title: "The Bad Character Shift Table",
                content: "Preprocess the pattern to build a shift table: for each character c, shift[c] = distance from c's rightmost occurrence in the pattern (excluding the last) to the end. Default shift = pattern length!",
                highlight: "visualization",
                checkpoint: "Can you compute the shift table for pattern 'BARBER'?"
            },
            {
                title: "Watch the Algorithm",
                content: "Click 'Visualize'. Notice how the algorithm aligns pattern's right end with text, compares right-to-left, and when a mismatch occurs, jumps using the shift table instead of just 1!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you observe the larger shifts compared to naive search?"
            },
            {
                title: "Why It's Faster",
                content: "By using the shift table, Horspool often skips large portions of the text. Best case: O(n/m) — it examines only 1 in m characters! Average case far better than O(nm).",
                highlight: "visualization",
                checkpoint: "When would Horspool perform similarly to naive search?"
            },
            {
                title: "Complexity Summary",
                content: "Preprocessing: O(m + |Σ|) where m is pattern length and Σ is alphabet size. Search: O(nm) worst case but O(n/m) best/average case. Great for long patterns!",
                highlight: "complexity",
                checkpoint: "How does Horspool compare to KMP algorithm?"
            }
        ]
    },
    boyer_moore_algorithm: {
        title: "Boyer-Moore String Matching Tutorial",
        steps: [
            {
                title: "The Most Efficient Matcher!",
                content: "Boyer-Moore is one of the most efficient string search algorithms in practice. It uses two heuristics — Bad Character and Good Suffix — to skip as much text as possible!",
                highlight: "description",
                checkpoint: "What two heuristics does Boyer-Moore use?"
            },
            {
                title: "Bad Character Heuristic",
                content: "When a mismatch occurs at text character T[i], shift the pattern right so the rightmost occurrence of T[i] in the pattern aligns with T[i]. If T[i] not in pattern, shift past the whole mismatch!",
                highlight: "visualization",
                checkpoint: "Can you see how this is similar to Horspool?"
            },
            {
                title: "Watch Boyer-Moore Work",
                content: "Click 'Visualize' and observe how comparisons happen right-to-left, and mismatches trigger potentially large jumps based on the precomputed shift tables!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the right-to-left comparison order?"
            },
            {
                title: "Good Suffix Heuristic",
                content: "When a suffix of the pattern matches but then fails, shift so the next occurrence of that suffix in the pattern aligns with what we already matched. Maximizes skipping!",
                highlight: "visualization",
                checkpoint: "Can you visualize why the good suffix shift works?"
            },
            {
                title: "Sub-linear Performance",
                content: "Boyer-Moore achieves O(n/m) best case — it can find patterns in sub-linear time! Worst case O(nm) but average case is excellent. Used in grep, text editors, bioinformatics.",
                highlight: "complexity",
                checkpoint: "Why is Boyer-Moore the preferred choice in practice?"
            }
        ]
    },
    heapify: {
        title: "Heapify Tutorial",
        steps: [
            {
                title: "Welcome to Heapify!",
                content: "Heapify restores the heap property for a node. Given that both children's subtrees are valid heaps, heapify ensures the root satisfies the heap property too!",
                highlight: "description",
                checkpoint: "What is the max-heap property?"
            },
            {
                title: "The Three-Node Comparison",
                content: "Compare root with left child (2i+1) and right child (2i+2). If root is not the largest, swap it with the largest child. Then recursively heapify the affected subtree!",
                highlight: "visualization",
                checkpoint: "Can you identify left and right child indices for node at index 3?"
            },
            {
                title: "Watch Heapify in Action",
                content: "Click 'Visualize' with a tree that violates the heap property. Watch the algorithm compare parent with children and bubble the correct value up to maintain max-heap order!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see which element was swapped?"
            },
            {
                title: "Building a Heap",
                content: "To build a heap from scratch, call heapify on all internal nodes from bottom up (from n/2-1 to 0). This takes O(n) time — better than inserting one by one (O(n log n))!",
                highlight: "visualization",
                checkpoint: "Why start from n/2-1 and not from the root?"
            },
            {
                title: "Complexity",
                content: "Single heapify call: O(log n) — it traverses one path from root to leaf. Building entire heap: O(n). Used in Heap Sort, Priority Queues, Dijkstra's algorithm!",
                highlight: "complexity",
                checkpoint: "Why is building a heap O(n) and not O(n log n)?"
            }
        ]
    },
    topological_sort: {
        title: "Topological Sort Tutorial",
        steps: [
            {
                title: "Ordering Dependencies!",
                content: "Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u→v, u comes before v. Think of it as scheduling tasks with dependencies!",
                highlight: "description",
                checkpoint: "Can you think of a real dependency system?"
            },
            {
                title: "Kahn's Algorithm (BFS Approach)",
                content: "1) Calculate in-degrees of all nodes. 2) Add all nodes with in-degree 0 to queue. 3) Dequeue a node, add to result, reduce neighbors' in-degrees. 4) If in-degree becomes 0, enqueue it!",
                highlight: "visualization",
                checkpoint: "What does in-degree represent?"
            },
            {
                title: "Watch the Ordering",
                content: "Click 'Visualize' and observe how nodes with no remaining dependencies are processed first. The queue always holds the 'ready' nodes — those with no unfulfilled prerequisites!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see how in-degrees decreased?"
            },
            {
                title: "Cycle Detection",
                content: "If after processing all nodes, some nodes remain unprocessed (result.length < V), the graph has a cycle! Topological sort is only possible on DAGs (Directed Acyclic Graphs).",
                highlight: "visualization",
                checkpoint: "Why does a cycle make topological sort impossible?"
            },
            {
                title: "Applications",
                content: "Used in: build systems (make, webpack), task scheduling, course prerequisite ordering, package dependency resolution (npm), spreadsheet formula evaluation. O(V+E) time!",
                highlight: "complexity",
                checkpoint: "Which tools in your daily workflow use topological sort?"
            }
        ]
    },
    dijkstra_algorithm: {
        title: "Dijkstra's Shortest Path Tutorial",
        steps: [
            {
                title: "The Shortest Path Problem!",
                content: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph (non-negative weights). It's the GPS navigation algorithm!",
                highlight: "description",
                checkpoint: "What makes this problem hard?"
            },
            {
                title: "Greedy Strategy with Priority Queue",
                content: "Key idea: always process the closest unvisited vertex next. Use a min-priority queue to always get the vertex with smallest tentative distance. Update neighbors if we found a shorter path!",
                highlight: "visualization",
                checkpoint: "Why do we process the closest vertex first?"
            },
            {
                title: "Watch Dijkstra Explore",
                content: "Click 'Visualize'. The algorithm starts at source (distance 0), explores neighbors, and updates distances. Watch how the 'frontier' expands outward like ripples in water!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the frontier expansion pattern?"
            },
            {
                title: "Relaxation Step",
                content: "For each neighbor v of current node u: if dist[u] + weight(u,v) < dist[v], update dist[v]. This 'relaxation' always improves our best known distance to v!",
                highlight: "visualization",
                checkpoint: "Can you manually relax edges from node 0 to its neighbors?"
            },
            {
                title: "Complexity & Limitations",
                content: "With binary heap: O((V+E) log V). Doesn't work with negative weights (use Bellman-Ford instead). Applications: GPS, network routing protocols (OSPF), social networks!",
                highlight: "complexity",
                checkpoint: "Why does Dijkstra fail with negative weights?"
            }
        ]
    },
    prim_algorithm: {
        title: "Prim's MST Algorithm Tutorial",
        steps: [
            {
                title: "Minimum Spanning Tree!",
                content: "A Minimum Spanning Tree (MST) connects all vertices with minimum total edge weight, using exactly V-1 edges. Prim's algorithm builds it greedily, one edge at a time!",
                highlight: "description",
                checkpoint: "What is the difference between MST and shortest path?"
            },
            {
                title: "Growing the Tree",
                content: "Start with any vertex. At each step, add the cheapest edge that connects a vertex IN the tree to a vertex NOT yet in the tree. This greedy choice always leads to MST!",
                highlight: "visualization",
                checkpoint: "Why does the greedy choice work here?"
            },
            {
                title: "Watch Prim's Algorithm",
                content: "Click 'Visualize' and watch the MST grow edge by edge. The algorithm always picks the minimum weight edge connecting the current tree to a new vertex. No cycles possible!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the tree grow while avoiding cycles?"
            },
            {
                title: "Key Array",
                content: "key[v] stores the minimum weight edge connecting v to the current MST. parent[v] stores which tree vertex v is connected to. Update these as we add new vertices to MST!",
                highlight: "visualization",
                checkpoint: "What happens to key[] when we add a new vertex to MST?"
            },
            {
                title: "Complexity & Applications",
                content: "O(V² with adjacency matrix, O(E log V) with binary heap. Applications: network design (minimum cable), cluster analysis, approximate TSP, circuit design!",
                highlight: "complexity",
                checkpoint: "How is Prim's different from Kruskal's MST algorithm?"
            }
        ]
    },
    huffman_coding: {
        title: "Huffman Coding Tutorial",
        steps: [
            {
                title: "Lossless Data Compression!",
                content: "Huffman coding is a greedy algorithm for lossless data compression. Frequent characters get shorter codes, rare characters get longer codes. Result: smaller file size!",
                highlight: "description",
                checkpoint: "Why should frequent characters have shorter codes?"
            },
            {
                title: "Building the Frequency Table",
                content: "First, count how many times each character appears. Then create leaf nodes for each character. The character with highest frequency should eventually get the shortest code!",
                highlight: "visualization",
                checkpoint: "In 'abracadabra', which character is most frequent?"
            },
            {
                title: "Watch Huffman Tree Build",
                content: "Click 'Visualize'. The algorithm repeatedly merges the two nodes with smallest frequencies into a parent node. This builds a binary tree — the Huffman tree!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the two-smallest merge pattern?"
            },
            {
                title: "Generating Codes",
                content: "Traverse the Huffman tree: going left = 0, going right = 1. Each character's code is its path from root to leaf. Prefix-free property: no code is prefix of another!",
                highlight: "visualization",
                checkpoint: "Can you generate codes for a small Huffman tree?"
            },
            {
                title: "Compression Ratio",
                content: "Huffman coding guarantees optimal prefix-free encoding. Used in: JPEG, MP3, ZIP, gzip. O(n log n) to build tree. Can reduce file size by 20-90% depending on content!",
                highlight: "complexity",
                checkpoint: "What type of data compresses best with Huffman?"
            }
        ]
    },
    presorting: {
        title: "Presorting (Transform & Conquer) Tutorial",
        steps: [
            {
                title: "Sort First, Then Solve!",
                content: "Presorting is a transform-and-conquer technique: sort the input first, then the actual problem becomes trivially easy. Many O(n²) problems become O(n log n) this way!",
                highlight: "description",
                checkpoint: "Can you think of a problem that becomes easy after sorting?"
            },
            {
                title: "Finding Duplicates Example",
                content: "Brute force duplicate check: O(n²) — compare every pair. With presorting: sort in O(n log n), then scan once in O(n) comparing adjacent elements. Total: O(n log n)!",
                highlight: "visualization",
                checkpoint: "Why do duplicates appear adjacent after sorting?"
            },
            {
                title: "Watch Presorting Work",
                content: "Click 'Visualize' and observe: first the array is sorted, then a single linear scan finds duplicates by checking if arr[i] == arr[i+1]. Simple and efficient!",
                highlight: "controls",
                action: "run",
                checkpoint: "Did you see the two-phase approach?"
            },
            {
                title: "Other Applications",
                content: "Presorting enables: finding median in O(n log n), binary search after sorting, closest pair of points, element uniqueness checks, and many more problems!",
                highlight: "visualization",
                checkpoint: "What other problems can presorting simplify?"
            },
            {
                title: "The Trade-off",
                content: "Presorting modifies original data order. It's O(n log n) minimum (comparison-based sorting lower bound). Use when multiple queries on same data — amortize sorting cost!",
                highlight: "complexity",
                checkpoint: "When is it NOT worth presorting the data?"
            }
        ]
    }
};

export function GuidedTutorial({ algorithm, onClose, onAction }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [showCheckpoint, setShowCheckpoint] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const isDark = theme === 'dark';
    const tutorial = TUTORIALS[algorithm?.id];

    if (!tutorial) return null;

    const currentStepData = tutorial.steps[currentStep];
    const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

    const handleNext = () => {
        if (currentStepData.action && onAction) {
            onAction(currentStepData.action);
        }
        if (currentStep < tutorial.steps.length - 1) {
            setCompletedSteps(new Set([...completedSteps, currentStep]));
            setCurrentStep(currentStep + 1);
            setShowCheckpoint(false);
        } else {
            // Tutorial complete
            setCompletedSteps(new Set([...completedSteps, currentStep]));
            setShowCheckpoint(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setShowCheckpoint(false);
        }
    };

    const handleCheckpoint = (understood) => {
        if (understood) {
            handleNext();
        } else {
            setShowCheckpoint(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                role="dialog"
                aria-labelledby="tutorial-title"
                aria-modal="true"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={`w-full transition-all duration-300 rounded-2xl shadow-2xl flex flex-col ${
                        isMaximized 
                            ? 'max-w-[95vw] h-[90vh] mx-4' 
                            : 'max-w-2xl mx-4'
                    } ${
                        isDark ? 'bg-[var(--color-bg-secondary)]' : 'bg-white'
                    } border border-[var(--color-border)]`}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-[var(--color-accent-primary)]" size={24} />
                            <h2 id="tutorial-title" className="text-xl font-bold text-[var(--color-text-primary)]">
                                {tutorial.title}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsMaximized(!isMaximized)}
                                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                                title={isMaximized ? "Restore size" : "Maximize window"}
                                aria-label={isMaximized ? "Restore size" : "Maximize window"}
                            >
                                {isMaximized ? <Minimize2 size={20} className="text-[var(--color-text-secondary)]" /> : <Maximize2 size={20} className="text-[var(--color-text-secondary)]" />}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                                aria-label="Close tutorial"
                            >
                                <X size={20} className="text-[var(--color-text-secondary)]" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-6 pt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-[var(--color-text-secondary)]">
                                Step {currentStep + 1} of {tutorial.steps.length}
                            </span>
                        </div>
                        <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 overflow-y-auto">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                                {currentStepData.title}
                            </h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                {currentStepData.content}
                            </p>

                            {/* Checkpoint Question */}
                            {currentStepData.checkpoint && showCheckpoint && (
                                <div className={`p-4 rounded-lg border-2 ${
                                    isDark ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-300'
                                }`}>
                                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                                        ✓ Checkpoint: {currentStepData.checkpoint}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="primary"
                                            onClick={() => handleCheckpoint(true)}
                                            className="flex-1"
                                        >
                                            Yes, I understand
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleCheckpoint(false)}
                                            className="flex-1"
                                        >
                                            Let me review
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Step Indicators */}
                        <div className="flex gap-2 mt-6">
                            {tutorial.steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-1 h-1 rounded-full transition-all ${
                                        completedSteps.has(idx)
                                            ? 'bg-[var(--color-accent-green)]'
                                            : idx === currentStep
                                            ? 'bg-[var(--color-accent-primary)]'
                                            : 'bg-[var(--color-bg-tertiary)]'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-[var(--color-border)] flex justify-between">
                        <Button
                            variant="ghost"
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="gap-2"
                        >
                            <ArrowLeft size={16} />
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (currentStepData.checkpoint && !showCheckpoint) {
                                    setShowCheckpoint(true);
                                } else {
                                    handleNext();
                                }
                            }}
                            className="gap-2"
                        >
                            {currentStep === tutorial.steps.length - 1 ? (
                                <>
                                    Complete <CheckCircle size={16} />
                                </>
                            ) : (
                                <>
                                    Next <ArrowRight size={16} />
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
