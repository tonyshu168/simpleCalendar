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
