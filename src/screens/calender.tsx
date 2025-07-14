import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import dayjs from 'dayjs';
import Container from '@src/components/container';
import { images } from '@src/assets';
import { colors } from '@src/constants/colors';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.startOf('month'));
  const [selectedDate, setSelectedDate] = useState<string>(today.format('YYYY-MM-DD'));

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const generateCalendar = () => {
    const startDayOfWeek = currentMonth.day();
    const endOfMonth = currentMonth.daysInMonth();
    const days: Array<{ date: dayjs.Dayjs; isCurrentMonth: boolean }> = [];
    const prevMonth = currentMonth.subtract(1, 'month');
    const prevMonthDays = prevMonth.daysInMonth();

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({ date: prevMonth.date(prevMonthDays - i), isCurrentMonth: false });
    }

    for (let i = 1; i <= endOfMonth; i++) {
      days.push({ date: currentMonth.date(i), isCurrentMonth: true });
    }

    const nextMonth = currentMonth.add(1, 'month');
    const remaining = 42 - days.length;

    for (let i = 1; i <= remaining; i++) {
      days.push({ date: nextMonth.date(i), isCurrentMonth: false });
    }

    return days;
  };

  const days = generateCalendar();

  const renderDay = (day: dayjs.Dayjs, isCurrentMonth: boolean) => {
    const isSelected = day.format('YYYY-MM-DD') === selectedDate;
    const isToday = day.isSame(today, 'day');

    return (
      <TouchableOpacity
        key={day.format('YYYY-MM-DD')}
        style={[styles.dayContainer, !isCurrentMonth && styles.notCurrentMonth]}
        onPress={() => {
          if (isCurrentMonth) setSelectedDate(day.format('YYYY-MM-DD'));
        }}
      >
        <View style={[styles.dayCircle, isToday && styles.todayCircle, isSelected && !isToday && styles.selectedCircle]}>
          <Text
            style={[
              styles.dayText,
              day.day() === 0 && { color: 'red' },
              day.day() === 6 && { color: 'blue' },
              (isToday || isSelected) && styles.boldText,
              isSelected && !isToday && styles.selectedText,
            ]}
          >
            {day.date()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Image source={images.backArrow} style={{ width: 25, height: 25, tintColor: colors.blue }} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Image source={images.nextArrow} style={{ width: 25, height: 25, tintColor: colors.blue }} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {DAYS.map(day => (
          <Text key={day} style={[styles.dayLabel, day === 'Sun' && { color: colors.red }, day === 'Sat' && { color: colors.blue }]}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>{days.map(d => renderDay(d.date, d.isCurrentMonth))}</View>
    </Container>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 },
  monthText: { fontSize: 20 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 },
  dayLabel: { width: 32, textAlign: 'center', fontWeight: '500', color: colors.gray },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayContainer: { width: `${100 / 7}%`, alignItems: 'center', marginVertical: 5 },
  dayText: { textAlign: 'center' },
  notCurrentMonth: { opacity: 0.3 },
  dayCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  todayCircle: { borderWidth: 1, borderColor: colors.blue },
  selectedCircle: { backgroundColor: colors.blue, borderRadius: 20 },
  selectedText: { color: colors.white },
  boldText: { fontWeight: 'bold' },
});
