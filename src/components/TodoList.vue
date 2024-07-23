<template>
  <v-text-field
    clearable
    label="Add Task"
    :rules="rules"
    @keyup.enter="taskStore.addTask"
    v-model="taskStore.titleTaskCreate"
  ></v-text-field>

  <ListTasks></ListTasks>
</template>

<script setup>
import { useTaskStore } from "@/stores/task";
import { onMounted } from "vue";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.getTasks();
})

const rules = [
  value => {
    if (!value || value.length >= 5) return true

    return 'You must enter a task title with more then 5 characters.'
  },
];

</script>