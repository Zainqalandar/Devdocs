/**
 * @openapi
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/quiz:
 *   get:
 *     tags: [Quiz]
 *     summary: Get published quiz for a section
 *     description: Answers (correctOptionIndex, explanation) are hidden from the response.
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *     responses:
 *       200:
 *         description: Quiz without correct answers
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: No quiz for this section
 *   post:
 *     tags: [Quiz]
 *     summary: Create quiz for section (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuizRequest'
 *     responses:
 *       201:
 *         description: Quiz created
 *       409:
 *         description: Quiz already exists for section
 *
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/quiz/manage:
 *   get:
 *     tags: [Quiz]
 *     summary: Get full quiz for admin editing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *     responses:
 *       200:
 *         description: Quiz with correct answers and explanations
 *       403:
 *         description: Admin only
 *       404:
 *         description: Not found
 *
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/quiz/{id}:
 *   patch:
 *     tags: [Quiz]
 *     summary: Update quiz (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz MongoDB ObjectId
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuizRequest'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     tags: [Quiz]
 *     summary: Delete quiz (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/quiz/{id}/submit:
 *   post:
 *     tags: [Quiz]
 *     summary: Submit quiz answers
 *     description: Grades answers, returns score, pass/fail, and per-question results with explanations.
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmitQuizRequest'
 *     responses:
 *       200:
 *         description: Graded result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/QuizSubmitResult'
 *       400:
 *         description: answers array required
 *       404:
 *         description: Quiz not found
 */

export {};
