'use server';

export const SetIntegrityHash = async (orderId: string, amount: number) => {

    try {

        const boldSecret = process.env.BOLD_SECRET ?? '';
        const chainEmbebed = `${orderId}${amount}COP${boldSecret}`;

        const encodedText = new TextEncoder().encode(chainEmbebed);
        const hashBuffer = await crypto.subtle.digest('SHA-256', encodedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return {
            ok: true,
            signature: hashHex
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se logró obtener la firma'
        }
    }

}