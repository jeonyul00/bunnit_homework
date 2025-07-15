import React from 'react';
import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { SCREEN_WIDTH, CENTER_INDEX } from '@src/constants/calendar';
import { generateCalendar } from '@src/utils/calendarUtils';
import CalendarDay from './calendarDay';

const generateWeek = (startDate: dayjs.Dayjs) => {
  const startOfWeek = startDate.startOf('week');
  return Array.from({ length: 7 }).map((_, i) => ({
    date: startOfWeek.add(i, 'day'),
    isCurrentMonth: true,
  }));
};

const CalendarRenderItem = ({
  index,
  today,
  calendarMode,
  selectedDate,
  setSelectedDate,
}: {
  index: number;
  today: dayjs.Dayjs;
  calendarMode: 'month' | 'week';
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (d: dayjs.Dayjs) => void;
}) => {
  const baseDate = today.add(index - CENTER_INDEX, 'month');
  const days = calendarMode === 'month' ? generateCalendar(baseDate) : generateWeek(today.startOf('week').add(index - CENTER_INDEX, 'week'));

  return (
    <View style={{ width: SCREEN_WIDTH }}>
      <View style={styles.calendarGrid}>
        {days.map(d => (
          <CalendarDay
            key={d.date.format('YYYY-MM-DD')}
            day={d.date}
            isCurrentMonth={d.isCurrentMonth}
            isSelected={selectedDate?.isSame(d.date, 'day') ?? false}
            isToday={d.date.isSame(today, 'day')}
            onSelect={dateStr => setSelectedDate(dayjs(dateStr))}
          />
        ))}
      </View>
    </View>
  );
};

export default CalendarRenderItem;

const styles = StyleSheet.create({
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
});
