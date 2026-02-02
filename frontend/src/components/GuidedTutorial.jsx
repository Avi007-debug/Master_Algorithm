import React, { useState, useEffect } from 'react';
import { Button } from './ui/common';
import { BookOpen, CheckCircle, Circle, ArrowRight, ArrowLeft, X } from 'lucide-react';
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
    }
};

export function GuidedTutorial({ algorithm, onClose, onAction }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [showCheckpoint, setShowCheckpoint] = useState(false);
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
                    className={`max-w-2xl w-full mx-4 rounded-2xl shadow-2xl ${
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
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                            aria-label="Close tutorial"
                        >
                            <X size={20} className="text-[var(--color-text-secondary)]" />
                        </button>
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
                    <div className="p-6">
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
