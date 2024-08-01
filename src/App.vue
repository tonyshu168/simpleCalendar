<template>
  <section>
  <Calendar showlunar :fromsun="true" @dayMsg="getDayMsg" >
    <div>dsssssssssddfwdfasdff</div>
  </Calendar>
  </section>
</template>

<script setup lang="ts">
import Calendar from './components/Calendar/index.vue';

function getDayMsg(day: any) {
  console.log(day);
}
</script>

<style lang="less" scoped>
section {
  width: 320px;
  margin: 0 auto;
}
</style>
