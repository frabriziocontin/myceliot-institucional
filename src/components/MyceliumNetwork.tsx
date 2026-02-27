import { useEffect, useRef } from 'react';

export default function MyceliumNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        let mouseX = 0;
        let mouseY = 0;

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
        });

        resize();

        // Node definition
        interface Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            connections: Node[];
        }

        const nodes: Node[] = [];
        const numNodes = Math.floor((width * height) / 15000); // Responsive number of nodes
        const maxDistance = 150;

        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 1.5,
                connections: []
            });
        }

        interface Pulse {
            from: Node;
            to: Node;
            progress: number;
            speed: number;
        }

        let pulses: Pulse[] = [];
        const colorPulse = 'rgba(245, 166, 35, 0.8)'; // primary with alpha

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update nodes and find connections
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Mouse repulsion
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    node.x -= (dx / dist) * 1;
                    node.y -= (dy / dist) * 1;
                }

                node.connections = [];
            });

            // Draw connections
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        nodes[i].connections.push(nodes[j]);
                        nodes[j].connections.push(nodes[i]);

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(155, 164, 181, ${0.15 * (1 - dist / maxDistance)})`;
                        ctx.stroke();
                    }
                }
            }

            // Generate random pulses simulating data packets
            if (Math.random() < 0.05) {
                const startNode = nodes[Math.floor(Math.random() * nodes.length)];
                if (startNode.connections.length > 0) {
                    const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
                    pulses.push({
                        from: startNode,
                        to: endNode,
                        progress: 0,
                        speed: 0.02 + Math.random() * 0.03
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
                ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
                ctx.fillStyle = colorPulse;
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#F5A623';
            }
            ctx.shadowBlur = 0; // Reset shadow

            // Draw nodes
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(155, 164, 181, 0.4)';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1A1D21_100%)] pointer-events-none" />
        </div>
    );
}
