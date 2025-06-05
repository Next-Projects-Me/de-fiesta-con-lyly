export interface BoldResponse {
    payload: Payload;
    errors: any[];
}

export interface Payload {
    payment_link: string;
    url: string;
}
