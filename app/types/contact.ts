export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface LanyardResponse {
  success: boolean;
  data: {
    discord_status: DiscordStatus;
  };
}

interface SocialBase {
  name: string;
  handle: string;
  icon: string;
  color: string;
}

export interface SocialExternal extends SocialBase {
  href: string;
  discord: false;
}

export interface SocialDiscord extends SocialBase {
  href: '';
  discord: true;
}

export type SocialItem = SocialExternal | SocialDiscord;
