import { CENTER_INDEX } from '@src/constants/calendar';
import dayjs from 'dayjs';
import { useState } from 'react';

/**
 * 달력 컴포넌트의 상태를 관리하는 커스텀 훅
 * 선택된 날짜
 * 현재 페이지 인덱스 (FlatList용)
 * 달력 모드 (month | week)
 * 전환 대상 모드를 관리합니다.
 * author: jeonyul
 */
export const useCalendarState = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [currentIndex, setCurrentIndex] = useState(CENTER_INDEX);
  const [calendarMode, setCalendarMode] = useState<'month' | 'week'>('month');
  const [targetMode, setTargetMode] = useState<'month' | 'week' | null>(null);

  return { selectedDate, setSelectedDate, currentIndex, setCurrentIndex, calendarMode, setCalendarMode, targetMode, setTargetMode };
};
