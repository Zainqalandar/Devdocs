/**
 * @openapi
 * /api/languages/{langSlug}/topics:
 *   get:
 *     tags: [Topics]
 *     summary: List topics for a language
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - $ref: '#/components/parameters/PublishedQuery'
 *     responses:
 *       200:
 *         description: Paginated topics
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
 *                         $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Language not found
 *   post:
 *     tags: [Topics]
 *     summary: Create topic (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTopicRequest'
 *     responses:
 *       201:
 *         description: Topic created
 *       409:
 *         description: Duplicate slug in language
 *
 * /api/languages/{langSlug}/topics/{topicSlug}:
 *   get:
 *     tags: [Topics]
 *     summary: Get topic with published sections
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *     responses:
 *       200:
 *         description: Topic detail
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
 *                       $ref: '#/components/schemas/Topic'
 *                     sections:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Section'
 *       404:
 *         description: Language or topic not found
 *   patch:
 *     tags: [Topics]
 *     summary: Update topic (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTopicRequest'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     tags: [Topics]
 *     summary: Delete topic (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *     responses:
 *       200:
 *         description: Deleted
 */

export {};
