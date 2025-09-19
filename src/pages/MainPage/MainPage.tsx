import { useFortuneGenerator } from '../../hooks/useFortuneGenerator';
import FortuneInput from '../../components/FortuneInput';
import FortuneDisplay from '../../components/FortuneDisplay';
import FortuneHistoryComponent from '../../components/FortuneHistory';

const MainPage = () => {
  const {
    isGenerating,
    currentFortune,
    history,
    generateFortune,
    clearHistory,
    resetFortune
  } = useFortuneGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* 배경 장식 - 모바일에 맞게 축소 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-200/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-100/30 rounded-full blur-2xl"></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 w-full px-4 py-6">
        {/* 헤더 - 모바일 최적화 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <img src="/icons/university.svg" alt="동국대학교" className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-orange-500">동국대학교</span> 운세
            </h1>
            <img src="/icons/crystal-ball.svg" alt="운세" className="w-8 h-8 ml-2" />
          </div>
          <p className="text-gray-600 text-sm mb-3">
            동국대학교 학생들을 위한 특별한 운세 서비스
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-orange-100 rounded-full">
            <span className="text-orange-600 font-medium text-sm">
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
          {!currentFortune ? (
            <FortuneInput 
              onGenerateFortune={generateFortune}
              isGenerating={isGenerating}
            />
          ) : (
            <FortuneDisplay
              fortune={currentFortune}
              onReset={resetFortune}
            />
          )}

          {/* 히스토리 */}
          <FortuneHistoryComponent
            history={history}
            onClearHistory={clearHistory}
          />
        </div>

        {/* 푸터 - 모바일 최적화 */}
        <footer className="text-center mt-8 text-gray-500 pb-4">
          <div className="flex items-center justify-center mb-2">
            <img src="/icons/university.svg" alt="동국대학교" className="w-4 h-4 mr-1" />
            <p className="text-sm">동국대학교 운세 서비스</p>
          </div>
          <p className="text-xs">매일 새로운 운세로 하루를 시작하세요!</p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
