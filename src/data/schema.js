/** Schema that drives the create forms (can be extended easily). */
export const SCHEMA = {
  problem: [
    { key:"title", label:"Title", type:"text", required:true, placeholder:"e.g., Merge Intervals" },
    { key:"difficulty", label:"Difficulty", type:"select", required:true, options:["Easy","Medium","Hard"], default:"Easy" },
    { key:"tags", label:"Tags", type:"tags", placeholder:"array, two-pointer, dp" },
    { key:"sourceUrl", label:"Source URL", type:"url", placeholder:"https://leetcode.com/..." },
    { key:"youtubeUrl", label:"YouTube Video", type:"url", placeholder:"https://youtube.com/watch?v=..." },
    { key:"codeforcesUrl", label:"Codeforces Link", type:"url", placeholder:"https://codeforces.com/problemset/problem/..." },
    { key:"articleUrl", label:"Article Link", type:"url", placeholder:"https://example.com/article" },
    { key:"note", label:"Notes", type:"textarea", placeholder:"Short hint or approach" },
  ],
  section: [
    { key:"title", label:"Section Title", type:"text", required:true, placeholder:"e.g., Graphs" },
  ],
  sheet: [
    { key:"name", label:"Sheet Name", type:"text", required:true, placeholder:"e.g., Advanced DSA" },
  ],
};
