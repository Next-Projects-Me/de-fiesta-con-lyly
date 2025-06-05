import { NextResponse, NextRequest } from "next/server";

export async function POST(res: NextResponse, req: NextRequest) {

    try {
        const body = await req.json();

        // console.log(body);
        return NextResponse.json({
            hola: 'HolaMundo'
        })

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}