import { Router, Request, Response } from "express";
import { fetchEvidence } from "../services/ipfsService";
import { getVerdict } from "../services/aiService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { cid } = req.body;

        if (!cid) {
            res.status(400).json({ error: "Missing cid parameter" });
            return;
        }

        const evidence = await fetchEvidence(cid);

        const buyerWins = await getVerdict(evidence);

        res.json({ buyerWins });
    } catch (err) {
        console.error("AI resolution failed:", err);
        res.status(500).json({ error: "AI processing failed" });
    }
});

export default router;