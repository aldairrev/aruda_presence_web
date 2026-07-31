import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: {
        active_presence: "490ur5 Active Presence",
        view_profile: "View Steam Profile",
        live_sync: "Live Sync",
        updated_at: "Updated at {{time}}",
        loading: "Loading...",
        sparkle_stage: "490ur5 Sparkle Stage",
        status: {
          ingame: "In-Game",
          online: "Online",
          away: "Away",
          offline: "Offline"
        }
      },
      music: {
        title: "MUSIC",
        status: {
          now_playing: "Now Playing",
          inactive: "Inactive",
          disconnected: "Disconnected"
        },
        no_recent: "No recent music",
        last: "Last: {{artist}}",
        silence: "Silence",
        active_stage: "Active Stage",
        connect: "Activate",
        disconnect: "Deactivate",
        disconnected_desc: "Music sync is offline. Activate to check active status."
      },
      gaming: {
        title: "GAMING",
        status: {
          playing: "Playing",
          offline: "Offline",
          disconnected: "Disconnected"
        },
        not_playing: "Not playing anything",
        active: "Steam active",
        inactive: "Steam inactive or hidden",
        view_store: "View in Store",
        connect: "Activate",
        disconnect: "Deactivate",
        disconnected_desc: "Steam presence integration is offline. Activate to check active status."
      }
    }
  },
  ja: {
    translation: {
      dashboard: {
        active_presence: "490ur5 Active Presence",
        view_profile: "View Steam Profile",
        live_sync: "Live Sync",
        updated_at: "Updated at {{time}}",
        loading: "Loading...",
        sparkle_stage: "490ur5 Sparkle Stage",
        status: {
          ingame: "In-Game",
          online: "Online",
          away: "Away",
          offline: "Offline"
        }
      },
      music: {
        title: "MUSIC",
        status: {
          now_playing: "Now Playing",
          inactive: "Inactive",
          disconnected: "Disconnected"
        },
        no_recent: "No recent music",
        last: "Last: {{artist}}",
        silence: "Silence",
        active_stage: "Active Stage",
        connect: "Activate",
        disconnect: "Deactivate",
        disconnected_desc: "Music sync is offline. Activate to check active status."
      },
      gaming: {
        title: "GAMING",
        status: {
          playing: "Playing",
          offline: "Offline",
          disconnected: "Disconnected"
        },
        not_playing: "Not playing anything",
        active: "Steam active",
        inactive: "Steam inactive or hidden",
        view_store: "View in Store",
        connect: "Activate",
        disconnect: "Deactivate",
        disconnected_desc: "Steam presence integration is offline. Activate to check active status."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
