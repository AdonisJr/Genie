import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import { imageCollectionsModel } from "@/models/imageCollections";

export async function POST(req: NextRequest){

    const data = await req.json();
    const url = data.url
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    // converted image url to blob image
    const files = await fetch(url).then(res => res.blob())
    .then(blob=>{
      return blob
    })

    // created form data then append blob files
    const formData = new FormData();
    formData.append('file', files)

    formData.append('upload_preset', 'genie_collections')

    // save blob files or image to cloudinary to get the secure_url from cloudinary
    const result = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
          method: 'POST',
          body: formData
    }).then(res=> res.json())
    
    // saving the secure_url from cloudinary to mongodb
    await connectDB()
    await imageCollectionsModel.create({
      user_id: data._id,
      image: result
    })

    return NextResponse.json(result)
}