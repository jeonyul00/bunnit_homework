import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@src/constants/colors';
import dayjs from 'dayjs';

type Props = {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelect: (dateStr: string) => void;
};

const CalendarDay = ({ day, isCurrentMonth, isSelected, isToday, onSelect }: Props) => {
  return (
    <Pressable
      key={day.format('YYYY-MM-DD')}
      style={[styles.dayContainer, !isCurrentMonth && styles.notCurrentMonth]}
      onPress={() => {
        if (isCurrentMonth) onSelect(day.format('YYYY-MM-DD'));
      }}
    >
      <View style={[styles.dayCircle, isToday && styles.todayCircle, isSelected && !isToday && styles.selectedCircle]}>
        <Text
          style={[
            styles.dayText,
            day.day() === 0 && { color: colors.red },
            day.day() === 6 && { color: colors.blue },
            (isToday || isSelected) && styles.boldText,
            isSelected && !isToday && styles.selectedText,
          ]}
        >
          {day.date()}
        </Text>
      </View>
    </Pressable>
  );
};

export default CalendarDay;

export const styles = StyleSheet.create({
  container: { padding: 0, flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 20 },
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
