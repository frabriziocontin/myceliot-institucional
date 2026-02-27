import { LocateFixed, Factory, MapPin, Zap, ActivitySquare, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export default function Solutions() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <section id="soluciones" className="py-24 bg-surface/60 backdrop-blur-md relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-textMain mb-4">
                        Soluciones B2B
                    </h2>
                    <p className="text-lg text-textMuted">
                        Despliegue rápido, autonomía energética y alcance kilométrico.
                        Monitoree variables críticas sin depender de cobertura celular.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Bento Item 1 - Smart Agro (Large) */}
                    <motion.div variants={item} className="md:col-span-2 relative group rounded-md border border-white/5 bg-background p-8 overflow-hidden flex flex-col justify-end hover:border-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <img src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c6cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Agro" className="w-[300px] h-auto object-cover opacity-50 grayscale mix-blend-overlay" />
                        </div>

                        <div className="relative z-10">
                            <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6">
                                <LocateFixed className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-textMain mb-2">Smart Agro</h3>
                            <p className="text-textMuted max-w-md">
                                Monitoreo de boyeros eléctricos de 9000V, medición de niveles en tanques australianos y GPS tracking de ganado en tiempo real.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                <span className="text-xs font-semibold px-2 py-1 bg-white/5 text-textMuted rounded-sm flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> 9000V
                                </span>
                                <span className="text-xs font-semibold px-2 py-1 bg-white/5 text-textMuted rounded-sm flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> GPS Tracking
                                </span>
                                <span className="text-xs font-semibold px-2 py-1 bg-white/5 text-textMuted rounded-sm flex items-center gap-1">
                                    <ActivitySquare className="w-3 h-3" /> Telemetría
                                </span>
                            </div>
                        </div>

                        <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 rounded-md transition-colors pointer-events-none" />
                    </motion.div>

                    {/* Bento Item 2 - Industria 4.0 (Tall/Square) */}
                    <motion.div variants={item} className="relative group rounded-md border border-white/5 bg-background p-8 overflow-hidden flex flex-col justify-end hover:border-primary/50 transition-colors">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center">
                                <Factory className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-textMain mb-2">Industria 4.0</h3>
                                <p className="text-sm text-textMuted">
                                    Mantenimiento predictivo de maquinaria pesada y control de variables físicas (temperatura, vibración, humedad) en plantas industriales.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Item 3 - Infraestructura (Wide) */}
                    <motion.div variants={item} className="md:col-span-3 relative group rounded-md border border-white/5 bg-background p-8 overflow-hidden flex flex-col md:flex-row items-center md:items-end justify-between hover:border-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 flex justify-end">
                            {/* Abstract geometric background for infra */}
                            <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-30 mix-blend-screen text-primary fill-current">
                                <path d="M0 0h400v400H0z" fill="none" />
                                <circle cx="350" cy="50" r="100" className="stroke-current" strokeWidth="2" fill="none" />
                                <circle cx="350" cy="50" r="150" className="stroke-current stroke-dashed" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                            </svg>
                        </div>

                        <div className="relative z-10 max-w-xl">
                            <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6">
                                <Sun className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-textMain mb-2">Infraestructura Autónoma</h3>
                            <p className="text-textMuted">
                                Nodos solares y baterías de ultra-larga duración (hasta 10 años). Nuestra conectividad LoRaWAN privada le garantiza soberanía sobre sus datos, operando donde el 4G/5G no llega.
                            </p>
                        </div>

                        <div className="relative z-10 mt-6 md:mt-0 flex gap-4">
                            <div className="text-center p-4 bg-surface rounded-sm border border-white/5">
                                <span className="block text-xl font-bold text-textMain">15km+</span>
                                <span className="text-xs text-textMuted uppercase tracking-wider block mt-1">Alcance LoRa</span>
                            </div>
                            <div className="text-center p-4 bg-surface rounded-sm border border-white/5">
                                <span className="block text-xl font-bold text-textMain">10 Años</span>
                                <span className="text-xs text-textMuted uppercase tracking-wider block mt-1">Batería</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
