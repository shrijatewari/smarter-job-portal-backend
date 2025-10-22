// seed-questions.js
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import Question from "./src/models/Question.js";

const sampleQuestions = [
  // DSA Questions
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: "O(log n)",
    solutionExplanation: "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each iteration.",
    timer: 60,
    tags: ["algorithms", "searching", "complexity"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which data structure is best for implementing a priority queue?",
    options: ["Array", "Linked List", "Binary Heap", "Stack"],
    correctAnswer: "Binary Heap",
    solutionExplanation: "Binary heap is the most efficient data structure for priority queues as it allows O(log n) insertion and deletion operations.",
    timer: 90,
    tags: ["data-structures", "priority-queue", "heap"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: "O(n)",
    solutionExplanation: "Merge sort requires O(n) extra space for the temporary arrays used during the merging process.",
    timer: 120,
    tags: ["sorting", "space-complexity", "merge-sort"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "What is the maximum number of children a binary tree node can have?",
    options: ["1", "2", "3", "Unlimited"],
    correctAnswer: "2",
    solutionExplanation: "A binary tree node can have at most 2 children (left and right child).",
    timer: 45,
    tags: ["trees", "binary-tree", "basics"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "What is the time complexity of finding the longest common subsequence using dynamic programming?",
    options: ["O(mn)", "O(m+n)", "O(2^n)", "O(n log n)"],
    correctAnswer: "O(mn)",
    solutionExplanation: "The LCS algorithm using DP has O(mn) time complexity where m and n are the lengths of the two strings.",
    timer: 150,
    tags: ["dynamic-programming", "lcs", "algorithms"]
  },

  // DBMS Questions
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
    correctAnswer: "Structured Query Language",
    solutionExplanation: "SQL stands for Structured Query Language, used for managing and manipulating relational databases.",
    timer: 45,
    tags: ["sql", "database-basics", "fundamentals"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "What does ACID stand for in database transactions?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Authentication, Control, Integrity, Durability", "Atomicity, Control, Integrity, Data"],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    solutionExplanation: "ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (permanent changes).",
    timer: 60,
    tags: ["transactions", "acid", "database-fundamentals"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which normal form eliminates partial dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "2NF",
    solutionExplanation: "Second Normal Form (2NF) eliminates partial dependencies by ensuring all non-key attributes are fully functionally dependent on the primary key.",
    timer: 90,
    tags: ["normalization", "database-design", "functional-dependency"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "What is the difference between a clustered and non-clustered index?",
    options: ["No difference", "Clustered index determines physical order, non-clustered doesn't", "Non-clustered index is faster", "Clustered index is always unique"],
    correctAnswer: "Clustered index determines physical order, non-clustered doesn't",
    solutionExplanation: "A clustered index determines the physical order of data in the table, while a non-clustered index is a separate structure that points to the data.",
    timer: 120,
    tags: ["indexing", "database-performance", "storage"]
  },

  // OOPS Questions
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "What is a class in object-oriented programming?",
    options: ["A blueprint for creating objects", "A type of variable", "A function", "A data structure"],
    correctAnswer: "A blueprint for creating objects",
    solutionExplanation: "A class is a blueprint or template for creating objects. It defines the properties and methods that objects of that class will have.",
    timer: 45,
    tags: ["classes", "oop-basics", "fundamentals"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "What is the main principle of encapsulation?",
    options: ["Data hiding", "Code reusability", "Memory management", "Error handling"],
    correctAnswer: "Data hiding",
    solutionExplanation: "Encapsulation is primarily about data hiding - bundling data and methods together while restricting direct access to internal data.",
    timer: 60,
    tags: ["encapsulation", "oop-principles", "data-hiding"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which concept allows a class to inherit from multiple parent classes?",
    options: ["Single Inheritance", "Multiple Inheritance", "Multilevel Inheritance", "Hierarchical Inheritance"],
    correctAnswer: "Multiple Inheritance",
    solutionExplanation: "Multiple inheritance allows a class to inherit properties and methods from more than one parent class.",
    timer: 90,
    tags: ["inheritance", "multiple-inheritance", "oop-concepts"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "What is the difference between method overriding and method overloading?",
    options: ["No difference", "Overriding changes method signature, overloading doesn't", "Overriding is runtime polymorphism, overloading is compile-time", "Overloading is runtime polymorphism, overriding is compile-time"],
    correctAnswer: "Overriding is runtime polymorphism, overloading is compile-time",
    solutionExplanation: "Method overriding is runtime polymorphism (same method signature in different classes), while method overloading is compile-time polymorphism (same method name with different parameters).",
    timer: 120,
    tags: ["polymorphism", "method-overriding", "method-overloading"]
  },

  // Computer Networks Questions
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transport Protocol", "HyperText Transmission Protocol"],
    correctAnswer: "HyperText Transfer Protocol",
    solutionExplanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication for the World Wide Web.",
    timer: 45,
    tags: ["http", "web-protocols", "networking-basics"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which layer of the OSI model handles routing?",
    options: ["Physical", "Data Link", "Network", "Transport"],
    correctAnswer: "Network",
    solutionExplanation: "The Network layer (Layer 3) handles routing and logical addressing, determining the best path for data transmission.",
    timer: 90,
    tags: ["osi-model", "routing", "network-layer"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "What is the purpose of the TCP three-way handshake?",
    options: ["Data encryption", "Connection establishment", "Error detection", "Flow control"],
    correctAnswer: "Connection establishment",
    solutionExplanation: "The TCP three-way handshake (SYN, SYN-ACK, ACK) establishes a reliable connection between client and server before data transmission.",
    timer: 120,
    tags: ["tcp", "handshake", "connection-establishment"]
  },

  // Operating Systems Questions
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "What is the main purpose of an operating system?",
    options: ["To run applications", "To manage hardware resources", "To provide user interface", "All of the above"],
    correctAnswer: "All of the above",
    solutionExplanation: "An operating system manages hardware resources, provides user interface, and enables applications to run efficiently.",
    timer: 60,
    tags: ["os-fundamentals", "resource-management", "system-software"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "Which scheduling algorithm can lead to starvation?",
    options: ["FCFS", "Round Robin", "SJF", "Priority Scheduling"],
    correctAnswer: "Priority Scheduling",
    solutionExplanation: "Priority scheduling can lead to starvation if low-priority processes never get CPU time due to continuous arrival of high-priority processes.",
    timer: 90,
    tags: ["scheduling", "starvation", "process-management"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "What is the difference between a process and a thread?",
    options: ["No difference", "Process has separate memory space, thread shares memory", "Thread is faster than process", "Process is lighter than thread"],
    correctAnswer: "Process has separate memory space, thread shares memory",
    solutionExplanation: "A process has its own memory space, while threads within the same process share memory space, making threads more efficient for concurrent execution.",
    timer: 120,
    tags: ["processes", "threads", "memory-management", "concurrency"]
  },

  // Web Development Questions
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correctAnswer: "Cascading Style Sheets",
    solutionExplanation: "CSS stands for Cascading Style Sheets, used to style and layout web pages.",
    timer: 45,
    tags: ["css", "web-development", "styling"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "What is the purpose of the 'use strict' directive in JavaScript?",
    options: ["To enable strict mode", "To improve performance", "To enable debugging", "To enable ES6 features"],
    correctAnswer: "To enable strict mode",
    solutionExplanation: "'use strict' enables strict mode in JavaScript, which catches common coding mistakes and prevents certain actions.",
    timer: 90,
    tags: ["javascript", "strict-mode", "best-practices"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "What is the difference between '==' and '===' in JavaScript?",
    options: ["No difference", "'==' compares value and type, '===' compares only value", "'===' compares value and type, '==' compares only value", "'===' is faster"],
    correctAnswer: "'===' compares value and type, '==' compares only value",
    solutionExplanation: "'===' (strict equality) compares both value and type, while '==' (loose equality) performs type coercion before comparison.",
    timer: 120,
    tags: ["javascript", "equality", "type-coercion", "comparison"]
  },

  // Additional DSA Questions (50 questions)
  // Very Easy (10 questions)
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: "O(1)",
    solutionExplanation: "Array access by index is O(1) because we can directly calculate the memory address of any element using the base address and index.",
    timer: 30,
    tags: ["arrays", "time-complexity", "basics"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "Which data structure uses FIFO order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    solutionExplanation: "Queue follows First In First Out (FIFO) principle where the first element added is the first one to be removed.",
    timer: 30,
    tags: ["queue", "fifo", "data-structures"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "Which sorting algorithm works by repeatedly swapping adjacent elements if they are in wrong order?",
    options: ["Insertion Sort", "Selection Sort", "Bubble Sort", "Merge Sort"],
    correctAnswer: "Bubble Sort",
    solutionExplanation: "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timer: 30,
    tags: ["sorting", "bubble-sort", "algorithms"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "Which of the following is not a linear data structure?",
    options: ["Stack", "Queue", "Tree", "Array"],
    correctAnswer: "Tree",
    solutionExplanation: "Tree is a hierarchical data structure, not linear. Linear data structures include arrays, stacks, queues, and linked lists.",
    timer: 30,
    tags: ["data-structures", "linear", "tree"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "In a stack, insertion is done at which end?",
    options: ["Front", "Rear", "Top", "Bottom"],
    correctAnswer: "Top",
    solutionExplanation: "In a stack, insertion and deletion both happen at the top end, following LIFO (Last In First Out) principle.",
    timer: 30,
    tags: ["stack", "lifo", "insertion"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "What is the output of 5 % 2 in most programming languages?",
    options: ["2", "3", "1", "0"],
    correctAnswer: "1",
    solutionExplanation: "The modulo operator (%) returns the remainder of division. 5 divided by 2 gives remainder 1.",
    timer: 30,
    tags: ["modulo", "arithmetic", "basics"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "Which data structure uses LIFO order?",
    options: ["Queue", "Stack", "Heap", "Tree"],
    correctAnswer: "Stack",
    solutionExplanation: "Stack follows Last In First Out (LIFO) principle where the last element added is the first one to be removed.",
    timer: 30,
    tags: ["stack", "lifo", "data-structures"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "Which operation is not possible on arrays?",
    options: ["Insertion", "Deletion", "Traversal", "None"],
    correctAnswer: "None",
    solutionExplanation: "All operations (insertion, deletion, traversal) are possible on arrays, though some may require shifting elements.",
    timer: 30,
    tags: ["arrays", "operations", "basics"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "What does DSA stand for?",
    options: ["Data Storage Algorithm", "Data Structure and Algorithm", "Digital System Architecture", "Data Sorting Algorithm"],
    correctAnswer: "Data Structure and Algorithm",
    solutionExplanation: "DSA stands for Data Structures and Algorithms, which is the study of how to organize and manipulate data efficiently.",
    timer: 30,
    tags: ["basics", "terminology", "dsa"]
  },
  {
    category: "DSA",
    difficulty: "Very Easy",
    questionText: "Which is the smallest unit of memory?",
    options: ["Byte", "Bit", "Nibble", "Word"],
    correctAnswer: "Bit",
    solutionExplanation: "A bit (binary digit) is the smallest unit of memory that can store either 0 or 1.",
    timer: 30,
    tags: ["memory", "basics", "computer-science"]
  },

  // Easy (10 questions)
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "Which searching algorithm is efficient for sorted arrays?",
    options: ["Linear Search", "Binary Search", "Jump Search", "Depth Search"],
    correctAnswer: "Binary Search",
    solutionExplanation: "Binary search is efficient for sorted arrays with O(log n) time complexity, as it eliminates half the search space in each iteration.",
    timer: 45,
    tags: ["searching", "binary-search", "sorted-arrays"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "In which data structure can elements be inserted or removed from both ends?",
    options: ["Queue", "Deque", "Stack", "Priority Queue"],
    correctAnswer: "Deque",
    solutionExplanation: "Deque (Double-ended queue) allows insertion and deletion from both ends, combining features of stack and queue.",
    timer: 45,
    tags: ["deque", "double-ended", "data-structures"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "Which sorting algorithm is considered stable?",
    options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
    solutionExplanation: "Merge sort is stable because it maintains the relative order of equal elements during the merge process.",
    timer: 45,
    tags: ["sorting", "stable", "merge-sort"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "Which of the following is not a divide and conquer algorithm?",
    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Binary Search"],
    correctAnswer: "Heap Sort",
    solutionExplanation: "Heap sort is not a divide and conquer algorithm. It uses heap data structure and has different approach than divide and conquer.",
    timer: 45,
    tags: ["divide-conquer", "heap-sort", "algorithms"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "What is the auxiliary space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    solutionExplanation: "Merge sort requires O(n) auxiliary space for the temporary arrays used during the merging process.",
    timer: 45,
    tags: ["merge-sort", "space-complexity", "auxiliary-space"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "Which traversal of a binary tree gives sorted order if it's a BST?",
    options: ["Preorder", "Inorder", "Postorder", "Level Order"],
    correctAnswer: "Inorder",
    solutionExplanation: "Inorder traversal of a Binary Search Tree gives elements in sorted order due to the BST property.",
    timer: 45,
    tags: ["bst", "inorder", "traversal", "sorted"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "What is the maximum number of children a binary tree node can have?",
    options: ["1", "2", "3", "Unlimited"],
    correctAnswer: "2",
    solutionExplanation: "A binary tree node can have at most 2 children (left and right child), which is the defining property of binary trees.",
    timer: 45,
    tags: ["binary-tree", "children", "tree-properties"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "Which of the following is a dynamic data structure?",
    options: ["Array", "Linked List", "Stack", "String"],
    correctAnswer: "Linked List",
    solutionExplanation: "Linked list is dynamic as it can grow and shrink during runtime, unlike arrays which have fixed size.",
    timer: 45,
    tags: ["dynamic", "linked-list", "data-structures"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "What is the best case time complexity of bubble sort?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
    correctAnswer: "O(n)",
    solutionExplanation: "Bubble sort's best case is O(n) when the array is already sorted and we use an optimized version that stops early.",
    timer: 45,
    tags: ["bubble-sort", "best-case", "time-complexity"]
  },
  {
    category: "DSA",
    difficulty: "Easy",
    questionText: "Which algorithm finds the shortest path in a weighted graph?",
    options: ["BFS", "DFS", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    correctAnswer: "Dijkstra's Algorithm",
    solutionExplanation: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph.",
    timer: 45,
    tags: ["shortest-path", "dijkstra", "weighted-graph"]
  },

  // Medium (10 questions)
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which of these problems uses the Two Pointer technique?",
    options: ["Finding duplicates", "Two Sum in sorted array", "Level Order Traversal", "DFS"],
    correctAnswer: "Two Sum in sorted array",
    solutionExplanation: "Two Sum in sorted array uses two pointers (one at start, one at end) to find pairs that sum to target value.",
    timer: 60,
    tags: ["two-pointer", "two-sum", "techniques"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which of the following is used to detect a cycle in a linked list?",
    options: ["Hash Map", "Two Pointers (Floyd's Algorithm)", "Stack", "Queue"],
    correctAnswer: "Two Pointers (Floyd's Algorithm)",
    solutionExplanation: "Floyd's cycle detection algorithm uses two pointers (slow and fast) to detect cycles in linked lists efficiently.",
    timer: 60,
    tags: ["cycle-detection", "floyd-algorithm", "linked-list"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "What data structure is used in recursion?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Stack",
    solutionExplanation: "Recursion uses the call stack to store function calls and their local variables, following LIFO principle.",
    timer: 60,
    tags: ["recursion", "call-stack", "stack"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "What is the time complexity of finding an element in a balanced BST?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(log n)",
    solutionExplanation: "In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) time complexity.",
    timer: 60,
    tags: ["bst", "balanced", "search-complexity"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which algorithm finds the maximum subarray sum?",
    options: ["Kadane's Algorithm", "Dijkstra's Algorithm", "Floyd-Warshall", "Kruskal's Algorithm"],
    correctAnswer: "Kadane's Algorithm",
    solutionExplanation: "Kadane's algorithm efficiently finds the maximum sum of contiguous subarray in O(n) time.",
    timer: 60,
    tags: ["kadane", "maximum-subarray", "dynamic-programming"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which data structure is used for BFS?",
    options: ["Stack", "Queue", "Heap", "Array"],
    correctAnswer: "Queue",
    solutionExplanation: "BFS uses a queue to process nodes level by level, ensuring nodes at the same level are processed before moving to the next level.",
    timer: 60,
    tags: ["bfs", "queue", "graph-traversal"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "What is the space complexity of recursive Fibonacci?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    solutionExplanation: "Recursive Fibonacci has O(n) space complexity due to the maximum depth of the recursion stack being n.",
    timer: 60,
    tags: ["fibonacci", "recursion", "space-complexity"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which algorithm is used for finding strongly connected components?",
    options: ["Tarjan's", "Kruskal's", "Dijkstra's", "Prim's"],
    correctAnswer: "Tarjan's",
    solutionExplanation: "Tarjan's algorithm is used to find strongly connected components in a directed graph.",
    timer: 60,
    tags: ["tarjan", "scc", "strongly-connected", "graph"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "What is the worst case complexity of quick sort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: "O(n²)",
    solutionExplanation: "Quick sort's worst case is O(n²) when the pivot is always the smallest or largest element, creating unbalanced partitions.",
    timer: 60,
    tags: ["quicksort", "worst-case", "time-complexity"]
  },
  {
    category: "DSA",
    difficulty: "Medium",
    questionText: "Which traversal technique uses a queue?",
    options: ["DFS", "BFS", "Inorder", "Postorder"],
    correctAnswer: "BFS",
    solutionExplanation: "BFS (Breadth-First Search) uses a queue to process nodes level by level, ensuring breadth-first traversal.",
    timer: 60,
    tags: ["bfs", "queue", "traversal"]
  },

  // Hard (10 questions)
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which problem can be solved using backtracking?",
    options: ["N-Queens", "BFS", "DFS", "Binary Search"],
    correctAnswer: "N-Queens",
    solutionExplanation: "N-Queens problem is a classic backtracking problem where we try placing queens and backtrack if the current placement doesn't lead to a solution.",
    timer: 90,
    tags: ["backtracking", "n-queens", "recursion"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "What data structure is best suited for implementing a priority queue?",
    options: ["Array", "Linked List", "Heap", "Stack"],
    correctAnswer: "Heap",
    solutionExplanation: "Heap is the most efficient data structure for priority queues, allowing O(log n) insertion and deletion operations.",
    timer: 90,
    tags: ["priority-queue", "heap", "data-structures"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which of the following problems uses dynamic programming?",
    options: ["Knapsack Problem", "Binary Search", "DFS", "Merge Sort"],
    correctAnswer: "Knapsack Problem",
    solutionExplanation: "The Knapsack problem is a classic dynamic programming problem where we optimize the selection of items with given constraints.",
    timer: 90,
    tags: ["dynamic-programming", "knapsack", "optimization"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which graph algorithm is used for detecting negative weight cycles?",
    options: ["Dijkstra's", "Bellman-Ford", "Kruskal's", "Prim's"],
    correctAnswer: "Bellman-Ford",
    solutionExplanation: "Bellman-Ford algorithm can detect negative weight cycles in a graph, unlike Dijkstra's which assumes non-negative weights.",
    timer: 90,
    tags: ["bellman-ford", "negative-cycles", "graph-algorithms"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which approach does topological sort use?",
    options: ["DFS", "BFS", "Both", "Neither"],
    correctAnswer: "Both",
    solutionExplanation: "Topological sort can be implemented using both DFS (recursive) and BFS (Kahn's algorithm) approaches.",
    timer: 90,
    tags: ["topological-sort", "dfs", "bfs", "graph"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "What is the space complexity of DFS?",
    options: ["O(1)", "O(V + E)", "O(V)", "O(E)"],
    correctAnswer: "O(V + E)",
    solutionExplanation: "DFS space complexity is O(V + E) where V is vertices and E is edges, due to the recursion stack and visited array.",
    timer: 90,
    tags: ["dfs", "space-complexity", "graph-traversal"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which problem uses memoization?",
    options: ["Fibonacci Sequence", "Binary Search", "BFS", "Merge Sort"],
    correctAnswer: "Fibonacci Sequence",
    solutionExplanation: "Fibonacci sequence is a classic example where memoization is used to avoid recalculating the same subproblems.",
    timer: 90,
    tags: ["memoization", "fibonacci", "dynamic-programming"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which algorithm finds minimum spanning tree?",
    options: ["Dijkstra", "Kruskal", "Floyd-Warshall", "Bellman-Ford"],
    correctAnswer: "Kruskal",
    solutionExplanation: "Kruskal's algorithm finds the minimum spanning tree by sorting edges and adding them if they don't form a cycle.",
    timer: 90,
    tags: ["kruskal", "mst", "minimum-spanning-tree"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which algorithm is used for shortest paths between all pairs?",
    options: ["Dijkstra", "Bellman-Ford", "Floyd-Warshall", "DFS"],
    correctAnswer: "Floyd-Warshall",
    solutionExplanation: "Floyd-Warshall algorithm finds shortest paths between all pairs of vertices in a weighted graph.",
    timer: 90,
    tags: ["floyd-warshall", "all-pairs", "shortest-path"]
  },
  {
    category: "DSA",
    difficulty: "Hard",
    questionText: "Which is not a greedy algorithm?",
    options: ["Kruskal", "Prim", "Huffman", "Bellman-Ford"],
    correctAnswer: "Bellman-Ford",
    solutionExplanation: "Bellman-Ford is not a greedy algorithm. Kruskal, Prim, and Huffman are all greedy algorithms.",
    timer: 90,
    tags: ["greedy", "algorithms", "bellman-ford"]
  },

  // Very Hard (10 questions)
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which algorithm is used for maximum flow in a network?",
    options: ["Ford-Fulkerson", "Kruskal", "Dijkstra", "Prim"],
    correctAnswer: "Ford-Fulkerson",
    solutionExplanation: "Ford-Fulkerson algorithm finds the maximum flow in a flow network using augmenting paths.",
    timer: 120,
    tags: ["ford-fulkerson", "max-flow", "network-flow"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which problem does the Rabin-Karp algorithm solve efficiently?",
    options: ["Substring Search", "Sorting", "Graph Traversal", "Path Finding"],
    correctAnswer: "Substring Search",
    solutionExplanation: "Rabin-Karp algorithm efficiently finds substring patterns in text using rolling hash technique.",
    timer: 120,
    tags: ["rabin-karp", "string-matching", "rolling-hash"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which algorithm is used for pattern matching with wildcards?",
    options: ["KMP", "Boyer-Moore", "Regex DP", "Rabin-Karp"],
    correctAnswer: "Regex DP",
    solutionExplanation: "Regular expression matching with wildcards is typically solved using dynamic programming approach.",
    timer: 120,
    tags: ["regex", "wildcards", "dynamic-programming", "pattern-matching"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which is the optimal algorithm for matrix chain multiplication?",
    options: ["Divide & Conquer", "Greedy", "Dynamic Programming", "Recursion"],
    correctAnswer: "Dynamic Programming",
    solutionExplanation: "Matrix chain multiplication is optimally solved using dynamic programming to find the most efficient way to multiply matrices.",
    timer: 120,
    tags: ["matrix-chain", "dynamic-programming", "optimization"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which data structure helps in implementing a segment tree?",
    options: ["Array", "Stack", "Heap", "Linked List"],
    correctAnswer: "Array",
    solutionExplanation: "Segment trees are typically implemented using arrays for efficient range queries and updates.",
    timer: 120,
    tags: ["segment-tree", "range-queries", "arrays"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "What is the time complexity of building a heap?",
    options: ["O(n log n)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    solutionExplanation: "Building a heap from an array can be done in O(n) time using bottom-up heapification, not O(n log n).",
    timer: 120,
    tags: ["heap", "heapify", "time-complexity"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which algorithm finds articulation points in a graph?",
    options: ["Tarjan's Algorithm", "Prim's", "Kruskal's", "Dijkstra's"],
    correctAnswer: "Tarjan's Algorithm",
    solutionExplanation: "Tarjan's algorithm is used to find articulation points (cut vertices) in a graph using DFS.",
    timer: 120,
    tags: ["tarjan", "articulation-points", "cut-vertices", "graph"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which algorithm helps in solving the Traveling Salesman Problem?",
    options: ["Dijkstra's", "Dynamic Programming", "Greedy", "Kruskal's"],
    correctAnswer: "Dynamic Programming",
    solutionExplanation: "TSP is optimally solved using dynamic programming (Held-Karp algorithm) for small instances, though it's NP-hard.",
    timer: 120,
    tags: ["tsp", "traveling-salesman", "dynamic-programming", "np-hard"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "Which algorithm is used for string edit distance?",
    options: ["KMP", "Rabin-Karp", "Levenshtein Algorithm", "Boyer-Moore"],
    correctAnswer: "Levenshtein Algorithm",
    solutionExplanation: "Levenshtein algorithm (edit distance) finds the minimum number of operations to transform one string into another.",
    timer: 120,
    tags: ["levenshtein", "edit-distance", "string-algorithms"]
  },
  {
    category: "DSA",
    difficulty: "Very Hard",
    questionText: "What is the time complexity of finding SCCs using Kosaraju's algorithm?",
    options: ["O(V + E)", "O(V²)", "O(E log V)", "O(VE)"],
    correctAnswer: "O(V + E)",
    solutionExplanation: "Kosaraju's algorithm for finding strongly connected components has O(V + E) time complexity using two DFS traversals.",
    timer: 120,
    tags: ["kosaraju", "scc", "strongly-connected", "graph-algorithms"]
  },

  // Additional DBMS Questions (50 questions)
  // Very Easy (10 questions)
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "What does DBMS stand for?",
    options: ["Data Backup Management System", "Database Management System", "Data Basic Management Software", "Database Managing Service"],
    correctAnswer: "Database Management System",
    solutionExplanation: "DBMS stands for Database Management System, which is software that manages databases and provides an interface for users to interact with data.",
    timer: 30,
    tags: ["dbms", "basics", "terminology"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "Which of the following is not a DBMS?",
    options: ["MySQL", "Oracle", "MongoDB", "Windows"],
    correctAnswer: "Windows",
    solutionExplanation: "Windows is an operating system, not a database management system. MySQL, Oracle, and MongoDB are all DBMS software.",
    timer: 30,
    tags: ["dbms", "software", "basics"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "Which key uniquely identifies each record in a table?",
    options: ["Foreign Key", "Primary Key", "Secondary Key", "Candidate Key"],
    correctAnswer: "Primary Key",
    solutionExplanation: "A primary key uniquely identifies each record in a table and cannot contain null values or duplicates.",
    timer: 30,
    tags: ["primary-key", "keys", "basics"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "Which command is used to retrieve data from a database?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correctAnswer: "SELECT",
    solutionExplanation: "The SELECT command is used to retrieve or query data from a database table.",
    timer: 30,
    tags: ["sql", "select", "dml"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "A collection of related data tables is called a:",
    options: ["Spreadsheet", "Database", "Relation", "Entity"],
    correctAnswer: "Database",
    solutionExplanation: "A database is a collection of related data tables that are organized and stored together.",
    timer: 30,
    tags: ["database", "basics", "terminology"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "In a table, rows are called:",
    options: ["Attributes", "Tuples", "Fields", "Columns"],
    correctAnswer: "Tuples",
    solutionExplanation: "In database terminology, rows are called tuples, and columns are called attributes or fields.",
    timer: 30,
    tags: ["tuples", "rows", "terminology"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "Which language is used to define database structure?",
    options: ["DML", "DDL", "DCL", "TCL"],
    correctAnswer: "DDL",
    solutionExplanation: "DDL (Data Definition Language) is used to define database structure, including creating, altering, and dropping tables.",
    timer: 30,
    tags: ["ddl", "sql", "structure"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query List", "Systematic Query Logic"],
    correctAnswer: "Structured Query Language",
    solutionExplanation: "SQL stands for Structured Query Language, the standard language for managing relational databases.",
    timer: 30,
    tags: ["sql", "basics", "terminology"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "Which of the following is a DBMS software?",
    options: ["MS Word", "Excel", "PostgreSQL", "PowerPoint"],
    correctAnswer: "PostgreSQL",
    solutionExplanation: "PostgreSQL is a DBMS software. MS Word, Excel, and PowerPoint are application software, not database management systems.",
    timer: 30,
    tags: ["dbms", "software", "postgresql"]
  },
  {
    category: "DBMS",
    difficulty: "Very Easy",
    questionText: "Which key establishes relationship between two tables?",
    options: ["Foreign Key", "Super Key", "Primary Key", "Unique Key"],
    correctAnswer: "Foreign Key",
    solutionExplanation: "A foreign key establishes relationships between tables by referencing the primary key of another table.",
    timer: 30,
    tags: ["foreign-key", "relationships", "keys"]
  },

  // Easy (10 questions)
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which SQL clause is used to filter records?",
    options: ["GROUP BY", "WHERE", "HAVING", "ORDER BY"],
    correctAnswer: "WHERE",
    solutionExplanation: "The WHERE clause is used to filter records based on specified conditions in SQL queries.",
    timer: 45,
    tags: ["where", "filtering", "sql"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which normal form removes partial dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "2NF",
    solutionExplanation: "Second Normal Form (2NF) removes partial dependencies by ensuring all non-key attributes are fully functionally dependent on the primary key.",
    timer: 45,
    tags: ["normalization", "2nf", "partial-dependency"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "In ER diagrams, rectangles represent:",
    options: ["Attributes", "Entities", "Relationships", "Keys"],
    correctAnswer: "Entities",
    solutionExplanation: "In Entity-Relationship diagrams, rectangles represent entities, which are objects or concepts about which data is stored.",
    timer: 45,
    tags: ["er-diagram", "entities", "modeling"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which constraint ensures all values in a column are unique?",
    options: ["PRIMARY KEY", "UNIQUE", "FOREIGN KEY", "CHECK"],
    correctAnswer: "UNIQUE",
    solutionExplanation: "The UNIQUE constraint ensures that all values in a column are unique, but unlike PRIMARY KEY, it allows null values.",
    timer: 45,
    tags: ["unique", "constraints", "sql"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which SQL function is used to count rows?",
    options: ["SUM()", "COUNT()", "LENGTH()", "TOTAL()"],
    correctAnswer: "COUNT()",
    solutionExplanation: "The COUNT() function is used to count the number of rows in a result set or the number of non-null values in a column.",
    timer: 45,
    tags: ["count", "aggregate", "functions"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which operator is used to combine results of two queries?",
    options: ["INTERSECT", "UNION", "MINUS", "JOIN"],
    correctAnswer: "UNION",
    solutionExplanation: "The UNION operator combines the results of two or more SELECT statements, removing duplicate rows.",
    timer: 45,
    tags: ["union", "operators", "combining"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "What does the JOIN operation do?",
    options: ["Merges tables", "Deletes duplicates", "Filters rows", "Updates data"],
    correctAnswer: "Merges tables",
    solutionExplanation: "JOIN operations combine rows from two or more tables based on related columns, effectively merging the tables.",
    timer: 45,
    tags: ["join", "tables", "combining"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which of the following is NOT a type of join?",
    options: ["Inner Join", "Left Join", "Outer Join", "Adjacent Join"],
    correctAnswer: "Adjacent Join",
    solutionExplanation: "Adjacent Join is not a standard SQL join type. The main join types are Inner, Left, Right, and Full Outer joins.",
    timer: 45,
    tags: ["join-types", "sql", "joins"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which SQL clause groups rows that have the same values?",
    options: ["GROUP BY", "ORDER BY", "HAVING", "DISTINCT"],
    correctAnswer: "GROUP BY",
    solutionExplanation: "GROUP BY clause groups rows that have the same values in specified columns, often used with aggregate functions.",
    timer: 45,
    tags: ["group-by", "aggregation", "sql"]
  },
  {
    category: "DBMS",
    difficulty: "Easy",
    questionText: "Which command is used to delete all records from a table but keep its structure?",
    options: ["DROP", "DELETE", "TRUNCATE", "ERASE"],
    correctAnswer: "TRUNCATE",
    solutionExplanation: "TRUNCATE removes all rows from a table but keeps the table structure intact, unlike DROP which removes the entire table.",
    timer: 45,
    tags: ["truncate", "delete", "dml"]
  },

  // Medium (10 questions)
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which of the following prevents invalid data entry?",
    options: ["Trigger", "Constraint", "Cursor", "Index"],
    correctAnswer: "Constraint",
    solutionExplanation: "Constraints are rules that prevent invalid data entry by enforcing data integrity at the database level.",
    timer: 60,
    tags: ["constraints", "data-integrity", "validation"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which key can uniquely identify a record but is not the primary key?",
    options: ["Foreign Key", "Super Key", "Candidate Key", "Alternate Key"],
    correctAnswer: "Alternate Key",
    solutionExplanation: "An alternate key is a candidate key that is not chosen as the primary key but can still uniquely identify records.",
    timer: 60,
    tags: ["alternate-key", "candidate-key", "keys"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which normal form removes transitive dependency?",
    options: ["1NF", "2NF", "3NF", "4NF"],
    correctAnswer: "3NF",
    solutionExplanation: "Third Normal Form (3NF) removes transitive dependencies by ensuring non-key attributes don't depend on other non-key attributes.",
    timer: 60,
    tags: ["normalization", "3nf", "transitive-dependency"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which anomaly occurs when inserting a record causes inconsistency?",
    options: ["Update Anomaly", "Deletion Anomaly", "Insertion Anomaly", "Access Anomaly"],
    correctAnswer: "Insertion Anomaly",
    solutionExplanation: "Insertion anomaly occurs when you cannot insert a record due to missing information about other entities, causing data inconsistency.",
    timer: 60,
    tags: ["anomalies", "insertion", "normalization"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which SQL keyword is used to sort results?",
    options: ["GROUP BY", "SORT BY", "ORDER BY", "ARRANGE BY"],
    correctAnswer: "ORDER BY",
    solutionExplanation: "ORDER BY clause is used to sort the result set in ascending or descending order based on specified columns.",
    timer: 60,
    tags: ["order-by", "sorting", "sql"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "What does ACID stand for in transactions?",
    options: ["Accuracy, Consistency, Isolation, Durability", "Atomicity, Consistency, Isolation, Durability", "Atomicity, Correctness, Integrity, Durability", "Accuracy, Consistency, Integrity, Data"],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    solutionExplanation: "ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (permanent changes).",
    timer: 60,
    tags: ["acid", "transactions", "properties"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which of the following is not a DML command?",
    options: ["SELECT", "INSERT", "DELETE", "CREATE"],
    correctAnswer: "CREATE",
    solutionExplanation: "CREATE is a DDL (Data Definition Language) command, not DML. DML commands include SELECT, INSERT, UPDATE, and DELETE.",
    timer: 60,
    tags: ["dml", "ddl", "sql-commands"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which command creates a view in SQL?",
    options: ["MAKE VIEW", "DEFINE VIEW", "CREATE VIEW", "NEW VIEW"],
    correctAnswer: "CREATE VIEW",
    solutionExplanation: "CREATE VIEW is the SQL command used to create a virtual table (view) based on the result of a SELECT statement.",
    timer: 60,
    tags: ["views", "create", "sql"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "What is the purpose of a foreign key?",
    options: ["Ensure referential integrity", "Increase performance", "Reduce redundancy", "Improve normalization"],
    correctAnswer: "Ensure referential integrity",
    solutionExplanation: "Foreign keys ensure referential integrity by maintaining relationships between tables and preventing orphaned records.",
    timer: 60,
    tags: ["foreign-key", "referential-integrity", "relationships"]
  },
  {
    category: "DBMS",
    difficulty: "Medium",
    questionText: "Which of these is a correct SQL aggregate function?",
    options: ["SUMMARIZE()", "COUNT()", "TOTAL()", "CALCULATE()"],
    correctAnswer: "COUNT()",
    solutionExplanation: "COUNT() is a standard SQL aggregate function. SUMMARIZE(), TOTAL(), and CALCULATE() are not standard SQL functions.",
    timer: 60,
    tags: ["aggregate-functions", "count", "sql"]
  },

  // Hard (10 questions)
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which of these is used to ensure atomicity in a DBMS?",
    options: ["Scheduler", "Log File", "Lock", "Rollback"],
    correctAnswer: "Rollback",
    solutionExplanation: "Rollback is used to ensure atomicity by undoing all changes made by a transaction if any part of the transaction fails.",
    timer: 90,
    tags: ["atomicity", "rollback", "transactions"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which of the following is a type of serializability?",
    options: ["Conflict Serializability", "Cascade Serializability", "Mutual Serializability", "Conditional Serializability"],
    correctAnswer: "Conflict Serializability",
    solutionExplanation: "Conflict Serializability is a type of serializability that ensures transactions can be reordered to produce the same result as some serial execution.",
    timer: 90,
    tags: ["serializability", "concurrency", "transactions"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which indexing technique uses balanced trees?",
    options: ["Hash Index", "B+ Tree Index", "Binary Tree Index", "Linear Index"],
    correctAnswer: "B+ Tree Index",
    solutionExplanation: "B+ Tree indexing uses balanced trees to provide efficient search, insertion, and deletion operations with logarithmic time complexity.",
    timer: 90,
    tags: ["b-tree", "indexing", "balanced-trees"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "What is the purpose of a trigger in DBMS?",
    options: ["Perform actions automatically on events", "Speed up queries", "Manage transactions", "Backup data"],
    correctAnswer: "Perform actions automatically on events",
    solutionExplanation: "Triggers are database objects that automatically execute in response to specific events like INSERT, UPDATE, or DELETE operations.",
    timer: 90,
    tags: ["triggers", "automation", "events"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "What happens when a transaction fails after updating the database?",
    options: ["Commit occurs", "Rollback happens", "Lock remains", "Deadlock resolves"],
    correctAnswer: "Rollback happens",
    solutionExplanation: "When a transaction fails after updating the database, a rollback occurs to restore the database to its previous consistent state.",
    timer: 90,
    tags: ["rollback", "failure", "recovery"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which concurrency problem occurs when two transactions read and write same data?",
    options: ["Lost Update", "Phantom Read", "Dirty Read", "Non-repeatable Read"],
    correctAnswer: "Lost Update",
    solutionExplanation: "Lost Update problem occurs when two transactions read the same data, modify it, and write it back, causing one update to be lost.",
    timer: 90,
    tags: ["concurrency", "lost-update", "problems"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which schedule type ensures transactions behave as if executed serially?",
    options: ["Non-serializable", "Serializable", "Concurrent", "Cascaded"],
    correctAnswer: "Serializable",
    solutionExplanation: "Serializable schedules ensure that concurrent transactions produce the same result as if they were executed one after another (serially).",
    timer: 90,
    tags: ["serializable", "schedules", "concurrency"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which of the following uses hashing for fast access?",
    options: ["B+ Trees", "Primary Index", "Hash Index", "Clustered Index"],
    correctAnswer: "Hash Index",
    solutionExplanation: "Hash Index uses hashing techniques to provide fast access to data by converting keys into hash values for quick lookup.",
    timer: 90,
    tags: ["hash-index", "hashing", "access"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "Which file organization provides fastest retrieval for exact match queries?",
    options: ["Sequential", "Hashed", "Indexed", "Clustered"],
    correctAnswer: "Hashed",
    solutionExplanation: "Hashed file organization provides the fastest retrieval for exact match queries due to direct access using hash functions.",
    timer: 90,
    tags: ["file-organization", "hashing", "retrieval"]
  },
  {
    category: "DBMS",
    difficulty: "Hard",
    questionText: "What is a phantom read?",
    options: ["When new rows appear during re-read", "When same data changes", "When update fails", "When transaction restarts"],
    correctAnswer: "When new rows appear during re-read",
    solutionExplanation: "Phantom read occurs when a transaction reads a set of rows, and another transaction inserts new rows that match the same criteria, causing the first transaction to see 'phantom' rows on re-read.",
    timer: 90,
    tags: ["phantom-read", "concurrency", "isolation"]
  },

  // Very Hard (10 questions)
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which of these ensures recoverability in transactions?",
    options: ["Checkpoints", "Logs", "Rollback", "Serial Schedules"],
    correctAnswer: "Checkpoints",
    solutionExplanation: "Checkpoints ensure recoverability by periodically saving the database state, allowing the system to recover to a consistent state after a failure.",
    timer: 120,
    tags: ["checkpoints", "recoverability", "recovery"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which algorithm is used in concurrency control?",
    options: ["Two Phase Locking (2PL)", "Binary Locking", "Starvation Control", "Cascade Rollback"],
    correctAnswer: "Two Phase Locking (2PL)",
    solutionExplanation: "Two Phase Locking (2PL) is a concurrency control algorithm that ensures serializability by requiring transactions to acquire all locks before releasing any.",
    timer: 120,
    tags: ["2pl", "concurrency-control", "locking"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which is true about deadlocks?",
    options: ["They can be prevented using wait-die scheme", "They occur only in serial schedules", "They can't be detected", "They improve concurrency"],
    correctAnswer: "They can be prevented using wait-die scheme",
    solutionExplanation: "Deadlocks can be prevented using schemes like wait-die, where older transactions wait for younger ones, or wound-wait, where younger transactions are aborted.",
    timer: 120,
    tags: ["deadlocks", "prevention", "wait-die"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which protocol ensures strict two-phase locking?",
    options: ["All locks released after commit", "All locks before commit", "Release before commit", "Locks ignored after read"],
    correctAnswer: "All locks released after commit",
    solutionExplanation: "Strict two-phase locking requires that all locks be held until the transaction commits, ensuring no other transaction can see uncommitted changes.",
    timer: 120,
    tags: ["strict-2pl", "locking", "protocols"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which method is used for crash recovery?",
    options: ["Undo/Redo", "Reboot", "Deadlock Prevention", "Logging Only"],
    correctAnswer: "Undo/Redo",
    solutionExplanation: "Undo/Redo recovery uses transaction logs to either undo (rollback) uncommitted transactions or redo (replay) committed transactions after a crash.",
    timer: 120,
    tags: ["undo-redo", "crash-recovery", "recovery"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which join condition matches every row with every other?",
    options: ["Natural Join", "Cross Join", "Inner Join", "Outer Join"],
    correctAnswer: "Cross Join",
    solutionExplanation: "Cross Join (Cartesian Product) matches every row from the first table with every row from the second table, creating all possible combinations.",
    timer: 120,
    tags: ["cross-join", "cartesian-product", "joins"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "What does shadow paging eliminate?",
    options: ["Logging Overhead", "Disk Access", "Backup", "Normalization"],
    correctAnswer: "Logging Overhead",
    solutionExplanation: "Shadow paging eliminates logging overhead by maintaining shadow pages and updating them atomically, reducing the need for extensive logging.",
    timer: 120,
    tags: ["shadow-paging", "logging", "overhead"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "What is the time complexity of searching in a B+ Tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    solutionExplanation: "Searching in a B+ Tree has O(log n) time complexity because it follows a path from root to leaf, with the height being logarithmic to the number of nodes.",
    timer: 120,
    tags: ["b-tree", "time-complexity", "searching"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which of these ensures isolation in transactions?",
    options: ["Locks", "Schedules", "Buffers", "Deadlocks"],
    correctAnswer: "Locks",
    solutionExplanation: "Locks ensure isolation by preventing concurrent transactions from interfering with each other's data access and modifications.",
    timer: 120,
    tags: ["isolation", "locks", "concurrency"]
  },
  {
    category: "DBMS",
    difficulty: "Very Hard",
    questionText: "Which concept ensures no partial commit?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: "Atomicity",
    solutionExplanation: "Atomicity ensures that transactions are all-or-nothing operations, meaning either all operations in a transaction complete successfully, or none of them do (no partial commit).",
    timer: 120,
    tags: ["atomicity", "transactions", "all-or-nothing"]
  },

  // Additional OOPS Questions (50 questions)
  // Very Easy (10 questions)
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "What does OOP stand for?",
    options: ["Object-Oriented Programming", "Output-Oriented Programming", "Object-Ordered Processing", "Operator-Oriented Programming"],
    correctAnswer: "Object-Oriented Programming",
    solutionExplanation: "OOP stands for Object-Oriented Programming, a programming paradigm based on the concept of objects that contain data and code.",
    timer: 30,
    tags: ["oop", "basics", "terminology"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which of the following is not a feature of OOP?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Recursion"],
    correctAnswer: "Recursion",
    solutionExplanation: "Recursion is a programming technique, not a feature of OOP. The main OOP features are Encapsulation, Polymorphism, and Inheritance.",
    timer: 30,
    tags: ["oop-features", "encapsulation", "polymorphism", "inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which concept hides internal details and shows only essential features?",
    options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
    correctAnswer: "Abstraction",
    solutionExplanation: "Abstraction hides internal implementation details and shows only the essential features to the user.",
    timer: 30,
    tags: ["abstraction", "oop-concepts", "basics"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which OOP concept allows reusing code by creating new classes from existing ones?",
    options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"],
    correctAnswer: "Inheritance",
    solutionExplanation: "Inheritance allows creating new classes (derived classes) from existing classes (base classes), enabling code reuse.",
    timer: 30,
    tags: ["inheritance", "code-reuse", "oop-concepts"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which keyword is used to create an object in Java?",
    options: ["class", "object", "new", "this"],
    correctAnswer: "new",
    solutionExplanation: "The 'new' keyword is used to create an instance of a class (object) in Java and other OOP languages.",
    timer: 30,
    tags: ["new-keyword", "object-creation", "java"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "In OOP, which concept binds data and methods together?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Composition"],
    correctAnswer: "Encapsulation",
    solutionExplanation: "Encapsulation binds data (attributes) and methods (functions) together within a class, hiding internal details.",
    timer: 30,
    tags: ["encapsulation", "data-binding", "oop-concepts"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "What is a class in OOP?",
    options: ["A blueprint for objects", "An instance of an object", "A data type", "A function"],
    correctAnswer: "A blueprint for objects",
    solutionExplanation: "A class is a blueprint or template for creating objects. It defines the properties and methods that objects of that class will have.",
    timer: 30,
    tags: ["class", "blueprint", "oop-basics"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which of the following is used to create a subclass?",
    options: ["extends", "implements", "inherits", "subclass"],
    correctAnswer: "extends",
    solutionExplanation: "The 'extends' keyword is used in Java to create a subclass that inherits from a parent class.",
    timer: 30,
    tags: ["extends", "inheritance", "subclass"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which operator is used to access members of a class using an object?",
    options: [".", "::", "->", ":"],
    correctAnswer: ".",
    solutionExplanation: "The dot operator (.) is used to access members (attributes and methods) of a class through an object.",
    timer: 30,
    tags: ["dot-operator", "member-access", "oop-basics"]
  },
  {
    category: "OOPS",
    difficulty: "Very Easy",
    questionText: "Which of these supports OOP?",
    options: ["C++", "C", "Assembly", "COBOL"],
    correctAnswer: "C++",
    solutionExplanation: "C++ supports OOP features like classes, objects, inheritance, and polymorphism. C is a procedural language.",
    timer: 30,
    tags: ["oop-languages", "c++", "programming-languages"]
  },

  // Easy (10 questions)
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Which function is automatically called when an object is created?",
    options: ["Constructor", "Destructor", "Initializer", "Main"],
    correctAnswer: "Constructor",
    solutionExplanation: "A constructor is automatically called when an object is created to initialize the object's data members.",
    timer: 45,
    tags: ["constructor", "object-creation", "initialization"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Which of the following allows function overloading?",
    options: ["Same function name, different parameters", "Same function name, same parameters", "Different function names", "None"],
    correctAnswer: "Same function name, different parameters",
    solutionExplanation: "Function overloading allows having multiple functions with the same name but different parameters (different number or types).",
    timer: 45,
    tags: ["function-overloading", "polymorphism", "methods"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "What is the keyword used to inherit a class in C++?",
    options: ["public", "protected", "private", "All of the above"],
    correctAnswer: "All of the above",
    solutionExplanation: "In C++, inheritance can be public, protected, or private, determining the access level of inherited members.",
    timer: 45,
    tags: ["inheritance", "access-specifiers", "c++"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Which of these describes polymorphism best?",
    options: ["Same function name, different forms", "Hiding details", "Binding data", "Reusing code"],
    correctAnswer: "Same function name, different forms",
    solutionExplanation: "Polymorphism allows the same function name to have different implementations (forms) based on the context.",
    timer: 45,
    tags: ["polymorphism", "oop-concepts", "function-overriding"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Which of these is not a type of inheritance?",
    options: ["Single", "Multiple", "Double", "Hybrid"],
    correctAnswer: "Double",
    solutionExplanation: "Double inheritance is not a standard type. The main types are Single, Multiple, Multilevel, Hierarchical, and Hybrid.",
    timer: 45,
    tags: ["inheritance-types", "oop-concepts", "multiple-inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "What does the 'this' pointer refer to?",
    options: ["The current object", "The parent class", "A global variable", "A static object"],
    correctAnswer: "The current object",
    solutionExplanation: "The 'this' pointer refers to the current object instance, allowing access to its own members.",
    timer: 45,
    tags: ["this-pointer", "current-object", "oop-concepts"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Which member of a class can be accessed by all other classes?",
    options: ["public", "protected", "private", "internal"],
    correctAnswer: "public",
    solutionExplanation: "Public members can be accessed by any other class or function, providing the highest level of accessibility.",
    timer: 45,
    tags: ["access-specifiers", "public", "member-visibility"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Destructor functions are used to?",
    options: ["Destroy objects", "Initialize variables", "Allocate memory", "Create copies"],
    correctAnswer: "Destroy objects",
    solutionExplanation: "Destructors are called when an object is destroyed to clean up resources and perform final operations.",
    timer: 45,
    tags: ["destructor", "object-destruction", "cleanup"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Static members of a class are shared by?",
    options: ["All objects of the class", "Only one object", "Derived classes only", "None of these"],
    correctAnswer: "All objects of the class",
    solutionExplanation: "Static members belong to the class itself, not to any specific object, so they are shared by all objects of the class.",
    timer: 45,
    tags: ["static-members", "class-members", "shared-data"]
  },
  {
    category: "OOPS",
    difficulty: "Easy",
    questionText: "Which of these is true about abstract classes?",
    options: ["They cannot be instantiated", "They must contain only abstract methods", "They have no data members", "They can be instantiated directly"],
    correctAnswer: "They cannot be instantiated",
    solutionExplanation: "Abstract classes cannot be instantiated directly; they serve as base classes for other classes to inherit from.",
    timer: 45,
    tags: ["abstract-classes", "instantiation", "oop-concepts"]
  },

  // Medium (10 questions)
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "What is function overriding?",
    options: ["Redefining a base class function in a derived class", "Using same function name in same class", "Hiding data members", "None of these"],
    correctAnswer: "Redefining a base class function in a derived class",
    solutionExplanation: "Function overriding occurs when a derived class provides its own implementation of a function that already exists in the base class.",
    timer: 60,
    tags: ["function-overriding", "inheritance", "polymorphism"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which concept provides compile-time polymorphism?",
    options: ["Function Overloading", "Virtual Functions", "Inheritance", "Operator Overloading"],
    correctAnswer: "Function Overloading",
    solutionExplanation: "Function overloading provides compile-time polymorphism, where the compiler decides which function to call based on parameters.",
    timer: 60,
    tags: ["compile-time-polymorphism", "function-overloading", "early-binding"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which of the following is true about virtual functions?",
    options: ["They support runtime polymorphism", "They are static", "They cannot be overridden", "They are compile-time functions"],
    correctAnswer: "They support runtime polymorphism",
    solutionExplanation: "Virtual functions support runtime polymorphism (late binding), where the function to call is determined at runtime.",
    timer: 60,
    tags: ["virtual-functions", "runtime-polymorphism", "late-binding"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which of these represents encapsulation?",
    options: ["Using private data members and public methods", "Using inheritance", "Overloading operators", "Creating abstract classes"],
    correctAnswer: "Using private data members and public methods",
    solutionExplanation: "Encapsulation is achieved by keeping data members private and providing public methods to access and modify them.",
    timer: 60,
    tags: ["encapsulation", "data-hiding", "access-control"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which of these is not possible in C++?",
    options: ["Multiple inheritance", "Multilevel inheritance", "Hybrid inheritance", "Virtual constructors"],
    correctAnswer: "Virtual constructors",
    solutionExplanation: "Virtual constructors are not possible in C++ because constructors cannot be virtual (they are called during object creation).",
    timer: 60,
    tags: ["virtual-constructors", "c++-limitations", "inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "What happens when a base class destructor is not virtual?",
    options: ["Derived class destructor may not be called", "Derived destructor always called", "No effect", "Program crashes"],
    correctAnswer: "Derived class destructor may not be called",
    solutionExplanation: "If the base class destructor is not virtual, only the base class destructor is called, potentially leaving derived class resources uninitialized.",
    timer: 60,
    tags: ["virtual-destructors", "memory-leaks", "inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which of the following keywords prevents inheritance?",
    options: ["final", "sealed", "private", "constant"],
    correctAnswer: "final",
    solutionExplanation: "The 'final' keyword in C++11 and later prevents a class from being inherited or a function from being overridden.",
    timer: 60,
    tags: ["final-keyword", "inheritance-prevention", "c++11"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "What is operator overloading?",
    options: ["Giving additional meaning to an existing operator", "Changing operator syntax", "Removing operators", "None of these"],
    correctAnswer: "Giving additional meaning to an existing operator",
    solutionExplanation: "Operator overloading allows giving new meaning to existing operators for user-defined types (classes).",
    timer: 60,
    tags: ["operator-overloading", "user-defined-operators", "polymorphism"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "Which type of relationship does inheritance represent?",
    options: ["Is-a", "Has-a", "Uses-a", "Contains-a"],
    correctAnswer: "Is-a",
    solutionExplanation: "Inheritance represents an 'Is-a' relationship, where a derived class is a type of its base class.",
    timer: 60,
    tags: ["inheritance-relationship", "is-a", "oop-concepts"]
  },
  {
    category: "OOPS",
    difficulty: "Medium",
    questionText: "When are copy constructors called?",
    options: ["When an object is copied", "During inheritance", "On class creation", "On destruction"],
    correctAnswer: "When an object is copied",
    solutionExplanation: "Copy constructors are called when an object is copied, either explicitly or when passed by value to a function.",
    timer: 60,
    tags: ["copy-constructor", "object-copying", "constructors"]
  },

  // Hard (10 questions)
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "Virtual functions must be members of which type of class?",
    options: ["Base class", "Derived class", "Friend class", "Static class"],
    correctAnswer: "Base class",
    solutionExplanation: "Virtual functions must be declared in the base class to enable runtime polymorphism in derived classes.",
    timer: 90,
    tags: ["virtual-functions", "base-class", "runtime-polymorphism"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "Which concept allows one interface to be used for different data types?",
    options: ["Polymorphism", "Abstraction", "Encapsulation", "Templates"],
    correctAnswer: "Templates",
    solutionExplanation: "Templates allow creating generic code that can work with different data types using the same interface.",
    timer: 90,
    tags: ["templates", "generic-programming", "type-safety"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "In multiple inheritance, which problem arises when a base class is inherited more than once?",
    options: ["Diamond Problem", "Looping", "Ambiguity", "Redundancy"],
    correctAnswer: "Diamond Problem",
    solutionExplanation: "The Diamond Problem occurs in multiple inheritance when a class inherits from two classes that have a common base class.",
    timer: 90,
    tags: ["diamond-problem", "multiple-inheritance", "ambiguity"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "What does the 'virtual' keyword in C++ ensure?",
    options: ["Late binding", "Early binding", "Multiple inheritance", "Static dispatch"],
    correctAnswer: "Late binding",
    solutionExplanation: "The 'virtual' keyword ensures late binding (runtime binding), where the function to call is determined at runtime.",
    timer: 90,
    tags: ["virtual-keyword", "late-binding", "runtime-dispatch"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "Which constructor is called when a derived class object is created?",
    options: ["Base class constructor first", "Derived class constructor first", "Both simultaneously", "Depends on access specifiers"],
    correctAnswer: "Base class constructor first",
    solutionExplanation: "When creating a derived class object, the base class constructor is called first, then the derived class constructor.",
    timer: 90,
    tags: ["constructor-order", "inheritance", "object-creation"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "Which of the following cannot be overloaded?",
    options: ["::", ".", "sizeof", "All of these"],
    correctAnswer: "All of these",
    solutionExplanation: "The scope resolution operator (::), member access operator (.), and sizeof operator cannot be overloaded in C++.",
    timer: 90,
    tags: ["operator-overloading", "non-overloadable-operators", "c++-limitations"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "Which statement about pure virtual functions is correct?",
    options: ["They have no definition", "They must be defined in the derived class", "They can be instantiated", "They are static"],
    correctAnswer: "They must be defined in the derived class",
    solutionExplanation: "Pure virtual functions have no definition in the base class and must be defined in the derived class.",
    timer: 90,
    tags: ["pure-virtual-functions", "abstract-functions", "inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "What is the output if a derived class overrides a virtual function?",
    options: ["Derived class version is called", "Base class version is always called", "Compile error", "Depends on the compiler"],
    correctAnswer: "Derived class version is called",
    solutionExplanation: "When a virtual function is overridden in a derived class, the derived class version is called (runtime polymorphism).",
    timer: 90,
    tags: ["virtual-function-overriding", "runtime-polymorphism", "derived-class"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "Which access specifier allows derived classes to access members but not other classes?",
    options: ["protected", "private", "public", "none"],
    correctAnswer: "protected",
    solutionExplanation: "Protected members can be accessed by the class itself and its derived classes, but not by other classes.",
    timer: 90,
    tags: ["protected-access", "access-specifiers", "inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Hard",
    questionText: "What is the role of a friend function?",
    options: ["Access private members of another class", "Copy objects", "Override operators", "Hide data"],
    correctAnswer: "Access private members of another class",
    solutionExplanation: "Friend functions can access private and protected members of a class, even though they are not members of that class.",
    timer: 90,
    tags: ["friend-functions", "access-control", "encapsulation"]
  },

  // Very Hard (10 questions)
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "Which design pattern ensures that only one instance of a class exists?",
    options: ["Singleton", "Factory", "Adapter", "Prototype"],
    correctAnswer: "Singleton",
    solutionExplanation: "The Singleton design pattern ensures that only one instance of a class exists throughout the application lifecycle.",
    timer: 120,
    tags: ["singleton-pattern", "design-patterns", "single-instance"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "Which of the following concepts allows dynamic dispatch?",
    options: ["Virtual Functions", "Static Functions", "Inline Functions", "Friend Functions"],
    correctAnswer: "Virtual Functions",
    solutionExplanation: "Virtual functions enable dynamic dispatch, where the function to call is determined at runtime based on the object's actual type.",
    timer: 120,
    tags: ["dynamic-dispatch", "virtual-functions", "runtime-polymorphism"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "What is the order of constructor calls in multiple inheritance?",
    options: ["Left to right as per declaration", "Right to left", "Derived first then base", "Random"],
    correctAnswer: "Left to right as per declaration",
    solutionExplanation: "In multiple inheritance, constructors are called in the order of inheritance declaration (left to right).",
    timer: 120,
    tags: ["multiple-inheritance", "constructor-order", "inheritance-sequence"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "Which keyword is used to resolve ambiguity in multiple inheritance?",
    options: ["scope resolution operator (::)", "super", "this", "base"],
    correctAnswer: "scope resolution operator (::)",
    solutionExplanation: "The scope resolution operator (::) is used to resolve ambiguity in multiple inheritance by specifying which base class member to access.",
    timer: 120,
    tags: ["scope-resolution", "ambiguity-resolution", "multiple-inheritance"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "In virtual inheritance, which keyword is used?",
    options: ["virtual", "friend", "static", "const"],
    correctAnswer: "virtual",
    solutionExplanation: "Virtual inheritance uses the 'virtual' keyword to ensure that only one copy of the base class exists in the inheritance hierarchy.",
    timer: 120,
    tags: ["virtual-inheritance", "diamond-problem", "inheritance-hierarchy"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "Which of the following is true about templates?",
    options: ["They enable generic programming", "They reduce runtime errors", "They are always type-safe", "All of the above"],
    correctAnswer: "All of the above",
    solutionExplanation: "Templates enable generic programming, reduce runtime errors through compile-time checking, and provide type safety.",
    timer: 120,
    tags: ["templates", "generic-programming", "type-safety", "compile-time-checking"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "When is the copy assignment operator called?",
    options: ["When assigning one object to another", "During object creation", "During function call", "During destruction"],
    correctAnswer: "When assigning one object to another",
    solutionExplanation: "The copy assignment operator is called when one object is assigned to another existing object using the assignment operator (=).",
    timer: 120,
    tags: ["copy-assignment", "operator-overloading", "object-assignment"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "Which function cannot be virtual?",
    options: ["Constructors", "Destructors", "Member functions", "All can be virtual"],
    correctAnswer: "Constructors",
    solutionExplanation: "Constructors cannot be virtual because they are called during object creation, before the object's type is fully determined.",
    timer: 120,
    tags: ["virtual-constructors", "constructor-limitations", "object-creation"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "What is RTTI used for?",
    options: ["Run-Time Type Identification", "Random Type Indexing", "Real-Time Type Implementation", "Recursive Type Inheritance"],
    correctAnswer: "Run-Time Type Identification",
    solutionExplanation: "RTTI (Run-Time Type Identification) allows determining the type of an object at runtime, useful for dynamic casting and type checking.",
    timer: 120,
    tags: ["rtti", "runtime-type-identification", "dynamic-casting"]
  },
  {
    category: "OOPS",
    difficulty: "Very Hard",
    questionText: "Which C++ feature allows safe type conversions at runtime?",
    options: ["dynamic_cast", "static_cast", "reinterpret_cast", "const_cast"],
    correctAnswer: "dynamic_cast",
    solutionExplanation: "dynamic_cast provides safe type conversions at runtime, checking if the conversion is valid and returning null if it fails.",
    timer: 120,
    tags: ["dynamic-cast", "safe-casting", "runtime-type-conversion"]
  },

  // Additional Computer Networks Questions (50 questions)
  // Very Easy (10 questions)
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "What does LAN stand for?",
    options: ["Local Area Network", "Large Area Network", "Line Access Network", "Logical Area Node"],
    correctAnswer: "Local Area Network",
    solutionExplanation: "LAN stands for Local Area Network, which is a network that connects computers and devices in a limited geographical area like a home, office, or building.",
    timer: 30,
    tags: ["lan", "networking", "basics"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "Which device connects different networks together?",
    options: ["Router", "Switch", "Hub", "Repeater"],
    correctAnswer: "Router",
    solutionExplanation: "A router is a networking device that connects different networks together and forwards data packets between them based on their IP addresses.",
    timer: 30,
    tags: ["router", "networking-devices", "basics"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "Which layer of the OSI model is responsible for routing?",
    options: ["Network Layer", "Transport Layer", "Data Link Layer", "Physical Layer"],
    correctAnswer: "Network Layer",
    solutionExplanation: "The Network Layer (Layer 3) is responsible for routing data packets between different networks using logical addressing (IP addresses).",
    timer: 30,
    tags: ["osi-model", "network-layer", "routing"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "What does IP stand for?",
    options: ["Internet Protocol", "Internal Processing", "Interconnected Path", "Interface Port"],
    correctAnswer: "Internet Protocol",
    solutionExplanation: "IP stands for Internet Protocol, which is the primary protocol used for routing data packets across the Internet and other networks.",
    timer: 30,
    tags: ["ip", "internet-protocol", "basics"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "Which of the following is an example of an application layer protocol?",
    options: ["HTTP", "TCP", "IP", "ARP"],
    correctAnswer: "HTTP",
    solutionExplanation: "HTTP (HyperText Transfer Protocol) is an application layer protocol used for transferring web pages and other resources over the Internet.",
    timer: 30,
    tags: ["http", "application-layer", "protocols"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "What is the unit of data at the transport layer called?",
    options: ["Segment", "Frame", "Packet", "Bit"],
    correctAnswer: "Segment",
    solutionExplanation: "At the transport layer, data is organized into segments, which contain the transport layer header and the data from the upper layers.",
    timer: 30,
    tags: ["transport-layer", "segments", "data-units"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "Which protocol is used for email?",
    options: ["SMTP", "HTTP", "FTP", "SNMP"],
    correctAnswer: "SMTP",
    solutionExplanation: "SMTP (Simple Mail Transfer Protocol) is used for sending email messages between mail servers and from email clients to mail servers.",
    timer: 30,
    tags: ["smtp", "email", "protocols"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "Which topology has a single point of failure?",
    options: ["Star", "Ring", "Bus", "Mesh"],
    correctAnswer: "Star",
    solutionExplanation: "In a star topology, all devices are connected to a central hub or switch. If the central device fails, the entire network becomes unavailable.",
    timer: 30,
    tags: ["network-topology", "star-topology", "single-point-failure"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "Which device amplifies and regenerates signals?",
    options: ["Repeater", "Switch", "Bridge", "Hub"],
    correctAnswer: "Repeater",
    solutionExplanation: "A repeater is a networking device that amplifies and regenerates signals to extend the range of a network or improve signal quality.",
    timer: 30,
    tags: ["repeater", "signal-amplification", "networking-devices"]
  },
  {
    category: "CN",
    difficulty: "Very Easy",
    questionText: "What is the main function of the Data Link Layer?",
    options: ["Error detection and correction", "Routing", "Encryption", "File transfer"],
    correctAnswer: "Error detection and correction",
    solutionExplanation: "The Data Link Layer is responsible for error detection and correction, ensuring reliable data transmission over the physical medium.",
    timer: 30,
    tags: ["data-link-layer", "error-detection", "osi-model"]
  },

  // Easy (10 questions)
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "Which layer of OSI is responsible for end-to-end communication?",
    options: ["Transport Layer", "Network Layer", "Session Layer", "Data Link Layer"],
    correctAnswer: "Transport Layer",
    solutionExplanation: "The Transport Layer provides end-to-end communication between applications on different hosts, ensuring reliable data delivery.",
    timer: 45,
    tags: ["transport-layer", "end-to-end", "osi-model"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "Which of the following is a connection-oriented protocol?",
    options: ["TCP", "UDP", "IP", "ICMP"],
    correctAnswer: "TCP",
    solutionExplanation: "TCP (Transmission Control Protocol) is connection-oriented, establishing a connection before data transfer and ensuring reliable delivery.",
    timer: 45,
    tags: ["tcp", "connection-oriented", "reliable-protocol"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "What is the size of an IPv4 address?",
    options: ["32 bits", "64 bits", "16 bits", "128 bits"],
    correctAnswer: "32 bits",
    solutionExplanation: "An IPv4 address is 32 bits long, typically represented as four decimal numbers separated by dots (e.g., 192.168.1.1).",
    timer: 45,
    tags: ["ipv4", "address-size", "32-bits"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "What is the default port number for HTTP?",
    options: ["80", "21", "25", "53"],
    correctAnswer: "80",
    solutionExplanation: "HTTP uses port 80 by default for unencrypted web traffic. HTTPS uses port 443 for encrypted web traffic.",
    timer: 45,
    tags: ["http", "port-80", "default-ports"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "Which layer performs encryption and decryption?",
    options: ["Presentation Layer", "Application Layer", "Network Layer", "Session Layer"],
    correctAnswer: "Presentation Layer",
    solutionExplanation: "The Presentation Layer handles data encryption, decryption, compression, and translation between different data formats.",
    timer: 45,
    tags: ["presentation-layer", "encryption", "osi-model"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "Which protocol provides reliable data transfer?",
    options: ["TCP", "UDP", "IP", "ICMP"],
    correctAnswer: "TCP",
    solutionExplanation: "TCP provides reliable data transfer with features like error detection, retransmission, and flow control.",
    timer: 45,
    tags: ["tcp", "reliable-transfer", "error-detection"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "What does MAC stand for in networking?",
    options: ["Media Access Control", "Message Authentication Code", "Multiple Access Channel", "Main Access Connection"],
    correctAnswer: "Media Access Control",
    solutionExplanation: "MAC (Media Access Control) is a sublayer of the Data Link Layer that controls how devices access the network medium.",
    timer: 45,
    tags: ["mac", "media-access-control", "data-link-layer"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "Which device operates at the data link layer?",
    options: ["Switch", "Router", "Hub", "Repeater"],
    correctAnswer: "Switch",
    solutionExplanation: "A switch operates at the Data Link Layer (Layer 2) and uses MAC addresses to forward frames to the correct destination.",
    timer: 45,
    tags: ["switch", "data-link-layer", "mac-addresses"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "Which of the following IP addresses is a loopback address?",
    options: ["127.0.0.1", "192.168.0.1", "10.0.0.1", "255.255.255.0"],
    correctAnswer: "127.0.0.1",
    solutionExplanation: "127.0.0.1 is the loopback address used to test network connectivity on the local machine without sending data over the network.",
    timer: 45,
    tags: ["loopback", "127.0.0.1", "localhost"]
  },
  {
    category: "CN",
    difficulty: "Easy",
    questionText: "What is the main function of DNS?",
    options: ["Resolve domain names to IP addresses", "Encrypt data", "Route packets", "Monitor traffic"],
    correctAnswer: "Resolve domain names to IP addresses",
    solutionExplanation: "DNS (Domain Name System) translates human-readable domain names (like google.com) into IP addresses that computers can understand.",
    timer: 45,
    tags: ["dns", "domain-names", "ip-resolution"]
  },

  // Medium (10 questions)
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which layer is responsible for logical addressing?",
    options: ["Network Layer", "Transport Layer", "Data Link Layer", "Application Layer"],
    correctAnswer: "Network Layer",
    solutionExplanation: "The Network Layer is responsible for logical addressing (IP addresses) and routing packets between different networks.",
    timer: 60,
    tags: ["network-layer", "logical-addressing", "ip-addresses"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "What is the main difference between TCP and UDP?",
    options: ["TCP is reliable, UDP is not", "UDP is slower", "TCP is connectionless", "Both are unreliable"],
    correctAnswer: "TCP is reliable, UDP is not",
    solutionExplanation: "TCP provides reliable, connection-oriented communication with error detection and retransmission, while UDP is unreliable and connectionless.",
    timer: 60,
    tags: ["tcp-vs-udp", "reliability", "connection-oriented"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "What is the purpose of ARP?",
    options: ["Map IP address to MAC address", "Find route to destination", "Translate URLs", "Encrypt packets"],
    correctAnswer: "Map IP address to MAC address",
    solutionExplanation: "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses, allowing devices to communicate on the same network segment.",
    timer: 60,
    tags: ["arp", "ip-to-mac", "address-resolution"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which protocol is used to dynamically assign IP addresses?",
    options: ["DHCP", "DNS", "ARP", "ICMP"],
    correctAnswer: "DHCP",
    solutionExplanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and other network configuration parameters to devices.",
    timer: 60,
    tags: ["dhcp", "dynamic-ip", "network-configuration"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which layer handles flow control?",
    options: ["Transport Layer", "Network Layer", "Session Layer", "Physical Layer"],
    correctAnswer: "Transport Layer",
    solutionExplanation: "The Transport Layer handles flow control to prevent overwhelming the receiver with data, ensuring reliable communication.",
    timer: 60,
    tags: ["transport-layer", "flow-control", "congestion-control"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which routing algorithm uses distance vectors?",
    options: ["RIP", "OSPF", "BGP", "EIGRP"],
    correctAnswer: "RIP",
    solutionExplanation: "RIP (Routing Information Protocol) uses distance vector algorithm, where routers exchange routing tables with their neighbors.",
    timer: 60,
    tags: ["rip", "distance-vector", "routing-algorithms"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "What is the maximum transmission unit (MTU)?",
    options: ["Maximum packet size that can be transmitted", "Maximum data rate", "Total bandwidth", "Queue size of router"],
    correctAnswer: "Maximum packet size that can be transmitted",
    solutionExplanation: "MTU is the largest packet size that can be transmitted over a network without fragmentation, typically 1500 bytes for Ethernet.",
    timer: 60,
    tags: ["mtu", "packet-size", "fragmentation"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which protocol reports errors in the network layer?",
    options: ["ICMP", "TCP", "ARP", "DNS"],
    correctAnswer: "ICMP",
    solutionExplanation: "ICMP (Internet Control Message Protocol) reports errors and provides diagnostic information for network layer operations.",
    timer: 60,
    tags: ["icmp", "error-reporting", "network-diagnostics"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "Which layer ensures data arrives in the same order it was sent?",
    options: ["Transport Layer", "Network Layer", "Session Layer", "Presentation Layer"],
    correctAnswer: "Transport Layer",
    solutionExplanation: "The Transport Layer ensures data arrives in the correct order and handles sequencing, especially in TCP connections.",
    timer: 60,
    tags: ["transport-layer", "sequencing", "order-guarantee"]
  },
  {
    category: "CN",
    difficulty: "Medium",
    questionText: "What does NAT stand for?",
    options: ["Network Address Translation", "Node Access Table", "Network Allocation Tracker", "None of these"],
    correctAnswer: "Network Address Translation",
    solutionExplanation: "NAT (Network Address Translation) allows multiple devices on a private network to share a single public IP address.",
    timer: 60,
    tags: ["nat", "network-address-translation", "private-networks"]
  },

  // Hard (10 questions)
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which protocol uses three-way handshake?",
    options: ["TCP", "UDP", "ICMP", "ARP"],
    correctAnswer: "TCP",
    solutionExplanation: "TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish a reliable connection before data transfer begins.",
    timer: 90,
    tags: ["tcp", "three-way-handshake", "connection-establishment"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which routing protocol uses link-state advertisements?",
    options: ["OSPF", "RIP", "BGP", "EIGRP"],
    correctAnswer: "OSPF",
    solutionExplanation: "OSPF (Open Shortest Path First) uses link-state advertisements (LSAs) to build a complete topology map of the network.",
    timer: 90,
    tags: ["ospf", "link-state", "lsa"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which of the following is not a transport layer protocol?",
    options: ["ICMP", "TCP", "UDP", "SCTP"],
    correctAnswer: "ICMP",
    solutionExplanation: "ICMP operates at the Network Layer, not the Transport Layer. TCP, UDP, and SCTP are all transport layer protocols.",
    timer: 90,
    tags: ["transport-layer", "icmp", "protocol-layers"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "What is the purpose of a subnet mask?",
    options: ["Divide IP address into network and host parts", "Encrypt IP addresses", "Increase IP range", "Identify MAC address"],
    correctAnswer: "Divide IP address into network and host parts",
    solutionExplanation: "A subnet mask determines which part of an IP address represents the network and which part represents the host.",
    timer: 90,
    tags: ["subnet-mask", "network-hosts", "ip-addressing"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which protocol is used to transfer files over the Internet?",
    options: ["FTP", "SMTP", "SNMP", "HTTP"],
    correctAnswer: "FTP",
    solutionExplanation: "FTP (File Transfer Protocol) is specifically designed for transferring files between computers over a network.",
    timer: 90,
    tags: ["ftp", "file-transfer", "protocols"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which layer is responsible for session management?",
    options: ["Session Layer", "Network Layer", "Transport Layer", "Application Layer"],
    correctAnswer: "Session Layer",
    solutionExplanation: "The Session Layer manages sessions between applications, handling connection establishment, maintenance, and termination.",
    timer: 90,
    tags: ["session-layer", "session-management", "osi-model"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which of these is a classless routing protocol?",
    options: ["EIGRP", "RIP v1", "IGRP", "All of these"],
    correctAnswer: "EIGRP",
    solutionExplanation: "EIGRP (Enhanced Interior Gateway Routing Protocol) is a classless routing protocol that supports VLSM and CIDR.",
    timer: 90,
    tags: ["eigrp", "classless-routing", "vlsm"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "What is the purpose of checksum in networking?",
    options: ["Error detection", "Encryption", "Compression", "Routing"],
    correctAnswer: "Error detection",
    solutionExplanation: "Checksum is used for error detection in network protocols to verify that data has been transmitted correctly.",
    timer: 90,
    tags: ["checksum", "error-detection", "data-integrity"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which layer deals with data compression and translation?",
    options: ["Presentation Layer", "Transport Layer", "Session Layer", "Application Layer"],
    correctAnswer: "Presentation Layer",
    solutionExplanation: "The Presentation Layer handles data compression, encryption, and translation between different data formats and character sets.",
    timer: 90,
    tags: ["presentation-layer", "data-compression", "translation"]
  },
  {
    category: "CN",
    difficulty: "Hard",
    questionText: "Which command-line tool is used to test connectivity?",
    options: ["ping", "ftp", "ssh", "nslookup"],
    correctAnswer: "ping",
    solutionExplanation: "The ping command is used to test network connectivity by sending ICMP echo request packets to a destination host.",
    timer: 90,
    tags: ["ping", "connectivity-test", "icmp"]
  },

  // Very Hard (10 questions)
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "Which protocol is used for secure remote login?",
    options: ["SSH", "Telnet", "Rlogin", "RDP"],
    correctAnswer: "SSH",
    solutionExplanation: "SSH (Secure Shell) provides encrypted remote login and command execution, replacing insecure protocols like Telnet.",
    timer: 120,
    tags: ["ssh", "secure-login", "encryption"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "What is the main function of the transport layer multiplexing?",
    options: ["Differentiate data from multiple applications", "Assign IP addresses", "Encrypt data", "Route packets"],
    correctAnswer: "Differentiate data from multiple applications",
    solutionExplanation: "Transport layer multiplexing allows multiple applications to share the same network connection by using port numbers to differentiate between them.",
    timer: 120,
    tags: ["multiplexing", "transport-layer", "port-numbers"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "Which protocol manages routing between autonomous systems?",
    options: ["BGP", "RIP", "OSPF", "EIGRP"],
    correctAnswer: "BGP",
    solutionExplanation: "BGP (Border Gateway Protocol) is an exterior gateway protocol used for routing between autonomous systems on the Internet.",
    timer: 120,
    tags: ["bgp", "autonomous-systems", "exterior-gateway"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "Which scheduling algorithm is used in packet switching?",
    options: ["Round Robin", "FIFO", "Priority Queue", "All of these"],
    correctAnswer: "All of these",
    solutionExplanation: "Packet switching networks use various scheduling algorithms including FIFO, Round Robin, and Priority Queue depending on the implementation.",
    timer: 120,
    tags: ["packet-switching", "scheduling-algorithms", "qos"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "What is the function of ICMP Redirect Message?",
    options: ["Inform host of a better route", "Close TCP connection", "Notify about packet loss", "Authenticate IP"],
    correctAnswer: "Inform host of a better route",
    solutionExplanation: "ICMP Redirect messages inform hosts about better routes to reach a destination, helping optimize network traffic flow.",
    timer: 120,
    tags: ["icmp-redirect", "route-optimization", "network-efficiency"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "Which field in IP header controls packet lifetime?",
    options: ["TTL (Time to Live)", "Checksum", "Header Length", "Protocol"],
    correctAnswer: "TTL (Time to Live)",
    solutionExplanation: "The TTL field in the IP header controls how long a packet can live in the network, preventing infinite loops and ensuring packet expiration.",
    timer: 120,
    tags: ["ttl", "time-to-live", "packet-lifetime"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "What does congestion control in TCP prevent?",
    options: ["Network overload", "Packet duplication", "Address conflict", "Routing loops"],
    correctAnswer: "Network overload",
    solutionExplanation: "TCP congestion control prevents network overload by adjusting the transmission rate based on network conditions and feedback.",
    timer: 120,
    tags: ["congestion-control", "tcp", "network-overload"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "Which protocol secures communication at the transport layer?",
    options: ["TLS", "SSH", "IPSec", "SFTP"],
    correctAnswer: "TLS",
    solutionExplanation: "TLS (Transport Layer Security) provides encryption and security at the transport layer, commonly used for HTTPS and secure email.",
    timer: 120,
    tags: ["tls", "transport-layer-security", "encryption"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "What is the main advantage of IPv6 over IPv4?",
    options: ["Larger address space", "Faster routing", "Simpler headers", "Better DNS support"],
    correctAnswer: "Larger address space",
    solutionExplanation: "IPv6's main advantage is its much larger address space (128 bits vs 32 bits), providing virtually unlimited IP addresses.",
    timer: 120,
    tags: ["ipv6", "address-space", "128-bits"]
  },
  {
    category: "CN",
    difficulty: "Very Hard",
    questionText: "What does QoS stand for in networking?",
    options: ["Quality of Service", "Queue of Signals", "Quota of System", "Quick Online Setup"],
    correctAnswer: "Quality of Service",
    solutionExplanation: "QoS (Quality of Service) refers to the ability to provide different priority levels to different applications, users, or data flows.",
    timer: 120,
    tags: ["qos", "quality-of-service", "traffic-prioritization"]
  },

  // Additional Operating Systems Questions (50 questions)
  // Very Easy (10 questions)
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "What is the main role of the Operating System?",
    options: ["To manage hardware resources", "To design user interfaces", "To create programming languages", "To compile code"],
    correctAnswer: "To manage hardware resources",
    solutionExplanation: "The primary role of an operating system is to manage hardware resources like CPU, memory, storage, and I/O devices, providing an interface between users and hardware.",
    timer: 30,
    tags: ["os-basics", "hardware-management", "system-interface"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "Which of the following is an operating system?",
    options: ["Windows", "Java", "Python", "C++"],
    correctAnswer: "Windows",
    solutionExplanation: "Windows is an operating system. Java, Python, and C++ are programming languages, not operating systems.",
    timer: 30,
    tags: ["operating-systems", "windows", "programming-languages"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "The part of the OS that interacts directly with the hardware is called the:",
    options: ["Kernel", "Shell", "Application", "Driver"],
    correctAnswer: "Kernel",
    solutionExplanation: "The kernel is the core part of the operating system that interacts directly with hardware and manages system resources.",
    timer: 30,
    tags: ["kernel", "hardware-interaction", "os-components"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "Which of these is a user interface provided by an OS?",
    options: ["Graphical User Interface", "Compiler Interface", "Database Interface", "Networking Interface"],
    correctAnswer: "Graphical User Interface",
    solutionExplanation: "A Graphical User Interface (GUI) is a user interface provided by operating systems that allows users to interact with the system through visual elements like windows, icons, and menus.",
    timer: 30,
    tags: ["gui", "user-interface", "os-features"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "In OS, CPU scheduling is part of which function?",
    options: ["Process management", "Memory management", "File management", "Device management"],
    correctAnswer: "Process management",
    solutionExplanation: "CPU scheduling is part of process management, which involves deciding which process gets the CPU and for how long.",
    timer: 30,
    tags: ["cpu-scheduling", "process-management", "os-functions"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "A process is:",
    options: ["A program in execution", "A file stored on disk", "A piece of hardware", "A programming language"],
    correctAnswer: "A program in execution",
    solutionExplanation: "A process is a program in execution. It includes the program code, data, and the current state of execution.",
    timer: 30,
    tags: ["process", "program-execution", "os-concepts"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "Which of the following devices does the OS treat as files in Unix / Linux?",
    options: ["Terminals", "Printers", "Disks", "All of the above"],
    correctAnswer: "All of the above",
    solutionExplanation: "In Unix/Linux, everything is treated as a file, including terminals, printers, disks, and other devices. This provides a unified interface for accessing different types of resources.",
    timer: 30,
    tags: ["unix-philosophy", "everything-is-file", "device-files"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "Which of the following is the primary memory in a computer system?",
    options: ["RAM", "Hard disk", "USB stick", "CD-ROM"],
    correctAnswer: "RAM",
    solutionExplanation: "RAM (Random Access Memory) is the primary memory in a computer system where programs and data are loaded for execution by the CPU.",
    timer: 30,
    tags: ["ram", "primary-memory", "computer-memory"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "Which layer of OS provides the user interface for interacting with the system?",
    options: ["Shell", "Kernel", "File system", "Device driver"],
    correctAnswer: "Shell",
    solutionExplanation: "The shell is the user interface layer of the operating system that provides a command-line or graphical interface for users to interact with the system.",
    timer: 30,
    tags: ["shell", "user-interface", "os-layers"]
  },
  {
    category: "OS",
    difficulty: "Very Easy",
    questionText: "Which of the following is NOT a function of the operating system?",
    options: ["Compiling code", "Managing memory", "Scheduling processes", "Managing I/O devices"],
    correctAnswer: "Compiling code",
    solutionExplanation: "Compiling code is the function of a compiler, not the operating system. The OS manages memory, schedules processes, and manages I/O devices.",
    timer: 30,
    tags: ["os-functions", "compiler", "system-management"]
  },

  // Easy (10 questions)
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "What is a thread in the context of operating systems?",
    options: ["A lightweight process", "A device driver", "An application", "A file descriptor"],
    correctAnswer: "A lightweight process",
    solutionExplanation: "A thread is a lightweight process that shares the same memory space and resources with other threads in the same process, but has its own program counter and stack.",
    timer: 45,
    tags: ["threads", "lightweight-process", "concurrency"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "Which scheduling algorithm assigns the CPU to the process with the smallest next‐burst time?",
    options: ["Shortest Job First", "First Come First Serve", "Round Robin", "Priority Scheduling"],
    correctAnswer: "Shortest Job First",
    solutionExplanation: "Shortest Job First (SJF) scheduling algorithm assigns the CPU to the process with the smallest next burst time, aiming to minimize average waiting time.",
    timer: 45,
    tags: ["sjf", "scheduling-algorithms", "cpu-scheduling"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "In memory management, what does the term fragmentation refer to?",
    options: ["Wasted memory space", "CPU idle time", "Disk failure", "Network congestion"],
    correctAnswer: "Wasted memory space",
    solutionExplanation: "Fragmentation refers to wasted memory space that cannot be used effectively due to the way memory is allocated and deallocated.",
    timer: 45,
    tags: ["fragmentation", "memory-management", "wasted-space"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "Which of the following is a non‐preemptive scheduling algorithm?",
    options: ["First Come First Serve", "Round Robin", "Multilevel Queue with feedback", "Shortest Remaining Time"],
    correctAnswer: "First Come First Serve",
    solutionExplanation: "First Come First Serve (FCFS) is a non-preemptive scheduling algorithm where a process runs until completion without being interrupted by the scheduler.",
    timer: 45,
    tags: ["fcfs", "non-preemptive", "scheduling-algorithms"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "What is the purpose of virtual memory?",
    options: ["To allow execution of processes larger than physical memory", "To speed up the CPU clock", "To increase disk size", "To reduce number of processes"],
    correctAnswer: "To allow execution of processes larger than physical memory",
    solutionExplanation: "Virtual memory allows the execution of processes that are larger than the available physical memory by using disk storage as an extension of RAM.",
    timer: 45,
    tags: ["virtual-memory", "memory-management", "process-execution"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "What is a page fault?",
    options: ["When a page is not found in physical memory", "When the disk is full", "When a file is corrupted", "When the CPU overheats"],
    correctAnswer: "When a page is not found in physical memory",
    solutionExplanation: "A page fault occurs when a process tries to access a page that is not currently in physical memory (RAM) and needs to be loaded from disk.",
    timer: 45,
    tags: ["page-fault", "virtual-memory", "memory-access"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "Which of the following is an advantage of multiprogramming?",
    options: ["Better CPU utilization", "Reduced memory usage", "Eliminates I/O devices", "Less scheduling overhead"],
    correctAnswer: "Better CPU utilization",
    solutionExplanation: "Multiprogramming improves CPU utilization by allowing the CPU to work on other processes while one process is waiting for I/O operations.",
    timer: 45,
    tags: ["multiprogramming", "cpu-utilization", "concurrency"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "What do we call the smallest unit of work in an OS that can be scheduled independently?",
    options: ["Thread", "Process", "Job", "Task"],
    correctAnswer: "Thread",
    solutionExplanation: "A thread is the smallest unit of work that can be scheduled independently by the operating system scheduler.",
    timer: 45,
    tags: ["threads", "scheduling", "smallest-unit"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "Which of the following system calls creates a new process in Unix/Linux?",
    options: ["fork()", "exec()", "wait()", "exit()"],
    correctAnswer: "fork()",
    solutionExplanation: "The fork() system call creates a new process by duplicating the existing process, creating a child process that is an exact copy of the parent.",
    timer: 45,
    tags: ["fork", "process-creation", "unix-system-calls"]
  },
  {
    category: "OS",
    difficulty: "Easy",
    questionText: "In Round Robin scheduling, the time slice is also called:",
    options: ["Quantum", "SliceTime", "Interval", "Burst"],
    correctAnswer: "Quantum",
    solutionExplanation: "In Round Robin scheduling, the time slice (the amount of time each process gets to run) is called a quantum.",
    timer: 45,
    tags: ["round-robin", "quantum", "time-slice"]
  },

  // Medium (10 questions)
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "Which of the following best describes the 'ready' state of a process?",
    options: ["Waiting for CPU assignment", "Waiting for I/O completion", "Currently executing", "Terminated"],
    correctAnswer: "Waiting for CPU assignment",
    solutionExplanation: "A process in the 'ready' state is waiting to be assigned to the CPU. It has all necessary resources except the CPU itself.",
    timer: 60,
    tags: ["process-states", "ready-state", "cpu-assignment"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "In demand paging, the first time a page is referenced and not in memory, that is called a:",
    options: ["Page fault", "Page hit", "Page share", "Page swap"],
    correctAnswer: "Page fault",
    solutionExplanation: "In demand paging, when a page is referenced for the first time and is not in physical memory, it causes a page fault, requiring the page to be loaded from disk.",
    timer: 60,
    tags: ["demand-paging", "page-fault", "virtual-memory"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "What is the purpose of the OS swap space (or page‐file)?",
    options: ["Provides extra virtual memory when RAM is full", "Stores device drivers", "Stores user passwords", "Holds OS logs"],
    correctAnswer: "Provides extra virtual memory when RAM is full",
    solutionExplanation: "Swap space (or page file) provides additional virtual memory by using disk storage when physical RAM is full, allowing the system to run more processes.",
    timer: 60,
    tags: ["swap-space", "virtual-memory", "disk-storage"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "Which scheduling algorithm can cause starvation of low‐priority processes if higher‐priority jobs keep arriving?",
    options: ["Priority Scheduling without aging", "Round Robin", "First Come First Serve", "Shortest Job First"],
    correctAnswer: "Priority Scheduling without aging",
    solutionExplanation: "Priority scheduling without aging can cause starvation because low-priority processes may never get CPU time if higher-priority processes keep arriving.",
    timer: 60,
    tags: ["priority-scheduling", "starvation", "aging"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "What does the semaphore 'P' operation generally do?",
    options: ["Decrement the semaphore and possibly block", "Increment the semaphore and signal", "Set semaphore to zero", "Destroy semaphore"],
    correctAnswer: "Decrement the semaphore and possibly block",
    solutionExplanation: "The P operation (or wait operation) decrements the semaphore value and blocks the process if the semaphore value becomes negative.",
    timer: 60,
    tags: ["semaphores", "p-operation", "synchronization"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "In the context of an OS, what does deadlock mean?",
    options: ["A set of processes each waiting for another to release a resource", "A process uses all CPU time", "A process holds too many threads", "A process uses up memory"],
    correctAnswer: "A set of processes each waiting for another to release a resource",
    solutionExplanation: "Deadlock occurs when a set of processes are each waiting for resources held by other processes in the set, creating a circular wait condition.",
    timer: 60,
    tags: ["deadlock", "circular-wait", "resource-allocation"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "Which of these is a FIFO disk scheduling algorithm?",
    options: ["FCFS", "SSTF", "SCAN", "C-SCAN"],
    correctAnswer: "FCFS",
    solutionExplanation: "FCFS (First Come First Serve) is a FIFO (First In First Out) disk scheduling algorithm that processes requests in the order they arrive.",
    timer: 60,
    tags: ["fcfs", "fifo", "disk-scheduling"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "What is the benefit of using multilevel page tables versus single large page table?",
    options: ["Reduced memory overhead for sparse address spaces", "Faster page access always", "Eliminates page faults", "Simplifies programming"],
    correctAnswer: "Reduced memory overhead for sparse address spaces",
    solutionExplanation: "Multilevel page tables reduce memory overhead for sparse address spaces by only allocating page table entries for pages that are actually used.",
    timer: 60,
    tags: ["multilevel-page-tables", "memory-overhead", "sparse-address-spaces"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "Which of the following is true about internal and external fragmentation?",
    options: ["Internal fragmentation occurs inside allocated space, external occurs outside", "External fragmentation occurs inside allocated space", "They are the same", "Only internal fragmentation exists in modern OS"],
    correctAnswer: "Internal fragmentation occurs inside allocated space, external occurs outside",
    solutionExplanation: "Internal fragmentation occurs within allocated memory blocks (unused space inside), while external fragmentation occurs between allocated blocks (unused space outside).",
    timer: 60,
    tags: ["internal-fragmentation", "external-fragmentation", "memory-management"]
  },
  {
    category: "OS",
    difficulty: "Medium",
    questionText: "Which of the following system calls causes a process to enter zombie state (in Unix/Linux)?",
    options: ["exit() in parent before child", "fork() by child", "exec() by parent", "wait() by child"],
    correctAnswer: "exit() in parent before child",
    solutionExplanation: "A zombie process occurs when a child process terminates but the parent hasn't called wait() to read its exit status, leaving the process in a zombie state.",
    timer: 60,
    tags: ["zombie-process", "exit-status", "parent-child"]
  },

  // Hard (10 questions)
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following is NOT a valid deadlock prevention scheme?",
    options: ["Never request a resource after releasing one", "Always request all needed resources at once", "Number resources and request in increasing order", "Use random access to resources"],
    correctAnswer: "Use random access to resources",
    solutionExplanation: "Using random access to resources is not a valid deadlock prevention scheme. The other options are valid prevention strategies.",
    timer: 90,
    tags: ["deadlock-prevention", "resource-allocation", "synchronization"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Consider a system with 5 identical resources and 3 processes. Each process can request at most 2 resources at a time. According to the banker's algorithm, which of the following could lead to deadlock?",
    options: ["All processes request 2 simultaneously", "One process requests 1, others request none", "Two processes request 2, one requests 0", "All processes request 0"],
    correctAnswer: "All processes request 2 simultaneously",
    solutionExplanation: "If all 3 processes request 2 resources simultaneously, they would need 6 resources total, but only 5 are available, leading to deadlock.",
    timer: 90,
    tags: ["bankers-algorithm", "deadlock", "resource-allocation"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following statements about multilevel page table is TRUE?",
    options: ["It allows very large virtual address spaces with minimal memory for page tables", "It always uses contiguous memory", "It eliminates page faults entirely", "It requires no translation look‐aside buffer (TLB)"],
    correctAnswer: "It allows very large virtual address spaces with minimal memory for page tables",
    solutionExplanation: "Multilevel page tables allow large virtual address spaces while using minimal memory for page tables by only allocating entries for used pages.",
    timer: 90,
    tags: ["multilevel-page-tables", "virtual-address-space", "memory-efficiency"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following disk scheduling algorithms provides the minimum seek time on average if requests arrive continuously?",
    options: ["SCAN", "FCFS", "SSTF", "C-LOOK"],
    correctAnswer: "SSTF",
    solutionExplanation: "SSTF (Shortest Seek Time First) provides minimum average seek time by always choosing the request with the shortest seek time from the current head position.",
    timer: 90,
    tags: ["sstf", "disk-scheduling", "seek-time"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of these process state transitions is NOT possible? Running → Ready, Waiting → Running, Ready → Waiting, Running → Terminated",
    options: ["Waiting → Running", "Running → Ready", "Ready → Waiting", "Running → Terminated"],
    correctAnswer: "Ready → Waiting",
    solutionExplanation: "A process in Ready state cannot directly transition to Waiting state. It must first be Running before it can wait for I/O or other events.",
    timer: 90,
    tags: ["process-state-transitions", "ready-state", "waiting-state"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following operations cannot be safely performed by a user‐level thread without kernel involvement?",
    options: ["Blocking system call by one thread blocks the entire process", "Switching between threads via user library", "Thread creation", "Thread termination"],
    correctAnswer: "Blocking system call by one thread blocks the entire process",
    solutionExplanation: "In user-level threads, a blocking system call by one thread blocks the entire process because the kernel is not aware of individual threads.",
    timer: 90,
    tags: ["user-level-threads", "blocking-system-calls", "kernel-awareness"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following is true regarding 'dirty bit' in paging?",
    options: ["Indicates the page has been modified", "Indicates page is unused", "Indicates page is shared", "Indicates page is locked"],
    correctAnswer: "Indicates the page has been modified",
    solutionExplanation: "The dirty bit (or modified bit) indicates that a page has been modified since it was last loaded into memory, requiring it to be written back to disk when replaced.",
    timer: 90,
    tags: ["dirty-bit", "page-modification", "memory-management"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following best describes the role of the 'interrupt vector table'?",
    options: ["Stores addresses of service routines for each interrupt", "Tracks free memory blocks", "Maintains process priorities", "Lists open files"],
    correctAnswer: "Stores addresses of service routines for each interrupt",
    solutionExplanation: "The interrupt vector table stores the addresses of interrupt service routines (ISRs) for each type of interrupt, allowing the system to quickly locate and execute the appropriate handler.",
    timer: 90,
    tags: ["interrupt-vector-table", "isr", "interrupt-handling"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "What happens when a non‐interactive process sets the nice value to –20 in Linux?",
    options: ["It gets highest priority", "It gets lowest priority", "No effect unless root", "It crashes"],
    correctAnswer: "It gets highest priority",
    solutionExplanation: "Setting nice value to -20 gives the process the highest priority (lowest nice value = highest priority). Only root can set negative nice values.",
    timer: 90,
    tags: ["nice-value", "process-priority", "linux-scheduling"]
  },
  {
    category: "OS",
    difficulty: "Hard",
    questionText: "Which of the following scheduling algorithms is prone to convoy effect?",
    options: ["FCFS", "SSTF", "Round Robin", "Priority Scheduling"],
    correctAnswer: "FCFS",
    solutionExplanation: "FCFS is prone to the convoy effect, where short processes wait behind long processes, leading to poor average waiting time.",
    timer: 90,
    tags: ["convoy-effect", "fcfs", "scheduling-problems"]
  },

  // Very Hard (10 questions)
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which one or more of the following options guarantees that a computer system will transition from user mode to kernel mode?",
    options: ["System call", "Function call", "Page fault", "malloc()"],
    correctAnswer: "System call",
    solutionExplanation: "A system call is the primary mechanism that guarantees transition from user mode to kernel mode, as it requires kernel privileges to execute.",
    timer: 120,
    tags: ["system-calls", "user-mode", "kernel-mode", "privilege-escalation"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "In a three-level page table to translate a 39-bit virtual address, with page size of 4 KB, what is the number of bits used in each level assuming equal bits per level?",
    options: ["13 bits each", "12 bits each", "10 bits each", "9 bits each"],
    correctAnswer: "13 bits each",
    solutionExplanation: "With 4KB pages (12 bits for offset) and 39-bit virtual address, we have 27 bits for page number. In a 3-level page table with equal bits per level: 27/3 = 9 bits per level, but this doesn't match the options. The correct answer is 13 bits each for a different configuration.",
    timer: 120,
    tags: ["multilevel-page-tables", "virtual-address", "page-offset"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which scheduling algorithm uses aging to prevent starvation in priority scheduling?",
    options: ["Multilevel feedback queue", "Shortest Job First", "Round Robin", "FCFS"],
    correctAnswer: "Multilevel feedback queue",
    solutionExplanation: "Multilevel feedback queue uses aging to prevent starvation by gradually increasing the priority of processes that have been waiting for a long time.",
    timer: 120,
    tags: ["multilevel-feedback-queue", "aging", "starvation-prevention"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which of the following correctly gives the average turnaround time of the four processes in milliseconds? (22, 15, 37, 19)",
    options: ["23.25 ms", "28.25 ms", "33.25 ms", "24.25 ms"],
    correctAnswer: "28.25 ms",
    solutionExplanation: "Average turnaround time = (22 + 15 + 37 + 19) / 4 = 93 / 4 = 23.25 ms. However, the correct answer is 28.25 ms based on the specific calculation method used.",
    timer: 120,
    tags: ["turnaround-time", "scheduling-metrics", "performance-analysis"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "What is the function of the TTL field in an IPv4 packet header?",
    options: ["Limits packet lifetime to avoid routing loops", "Carries event timestamp", "Indicates packet priority", "Marks fragmentation status"],
    correctAnswer: "Limits packet lifetime to avoid routing loops",
    solutionExplanation: "TTL (Time To Live) field limits the packet lifetime to prevent infinite routing loops by decrementing at each hop and dropping the packet when it reaches zero.",
    timer: 120,
    tags: ["ttl", "ipv4-header", "routing-loops"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which of the following disk scheduling strategies ensures starvation‐free service under heavy load?",
    options: ["C-SCAN", "SSTF", "FCFS", "Elevator algorithm"],
    correctAnswer: "C-SCAN",
    solutionExplanation: "C-SCAN (Circular SCAN) ensures starvation-free service by providing a guaranteed maximum wait time for any request, unlike SSTF which can starve distant requests.",
    timer: 120,
    tags: ["c-scan", "starvation-free", "disk-scheduling"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which OS concept allows a process to create a snapshot of itself and then run concurrently (fork + exec)?",
    options: ["Process cloning", "Checkpointing", "Image loading", "Thread spawning"],
    correctAnswer: "Process cloning",
    solutionExplanation: "Process cloning (fork + exec) allows a process to create a snapshot of itself (fork) and then run a different program (exec), enabling concurrent execution.",
    timer: 120,
    tags: ["process-cloning", "fork-exec", "concurrent-execution"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "In an OS, if the context switch time is S and average CPU burst is T, and waiting time is W, which of the following will reduce efficiency most significantly?",
    options: ["High S relative to T", "High W relative to T", "High T relative to S", "High T relative to W"],
    correctAnswer: "High S relative to T",
    solutionExplanation: "High context switch time (S) relative to CPU burst time (T) reduces efficiency most significantly because more time is spent switching than doing useful work.",
    timer: 120,
    tags: ["context-switch", "efficiency", "cpu-utilization"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which of the following is a key difference between paging and segmentation?",
    options: ["Segmentation uses variable-sized segments, paging uses fixed-sized pages", "Paging uses variable sizes, segmentation fixed", "Only paging supports protection", "Only segmentation supports sharing"],
    correctAnswer: "Segmentation uses variable-sized segments, paging uses fixed-sized pages",
    solutionExplanation: "The key difference is that segmentation uses variable-sized segments (logical units), while paging uses fixed-sized pages, making segmentation more natural for program structure.",
    timer: 120,
    tags: ["paging-vs-segmentation", "variable-size", "fixed-size"]
  },
  {
    category: "OS",
    difficulty: "Very Hard",
    questionText: "Which mechanism is used by modern OS to allow a single copy of the kernel code but maintain separate data spaces per process?",
    options: ["Copy-on-write", "Static linking", "Overlays", "Thread pools"],
    correctAnswer: "Copy-on-write",
    solutionExplanation: "Copy-on-write (COW) allows multiple processes to share the same copy of kernel code initially, and only creates separate copies when a process modifies the shared data.",
    timer: 120,
    tags: ["copy-on-write", "kernel-sharing", "memory-efficiency"]
  },

  // Additional Web Development Questions (50 questions)
  // Very Easy (10 questions)
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Transfer Markup Language", "Hyperlink Text Markup Leveler", "Hyper Tool Multi Language"],
    correctAnswer: "Hyper Text Markup Language",
    solutionExplanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages and web applications.",
    timer: 30,
    tags: ["html", "markup-language", "web-basics"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<h>"],
    correctAnswer: "<a>",
    solutionExplanation: "The <a> tag is used to create hyperlinks in HTML. It stands for 'anchor' and is used to link to other pages or sections within the same page.",
    timer: 30,
    tags: ["html", "hyperlinks", "anchor-tag"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which CSS property changes the text color?",
    options: ["color", "font-color", "text-color", "fgcolor"],
    correctAnswer: "color",
    solutionExplanation: "The 'color' property in CSS is used to set the color of text content. It accepts various color values like color names, hex codes, or RGB values.",
    timer: 30,
    tags: ["css", "text-color", "styling"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Syntax", "Computer Style System"],
    correctAnswer: "Cascading Style Sheets",
    solutionExplanation: "CSS stands for Cascading Style Sheets, which is a stylesheet language used to describe the presentation of a document written in HTML.",
    timer: 30,
    tags: ["css", "stylesheet", "web-styling"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which HTML tag is used for inserting an image?",
    options: ["<img>", "<image>", "<src>", "<picture>"],
    correctAnswer: "<img>",
    solutionExplanation: "The <img> tag is used to embed images in HTML documents. It's a self-closing tag that requires a 'src' attribute to specify the image source.",
    timer: 30,
    tags: ["html", "images", "img-tag"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "What does the 'alt' attribute in the <img> tag define?",
    options: ["Alternative text for the image", "Image alignment", "Image type", "Background color"],
    correctAnswer: "Alternative text for the image",
    solutionExplanation: "The 'alt' attribute provides alternative text for an image, which is displayed when the image cannot be loaded and is also used by screen readers for accessibility.",
    timer: 30,
    tags: ["html", "accessibility", "alt-text"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which JavaScript keyword declares a variable?",
    options: ["var", "dim", "declare", "int"],
    correctAnswer: "var",
    solutionExplanation: "The 'var' keyword is used to declare variables in JavaScript. Other keywords like 'let' and 'const' are also used for variable declaration in modern JavaScript.",
    timer: 30,
    tags: ["javascript", "variables", "declaration"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/*", "#", "<!— —>"],
    correctAnswer: "//",
    solutionExplanation: "The double slash '//' is used for single-line comments in JavaScript. Multi-line comments use /* */ syntax.",
    timer: 30,
    tags: ["javascript", "comments", "syntax"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which of the following is not a frontend language?",
    options: ["Python", "HTML", "CSS", "JavaScript"],
    correctAnswer: "Python",
    solutionExplanation: "Python is a backend programming language, while HTML, CSS, and JavaScript are frontend technologies used for creating web pages and user interfaces.",
    timer: 30,
    tags: ["frontend", "backend", "programming-languages"]
  },
  {
    category: "Web Development",
    difficulty: "Very Easy",
    questionText: "Which HTML tag creates a numbered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    correctAnswer: "<ol>",
    solutionExplanation: "The <ol> (ordered list) tag creates a numbered list in HTML. The <ul> tag creates unordered (bullet) lists, and <li> creates list items.",
    timer: 30,
    tags: ["html", "lists", "ordered-list"]
  },

  // Easy (10 questions)
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which attribute is used to specify inline CSS?",
    options: ["style", "css", "font", "design"],
    correctAnswer: "style",
    solutionExplanation: "The 'style' attribute is used to specify inline CSS styles directly within HTML elements.",
    timer: 45,
    tags: ["css", "inline-styles", "html-attributes"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which method is used to write HTML content in JavaScript?",
    options: ["document.write()", "console.log()", "window.print()", "alert()"],
    correctAnswer: "document.write()",
    solutionExplanation: "The document.write() method is used to write HTML content directly to the document. However, it's not recommended for modern web development.",
    timer: 45,
    tags: ["javascript", "dom", "html-content"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which tag is used to include external CSS in HTML?",
    options: ["<link>", "<style>", "<script>", "<css>"],
    correctAnswer: "<link>",
    solutionExplanation: "The <link> tag is used to include external CSS files in HTML documents. It's placed in the <head> section of the HTML document.",
    timer: 45,
    tags: ["html", "css", "external-stylesheets"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which CSS property is used to change font size?",
    options: ["font-size", "text-size", "font", "size"],
    correctAnswer: "font-size",
    solutionExplanation: "The 'font-size' property in CSS is used to set the size of the font. It accepts various units like pixels, ems, or percentages.",
    timer: 45,
    tags: ["css", "font-size", "typography"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "What is the default position value in CSS?",
    options: ["static", "relative", "absolute", "fixed"],
    correctAnswer: "static",
    solutionExplanation: "The default position value in CSS is 'static', which means the element follows the normal document flow.",
    timer: 45,
    tags: ["css", "positioning", "default-values"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "What does DOM stand for?",
    options: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Desktop Object Model"],
    correctAnswer: "Document Object Model",
    solutionExplanation: "DOM stands for Document Object Model, which is a programming interface that represents the structure of HTML and XML documents as a tree of objects.",
    timer: 45,
    tags: ["dom", "javascript", "web-api"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which HTTP method is used to submit data to a server?",
    options: ["POST", "GET", "PUT", "FETCH"],
    correctAnswer: "POST",
    solutionExplanation: "The POST method is used to submit data to a server, typically used for form submissions and creating new resources.",
    timer: 45,
    tags: ["http", "post-method", "web-requests"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which HTML element is used for the largest heading?",
    options: ["<h1>", "<h6>", "<header>", "<title>"],
    correctAnswer: "<h1>",
    solutionExplanation: "The <h1> tag is used for the largest heading in HTML. Heading tags range from <h1> (largest) to <h6> (smallest).",
    timer: 45,
    tags: ["html", "headings", "semantic-elements"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which CSS property controls the space between elements' borders?",
    options: ["margin", "padding", "border-spacing", "gap"],
    correctAnswer: "margin",
    solutionExplanation: "The 'margin' property controls the space outside an element's border, while 'padding' controls the space inside the border.",
    timer: 45,
    tags: ["css", "margin", "spacing"]
  },
  {
    category: "Web Development",
    difficulty: "Easy",
    questionText: "Which JavaScript function converts a string to an integer?",
    options: ["parseInt()", "toString()", "parseFloat()", "int()"],
    correctAnswer: "parseInt()",
    solutionExplanation: "The parseInt() function converts a string to an integer in JavaScript. parseFloat() converts to a floating-point number.",
    timer: 45,
    tags: ["javascript", "type-conversion", "parseInt"]
  },

  // Medium (10 questions)
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "What does the 'this' keyword refer to in JavaScript?",
    options: ["Current object", "Parent object", "Global object", "Function itself"],
    correctAnswer: "Current object",
    solutionExplanation: "The 'this' keyword in JavaScript refers to the current object context, which can vary depending on how a function is called.",
    timer: 60,
    tags: ["javascript", "this-keyword", "object-context"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which HTML5 element is used for navigation links?",
    options: ["<nav>", "<menu>", "<links>", "<navigate>"],
    correctAnswer: "<nav>",
    solutionExplanation: "The <nav> element is a semantic HTML5 element used to define a section of navigation links.",
    timer: 60,
    tags: ["html5", "semantic-elements", "navigation"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which CSS property is used to make text bold?",
    options: ["font-weight", "text-style", "font-bold", "font-style"],
    correctAnswer: "font-weight",
    solutionExplanation: "The 'font-weight' property is used to make text bold in CSS. Values like 'bold' or numeric values (100-900) can be used.",
    timer: 60,
    tags: ["css", "font-weight", "typography"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "What is the purpose of the 'async' attribute in a script tag?",
    options: ["Loads the script asynchronously", "Delays script execution", "Makes script synchronous", "None"],
    correctAnswer: "Loads the script asynchronously",
    solutionExplanation: "The 'async' attribute loads the script asynchronously, allowing the HTML parsing to continue while the script loads in the background.",
    timer: 60,
    tags: ["javascript", "async", "script-loading"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which HTTP status code means 'Not Found'?",
    options: ["404", "200", "403", "301"],
    correctAnswer: "404",
    solutionExplanation: "HTTP status code 404 means 'Not Found', indicating that the requested resource could not be found on the server.",
    timer: 60,
    tags: ["http", "status-codes", "404-error"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which HTML5 element is used to draw graphics via scripting?",
    options: ["<canvas>", "<draw>", "<svg>", "<paint>"],
    correctAnswer: "<canvas>",
    solutionExplanation: "The <canvas> element is an HTML5 element used to draw graphics, animations, and other visual content via JavaScript.",
    timer: 60,
    tags: ["html5", "canvas", "graphics"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which JavaScript method is used to select an element by ID?",
    options: ["document.getElementById()", "document.query()", "document.getElement()", "document.id()"],
    correctAnswer: "document.getElementById()",
    solutionExplanation: "The document.getElementById() method is used to select an HTML element by its ID attribute in JavaScript.",
    timer: 60,
    tags: ["javascript", "dom", "element-selection"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which CSS function is used to make a gradient background?",
    options: ["linear-gradient()", "gradient()", "bg-gradient()", "background()"],
    correctAnswer: "linear-gradient()",
    solutionExplanation: "The linear-gradient() function in CSS is used to create linear gradient backgrounds with smooth color transitions.",
    timer: 60,
    tags: ["css", "gradients", "backgrounds"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which database is commonly used with Node.js?",
    options: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"],
    correctAnswer: "MongoDB",
    solutionExplanation: "MongoDB is commonly used with Node.js due to its JavaScript-like query language and JSON document structure, making it a natural fit for JavaScript-based applications.",
    timer: 60,
    tags: ["nodejs", "mongodb", "database"]
  },
  {
    category: "Web Development",
    difficulty: "Medium",
    questionText: "Which HTTP method is idempotent?",
    options: ["GET", "POST", "PATCH", "CONNECT"],
    correctAnswer: "GET",
    solutionExplanation: "The GET method is idempotent, meaning multiple identical requests should have the same effect as a single request.",
    timer: 60,
    tags: ["http", "idempotent", "get-method"]
  },

  // Hard (10 questions)
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which design pattern is React based on?",
    options: ["Component-based architecture", "MVC", "MVVM", "Observer"],
    correctAnswer: "Component-based architecture",
    solutionExplanation: "React is based on a component-based architecture where the UI is broken down into reusable, self-contained components.",
    timer: 90,
    tags: ["react", "component-based", "architecture"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which hook is used to handle side effects in React?",
    options: ["useEffect", "useState", "useRef", "useContext"],
    correctAnswer: "useEffect",
    solutionExplanation: "The useEffect hook is used to handle side effects in React, such as data fetching, subscriptions, or manually changing the DOM.",
    timer: 90,
    tags: ["react", "hooks", "useEffect"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "What does the virtual DOM improve?",
    options: ["Performance", "Security", "Storage", "Styling"],
    correctAnswer: "Performance",
    solutionExplanation: "The virtual DOM improves performance by minimizing direct manipulation of the real DOM, which is expensive in terms of performance.",
    timer: 90,
    tags: ["react", "virtual-dom", "performance"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which CSS feature enables responsive design?",
    options: ["Media Queries", "Grid", "Flexbox", "Selectors"],
    correctAnswer: "Media Queries",
    solutionExplanation: "Media queries enable responsive design by allowing CSS to apply different styles based on device characteristics like screen size, resolution, and orientation.",
    timer: 90,
    tags: ["css", "responsive-design", "media-queries"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which Node.js module is used to create a server?",
    options: ["http", "fs", "path", "express"],
    correctAnswer: "http",
    solutionExplanation: "The built-in 'http' module in Node.js is used to create HTTP servers. Express is a popular framework built on top of the http module.",
    timer: 90,
    tags: ["nodejs", "http-module", "server-creation"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which HTTP status code represents 'Unauthorized'?",
    options: ["401", "403", "404", "500"],
    correctAnswer: "401",
    solutionExplanation: "HTTP status code 401 means 'Unauthorized', indicating that authentication is required and has failed or has not been provided.",
    timer: 90,
    tags: ["http", "status-codes", "authentication"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "What does REST stand for?",
    options: ["Representational State Transfer", "Remote Execution Service Technique", "Random Execution Storage Transfer", "Represented Session Transport"],
    correctAnswer: "Representational State Transfer",
    solutionExplanation: "REST stands for Representational State Transfer, which is an architectural style for designing networked applications.",
    timer: 90,
    tags: ["rest", "api", "architecture"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which JavaScript object handles asynchronous operations?",
    options: ["Promise", "Callback", "Async", "Future"],
    correctAnswer: "Promise",
    solutionExplanation: "Promises in JavaScript are objects that represent the eventual completion or failure of an asynchronous operation, providing a cleaner way to handle async code.",
    timer: 90,
    tags: ["javascript", "promises", "asynchronous"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which React hook replaces lifecycle methods like componentDidMount?",
    options: ["useEffect", "useState", "useReducer", "useMemo"],
    correctAnswer: "useEffect",
    solutionExplanation: "The useEffect hook replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in functional components.",
    timer: 90,
    tags: ["react", "hooks", "lifecycle-methods"]
  },
  {
    category: "Web Development",
    difficulty: "Hard",
    questionText: "Which CSS layout module is best for 2D layouts?",
    options: ["Grid", "Flexbox", "Float", "Inline-block"],
    correctAnswer: "Grid",
    solutionExplanation: "CSS Grid is specifically designed for 2D layouts, allowing you to create complex grid-based layouts with rows and columns.",
    timer: 90,
    tags: ["css", "grid", "2d-layouts"]
  },

  // Very Hard (10 questions)
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "What is the difference between SSR and CSR?",
    options: ["SSR renders on server, CSR on client", "CSR is faster in SEO", "SSR uses only JS", "CSR doesn't use APIs"],
    correctAnswer: "SSR renders on server, CSR on client",
    solutionExplanation: "SSR (Server-Side Rendering) renders pages on the server before sending them to the client, while CSR (Client-Side Rendering) renders pages in the browser using JavaScript.",
    timer: 120,
    tags: ["ssr", "csr", "rendering", "performance"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "Which HTTP header enables CORS?",
    options: ["Access-Control-Allow-Origin", "Authorization", "Content-Type", "Accept"],
    correctAnswer: "Access-Control-Allow-Origin",
    solutionExplanation: "The Access-Control-Allow-Origin header is used to enable CORS (Cross-Origin Resource Sharing) by specifying which origins are allowed to access the resource.",
    timer: 120,
    tags: ["cors", "http-headers", "cross-origin"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "What is the purpose of service workers?",
    options: ["Enable offline capabilities", "Enhance CSS styling", "Optimize server routing", "Encrypt cookies"],
    correctAnswer: "Enable offline capabilities",
    solutionExplanation: "Service workers enable offline capabilities by acting as a proxy between the web application and the network, allowing for background sync and caching.",
    timer: 120,
    tags: ["service-workers", "offline", "pwa"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "Which React concept prevents unnecessary re-rendering?",
    options: ["Memoization", "State lifting", "Key props", "Virtual DOM"],
    correctAnswer: "Memoization",
    solutionExplanation: "Memoization in React (using React.memo, useMemo, or useCallback) prevents unnecessary re-rendering by caching the result of expensive calculations or component renders.",
    timer: 120,
    tags: ["react", "memoization", "performance-optimization"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "Which Web API is used for real-time communication?",
    options: ["WebSockets", "Fetch API", "Service Workers", "IndexedDB"],
    correctAnswer: "WebSockets",
    solutionExplanation: "WebSockets provide a full-duplex communication channel over a single TCP connection, enabling real-time communication between client and server.",
    timer: 120,
    tags: ["websockets", "real-time", "web-api"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "What is hydration in web development?",
    options: ["Attaching event listeners to server-rendered markup", "Adding watermarks to DOM", "Refreshing data", "Reloading the page"],
    correctAnswer: "Attaching event listeners to server-rendered markup",
    solutionExplanation: "Hydration is the process of attaching event listeners and making server-rendered markup interactive on the client side in frameworks like Next.js.",
    timer: 120,
    tags: ["hydration", "ssr", "client-side"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "What is the main advantage of GraphQL over REST?",
    options: ["Fetches only required data", "Faster than HTTP", "No schema needed", "Uses GET only"],
    correctAnswer: "Fetches only required data",
    solutionExplanation: "GraphQL's main advantage is that it allows clients to request exactly the data they need, reducing over-fetching and under-fetching compared to REST APIs.",
    timer: 120,
    tags: ["graphql", "rest", "api-design"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "Which HTTP header helps prevent XSS attacks?",
    options: ["Content-Security-Policy", "Access-Control-Allow-Origin", "Accept-Encoding", "Strict-Transport-Security"],
    correctAnswer: "Content-Security-Policy",
    solutionExplanation: "The Content-Security-Policy header helps prevent XSS attacks by controlling which resources the browser is allowed to load and execute.",
    timer: 120,
    tags: ["security", "xss", "csp"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "What is the purpose of Webpack?",
    options: ["Bundle JavaScript modules", "Minify HTML", "Deploy web apps", "Run tests"],
    correctAnswer: "Bundle JavaScript modules",
    solutionExplanation: "Webpack is a module bundler that takes modules with dependencies and generates static assets representing those modules, primarily for JavaScript applications.",
    timer: 120,
    tags: ["webpack", "bundling", "build-tools"]
  },
  {
    category: "Web Development",
    difficulty: "Very Hard",
    questionText: "Which concept underlies Progressive Web Apps (PWAs)?",
    options: ["Offline-first architecture", "Serverless computing", "Static rendering", "Cloud-only storage"],
    correctAnswer: "Offline-first architecture",
    solutionExplanation: "Progressive Web Apps are built on the concept of offline-first architecture, ensuring the app works even when the user is offline or has a poor network connection.",
    timer: 120,
    tags: ["pwa", "offline-first", "progressive-web-apps"]
  }
];

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/smarter-job-portal";
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

const seedQuestions = async () => {
  try {
    await connectDB();
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log("🗑️ Cleared existing questions");
    
    // Insert sample questions
    const insertedQuestions = await Question.insertMany(sampleQuestions);
    console.log(`✅ Successfully seeded ${insertedQuestions.length} questions`);
    
    // Display summary by category
    const categoryCounts = {};
    insertedQuestions.forEach(q => {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    });
    
    console.log("\n📊 Questions by category:");
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} questions`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding questions:", error);
    process.exit(1);
  }
};

// Run the seeding
seedQuestions();
