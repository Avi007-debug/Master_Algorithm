import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/common';

export function VisualizerEngine({ step }) {
    if (!step) return <div className="text-center text-gray-500">No data to visualize</div>;

    const { arrays, variables, highlights, message, nodes, edges } = step;

    return (
        <div className="flex flex-col gap-6 w-full h-full overflow-y-auto pr-2">
            <AnimatePresence mode="wait">
                <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg font-medium text-[var(--color-accent-primary)] text-center glass-panel py-3 rounded-lg"
                >
                    {message || "..."}
                </motion.div>
            </AnimatePresence>

            {/* Recursion Tree Section */}
            {nodes && nodes.length > 0 && (
                <div className="flex flex-col gap-2 items-center w-full">
                    <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Recursion Tree</h3>
                    <div className="relative w-full glass-panel rounded-xl overflow-x-auto overflow-y-hidden custom-scrollbar" style={{ maxHeight: '350px' }}>
                        <div className="inline-block min-w-full">
                            <svg width="100%" height="300" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet" className="block" style={{ minWidth: '800px' }}>
                                <defs>
                                    <marker id="recursion-arrow" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-border)" opacity="0.6" />
                                    </marker>
                                </defs>
                                {/* Simple Level-based layout for recursion tree */}
                                {(() => {
                                    const levelMap = {};
                                    const nodeCoords = {};

                                    // Build adjacency list to calculate depths
                                    const adj = {};
                                    nodes.forEach(n => adj[n.id] = []);
                                    edges.forEach(e => {
                                        if (adj[e.from]) {
                                            adj[e.from].push(e.to);
                                        } else {
                                            adj[e.from] = [e.to];
                                        }
                                    });

                                    // Find roots (nodes with no incoming edges)
                                    const isChild = new Set(edges.map(e => e.to));
                                    const roots = nodes.filter(n => !isChild.has(n.id));

                                    // Simple DFS to assign levels
                                    const assignLevels = (id, level) => {
                                        if (!levelMap[level]) levelMap[level] = [];
                                        if (!levelMap[level].includes(id)) levelMap[level].push(id);
                                        adj[id].forEach(childId => assignLevels(childId, level + 1));
                                    };
                                    roots.forEach(r => assignLevels(r.id, 0));

                                    // Calculate coordinates with better spacing
                                    const levels = Object.keys(levelMap).length;
                                    Object.entries(levelMap).forEach(([lvl, nodeIds]) => {
                                        const levelInt = parseInt(lvl);
                                        const y = 50 + levelInt * 60;
                                        const spacing = Math.min(120, 1000 / Math.max(nodeIds.length, 1));
                                        nodeIds.forEach((id, i) => {
                                            const x = 600 + (i - (nodeIds.length - 1) / 2) * spacing;
                                            nodeCoords[id] = { x, y };
                                        });
                                    });

                                return (
                                    <>
                                        {/* Render Edges first */}
                                        {edges.map((e, idx) => {
                                            const start = nodeCoords[e.from];
                                            const end = nodeCoords[e.to];
                                            if (!start || !end) return null;
                                            return (
                                                <line
                                                    key={`rec-edge-${idx}`}
                                                    x1={start.x} y1={start.y}
                                                    x2={end.x} y2={end.y}
                                                    stroke="var(--color-border)"
                                                    strokeWidth="1.5"
                                                    markerEnd="url(#recursion-arrow)"
                                                />
                                            );
                                        })}
                                        {/* Render Nodes */}
                                        {Object.entries(nodeCoords).map(([id, coords]) => {
                                            const node = nodes.find(n => n.id === parseInt(id));
                                            return (
                                                <g key={`rec-node-${id}`}>
                                                    <circle
                                                        cx={coords.x} cy={coords.y} r="20"
                                                        fill="var(--color-bg-tertiary)"
                                                        stroke="var(--color-accent-primary)"
                                                        strokeWidth="2"
                                                    />
                                                    <text
                                                        x={coords.x} y={coords.y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fill="var(--color-text-primary)"
                                                        fontSize="12"
                                                        fontWeight="bold"
                                                    >
                                                        {node?.label}
                                                    </text>
                                                </g>
                                            );
                                        })}
                                    </>
                                );
                            })()}
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {/* Arrays Section */}
            <div className="flex flex-col gap-8">
                {Object.entries(arrays || {}).map(([name, data], idx) => {
                    // --- Visualization Type Detection ---
                    const isSortArray = name.includes("Sort Array") || name === "Array";
                    const isGraphMatrix = name === "AdjacencyMatrix";
                    const isTreeStructure = name === "TreeStructure";
                    // Only render as linked list if this is the primary data array (prioritize 'Values' over 'Nodes')
                    const isLinkedList = arrays['NextPtrs'] && 
                        ((arrays['Values'] && name === 'Values') || 
                         (!arrays['Values'] && arrays['Nodes'] && name === 'Nodes'));

                    // Skip rendering NextPtrs, PrevPtrs separately - they're shown as part of linked list
                    if ((name === 'NextPtrs' || name === 'PrevPtrs') && (arrays['Values'] || arrays['Nodes'])) return null;
                    // Skip 'Nodes' if 'Values' exists (prevent duplicate linked list rendering)
                    if (name === 'Nodes' && arrays['Values'] && arrays['NextPtrs']) return null;

                    // --- Linked List Renderer ---
                    if (isLinkedList) {
                        const nextPtrs = arrays['NextPtrs'];
                        // Construct list order from logic or just assume 0..N if generic? 
                        // In reverse_linked_list.c, indices 0..4 are nodes. next_ptrs[i] is index of next node.
                        // We need to find the head. Usually head is start_node argument, but simple visualization:
                        // Just render all nodes 0..N in a row, with arrows pointing to next_ptrs[i].
                        // OR layout them following the list?
                        // Let's layout following the list if possible, or just linear 0..N with curved arrows.
                        // Linear 0..N with arrows is easier to see "reversing" (arrows flip direction).

                        const nodeRadius = 25;
                        const gap = 80;
                        const startX = 50;
                        const y = 100;
                        const canvasWidth = Math.max(800, data.length * gap + 100);

                        return (
                            <div key={`linked-list-${idx}`} className="flex flex-col gap-2 items-center w-full">
                                <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Linked List</h3>
                                <div className="relative w-full glass-panel rounded-xl overflow-x-auto overflow-y-hidden custom-scrollbar" style={{ maxHeight: '250px' }}>
                                    <div className="inline-block min-w-full" style={{ width: `${canvasWidth}px` }}>
                                        <svg width={canvasWidth} height="200" className="block">
                                            <defs>
                                                <marker id="arrowhead-ll" markerWidth="8" markerHeight="6" refX="24" refY="3" orient="auto">
                                                    <polygon points="0 0, 8 3, 0 6" fill="var(--color-text-secondary)" />
                                                </marker>
                                            </defs>

                                        {/* Edges (NextPtrs) */}
                                        {data.map((_, idx) => {
                                            const nextIdx = nextPtrs[idx];
                                            if (nextIdx === -1) return null; // NULL ptr

                                            const x1 = startX + idx * gap;
                                            const y1 = y;
                                            const x2 = startX + nextIdx * gap;
                                            const y2 = y;

                                            return (
                                                <path
                                                    key={`edge-next-${idx}`}
                                                    d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 - 40} ${x2} ${y2}`}
                                                    stroke="var(--color-border)"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    markerEnd="url(#arrowhead-ll)"
                                                />
                                            );
                                        })}

                                        {/* Edges (PrevPtrs - for DLL) */}
                                        {arrays['PrevPtrs'] && data.map((_, idx) => {
                                            const prevIdx = arrays['PrevPtrs'][idx];
                                            if (prevIdx === undefined || prevIdx === -1) return null;

                                            const x1 = startX + idx * gap;
                                            const y1 = y;
                                            const x2 = startX + prevIdx * gap;
                                            const y2 = y;

                                            return (
                                                <path
                                                    key={`edge-prev-${idx}`}
                                                    d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 + 40} ${x2} ${y2}`}
                                                    stroke="var(--color-accent-secondary)"
                                                    strokeWidth="2"
                                                    strokeDasharray="4"
                                                    fill="none"
                                                    markerEnd="url(#arrowhead-ll)"
                                                />
                                            );
                                        })}

                                        {/* Nodes */}
                                        {data.map((val, idx) => {
                                            const x = startX + idx * gap;

                                            const relevantHighlights = Object.entries(highlights || {})
                                                .filter(([_, ptrIdx]) => ptrIdx === idx)
                                                .map(([ptrName]) => ptrName);
                                            const isHighlighted = relevantHighlights.length > 0;

                                            return (
                                                <g key={`ll-node-${idx}`}>
                                                    <circle
                                                        cx={x} cy={y} r={nodeRadius}
                                                        fill={isHighlighted ? "var(--color-accent-primary)" : "var(--color-bg-tertiary)"}
                                                        stroke={isHighlighted ? "var(--color-accent-hover)" : "var(--color-accent-secondary)"}
                                                        strokeWidth={isHighlighted ? 3 : 2}
                                                    />
                                                    <text
                                                        x={x} y={y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fill={isHighlighted ? "white" : "var(--color-text-primary)"}
                                                        fontSize="14"
                                                        fontWeight="bold"
                                                    >
                                                        {val}
                                                    </text>

                                                    {/* Index comparison helper? No, just address/index */}
                                                    <text x={x} y={y + 40} textAnchor="middle" fill="var(--color-text-tertiary)" fontSize="10">{idx}</text>

                                                    {/* Pointers */}
                                                    {isHighlighted && (
                                                        <text x={x} y={y - 35} textAnchor="middle" fill="var(--color-accent-primary)" fontSize="12" fontWeight="bold">{relevantHighlights.join(', ')}</text>
                                                    )}
                                                </g>
                                            );
                                        })}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // --- Graph Renderer ---
                    if (isGraphMatrix) {
                        const size = Math.sqrt(data.length);
                        const nodes = Array.from({ length: size }, (_, i) => i);
                        const radius = 100;
                        const center = 150;

                        return (
                            <div key={`graph-${idx}`} className="flex flex-col gap-2 items-center w-full">
                                <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{name.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                <div className="relative w-[300px] h-[300px] glass-panel rounded-xl flex items-center justify-center">
                                    <svg width="300" height="300" viewBox="0 0 300 300">
                                        <defs>
                                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                                                <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-text-secondary)" opacity="0.5" />
                                            </marker>
                                        </defs>

                                        {/* Edges */}
                                        {nodes.map(i => nodes.map(j => {
                                            if (data[i * size + j]) {
                                                const angle1 = (i / size) * 2 * Math.PI - Math.PI / 2;
                                                const angle2 = (j / size) * 2 * Math.PI - Math.PI / 2;
                                                const x1 = center + radius * Math.cos(angle1);
                                                const y1 = center + radius * Math.sin(angle1);
                                                const x2 = center + radius * Math.cos(angle2);
                                                const y2 = center + radius * Math.sin(angle2);
                                                return (
                                                    <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-border)" strokeWidth="1" markerEnd="url(#arrowhead)" />
                                                );
                                            }
                                            return null;
                                        }))}

                                        {/* Nodes */}
                                        {nodes.map(i => {
                                            const angle = (i / size) * 2 * Math.PI - Math.PI / 2;
                                            const x = center + radius * Math.cos(angle);
                                            const y = center + radius * Math.sin(angle);

                                            // Check visited status from 'Visited' array if it exists
                                            let isVisited = false;
                                            if (arrays['Visited'] && arrays['Visited'][i] === 1) isVisited = true;

                                            // Check highlight from logs
                                            const relevantHighlights = Object.entries(highlights || {})
                                                .filter(([_, ptrIdx]) => ptrIdx === i) // Assuming highlights map to node indices
                                                .map(([ptrName]) => ptrName);
                                            const isHighlighted = relevantHighlights.length > 0;

                                            return (
                                                <g key={`graph-node-${i}`}>
                                                    <circle
                                                        cx={x} cy={y} r="20"
                                                        fill={isHighlighted ? "var(--color-accent-primary)" : (isVisited ? "var(--color-accent-secondary)" : "var(--color-bg-tertiary)")}
                                                        stroke={isHighlighted ? "var(--color-accent-hover)" : "var(--color-border)"}
                                                        strokeWidth={isHighlighted ? 3 : 2}
                                                    />
                                                    <text
                                                        x={x} y={y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fill="var(--color-text-primary)"
                                                        fontSize="14"
                                                        fontWeight="bold"
                                                    >
                                                        {i}
                                                    </text>
                                                    {/* Labels */}
                                                    {isHighlighted && (
                                                        <text x={x} y={y - 30} textAnchor="middle" fill="var(--color-accent-primary)" fontSize="10">{relevantHighlights.join(', ')}</text>
                                                    )}
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </div>
                            </div>
                        );
                    }

                    // --- Tree Renderer ---
                    if (isTreeStructure) {
                        // Calculate tree depth based on the furthest node index
                        const maxIndex = data.length - 1;
                        const maxDepth = Math.floor(Math.log2(maxIndex + 1));

                        // Compact sizing for better fit
                        const verticalSpacing = 70;
                        const nodeRadius = 20;
                        const baseSpacing = 50; // Base horizontal spacing

                        // Smart width calculation - more compact
                        const maxNodesAtBottom = Math.pow(2, maxDepth);
                        const canvasWidth = Math.max(600, maxNodesAtBottom * baseSpacing);
                        const canvasHeight = Math.max(350, (maxDepth + 1) * verticalSpacing + 80);

                        // Helper to get coordinates
                        const getCoords = (idx) => {
                            const depth = Math.floor(Math.log2(idx + 1));
                            const posInLevel = (idx + 1) - Math.pow(2, depth);
                            const totalInLevel = Math.pow(2, depth);

                            // Distribute nodes evenly across the full canvas width for that level
                            const sectionWidth = canvasWidth / totalInLevel;
                            const x = sectionWidth * posInLevel + sectionWidth / 2;

                            const y = depth * verticalSpacing + 40;
                            return { x, y };
                        };

                        return (
                            <div key={`tree-${idx}`} className="flex flex-col gap-2 items-center w-full">
                                <div className="relative w-full overflow-auto glass-panel rounded-xl custom-scrollbar" style={{ maxHeight: '500px', maxWidth: '100%' }}>
                                    <div className="inline-block min-w-full p-4" style={{ width: `${canvasWidth}px` }}>
                                        <svg width={canvasWidth} height={canvasHeight} className="block">
                                            <defs>
                                                <marker id="arrowhead-tree" markerWidth="6" markerHeight="4" refX="18" refY="2" orient="auto">
                                                    <polygon points="0 0, 6 2, 0 4" fill="var(--color-border)" />
                                                </marker>
                                            </defs>

                                        {/* Edges */}
                                        {data.map((val, idx) => {
                                            if (val === null || val === -999 || idx === 0) return null;

                                            // Check if parent exists
                                            const parentIdx = Math.floor((idx - 1) / 2);
                                            if (data[parentIdx] === null || data[parentIdx] === -999) return null;

                                            const { x: x1, y: y1 } = getCoords(parentIdx);
                                            const { x: x2, y: y2 } = getCoords(idx);

                                            return (
                                                <line
                                                    key={`line-${idx}`}
                                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                                    stroke="var(--color-border)"
                                                    strokeWidth="2"
                                                />
                                            );
                                        })}

                                        {/* Nodes */}
                                        {data.map((val, idx) => {
                                            if (val === null || val === -999) return null;

                                            const { x, y } = getCoords(idx);

                                            // Highlights
                                            const relevantHighlights = Object.entries(highlights || {})
                                                .filter(([_, ptrIdx]) => ptrIdx === idx)
                                                .map(([ptrName]) => ptrName);
                                            const isHighlighted = relevantHighlights.length > 0;

                                            return (
                                                <g key={`tree-node-${idx}`}>
                                                    <circle
                                                        cx={x} cy={y} r={nodeRadius}
                                                        fill={isHighlighted ? "var(--color-accent-primary)" : "var(--color-bg-tertiary)"}
                                                        stroke={isHighlighted ? "var(--color-accent-hover)" : "var(--color-accent-secondary)"}
                                                        strokeWidth={isHighlighted ? 3 : 2}
                                                    />
                                                    <text
                                                        x={x} y={y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fill={isHighlighted ? "white" : "var(--color-text-primary)"}
                                                        fontSize="16"
                                                        fontWeight="bold"
                                                    >
                                                        {val}
                                                    </text>

                                                    {isHighlighted && (
                                                        <text x={x} y={y - 35} textAnchor="middle" fill="var(--color-accent-primary)" fontSize="11" fontWeight="bold">{relevantHighlights.join(', ')}</text>
                                                    )}
                                                </g>
                                            );
                                        })}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // --- Default Array / Bar Renderer ---
                    const maxValue = isSortArray ? Math.max(...data, 1) : 0;

                    return (
                        <div key={`array-${idx}`} className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">{name}</h3>
                            <div className={`flex flex-wrap gap-2 p-4 glass-panel rounded-xl min-h-[100px] items-end justify-center relative ${isSortArray ? 'h-[300px]' : ''}`}>
                                {data.map((val, idx) => {
                                    const relevantHighlights = Object.entries(highlights || {})
                                        .filter(([_, ptrIdx]) => ptrIdx === idx)
                                        .map(([ptrName]) => ptrName);

                                    const isHighlighted = relevantHighlights.length > 0;

                                    // Bar Height Calculation (if sorting)
                                    // Min height 40px, scaling based on max value
                                    const hPercent = isSortArray ? Math.max(10, (val / maxValue) * 100) : 100;

                                    return (
                                        <div key={`array-item-${idx}`} className="relative group flex flex-col items-center justify-end h-full">
                                            {/* Index Label */}
                                            <div className={`absolute ${isSortArray ? '-bottom-6' : '-top-6'} text-xs text-[var(--color-text-tertiary)]`}>
                                                {idx}
                                            </div>

                                            {/* Sliding Window Highlight (Longest Substring) */}
                                            {name.toLowerCase().includes('string') && highlights['left'] !== undefined && highlights['right'] !== undefined && idx >= highlights['left'] && idx <= highlights['right'] && (
                                                <div className="absolute inset-0 bg-[var(--color-accent-primary)] opacity-20 -m-1 rounded-md z-0" />
                                            )}

                                            {/* Array Item (Box or Bar) */}
                                            <motion.div
                                                layout
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                    height: isSortArray ? `${hPercent}%` : '3rem',
                                                    width: isSortArray ? '2.5rem' : '3rem',
                                                    borderColor: isHighlighted ? 'var(--color-accent-primary)' : 'rgba(48, 54, 61, 0.5)',
                                                    backgroundColor: isHighlighted ? 'rgba(31, 111, 235, 0.4)' : (isSortArray ? 'rgba(88, 166, 255, 0.2)' : 'rgba(22, 27, 34, 0.6)')
                                                }}
                                                className={`flex items-center justify-center border rounded-lg font-bold shadow-sm relative z-10 ${isSortArray ? 'items-end pb-2' : ''}`}
                                            >
                                                {/* Heuristic: If Stack/String show char, else val. For bars show val at bottom inside bar? */}
                                                <span className={`text-sm ${isSortArray ? 'mb-1 text-blue-100' : ''}`}>
                                                    {((name.toLowerCase().includes('stack') || name.toLowerCase().includes('string') || name.toLowerCase() === 's') && !isSortArray)
                                                        ? String.fromCharCode(val)
                                                        : val}
                                                </span>
                                            </motion.div>

                                            {/* Pointers/Highlights */}
                                            {isHighlighted && (
                                                <div className={`absolute ${isSortArray ? '-top-8' : '-bottom-8'} left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20`}>
                                                    {relevantHighlights.map(h => (
                                                        <motion.div
                                                            key={h}
                                                            initial={{ y: -5, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            className="px-2 py-0.5 bg-[var(--color-accent-secondary)] text-[10px] rounded text-white font-mono whitespace-nowrap shadow-lg shadow-blue-500/20"
                                                        >
                                                            {h}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Variables Section */}
            {variables && Object.keys(variables).length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                    {Object.entries(variables).map(([name, val]) => (
                        <Card key={name} className="p-4 flex flex-col gap-1 min-w-[120px] items-center justify-center">
                            <span className="text-xs text-[var(--color-text-secondary)] uppercase">{name}</span>
                            <span className="text-xl font-mono font-bold text-[var(--color-sh-function)]">{val}</span>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
