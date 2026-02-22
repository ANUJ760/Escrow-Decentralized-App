import { useState } from "react";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_AI_BACKEND_URL || "http://localhost:3001";

export function useAIVerdict() {
    const [buyerWins, setBuyerWins] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function getVerdict(cid: string) {
        setIsLoading(true);
        setError(null);
        setBuyerWins(null);

        try {
            const res = await fetch(`${BACKEND_URL}/resolve-dispute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cid }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "AI request failed");
            }

            const data = await res.json();
            setBuyerWins(data.buyerWins);
            return data.buyerWins as boolean;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "AI request failed";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { getVerdict, buyerWins, isLoading, error };
}
