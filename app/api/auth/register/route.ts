import { NextRequest, NextResponse } from "next/server";
import {connectToDB} from "@/lib/db"
import User from "@/models/user.model";

export async function POST(request:NextRequest) {
    try {
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password are required"},
                {status: 400}
            )
        }

        await connectToDB()

        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {error: "Email already exist"},
                {status: 400}
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message: "User Registerd Successfully"},
            {status: 201}
        );
    } catch (err) {
        return NextResponse.json(
            {err: "Failed to Register User"},
            {status: 500}
        );
    }
    
}