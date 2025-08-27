/** @type {import("../types").Sheet[]} */
export const SEED_SHEETS = [
  {
    id: "foundations",
    name: "Foundations",
    sections: [
      {
        id: "basics",
        title: "Language & Basics",
        items: [
          { 
            id: "vars", 
            title: "Variables & Scope", 
            difficulty: "Easy", 
            tags: ["fundamentals"], 
            sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations", 
            youtubeUrl: "https://youtube.com/watch?v=9SgPih1BdHg",
            codeforcesUrl: "",
            articleUrl: "https://javascript.info/variables",
            note: "Understanding variable declarations and scope in JavaScript" 
          },
          { 
            id: "time-space", 
            title: "Time & Space Complexity", 
            difficulty: "Easy", 
            tags: ["analysis"], 
            sourceUrl: "https://www.bigocheatsheet.com/", 
            youtubeUrl: "https://youtube.com/watch?v=8hly31xKli0",
            codeforcesUrl: "",
            articleUrl: "https://www.freecodecamp.org/news/big-o-notation-explained/",
            note: "Big O notation and complexity analysis" 
          },
        ],
      },
      {
        id: "patterns",
        title: "Core Patterns",
        items: [
          { 
            id: "two-pointers", 
            title: "Two Pointers Template (Two Sum)", 
            difficulty: "Easy", 
            tags: ["array","pattern"], 
            sourceUrl: "https://leetcode.com/problems/two-sum/", 
            youtubeUrl: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/4/A",
            articleUrl: "https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days.",
            note: "Classic two-pointer / hash map technique for finding pairs"
          },
          { 
            id: "sliding-window", 
            title: "Longest Substring Without Repeating Characters", 
            difficulty: "Medium", 
            tags: ["string","pattern","sliding-window"], 
            sourceUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", 
            youtubeUrl: "https://www.youtube.com/watch?v=wiGpQwVHdE0",
            codeforcesUrl: "https://codeforces.com/problemset/problem/279/B",
            articleUrl: "https://leetcode.com/discuss/study-guide/657507/Sliding-Window-for-Beginners-Problems-or-Template-or-Sample-Solutions",
            note: "Efficient sliding window for substring problems"
          },
          { 
            id: "prefix", 
            title: "Range Sum Query (Immutable)", 
            difficulty: "Easy", 
            tags: ["array","prefix"], 
            sourceUrl: "https://leetcode.com/problems/range-sum-query-immutable/", 
            youtubeUrl: "https://www.youtube.com/watch?v=2pndAmo_sMA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/466/C",
            articleUrl: "https://leetcode.com/discuss/study-guide/1151181/introduction-to-prefix-sum",
            note: "Precompute sums for efficient range queries"
          },
        ],
      },
    ],
  },
  {
    id: "interview-stack",
    name: "Interview Stack",
    sections: [
      {
        id: "arrays",
        title: "Arrays 101",
        items: [
          { 
            id: "two-sum", 
            title: "Two Sum", 
            difficulty: "Easy", 
            tags: ["array","hash"], 
            sourceUrl: "https://leetcode.com/problems/two-sum/", 
            youtubeUrl: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/4/A",
            articleUrl: "https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days.",
            note: "Classic hash map solution for finding pairs"
          },
          { 
            id: "kadane", 
            title: "Maximum Subarray (Kadane's Algorithm)", 
            difficulty: "Medium", 
            tags: ["dp","array"], 
            sourceUrl: "https://leetcode.com/problems/maximum-subarray/", 
            youtubeUrl: "https://www.youtube.com/watch?v=5WZl3MMT0Eg",
            codeforcesUrl: "https://codeforces.com/problemset/problem/455/A",
            articleUrl: "https://leetcode.com/discuss/study-guide/1151181/introduction-to-prefix-sum",
            note: "Dynamic programming approach for maximum subarray sum"
          },
          { 
            id: "trap", 
            title: "Trapping Rain Water", 
            difficulty: "Hard", 
            tags: ["stack","two-pointer"], 
            sourceUrl: "https://leetcode.com/problems/trapping-rain-water/", 
            youtubeUrl: "https://www.youtube.com/watch?v=ZI2z5pq0TqA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/158/B",
            articleUrl: "https://leetcode.com/discuss/study-guide/657507/Sliding-Window-for-Beginners-Problems-or-Template-or-Sample-Solutions",
            note: "Two-pointer technique for water trapping problem"
          },
          { 
            id: "bipartite", 
            title: "Is Graph Bipartite?", 
            difficulty: "Medium", 
            tags: ["graph","bfs","dfs"], 
            sourceUrl: "https://leetcode.com/problems/is-graph-bipartite/", 
            youtubeUrl: "https://www.youtube.com/watch?v=_ep1luP1UhA",
            codeforcesUrl: "https://codeforces.com/problemset/problem/862/B",
            articleUrl: "https://leetcode.com/discuss/study-guide/1151181/introduction-to-prefix-sum",
            note: "Check bipartiteness with BFS/DFS 2-coloring, detects odd cycles"
          }
        ],
      },
    ],
  },
];
