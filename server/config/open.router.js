const OpenrouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "openrouter/free";

export const generateresponse = async (prompt) => {
  const apiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPEN_ROUTER_API_KEY is not set in .env");
  }

  const res = await fetch(OpenrouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: "you must return only  valid raw json data",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    const err = new Error(`OpenRouter API error (${res.status}): ${errorBody}`);
    err.status = res.status;
    err.body = errorBody;
    throw err;
  }
  const data = await res.json();
  return data.choices[0]?.message?.content ?? "";
};
