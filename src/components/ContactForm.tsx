import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, User, Building2, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');
    
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) return;

        setStatus('submitting');
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, company, message }),
            });

            if (response.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setCompany('');
                setMessage('');
            } else {
                const errText = await response.text();
                throw new Error(errText || 'Error al enviar');
            }
        } catch (error: any) {
            console.error('Error sending form:', error);
            setStatus('error');
            setErrorMessage(error.message || t('contact.errorDesc'));
        }
    };

    return (
        <section id="contacto" className="py-24 bg-background relative overflow-hidden border-t border-white/5">
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase block mb-3">
                            {t('header.contact')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold font-sans text-textMain leading-tight mb-6">
                            {t('contact.title')}
                        </h2>
                        <p className="text-lg text-textMuted mb-12 max-w-lg leading-relaxed">
                            {t('contact.subtitle')}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-textMain font-bold text-sm uppercase tracking-wide">Email</h4>
                                    <a href="mailto:ventas@myceliot.com" className="text-textMuted hover:text-primary transition-colors text-base">
                                        ventas@myceliot.com
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <Building2 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-textMain font-bold text-sm uppercase tracking-wide">Red LoRaWAN</h4>
                                    <p className="text-textMuted text-base">
                                        Cobertura privada y autónoma para agro e industria.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-surface/40 backdrop-blur-md border border-white/5 p-8 sm:p-10 rounded-md hover:border-primary/20 transition-colors relative"
                    >
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success-state"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center text-center py-12"
                                >
                                    <CheckCircle2 className="h-16 w-16 text-primary mb-6 animate-pulse" />
                                    <h3 className="text-2xl font-bold text-textMain mb-2">
                                        {t('contact.successTitle')}
                                    </h3>
                                    <p className="text-textMuted max-w-sm">
                                        {t('contact.successDesc')}
                                    </p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 px-6 py-2 border border-primary/20 hover:border-primary/50 text-primary text-sm font-medium rounded-sm transition-colors"
                                    >
                                        Volver a escribir
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form-state"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {status === 'error' && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-sm flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold">{t('contact.errorTitle')}</h4>
                                                <p className="text-xs text-red-300 mt-1">{errorMessage}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-textMain mb-2">
                                            {t('contact.name')} <span className="text-primary">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted/50" />
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder={t('contact.namePlaceholder')}
                                                className="w-full bg-surface border border-white/10 rounded-sm pl-12 pr-4 py-3.5 text-textMain placeholder:text-textMuted/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-textMain mb-2">
                                            {t('contact.email')} <span className="text-primary">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted/50" />
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t('contact.emailPlaceholder')}
                                                className="w-full bg-surface border border-white/10 rounded-sm pl-12 pr-4 py-3.5 text-textMain placeholder:text-textMuted/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Company Field */}
                                    <div>
                                        <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-textMain mb-2">
                                            {t('contact.company')}
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textMuted/50" />
                                            <input
                                                type="text"
                                                id="company"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                placeholder={t('contact.companyPlaceholder')}
                                                className="w-full bg-surface border border-white/10 rounded-sm pl-12 pr-4 py-3.5 text-textMain placeholder:text-textMuted/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-textMain mb-2">
                                            {t('contact.message')} <span className="text-primary">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder={t('contact.messagePlaceholder')}
                                            className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3.5 text-textMain placeholder:text-textMuted/30 focus:outline-none focus:border-primary/50 transition-colors text-sm h-32 resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-4 bg-primary text-background font-bold rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                {t('contact.sending')}
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                {t('contact.submit')}
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
