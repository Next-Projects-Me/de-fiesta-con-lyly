import brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
)

const smtpEmail = new brevo.SendSmtpEmail();

interface Params {
    email: string,
    name: string,
    link: string
}

export async function sendEmail({ email, name, link }: Params) {

    smtpEmail.subject = 'Recuperación de contraseña'
    smtpEmail.to = [
        {
            email: email,
            name: name
        }
    ]

    smtpEmail.htmlContent =
        `<html>
            <body>
                <h1>Querido usuario</h1>
                <p>A continuación encontrará el link para el cambio de contraseña: </p>
                <a href="${link}">Recupérala aquí</a>
            </body>
        </html>`;

    smtpEmail.sender = {
        email: "alejandrovaz9522@gmail.com",
        name: "De Fiesta Con Lyly"
    }

    await apiInstance.sendTransacEmail(smtpEmail);
}
