import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        // Check if the database exists
        await databases.get(db);
        console.log("✅ Database connection successful.");
    } catch (err: any) {
        if (err.code === 404) {
            // Only create the database if it doesn't exist
            try {
                await databases.create(db, db);
                console.log("✅ Database created successfully.");
                
                // Create collections after the database is created
                await Promise.all([
                    createQuestionCollection(),
                    createAnswerCollection(),
                    createCommentCollection(),
                    createVoteCollection(),
                ]);
                console.log("✅ Collections created successfully.");
            } catch (createErr) {
                console.error("❌ Error creating database or collections:", createErr);
            }
        } else {
            console.error("❌ Error fetching database:", err);
        }
    }
    return databases;
}
