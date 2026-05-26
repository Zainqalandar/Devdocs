import path from "path";
import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "DevDocs API",
    version: "1.0.0",
    description:
      "REST API for the DevDocs documentation platform — languages, topics, sections, code examples, quizzes, and user progress.",
    contact: {
      name: "DevDocs",
    },
  },
  servers: [
    {
      url: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
      description: "Current server",
    },
  ],
  tags: [
    { name: "Health", description: "Server health and API info" },
    { name: "Auth", description: "Registration, login, profile, progress, bookmarks" },
    { name: "Languages", description: "Programming languages / frameworks catalog" },
    { name: "Topics", description: "Topics within a language" },
    { name: "Sections", description: "Documentation sections (pages)" },
    { name: "Examples", description: "Runnable code examples" },
    { name: "Quiz", description: "Section quizzes and submissions" },
    { name: "Search", description: "Full-text search across sections" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT from POST /api/auth/login or /api/auth/register",
      },
    },
  },
};

// Always read JSDoc from source — tsc strips comments from compiled output
const swaggerOptions: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: [path.join(process.cwd(), "src/docs/swagger/**/*.ts")],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Application): void {
  app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "DevDocs API Docs",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    })
  );
}
