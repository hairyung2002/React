import type { FortuneData } from '../types/fortune';

interface FortuneDisplayProps {
  fortune: FortuneData;
  onReset: () => void;
}

const FortuneDisplay: React.FC<FortuneDisplayProps> = ({ fortune, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-orange-100';
    return 'bg-gray-100';
  };

  const getStars = (score: number) => {
    const starCount = Math.floor(score / 20);
    return '⭐'.repeat(Math.max(1, starCount));
  };

  const shareFortune = () => {
    const text = `🔮 동국대 운세 결과 🔮\\n운세: ${fortune.fortune}\\n점수: ${fortune.score}점 ${getStars(fortune.score)}\\n\\n#동국대운세 #오늘의운세`;
    
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      navigator.share({
        title: '동국대 운세',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('운세가 클립보드에 복사되었습니다!');
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white text-center">
          <div className="flex items-center justify-center mb-2">
            <img src="/icons/four-leaf-clover.svg" alt="네잎클로버" className="w-8 h-8 mr-2" />
            <h2 className="text-xl font-bold">오늘의 운세</h2>
          </div>
          <p className="text-green-100 text-sm">{new Date().toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}</p>
        </div>

        {/* 점수 섹션 */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBackground(fortune.score)} mb-3`}>
              <span className={`text-2xl font-bold ${getScoreColor(fortune.score)}`}>
                {fortune.score}
              </span>
            </div>
            <div className="flex items-center justify-center mb-2">
              {Array.from({ length: Math.max(1, Math.floor(fortune.score / 20)) }, (_, i) => (
                <img key={i} src="/icons/star.svg" alt="별" className="w-6 h-6 mx-0.5" />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              {fortune.score >= 90 ? '최고의 운세!' : 
               fortune.score >= 80 ? '좋은 운세!' : 
               fortune.score >= 70 ? '괜찮은 운세!' : '평범한 운세'}
            </p>
          </div>
        </div>

        {/* 운세 메시지 */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <img src="/icons/fortune-card.svg" alt="운세 카드" className="w-5 h-5 mr-2" />
            <h3 className="text-base font-semibold text-gray-800">오늘의 메시지</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm bg-green-50 p-3 rounded-xl">
            {fortune.fortune}
          </p>
        </div>

        {/* 행운 아이템 */}
        <div className="p-4">
          <div className="flex items-center mb-3">
            <img src="/icons/star.svg" alt="행운의 별" className="w-5 h-5 mr-2" />
            <h3 className="text-base font-semibold text-gray-800">오늘의 행운 아이템</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-red-200 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 색깔</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.color}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">#</span>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 숫자</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.number}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-green-200 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 음식</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.food}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-purple-200 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 장소</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.place}</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-yellow-200 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 활동</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.activity}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <img src="/icons/four-leaf-clover.svg" alt="네잎클로버" className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs text-gray-600 mb-1">특별한 행운</div>
              <div className="font-medium text-gray-800 text-sm">네잎클로버</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-indigo-200 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xs">↗</span>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 방향</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.direction}</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-1 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-xs">⏰</span>
              </div>
              <div className="text-xs text-gray-600 mb-1">행운의 시간</div>
              <div className="font-medium text-gray-800 text-sm">{fortune.luckyItems.time}</div>
            </div>
          </div>
        </div>

        {/* QR코드 연동 메시지 */}
        <div className="p-4 bg-green-50 border-t border-green-100">
          <div className="flex items-center justify-center">
            <img src="/icons/qr-code.svg" alt="QR코드" className="w-5 h-5 mr-2" />
            <div className="text-center">
              <p className="text-green-800 font-medium text-sm">
                🍀 이 운세는 행운의 네잎클로버와 함께 제공됩니다
              </p>
              <p className="text-green-600 text-xs mt-1">
                QR코드로 연결된 특별한 행운을 만나보세요!
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="p-4 bg-gray-50 flex gap-3">
          <button
            onClick={shareFortune}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-4 rounded-xl font-medium active:scale-95 transition-all duration-200 shadow-md"
          >
            <div className="flex items-center justify-center">
              <img src="/icons/share.svg" alt="공유" className="w-4 h-4 mr-1" />
              <span className="text-sm">공유하기</span>
            </div>
          </button>
          <button
            onClick={onReset}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-medium active:scale-95 transition-all duration-200 shadow-md"
          >
            <div className="flex items-center justify-center">
              <img src="/icons/refresh.svg" alt="다시보기" className="w-4 h-4 mr-1" />
              <span className="text-sm">다시 보기</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FortuneDisplay;