/**
 * @openapi
 * /api/languages:
 *   get:
 *     tags: [Languages]
 *     summary: List all languages
 *     parameters:
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [language, framework, library, database, tool]
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search name, tags, or short description
 *       - $ref: '#/components/parameters/PublishedQuery'
 *     responses:
 *       200:
 *         description: Paginated language list
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Language'
 *   post:
 *     tags: [Languages]
 *     summary: Create a language (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLanguageRequest'
 *     responses:
 *       201:
 *         description: Language created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Admin only
 *
 * /api/languages/stats:
 *   get:
 *     tags: [Languages]
 *     summary: Platform statistics
 *     description: Aggregate counts (languages, topics, sections, etc.).
 *     responses:
 *       200:
 *         description: Stats object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccessResponse'
 *
 * /api/languages/{slug}:
 *   get:
 *     tags: [Languages]
 *     summary: Get language by slug with published topics
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageSlug'
 *     responses:
 *       200:
 *         description: Language and topic list
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
 *                   type: object
 *                   properties:
 *                     language:
 *                       $ref: '#/components/schemas/Language'
 *                     topics:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Language not found
 *   patch:
 *     tags: [Languages]
 *     summary: Update language (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageSlug'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLanguageRequest'
 *     responses:
 *       200:
 *         description: Updated
 *       403:
 *         description: Admin only
 *       404:
 *         description: Not found
 *   delete:
 *     tags: [Languages]
 *     summary: Delete language (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LanguageSlug'
 *     responses:
 *       200:
 *         description: Deleted
 *       403:
 *         description: Admin only
 *       404:
 *         description: Not found
 */

export {};
