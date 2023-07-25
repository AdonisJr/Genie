import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utils/bcrypt";
import { connectDB } from "@/utils/mongodb";
import { usersModel } from "@/models/users";

export const GET = async (req: NextRequest) =>{
    return NextResponse.json(process.env.CLOUDINARY_CLOUD_NAME)
}

export const POST = async (req: NextRequest) =>{
    const data = await req.json();
    const hashedPassword = await hashPassword(data.password)
    const user = {
        firstName: data.firstName.trim().charAt(0).toUpperCase() + data.firstName.slice(1),
        lastName: data.lastName.trim().charAt(0).toUpperCase() + data.lastName.slice(1),
        email: data.email,
        password: hashedPassword
    }
    await connectDB();
    try{
        const alreadyExist = await usersModel.find({email: user.email})

        if(alreadyExist.length === 1)return NextResponse.json('Email already exist')
        
        await usersModel.create(user)
        
        return NextResponse.json({message: 'Successfully added'}) 

    }catch(error){
        console.log(error)
    }
  
}