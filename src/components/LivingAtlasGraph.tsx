import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TRIQUEL_KNOWLEDGE_GRAPH, KnowledgeNode, KnowledgeEdge } from '../data/triquelData';
import { useTheme } from '../context/ThemeContext';
import { Search, ZoomIn, ZoomOut, RotateCcw, Filter, Sparkles, Layers, Info } from 'lucide-react';

interface SimNode extends KnowledgeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const TYPE_COLORS: Record<string, { bg: string; border: string; glow: string; label: string }> = {
  concept: { bg: '#d97706', border: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', label: 'Accord / Concept' },
  project: { bg: '#059669', border: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', label: 'Region / Sanctuary' },
  solution: { bg: '#0284c7', border: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)', label: 'Care Infrastructure' },
  technology: { bg: '#7c3aed', border: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', label: 'Studio Engine' },
  skill: { bg: '#db2777', border: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)', label: 'Process / Skill' },
};

export const LivingAtlasGraph: React.FC<{ onSelectNode?: (nodeId: string) => void }> = ({ onSelectNode }) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('recognition');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Transform & viewport state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDraggingCanvas = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const draggedNode = useRef<SimNode | null>(null);

  // Initialize node positions
  const simNodes = useMemo(() => {
    const count = TRIQUEL_KNOWLEDGE_GRAPH.nodes.length;
    return TRIQUEL_KNOWLEDGE_GRAPH.nodes.map((node, i) => {
      const angle = (i / count) * Math.PI * 2;
      const dist = 180 + (i % 3) * 60;
      const isCore = ['harmony', 'midnight', 'recognition', 'point-zero', 'veyr'].includes(node.id);
      return {
        ...node,
        x: Math.cos(angle) * (isCore ? dist * 0.6 : dist),
        y: Math.sin(angle) * (isCore ? dist * 0.6 : dist),
        vx: 0,
        vy: 0,
        radius: isCore ? 24 : 18,
        color: TYPE_COLORS[node.type]?.border || '#e2e8f0',
      } as SimNode;
    });
  }, []);

  const nodesMap = useMemo(() => {
    const map = new Map<string, SimNode>();
    simNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [simNodes]);

  const selectedNode = useMemo(() => {
    return selectedNodeId ? TRIQUEL_KNOWLEDGE_GRAPH.nodes.find(n => n.id === selectedNodeId) : null;
  }, [selectedNodeId]);

  const connectedEdges = useMemo(() => {
    if (!selectedNodeId) return [];
    return TRIQUEL_KNOWLEDGE_GRAPH.edges.filter(
      e => e.source === selectedNodeId || e.target === selectedNodeId
    );
  }, [selectedNodeId]);

  // Simulation step
  useEffect(() => {
    let animId: number;
    let iteration = 0;

    const step = () => {
      // Simple relaxation simulation
      const k = 0.05;
      const repulsion = 1800;

      // Repulsion between all nodes
      for (let i = 0; i < simNodes.length; i++) {
        for (let j = i + 1; j < simNodes.length; j++) {
          const n1 = simNodes[i];
          const n2 = simNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);
          if (dist < 400) {
            const force = repulsion / distSq;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // Spring attraction along edges
      TRIQUEL_KNOWLEDGE_GRAPH.edges.forEach(edge => {
        const source = nodesMap.get(edge.source);
        const target = nodesMap.get(edge.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const desired = 140;
          const force = (dist - desired) * 0.008;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          source.vx += fx;
          source.vy += fy;
          target.vx -= fx;
          target.vy -= fy;
        }
      });

      // Central gravity & damping
      simNodes.forEach(node => {
        if (node === draggedNode.current) return;
        node.vx += -node.x * 0.002;
        node.vy += -node.y * 0.002;
        node.vx *= 0.88;
        node.vy *= 0.88;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Render
      renderCanvas();
      iteration++;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [simNodes, nodesMap, zoom, pan, selectedNodeId, hoveredNodeId, typeFilter, searchQuery, theme]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const isParchment = theme === 'parchment';

    if (isParchment) {
      ctx.fillStyle = '#f5ede0';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    ctx.save();
    // Center & apply Pan/Zoom
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.scale(zoom, zoom);

    // Subtle background coordinate grid
    ctx.strokeStyle = isParchment ? 'rgba(120, 85, 45, 0.08)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    const gridRange = 1200;
    for (let x = -gridRange; x <= gridRange; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, -gridRange);
      ctx.lineTo(x, gridRange);
      ctx.stroke();
    }
    for (let y = -gridRange; y <= gridRange; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(-gridRange, y);
      ctx.lineTo(gridRange, y);
      ctx.stroke();
    }

    // Draw central Point 0 concentric ripple
    const pointZero = nodesMap.get('point-zero');
    if (pointZero) {
      ctx.strokeStyle = isParchment ? 'rgba(180, 83, 9, 0.22)' : 'rgba(245, 158, 11, 0.12)';
      ctx.lineWidth = 1.5;
      [60, 130, 210, 300].forEach(r => {
        ctx.beginPath();
        ctx.arc(pointZero.x, pointZero.y, r, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    // Draw Edges
    TRIQUEL_KNOWLEDGE_GRAPH.edges.forEach(edge => {
      const src = nodesMap.get(edge.source);
      const tgt = nodesMap.get(edge.target);
      if (!src || !tgt) return;

      const isConnected = selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId);
      const isHovered = hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);

      if (isConnected || isHovered) {
        ctx.strokeStyle = isParchment ? '#0284c7' : '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = isParchment ? 'rgba(2, 132, 199, 0.5)' : '#38bdf8';
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = isParchment ? 'rgba(135, 105, 75, 0.38)' : 'rgba(120, 113, 108, 0.25)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw relationship arrow midpoint
      if (isConnected || isHovered) {
        const mx = (src.x + tgt.x) / 2;
        const my = (src.y + tgt.y) / 2;
        ctx.fillStyle = isParchment ? '#0284c7' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw Nodes
    simNodes.forEach(node => {
      const matchesSearch = !searchQuery || node.label.toLowerCase().includes(searchQuery.toLowerCase()) || node.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || node.type === typeFilter;
      const isSelected = selectedNodeId === node.id;
      const isHovered = hoveredNodeId === node.id;
      const isDimmed = (!matchesSearch || !matchesType);

      ctx.save();
      if (isDimmed) {
        ctx.globalAlpha = 0.15;
      }

      const style = TYPE_COLORS[node.type] || { bg: '#334155', border: '#94a3b8', glow: 'rgba(148, 163, 184, 0.3)' };

      // Glow effect if selected or hovered
      if (isSelected || isHovered) {
        ctx.shadowColor = style.glow;
        ctx.shadowBlur = 20;
      }

      // Outer ring for Accords & Point 0
      if (['harmony', 'midnight', 'recognition', 'point-zero', 'veyr'].includes(node.id)) {
        ctx.strokeStyle = style.border;
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Node body
      ctx.fillStyle = isSelected ? style.border : style.bg;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isParchment ? '#292524' : '#ffffff';
      ctx.lineWidth = isSelected ? 2.5 : 1.2;
      ctx.stroke();

      // Node label with halo for maximum contrast in both themes
      const labelText = node.label;
      ctx.font = `${isSelected ? 'bold 12px' : '11px'} system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      if (isParchment) {
        // Crisp parchment halo
        ctx.strokeStyle = '#f5ede0';
        ctx.lineWidth = 3.5;
        ctx.strokeText(labelText, node.x, node.y + node.radius + 8);
        ctx.fillStyle = isSelected ? '#92400e' : '#1c1917';
      } else {
        ctx.fillStyle = isSelected ? '#ffffff' : '#e7e5e4';
      }
      ctx.fillText(labelText, node.x, node.y + node.radius + 8);

      ctx.restore();
    });

    ctx.restore();
  };

  // Convert mouse screen coordinates to canvas world coordinates
  const screenToWorld = (screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const cx = screenX - rect.left - canvas.clientWidth / 2 - pan.x;
    const cy = screenY - rect.top - canvas.clientHeight / 2 - pan.y;
    return { x: cx / zoom, y: cy / zoom };
  };

  // Find node under world coordinates
  const findNodeAt = (wx: number, wy: number) => {
    for (let i = simNodes.length - 1; i >= 0; i--) {
      const n = simNodes[i];
      const dx = n.x - wx;
      const dy = n.y - wy;
      if (dx * dx + dy * dy <= (n.radius + 8) * (n.radius + 8)) {
        return n;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = screenToWorld(e.clientX, e.clientY);
    const node = findNodeAt(x, y);
    if (node) {
      draggedNode.current = node;
      setSelectedNodeId(node.id);
      if (onSelectNode) onSelectNode(node.id);
    } else {
      isDraggingCanvas.current = true;
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = screenToWorld(e.clientX, e.clientY);

    if (draggedNode.current) {
      draggedNode.current.x = x;
      draggedNode.current.y = y;
      draggedNode.current.vx = 0;
      draggedNode.current.vy = 0;
    } else if (isDraggingCanvas.current) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    } else {
      const node = findNodeAt(x, y);
      setHoveredNodeId(node ? node.id : null);
    }
  };

  const handleMouseUp = () => {
    draggedNode.current = null;
    isDraggingCanvas.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom(z => Math.max(0.4, Math.min(2.5, z * factor)));
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] w-full overflow-hidden bg-stone-950">
      {/* Main Canvas Area */}
      <div className="relative flex-1 h-full min-h-[400px]">
        {/* Top Controls Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl px-3 py-2 pointer-events-auto shadow-xl max-w-sm w-full">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Search concepts, regions, care nodes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs text-stone-100 placeholder-stone-400 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-stone-400 hover:text-stone-200">
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Filter pills */}
            <div className="flex items-center gap-1 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl p-1 shadow-xl overflow-x-auto max-w-md">
              {[
                { id: 'all', label: 'All (24)' },
                { id: 'concept', label: 'Accords' },
                { id: 'project', label: 'Regions' },
                { id: 'solution', label: 'Care' },
                { id: 'technology', label: 'Foundry' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTypeFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    typeFilter === f.id
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Zoom / Reset Controls */}
            <div className="flex items-center bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl p-1 shadow-xl">
              <button
                onClick={() => setZoom(z => Math.min(2.5, z * 1.2))}
                title="Zoom in"
                className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(z => Math.max(0.4, z / 1.2))}
                title="Zoom out"
                className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                title="Reset view"
                className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Bottom Banner */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3 bg-stone-900/80 backdrop-blur-md border border-stone-800/80 rounded-xl px-3 py-2 text-xs text-stone-400 pointer-events-none">
          <span className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Core Truth:
          </span>
          <span className="italic text-stone-300">"{TRIQUEL_KNOWLEDGE_GRAPH.core_truth}"</span>
          <span className="text-stone-600">|</span>
          <span>Click &amp; drag nodes to rearrange</span>
        </div>
      </div>

      {/* Inspector Sidebar */}
      <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-stone-800 bg-stone-900/95 backdrop-blur-md p-6 overflow-y-auto flex flex-col justify-between shrink-0 shadow-2xl">
        {selectedNode ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase"
                  style={{
                    backgroundColor: `${TYPE_COLORS[selectedNode.type]?.bg}33`,
                    color: TYPE_COLORS[selectedNode.type]?.border,
                    border: `1px solid ${TYPE_COLORS[selectedNode.type]?.border}66`,
                  }}
                >
                  {TYPE_COLORS[selectedNode.type]?.label || selectedNode.type}
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  ID: {selectedNode.id}
                </span>
              </div>
              <h2 className="text-xl font-bold text-stone-100">{selectedNode.label}</h2>
            </div>

            <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4">
              <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" /> Canonical Definition
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Connected Relations */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3 flex items-center justify-between">
                <span>Relational Edges ({connectedEdges.length})</span>
                <Layers className="w-3.5 h-3.5 text-stone-500" />
              </h3>

              {connectedEdges.length === 0 ? (
                <p className="text-xs text-stone-500 italic">No direct edges registered in primary graph.</p>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {connectedEdges.map(edge => {
                    const isSource = edge.source === selectedNode.id;
                    const otherId = isSource ? edge.target : edge.source;
                    const otherNode = TRIQUEL_KNOWLEDGE_GRAPH.nodes.find(n => n.id === otherId);

                    return (
                      <div
                        key={edge.id}
                        onClick={() => setSelectedNodeId(otherId)}
                        className="p-3 bg-stone-950/40 hover:bg-stone-800/60 border border-stone-800/80 hover:border-amber-500/50 rounded-lg cursor-pointer transition-all group"
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
                            {isSource ? '→ Connects to: ' : '← Governed by: '}
                            {otherNode?.label || otherId}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                            {edge.type}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 leading-snug line-clamp-2 group-hover:text-stone-300">
                          {edge.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Context Tip */}
            {selectedNode.id === 'point-zero' && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-400">Canonical Lock:</span> Point 0 is the coordinate of Attention before specialization. Veyr is the center coordinate, NOT a peripheral member inside the Circle of Kin.
              </div>
            )}
            {selectedNode.id === 'beaverkin-way' && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed">
                <span className="font-semibold text-emerald-400">Structural Rule:</span> Beaverkin Way is connective infrastructure and corridor logic, never simply a sixth biome.
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-stone-500">
            <Layers className="w-12 h-12 mb-3 stroke-1 text-stone-600" />
            <h3 className="text-stone-300 font-medium text-sm mb-1">Select Any Node</h3>
            <p className="text-xs text-stone-500">
              Click on an Accord, region, care protocol, or technology node in the Living Atlas to inspect its canonical relationships.
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="pt-6 mt-6 border-t border-stone-800/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
            Atlas Legend
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
            {Object.entries(TYPE_COLORS).map(([key, style]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: style.border }} />
                <span>{style.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
