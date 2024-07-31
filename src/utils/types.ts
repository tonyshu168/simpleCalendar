export type LunarDateInfoType = {
  Animal: string; // "龙"
  IDayCn: string; // "廿六"
  IMonthCn: string; // "六月"
  Term: string | null; // 大暑 null
  astro: string; // "狮子座"
  cDay: number; // 31;
  cMonth: number; // 7
  cYear: number; // 2024
  date: string; // "2024-7-31"
  festival: string | null; // 阳历节日: 儿童节  null
  gzDay: string;// "丙申"
  gzMonth: string; // "辛未"
  gzYear: string; // "甲辰"
  isLeap: boolean; // false
  isTerm: boolean; // false
  isToday: boolean; // true
  lDay: number; // 26
  lMonth: number; // 6
  lYear: number; // 2024
  lunarDate: string; // "2024-6-26"
  lunarFestival: string | null; //农历节日: 重阳节 null
  nWeek: number; // 3
  ncWeek: string; // "星期三"
}