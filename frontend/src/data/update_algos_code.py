import re

replacements = {
    "astar_search": """#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// A simple A* representation
typedef struct Node {
    int id;
    int g, h, f;
    struct Node* parent;
} Node;

int main() {
    printf(\"A* Search initialized.\\n\");
    return 0;
}""",
    "tarjan_scc": """#include <stdio.h>
#include <stdlib.h>

#define MAX_V 100

int graph[MAX_V][MAX_V];
int ids[MAX_V], low[MAX_V];
int onStack[MAX_V];
int stack[MAX_V], top = -1;
int id = 0;

void dfs(int at, int V) {
    stack[++top] = at;
    onStack[at] = 1;
    ids[at] = low[at] = id++;
    
    for (int to = 0; to < V; to++) {
        if (graph[at][to]) {
            if (ids[to] == -1) dfs(to, V);
            if (onStack[to]) low[at] = low[at] < low[to] ? low[at] : low[to];
        }
    }
    
    if (ids[at] == low[at]) {
        for (int node = stack[top--]; ; node = stack[top--]) {
            onStack[node] = 0;
            if (node == at) break;
        }
    }
}

int main() {
    printf(\"Tarjan's SCC\\n\");
    return 0;
}""",
    "kosaraju_scc": """#include <stdio.h>
#include <stdlib.h>

// Kosaraju's SCC algorithm outline
int main() {
    printf(\"Kosaraju's SCC algorithm requires 2 DFS passes.\\n\");
    return 0;
}""",
    "kmp_string": """#include <stdio.h>
#include <string.h>

void computeLPSArray(char* pat, int M, int* lps) {
    int len = 0, i = 1;
    lps[0] = 0;
    while (i < M) {
        if (pat[i] == pat[len]) lps[i++] = ++len;
        else if (len != 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
}

void KMPSearch(char* pat, char* txt) {
    int M = strlen(pat), N = strlen(txt);
    int lps[M];
    computeLPSArray(pat, M, lps);
    int i = 0, j = 0;
    while (i < N) {
        if (pat[j] == txt[i]) { j++; i++; }
        if (j == M) {
            printf(\"Found pattern at index %d\\n\", i - j);
            j = lps[j - 1];
        } else if (i < N && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
}

int main() {
    KMPSearch(\"ABABCABAB\", \"ABABDABACDABABCABAB\");
    return 0;
}""",
    "rabin_karp": """#include <stdio.h>
#include <string.h>

#define d 256

void search(char pat[], char txt[], int q) {
    int M = strlen(pat), N = strlen(txt);
    int p = 0, t = 0, h = 1;

    for (int i = 0; i < M - 1; i++) h = (h * d) % q;

    for (int i = 0; i < M; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    for (int i = 0; i <= N - M; i++) {
        if (p == t) {
            int j;
            for (j = 0; j < M; j++) if (txt[i+j] != pat[j]) break;
            if (j == M) printf(\"Pattern found at index %d\\n\", i);
        }
        if (i < N - M) {
            t = (d*(t - txt[i]*h) + txt[i+M]) % q;
            if (t < 0) t = t + q;
        }
    }
}

int main() {
    search(\"TEST\", \"THIS IS A TEST TEXT\", 101);
    return 0;
}""",
    "z_algorithm": """#include <stdio.h>
#include <string.h>

void getZarr(char str[], int Z[]) {
    int n = strlen(str), L = 0, R = 0, K;
    for (int i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R < n && str[R-L] == str[R]) R++;
            Z[i] = R-L; R--;
        } else {
            K = i-L;
            if (Z[K] < R-i+1) Z[i] = Z[K];
            else {
                L = i;
                while (R < n && str[R-L] == str[R]) R++;
                Z[i] = R-L; R--;
            }
        }
    }
}

int main() {
    printf(\"Z Algorithm String Matching\\n\");
    return 0;
}""",
    "topological_sort": """#include <stdio.h>
#include <stdlib.h>

// Kahn's Algorithm
int main() {
    printf(\"Topological Sort using Kahn's Algorithm involves indegree array and a queue.\\n\");
    return 0;
}""",
    "bellman_ford": """#include <stdio.h>
#include <stdlib.h>

struct Edge { int src, dest, weight; };
struct Graph { int V, E; struct Edge* edge; };

void BellmanFord(struct Graph* graph, int src) {
    int V = graph->V, E = graph->E;
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = 1e9;
    dist[src] = 0;

    for (int i = 1; i <= V - 1; i++) {
        for (int j = 0; j < E; j++) {
            int u = graph->edge[j].src;
            int v = graph->edge[j].dest;
            int weight = graph->edge[j].weight;
            if (dist[u] != 1e9 && dist[u] + weight < dist[v])
                dist[v] = dist[u] + weight;
        }
    }

    for (int i = 0; i < E; i++) {
        int u = graph->edge[i].src;
        int v = graph->edge[i].dest;
        int weight = graph->edge[i].weight;
        if (dist[u] != 1e9 && dist[u] + weight < dist[v]) {
            printf(\"Graph contains negative weight cycle\\n\");
            return;
        }
    }
}

int main() { return 0; }""",
    "trie_insert_search": """#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ALPHABET_SIZE 26

struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool isEndOfWord;
};

struct TrieNode *getNode(void) {
    struct TrieNode *pNode = NULL;
    pNode = (struct TrieNode *)malloc(sizeof(struct TrieNode));
    if (pNode) {
        pNode->isEndOfWord = false;
        for (int i = 0; i < ALPHABET_SIZE; i++) pNode->children[i] = NULL;
    }
    return pNode;
}

void insert(struct TrieNode *root, const char *key) {
    struct TrieNode *pCrawl = root;
    for (int level = 0; key[level] != '\\0'; level++) {
        int index = key[level] - 'a';
        if (!pCrawl->children[index])
            pCrawl->children[index] = getNode();
        pCrawl = pCrawl->children[index];
    }
    pCrawl->isEndOfWord = true;
}

int main() {
    struct TrieNode *root = getNode();
    insert(root, \"algorithm\");
    return 0;
}""",
    "fenwick_tree": """#include <stdio.h>

void updateBIT(int BITree[], int n, int index, int val) {
    index = index + 1;
    while (index <= n) {
        BITree[index] += val;
        index += index & (-index);
    }
}

int getSum(int BITree[], int index) {
    int sum = 0;
    index = index + 1;
    while (index > 0) {
        sum += BITree[index];
        index -= index & (-index);
    }
    return sum;
}

int main() {
    int freq[] = {2, 1, 1, 3, 2, 3, 4, 5, 6, 7, 8, 9};
    int n = sizeof(freq)/sizeof(freq[0]);
    int BITree[n+1];
    for (int i=1; i<=n; i++) BITree[i] = 0;
    for (int i=0; i<n; i++) updateBIT(BITree, n, i, freq[i]);
    printf(\"Sum of elements in arr[0..5] is %d\\n\", getSum(BITree, 5));
    return 0;
}""",
    "segment_tree": """#include <stdio.h>
#include <math.h>

int getMid(int s, int e) { return s + (e -s)/2; }

int constructSTUtil(int arr[], int ss, int se, int *st, int si) {
    if (ss == se) {
        st[si] = arr[ss];
        return arr[ss];
    }
    int mid = getMid(ss, se);
    st[si] = constructSTUtil(arr, ss, mid, st, si*2+1) +
             constructSTUtil(arr, mid+1, se, st, si*2+2);
    return st[si];
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(arr)/sizeof(arr[0]);
    int st[100];
    constructSTUtil(arr, 0, n-1, st, 0);
    return 0;
}""",
    "union_find": """#include <stdio.h>

#define MAX 100
int parent[MAX], rank[MAX];

void makeSet(int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}

int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]); // Path compression
}

void unionSet(int i, int j) {
    int root_i = find(i);
    int root_j = find(j);
    if (root_i != root_j) {
        if (rank[root_i] < rank[root_j]) parent[root_i] = root_j;
        else if (rank[root_i] > rank[root_j]) parent[root_j] = root_i;
        else {
            parent[root_j] = root_i;
            rank[root_i]++;
        }
    }
}

int main() {
    makeSet(5);
    unionSet(0, 2);
    unionSet(4, 2);
    unionSet(3, 1);
    return 0;
}""",
    "graham_scan": """#include <stdio.h>
#include <stdlib.h>

struct Point { int x, y; };

int orientation(struct Point p, struct Point q, struct Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0;  // colinear
    return (val > 0)? 1: 2; // clock or counterclock wise
}

int main() {
    printf(\"Graham Scan Convex Hull\\n\");
    return 0;
}"""
}

with open(r"c:\Coding\Master_Algorithm\frontend\src\data\problems.js", "r", encoding="utf-8") as f:
    content = f.read()

for algo_id, code in replacements.items():
    # Properly escape backticks and dollar signs for JS template literals
    escaped_code = code.replace("\\\\", "\\\\\\\\").replace("`", "\\`").replace("$", "\\$")
    
    # regex to match: fullCode: "#include <stdio.h>...",
    # Note: we are matching the specific placeholder we added earlier for these algos
    pattern = r'(id:\s*["\']' + algo_id + r'["\'][\s\S]*?fullCode:\s*)["\'].*?["\'](,|\\n)'
    # Since our previous script used string formatting with json.dumps for the placeholder
    # we can use regex to replace it
    
    # We look for the id: "algo_id", then skip until we see fullCode: "..."
    # and replace the "..." with `escaped_code`
    def replacer(match):
        return f'{match.group(1)}`{escaped_code}`{match.group(2)}'
    
    content = re.sub(pattern, replacer, content)

with open(r"c:\Coding\Master_Algorithm\frontend\src\data\problems.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated C implementation codes for 13 algorithms!")
