import { useState } from 'react';
import type { FortuneData } from '../types/fortune';

interface FortuneInputProps {
  onGenerateFortune: (name: string, birthdate: string) => Promise<FortuneData>;
  isGenerating: boolean;
}

const FortuneInput: React.FC<FortuneInputProps> = ({ onGenerateFortune, isGenerating }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (!birthdate) {
      setError('생년월일을 입력해주세요.');
      return;
    }

    try {
      await onGenerateFortune(name, birthdate);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
            <img src="/icons/four-leaf-clover.svg" alt="네잎클로버" className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">동국대 행운의 운세</h1>
          <p className="text-sm text-gray-600">행운의 네잎클로버와 함께하는 운세!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors duration-200 bg-green-50/30 text-base"
              placeholder="이름을 입력하세요"
              disabled={isGenerating}
            />
          </div>

          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
              생년월일
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors duration-200 bg-green-50/30 text-base"
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 transform text-base ${
              isGenerating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-95 shadow-lg'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                운세를 보는 중...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <img src="/icons/star.svg" alt="별" className="w-5 h-5 mr-2" />
                오늘의 운세 보기
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FortuneInput;