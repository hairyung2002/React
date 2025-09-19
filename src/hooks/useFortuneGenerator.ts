import { useState, useCallback } from 'react';
import type { FortuneData, FortuneHistory } from '../types/fortune';

// 운세 데이터
const fortunes = [
  "오늘은 새로운 기회가 찾아올 것입니다. 용기를 내어 도전해보세요! 🌟",
  "주변 사람들과의 관계에서 따뜻한 소통이 이루어질 것입니다. 💕",
  "창의적인 아이디어가 떠오를 수 있는 날입니다. 메모를 준비하세요! 💡",
  "금전적인 면에서 작은 행운이 따를 것입니다. 현명한 선택을 하세요. 💰",
  "건강에 신경 쓰며 규칙적인 생활을 하면 좋은 결과가 있을 것입니다. 🏃‍♂️",
  "학업이나 업무에서 집중력이 높아져 좋은 성과를 얻을 수 있습니다. 📚",
  "여행이나 새로운 장소에서 특별한 경험을 할 수 있는 날입니다. ✈️",
  "가족과의 시간을 소중히 여기면 마음의 평화를 찾을 수 있습니다. 👨‍👩‍👧‍👦",
  "예술적 감성이 풍부해져 아름다운 것들을 발견할 수 있습니다. 🎨",
  "인내심을 가지고 기다리면 원하는 결과를 얻을 수 있을 것입니다. ⏰"
];

const luckyItems = {
  colors: ["초록색", "연두색", "에메랄드", "민트색", "파란색", "하얀색", "금색", "은색"],
  numbers: ["4", "7", "13", "21", "33", "44", "77", "88"],
  foods: ["네잎클로버차", "녹차", "샐러드", "브로콜리", "시금치", "아보카도", "키위", "녹색 스무디"],
  places: ["정원", "공원", "자연휴양림", "식물원", "카페", "도서관", "명상공간", "클로버밭"],
  activities: ["자연산책", "정원가꾸기", "명상하기", "독서하기", "일기쓰기", "감사표현", "긍정적 생각", "행운빌기"],
  items: ["네잎클로버", "행운의 부적", "초록색 액세서리", "식물", "향초", "수정", "행운의 반지", "클로버 장식품"],
  directions: ["동쪽", "남동쪽", "남쪽", "서남쪽", "서쪽", "북서쪽", "북쪽", "북동쪽"],
  times: ["오전 7시", "오전 10시", "오후 1시", "오후 4시", "오후 6시", "오후 8시", "오후 10시", "자정"]
};

export const useFortuneGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<FortuneData | null>(null);
  const [history, setHistory] = useState<FortuneHistory[]>(() => {
    const saved = localStorage.getItem('fortuneHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // 해시 함수 (이름과 생년월일을 기반으로 시드 생성)
  const generateSeed = useCallback((name: string, birthdate: string, date: string) => {
    const str = name + birthdate + date;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit 정수로 변환
    }
    return Math.abs(hash);
  }, []);

  // 시드를 기반으로 한 의사랜덤 생성기
  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  // 운세 생성 함수
  const generateFortune = useCallback(async (name: string, birthdate: string) => {
    if (!name.trim() || !birthdate) {
      throw new Error('이름과 생년월일을 모두 입력해주세요.');
    }

    setIsGenerating(true);

    // 애니메이션을 위한 지연
    await new Promise(resolve => setTimeout(resolve, 1500));

    const today = new Date().toISOString().split('T')[0];
    const seed = generateSeed(name.trim(), birthdate, today);

    // 각 항목을 시드 기반으로 선택
    let currentSeed = seed;
    const getRandomItem = (array: string[]) => {
      const index = Math.floor(seededRandom(currentSeed++) * array.length);
      return array[index];
    };

    const fortuneIndex = Math.floor(seededRandom(currentSeed++) * fortunes.length);
    const score = Math.floor(seededRandom(currentSeed++) * 40) + 60; // 60-99 사이

    const fortuneData: FortuneData = {
      fortune: fortunes[fortuneIndex],
      score,
      luckyItems: {
        color: getRandomItem(luckyItems.colors),
        number: getRandomItem(luckyItems.numbers),
        food: getRandomItem(luckyItems.foods),
        place: getRandomItem(luckyItems.places),
        activity: getRandomItem(luckyItems.activities),
        item: getRandomItem(luckyItems.items),
        direction: getRandomItem(luckyItems.directions),
        time: getRandomItem(luckyItems.times)
      },
      date: today
    };

    // 히스토리에 추가
    const historyItem: FortuneHistory = {
      ...fortuneData,
      name: name.trim(),
      birthdate
    };

    const newHistory = [historyItem, ...history.filter(h => 
      !(h.name === name.trim() && h.birthdate === birthdate && h.date === today)
    )].slice(0, 10); // 최대 10개 저장

    setHistory(newHistory);
    localStorage.setItem('fortuneHistory', JSON.stringify(newHistory));
    
    setCurrentFortune(fortuneData);
    setIsGenerating(false);

    return fortuneData;
  }, [generateSeed, seededRandom, history]);

  // 히스토리 클리어
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('fortuneHistory');
  }, []);

  // 운세 초기화
  const resetFortune = useCallback(() => {
    setCurrentFortune(null);
  }, []);

  return {
    isGenerating,
    currentFortune,
    history,
    generateFortune,
    clearHistory,
    resetFortune,
    setCurrentFortune
  };
};