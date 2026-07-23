const { app } = require('@azure/functions');
const { Resend } = require('resend');

app.http('sendEmail', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`sendEmail HTTP trigger function processed a request.`);

        try {
            const apiKey = process.env.RESEND_API_KEY;
            if (!apiKey) {
                context.log('Error: RESEND_API_KEY environment variable is not set.');
                return {
                    status: 500,
                    body: 'El servidor de correo no está configurado correctamente. Falta la clave RESEND_API_KEY en Azure.'
                };
            }

            const body = await request.json();
            const { name, email, company, message } = body;

            if (!name || !email || !message) {
                return {
                    status: 400,
                    body: 'Faltan campos obligatorios (nombre, correo o mensaje).'
                };
            }

            const resend = new Resend(apiKey);
            
            // Envío del mail
            // NOTA: 'onboarding@resend.dev' es el remitente de prueba gratuito de Resend.
            // Para usar tu propio dominio verificado (ej. ventas@myceliot.com) debes cambiarlo aquí abajo.
            const result = await resend.emails.send({
                from: 'MycelIoT Web <onboarding@resend.dev>',
                to: ['ventas@myceliot.com'],
                subject: `Nuevo contacto web: ${name} (${company || 'Particular'})`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                        <h2 style="color: #F5A623; border-bottom: 2px solid #F5A623; padding-bottom: 10px;">Nuevo Mensaje desde el Sitio Web</h2>
                        <p>Se ha recibido una nueva consulta de ventas:</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <td style="padding: 8px; font-weight: bold; width: 120px;">Nombre:</td>
                                <td style="padding: 8px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Email:</td>
                                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Empresa:</td>
                                <td style="padding: 8px;">${company || 'No especificada'}</td>
                            </tr>
                        </table>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #F5A623; margin-top: 20px; border-radius: 3px;">
                            <h4 style="margin-top: 0; color: #1A1D21;">Mensaje:</h4>
                            <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
                        </div>
                    </div>
                `
            });

            if (result.error) {
                context.log('Error de Resend API:', result.error);
                return {
                    status: 500,
                    body: result.error.message || 'Error al procesar el envío del correo en Resend.'
                };
            }

            return {
                status: 200,
                jsonBody: { success: true, id: result.data.id }
            };
        } catch (error) {
            context.log('Error inesperado al enviar el mail:', error);
            return {
                status: 500,
                body: `Ocurrió un error interno en el servidor: ${error.message}`
            };
        }
    }
});
