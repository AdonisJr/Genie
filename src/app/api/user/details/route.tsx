import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import { usersModel } from "@/models/users";

export const POST = async (req: NextRequest) =>{
    const user = await req.json()

    try{
        await connectDB();
        const userDetails = await usersModel.findOne({_id: user.id}).then(res =>{
            return{
                id: res._id,
                name: res.firstName + ' ' + res.lastName,
                email: res.email,
                role: res.role,
                wish: res.wish
            }
        })

        return NextResponse.json(userDetails)

    }catch(error){
        return new Error('Server Error')
    }
}