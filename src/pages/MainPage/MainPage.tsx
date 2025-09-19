import { useState } from 'react';
import { useFortuneGenerator } from '../../hooks/useFortuneGenerator';
import FortuneInput from '../../components/FortuneInput';
import FortuneDisplay from '../../components/FortuneDisplay';
import FortuneHistoryComponent from '../../components/FortuneHistory';
import AIAnalysisLoading from '../../components/AIAnalysisLoading';

const MainPage = () => {
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  
  const {
    isGenerating,
    currentFortune,
    history,
    generateFortune,
    clearHistory,
    resetFortune,
    setCurrentFortune
  } = useFortuneGenerator();

  const handleGenerateFortune = async (name: string, birthdate: string) => {
    // 먼저 오늘 같은 정보로 이미 운세를 봤는지 확인
    const today = new Date().toISOString().split('T')[0];
    const existingFortune = history.find(h => 
      h.name === name.trim() && 
      h.birthdate === birthdate && 
      h.date === today
    );

    if (existingFortune) {
      // 이미 오늘 운세를 봤다면 즉시 결과 표시
      setCurrentFortune({
        fortune: existingFortune.fortune,
        score: existingFortune.score,
        luckyItems: existingFortune.luckyItems,
        date: existingFortune.date
      });
      return existingFortune;
    }

    // 새로운 운세라면 AI 분석 화면 표시
    setCurrentUserName(name);
    setIsAIAnalyzing(true);
    
    // 실제 운세 생성 (백그라운드에서)
    const fortuneData = await generateFortune(name, birthdate);
    return fortuneData;
  };

  const handleAIAnalysisComplete = async () => {
    setIsAIAnalyzing(false);
    // AI 분석이 완료되면 이미 생성된 운세 데이터가 표시됨
  };

  const handleReset = () => {
    setIsAIAnalyzing(false);
    setCurrentUserName('');
    resetFortune();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* 배경 장식 - 클로버 테마로 변경 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-200/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-100/30 rounded-full blur-2xl"></div>
        
        {/* 은은한 클로버 패턴 */}
        <div className="absolute top-10 left-10 opacity-10">
          <img src="/icons/four-leaf-clover.svg" alt="클로버" className="w-6 h-6" />
        </div>
        <div className="absolute top-32 right-16 opacity-10">
          <img src="/icons/four-leaf-clover.svg" alt="클로버" className="w-8 h-8" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <img src="/icons/four-leaf-clover.svg" alt="클로버" className="w-7 h-7" />
        </div>
        <div className="absolute bottom-40 right-12 opacity-10">
          <img src="/icons/four-leaf-clover.svg" alt="클로버" className="w-5 h-5" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 w-full px-4 py-6">
        {/* 헤더 - 모바일 최적화 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <img src="/icons/four-leaf-clover.svg" alt="네잎클로버" className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-green-600">동국대학교 Frontier</span> 행운의 운세
            </h1>
            <img src="/icons/university.svg" alt="동국대학교" className="w-8 h-8 ml-2" />
          </div>
          <p className="text-gray-600 text-sm mb-3">
            🍀 네잎클로버를 구매한 당신에게 찾아온 행운!
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full">
            <span className="text-green-600 font-medium text-sm">
              📅 {new Date().toLocaleDateString('ko-KR', { 
                month: 'long', 
                day: 'numeric',
                weekday: 'short'
              })}
            </span>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="space-y-6">
          {isAIAnalyzing ? (
            <AIAnalysisLoading 
              userName={currentUserName}
              onComplete={handleAIAnalysisComplete}
            />
          ) : !currentFortune ? (
            <FortuneInput 
              onGenerateFortune={handleGenerateFortune}
              isGenerating={isGenerating}
            />
          ) : (
            <FortuneDisplay
              fortune={currentFortune}
              onReset={handleReset}
            />
          )}

          {/* 히스토리 - AI 분석 중이 아닐 때만 표시 */}
          {!isAIAnalyzing && (
            <FortuneHistoryComponent
              history={history}
              onClearHistory={clearHistory}
            />
          )}
        </div>

        {/* 푸터 - 모바일 최적화 */}
        <footer className="text-center mt-8 text-gray-500 pb-4">
          <div className="flex items-center justify-center mb-2">
            <img src="/icons/university.svg" alt="동국대학교" className="w-4 h-4 mr-1" />
            <p className="text-sm">동국대학교 Frontier "연매출3조"</p>
          </div>
          <p className="text-xs">새로운 운세로 시작하는 하루</p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
