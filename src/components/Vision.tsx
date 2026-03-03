import { Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Vision() {
    const { t } = useTranslation();
    return (
        <section id="nosotros" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left Column */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-medium">
                            <Network className="h-4 w-4" />
                            <span>{t('vision.badge')}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-textMain leading-tight mb-6">
                            {t('vision.title1')}<br />
                            <span className="text-textMuted">{t('vision.title2')}</span>
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="bg-surface p-8 rounded-sm border border-white/5 shadow-2xl">
                        <p className="text-lg text-textMuted leading-relaxed">
                            {t('vision.p1')}
                        </p>
                        <div className="mt-6 pt-6 border-t border-white/5">
                            <p className="text-lg text-textMuted leading-relaxed">
                                {t('vision.p2Start')}
                                <strong className="text-textMain font-medium">{t('vision.p2Bold')}</strong>
                                {t('vision.p2End')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
