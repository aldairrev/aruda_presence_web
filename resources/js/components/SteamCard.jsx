import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SteamCard({ steam, steamConnected, onConnect, onDisconnect, lastUpdated }) {
    const { t } = useTranslation();
    const steamOnlineStatus = steam?.status || 'offline';
    const isSteamIngame = steamOnlineStatus === 'ingame';

    if (!steamConnected) {
        return (
            <section className="presence-card flex flex-col p-7 min-h-[380px] relative overflow-hidden glass-card rounded-[24px] transition-all duration-300" id="card-gaming">


                <div className="flex justify-between items-center mb-6 z-10">
                    <div className="flex items-center gap-2 font-bold text-xs tracking-[0.15em] text-slate-400">
                        <i className="fa-solid fa-gamepad text-slate-500 mr-1.5"></i>
                        <span>{t('gaming.title')}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-[12px] flex items-center gap-1.5 badge bg-white/5 text-slate-400 border border-white/5">
                        {t('gaming.status.disconnected')}
                    </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 z-10 px-4">
                    <div className="w-16 h-16 rounded-full bg-white/3 flex items-center justify-center border border-white/5 shadow-inner">
                        <i className="fa-solid fa-gamepad text-3xl text-slate-500"></i>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-300">
                            Steam Offline
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 max-w-[280px] mx-auto leading-relaxed">
                            {t('gaming.disconnected_desc')}
                        </p>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 w-full z-10">
                    <button 
                        onClick={onConnect}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[12px] bg-white/5 hover:bg-gradient-to-r hover:from-brand-blue hover:to-brand-purple text-slate-300 hover:text-white text-sm font-semibold hover:shadow-[0_6px_20px_rgba(0,195,255,0.2)] hover:-translate-y-0.5 transition-all duration-300 border border-white/5 cursor-pointer hover:scale-[1.02]"
                    >
                        <i className="fa-solid fa-plug"></i> {t('gaming.connect')}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="presence-card flex flex-col p-7 min-h-[380px] relative overflow-hidden glass-card rounded-[24px] transition-all duration-300" id="card-gaming">


            <div className="flex justify-between items-center mb-6 z-10">
                <div className="flex items-center gap-2 font-bold text-xs tracking-[0.15em] text-slate-300">
                    <i className="fa-solid fa-gamepad text-brand-purple mr-1.5 animate-pulse"></i>
                    <span>{t('gaming.title')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-[12px] flex items-center gap-1.5 badge ${
                        isSteamIngame 
                            ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-[0_2px_8px_rgba(155,81,224,0.4)]' 
                            : 'bg-white/5 text-slate-400 border border-white/5'
                    }`}>
                        {isSteamIngame ? t('gaming.status.playing') : t('gaming.status.offline')}
                    </span>
                    <button 
                        onClick={onDisconnect}
                        className="p-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 cursor-pointer"
                        title={t('gaming.disconnect')}
                    >
                        <i className="fa-solid fa-power-off"></i>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center text-center gap-5 z-10">
                <div className="w-full h-[140px] rounded-[16px] overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.3)] border border-white/5 group bg-slate-950/40">
                    <img 
                        src={steam?.game?.header_image || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 140'><rect width='500' height='140' fill='%230b0f19'/><path d='M0 0 L500 140 M500 0 L0 140' stroke='%231e293b' stroke-width='2'/></svg>"} 
                        alt="Game Banner" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="w-full">
                    <h2 className="text-xl font-bold text-white line-clamp-2">
                        {steam?.game?.name || t('gaming.not_playing')}
                    </h2>
                    <p className="text-[15px] font-medium text-slate-400 mt-1.5">
                        {isSteamIngame ? t('gaming.active') : t('gaming.inactive')}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6 border-t border-white/5 pt-4 w-full z-10 gap-3">
                <div className="text-[10px] text-slate-500 flex items-center gap-1.5 shrink-0">
                    <i className="fa-solid fa-circle text-[6px] text-brand-blue animate-pulse mr-0.5"></i>
                    <span>{lastUpdated}</span>
                </div>
                <a 
                    href={steam?.game?.store_url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-[10px] bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-semibold hover:shadow-[0_6px_20px_rgba(0,195,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-white/5 shadow-[0_4px_12px_rgba(0,195,255,0.2)] ${
                        !isSteamIngame ? 'opacity-40 pointer-events-none cursor-default' : 'hover:scale-[1.02] cursor-pointer'
                    }`}
                >
                    <i className="fa-solid fa-store"></i> {t('gaming.view_store')}
                </a>
            </div>
        </section>
    );
}
