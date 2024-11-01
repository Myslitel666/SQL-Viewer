// src/routes/api/data/+server.js
export async function GET() {
    return new Response(JSON.stringify('Hello, route'));
}