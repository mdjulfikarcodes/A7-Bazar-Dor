import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Env variables verify
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

// MongoDB connection with options
const client = new MongoClient(process.env.MONGODB_URL, {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
});

const db = client.db("bazar-dor");

export const auth = betterAuth({
  // App metadata
  appName: "বাজার দর",
  
  // Base URL (production এ callback ঠিকভাবে কাজ করবে)
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // Secret key (session security)
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    // Password minimum length
    minPasswordLength: 8,
    //  Email verify auto sign-in (default: true)
    autoSignIn: false, // signup এ auto login হবে না, signin page এ পাঠাবে
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 দিন
    updateAge: 60 * 60 * 24,      // 1 দিন পর refresh
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 মিনিট cookie cache
    },
  },

  // Advanced options
  advanced: {
    // Production এ secure cookie
    useSecureCookies: process.env.NODE_ENV === "production",
    // Default cookie attributes
    defaultCookieAttributes: {
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  },

  // Trusted origins (CORS / CSRF protection)
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
    "http://localhost:3000",
  ],

  // Error handling
  onAPIError: {
    onError: (error) => {
      console.error("Auth API Error:", error);
    },
  },
});

// Type export for session/user
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;