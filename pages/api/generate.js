import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const name = req.body.name || "";
  if (name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid name",
      },
    });
    return;
  }

  const color = req.body.color || "";
  if (color.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid color",
      },
    });
    return;
  }

  const season = req.body.season || "";
  if (season.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid season",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(name, color, season),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(name, color, season) {
  return `Generated a target ad to ${name}, advertising an outfit that he would enjoy knowing that his favorite color is ${color} and the current season is ${season}`;
}
