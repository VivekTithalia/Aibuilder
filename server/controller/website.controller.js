import { generateresponse } from "../config/open.router.js";
import User from "../models/user.model.js";
import Website from "../models/website.model.js";
const masterPrompt = `
You are an expert web developer.

Create a modern responsive website based on the user prompt.

Rules:

- Return ONLY raw JSON
- Do NOT include explanation
- JSON format must be:

{
  "title": "website title",
  "html": "full html code"
}

Website rules:

- Single HTML file
- Use Flexbox or Grid
- Mobile responsive
- Modern UI
- Clean layout
- Use semantic HTML

Images:

- Use ONLY images from:
https://images.unsplash.com/

- Every image must include:
?auto=format&fit=crop&w=1200&q=80

Technical rules:

- Only ONE <style> tag
- Only ONE <script> tag
- No external CSS
- No external JS
- No fonts CDN
- Use system fonts

Return ONLY JSON.
`;

export const generatewebsite = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // get fresh user from database
    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check credits
    if (user.credits < 50) {
      return res.status(403).json({
        message: "You don't have enough credits to generate website",
      });
    }

    const finalPrompt = `
${masterPrompt}

User request:
${prompt}
`;

    const aiResult = await generateresponse(finalPrompt);

    let parsed;

    try {
      parsed = typeof aiResult === "string" ? JSON.parse(aiResult) : aiResult;
    } catch (err) {
      return res.status(500).json({ message: "Invalid AI response format" });
    }

    const htmlCode = parsed.html;
    const title = parsed.title || "AI Generated Website";

    // create website
    const website = await Website.create({
      user: user._id,
      title: title,
      latestCode: htmlCode,
      conversation: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "ai",
          content: htmlCode,
        },
      ],
    });

    // deduct credits
    user.credits -= 50;
    await user.save();

    return res.status(200).json({
      success: true,
      website,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Website generation failed",
    });
  }
};
export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(400).json({ message: "website not found" });
    }

    return res.status(200).json(website);
  } catch (error) {
    console.log(error);
  }
};
// export const generatedemo = async (req, res) => {
//   try {
//     const result = await generateresponse("hello");
//     return res.status(200).json(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
