<template>
  <v-text-field
    clearable
    label="Add Task"
    @keyup.enter="addTask"
    v-model="task.title"
  ></v-text-field>

  <ListTasks :tasks="tasks"></ListTasks>
</template>

<script setup>
import ListTasks from "@/components/ListTasks.vue";

const tasks = ref([
  {
    title: "Aprender a desenvolver em VUE",
    description: "Aprendendo a desenvolver em Vue pela Udemy",
  },
]);

const task = ref({
  title: "",
  description: "",
});

const addTask = () => {
  tasks.value.push(
    {
      title: task.value.title,
      description: task.value.description,
    }
  );
  task.value = {
    title: "",
    description: "",
  }
}

</script>