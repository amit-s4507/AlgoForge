/** @type {import("../types").Topic[]} */
export const DSA_TOPICS = [
  {
    id: "arrays",
    name: "Arrays",
    description: "Linear data structures with contiguous memory allocation",
    icon: "🔢",
    color: "from-blue-500 to-cyan-500",
    subtopics: [
      {
        id: "array-basics",
        title: "Array Basics & Operations",
        difficulty: "Easy",
        tags: ["fundamentals", "array"],
        problems: [
          {
            id: "array-traversal",
            title: "Array Traversal and Access",
            difficulty: "Easy",
            tags: ["array", "basics"],
            sourceUrl: "https://leetcode.com/problems/running-sum-of-1d-array/",
            youtubeUrl: "https://www.youtube.com/watch?v=8wmn7k1TTcI",
            codeforcesUrl: "https://codeforces.com/problemset/problem/1/A",
            articleUrl: "https://www.geeksforgeeks.org/array-data-structure/",
            note: "Understanding array indexing and basic operations"
          },
          {
            id: "array-insertion",
            title: "Array Insertion and Deletion",
            difficulty: "Easy",
            tags: ["array", "operations"],
            sourceUrl: "https://leetcode.com/problems/remove-element/",
            youtubeUrl: "https://www.youtube.com/watch?v=8wmn7k1TTcI",
            codeforcesUrl: "https://codeforces.com/problemset/problem/4/A",
            articleUrl: "https://www.geeksforgeeks.org/array-insertion-deletion/",
            note: "Insert and delete elements efficiently"
          }
        ]
      },
      {
        id: "two-pointers",
        title: "Two Pointers Technique",
        difficulty: "Medium",
        tags: ["two-pointers", "optimization"],
        problems: [
          {
            id: "two-sum",
            title: "Two Sum Problem",
            difficulty: "Easy",
            tags: ["array", "hash-table"],
            sourceUrl: "https://leetcode.com/problems/two-sum/",
            youtubeUrl: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/4/A",
            articleUrl: "https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days",
            note: "Classic two-pointer and hash map technique"
          },
          {
            id: "container-water",
            title: "Container With Most Water",
            difficulty: "Medium",
            tags: ["array", "two-pointers"],
            sourceUrl: "https://leetcode.com/problems/container-with-most-water/",
            youtubeUrl: "https://www.youtube.com/watch?v=c9_fg5qNl1Q",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days",
            note: "Optimize with two pointers from both ends"
          }
        ]
      },
      {
        id: "sliding-window",
        title: "Sliding Window",
        difficulty: "Medium",
        tags: ["sliding-window", "optimization"],
        problems: [
          {
            id: "max-subarray",
            title: "Maximum Subarray (Kadane's Algorithm)",
            difficulty: "Medium",
            tags: ["array", "dp"],
            sourceUrl: "https://leetcode.com/problems/maximum-subarray/",
            youtubeUrl: "https://www.youtube.com/watch?v=AHZpyENo7k4",
            codeforcesUrl: "https://codeforces.com/problemset/problem/455/A",
            articleUrl: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
            note: "Dynamic programming approach for maximum subarray sum"
          }
        ]
      }
    ]
  },
  {
    id: "strings",
    name: "Strings",
    description: "Character arrays and string manipulation techniques",
    icon: "📝",
    color: "from-green-500 to-emerald-500",
    subtopics: [
      {
        id: "string-basics",
        title: "String Fundamentals",
        difficulty: "Easy",
        tags: ["string", "fundamentals"],
        problems: [
          {
            id: "reverse-string",
            title: "Reverse String",
            difficulty: "Easy",
            tags: ["string", "two-pointers"],
            sourceUrl: "https://leetcode.com/problems/reverse-string/",
            youtubeUrl: "https://www.youtube.com/watch?v=MOSjYaVymcU",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/reverse-a-string-in-c-cpp-different-methods/",
            note: "Basic string reversal using two pointers"
          }
        ]
      },
      {
        id: "string-matching",
        title: "Pattern Matching",
        difficulty: "Hard",
        tags: ["string", "pattern-matching"],
        problems: [
          {
            id: "kmp-algorithm",
            title: "KMP String Matching",
            difficulty: "Hard",
            tags: ["string", "kmp"],
            sourceUrl: "https://leetcode.com/problems/implement-strstr/",
            youtubeUrl: "https://www.youtube.com/watch?v=GTJr8OvyEVQ",
            codeforcesUrl: "https://codeforces.com/problemset/problem/471/D",
            articleUrl: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/",
            note: "Efficient pattern matching with KMP algorithm"
          }
        ]
      }
    ]
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    description: "Dynamic data structures with pointer-based connections",
    icon: "🔗",
    color: "from-purple-500 to-pink-500",
    subtopics: [
      {
        id: "ll-basics",
        title: "Linked List Basics",
        difficulty: "Easy",
        tags: ["linked-list", "fundamentals"],
        problems: [
          {
            id: "reverse-ll",
            title: "Reverse Linked List",
            difficulty: "Easy",
            tags: ["linked-list"],
            sourceUrl: "https://leetcode.com/problems/reverse-linked-list/",
            youtubeUrl: "https://www.youtube.com/watch?v=LyuuqCVkP5I",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
            note: "Iterative and recursive approaches to reverse a linked list"
          }
        ]
      },
      {
        id: "ll-advanced",
        title: "Advanced Linked List Operations",
        difficulty: "Medium",
        tags: ["linked-list", "advanced"],
        problems: [
          {
            id: "merge-sorted-ll",
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            tags: ["linked-list", "merge"],
            sourceUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
            youtubeUrl: "https://www.youtube.com/watch?v=LyuuqCVkP5I",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
            note: "Merge two sorted linked lists efficiently"
          }
        ]
      }
    ]
  },
  {
    id: "stacks-queues",
    name: "Stacks & Queues",
    description: "LIFO and FIFO data structures for specialized operations",
    icon: "📚",
    color: "from-orange-500 to-red-500",
    subtopics: [
      {
        id: "stack-basics",
        title: "Stack Operations",
        difficulty: "Easy",
        tags: ["stack", "fundamentals"],
        problems: [
          {
            id: "valid-parentheses",
            title: "Valid Parentheses",
            difficulty: "Easy",
            tags: ["stack", "string"],
            sourceUrl: "https://leetcode.com/problems/valid-parentheses/",
            youtubeUrl: "https://www.youtube.com/watch?v=0X-fV-1ir9c",
            codeforcesUrl: "https://codeforces.com/problemset/problem/5/C",
            articleUrl: "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/",
            note: "Use stack to check balanced parentheses"
          }
        ]
      },
      {
        id: "queue-basics",
        title: "Queue Operations",
        difficulty: "Easy",
        tags: ["queue", "fundamentals"],
        problems: [
          {
            id: "implement-queue",
            title: "Implement Queue using Stacks",
            difficulty: "Easy",
            tags: ["queue", "stack"],
            sourceUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
            youtubeUrl: "https://www.youtube.com/watch?v=0X-fV-1ir9c",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/queue-using-stacks/",
            note: "Implement queue operations using two stacks"
          }
        ]
      }
    ]
  },
  {
    id: "trees",
    name: "Trees",
    description: "Hierarchical data structures with parent-child relationships",
    icon: "🌳",
    color: "from-teal-500 to-blue-500",
    subtopics: [
      {
        id: "binary-trees",
        title: "Binary Trees",
        difficulty: "Medium",
        tags: ["tree", "binary-tree"],
        problems: [
          {
            id: "tree-traversal",
            title: "Binary Tree Inorder Traversal",
            difficulty: "Easy",
            tags: ["tree", "traversal"],
            sourceUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            youtubeUrl: "https://www.youtube.com/watch?v=_jKa4gycZTw",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
            note: "Recursive and iterative tree traversal methods"
          }
        ]
      },
      {
        id: "bst",
        title: "Binary Search Trees",
        difficulty: "Medium",
        tags: ["tree", "bst"],
        problems: [
          {
            id: "validate-bst",
            title: "Validate Binary Search Tree",
            difficulty: "Medium",
            tags: ["tree", "bst"],
            sourceUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
            youtubeUrl: "https://www.youtube.com/watch?v=_jKa4gycZTw",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/",
            note: "Check if a binary tree is a valid BST"
          }
        ]
      }
    ]
  },
  {
    id: "graphs",
    name: "Graphs",
    description: "Networks of vertices connected by edges",
    icon: "🕸️",
    color: "from-indigo-500 to-purple-500",
    subtopics: [
      {
        id: "graph-traversal",
        title: "Graph Traversal",
        difficulty: "Medium",
        tags: ["graph", "traversal"],
        problems: [
          {
            id: "dfs-bfs",
            title: "DFS and BFS Traversal",
            difficulty: "Medium",
            tags: ["graph", "dfs", "bfs"],
            sourceUrl: "https://leetcode.com/problems/number-of-islands/",
            youtubeUrl: "https://www.youtube.com/watch?v=ac_YZs6tJlY",
            codeforcesUrl: "https://codeforces.com/problemset/problem/520/B",
            articleUrl: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
            note: "Depth-first and breadth-first search algorithms"
          }
        ]
      },
      {
        id: "shortest-path",
        title: "Shortest Path Algorithms",
        difficulty: "Hard",
        tags: ["graph", "shortest-path"],
        problems: [
          {
            id: "dijkstra",
            title: "Dijkstra's Algorithm",
            difficulty: "Hard",
            tags: ["graph", "dijkstra"],
            sourceUrl: "https://leetcode.com/problems/network-delay-time/",
            youtubeUrl: "https://www.youtube.com/watch?v=jbhuqIASjoM",
            codeforcesUrl: "https://codeforces.com/problemset/problem/20/C",
            articleUrl: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
            note: "Find shortest path from source to all vertices"
          }
        ]
      }
    ]
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    description: "Optimization technique using memoization and tabulation",
    icon: "💡",
    color: "from-yellow-500 to-orange-500",
    subtopics: [
      {
        id: "dp-basics",
        title: "DP Fundamentals",
        difficulty: "Medium",
        tags: ["dp", "fundamentals"],
        problems: [
          {
            id: "fibonacci",
            title: "Fibonacci Number",
            difficulty: "Easy",
            tags: ["dp", "math"],
            sourceUrl: "https://leetcode.com/problems/fibonacci-number/",
            youtubeUrl: "https://www.youtube.com/watch?v=nqowUJzG-iM",
            codeforcesUrl: "https://codeforces.com/problemset/problem/1/A",
            articleUrl: "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/",
            note: "Introduction to memoization and tabulation"
          }
        ]
      },
      {
        id: "dp-optimization",
        title: "DP Optimization Problems",
        difficulty: "Hard",
        tags: ["dp", "optimization"],
        problems: [
          {
            id: "knapsack",
            title: "0/1 Knapsack Problem",
            difficulty: "Medium",
            tags: ["dp", "knapsack"],
            sourceUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
            youtubeUrl: "https://www.youtube.com/watch?v=34l1kTIQCIA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/455/A",
            articleUrl: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
            note: "Classic optimization problem using dynamic programming"
          }
        ]
      }
    ]
  },
  {
    id: "hashing",
    name: "Hashing",
    description: "Hash tables and hash functions for fast data access",
    icon: "🔍",
    color: "from-pink-500 to-rose-500",
    subtopics: [
      {
        id: "hash-tables",
        title: "Hash Table Operations",
        difficulty: "Medium",
        tags: ["hashing", "hash-table"],
        problems: [
          {
            id: "hash-map",
            title: "Design HashMap",
            difficulty: "Easy",
            tags: ["hash-table", "design"],
            sourceUrl: "https://leetcode.com/problems/design-hashmap/",
            youtubeUrl: "https://www.youtube.com/watch?v=dQG-MKNl_Gc",
            codeforcesUrl: "https://codeforces.com/problemset/problem/4/A",
            articleUrl: "https://www.geeksforgeeks.org/implementing-our-own-hash-table-with-separate-chaining-in-java/",
            note: "Implement a hash map from scratch"
          }
        ]
      },
      {
        id: "collision-resolution",
        title: "Collision Resolution",
        difficulty: "Medium",
        tags: ["hashing", "collision"],
        problems: [
          {
            id: "group-anagrams",
            title: "Group Anagrams",
            difficulty: "Medium",
            tags: ["string", "hash-table"],
            sourceUrl: "https://leetcode.com/problems/group-anagrams/",
            youtubeUrl: "https://www.youtube.com/watch?v=dQG-MKNl_Gc",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/",
            note: "Use hashing to group anagrams efficiently"
          }
        ]
      }
    ]
  },
  {
    id: "heaps",
    name: "Heaps",
    description: "Complete binary trees with heap property",
    icon: "⛰️",
    color: "from-gray-500 to-slate-500",
    subtopics: [
      {
        id: "heap-basics",
        title: "Heap Operations",
        difficulty: "Medium",
        tags: ["heap", "priority-queue"],
        problems: [
          {
            id: "kth-largest",
            title: "Kth Largest Element",
            difficulty: "Medium",
            tags: ["heap", "array"],
            sourceUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            youtubeUrl: "https://www.youtube.com/watch?v=ovP_B0b1hKI",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/k-largest-elements-array-using-heap/",
            note: "Use min-heap to find kth largest element"
          }
        ]
      },
      {
        id: "heap-applications",
        title: "Heap Applications",
        difficulty: "Hard",
        tags: ["heap", "applications"],
        problems: [
          {
            id: "merge-k-lists",
            title: "Merge k Sorted Lists",
            difficulty: "Hard",
            tags: ["heap", "linked-list"],
            sourceUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
            youtubeUrl: "https://www.youtube.com/watch?v=ovP_B0b1hKI",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/",
            note: "Use min-heap to merge k sorted linked lists"
          }
        ]
      }
    ]
  },
  {
    id: "sorting-searching",
    name: "Sorting & Searching",
    description: "Algorithms for ordering and finding elements",
    icon: "🔍",
    color: "from-emerald-500 to-teal-500",
    subtopics: [
      {
        id: "sorting-algorithms",
        title: "Sorting Algorithms",
        difficulty: "Medium",
        tags: ["sorting", "algorithms"],
        problems: [
          {
            id: "merge-sort",
            title: "Merge Sort Implementation",
            difficulty: "Medium",
            tags: ["sorting", "divide-conquer"],
            sourceUrl: "https://leetcode.com/problems/sort-an-array/",
            youtubeUrl: "https://www.youtube.com/watch?v=iKGAgWdgoRk",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/merge-sort/",
            note: "Divide and conquer sorting algorithm"
          }
        ]
      },
      {
        id: "binary-search",
        title: "Binary Search",
        difficulty: "Medium",
        tags: ["searching", "binary-search"],
        problems: [
          {
            id: "binary-search-basic",
            title: "Binary Search",
            difficulty: "Easy",
            tags: ["binary-search", "array"],
            sourceUrl: "https://leetcode.com/problems/binary-search/",
            youtubeUrl: "https://www.youtube.com/watch?v=qsbCBduIs40",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://www.geeksforgeeks.org/binary-search/",
            note: "Search in sorted array using binary search"
          }
        ]
      }
    ]
  }
];

