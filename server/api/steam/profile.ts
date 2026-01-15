import type { SteamOwnedGame } from "../../utils/steamApi";

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
    const [profile, level, games] = await Promise.all([
      steamApi.getPlayerSummary(steamId),
      steamApi.getPlayerLevel(steamId),
      steamApi.getOwnedGames(steamId, true),
    ]);

    return {
      profile,
      level,
      gamesCount: games.length,
      topGames: games
        .sort((a: SteamOwnedGame, b: SteamOwnedGame) => b.playtime_forever - a.playtime_forever)
        .slice(0, 10),
    };
  } catch (err) {
    console.error("Steam API error:", err);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch Steam data",
    });
  }
});
