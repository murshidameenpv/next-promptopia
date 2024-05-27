import { connectToDb } from "@utils/database";
import promptDb from "@models/promptModel";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDb();
    const newPrompt = new promptDb({ creator: userId, prompt, tag });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error saving new prompt", { status: 500 });
  }
};
