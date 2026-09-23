import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquareHeart, Sparkles, Send, ArrowRight, CornerDownRight } from 'lucide-react';
import { Link } from '../router/Router';

// Local storage key for transient client-side backup
const FEEDBACK_STORAGE_KEY = 'yuan_bento_feedback_cache';

const SATISFACTION_OPTIONS = [
  { id: 'quality', label: '餐點品質' },
  { id: 'portion', label: '餐點份量' },
  { id: 'price', label: '價格' },
  { id: 'service', label: '服務態度' },
  { id: 'takeout_delivery', label: '外帶／外送' },
  { id: 'online_order', label: '線上點餐體驗' },
];

const RATING_LABELS: Record<number, string> = {
  1: '需要大幅改進',
  2: '尚有進步空間',
  3: '普通・符合預期',
  4: '滿意・美味實在',
  5: '非常滿意・值得推薦',
};

interface FeedbackPageProps {
  embedded?: boolean;
}

export default function FeedbackPage({ embedded = false }: FeedbackPageProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedAspects, setSelectedAspects] = useState<string[]>([
    '餐點品質',
    '餐點份量',
  ]);
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedAt, setSubmittedAt] = useState<string>('');

  // Handle aspect toggle (multiple choice)
  const toggleAspect = (label: string) => {
    setSelectedAspects((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord = {
      id: `fb_${Date.now()}`,
      rating,
      selectedAspects,
      comment: comment.trim(),
      name: name.trim(),
      contact: contact.trim(),
      createdAt: new Date().toISOString(),
    };

    // Store in browser local storage for transient persistence
    try {
      const existing = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newRecord);
      // keep latest 20 in cache
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list.slice(0, 20)));
    } catch {
      // LocalStorage error fallback
    }

    setSubmittedAt(
      new Date().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setRating(5);
    setHoverRating(0);
    setSelectedAspects(['餐點品質', '餐點份量']);
    setComment('');
    setName('');
    setContact('');
    setIsSubmitted(false);
  };

  return (
    <div
      id="feedback-section"
      className={
        embedded
          ? 'w-full'
          : 'bg-[#FAF7F2] py-10 sm:py-16 min-h-screen text-[#1A1A1A]'
      }
    >
      <div className={embedded ? 'w-full' : 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {!embedded && (
          /* Title Banner */
          <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-10 border border-[#2E2721] shadow-xl text-center max-w-3xl mx-auto mb-10 relative overflow-hidden">
            <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-2">
              <MessageSquareHeart className="w-4 h-4" />
              <span>CUSTOMER SATISFACTION FEEDBACK</span>
            </div>
            <h1 className="font-serif-tc text-3xl sm:text-4xl font-black text-white tracking-tight">
              顧客滿意度回饋
            </h1>
            <p className="text-xs sm:text-sm text-[#C5BDB3] mt-2.5 leading-relaxed max-w-xl mx-auto">
              吃得滿意嗎？歡迎告訴我們您的用餐感受。您的每一步真實體驗與真誠建言，都是緣便當快餐店持續精進好滋味的最佳動力。
            </p>
          </div>
        )}

        {/* Feedback Card Container */}
        <div className="bg-white rounded-3xl border border-[#E2DAD0] shadow-sm overflow-hidden">
          {isSubmitted ? (
            /* 送出後成功畫面 */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#EA580C]/10 border-2 border-[#EA580C] flex items-center justify-center mx-auto text-[#EA580C] shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] border border-[#E2DAD0] text-[#EA580C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>意見已成功送出</span>
                </div>
                <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#181818]">
                  感謝您的回饋！
                </h2>
                <p className="text-sm sm:text-base text-[#665B51] leading-relaxed pt-1">
                  您的意見將協助我們持續改善餐點與服務。
                </p>
              </div>

              {/* Brief submission receipt details */}
              <div className="max-w-md mx-auto bg-[#FAF7F2] rounded-2xl p-5 border border-[#E2DAD0] text-left text-xs space-y-2 text-[#665B51]">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D6] text-[#181818] font-bold">
                  <span>本次評分</span>
                  <div className="flex items-center text-[#EA580C]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rating ? 'fill-[#EA580C] text-[#EA580C]' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 font-mono font-bold text-xs">{rating} 星</span>
                  </div>
                </div>
                {selectedAspects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[#8C8074]">滿意項目：</span>
                    {selectedAspects.map((aspect) => (
                      <span
                        key={aspect}
                        className="px-2 py-0.5 rounded bg-white border border-[#E2DAD0] text-[#181818] font-medium"
                      >
                        {aspect}
                      </span>
                    ))}
                  </div>
                )}
                {comment && (
                  <p className="pt-1 text-[#181818] italic bg-white p-2.5 rounded-lg border border-[#EAE3D6]">
                    「{comment}」
                  </p>
                )}
                {submittedAt && (
                  <div className="text-[11px] text-[#A3998F] text-right pt-1 font-mono">
                    填寫時間：{submittedAt}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#181818] hover:bg-black text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
                >
                  <span>返回首頁</span>
                </Link>

                <Link
                  to="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
                >
                  <span>繼續瀏覽菜單</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-[#8C8074] hover:text-[#EA580C] underline transition-colors cursor-pointer"
                >
                  填寫另一則用餐回饋
                </button>
              </div>
            </div>
          ) : (
            /* 填寫表單區 */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {/* Form Intro */}
              <div className="border-b border-[#EAE3D6] pb-5">
                <div className="flex items-center space-x-2 text-[#EA580C] text-xs font-bold uppercase tracking-wider mb-1">
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>CUSTOMER FEEDBACK</span>
                </div>
                <h2 className="font-serif-tc text-2xl font-bold text-[#181818]">
                  吃得滿意嗎？歡迎告訴我們您的用餐感受。
                </h2>
                <p className="text-xs sm:text-sm text-[#665B51] mt-1 leading-relaxed">
                  感謝您選擇緣便當快餐店！請依據本次用餐或點餐感受給予評分與指教，我們會持續優化美味與出餐體驗。
                </p>
              </div>

              {/* 1. 整體滿意度 (1-5 顆星) */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#181818]">
                  1. 您對這次用餐的整體滿意度？
                  <span className="text-[#EA580C] ml-1">*</span>
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Star rating buttons */}
                  <div
                    className="flex items-center space-x-1.5"
                    role="radiogroup"
                    aria-label="整體滿意度星級評分"
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isFilled =
                        hoverRating > 0
                          ? starValue <= hoverRating
                          : starValue <= rating;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1.5 sm:p-2 rounded-xl hover:bg-[#FAF7F2] transition-transform active:scale-95 focus:outline-none cursor-pointer"
                          aria-label={`${starValue} 顆星`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isFilled
                                ? 'fill-[#EA580C] text-[#EA580C]'
                                : 'text-[#D0C8BE] hover:text-[#EA580C]/60'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Rating Label Indicator */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E2DAD0] text-xs font-bold text-[#EA580C]">
                    <span className="font-mono text-sm">{hoverRating || rating} / 5</span>
                    <span className="text-[#665B51]">・</span>
                    <span>{RATING_LABELS[hoverRating || rating]}</span>
                  </div>
                </div>
              </div>

              {/* 2. 最滿意的項目 (可複選) */}
              <div className="space-y-3 pt-2 border-t border-[#EAE3D6]">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-[#181818]">
                    2. 最滿意的項目
                    <span className="text-xs text-[#8C8074] font-normal ml-2">（可複選）</span>
                  </label>
                  <span className="text-[11px] text-[#8C8074]">
                    已選擇 {selectedAspects.length} 項
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SATISFACTION_OPTIONS.map((option) => {
                    const isChecked = selectedAspects.includes(option.label);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleAspect(option.label)}
                        className={`p-3 rounded-2xl border text-left flex items-center space-x-2.5 transition-all text-xs sm:text-sm font-bold cursor-pointer ${
                          isChecked
                            ? 'bg-[#181818] border-[#181818] text-white shadow-xs'
                            : 'bg-[#FAF7F2] border-[#E2DAD0] text-[#423831] hover:border-[#EA580C]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isChecked
                              ? 'bg-[#EA580C] border-[#EA580C] text-white'
                              : 'bg-white border-[#C9BFB5]'
                          }`}
                        >
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="truncate">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. 建議與意見 (選填) */}
              <div className="space-y-2 pt-2 border-t border-[#EAE3D6]">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="feedback-comment"
                    className="block text-sm font-bold text-[#181818]"
                  >
                    3. 建議與意見
                  </label>
                  <span className="text-xs text-[#8C8074] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E2DAD0]">
                    選填
                  </span>
                </div>
                <textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="歡迎留下您的建議或想告訴我們的話……"
                  className="w-full p-4 rounded-2xl border border-[#D5CCC0] bg-[#FAF7F2] text-[#181818] text-xs sm:text-sm focus:bg-white focus:border-[#EA580C] focus:outline-none transition-colors placeholder:text-[#A89E93] resize-y leading-relaxed"
                />
              </div>

              {/* 4. 聯絡方式 (選填) */}
              <div className="space-y-3 pt-2 border-t border-[#EAE3D6]">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-[#181818]">
                    4. 聯絡方式
                  </label>
                  <span className="text-xs text-[#8C8074] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E2DAD0]">
                    選填
                  </span>
                </div>
                <p className="text-xs text-[#7A7066]">
                  若您希望我們針對具體建議進行回覆或致歉，歡迎留下大名與聯絡方式：
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="feedback-name"
                      className="block text-xs font-bold text-[#554940] mb-1"
                    >
                      姓名 <span className="text-[#8C8074] font-normal">（選填）</span>
                    </label>
                    <input
                      id="feedback-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例：陳先生 / 林小姐"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCC0] bg-[#FAF7F2] text-[#181818] text-xs sm:text-sm focus:bg-white focus:border-[#EA580C] focus:outline-none transition-colors placeholder:text-[#A89E93]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-contact"
                      className="block text-xs font-bold text-[#554940] mb-1"
                    >
                      電話或 Email <span className="text-[#8C8074] font-normal">（選填）</span>
                    </label>
                    <input
                      id="feedback-contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="例：0912-345-678 或 email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCC0] bg-[#FAF7F2] text-[#181818] text-xs sm:text-sm focus:bg-white focus:border-[#EA580C] focus:outline-none transition-colors placeholder:text-[#A89E93]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-sm sm:text-base font-bold shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>送出用餐回饋</span>
                </button>
                <p className="text-[11px] text-center text-[#8C8074] mt-2.5">
                  我們會細心閱讀每一份回饋，感謝您與緣便當攜手守護在地好味道。
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
