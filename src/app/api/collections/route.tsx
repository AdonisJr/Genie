import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import { imageCollectionsModel } from "@/models/imageCollections";

export async function  POST (req: NextRequest) {
    const data = await req.json();
    try{
        await connectDB()
        const images = await imageCollectionsModel.find({user_id: data._id})
        console.log(images)
        return NextResponse.json(images)
    }catch(error){
        console.log(error)
    }

}