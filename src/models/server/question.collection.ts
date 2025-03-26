import {IndexType, Permission} from 'node-appwrite'
import {db, questionCollection} from '../name';
import { databases } from './config';

export default async function createQuestionCollection(){
    try{
        await databases.createCollection(db,questionCollection,questionCollection,[
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),

        ])
        console.log("Quwstion collection created");

        await Promise.all([
            databases.createStringAttribute(db,questionCollection,"title",100,true),
            databases.createStringAttribute(db,questionCollection,"content",1000,true),
            databases.createStringAttribute(db,questionCollection,"authorId",50,true),
            databases.createStringAttribute(db,questionCollection,"tags",50,true,undefined,true),
            databases.createStringAttribute(db,questionCollection,"attachmentId",50,false),

        ]);
        console.log("question attribute created");

        await Promise.all([
            databases.createIndex(db,questionCollection,"title",IndexType.Fulltext,["title"],["asc"]),
            databases.createIndex(db,questionCollection,"content",IndexType.Fulltext,["content"],["asc"])
        ])
        console.log("title is created");

    }catch(err:any){
        console.log(err);
    }
}
