import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);

        return NextResponse.json({ message: "สมัครสำเร็จ" }, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ message: "ไม่สำเร็จ" }, { status: 500 });
    }
}
