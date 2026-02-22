import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function getVerdict(evidence: string) {
    const prompt = `
  You are a neutral escrow arbitrator.
  Based on the evidence below, decide:
  Return ONLY true if buyer wins.
  Return ONLY false if seller wins.
  Make sure you dont add any extra text or explanation.
  Your decision is very crucial for finance involved, so remain 100% unbiased and look at all possible aspects.
  Favour buyer if the evidence is unclear or you find it suspicious. 

  Evidence:
  ${evidence}
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0].message.content?.trim();

    return result === "true";
}