const OpenrouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const OpenrouterApiKey = process.env.OPEN_ROUTER_API_KEY;
const model = "deepseek/deepseek-chat";

const generateresponse = async (prompt) => {
  const res = await fetch(OpenrouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
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
    const eror = await res.text();
    throw new Error("open router error", eror);
  }
  const data = await res.json();
  return data;
};
