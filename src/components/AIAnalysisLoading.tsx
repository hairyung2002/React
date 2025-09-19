import { useState, useEffect } from 'react';

interface AIAnalysisLoadingProps {
  userName: string;
  onComplete: () => void;
}

const AIAnalysisLoading: React.FC<AIAnalysisLoadingProps> = ({ userName, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [dots, setDots] = useState('');

  const analysisStages = [
    '생년월일 데이터를 분석하고 있어요',
    '사주팔자 정보를 계산하고 있어요', 
    '오늘의 운세를 예측하고 있어요',
    '행운의 아이템을 찾고 있어요',
    '네잎클로버의 행운을 불러오고 있어요',
    '최종 운세를 완성하고 있어요'
  ];

  useEffect(() => {
    const totalDuration = 5 * 1000; // 5초
    const stageInterval = totalDuration / analysisStages.length;
    const progressInterval = 100; // 100ms마다 진행률 업데이트

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / progressInterval));
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, progressInterval);

    const stageTimer = setInterval(() => {
      setCurrentStage(prev => {
        const newStage = prev + 1;
        if (newStage >= analysisStages.length) {
          clearInterval(stageTimer);
          return analysisStages.length - 1;
        }
        return newStage;
      });
    }, stageInterval);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stageTimer);
    };
  }, [onComplete]);

  // 로딩 점 애니메이션
  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots(prev => {
        switch (prev) {
          case '': return '.';
          case '.': return '..';
          case '..': return '...';
          default: return '';
        }
      });
    }, 500);

    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4 shadow-lg animate-pulse">
            <img src="/icons/ai-brain.svg" alt="AI 분석" className="w-16 h-16 animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI 운세 분석 중</h1>
          <p className="text-sm text-gray-600">{userName}님의 운세를 분석하고 있어요</p>
        </div>

        {/* 진행률 바 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">분석 진행률</span>
            <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 현재 분석 단계 */}
        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <div>
              <p className="text-green-800 font-medium text-sm">
                {analysisStages[currentStage]}{dots}
              </p>
            </div>
          </div>
        </div>

        {/* 네잎클로버 애니메이션 */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img src="/icons/four-leaf-clover.svg" alt="클로버" className="w-full h-full opacity-60" />
            </div>
          ))}
        </div>

        {/* 예상 시간 */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            정확한 분석을 위해 잠깐만 기다려주세요
          </p>
          <p className="text-xs text-green-600 mt-1">
            💖 행운의 네잎클로버가 함께하고 있어요
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisLoading;