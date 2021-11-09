// API routes provides a solution to build backend APIs. Any file inside the folder "pages/api" will be treated as
// an API endpoint instead of a page. The endpoints are server-side only and will not increase the size of the
// client-side bundle. API Routes do not specify CORS headers, meaning they are same-origin only by default, but this
// can be customized by wrapping the request handler with the CORS middleware.
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
