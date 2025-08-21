export interface BoldResponse {
    payload: Payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[];
}

export interface Payload {
    payment_link: string;
    url: string;
}
