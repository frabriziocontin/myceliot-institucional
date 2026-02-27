import { useEffect, useRef } from 'react';

export default function GlobalMyceliumBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        let mouseX = width / 2;
        let mouseY = height / 2;
        let isMouseMoving = false;
        let mouseTimeout: any;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseMoving = true;
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => { isMouseMoving = false; }, 2000);
        });

        // Handle scrolling properly so mouse coordinates align with fixed canvas
        window.addEventListener('scroll', () => {
            // Since canvas is fixed, we don't need to adjust mouse coordinates,
            // they are relative to client window like the canvas.
        });

        resize();

        // Node definition
        interface Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseRadius: number;
            radius: number;
            connections: Node[];
            glowIntensity: number;
        }

        const nodes: Node[] = [];
        // More nodes for a global effect
        const numNodes = Math.floor((width * height) / 10000);
        const maxDistance = 160;
        const interactionRadius = 250;

        for (let i = 0; i < numNodes; i++) {
            const r = Math.random() * 1.5 + 1.5;
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                baseRadius: r,
                radius: r,
                connections: [],
                glowIntensity: 0
            });
        }

        interface Pulse {
            from: Node;
            to: Node;
            progress: number;
            speed: number;
        }

        let pulses: Pulse[] = [];
        const colorPulse = 'rgba(245, 166, 35, 1)'; // Solid amber

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update nodes and find connections
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Mouse interaction - dynamic glow and repel
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < interactionRadius) {
                    // Repel nodes instead of pulling them to avoid clumping (which causes O(N^2) lag)
                    if (dist < 120) {
                        node.x -= (dx / dist) * 1.5;
                        node.y -= (dy / dist) * 1.5;
                    }

                    // Increase glow
                    node.glowIntensity = Math.min(1, node.glowIntensity + 0.05);
                    node.radius = node.baseRadius + (1 - dist / interactionRadius) * 2;
                } else {
                    // Decay glow
                    node.glowIntensity = Math.max(0, node.glowIntensity - 0.02);
                    node.radius = node.baseRadius;
                }

                node.connections = [];
            });

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        nodes[i].connections.push(nodes[j]);
                        nodes[j].connections.push(nodes[i]);

                        const avgGlow = (nodes[i].glowIntensity + nodes[j].glowIntensity) / 2;

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        // Dynamic color scheme based on glow
                        const alpha = 0.15 * (1 - dist / maxDistance);

                        if (avgGlow > 0.1) {
                            // Amber glow for active connections
                            const burstAlpha = alpha + (avgGlow * 0.3);
                            ctx.strokeStyle = `rgba(245, 166, 35, ${burstAlpha})`;
                            ctx.lineWidth = 1 + (avgGlow * 1.5);
                        } else {
                            // Standard dormant grey
                            ctx.strokeStyle = `rgba(155, 164, 181, ${alpha})`;
                            ctx.lineWidth = 1;
                        }

                        ctx.stroke();
                    }
                }
            }

            // Generate random pulses
            // Higher chance to spawn near mouse
            const spawnRate = isMouseMoving ? 0.15 : 0.05;
            if (Math.random() < spawnRate) {
                // Prioritize nodes with high glow (near mouse)
                let startNode = nodes[Math.floor(Math.random() * nodes.length)];
                if (isMouseMoving && Math.random() < 0.7) {
                    const glowingNodes = nodes.filter(n => n.glowIntensity > 0.5 && n.connections.length > 0);
                    if (glowingNodes.length > 0) {
                        startNode = glowingNodes[Math.floor(Math.random() * glowingNodes.length)];
                    }
                }

                if (startNode.connections.length > 0) {
                    const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
                    pulses.push({
                        from: startNode,
                        to: endNode,
                        progress: 0,
                        speed: 0.015 + Math.random() * 0.025
                    });
                }
            }

            // Draw and update pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                const p = pulses[i];
                p.progress += p.speed;

                if (p.progress >= 1) {
                    pulses.splice(i, 1);
                    continue;
                }

                const currentX = p.from.x + (p.to.x - p.from.x) * p.progress;
                const currentY = p.from.y + (p.to.y - p.from.y) * p.progress;

                ctx.beginPath();
                ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = colorPulse;
                ctx.fill();
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#F5A623'; // Amber glow
            }
            ctx.shadowBlur = 0; // Reset shadow

            // Draw nodes
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

                if (node.glowIntensity > 0.1) {
                    ctx.fillStyle = `rgba(245, 166, 35, ${0.4 + node.glowIntensity * 0.4})`;
                    ctx.shadowBlur = 10 * node.glowIntensity;
                    ctx.shadowColor = '#F5A623';
                } else {
                    ctx.fillStyle = 'rgba(155, 164, 181, 0.4)';
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            });

            // Ambient background glow following the mouse
            if (isMouseMoving) {
                const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, interactionRadius * 1.5);
                gradient.addColorStop(0, 'rgba(245, 166, 35, 0.04)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(mouseTimeout);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
            {/* Global Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1A1D21_100%)] opacity-80" />
        </div>
    );
}
