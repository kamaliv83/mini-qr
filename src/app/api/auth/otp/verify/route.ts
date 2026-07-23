import {
NextRequest,
NextResponse
}
from "next/server";


import {
verifyOtp
}
from "@/modules/auth/auth.service";


import {
createLoginSession
}
from "@/lib/auth";


export async function POST(
req:NextRequest
){

try{


const {
mobile,
otp
}=await req.json();


const user =
await verifyOtp(
mobile,
otp
);



await createLoginSession(
user.id,
user.role
);



return NextResponse.json({
message:"Login success",
user
});


}
catch(error){

return NextResponse.json(
{
error:
(error as Error).message
},
{
status:401
}
)

}

}