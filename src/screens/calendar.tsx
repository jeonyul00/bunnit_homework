import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, NativeSyntheticEvent, NativeScrollEvent, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { images } from '@src/assets';
import { DAYS, CENTER_INDEX, SCREEN_WIDTH } from '@src/constants/calendar';
import { getMonthByIndex, generateCalendar } from '@src/utils/calendarUtils';
import CalendarDay from '@src/components/calendar/calendarDay';
import { colors } from '@src/constants/colors';
import Container from '@src/components/common/container';

const Calendar = () => {
  const today = dayjs();
  const flatListRef = useRef<FlatList>(null);
  const [selectedDate, setSelectedDate] = useState(today.format('YYYY-MM-DD'));
  const [currentIndex, setCurrentIndex] = useState(CENTER_INDEX);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handlePrevMonth = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const handleNextMonth = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const renderItem = ({ index }: { index: number }) => {
    const month = getMonthByIndex(today, index, CENTER_INDEX);
    const days = generateCalendar(month);

    return (
      <View style={{ width: SCREEN_WIDTH }}>
        <View style={styles.calendarGrid}>
          {days.map(d => (
            <CalendarDay
              key={d.date.format('YYYY-MM-DD')}
              day={d.date}
              isCurrentMonth={d.isCurrentMonth}
              isSelected={d.date.format('YYYY-MM-DD') === selectedDate}
              isToday={d.date.isSame(today, 'day')}
              onSelect={setSelectedDate}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Image source={images.backArrow} style={{ width: 25, height: 25, tintColor: colors.blue }} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{getMonthByIndex(today, currentIndex, CENTER_INDEX).format('MMMM YYYY')}</Text>
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
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={Array.from({ length: 1000 }, (_, i) => i)}
        initialScrollIndex={CENTER_INDEX}
        getItemLayout={(_, index) => ({ length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index })}
        keyExtractor={item => String(item)}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Calendar;

export const styles = StyleSheet.create({
  container: { padding: 0, flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 20 },
  monthText: { fontSize: 20 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 },
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
