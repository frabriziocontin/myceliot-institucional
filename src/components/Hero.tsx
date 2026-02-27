import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">
            {/* Removed local MyceliumNetwork, now using global background */}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-sans font-bold text-textMain leading-tight tracking-tight mb-8">
                        El sistema nervioso de su <span className="text-primary">producción.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-textMuted mb-12 max-w-3xl mx-auto leading-relaxed">
                        Desplegamos redes IoT descentralizadas de largo alcance. Monitoreo en tiempo real para el agro y la industria, sin depender de redes celulares.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button className="px-8 py-4 bg-primary text-background font-bold rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
                            Explorar Soluciones
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-surface border border-white/10 text-textMain font-bold rounded-sm hover:bg-white/5 transition-all flex items-center justify-center">
                            Ver Tecnología
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative gradient overlay at bottom */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}
