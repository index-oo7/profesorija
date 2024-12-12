<!-- poruke -->


<template>
    <div v-if="message" :class="messageClass" class="message">
      {{ message }}
      <button @click="clearMessage" class="close-btn">X</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, computed } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['success', 'error'].includes(value);
      }
    },
    content: {
      type: String,
      required: true
    }
  });
  
  const message = ref(props.content);
  
  const messageClass = computed(() => {
    return props.type === 'success' ? 'success-message' : 'error-message';
  });
  
  const clearMessage = () => {
    message.value = '';
  };
  </script>
  
  <style scoped>
  .message {
    padding: 15px;
    border-radius: 5px;
    margin: 10px;
    position: relative;
  }
  .success-message {
    background-color: #28a745;
    color: white;
  }
  .error-message {
    background-color: #dc3545;
    color: white;
  }
  .close-btn {
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>
  