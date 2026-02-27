import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="MycelIoT Logo" className="h-10 w-auto" />
                        <span className="font-sans font-bold text-2xl tracking-tighter text-textMain">
                            Mycel<span className="text-primary">IoT</span>
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#soluciones" className="text-sm font-medium hover:text-primary transition-colors">Soluciones</a>
                        <a href="#tecnologia" className="text-sm font-medium hover:text-primary transition-colors">Tecnología</a>
                        <a href="#nosotros" className="text-sm font-medium hover:text-primary transition-colors">Nosotros</a>
                        <a href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">Contacto</a>
                    </nav>

                    <div className="hidden md:flex items-center">
                        <button className="px-6 py-2 rounded-sm border border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm tracking-wide">
                            Acceso a Plataforma
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-textMuted hover:text-white">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-surface border-b border-white/5">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <a href="#soluciones" className="block text-base font-medium hover:text-primary">Soluciones</a>
                        <a href="#tecnologia" className="block text-base font-medium hover:text-primary">Tecnología</a>
                        <a href="#nosotros" className="block text-base font-medium hover:text-primary">Nosotros</a>
                        <a href="#contacto" className="block text-base font-medium hover:text-primary">Contacto</a>
                        <button className="w-full mt-4 px-6 py-3 rounded-sm border border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm">
                            Acceso a Plataforma
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