// Helper function to get topic statistics
export function getTopicStats(topicId, progress = {}) {
  const topic = DSA_TOPICS.find(t => t.id === topicId);
  if (!topic) return { total: 0, completed: 0, percentage: 0 };

  let total = 0;
  let completed = 0;

  topic.subtopics.forEach(subtopic => {
    subtopic.problems.forEach(problem => {
      total++;
      if (progress[problem.id]?.status === 'solved') {
        completed++;
      }
    });
  });

  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}

// Helper function to get subtopic statistics
export function getSubtopicStats(topicId, subtopicId, progress = {}) {
  const topic = DSA_TOPICS.find(t => t.id === topicId);
  if (!topic) return { total: 0, completed: 0, percentage: 0 };

  const subtopic = topic.subtopics.find(s => s.id === subtopicId);
  if (!subtopic) return { total: 0, completed: 0, percentage: 0 };

  let total = subtopic.problems.length;
  let completed = 0;

  subtopic.problems.forEach(problem => {
    if (progress[problem.id]?.status === 'solved') {
      completed++;
    }
  });

  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    isCompleted: completed === total && total > 0
  };
}

// Helper function to get all problems for progress tracking
export function getAllTopicProblems() {
  const problems = [];
  DSA_TOPICS.forEach(topic => {
    topic.subtopics.forEach(subtopic => {
      subtopic.problems.forEach(problem => {
        problems.push({
          ...problem,
          topicId: topic.id,
          topicName: topic.name,
          subtopicId: subtopic.id,
          subtopicTitle: subtopic.title
        });
      });
    });
  });
  return problems;
}