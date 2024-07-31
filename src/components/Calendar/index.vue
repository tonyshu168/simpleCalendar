<template>
  <section class="calendar-container">
  <div class="calendar">
    <!-- 年份 月份 -->
    <div class="months">
      <div class="left-container">
        <div class="day">{{ formatDay(curDayMsg?.cDay) }}</div>
        <div class="year-month">{{ currentYear }}年{{ currentMonth }}月</div>
      </div>
      <div class="toggle-month">
        <span class="lt" @click="preMonth()">&lt;</span>
        <span class="ct" @click="initData()">今</span>
        <span class="rt" @click="nextMonth()">&gt;</span>
      </div>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li v-for="item in (fromsun ? weekDaysFromSun : weekDays)" :key="item">{{item}}</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li
        v-for="dayobject in (isShowFull ? days : daysForWeek)"
        :key=dayobject.lunarDate
        :class="{'active': dayobject.isToday, 'selected': curDayMsg.date === dayobject.date && !dayobject.isToday}"
        @click="getClickDay(dayobject)"
      >
        <span
          ref="cday"
          class="cday"
          :class="{'other-month': dayobject.cMonth!= currentMonth}"
        >{{ showToday(dayobject) }}</span>

        <!-- 优先展示节日，其次，如果农历初一，展示当前农历月份，否则展示农历日期 -->
        <div
          v-if="showlunar"
          class="idaycn"
        >{{ showLunar(dayobject) }}</div>
        <slot></slot>
      </li>
    </ul>
      <ArrowDown @click="triggleFull"></ArrowDown>
  </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "SimpleCalendar"
}
</script>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits, onMounted } from 'vue';
import ArrowDown from '../ArrowDown/index.vue';
import calendar from '../../utils/calendarDate';
import { formatDate, showLunar, showToday, formatDay } from '../../utils/index';
import { PropsType } from './types';
import { LunarDateInfoType } from '../../utils/types';

const props = withDefaults(defineProps<PropsType>(), {
  showlunar: false,
  lines: 5,
  fromsun: false,
});
const currentDay = ref(1);
const currentMonth = ref(1);
const currentYear = ref(2024);
const currentWeek = ref(1);
const days = ref<Array<LunarDateInfoType>>([]);
const curDayMsg = ref<any>();
const weekDays = ref(['一', '二', '三', '四', '五', '六', '日']);
const weekDaysFromSun = ref(['日', '一', '二', '三', '四', '五', '六']);
const isShowFull = ref(1); // 是否为全显示，默认为全部显示
const daysForWeek = ref<Array<LunarDateInfoType>>([]);
const emit = defineEmits<{
  (event: 'dayMsg', curDayMsg: Array<any>): void
}>();

function initData(cur: string = '') {
  let now, curMonthStartDay, curMonthStartWeek, curPageStartDay
  if (cur) {
    now = new Date(cur)
  } else {
    now = new Date()
  }
  currentYear.value = now.getFullYear()
  currentMonth.value = now.getMonth() + 1
  currentDay.value = now.getDay()
  // 获取当前月第一天
  curMonthStartDay = new Date(
    formatDate(now.getFullYear(), now.getMonth() + 1, 1)
  )
  // 当前月第一天是周几
  curMonthStartWeek = curMonthStartDay.getDay() // 1,2,3,4,5,6,0
  if (curMonthStartWeek == 0) {
    curMonthStartWeek = 7
  }
  // 日历当前页开始日期
  curPageStartDay =
    curMonthStartDay -
    (props.fromsun ? curMonthStartWeek : curMonthStartWeek - 1) *
      24 *
      60 *
      60 *
      1000;
  // 循环获取日历当前页所有日期（7*this.lines \5/6\）
  days.value = [];

  for (let i = 0; i < props.lines * 7; i++) {
    let year = new Date(
      curPageStartDay + i * 24 * 60 * 60 * 1000
    ).getFullYear()
    let month =
      new Date(curPageStartDay + i * 24 * 60 * 60 * 1000).getMonth() + 1;
    let day = new Date(curPageStartDay + i * 24 * 60 * 60 * 1000).getDate();
    days.value.push(calendar.solar2lunar(year, month, day));
  }

  if (!cur) {
    curDayMsg.value = calendar.solar2lunar(
      currentYear.value,
      currentMonth.value,
      now.getDate()
    );

    emit('dayMsg', curDayMsg.value)
  }
}

