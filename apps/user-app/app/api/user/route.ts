import { prisma } from "@repo/db";
import { SignUpSchema } from "@repo/zod-schemas";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, password } = SignUpSchema.parse(body);

        const isUserExist = await prisma.user.findFirst({
            where: {
                phone: phone
            }
        })

        if (isUserExist) {
            return NextResponse.json(
                {user: null, message: "User with this email already exists"},
                {status: 409}
            )
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone: phone,
                password: hashedPassword
            }
        })
        
        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json(
            {user: rest, message: "User registered successfully!"},
            {status: 201}
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    }
}