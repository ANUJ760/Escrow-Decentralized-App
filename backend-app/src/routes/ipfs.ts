import { Router, Request, Response } from "express";

const router = Router();

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const { filename, contentBase64, mimeType } = req.body as {
      filename?: string;
      contentBase64?: string;
      mimeType?: string;
    };

    if (!filename || !contentBase64) {
      res.status(400).json({ error: "Missing filename or contentBase64" });
      return;
    }

    const pinataJwt = process.env.PINATA_JWT;
    if (!pinataJwt) {
      res.status(503).json({ error: "IPFS service is not configured" });
      return;
    }

    const fileBuffer = Buffer.from(contentBase64, "base64");
    if (fileBuffer.length === 0) {
      res.status(400).json({ error: "Uploaded file is empty" });
      return;
    }

    // 10MB guardrail to avoid oversized request payloads.
    if (fileBuffer.length > 10 * 1024 * 1024) {
      res.status(413).json({ error: "File too large (max 10MB)" });
      return;
    }

    const formData = new FormData();
    const fileBlob = new Blob([fileBuffer], {
      type: mimeType || "application/octet-stream",
    });
    formData.append("file", fileBlob, filename);

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataJwt}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Pinata upload failed");
    }

    const data = (await response.json()) as { IpfsHash?: string };
    if (!data.IpfsHash) {
      throw new Error("Missing IPFS hash in Pinata response");
    }

    res.json({ cid: data.IpfsHash });
  } catch (err) {
    console.error("IPFS upload failed:", err);
    res.status(500).json({ error: "IPFS upload failed" });
  }
});

export default router;
