import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  DollarSign,
  Truck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  XCircle,
} from 'lucide-react';
import { STORE_LOCATIONS } from '../data/bentoData';
import { Link } from '../router/Router';

export interface CorporateOrderFormData {
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  deliveryDate: string;
  deliveryTime: string;
  quantity: number | '';
  budgetPerMeal: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryAddress: string;
  taxId: string;
  notes: string;
  targetBranch: string;
}

export default function CorporatePage() {
  const [formData, setFormData] = useState<CorporateOrderFormData>({
    companyName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    deliveryDate: '',
    deliveryTime: '',
    quantity: '',
    budgetPerMeal: '110-120',
    deliveryMethod: 'delivery',
    deliveryAddress: '',
    taxId: '',
    notes: '',
    targetBranch: STORE_LOCATIONS[0].id,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 取得今日日期字串 (YYYY-MM-DD) 供驗證與 min 屬性使用
  const todayStr = new Date().toISOString().split('T')[0];

  // 表單欄位驗證
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      errs.companyName = '請輸入公司／單位名稱';
    }
    if (!formData.contactName.trim()) {
      errs.contactName = '請輸入聯絡人姓名';
    }
    if (!formData.contactPhone.trim()) {
      errs.contactPhone = '請輸入聯絡電話';
    } else if (!/^[0-9\-+()#\s]{7,20}$/.test(formData.contactPhone.trim())) {
      errs.contactPhone = '請輸入有效的電話號碼格式';
    }

    if (formData.contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail.trim())) {
      errs.contactEmail = '請輸入正確的 Email 格式';
    }

    if (!formData.deliveryDate) {
      errs.deliveryDate = '請選擇訂購日期';
    } else if (formData.deliveryDate < todayStr) {
      errs.deliveryDate = '訂購日期不能為過去日期，請選擇今天或未來日期';
    }

    if (!formData.deliveryTime.trim()) {
      errs.deliveryTime = '請選擇或填寫希望配送／取餐時間';
    }

    if (formData.quantity === '' || Number(formData.quantity) <= 0) {
      errs.quantity = '請輸入預計便當數量（最少 1 份）';
    }

    if (formData.deliveryMethod === 'delivery' && !formData.deliveryAddress.trim()) {
      errs.deliveryAddress = '選擇外送時請填寫配送地址';
    }

    if (formData.taxId.trim() && !/^\d{8}$/.test(formData.taxId.trim())) {
      errs.taxId = '統一編號應為 8 位數字（若不需要可留空）';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      // 聚焦第一個錯誤欄位
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    // 使用環境變數 VITE_N8N_CORPORATE_WEBHOOK_URL
    const envWebhookUrl = import.meta.env.VITE_N8N_CORPORATE_WEBHOOK_URL;
    const n8nWebhookUrl =
      envWebhookUrl && !envWebhookUrl.includes('localhost')
        ? envWebhookUrl
        : 'https://essentially-wants-fewer-diego.trycloudflare.com/webhook/yuan-bento-corporate';

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
        source: 'yuan-bento-corporate-portal',
      };

      console.log('[CorporateOrder] Sending order to n8n webhook:', n8nWebhookUrl, payload);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        // 使用 Content-Type: text/plain;charset=UTF-8 作為 Simple Request 避免觸發 CORS preflight OPTIONS 阻擋
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!response.ok) {
          console.error(`[CorporateOrder] n8n Webhook HTTP response failed with status: ${response.status} (${response.statusText})`);
          throw new Error(`n8n Webhook returned non-2xx status: ${response.status}`);
        }

        console.log('[CorporateOrder] n8n Webhook responded successfully with status:', response.status);

        // 只有 n8n 成功收到資料並回傳 2xx 狀態後，才進入送出成功畫面
        setIsSubmitted(true);
        window.scrollTo({ top: 150, behavior: 'smooth' });
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (err: unknown) {
      console.error('[CorporateOrder] Detailed error sending corporate order to n8n webhook:', err);
      // fetch 發生網路錯誤、n8n 回傳非 2xx 狀態或連線逾時時顯示
      setSubmitError('目前訂單系統暫時無法連線，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      deliveryDate: '',
      deliveryTime: '',
      quantity: '',
      budgetPerMeal: '110-120',
      deliveryMethod: 'delivery',
      deliveryAddress: '',
      taxId: '',
      notes: '',
      targetBranch: STORE_LOCATIONS[0].id,
    });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#FAF7F2] py-10 sm:py-16 min-h-screen text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero Banner */}
        <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-10 border border-[#2E2721] shadow-xl text-center max-w-3xl mx-auto mb-10 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-2">
            <Building2 className="w-4 h-4" />
            <span>CORPORATE & GROUP DINING</span>
          </div>
          <h1 className="font-serif-tc text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            企業會議・團體訂餐
          </h1>
          <p className="text-xs sm:text-sm text-[#C5BDB3] mt-2.5 leading-relaxed max-w-xl mx-auto">
            專為公司行號會議、員工教育訓練、大型展演活動餐盒與大量訂單規劃。熱鍋現炒、份量實在，附開立統一編號與專人對單服務。
          </p>
        </div>

        {/* 4 大企業服務優勢 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-[#E2DAD0] shadow-xs text-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-[#EA580C] mx-auto" />
            <h4 className="font-serif-tc font-bold text-sm text-[#181818]">統編報帳開單</h4>
            <p className="text-[11px] text-[#70645B]">支援公司行號三聯發票或統一編號開立</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E2DAD0] shadow-xs text-center space-y-1">
            <Truck className="w-6 h-6 text-[#EA580C] mx-auto" />
            <h4 className="font-serif-tc font-bold text-sm text-[#181818]">指定時間配送</h4>
            <p className="text-[11px] text-[#70645B]">按約定時間準時送達指定會議地點</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E2DAD0] shadow-xs text-center space-y-1">
            <Sparkles className="w-6 h-6 text-[#EA580C] mx-auto" />
            <h4 className="font-serif-tc font-bold text-sm text-[#181818]">熱鍋當日現做</h4>
            <p className="text-[11px] text-[#70645B]">熱騰騰酥炸香滷主菜＋三道每日現炒熱菜</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E2DAD0] shadow-xs text-center space-y-1">
            <Phone className="w-6 h-6 text-[#EA580C] mx-auto" />
            <h4 className="font-serif-tc font-bold text-sm text-[#181818]">專人迅速確認</h4>
            <p className="text-[11px] text-[#70645B]">收到需求後專人致電或簡訊確認菜單與細節</p>
          </div>
        </div>

        {/* 成功送出狀態畫面 */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl border border-[#E2DAD0] p-8 sm:p-12 text-center space-y-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#181818]">
                訂餐需求已送出，我們將盡快與您確認訂單內容。
              </h2>
              <p className="text-xs sm:text-sm text-[#665B51] max-w-lg mx-auto leading-relaxed">
                感謝您選擇緣便當快餐店！店家專人收到您的團體預約需求後，將於營業時間內致電確認菜色品項、送達時間與統編資料。
              </p>
            </div>

            {/* 填寫摘要簡報 */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E1D7] max-w-md mx-auto text-left text-xs space-y-2 text-[#4A3F35]">
              <div className="flex justify-between py-1 border-b border-[#E8E1D7]">
                <span className="text-[#8C8074]">單位名稱</span>
                <span className="font-bold text-[#181818]">{formData.companyName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E1D7]">
                <span className="text-[#8C8074]">聯絡人 / 電話</span>
                <span className="font-bold text-[#181818]">
                  {formData.contactName}（{formData.contactPhone}）
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E1D7]">
                <span className="text-[#8C8074]">預定日期 / 時間</span>
                <span className="font-bold text-[#181818]">
                  {formData.deliveryDate} {formData.deliveryTime}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E1D7]">
                <span className="text-[#8C8074]">預估數量 / 取餐方式</span>
                <span className="font-bold text-[#EA580C]">
                  {formData.quantity} 份・{formData.deliveryMethod === 'delivery' ? '專車配送' : '門市自取'}
                </span>
              </div>
              {formData.taxId && (
                <div className="flex justify-between py-1">
                  <span className="text-[#8C8074]">統一編號</span>
                  <span className="font-mono font-bold text-[#181818]">{formData.taxId}</span>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-[#D5CCC0] hover:bg-[#FAF7F2] text-xs sm:text-sm font-bold text-[#181818] transition-colors"
              >
                再填寫一筆訂單需求
              </button>
              <Link
                to="/menu"
                className="px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm inline-flex items-center space-x-1.5"
              >
                <span>瀏覽 10 款商品菜單</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* 表單填寫卡片 */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl border border-[#E2DAD0] p-6 sm:p-10 shadow-sm space-y-8"
          >
            {/* 提示 Banner */}
            <div className="bg-[#FAF7F2] border-l-4 border-[#EA580C] p-4 rounded-r-xl flex items-start space-x-3 text-xs text-[#52463F]">
              <AlertCircle className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                標註 <span className="text-[#EA580C] font-bold">*</span> 的欄位為必填項目。團體訂餐建議於預定取餐日前 1~3 天預約，以便門市提早採購當令鮮蔬並為您保留充足產能。
              </p>
            </div>

            {/* 送出錯誤提示 Alert */}
            {submitError && (
              <div className="bg-[#FFF5F5] border border-[#FECACA] p-4 rounded-2xl flex items-start space-x-3 text-xs text-[#DC2626] animate-in fade-in duration-200">
                <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-sm">傳送失敗</p>
                  <p className="leading-relaxed">{submitError}</p>
                </div>
              </div>
            )}

            {/* 一、公司與聯絡人資料 */}
            <div className="space-y-4">
              <h3 className="font-serif-tc text-lg font-bold text-[#181818] flex items-center space-x-2 border-b border-[#F0ECE4] pb-2">
                <User className="w-4 h-4 text-[#EA580C]" />
                <span>一、訂購單位與聯絡窗口</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 公司／單位名稱 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    公司／單位名稱 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例：台灣積體電路股份有限公司 / 桃園分部"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.companyName ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.companyName}</p>
                  )}
                </div>

                {/* 聯絡人姓名 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    聯絡人姓名 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例：林秘書 / 王先生"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.contactName ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.contactName && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.contactName}</p>
                  )}
                </div>

                {/* 聯絡電話 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    聯絡電話／手機 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="例：0912-345-678 或 03-1234567#88"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.contactPhone ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.contactPhone && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.contactPhone}</p>
                  )}
                </div>

                {/* 聯絡 Email */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    電子郵件 Email <span className="text-[#8C8074] font-normal">（選填，方便收取明細）</span>
                  </label>
                  <input
                    type="email"
                    placeholder="例：contact@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.contactEmail ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.contactEmail && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.contactEmail}</p>
                  )}
                </div>

                {/* 統一編號 */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    統一編號 <span className="text-[#8C8074] font-normal">（選填，需要報帳請填寫 8 位數字）</span>
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    placeholder="例：12345678"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.taxId ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.taxId && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.taxId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 二、用餐時間、數量與預算 */}
            <div className="space-y-4">
              <h3 className="font-serif-tc text-lg font-bold text-[#181818] flex items-center space-x-2 border-b border-[#F0ECE4] pb-2">
                <Calendar className="w-4 h-4 text-[#EA580C]" />
                <span>二、訂購時間、份數與預算</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 訂購日期 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    訂購日期 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.deliveryDate ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.deliveryDate && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.deliveryDate}</p>
                  )}
                </div>

                {/* 希望配送／取餐時間 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    希望時間 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.deliveryTime ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.deliveryTime && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.deliveryTime}</p>
                  )}
                </div>

                {/* 便當數量 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    預計便當數量 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    required
                    placeholder="例：30"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value === '' ? '' : Number(e.target.value) })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.quantity ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.quantity && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.quantity}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* 每份預算 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    每份預算範圍
                  </label>
                  <select
                    value={formData.budgetPerMeal}
                    onChange={(e) => setFormData({ ...formData, budgetPerMeal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCC0] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:border-[#EA580C]"
                  >
                    <option value="110-120">常態標準款（NT$ 110 ~ 120）</option>
                    <option value="110">平價精選款（NT$ 110）</option>
                    <option value="120">特選酥炸雞腿／牛腩款（NT$ 120）</option>
                    <option value="custom">雙主菜／特殊客製預算（洽專人報價）</option>
                  </select>
                </div>

                {/* 希望承作門市 */}
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    希望服務門市
                  </label>
                  <select
                    value={formData.targetBranch}
                    onChange={(e) => setFormData({ ...formData, targetBranch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCC0] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:border-[#EA580C]"
                  >
                    {STORE_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} {loc.isMain ? '（中山總店直營）' : '（加盟店）'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 三、配送／取餐方式與地址 */}
            <div className="space-y-4">
              <h3 className="font-serif-tc text-lg font-bold text-[#181818] flex items-center space-x-2 border-b border-[#F0ECE4] pb-2">
                <Truck className="w-4 h-4 text-[#EA580C]" />
                <span>三、配送／取餐方式</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'delivery' })}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    formData.deliveryMethod === 'delivery'
                      ? 'border-[#EA580C] bg-[#FFFBF8] text-[#EA580C] ring-1 ring-[#EA580C]'
                      : 'border-[#D5CCC0] text-[#665B51] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>專車外送到府</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    formData.deliveryMethod === 'pickup'
                      ? 'border-[#EA580C] bg-[#FFFBF8] text-[#EA580C] ring-1 ring-[#EA580C]'
                      : 'border-[#D5CCC0] text-[#665B51] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>至門市自取</span>
                </button>
              </div>

              {formData.deliveryMethod === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold text-[#181818] mb-1.5">
                    配送地址 <span className="text-[#EA580C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例：桃園市桃園區中山路OO號 OO大樓5樓會議室"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:bg-white transition-colors ${
                      errors.deliveryAddress ? 'border-[#DC2626] bg-[#FFF5F5]' : 'border-[#D5CCC0] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-[#DC2626] mt-1 font-medium">{errors.deliveryAddress}</p>
                  )}
                </div>
              )}
            </div>

            {/* 四、備註與特殊需求 */}
            <div className="space-y-4">
              <h3 className="font-serif-tc text-lg font-bold text-[#181818] flex items-center space-x-2 border-b border-[#F0ECE4] pb-2">
                <FileText className="w-4 h-4 text-[#EA580C]" />
                <span>四、備註與特殊需求</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#181818] mb-1.5">
                  備註／特殊需求 <span className="text-[#8C8074] font-normal">（選填，如配菜不吃辣、指定主菜比例、特定包裝等）</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="例：雞腿 15 份、滷排骨 15 份；需提供會議用免洗餐具；請於上午 11:30 抵達送入貨梯。"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCC0] text-xs sm:text-sm bg-[#FAF8F5] focus:outline-none focus:border-[#EA580C] focus:bg-white"
                />
              </div>
            </div>

            {/* 表單提交按鈕 */}
            <div className="pt-4 border-t border-[#F0ECE4] space-y-3">
              {submitError && (
                <div className="bg-[#FFF5F5] border border-[#FECACA] p-3.5 rounded-xl flex items-start space-x-2.5 text-xs text-[#DC2626]">
                  <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{submitError}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>傳送訂餐需求中...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>送出訂餐需求</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-[#8C8074] mt-2.5">
                送出後門市人員將於 24 小時內與您聯繫確認訂單內容與付款方式。若為當日急單請直接撥打門市電話。
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
