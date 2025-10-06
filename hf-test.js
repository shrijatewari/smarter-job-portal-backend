import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;
const hfHeaders = { Authorization: `Bearer ${HF_API_KEY}` };

const jobDescription = "We are looking for a frontend developer skilled in React, JavaScript, and CSS.";

async function testHF() {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: jobDescription },
      { headers: hfHeaders, timeout: 60000 }
    );
    console.log("✅ HF raw response:", response.data);
  } catch (err) {
    console.error("❌ HF request error:", err.response?.data || err.message);
  }
}

testHF();
