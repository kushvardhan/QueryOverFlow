import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB(){
    try{
        await databases.get(db);
        console.log("DB connection");

    }catch(err:any){
       try{
        await databases.create(db,db)
        console.log("DB created");
        await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentCollection(),
            createVoteCollection(),
        ])
        console.log("Collection created successfully");
        console.log("DB created successfully");
       }catch(err:any){
        console.log("Error creating db or collection: ",err);
       }
    }
    return databases;
}