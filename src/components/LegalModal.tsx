import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, FileText, CheckCircle2, Flame, Zap, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'terms' | 'privacy';
}

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }: LegalModalProps) {
    const { i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialTab);
    const lang = i18n.resolvedLanguage || 'es';

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-background/85 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-4xl max-h-[88vh] bg-surface border border-white/10 rounded-md shadow-2xl flex flex-col overflow-hidden z-10"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-background/60">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-sm bg-primary/10 flex items-center justify-center">
                                {activeTab === 'terms' ? (
                                    <FileText className="h-5 w-5 text-primary" />
                                ) : (
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-textMain text-lg">
                                    {activeTab === 'terms'
                                        ? (lang === 'en' ? 'Terms & Conditions of Service' : lang === 'pt' ? 'Termos e Condições de Serviço' : 'Términos y Condiciones de Servicio')
                                        : (lang === 'en' ? 'Data Privacy Policy' : lang === 'pt' ? 'Política de Privacidade de Dados' : 'Política de Privacidad y Datos')}
                                </h3>
                                <p className="text-xs text-textMuted">
                                    MycelIoT • {lang === 'en' ? 'Last update: August 2026' : lang === 'pt' ? 'Última atualização: Agosto de 2026' : 'Última actualización: Agosto 2026'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-textMuted hover:text-textMain p-2 rounded-sm hover:bg-white/5 transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-white/5 bg-surface px-6 pt-2">
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                                activeTab === 'terms'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-textMuted hover:text-textMain'
                            }`}
                        >
                            <FileText className="h-4 w-4" />
                            {lang === 'en' ? 'Terms & Conditions' : lang === 'pt' ? 'Termos e Condições' : 'Términos y Condiciones'}
                        </button>
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                                activeTab === 'privacy'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-textMuted hover:text-textMain'
                            }`}
                        >
                            <ShieldCheck className="h-4 w-4" />
                            {lang === 'en' ? 'Privacy Policy' : lang === 'pt' ? 'Privacidade' : 'Política de Privacidad'}
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-textMuted leading-relaxed">
                        {activeTab === 'terms' ? (
                            <div className="space-y-6 text-textMain/90">
                                {/* Important Disclaimer Alert */}
                                <div className="p-4 bg-primary/10 border border-primary/20 rounded-sm text-xs text-textMain flex items-start gap-3">
                                    <ShieldAlert className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-primary mb-1">
                                            Aviso Legal Importante sobre Uso en Campo e Industria
                                        </p>
                                        <p className="text-textMuted">
                                            Los servicios y hardware de MycelIoT están diseñados para telemetría, monitoreo preventivo y optimización operativa. No constituyen sistemas de seguridad de vida ni reemplazan protocolos de inspección física y protección contra incendios o siniestros.
                                        </p>
                                    </div>
                                </div>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">1. Aceptación y Objeto</h4>
                                    <p className="text-textMuted">
                                        El presente contrato regula el acceso y uso de los dispositivos físicos de telemetría (nodos sensores, boyeros de 9000V, gateways LoRaWAN, trackers GPS) y de la plataforma de software en la nube provistos por <strong className="text-textMain">MycelIoT</strong> (en adelante, los "Servicios"). La adquisición o uso de cualquier componente implica la aceptación expresa e irrestricta de estos Términos.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">2. Garantía Limitada de Hardware (6 Meses)</h4>
                                    <p className="text-textMuted mb-2">
                                        MycelIoT otorga una <strong className="text-textMain">garantía limitada de seis (6) meses</strong> a partir de la fecha de entrega del hardware, cubriendo exclusivamente defectos de fabricación y ensamblaje de componentes electrónicos bajo condiciones normales de uso.
                                    </p>
                                    <p className="text-textMuted">
                                        <strong className="text-textMain">Exclusiones de Garantía:</strong> Quedan expresamente excluidos de la garantía los desperfectos ocasionados por: descargas atmosféricas (rayos), sobretensiones eléctricas no controladas, inundaciones, corrosión por inmersión indebida, manipulación mecánica por hacienda o maquinaria pesada, vandalismo, apertura de gabinetes estancos por personal no autorizado o modificaciones en el firmware.
                                    </p>
                                </section>

                                <section className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
                                    <h4 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
                                        <Flame className="h-5 w-5 text-red-400" />
                                        3. Exclusión Total de Responsabilidad por Incendios, Baterías y Riesgos Eléctricos
                                    </h4>
                                    <p className="text-xs text-textMain/90 mb-3">
                                        Esta cláusula constituye una condición esencial del contrato comercial de MycelIoT:
                                    </p>
                                    <ul className="space-y-2 text-xs text-textMuted list-disc pl-4">
                                        <li>
                                            <strong className="text-textMain">Instalación y Conexión de Alta Tensión (9000V):</strong> El Cliente es el único y exclusivo responsable de la instalación física, puesta a tierra reglamentaria y mantenimiento de los electrificadores, boyeros y tendidos de alambre. MycelIoT no responderá por arcos eléctricos, chispas o sobrecalentamientos derivados de defectos en electrificadores de terceros o mala fijación.
                                        </li>
                                        <li>
                                            <strong className="text-textMain">Baterías y Paneles Solares:</strong> Los dispositivos incorporan celdas de energía autónomas. MycelIoT no se responsabiliza por fallas térmicas, fugas químicas, cortocircuitos o ignición originadas por condiciones climáticas extremas, aplastamiento mecánico, perforación o manipulación de las celdas.
                                        </li>
                                        <li>
                                            <strong className="text-textMain">Exención de Daños por Fuego:</strong> En ningún caso MycelIoT, sus directores, empleados o distribuidores serán responsables civil, penal o económicamente por incendios de pastizales, campos, silos, ganado, maquinaria, naves industriales o instalaciones del Cliente o de terceros. Es obligación exclusiva del Cliente mantener contratadas pólizas de seguro vigentes contra incendios y siniestros agropecuarios/industriales.
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-primary" />
                                        4. Comunicaciones LoRaWAN y Condiciones de Propagación RF
                                    </h4>
                                    <p className="text-textMuted">
                                        La conectividad LoRaWAN opera en bandas de radiofrecuencia no licenciadas. El Cliente comprende que el alcance y la recepción de paquetes dependen de la línea de vista, relieve topográfico, vegetación y ruido electromagnético. MycelIoT no garantiza la recepción del 100% de los paquetes ni una latencia fija en zonas de sombra de radio.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">5. Propiedad de los Datos</h4>
                                    <p className="text-textMuted">
                                        El Cliente conserva la titularidad exclusiva sobre todos los datos brutos de telemetría generados por sus sensores (ubicación de ganado, niveles de agua, tensión de boyeros, vibraciones). MycelIoT utilizará dichos datos únicamente para proveer el servicio de la plataforma y de forma disociada y agregada para mejoras estadísticas globales.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">6. Límite Global de Responsabilidad</h4>
                                    <p className="text-textMuted">
                                        En la máxima medida permitida por la ley, la responsabilidad total agregada de MycelIoT ante cualquier reclamo derivado del hardware, software o servicios estará limitada al importe total abonado por el Cliente en concepto de suscripción a la plataforma durante los tres (3) meses anteriores al evento generador del daño.
                                    </p>
                                </section>
                            </div>
                        ) : (
                            <div className="space-y-6 text-textMain/90">
                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">1. Compromiso de Privacidad</h4>
                                    <p className="text-textMuted">
                                        En MycelIoT valoramos la privacidad y la confidencialidad de la información operativa y agronómica de su empresa. Esta política detalla el tratamiento de la información recopilada mediante nuestra plataforma web y dispositivos de telemetría.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">2. Información Recopilada</h4>
                                    <ul className="space-y-2 text-textMuted list-disc pl-4">
                                        <li><strong className="text-textMain">Datos de Contacto y Cuenta:</strong> Nombre, correo corporativo, empresa y número telefónico para la gestión de accesos a la plataforma.</li>
                                        <li><strong className="text-textMain">Datos de Telemetría:</strong> Registros transmitidos por los nodos (tensión en boyeros, nivel en tanques, coordenadas GPS ganaderas, variables de maquinaria).</li>
                                        <li><strong className="text-textMain">Registros Técnicos de Red:</strong> Calidad de señal (RSSI, SNR), estado de batería de nodos y métricas de tráfico de gateways LoRaWAN.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">3. Seguridad y Encriptación</h4>
                                    <p className="text-textMuted">
                                        Las transmisiones de datos a través de la red LoRaWAN utilizan encriptación nativa de 128 bits (claves de aplicación AppSKey y de red NwkSKey). Las comunicaciones entre su navegador y nuestra plataforma en la nube (`platform.myceliot.com`) están protegidas mediante protocolos SSL/TLS (HTTPS).
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">4. No Comercialización de Datos</h4>
                                    <p className="text-textMuted">
                                        MycelIoT no vende, alquila ni comercializa datos individuales o agronómicos de sus clientes a terceras partes, aseguradoras o comercializadoras de insumos.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-base font-bold text-primary mb-2">5. Contacto sobre Datos</h4>
                                    <p className="text-textMuted">
                                        Para ejercer derechos de acceso, rectificación o eliminación de sus datos de usuario, puede comunicarse a <a href="mailto:ventas@myceliot.com" className="text-primary hover:underline">ventas@myceliot.com</a> o <a href="mailto:contacto@myceliot.com" className="text-primary hover:underline">contacto@myceliot.com</a>.
                                    </p>
                                </section>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-white/10 bg-background/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-textMuted">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>MycelIoT S.A.S. • Protección legal e infraestructura IoT</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-primary text-background font-bold text-xs rounded-sm hover:bg-primary/90 transition-all uppercase tracking-wider"
                        >
                            Entendido
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
