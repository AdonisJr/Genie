import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import { usersModel } from "@/models/users";

export const POST = async (req: NextRequest) =>{
    const user = await req.json();
    console.log(user.id)
    try{
        await connectDB();

        const result = await usersModel.updateOne({_id: user.id},{$set:{wish: user.wish}})
        
        return NextResponse.json(result)

    }catch(error){
       console.log(error)
    }

    
}