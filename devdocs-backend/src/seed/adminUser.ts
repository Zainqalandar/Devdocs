import { User } from "../models/User";

export const seedAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@devdocs.local";
  const password = process.env.ADMIN_PASSWORD || "admin123456";
  const name = process.env.ADMIN_NAME || "DevDocs Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log(`  👤 Promoted existing user to admin: ${email}`);
    } else {
      console.log(`  👤 Admin user already exists: ${email}`);
    }
    return;
  }

  await User.create({ name, email, password, role: "admin" });
  console.log(`  👤 Admin user created: ${email} (password: ${password})`);
};
