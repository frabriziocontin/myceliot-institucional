import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logoMyceliot from '../assets/images/logo.png';

export default function Header() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangMenuOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                        <img src={logoMyceliot} alt="MycelIoT Logo" className="h-12 w-auto" />
                        <span className="font-sans font-bold text-2xl tracking-tighter text-textMain">
                            Mycel<span className="text-primary">IoT</span>
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#soluciones" className="text-sm font-medium hover:text-primary transition-colors">{t('header.solutions')}</a>
                        <a href="#tecnologia" className="text-sm font-medium hover:text-primary transition-colors">{t('header.technology')}</a>
                        <a href="#nosotros" className="text-sm font-medium hover:text-primary transition-colors">{t('header.about')}</a>
                        <a href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">{t('header.contact')}</a>
                    </nav>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-2 text-textMuted hover:text-white transition-colors"
                            >
                                <Globe className="h-5 w-5" />
                                <span className="text-sm font-medium uppercase">{i18n.resolvedLanguage || 'es'}</span>
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-32 bg-surface border border-white/10 rounded-sm shadow-xl py-1">
                                    <button onClick={() => changeLanguage('es')} className="w-full text-left px-4 py-2 text-sm text-textMain hover:bg-white/5">Español</button>
                                    <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 text-sm text-textMain hover:bg-white/5">English</button>
                                    <button onClick={() => changeLanguage('pt')} className="w-full text-left px-4 py-2 text-sm text-textMain hover:bg-white/5">Português</button>
                                </div>
                            )}
                        </div>
                        <a href="https://brave-cliff-0ff7de60f.2.azurestaticapps.net/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-sm border border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm tracking-wide">
                            {t('header.platformAccess')}
                        </a>
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
                        <a href="#soluciones" className="block text-base font-medium hover:text-primary">{t('header.solutions')}</a>
                        <a href="#tecnologia" className="block text-base font-medium hover:text-primary">{t('header.technology')}</a>
                        <a href="#nosotros" className="block text-base font-medium hover:text-primary">{t('header.about')}</a>
                        <a href="#contacto" className="block text-base font-medium hover:text-primary">{t('header.contact')}</a>

                        <div className="flex gap-4 pt-2 pb-2 border-t border-white/5">
                            <button onClick={() => changeLanguage('es')} className={`text-sm ${i18n.resolvedLanguage === 'es' ? 'text-primary' : 'text-textMuted'}`}>ES</button>
                            <button onClick={() => changeLanguage('en')} className={`text-sm ${i18n.resolvedLanguage === 'en' ? 'text-primary' : 'text-textMuted'}`}>EN</button>
                            <button onClick={() => changeLanguage('pt')} className={`text-sm ${i18n.resolvedLanguage === 'pt' ? 'text-primary' : 'text-textMuted'}`}>PT</button>
                        </div>

                        <a href="https://brave-cliff-0ff7de60f.2.azurestaticapps.net/" target="_blank" rel="noopener noreferrer" className="block text-center w-full mt-4 px-6 py-3 rounded-sm border border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm">
                            {t('header.platformAccess')}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
