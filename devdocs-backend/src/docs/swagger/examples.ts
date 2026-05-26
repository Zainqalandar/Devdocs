/**
 * @openapi
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/examples:
 *   get:
 *     tags: [Examples]
 *     summary: List examples for a section
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *       - $ref: '#/components/parameters/PageQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - $ref: '#/components/parameters/PublishedQuery'
 *     responses:
 *       200:
 *         description: Paginated examples
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
 *                         $ref: '#/components/schemas/Example'
 *   post:
 *     tags: [Examples]
 *     summary: Create example (admin)
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
 *             $ref: '#/components/schemas/CreateExampleRequest'
 *     responses:
 *       201:
 *         description: Example created
 *
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/examples/{id}:
 *   get:
 *     tags: [Examples]
 *     summary: Get example by ID
 *     parameters:
 *       - $ref: '#/components/parameters/LangSlug'
 *       - $ref: '#/components/parameters/TopicSlug'
 *       - $ref: '#/components/parameters/SectionSlug'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Example MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Example detail
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Example'
 *       404:
 *         description: Not found
 *   patch:
 *     tags: [Examples]
 *     summary: Update example (admin)
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExampleRequest'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     tags: [Examples]
 *     summary: Delete example (admin)
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
 * /api/languages/{langSlug}/topics/{topicSlug}/sections/{sectionSlug}/examples/{id}/like:
 *   post:
 *     tags: [Examples]
 *     summary: Like an example
 *     description: Public endpoint — increments like count.
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
 *         description: Like recorded
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
 *                     likeCount:
 *                       type: integer
 */

export {};
