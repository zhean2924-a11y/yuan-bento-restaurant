import React from 'react';
import { STORE_INFO } from '../data/bentoData';
import { ExternalLink, Bell, AlertCircle } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="bg-[#FAF7F2] py-10 sm:py-16 min-h-screen text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Banner */}
        <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-10 border border-[#2E2721] shadow-xl text-center max-w-3xl mx-auto mb-10 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-2">
            <Bell className="w-4 h-4" />
            <span>OFFICIAL ANNOUNCEMENTS</span>
          </div>
          <h1 className="font-serif-tc text-3xl sm:text-4xl font-black text-white tracking-tight">
            最新公告
          </h1>
          <p className="text-xs sm:text-sm text-[#C5BDB3] mt-2.5 leading-relaxed">
            掌握緣便當快餐店最新營業資訊、節慶公休與官方動態。
          </p>
        </div>

        {/* 核心公告規範：最新消息請以店家官方公告為準 */}
        <div className="bg-white rounded-3xl border border-[#E2DAD0] p-8 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* FB Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>

            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EA580C] text-white">
                <span>官方社群動態</span>
              </div>
              <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#181818]">
                中山總店官方 Facebook 粉絲專頁
              </h2>

              {/* 嚴格依規範顯示：最新消息請以店家官方公告為準 */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD5] text-xs sm:text-sm text-[#4A3F35] font-medium leading-relaxed">
                最新消息請以店家官方公告為準。每日當令炒菜配菜更迭、國定假日與節慶公休資訊，皆會即時發布於官方 Facebook 粉絲專頁。
              </div>

              {/* 頁面主要 CTA:「前往 Facebook 查看最新消息」 */}
              <div className="pt-2 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <a
                  href={STORE_INFO.facebookZhongshanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-[#1877F2] hover:bg-[#1565C0] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
                >
                  <span>前往 Facebook 查看最新消息</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 門市說明：不捏造假活動或假公告 */}
        <div className="bg-white rounded-2xl border border-[#E2DAD0] p-6 text-xs text-[#665B51] leading-relaxed space-y-2 shadow-2xs">
          <div className="flex items-center space-x-2 text-[#181818] font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-[#EA580C]" />
            <span>門市公告與營業資訊提醒</span>
          </div>
          <p>
            各門市每日供餐份量依現場銷量為準，若需預訂大量團體會議便當，請提前致電各分店確認。八德店與大湳店為加盟門市，營業公休狀況亦可參照現場或總店公告。
          </p>
        </div>
      </div>
    </div>
  );
}
