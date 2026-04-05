import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faq: FAQItem[];
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faq,
  backgroundColor = 'bg-white',
  borderColor = 'border-slate-200',
  borderRadius = 'rounded-lg'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${backgroundColor} border ${borderColor} ${borderRadius} p-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500"></div>
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faq.map((item, index) => (
          <div key={index} className="border border-slate-100 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <h3 className="font-bold text-slate-900">{item.question}</h3>
              </div>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-slate-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 border-t border-slate-100">
                <p className="text-slate-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;