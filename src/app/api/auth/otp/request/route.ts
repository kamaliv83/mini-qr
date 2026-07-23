import {NextRequest,NextResponse}
from "next/server";

import {
 requestOtp
}
from "@/modules/auth/auth.service";


export async function POST(
req:NextRequest
){

try{

const {
 mobile
}=await req.json();


const result =
await requestOtp(mobile);


return NextResponse.json(result);


}
catch(error){

return NextResponse.json(
{
 error:
 error instanceof Error?
 error.message:
 "error"
},
{
status:400
}
)

}

}