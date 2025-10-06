// src/routes/oauth.js
import express from "express";
import jwt from "jsonwebtoken";
import passport from "../services/passport.js";

const router = express.Router();

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "fallback-secret-key", { expiresIn: "7d" });

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login?error=google_oauth_failed`,
  }),
  (req, res) => {
    try {
      const token = createToken(req.user._id);
      const redirectUrl = `${FRONTEND_URL}/oauth/callback?token=${encodeURIComponent(token)}&provider=google`;
      return res.redirect(redirectUrl);
    } catch (err) {
      return res.redirect(`${FRONTEND_URL}/login?error=token_generation_failed`);
    }
  }
);

// GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login?error=github_oauth_failed`,
  }),
  (req, res) => {
    try {
      const token = createToken(req.user._id);
      const redirectUrl = `${FRONTEND_URL}/oauth/callback?token=${encodeURIComponent(token)}&provider=github`;
      return res.redirect(redirectUrl);
    } catch (err) {
      return res.redirect(`${FRONTEND_URL}/login?error=token_generation_failed`);
    }
  }
);

export default router;
