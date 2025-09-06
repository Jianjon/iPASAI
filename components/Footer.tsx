import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 pb-12 px-4 border-t border-[var(--color-border-primary)] text-sm text-[var(--color-text-muted)] text-center">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h4 className="font-bold text-base text-[var(--color-text-secondary)] mb-2">免責聲明</h4>
          <p className="max-w-3xl mx-auto">
            本平台「CarbonPath 教育平台 - iPAS AI 學習日誌」僅供學術交流與教學目的使用，所有內容僅供參考。本平台致力於提供正確與即時的資訊，但無法保證所有內容的完整性、準確性或適用性。使用者應自行承擔所有風險，本平台及其開發者不對任何因使用本平台資訊而導致的任何直接或間接損失負責。
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base text-[var(--color-text-secondary)] mb-2">聯絡我 (Contact Me)</h4>
          <p>Jon Chang</p>
          <p>jonchang1980@gmail.com</p>
          <p>LINE ID: jonchang54</p>
        </div>
        <div>
           <h4 className="font-bold text-base text-[var(--color-text-secondary)] mb-2">相關專案</h4>
           <a href="https://carbonpath-42521397234.us-west1.run.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
            iPAS 淨零考試模擬器
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
