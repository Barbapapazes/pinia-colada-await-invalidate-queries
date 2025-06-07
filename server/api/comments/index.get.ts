export default defineEventHandler(async () => {

  // sleep for 1 second to simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return database
});
