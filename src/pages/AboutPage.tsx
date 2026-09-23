import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const intentions = [
    {
      title: '份量實在・吃得飽足',
      desc: '堅持大份量米飯與厚實肉品主菜，照顧每一位辛苦打拼的在地居民、上班族與家庭，給您最有力的能量後盾。',
      badge: '份量保證',
    },
    {
      title: '家常好滋味・純樸用心',
      desc: '酥炸雞腿外酥內嫩、古法梅干扣肉軟嫩入味、香滷排骨鹹香下飯，每道菜色都是台灣人記憶深處最熟悉、最難忘的家常滋味。',
      badge: '經典傳承',
    },
    {
      title: '價格親切・平易近人',
      desc: '全品項 NT$ 110 ~ 120 均一實在價格，透明無負擔，讓享用一頓豐富美味的午晚餐，成為每天最輕鬆、最踏實的日常小確幸。',
      badge: '價格透明',
    },
    {
      title: '服務理念・現點現做',
      desc: '堅持現點現炸、當日現炒熱菜，為機關學校、工廠會議與家庭提供細緻親切的備餐服務，保持餐點溫度與口感。',
      badge: '服務心意',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] py-10 sm:py-16 min-h-screen text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero Banner */}
        <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-10 border border-[#2E2721] shadow-xl text-center max-w-3xl mx-auto mb-12 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-2">
            <Flame className="w-4 h-4" />
            <span>BRAND PHILOSOPHY & STORY</span>
          </div>
          <h1 className="font-serif-tc text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            品牌理念・用心傳承
          </h1>
          <p className="text-xs sm:text-sm text-[#C5BDB3] mt-2.5 tracking-wider">
            緣便當快餐店・中山總店（直營發祥）與加盟體系
          </p>
        </div>

        {/* Narrative Article: 品牌故事、品牌精神 */}
        <article className="bg-white rounded-3xl border border-[#E2DAD0] p-8 sm:p-12 space-y-6 sm:space-y-8 text-[#1A1A1A] leading-relaxed text-sm sm:text-base shadow-sm mb-12">
          <div className="border-l-4 border-[#EA580C] pl-4 sm:pl-6 py-1 bg-[#FFF9F5] rounded-r-xl">
            <p className="font-serif-tc text-lg sm:text-2xl font-bold text-[#181818] leading-relaxed">
              「吃得飽、吃得好、價格實在」，這就是緣便當給每一位顧客最踏實的承諾。
            </p>
          </div>

          <p className="text-[#4D443D]">
            「緣便當快餐店」以座落於桃園市桃園區的<strong className="text-[#EA580C] font-bold"> 中山總店 </strong>為核心總部與風味發祥地。多年來陪伴著周遭社區居民、打拼勞工、公司行號與家庭度過每一個尋常日子。
          </p>

          <p className="text-[#4D443D]">
            為服務更多在地朋友，緣便當體系延伸成立了<strong className="text-[#181818] font-bold">八德加盟店</strong>與<strong className="text-[#181818] font-bold">大湳加盟店</strong>。每一間加盟門市皆嚴格承襲中山總店的料理配方與品質標準：現點現炸金黃酥香的肉品、慢火古法熬滷的主菜、當日熱鍋現炒的三道家常配菜，以及永遠盛得飽滿踏實的大碗白飯。
          </p>

          <p className="text-[#4D443D]">
            堅持不偷工減料，將傳統台灣便當文化的純樸用心，轉化為每一道便當出爐時的暖胃香氣。
          </p>

          <div className="pt-4 border-t border-[#EAE3D6] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#665B51] font-bold">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
              <span>中山總店直營領銜</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
              <span>嚴選每日在地食材</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
              <span>現點現做熱騰騰</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
              <span>親切實在好滋味</span>
            </div>
          </div>
        </article>

        {/* 家常餐飲理念：份量、家常滋味、價格、服務理念 */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">
              FOUR CORE COMMITMENTS
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#181818]">
              我們堅持的四大理念
            </h2>
            <p className="text-xs text-[#7A7066]">
              樸實無華的堅持，只為端上一份熱騰騰的安心好便當
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {intentions.map((item, idx) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl border border-[#E2DAD0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#8C8074] font-mono font-bold tracking-widest">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] text-[#EA580C] uppercase tracking-wider font-bold bg-[#FAF2EB] px-2 py-0.5 rounded-full border border-[#F0DFD1]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-serif-tc text-lg font-bold text-[#181818] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#665B51] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
