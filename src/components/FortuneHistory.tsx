import type { FortuneHistory } from '../types/fortune';

interface FortuneHistoryProps {
  history: FortuneHistory[];
  onClearHistory: () => void;
}

const FortuneHistoryComponent: React.FC<FortuneHistoryProps> = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-6 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-green-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src="/icons/history-book.svg" alt="히스토리" className="w-5 h-5 mr-2" />
            <h3 className="text-base font-bold text-gray-800">운세 히스토리</h3>
          </div>
          <button
            onClick={onClearHistory}
            className="text-xs text-gray-500 hover:text-red-500 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-red-50"
          >
            전체 삭제
          </button>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(item.score)}`}>
                  {item.score}점
                </div>
              </div>
              <p className="text-gray-700 text-xs line-clamp-2 leading-relaxed">
                {item.fortune}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FortuneHistoryComponent;