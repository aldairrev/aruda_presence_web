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
        active_presence: "490ur5アクティブプレゼンス",
        view_profile: "Steamプロフィールを表示",
        live_sync: "ライブ同期",
        updated_at: "最終更新 {{time}}",
        loading: "読み込み中...",
        sparkle_stage: "490ur5ライブステージ",
        status: {
          ingame: "インゲーム",
          online: "オンライン",
          away: "退席中",
          offline: "オフライン"
        }
      },
      music: {
        title: "MUSIC",
        status: {
          now_playing: "再生中",
          inactive: "再生停止",
          disconnected: "無効化中"
        },
        no_recent: "最近の再生履歴はありません",
        last: "前回: {{artist}}",
        silence: "無音",
        active_stage: "アクティブステージ",
        connect: "有効化",
        disconnect: "無効化",
        disconnected_desc: "音楽の同期は無効化されています。有効にするにはアクティベートしてください。"
      },
      gaming: {
        title: "GAMING",
        status: {
          playing: "プレイ中",
          offline: "オフライン",
          disconnected: "無効化中"
        },
        not_playing: "何もプレイしていません",
        active: "Steamオンライン",
        inactive: "Steamオフラインまたは非公開",
        view_store: "ストアで見る",
        connect: "有効化",
        disconnect: "無効化",
        disconnected_desc: "Steamのプレゼンス統合は無効化されています。有効にするにはアクティベートしてください。"
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
