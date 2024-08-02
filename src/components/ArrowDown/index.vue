<template>
  <p class="arrow-down" @click="clickHandle">
    <i :style="{'backgroundImage': `url(${iconArrow})`}" :class="{'down': isDown}"></i>
  </p>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import iconArrow from '../../assets/png/arrow_down@2x.png';

const emit = defineEmits<{
  (event: 'click', isDown: boolean): void
}>();
const isDown = ref(true);

function clickHandle() {
  isDown.value = !isDown.value;
  emit('click', isDown.value);
}
</script>

<style lang="less" scoped>
.arrow-down {
  width: 100%;
  height: 21px;
  line-height: 21px;
  text-align: center;

  i {
    display: inline-block;
    width: 16px;
    height: 16px;
    -o-background-size: 16px auto;
    background-size: 16px auto;
    background-repeat: no-repeat;
    background-position: center;
    transition-duration: .5s;
    cursor: pointer;
    
    &.down {
      transform: rotate(180deg);
    }
  }
}
</style>