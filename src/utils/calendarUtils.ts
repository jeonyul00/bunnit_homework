import dayjs from 'dayjs';

/**
 * 월 계산 및 6주(42칸) 달력 데이터 생성 유틸리티
 * author: jeonyul
 */

export const getMonthByIndex = (today: dayjs.Dayjs, index: number, center: number) => {
  return today.startOf('month').add(index - center, 'month');
};

export const generateCalendar = (month: dayjs.Dayjs) => {
  const startDayOfWeek = month.day();
  const endOfMonth = month.daysInMonth();
  const days: Array<{ date: dayjs.Dayjs; isCurrentMonth: boolean }> = [];
  const prevMonth = month.subtract(1, 'month');
  const prevMonthDays = prevMonth.daysInMonth();

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({ date: prevMonth.date(prevMonthDays - i), isCurrentMonth: false });
  }

  for (let i = 1; i <= endOfMonth; i++) {
    days.push({ date: month.date(i), isCurrentMonth: true });
  }

  const nextMonth = month.add(1, 'month');
  const remaining = 42 - days.length;

  for (let i = 1; i <= remaining; i++) {
    days.push({ date: nextMonth.date(i), isCurrentMonth: false });
  }

  return days;
};
