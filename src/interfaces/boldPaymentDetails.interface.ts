export interface BoldPaymentDetails {
    id: string;
    total: number;
    status: string;
    expiration_date: number;
    description: null;
    currency: string;
    api_version: number;
    subtotal: number;
    tip_amount: number;
    taxes: any[];
    creation_date: number;
    payment_method: null;
    transaction_id: null;
    amount_type: string;
    is_sandbox: boolean;
    callback_url: string;
    reference: string;
}
