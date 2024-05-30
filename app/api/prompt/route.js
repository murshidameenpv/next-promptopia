import { connectToDb } from "@utils/database";
import promptDb from "@models/promptModel";
export const GET = async (req, res) => {
    try {
        await connectToDb();
        const prompts = await promptDb.find({}).populate('creator');
        return new Response(JSON.stringify(prompts),{status:200})
    } catch (err) {
        console.log(err)
        return new Response(`Failed to fetch all Posts`, { status: 500 });

    }
}