import { Network } from 'lucide-react';

export default function Vision() {
    return (
        <section id="nosotros" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left Column */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-medium">
                            <Network className="h-4 w-4" />
                            <span>Visión Micelio</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-textMain leading-tight mb-6">
                            Inspirados en la naturaleza.<br />
                            <span className="text-textMuted">Diseñados para la industria.</span>
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="bg-surface p-8 rounded-sm border border-white/5 shadow-2xl">
                        <p className="text-lg text-textMuted leading-relaxed">
                            Al igual que los hongos conectan el bosque mediante una extensa e invisible red subterránea —el micelio—,
                            nuestros gateways LoRaWAN conectan cada activo físico de su empresa en una única plataforma de datos.
                        </p>
                        <div className="mt-6 pt-6 border-t border-white/5">
                            <p className="text-lg text-textMuted leading-relaxed">
                                Desde boyeros eléctricos y tanques australianos hasta silos y maquinaria pesada, creamos
                                <strong className="text-textMain font-medium"> redes descentralizadas y resilientes</strong> que le dan
                                un verdadero sistema nervioso a su operación física.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
