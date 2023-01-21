/**
 * @param {Request} request
 */
export async function handler(request) {
  const body = new ReadableStream({
    async start(controller) {
      controller.enqueue(new TextEncoder().encode("Hello, World!".repeat(200)));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      controller.enqueue(new TextEncoder().encode("\n\nDelayed :D"));
      controller.close();
    },
  });

  return new Response(body, {
    status: 202,
    headers: { "x-test": "yay" },
  });
}