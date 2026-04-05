import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ProblemBlockProps {
  problemDescription: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

const ProblemBlock: React.FC<ProblemBlockProps> = ({
  problemDescription,
  backgroundColor = 'bg-white',
  borderColor = 'border-slate-200',
  borderRadius = 'rounded-lg'
}) => {
  // 生成问题列表项
  const problemItems = problemDescription.split('. ').filter(item => item.trim() !== '');

  return (
    <div className={`${backgroundColor} border ${borderColor} ${borderRadius} p-8`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500"></div>
        The Problem
      </h2>
      <ul className="space-y-4">
        {problemItems.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <AlertCircle className="h-3 w-3 text-red-500" />
            </div>
            <p className="text-slate-600 leading-relaxed">
              {item.trim()}.
            </p>
          </li>
        ))}
      </ul>
      <p className="text-slate-600 leading-relaxed mt-6">
        This is a common challenge faced by many content creators and marketers today. 
        The current solutions often involve complex design tools that require significant time investment and 
        technical skills, which can be a major barrier for solopreneurs and small teams.
      </p>
    </div>
  );
};

export default ProblemBlock;