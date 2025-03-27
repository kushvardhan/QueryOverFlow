import { Permission} from 'node-appwrite'
import {answerCollection, db} from '../name';
import { databases } from './config';

export default async function createAnswerCollection(){
    try{
        await databases.createCollection(db,answerCollection,answerCollection,[
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Answer collection created.");

        await Promise.all([
            databases.createStringAttribute(db,answerCollection,"content",1000,true),
            databases.createStringAttribute(db,answerCollection,"question",50,true),
            databases.createStringAttribute(db,answerCollection,"authorId",50,true),

        ]);

        console.log("Answer attributes created.")

    }catch(err:any){
        console.log(err);
    }
}