import React, { useRef, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, NativeSyntheticEvent, NativeScrollEvent, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { images } from '@src/assets';
import { DAYS, CENTER_INDEX, SCREEN_WIDTH, MONTH_HEIGHT, WEEK_HEIGHT } from '@src/constants/calendar';
import { colors } from '@src/constants/colors';
import Container from '@src/components/common/container';
import { useCalendarState } from '@src/hooks/useCalendarState';
import CalendarRenderItem from '@src/components/calendar/calendarRenderItem';

const Calendar = () => {
  const DATA = Array.from({ length: 1000 }, (_, i) => i);
  const today = useMemo(() => dayjs(), []);
  const flatListRef = useRef<FlatList>(null);
  const { selectedDate, setSelectedDate, currentIndex, setCurrentIndex, calendarMode, setCalendarMode, targetMode, setTargetMode } =
    useCalendarState();
  const calendarHeight = useSharedValue(MONTH_HEIGHT);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (targetMode) {
      setCalendarMode(targetMode);
      requestAnimationFrame(() => {
        calendarHeight.value = withTiming(targetMode === 'week' ? WEEK_HEIGHT : MONTH_HEIGHT, { duration: 250, easing: Easing.linear });
        opacity.value = withTiming(1, { duration: 250, easing: Easing.linear });
      });
      setTargetMode(null);
    }
  }, [targetMode]);

  const animatedStyle = useAnimatedStyle(() => ({ height: calendarHeight.value, opacity: opacity.value }));

  const gesture = Gesture.Pan().onEnd(event => {
    'worklet';
    if (event.translationY < -50 && calendarMode === 'month') {
      opacity.value = withTiming(0, { duration: 250 }, () => {
        runOnJS(setTargetMode)('week');
      });
    } else if (event.translationY > 50 && calendarMode === 'week') {
      opacity.value = withTiming(0, { duration: 250 }, () => {
        runOnJS(setTargetMode)('month');
      });
    }
  });

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleMove = (dir: 'prev' | 'next') => {
    const newIndex = dir === 'prev' ? currentIndex - 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const currentLabel =
    calendarMode === 'month'
      ? today.add(currentIndex - CENTER_INDEX, 'month').format('MMMM YYYY')
      : `${today
          .startOf('week')
          .add(currentIndex - CENTER_INDEX, 'week')
          .format('MMM D')} - ${today
          .startOf('week')
          .add(currentIndex - CENTER_INDEX, 'week')
          .endOf('week')
          .format('MMM D')}`;

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMove('prev')}>
          <Image source={images.backArrow} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentLabel}</Text>
        <TouchableOpacity onPress={() => handleMove('next')}>
          <Image source={images.nextArrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {DAYS.map(day => (
          <Text key={day} style={[styles.dayLabel, day === 'Sun' && { color: colors.red }, day === 'Sat' && { color: colors.blue }]}>
            {day}
          </Text>
        ))}
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[animatedStyle]}>
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            data={DATA}
            initialScrollIndex={CENTER_INDEX}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            keyExtractor={item => String(item)}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            renderItem={({ index }) => (
              <CalendarRenderItem
                index={index}
                today={today}
                calendarMode={calendarMode}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          />
        </Animated.View>
      </GestureDetector>
    </Container>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 20 },
  arrow: { width: 25, height: 25, tintColor: colors.blue },
  monthText: { fontSize: 20 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 },
  dayLabel: { width: 32, textAlign: 'center', fontWeight: '500', color: colors.gray },
});
