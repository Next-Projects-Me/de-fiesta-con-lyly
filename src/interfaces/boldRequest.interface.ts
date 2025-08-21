export interface BoldRequest {
    amount_type: string;
    amount: Amount;
    description?: string;
    expiration_date: number;
    callback_url?: string;
    payment_methods?: string[];
    image_url?: string;
}

export interface Amount {
    currency: string;
    taxes?: Tax[];
    tip_amount: number;
    total_amount: number;
}

export interface Tax {
    type: string;
    base: number;
    value: number;
}
