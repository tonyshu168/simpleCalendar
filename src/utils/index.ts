import { LunarDateInfoType } from './types';
import { ItemsType } from '../components/Calendar/types';

export function formatDate(year: number, month: number, day: number) {
  let tempMonth = '' + month;
  let tempDay = '' + day;

  if (month < 10) tempMonth = '0' + month;
  if (day < 10) tempDay = '0' + day;

  return `${year}-${tempMonth}-${tempDay}`;
}

export function showLunar(dateInfo: LunarDateInfoType): string {
  let lunar = dateInfo.IDayCn;
  
  if (dateInfo.festival) {
    // 如果有阳历节
    lunar = dateInfo.festival;
  }
  else if (dateInfo.lunarFestival) {
    // 农历节
    lunar = dateInfo.lunarFestival;
  }
  else if (dateInfo.Term) {
    // 节气
    lunar = dateInfo.Term;
  }
  else if (dateInfo.IDayCn === '初一') {
    // 如果为初一时，显示月份
    lunar = dateInfo.IMonthCn;
  }

  return lunar;
}

export function showToday(dateInfo: LunarDateInfoType): string {
  return dateInfo.isToday ? '今' : String(dateInfo.cDay);

}

export function formatDay(day: number) {
  return day < 10 ? `0${day}` : String(day);
}

export function hasItems(date: string, items: Array<ItemsType>) {
  let hasItems = 0;
  const item = items.find(item => item.date === date);

  if (item && item.items.length) {
    hasItems = 1;
  }

  return hasItems;
}