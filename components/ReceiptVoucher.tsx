
import React from 'react';
import { ReceiptData } from '../types';
import { CONTACT_INFO } from '../constants';

interface ReceiptVoucherProps {
  data: ReceiptData;
  onClose: () => void;
}

const ReceiptVoucher: React.FC<ReceiptVoucherProps> = ({ data, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:p-0 print:bg-white">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] print:shadow-none print:max-h-none print:w-full print:rounded-none">
        {/* Header Controls - Hidden on Print */}
        <div className="flex items-center justify-between p-4 border-bottom bg-slate-50 print:hidden">
          <h3 className="text-lg font-bold text-slate-800">سند استلام مبلغ مالي</h3>
          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <span>طباعة</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="flex-grow overflow-y-auto p-8 print:p-0 print:overflow-visible" id="receipt-content">
          <div className="border-4 border-double border-emerald-800 p-6 relative">
            {/* Watermark/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
              <span className="text-9xl font-black rotate-[-35deg] whitespace-nowrap">مكتب الوطن</span>
            </div>

            {/* Top Header */}
            <div className="flex justify-between items-start mb-8 border-b-2 border-emerald-800 pb-6 relative z-10">
              <div className="text-right">
                <h1 className="text-2xl font-black text-emerald-900 mb-1">مكتب الوطن للخدمات الإلكترونية المساندة</h1>
                <p className="text-sm font-bold text-emerald-800">لجميع المنصات الحكومية والخاصة وبرمجة نظم المعلومات</p>
                <div className="mt-4 space-y-1 text-xs font-bold text-slate-600">
                  <p>شهادة العمل الحر رقم: 803195447</p>
                  <p>صادرة من وزارة الموارد البشرية</p>
                </div>
              </div>
              <div className="text-left flex flex-col items-end">
                <div className="w-24 h-24 bg-emerald-900 rounded-xl flex items-center justify-center text-white text-4xl mb-2">
                  <span className="font-black">الوطن</span>
                </div>
                <div className="text-xs font-bold text-slate-600 text-left">
                  {CONTACT_INFO.phones.slice(0, 3).map((phone, i) => (
                    <p key={i}>جوال: {phone}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-10 relative z-10">
              <span className="inline-block px-12 py-2 bg-emerald-900 text-white text-xl font-black rounded-full shadow-lg">
                سند استلام مبلغ مالي
              </span>
            </div>

            {/* Main Fields */}
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg whitespace-nowrap">تم استلام مبلغ وقدره:</span>
                <div className="flex-grow border-b-2 border-dotted border-slate-400 pb-1 text-xl font-black text-emerald-900 px-4">
                  {data.amount} ريال سعودي فقط لا غير
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-lg whitespace-nowrap">من السيد / السيدة:</span>
                <div className="flex-grow border-b-2 border-dotted border-slate-400 pb-1 text-xl font-bold text-slate-800 px-4">
                  {data.customerName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg whitespace-nowrap">رسوم معاملة رقم:</span>
                  <div className="flex-grow border-b-2 border-dotted border-slate-400 pb-1 font-bold text-slate-800 px-4">
                    {data.transactionNumber}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg whitespace-nowrap">اليوم:</span>
                  <div className="flex-grow border-b-2 border-dotted border-slate-400 pb-1 font-bold text-slate-800 px-4">
                    {data.day}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-bold text-lg whitespace-nowrap mt-1">بخصوص:</span>
                <div className="flex-grow border-b-2 border-dotted border-slate-400 pb-1 font-bold text-slate-800 px-4 min-h-[3rem]">
                  {data.description}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <div className="text-center">
                  <p className="text-xs font-bold text-emerald-800 mb-1">المبلغ الإجمالي</p>
                  <p className="text-xl font-black text-emerald-900">{data.amount} ر.س</p>
                </div>
                <div className="text-center border-x border-emerald-200">
                  <p className="text-xs font-bold text-emerald-800 mb-1">المدفوع</p>
                  <p className="text-xl font-black text-emerald-900">{data.paidAmount} ر.س</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-emerald-800 mb-1">المتبقي عند الانتهاء</p>
                  <p className="text-xl font-black text-red-600">{data.remainingAmount} ر.س</p>
                </div>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="mt-16 grid grid-cols-2 gap-20 relative z-10">
              <div className="text-center">
                <p className="font-bold text-slate-500 mb-12">توقيع المستلم</p>
                <div className="border-t border-slate-300 pt-2">
                  <p className="font-black text-emerald-900">مدير مكتب الوطن</p>
                  <p className="font-bold text-emerald-800">ماجد سعود العميري</p>
                </div>
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <div className="w-32 h-32 border-4 border-emerald-800/30 rounded-full flex items-center justify-center text-emerald-800/30 font-black text-sm rotate-12">
                  ختم المكتب
                </div>
                <p className="mt-4 text-xs font-bold text-slate-400">التاريخ: {data.date}</p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-12 pt-4 border-t border-slate-200 text-center text-xs font-bold text-slate-500">
              <p>الموقع: {CONTACT_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptVoucher;
