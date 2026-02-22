import axios from "axios";

export async function fetchEvidence(cid: string) {
    const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    return response.data;
}