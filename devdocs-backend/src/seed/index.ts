import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { connectDB, disconnectDB } from "../config/database";
import { javascriptLanguage, javascriptTopics } from "./javascriptData";
import {
  javascriptSections,
  javascriptExamples,
  javascriptQuizzes,
} from "./javascriptContent";
import { typescriptLanguage, typescriptTopics } from "./typescriptData";
import {
  typescriptSections,
  typescriptExamples,
  typescriptQuizzes,
} from "./typescriptContent";
import { reactLanguage, reactTopics } from "./reactData";
import { reactSections, reactExamples, reactQuizzes } from "./reactContent";
import { seedAdminUser } from "./adminUser";
import { clearLanguageBySlug, seedLanguage } from "./seedLanguage";

const languageConfigs = [
  {
    language: javascriptLanguage,
    topics: javascriptTopics,
    sections: javascriptSections,
    examples: javascriptExamples,
    quizzes: javascriptQuizzes,
    codeLanguage: "javascript",
  },
  {
    language: typescriptLanguage,
    topics: typescriptTopics,
    sections: typescriptSections,
    examples: typescriptExamples,
    quizzes: typescriptQuizzes,
    codeLanguage: "typescript",
  },
  {
    language: reactLanguage,
    topics: reactTopics,
    sections: reactSections,
    examples: reactExamples,
    quizzes: reactQuizzes,
    codeLanguage: "javascript",
  },
];

const seed = async () => {
  try {
    await connectDB();
    console.log("\n🌱 Starting database seed...\n");

    const summaries: Array<{
      name: string;
      topics: number;
      sections: number;
      examples: number;
      quizzes: number;
    }> = [];

    for (const config of languageConfigs) {
      const slug = (config.language as { slug: string }).slug;
      const cleared = await clearLanguageBySlug(slug);
      if (cleared) {
        console.log(`🗑️  Cleared existing ${slug} data`);
      }

      const result = await seedLanguage(config);
      summaries.push(result);
      console.log("");
    }

    await seedAdminUser();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Seed completed successfully!\n");
    for (const s of summaries) {
      console.log(
        `   ${s.name}: ${s.topics} topics, ${s.sections} sections, ${s.examples} examples, ${s.quizzes} quizzes`
      );
    }
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seed();
