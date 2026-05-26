import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

import { connectDB, disconnectDB } from "../config/database";
import { Language } from "../models/Language";
import { Topic } from "../models/Topic";
import { Section } from "../models/Section";
import { Example } from "../models/Example";
import { Quiz } from "../models/Quiz";
import { javascriptLanguage, javascriptTopics } from "./javascriptData";
import {
  javascriptSections,
  javascriptExamples,
  javascriptQuizzes,
} from "./javascriptContent";
import { seedAdminUser } from "./adminUser";

const seed = async () => {
  try {
    await connectDB();
    console.log("\n🌱 Starting database seed...\n");

    // ── Clean existing JS data ───────────────────────────────────────────────
    const existingLang = await Language.findOne({ slug: "javascript" });
    if (existingLang) {
      const topics = await Topic.find({ language: existingLang._id });
      const topicIds = topics.map((t) => t._id);
      const sections = await Section.find({ topic: { $in: topicIds } });
      const sectionIds = sections.map((s) => s._id);

      await Quiz.deleteMany({ section: { $in: sectionIds } });
      await Example.deleteMany({ section: { $in: sectionIds } });
      await Section.deleteMany({ topic: { $in: topicIds } });
      await Topic.deleteMany({ language: existingLang._id });
      await Language.deleteOne({ _id: existingLang._id });

      console.log("🗑️  Cleared existing JavaScript data");
    }

    // ── Create Language ──────────────────────────────────────────────────────
    const language = await Language.create(javascriptLanguage);
    console.log(`✅ Language created: ${language.name}`);

    // ── Create Topics ────────────────────────────────────────────────────────
    let totalSections = 0;
    let totalExamples = 0;
    let totalQuizzes = 0;

    for (const topicData of javascriptTopics) {
      const topic = await Topic.create({ ...topicData, language: language._id });
      console.log(`  📁 Topic: ${topic.title}`);

      const sectionsForTopic = javascriptSections[topic.slug] || [];
      let prevSectionId: import("mongoose").Types.ObjectId | null = null;

      for (const sectionData of sectionsForTopic) {
        const { contentBlocks, ...rest } = sectionData;

        const section = await Section.create({
          ...rest,
          topic: topic._id,
          language: language._id,
          contentBlocks,
          prevSection: prevSectionId,
        });

        // Update prev section's nextSection pointer
        if (prevSectionId) {
          await Section.findByIdAndUpdate(prevSectionId, { nextSection: section._id });
        }

        prevSectionId = section._id as import("mongoose").Types.ObjectId;
        totalSections++;

        // ── Create Examples for this section ──────────────────────────────
        const examplesForSection = javascriptExamples[section.slug] || [];
        for (const exampleData of examplesForSection) {
          await Example.create({
            ...exampleData,
            codeLanguage: "javascript",
            isRunnable: true,
            isPublished: true,
            section: section._id,
            topic: topic._id,
            language: language._id,
          });
          totalExamples++;
        }

        // ── Create Quiz for this section ───────────────────────────────────
        const quizData = javascriptQuizzes[section.slug];
        if (quizData) {
          await Quiz.create({
            ...quizData,
            isPublished: true,
            section: section._id,
            topic: topic._id,
            language: language._id,
          });
          totalQuizzes++;
        }

        console.log(
          `    📄 Section: ${section.title}` +
          (examplesForSection.length ? ` [${examplesForSection.length} examples]` : "") +
          (quizData ? " [quiz]" : "")
        );
      }

      // Update topic's section count
      await Topic.findByIdAndUpdate(topic._id, { totalSections: sectionsForTopic.length });
    }

    // ── Update language counts ───────────────────────────────────────────────
    await Language.findByIdAndUpdate(language._id, {
      totalTopics: javascriptTopics.length,
      totalExamples,
    });

    await seedAdminUser();

    // ── Summary ──────────────────────────────────────────────────────────────
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Seed completed successfully!\n");
    console.log(`   Language : 1 (JavaScript)`);
    console.log(`   Topics   : ${javascriptTopics.length}`);
    console.log(`   Sections : ${totalSections}`);
    console.log(`   Examples : ${totalExamples}`);
    console.log(`   Quizzes  : ${totalQuizzes}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seed();
