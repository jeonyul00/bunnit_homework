import { CENTER_INDEX } from '@src/constants/calendar';
import dayjs from 'dayjs';
import { useState } from 'react';

export const useCalendarState = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [currentIndex, setCurrentIndex] = useState(CENTER_INDEX);
  const [calendarMode, setCalendarMode] = useState<'month' | 'week'>('month');
  const [targetMode, setTargetMode] = useState<'month' | 'week' | null>(null);

  return { selectedDate, setSelectedDate, currentIndex, setCurrentIndex, calendarMode, setCalendarMode, targetMode, setTargetMode };
};
