import openai from "@/utils/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request){

    return NextResponse.json({adonis: 'gwapo'})
}

export async function POST(req: NextRequest){

    const data = await req.json();
try{
  const response = await openai.createImage({
    prompt: data.prompt,
    n: data.n,
    size: data.size,
  });
  
  if(!response) return console.log(response)
  return NextResponse.json({data: response.data.data[0].url})
}catch (error: any) {
  console.log(error)
}
}