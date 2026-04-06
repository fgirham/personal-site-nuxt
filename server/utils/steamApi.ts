const STEAM_API_BASE = "https://api.steampowered.com";

export interface SteamPlayerSummary {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  realname?: string;
  loccountrycode?: string;
  timecreated?: number;
}

export interface SteamOwnedGame {
  appid: number;
  name?: string;
  playtime_forever: number;
  img_icon_url?: string;
  img_logo_url?: string;
}

export interface SteamRecentlyPlayedGame extends SteamOwnedGame {
  playtime_2weeks: number;
}

export interface SteamUserStats {
  gameName: string;
  stats: Array<{
    name: string;
    value: number;
  }>;
  achievements: Array<{
    name: string;
    achieved: number;
  }>;
}

export class SteamApi {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Steam API key is required");
    }
    this.apiKey = apiKey;
  }

  private async request<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Steam API error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  /**
   * Get basic Steam profile info
   */
  async getPlayerSummary(steamId: string): Promise<SteamPlayerSummary | null> {
    const url =
      `${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v0002/` +
      `?key=${this.apiKey}&steamids=${steamId}`;

    const data = await this.request<{
      response: { players: SteamPlayerSummary[] };
    }>(url);

    return data.response.players[0] ?? null;
  }

  /**
   * Get Steam level for a user
   */
  async getPlayerLevel(steamId: string): Promise<number> {
    const url =
      `${STEAM_API_BASE}/IPlayerService/GetSteamLevel/v1/` +
      `?key=${this.apiKey}&steamid=${steamId}`;

    const data = await this.request<{
      response: { player_level: number };
    }>(url);

    return data.response.player_level;
  }

  /**
   * Get owned games
   */
  async getOwnedGames(
    steamId: string,
    includeAppInfo = true
  ): Promise<SteamOwnedGame[]> {
    const url =
      `${STEAM_API_BASE}/IPlayerService/GetOwnedGames/v1/` +
      `?key=${this.apiKey}&steamid=${steamId}` +
      `&include_appinfo=${includeAppInfo ? 1 : 0}`;

    const data = await this.request<{
      response: { games?: SteamOwnedGame[] };
    }>(url);

    return data.response.games ?? [];
  }

  /**
   * Get recently played games
   */
  async getRecentlyPlayedGames(
    steamId: string,
    count = 5
  ): Promise<SteamRecentlyPlayedGame[]> {
    const url =
      `${STEAM_API_BASE}/IPlayerService/GetRecentlyPlayedGames/v1/` +
      `?key=${this.apiKey}&steamid=${steamId}&count=${count}`;

    const data = await this.request<{
      response: { games?: SteamRecentlyPlayedGame[] };
    }>(url);

    return data.response.games ?? [];
  }

  /**
   * Get user stats for a game
   */
  async getUserStatsForGame(
    steamId: string,
    appId: number
  ): Promise<SteamUserStats> {
    const url =
      `${STEAM_API_BASE}/ISteamUserStats/GetUserStatsForGame/v2/` +
      `?key=${this.apiKey}&steamid=${steamId}&appid=${appId}`;

    const data = await this.request<{
      playerstats: SteamUserStats;
    }>(url);

    return data.playerstats;
  }
}

export function useSteamApi() {
  const config = useRuntimeConfig();
  return new SteamApi(config.steamApiKey);
}
