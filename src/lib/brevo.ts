import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Order } from '@/interfaces/order.interface';
import brevo from '@getbrevo/brevo';
import fs from 'fs';
import path from 'path';
import { currencyFormat } from '@/utils/currencyFormat';

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
)

const smtpEmail = new brevo.SendSmtpEmail();

interface Params {
    email: string,
    name: string,
    link: string,
    code?: string,
    order?: Order
}

export async function sendEmailToResetPassword({ email, name, link }: Params) {

    try {
        smtpEmail.subject = 'Recuperación de contraseña'
        smtpEmail.to = [
            {
                email: email,
                name: name
            }
        ]

        const templatePath = path.join(process.cwd(), 'src', 'emails', 'templates', 'recovery-password.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        htmlContent = htmlContent.replace('{{reset_link}}', link);
        smtpEmail.htmlContent = htmlContent;

        smtpEmail.sender = {
            email: "alejandrovaz9522@gmail.com",
            name: "De Fiesta Con Lyly"
        }

        await apiInstance.sendTransacEmail(smtpEmail);

    }
    catch (error) {
        console.log(error)
    }
}

export async function sendEmailOrderConfirmation({ email, name, link, code }: Params) {

    try {
        smtpEmail.subject = 'Confirmación de compra'
        smtpEmail.to = [
            {
                email: email,
                name: name
            }
        ]

        const templatePath = path.join(process.cwd(), 'src', 'emails', 'templates', 'order-confirmation.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        htmlContent = htmlContent
            .replace('{{order_link}}', link)
            .replace('{{order_number}}', code!);

        smtpEmail.htmlContent = htmlContent;

        smtpEmail.sender = {
            email: "alejandrovaz9522@gmail.com",
            name: "De Fiesta Con Lyly"
        }

        await apiInstance.sendTransacEmail(smtpEmail);

    }
    catch (error) {
        console.log(error)
    }
}

export async function sendEmailOrderConfirmationAdmin({ email, name, link, code, order }: Params) {

    try {
        smtpEmail.subject = 'Confirmación de compra'
        smtpEmail.to = [
            {
                email: "alejandrovaz9522@gmail.com",
                name: "De Fiesta Con Lyly"
            }
        ]

        const templatePath = path.join(process.cwd(), 'src', 'emails', 'templates', 'order-confirmation-admin.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        const formattedStart = format(order!.createdAt, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

        htmlContent = htmlContent
            .replace('{{order_number}}', code!)
            .replace('{{customer_document}}', order!.OrderAddress!.document!)
            .replace('{{customer_name}}', name)
            .replace('{{customer_email}}', email)
            .replace('{{order_date}}', formattedStart)
            .replace('{{order_total}}', currencyFormat(order!.total!));

        htmlContent = htmlContent.replace('{{order_link}}', link);
        smtpEmail.htmlContent = htmlContent;

        smtpEmail.sender = {
            email: "alejandrovaz9522@gmail.com",
            name: "De Fiesta Con Lyly"
        }

        await apiInstance.sendTransacEmail(smtpEmail);

    }
    catch (error) {
        console.log(error)
    }
}
