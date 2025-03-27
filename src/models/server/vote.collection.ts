import {IndexType, Permission} from 'node-appwrite'
import {voteCollection, db} from '../name';
import { databases } from './config';

export default async function createVoteCollection(){
    try{
        await databases.createCollection(db,voteCollection,voteCollection,[
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("vote collection created.");

        await Promise.all([
            databases.createStringAttribute(db,voteCollection,"content",1000,true),
            databases.createEnumAttribute(db,voteCollection,"type",["answer","question"],true),
            databases.createEnumAttribute(db,voteCollection,"voteStatus",["upvoted","downvoted"],true),
            databases.createStringAttribute(db,voteCollection,"votedById",50,true),
        ]);

        console.log("vote attributes created.")

    }catch(err:any){
        console.log(err);
    }
}