// src/services/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

const ensureUserFromOAuth = async ({ provider, providerId, name, email, avatar }) => {
  // Try to find by provider first
  let user = await User.findOne({ provider, providerId });

  // If not found, try by email (user might have signed up locally earlier)
  if (!user && email) {
    user = await User.findOne({ email });
    if (user) {
      // Link provider to existing user if not already linked
      user.provider = provider;
      user.providerId = providerId;
      if (avatar && !user.avatar) user.avatar = avatar;
      if (name && !user.name) user.name = name;
      await user.save();
      return user;
    }
  }

  if (!user) {
    // Create new user without password (social account)
    user = new User({
      name: name || email?.split("@")[0] || "User",
      email: email || `${providerId}@${provider}.oauth.local`, // fallback if provider hides email
      password: null,
      provider,
      providerId,
      avatar: avatar || "",
    });
    await user.save();
  }

  return user;
};

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log("✅ Configuring Google OAuth strategy");
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || "http://localhost:4000"}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("📍 Google OAuth callback received for user:", profile.id);
          const primaryEmail = profile.emails?.[0]?.value || null;
          const avatar = profile.photos?.[0]?.value || "";
          const name = profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(" ");

          const user = await ensureUserFromOAuth({
            provider: "google",
            providerId: profile.id,
            name,
            email: primaryEmail,
            avatar,
          });
          console.log("✅ Google OAuth user processed successfully:", user.email);
          return done(null, user);
        } catch (err) {
          console.error("❌ Google OAuth error:", err);
          return done(err);
        }
      }
    )
  );
} else {
  console.log("⚠️  Google OAuth not configured (missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)");
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  console.log("✅ Configuring GitHub OAuth strategy");
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || "http://localhost:4000"}/api/auth/github/callback`,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("📍 GitHub OAuth callback received for user:", profile.id);
          // GitHub may not provide email depending on privacy; prefer verified primary
          const emails = profile.emails || [];
          const verifiedPrimary = emails.find((e) => e.primary && e.verified)?.value || emails[0]?.value;
          const email = verifiedPrimary || null;
          const avatar = profile.photos?.[0]?.value || profile._json?.avatar_url || "";
          const name = profile.displayName || profile.username || "GitHub User";

          const user = await ensureUserFromOAuth({
            provider: "github",
            providerId: profile.id,
            name,
            email,
            avatar,
          });
          console.log("✅ GitHub OAuth user processed successfully:", user.email);
          return done(null, user);
        } catch (err) {
          console.error("❌ GitHub OAuth error:", err);
          return done(err);
        }
      }
    )
  );
} else {
  console.log("⚠️  GitHub OAuth not configured (missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET)");
}

export default passport;
