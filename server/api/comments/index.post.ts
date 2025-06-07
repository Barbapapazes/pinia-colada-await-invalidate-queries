export default defineEventHandler(async (event) => {
  const body = await readBody<{ text: string }>(event);

  database.push(body)

  setResponseStatus(event, 201);

  // sleep for 1 second to simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
});
