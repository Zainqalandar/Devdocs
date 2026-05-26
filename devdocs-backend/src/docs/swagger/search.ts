/**
 * @openapi
 * /api/search:
 *   get:
 *     tags: [Search]
 *     summary: Search published sections
 *     description: Full-text search on section title and meta description. Returns up to 20 results.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keywords
 *         example: variables
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Optional language slug filter
 *         example: javascript
 *     responses:
 *       200:
 *         description: Matching sections
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
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           metaDescription:
 *                             type: string
 *                           readingTimeMinutes:
 *                             type: integer
 *                           topic:
 *                             type: object
 *                           language:
 *                             type: object
 *       400:
 *         description: Missing query parameter q
 */

export {};
