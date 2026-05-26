/**
 * @openapi
 * components:
 *   schemas:
 *     ApiSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           description: Response payload (shape varies by endpoint)
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *
 *     ApiErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Validation failed
 *         error:
 *           type: string
 *           description: Stack/details (development only)
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           example: 1
 *         totalPages:
 *           type: integer
 *           example: 5
 *         totalItems:
 *           type: integer
 *           example: 42
 *         itemsPerPage:
 *           type: integer
 *           example: 10
 *         hasNextPage:
 *           type: boolean
 *         hasPrevPage:
 *           type: boolean
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         avatar:
 *           type: string
 *         isEmailVerified:
 *           type: boolean
 *         completedSections:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               section:
 *                 type: string
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *         bookmarkedSections:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AuthTokenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: JWT bearer token
 *             user:
 *               $ref: '#/components/schemas/User'
 *
 *     RegisterRequest:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 50
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *
 *     SectionIdBody:
 *       type: object
 *       required: [sectionId]
 *       properties:
 *         sectionId:
 *           type: string
 *           description: MongoDB ObjectId of the section
 *
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         avatar:
 *           type: string
 *
 *     Language:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         description:
 *           type: string
 *         shortDescription:
 *           type: string
 *         icon:
 *           type: string
 *         color:
 *           type: string
 *           example: "#F7DF1E"
 *         category:
 *           type: string
 *           enum: [language, framework, library, database, tool]
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         version:
 *           type: string
 *         officialWebsite:
 *           type: string
 *         logoUrl:
 *           type: string
 *         isPublished:
 *           type: boolean
 *         order:
 *           type: integer
 *         totalTopics:
 *           type: integer
 *         totalExamples:
 *           type: integer
 *
 *     CreateLanguageRequest:
 *       type: object
 *       required: [name, description, shortDescription, category]
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         shortDescription:
 *           type: string
 *         icon:
 *           type: string
 *         color:
 *           type: string
 *         category:
 *           type: string
 *           enum: [language, framework, library, database, tool]
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         version:
 *           type: string
 *         officialWebsite:
 *           type: string
 *         logoUrl:
 *           type: string
 *         isPublished:
 *           type: boolean
 *         order:
 *           type: integer
 *
 *     Topic:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         language:
 *           type: string
 *         title:
 *           type: string
 *         slug:
 *           type: string
 *         description:
 *           type: string
 *         order:
 *           type: integer
 *         icon:
 *           type: string
 *         isPublished:
 *           type: boolean
 *         totalSections:
 *           type: integer
 *
 *     CreateTopicRequest:
 *       type: object
 *       required: [title]
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         order:
 *           type: integer
 *         isPublished:
 *           type: boolean
 *
 *     ContentBlock:
 *       type: object
 *       required: [type, content, order]
 *       properties:
 *         type:
 *           type: string
 *           enum: [text, code, note, warning, tip, table, image, heading, list, quiz_prompt]
 *         content:
 *           type: string
 *         language:
 *           type: string
 *           description: For code blocks (e.g. javascript, typescript)
 *         caption:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: string
 *         headers:
 *           type: array
 *           items:
 *             type: string
 *         rows:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               type: string
 *         order:
 *           type: integer
 *
 *     Section:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         topic:
 *           type: string
 *         language:
 *           type: string
 *         title:
 *           type: string
 *         slug:
 *           type: string
 *         metaDescription:
 *           type: string
 *         contentBlocks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContentBlock'
 *         order:
 *           type: integer
 *         isPublished:
 *           type: boolean
 *         isFree:
 *           type: boolean
 *         readingTimeMinutes:
 *           type: integer
 *         viewCount:
 *           type: integer
 *         nextSection:
 *           type: string
 *         prevSection:
 *           type: string
 *
 *     CreateSectionRequest:
 *       type: object
 *       required: [title]
 *       properties:
 *         title:
 *           type: string
 *         metaDescription:
 *           type: string
 *         contentBlocks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContentBlock'
 *         order:
 *           type: integer
 *         isPublished:
 *           type: boolean
 *         isFree:
 *           type: boolean
 *         readingTimeMinutes:
 *           type: integer
 *
 *     Example:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         section:
 *           type: string
 *         topic:
 *           type: string
 *         language:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         code:
 *           type: string
 *         expectedOutput:
 *           type: string
 *         codeLanguage:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         isRunnable:
 *           type: boolean
 *         order:
 *           type: integer
 *         isPublished:
 *           type: boolean
 *         likeCount:
 *           type: integer
 *
 *     CreateExampleRequest:
 *       type: object
 *       required: [title, code]
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         code:
 *           type: string
 *         expectedOutput:
 *           type: string
 *         codeLanguage:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         isRunnable:
 *           type: boolean
 *         order:
 *           type: integer
 *
 *     QuizQuestion:
 *       type: object
 *       required: [question, options, correctOptionIndex]
 *       properties:
 *         question:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 2
 *           maxItems: 6
 *         correctOptionIndex:
 *           type: integer
 *           minimum: 0
 *         explanation:
 *           type: string
 *         order:
 *           type: integer
 *
 *     Quiz:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         section:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizQuestion'
 *         passingScore:
 *           type: integer
 *           description: Percentage required to pass (0-100)
 *         timeLimit:
 *           type: integer
 *           description: Minutes; 0 = no limit
 *         isPublished:
 *           type: boolean
 *         totalAttempts:
 *           type: integer
 *
 *     CreateQuizRequest:
 *       type: object
 *       required: [title, questions]
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizQuestion'
 *         passingScore:
 *           type: integer
 *         timeLimit:
 *           type: integer
 *         isPublished:
 *           type: boolean
 *
 *     QuizAnswer:
 *       type: object
 *       required: [questionId, selectedOptionIndex]
 *       properties:
 *         questionId:
 *           type: string
 *         selectedOptionIndex:
 *           type: integer
 *
 *     SubmitQuizRequest:
 *       type: object
 *       required: [answers]
 *       properties:
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizAnswer'
 *
 *     QuizSubmitResult:
 *       type: object
 *       properties:
 *         score:
 *           type: integer
 *         passed:
 *           type: boolean
 *         correct:
 *           type: integer
 *         total:
 *           type: integer
 *         passingScore:
 *           type: integer
 *         results:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *               question:
 *                 type: string
 *               selectedOptionIndex:
 *                 type: integer
 *               correctOptionIndex:
 *                 type: integer
 *               isCorrect:
 *                 type: boolean
 *               explanation:
 *                 type: string
 *
 *   parameters:
 *     LangSlug:
 *       in: path
 *       name: langSlug
 *       required: true
 *       schema:
 *         type: string
 *       example: javascript
 *     TopicSlug:
 *       in: path
 *       name: topicSlug
 *       required: true
 *       schema:
 *         type: string
 *       example: js-basics
 *     SectionSlug:
 *       in: path
 *       name: sectionSlug
 *       required: true
 *       schema:
 *         type: string
 *       example: variables
 *     LanguageSlug:
 *       in: path
 *       name: slug
 *       required: true
 *       schema:
 *         type: string
 *       example: javascript
 *     PageQuery:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *     LimitQuery:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 10
 *     PublishedQuery:
 *       in: query
 *       name: published
 *       schema:
 *         type: string
 *         enum: [true, false]
 *       description: Filter by publish status (omit for all — admin lists)
 */

export {};
