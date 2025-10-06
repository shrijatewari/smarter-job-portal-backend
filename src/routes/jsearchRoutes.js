import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/internships", async (req, res) => {
  try {
    const hasKey = !!process.env.RAPIDAPI_KEY;
    if (!hasKey) {
      console.warn("⚠️ RAPIDAPI_KEY not set; returning fallback internships");
      return res.json([
        {
          job_id: "fallback-1",
          job_title: "Frontend Developer Intern",
          employer_name: "DesignHub",
          job_location: "Remote",
          job_description: "Build UI components in React and Tailwind.",
          job_apply_link: "https://example.com/apply/frontend-intern",
          job_employment_type: "Internship",
          job_is_remote: true,
          duration_months: 3,
          salary: 15000,
          job_posted_at_datetime_utc: new Date().toISOString(),
        },
        {
          job_id: "fallback-2",
          job_title: "Data Science Intern",
          employer_name: "DataWiz",
          job_location: "Bengaluru, KA",
          job_description: "Work with Python, Pandas, and SQL on real datasets.",
          job_apply_link: "https://example.com/apply/data-intern",
          job_employment_type: "Internship",
          job_is_remote: false,
          duration_months: 6,
          salary: 20000,
          job_posted_at_datetime_utc: new Date().toISOString(),
        },
      ]);
    }

    const { keyword = "internship", pages = 2 } = req.query;

    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query: String(keyword),
        num_pages: String(pages),
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
      timeout: 7000, // avoid hanging; fallback below if it times out
    });

    res.json(response.data?.data || []);
  } catch (err) {
    console.error("❌ JSearch Error:", err.response?.data || err.message);
    // graceful fallback on error
    return res.json([
      {
        job_id: "fallback-err-1",
        job_title: "Marketing Intern",
        employer_name: "AdWorld",
        job_location: "Remote",
        job_description: "Assist in content, social, and campaign analytics.",
        job_apply_link: "https://example.com/apply/marketing-intern",
        job_employment_type: "Internship",
        job_is_remote: true,
        duration_months: 4,
        salary: 12000,
        job_posted_at_datetime_utc: new Date().toISOString(),
      },
    ]);
  }
});

export default router;
