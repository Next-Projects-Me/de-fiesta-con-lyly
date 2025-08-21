export interface MercadoLibreTokenSuccess {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    scope?: string;
    user_id?: number;
    refresh_token?: string;
}


export interface MercadoLibreTokenError {
    ok?: boolean;
    message?: string;
    error?: string;
    status?: number;
    cause?: string[];
}

