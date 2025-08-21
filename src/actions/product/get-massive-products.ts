import { auth } from "@/auth.config";
import { MercadoLibreItems } from "@/interfaces/mercadoLibreItems";
import { MercadoLibreTokenSuccess } from "@/interfaces/mercadoLibreToken.interface";

const MlConfig = {
    API: process.env.ML_API ?? "",
    clientId: process.env.ML_CLIENT_ID ?? "",
    clientSecret: process.env.ML_CLIENT_SECRET ?? "",
    redirectUri: process.env.ML_REDIRECT_URI ?? "",
    userId: process.env.ML_USER_ID ?? "",
}

export const getMassiveProduct = async (authorizationCode: string) => {

    try {


        const session = await auth();
        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe de estar autenticado'
            }
        }

        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        if (!authorizationCode) {
            return {
                ok: false,
                message: 'No se ha obtenido el código de autorización correctamente.'
            }
        }

        const { access_token } = await getTokenFromML(authorizationCode);
        const { results: products } = await getProductsFromML(access_token!);

        return {
            ok: true,
            products: products
        }

    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return {
                ok: false,
                message: error.message
            };
        }

        return {
            ok: false,
            message: 'Ha ocurrido un error inesperado',
        };
    }
}

const getTokenFromML = async (authorizationCode: string): Promise<MercadoLibreTokenSuccess> => {

    const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: MlConfig.clientId,
        client_secret: MlConfig.clientSecret,
        code: authorizationCode,
        redirect_uri: MlConfig.redirectUri,
    });

    const response = await fetch(`${MlConfig.API}/oauth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        },
        body: params,
        cache: 'no-store'
    }).then(r => r.json());

    return response;
}

const getProductsFromML = async (token: string): Promise<MercadoLibreItems> => {

    const response = await fetch(`${MlConfig.API}/users/${MlConfig.userId}/items/search?status=active`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        cache: 'no-store'
    }).then(r => r.json());

    return response;
}