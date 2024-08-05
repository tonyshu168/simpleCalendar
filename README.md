# simpleCalendar
Simple calendar with lunar calendar, This is a calendar with the lunar calendar and traditional Chinese festivals, which can be reduced to show only the current row of dates, and show reminders of events on the corresponding dates.    

* [Demo](https://tonyshu168.github.io/simpleCalender/examples/index.html)
* [Getting started](#getting-started)
* [Documentation](#documentation)
* [Contribute](#contribute)
* [Licence](#licence)

## Getting started

### Add the library
```html
<!-- With CDN -->
<script src="https://unpkg.com/simpleCalender/dist/simplecalendar-1.0.0.js"></script>
<!-- Locally -->
<script src="dist/simplecalendar-1.0.0.js"></script>
```
### Installation
```bash
npm install simplecalendar --save
```

### Usage
```vue
<template>
  <section>
  <Calendar showlunar :fromsun="true" @dayMsg="getDayMsg" ref="calendarRef">
    <div>dsssssssssddfwdfasdff</div>
  </Calendar>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Calendar from './components/Calendar/index.vue';
import { ItemsType } from './components/Calendar/types';

const calendarRef = ref<typeof Calendar>();
const items = ref<Array<ItemsType>>([
  {
    date: '2024-7-28',
    items: [
      {time: '00:00 - 00:15', itemName: '会议通知', ItemType: 'meetingNotice', itemDescription: 'OA项目晨会'}
    ]
  },
  {
    date: '2024-8-1',
    items: [
      {time: '00:00 - 00:15', itemName: '会议通知', ItemType: 'meetingNotice', itemDescription: 'OA项目晨会'}
    ]
  }
]);

function getDayMsg(day: any) {
  console.log(day);
  console.log(calendarRef.value);
}

onMounted(() => {
  calendarRef.value?.updateItems(items.value);
})
</script>

<style lang="less" scoped>
section {
  width: 320px;
  margin: 0 auto;
}
</style>

```

## Documentation

### Attribute

#### showlunar
The showLunar: Whether or not to display the lunar calendar.

#### fromsun
The fromsum: Whether it starts on Sunday or not.

#### dayMsg
The dayMsg: Custom events，Click Date callback，returns all information for the current date, including lunar calendar information.

#### perMonthClick
The perMonthClick: Custom events, callback events from the previous month.

#### nextMonthClick
The nextMonthClick: Custom events, callback events from the next month.

#### todayClick
The todayClick: Custom events, callback events from the today.

#### Component export values
```
1. Export days: All dates of the calendar are currently displayed.
2. Export items: Items corresponding to all dates displayed in the current month.
3. Export updateItems: This is how to update the items corresponding to all dates displayed in the current month.
```

## Support

Vue3 is supported.
For bugs and suggestions, [open an issue here](https://github.com/tonyshu168/simpleCalendar/issues).

## Contribute

Feel free to make a PR! Once cloned, use these commands:

```
npm install # or yarn install
npm run dev
npm run build # before commit 
```

## Licence

MIT
