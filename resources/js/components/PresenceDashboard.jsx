import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SteamCard from './SteamCard';
import MusicCard from './MusicCard';

export default function PresenceDashboard() {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState({ steam: null, music: null });
    const [loading, setLoading] = useState(true);
    const [lastUpdatedTime, setLastUpdatedTime] = useState(t('dashboard.loading'));
    const [steamConnected, setSteamConnected] = useState(false);
    const [musicConnected, setMusicConnected] = useState(false);

    const fetchData = async () => {
        try {
            const currentLang = i18n.language || 'en';
            const response = await axios.get(`/api/presence?steam=${steamConnected}&music=${musicConnected}`, {
                headers: {
                    'Accept-Language': currentLang
                }
            });
            setData(response.data);
            const now = new Date();
            const timeString = now.toLocaleTimeString(currentLang === 'ja' ? 'ja-JP' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setLastUpdatedTime(t('dashboard.updated_at', { time: timeString }));
            setLoading(false);
        } catch (error) {
            console.error('Error updating presence dashboard');
        }
    };

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'en' ? 'ja' : 'en';
        i18n.changeLanguage(nextLang);
        localStorage.setItem('i18nextLng', nextLang);
    };

    const toggleSteamConnection = () => {
        setSteamConnected(!steamConnected);
    };

    const toggleMusicConnection = () => {
        setMusicConnected(!musicConnected);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 8000);
        return () => clearInterval(interval);
    }, [i18n.language, steamConnected, musicConnected]);

    const { steam, music } = data;

    const steamOnlineStatus = steam?.status || 'offline';
    const isSteamIngame = steamOnlineStatus === 'ingame';
    const isSteamOnline = steamOnlineStatus === 'online';
    const isSteamAway = steamOnlineStatus === 'away';

    return (
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6">
            <header className="flex flex-col sm:flex-row items-center p-6 sm:px-8 sm:py-6 gap-6 relative glass-card rounded-[24px]">
                
                <div className="relative w-20 h-20 shrink-0">
                    <img 
                        src={steam?.user?.avatar || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%2327272a'><rect width='100' height='100' fill='%2318181b'/><circle cx='50' cy='40' r='20' fill='%2352525b'/><path d='M20 95 C20 75 30 65 50 65 C70 65 80 75 80 95 Z' fill='%2352525b'/></svg>"} 
                        alt="Avatar" 
                        className="w-full h-full rounded-[20px] object-cover border-2 border-white/10 transition-all duration-300"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-bg-dark shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-500 status-indicator ${steamOnlineStatus}`}></span>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center sm:justify-start gap-1.5">
                            {steam?.user?.name || ''}
                            {steam?.user?.name && (
                                <i className="fa-solid fa-circle-check text-brand-blue text-base" title="Verified Presence"></i>
                            )}
                        </h1>
                        <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/5 status-badge ${
                            isSteamIngame ? 'text-steam-ingame border-steam-ingame/20 bg-steam-ingame/5' : 
                            isSteamOnline ? 'text-brand-blue border-brand-blue/20 bg-brand-blue/5' : 
                            isSteamAway ? 'text-brand-yellow border-brand-yellow/20 bg-brand-yellow/5' : 'text-slate-400'
                        }`}>
                            {isSteamIngame ? t('dashboard.status.ingame') : 
                             isSteamOnline ? t('dashboard.status.online') : 
                             isSteamAway ? t('dashboard.status.away') : t('dashboard.status.offline')}
                        </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
                        <i className="fa-solid fa-star text-brand-yellow mr-0.5 animate-pulse"></i>
                        <span>{t('dashboard.active_presence')}</span>
                    </p>
                </div>
                
                <div className="absolute top-4 right-4 sm:static flex items-center gap-3">
                    <button 
                        onClick={toggleLanguage}
                        className="flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-white/3 border border-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                        title="Change Language"
                    >
                        <i className="fa-solid fa-language text-base text-brand-blue"></i>
                        <span>{i18n.language === 'ja' ? 'JA' : 'EN'}</span>
                    </button>
 
                    <a 
                        href={steam?.user?.profile_url || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-white/3 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:-translate-y-0.5 transition-all duration-300" 
                        title={t('dashboard.view_profile')}
                    >
                        <i className="fa-brands fa-steam text-lg"></i>
                    </a>
                </div>
            </header>
 
            <main className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <MusicCard 
                    music={music} 
                    musicConnected={musicConnected}
                    onConnect={toggleMusicConnection}
                    onDisconnect={toggleMusicConnection}
                    lastUpdated={lastUpdatedTime}
                />
                <SteamCard 
                    steam={steam} 
                    steamConnected={steamConnected} 
                    onConnect={toggleSteamConnection} 
                    onDisconnect={toggleSteamConnection} 
                    lastUpdated={lastUpdatedTime}
                />
            </main>
 
            <footer className="flex justify-center items-center text-xs text-slate-500 px-3 py-2 w-full">
                <div className="flex items-center gap-1.5 text-brand-blue font-semibold">
                    <i className="fa-solid fa-wand-magic-sparkles text-brand-pink animate-pulse"></i>
                    <span>{t('dashboard.sparkle_stage')}</span>
                </div>
            </footer>
        </div>
    );
}
