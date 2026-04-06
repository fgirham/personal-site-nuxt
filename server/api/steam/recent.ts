export default defineEventHandler(async (event) => {
  const steamApi = useSteamApi();
  
  // Get the Steam ID from query parameters
  const query = getQuery(event);
  const steamId = query.steamId as string;

  if (!steamId) {
    throw createError({
      statusCode: 400,
      message: "Steam ID is required",
    });
  }

  try {
    const data = await steamApi.getRecentlyPlayedGames(steamId);

    return data;
  } catch (err) {
    console.error("Steam API error:", err);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch recently played games",
    });
  }
});