import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import { usersModel } from "@/models/users";

export const POST = async (req: NextRequest) =>{
    const user = await req.json();
    try{
        await connectDB();

        await usersModel.updateOne({id: user.id},{$set:{wish:user.wish}})
        
        return NextResponse.json(usersModel)

    }catch(error){
        throw new Error('500 Server Error')
    }

    
}