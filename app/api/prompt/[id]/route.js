//GET (read the post)
import { connectToDb } from "@utils/database";
import promptDb from "@models/promptModel";

export const GET = async (req, {params}) => {
  try {
    await connectToDb();
      const prompt = await promptDb.findById(params.id).populate("creator");
      if(!prompt) return new Response(`Prompt not found`,{status:404})
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(`Failed to fetch Prompt`, { status: 500 });
  }
};

  //PATCH (update the post)
  export const PATCH = async (req, { params }) => {
      const { prompt, tag } = await req.json();
      console.log(prompt,tag,'pppppppppppppppppppppppp')
      try {
          await connectToDb();
          const existingPrompt = await promptDb.findById(params.id);
          //find existing prompt
          if (!existingPrompt) return new Response(`Prompt not found`, { status: 404 });
          existingPrompt.prompt = prompt;
          existingPrompt.tag = tag;
          await existingPrompt.save()
          return new Response(JSON.stringify(existingPrompt),{status:200})
      } catch (err) {
          console.log(err);
      return new Response(`Failed to update Prompt`, { status: 500 });

      }
  }
//DElETE (delete the post)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    const existingPrompt = await promptDb.findById(params. id);
    if (!existingPrompt) return new Response(`Prompt not found`, { status: 404 });
     await promptDb.findByIdAndDelete(params.id)
    return new Response(`Prompt Deleted Successfully`, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(`Failed to update Prompt`, { status: 500 });
  }
};