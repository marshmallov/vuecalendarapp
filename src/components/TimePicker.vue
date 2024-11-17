<template>
    <div class="time-picker">
      <h2>Select Time</h2>
      <select v-model="selectedTime" @change="updateTime" class="time-select">
        <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'TimePicker',
    props: {
      modelValue: {
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const selectedTime = ref(props.modelValue);
  
      // Generate time options in 30-minute intervals
      const timeOptions = Array.from({ length: 48 }, (_, i) => {
        const hours = String(Math.floor(i / 2)).padStart(2, '0');
        const minutes = i % 2 === 0 ? '00' : '30';
        return `${hours}:${minutes}`;
      });
  
      // Update the selected time when the user picks an option
      const updateTime = () => {
        emit('update:modelValue', selectedTime.value);
      };
  
      return {
        selectedTime,
        timeOptions,
        updateTime
      };
    }
  });
  </script>
  
  <style scoped>
  .time-picker {
    z-index: 10;
    max-width: 250px;
    margin: 20px auto;
    text-align: center;
  }
  
  .time-select {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
  }
  </style>