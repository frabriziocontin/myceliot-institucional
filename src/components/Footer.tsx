import { Activity, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-background pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-textMain mb-6">
                        Elimine los puntos ciegos de su negocio hoy.
                    </h2>
                    <button className="px-8 py-4 bg-primary text-background font-bold rounded-sm hover:bg-primary/90 transition-all inline-flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Contactar a Ventas
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-white/5">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="h-8 w-8 text-primary" />
                            <span className="font-sans font-bold text-2xl tracking-tighter text-textMain">
                                Mycel<span className="text-primary">IoT</span>
                            </span>
                        </div>
                        <p className="text-textMuted max-w-sm">
                            El micelio de la tecnología. Redes LoRaWAN descentralizadas para el agro y la industria pesada.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-textMain font-bold mb-4">Empresa</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-textMuted hover:text-primary transition-colors text-sm">Nosotros</a></li>
                            <li><a href="#" className="text-textMuted hover:text-primary transition-colors text-sm">Tecnología</a></li>
                            <li><a href="#" className="text-textMuted hover:text-primary transition-colors text-sm">Casos de Éxito</a></li>
                            <li><a href="#" className="text-textMuted hover:text-primary transition-colors text-sm">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-textMain font-bold mb-4">Legal & Redes</h4>
                        <ul className="space-y-3 mb-6">
                            <li><a href="#" className="text-textMuted hover:text-primary transition-colors text-sm">Términos y Condiciones</a></li>
                            <li><a href="#" className="text-textMuted hover:text-primary transition-colors text-sm">Privacidad de Datos</a></li>
                        </ul>
                        <div className="flex gap-4">
                            <a href="#" className="text-textMuted hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-textMuted hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 mt-12 border-t border-white/5 text-center text-sm text-textMuted">
                    <p>&copy; {new Date().getFullYear()} MycelIoT. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
