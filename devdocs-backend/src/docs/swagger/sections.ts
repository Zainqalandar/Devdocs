/**
 * @openapi
 * /api/languages/{langSlug}/topics/{topicSlug}/sections:
 *   get:
 *     tags: [Sections]
 *     summary: List sections in a topic
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - $ref: '#/components/parameters/PublishedQuery'
 *     responses:
 *       200:
 *         description: Paginated section summaries
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
 *                         $ref: '#/components/schemas/Section'
 *   post:
 *     tags: [Sections]
 *     summary: Create section (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSectionRequest'
 *     responses:
 *       201:
 *         description: Section created
 *       409:
 *         description: Duplicate slug in topic
 *
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}:
 *   get:
 *     tags: [Sections]
 *     summary: Get full section content
 *     description: Increments view count. Returns content blocks, navigation (prev/next).
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *     responses:
 *       200:
 *         description: Section with language and topic context
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     language:
 *                       type: object
 *                     topic:
 *                       type: object
 *                     section:
 *                       $ref: '#/components/schemas/Section'
 *       404:
 *         description: Not found
 *   patch:
 *     tags: [Sections]
 *     summary: Update section (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSectionRequest'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     tags: [Sections]
 *     summary: Delete section (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *     responses:
 *       200:
 *         description: Deleted
 */

export {};
