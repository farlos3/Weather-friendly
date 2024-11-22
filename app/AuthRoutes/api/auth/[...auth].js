// import nextConnect from "next-connect";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import session from "express-session";

// const handler = nextConnect();

// // ตั้งค่า Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`, // Base URL จาก environment
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // จัดการ profile ที่ได้จาก Google
//       return done(null, profile);
//     }
//   )
// );

// // Serialize และ Deserialize user
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // ตั้งค่า session middleware
// handler.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default_secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: process.env.NODE_ENV === "production" },
//   })
// );

// // เชื่อม Passport middleware
// handler.use(passport.initialize());
// handler.use(passport.session());

// // **Route สำหรับ login**
// handler.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // **Route สำหรับ callback**
// handler.get(
//   "/api/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // หากสำเร็จ, redirect ไปที่ dashboard
//     res.redirect("/dashboard");
//   }
// );

// // **Route สำหรับ logout**
// handler.get("/api/auth/logout", (req, res) => {
//   req.logout(err => {
//     if (err) return res.status(500).json({ error: "Failed to logout" });
//     res.redirect("/login");
//   });
// });

// export default handler;