function preMonth() {
  currentMonth.value = currentMonth.value - 1;

  if (currentMonth.value === 0) {
    currentMonth.value = 12;
    currentYear.value = currentYear.value - 1;
  }
  initData(formatDate(currentYear.value, currentMonth.value, 1));

  if (!isShowFull.value) {
    getDaysForWeek();
  }
}

// 下一月
function nextMonth() {
  currentMonth.value = currentMonth.value + 1;

  if (currentMonth.value === 13) {
    currentMonth.value = 1;
    currentYear.value = currentYear.value + 1;
  }

  initData(formatDate(currentYear.value, currentMonth.value, 1));
  if (!isShowFull.value) {
    getDaysForWeek();
  }
}

// 获取一周的日期
function getDaysForWeek() {
  let idxForSelected = days.value.findIndex(dateInfo => {
    return dateInfo.date === curDayMsg.value.date;
  });
  idxForSelected = idxForSelected === -1 ? 0 : idxForSelected;

  const currentRow = Math.floor(idxForSelected / 7);
  const startIdx = currentRow * 7;
  const weekDays: Array<LunarDateInfoType> = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(days.value[startIdx + i]);
  }
console.log(weekDays)
  daysForWeek.value = weekDays;
}

// 点击日期
function getClickDay(el: any) {
  curDayMsg.value = el;

  emit('dayMsg', el)
}

// 日历面板展开或收起
function triggleFull(isDown: boolean) {
  if (!isDown) {
    getDaysForWeek();
  }
  isShowFull.value = Number(isDown);  
}

onMounted(() => {
  initData();
})
</script>

<style lang="less" scoped>
ul li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.calendar-container {
.calendar {
  font-size: 0.75rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 5px;
  overflow: hidden;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  .months {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3%;
    margin-bottom: 3%;
    padding: 0 6%;

    .left-container {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      flex-wrap: nowrap;

      .day {
        margin-right: 3%;
        color: #666;
        font-size: 2rem;
        font-weight: 500;

      }
    }
  }
  .months .year-month {
    font-size: 0.875rem;
    flex-shrink: 0;
  }
  .months .toggle-month {
    width: 23%;
    text-align: center;
    border: 1px solid #edeeee;
    cursor: pointer;
  }
  .months .toggle-month .lt,
  .months .toggle-month .rt {
    display: inline-block;
    width: 24%;
    color: #bebdbe;
    text-align: center;
  }
  .months .toggle-month .ct {
    display: inline-block;
    width: 48%;
    text-align: center;
    border-right: 1px solid #edeeee;
    border-left: 1px solid #edeeee;
    color: #000;
  }
  .weekdays {
    padding: 0;
    display: flex;
    color: #999;
    justify-content: space-around;
  }
  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }
  .days {
    margin: 0;
    padding: 1% 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .vishidden {
    visibility: hidden;
  }
  .days li {
    display: inline-block;
    width: 14.2%;
    margin-bottom: 5%;
    margin-top: 2%;
    text-align: center;
    color: #000;
    cursor: pointer;

    &.active {
      border: 1px solid #5cc18d;
      border-radius: 50%;
    }
    &.selected {
      border-radius: 50%;
      border: 1px solid #1890ff;
      background: #e1e1e1;
    }

    .active {
      display: inline-block;
      width: 1.5625rem;
      height: 1.5625rem;
      line-height: 1.5625rem;
      text-align: center;
      border-radius: 50%;
      background: #5cc18d !important;
      color: #fff;
    }
  }
  .days li .other-month {
    color: gainsboro;
  }
  .days li .cday {
    display: inline-block;
    width: 1.5625rem;
    height: 1.5625rem;
    line-height: 1.5625rem;
    text-align: center;
  }
  .days li:hover {
    border-radius: 50%;
    background: #e1e1e1;
    color: #fff;
  }
  .recday {
    display: inline-block;
    width: 1.5625rem;
    height: 1.5625rem;
    line-height: 1.5625rem;
    text-align: center;
    border-radius: 50%;
    background: #e1e1e1;
    color: #fff;
  }
  .idaycn {
    position: relative;
    top: -2px;
    margin-top: 6%;
    color: #999;
  }
}
}
</style>