import { NextRequest,NextResponse } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreatedStorage from "./models/server/storageSetup";

export async function middleware(request:NextRequest){
    try{
        await Promise.all([
            getOrCreateDB(),
            getOrCreatedStorage(),
        ])
        return NextResponse.next();
    }catch(err){
        console.log(err);
    }
}

export const config={
    matcher:[
        "/((?!api|_nexr/static|_next/image|favicon.ico).*)"
    ],

}