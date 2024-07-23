<template>
  <div>
    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item 
        v-for="(task, index) in taskStore.tasks" 
        :key="index" 
        :value="task.title"
        @click="taskStore.taskDone(index)"
      >
        <template v-slot:prepend="{ }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="task.done"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>{{ task.title }}</v-list-item-title>
        
        <template v-slot:append>
          <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="grey-lighten-1"
          icon="mdi-dots-vertical"
          variant="text"
          v-bind="props"
        ></v-btn>
      </template>
      <v-list>
        <v-list-item value="1">
          <v-list-item-title 
            @click="taskStore.showDialogEdit(index)"
          >
            Edit
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="2">
          <v-list-item-title
            @click="taskStore.showDialogDelete(index)"
          >
            Delete
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
        </template>

        <v-list-item-subtitle>
          {{ task.description }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <DialogEdit 
      :show="taskStore.isVisibleDialogEdit"
      title="Edit Task"
      :task="taskStore.selectEditTask"
      :cancelButton="cancelButtonEdit"
      :successButton="successButtonEdit"
      @success="taskStore.editTask"
      @cancel="taskStore.resetEdit"
    >
    </DialogEdit>

    <DialogGeneric 
      :show="taskStore.isVisibleDialogDelete"
      title="Delete Task"
      :description="`Are you sure you want to delete task '${taskStore.getTaskToDeleteTitle()}''`"
      :cancelButton="cancelButtonDelete"
      :successButton="successButtonDelete"
      @success="taskStore.deleteTask"
      @cancel="taskStore.resetDelete"
    >
    </DialogGeneric>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const cancelButtonDelete = ref({
  text: "Cancel",
  color: "red-darken-1",
  variant: "elevated"
});

const successButtonDelete = ref({
  text: "Delete",
  color: "red-darken-1",
  variant: "outlined"
});

const cancelButtonEdit = ref({
  text: "Cancel",
  color: "green-darken-1",
  variant: "outlined"
});

const successButtonEdit = ref({
  text: "Edit",
  color: "green-darken-1",
  variant: "elevated"
});
</script>