import { Language } from "../models/Language";
import { Topic } from "../models/Topic";
import { Section } from "../models/Section";
import { Example } from "../models/Example";
import { Quiz } from "../models/Quiz";

export interface LanguageSeedConfig {
  language: Record<string, unknown>;
  topics: Array<Record<string, unknown>>;
  sections: Record<
    string,
    Array<{
      title: string;
      slug: string;
      metaDescription: string;
      order: number;
      isPublished: boolean;
      isFree: boolean;
      readingTimeMinutes: number;
      contentBlocks: Array<{
        type: string;
        content: string;
        language?: string;
        items?: string[];
        order: number;
      }>;
    }>
  >;
  examples: Record<
    string,
    Array<{
      title: string;
      description: string;
      code: string;
      expectedOutput: string;
      difficulty: "beginner" | "intermediate" | "advanced";
      tags: string[];
      order: number;
      isRunnable?: boolean;
    }>
  >;
  quizzes: Record<
    string,
    {
      title: string;
      description: string;
      passingScore: number;
      timeLimit: number;
      questions: Array<{
        question: string;
        options: string[];
        correctOptionIndex: number;
        explanation: string;
        order: number;
      }>;
    }
  >;
  codeLanguage: string;
}

export async function clearLanguageBySlug(slug: string): Promise<boolean> {
  const existingLang = await Language.findOne({ slug });
  if (!existingLang) return false;

  const topics = await Topic.find({ language: existingLang._id });
  const topicIds = topics.map((t) => t._id);
  const sections = await Section.find({ topic: { $in: topicIds } });
  const sectionIds = sections.map((s) => s._id);

  await Quiz.deleteMany({ section: { $in: sectionIds } });
  await Example.deleteMany({ section: { $in: sectionIds } });
  await Section.deleteMany({ topic: { $in: topicIds } });
  await Topic.deleteMany({ language: existingLang._id });
  await Language.deleteOne({ _id: existingLang._id });

  return true;
}

export async function seedLanguage(config: LanguageSeedConfig) {
  const { language: langData, topics, sections, examples, quizzes, codeLanguage } = config;

  const language = await Language.create(langData);
  console.log(`✅ Language created: ${language.name}`);

  let totalSections = 0;
  let totalExamples = 0;
  let totalQuizzes = 0;

  for (const topicData of topics) {
    const topic = await Topic.create({ ...topicData, language: language._id });
    console.log(`  📁 Topic: ${topic.title}`);

    const sectionsForTopic = sections[topic.slug as string] || [];
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

      if (prevSectionId) {
        await Section.findByIdAndUpdate(prevSectionId, { nextSection: section._id });
      }

      prevSectionId = section._id as import("mongoose").Types.ObjectId;
      totalSections++;

      const examplesForSection = examples[section.slug] || [];
      for (const exampleData of examplesForSection) {
        const { isRunnable, ...exRest } = exampleData;
        await Example.create({
          ...exRest,
          codeLanguage,
          isRunnable:
            isRunnable ??
            ["javascript", "typescript", "jsx", "tsx"].includes(codeLanguage),
          isPublished: true,
          section: section._id,
          topic: topic._id,
          language: language._id,
        });
        totalExamples++;
      }

      const quizData = quizzes[section.slug];
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

    await Topic.findByIdAndUpdate(topic._id, { totalSections: sectionsForTopic.length });
  }

  await Language.findByIdAndUpdate(language._id, {
    totalTopics: topics.length,
    totalExamples,
  });

  return {
    name: language.name,
    topics: topics.length,
    sections: totalSections,
    examples: totalExamples,
    quizzes: totalQuizzes,
  };
}
