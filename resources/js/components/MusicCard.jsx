import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MusicCard({ music, musicConnected, onConnect, onDisconnect, lastUpdated }) {
    const { t } = useTranslation();
    const isMusicPlaying = music?.now_playing && music?.track;
    const musicTrack = music?.track;
    const musicStatusText = isMusicPlaying ? t('music.status.now_playing') : (music?.last_listened || t('music.status.inactive'));

    if (!musicConnected) {
        return (
            <section className="presence-card flex flex-col p-7 min-h-[380px] relative overflow-hidden glass-card rounded-[24px] transition-all duration-300" id="card-music">


                <div className="flex-between-center mb-6 z-10 flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 font-bold text-xs tracking-[0.15em] text-slate-400">
                        <i className="fa-solid fa-compact-disc text-slate-500 mr-2 text-xs animate-spin-slow"></i>
                        <span>{t('music.title')}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-[12px] flex items-center gap-1.5 badge bg-white/5 text-slate-400 border border-white/5">
                        {t('music.status.disconnected')}
                    </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 z-10 px-4">
                    <div className="w-16 h-16 rounded-full bg-white/3 flex items-center justify-center border border-white/5 shadow-inner">
                        <i className="fa-solid fa-compact-disc text-3xl text-slate-500 animate-spin-slow"></i>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-300">
                            Music Offline
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 max-w-[280px] mx-auto leading-relaxed">
                            {t('music.disconnected_desc')}
                        </p>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 w-full z-10">
                    <button 
                        onClick={onConnect}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[12px] bg-white/5 hover:bg-gradient-to-r hover:from-brand-blue hover:to-brand-purple text-slate-300 hover:text-white text-sm font-semibold hover:shadow-[0_6px_20px_rgba(0,195,255,0.2)] hover:-translate-y-0.5 transition-all duration-300 border border-white/5 cursor-pointer hover:scale-[1.02]"
                    >
                        <i className="fa-solid fa-plug"></i> {t('music.connect')}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="presence-card flex flex-col p-7 min-h-[380px] relative overflow-hidden glass-card rounded-[24px] transition-all duration-300" id="card-music">


            <div className="flex justify-between items-center mb-6 z-10">
                <div className="flex items-center gap-2 font-bold text-xs tracking-[0.15em] text-slate-300">
                    <i className="fa-solid fa-compact-disc text-brand-pink mr-2 text-xs animate-spin-slow"></i>
                    <span>{t('music.title')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-[12px] flex items-center gap-1.5 ${
                        isMusicPlaying 
                            ? 'bg-spotify-green/10 text-spotify-green border border-spotify-green/20' 
                            : 'bg-white/5 text-slate-400 border border-white/5'
                    }`}>
                        {isMusicPlaying && <i className="fa-solid fa-music text-[9px] animate-pulse"></i>}
                        {musicStatusText}
                    </span>
                    <button 
                        onClick={onDisconnect}
                        className="p-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 cursor-pointer"
                        title={t('music.disconnect')}
                    >
                        <i className="fa-solid fa-power-off"></i>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 z-10">
                <div className="relative w-[150px] h-[150px]">
                    {isMusicPlaying && (
                        <div className="absolute inset-0 rounded-[24px] bg-spotify-green/20 blur-[15px] animate-pulse-glow z-0"></div>
                    )}
                    <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.5)] border border-white/5 relative z-10 group transition-all duration-500 hover:scale-[1.03]">
                        <img 
                            src={musicTrack?.image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%2318181b' stroke='%233f3f46' stroke-width='2'/><circle cx='50' cy='50' r='38' fill='none' stroke='%2327272a' stroke-width='1'/><circle cx='50' cy='50' r='28' fill='none' stroke='%2327272a' stroke-width='1'/><circle cx='50' cy='50' r='18' fill='none' stroke='%2327272a' stroke-width='1'/><circle cx='50' cy='50' r='10' fill='%23e4e4e7'/><circle cx='50' cy='50' r='3' fill='%2318181b'/></svg>"} 
                            alt="Cover Art" 
                            className={`w-full h-full object-cover transition-all duration-500 ${
                                isMusicPlaying ? '' : 'grayscale opacity-50'
                            }`}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <i className="fa-solid fa-music text-2xl text-white"></i>
                        </div>
                    </div>
                </div>
                
                <div className="w-full">
                    <a href={musicTrack?.url || "#"} target="_blank" rel="noopener noreferrer" className="text-decoration-none inline-block max-w-full">
                        <h2 className="text-xl font-bold text-white line-clamp-1 transition-colors duration-300 hover:text-brand-blue">
                            {musicTrack?.title || t('music.no_recent')}
                        </h2>
                    </a>
                    <p className="text-[15px] font-medium text-slate-300 mt-1 line-clamp-1">
                        {isMusicPlaying ? musicTrack?.artist : (musicTrack ? t('music.last', { artist: musicTrack.artist }) : t('music.silence'))}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 truncate max-w-full mb-3">
                        {musicTrack?.album || '—'}
                        {musicTrack?.album_artist && musicTrack.album_artist !== musicTrack.artist && (
                            <span className="text-slate-600 ml-1.5">({musicTrack.album_artist})</span>
                        )}
                    </p>

                    {musicTrack && (
                        <div className="flex justify-center gap-3.5 mt-4">
                            {musicTrack.spotify_url ? (
                                <a 
                                    href={musicTrack.spotify_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/3 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 hover:-translate-y-0.5 transition-all duration-300 text-base cursor-pointer"
                                    title="Play on Spotify"
                                >
                                    <i className="fa-brands fa-spotify"></i>
                                </a>
                            ) : (
                                <span 
                                    className="w-9 h-9 rounded-full bg-white/3 border border-white/5 flex items-center justify-center text-slate-600 opacity-20 text-base cursor-not-allowed"
                                    title="Spotify link not configured"
                                >
                                    <i className="fa-brands fa-spotify"></i>
                                </span>
                            )}
                            {musicTrack.youtube_url ? (
                                <a 
                                    href={musicTrack.youtube_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/3 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-red-500/10 hover:text-red-500 hover:-translate-y-0.5 transition-all duration-300 text-base cursor-pointer"
                                    title="Play on YouTube"
                                >
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            ) : (
                                <span 
                                    className="w-9 h-9 rounded-full bg-white/3 border border-white/5 flex items-center justify-center text-slate-600 opacity-20 text-base cursor-not-allowed"
                                    title="YouTube link not configured"
                                >
                                    <i className="fa-brands fa-youtube"></i>
                                </span>
                            )}

                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center mt-6 border-t border-white/5 pt-4 w-full z-10">
                <div className={`music-visualizer ${isMusicPlaying ? 'animating' : ''}`}>
                    <div className="eq-bar w-[3px] h-[3px] bg-brand-blue rounded-[2px] transition-[height] duration-300"></div>
                    <div className="eq-bar w-[3px] h-[3px] bg-brand-blue rounded-[2px] transition-[height] duration-300"></div>
                    <div className="eq-bar w-[3px] h-[3px] bg-brand-blue rounded-[2px] transition-[height] duration-300"></div>
                    <div className="eq-bar w-[3px] h-[3px] bg-brand-blue rounded-[2px] transition-[height] duration-300"></div>
                    <div className="eq-bar w-[3px] h-[3px] bg-brand-blue rounded-[2px] transition-[height] duration-300"></div>
                    <div className="eq-bar w-[3px] h-[3px] bg-brand-blue rounded-[2px] transition-[height] duration-300"></div>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle text-[6px] text-brand-blue animate-pulse mr-0.5"></i>
                    <span>{lastUpdated}</span>
                </div>
            </div>
        </section>
    );
}
