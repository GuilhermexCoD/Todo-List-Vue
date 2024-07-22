<template>
  <div>
    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item 
        v-for="(task, index) in props.tasks" 
        :key="index" 
        :value="task.title"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
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
            @click="toggleDialogEdit('Edit Task', index)"
          >
            Edit
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="2">
          <v-list-item-title
            @click="toggleDialogDelete('Delete Task', index)"
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
      :show="showDialogEdit"
      :title="dialogueTitle"
      :task="selectedTask"
      @success="editTask"
      @cancel="resetEdit"
    >
    </DialogEdit>

    <DialogGeneric 
      :show="showDialogDelete"
      :title="dialogueTitle"
      :description="`Are you sure you want to delete task {selectedTask}`"
      cancelButtonText="Cancel"
      successButtonText="Delete"
      @success="deleteTask"
      @cancel="resetDelete"
    >
    </DialogGeneric>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  tasks: Object
})

const dialogueTitle = ref();
const selectedTask = ref();
const selectedTaskIndex = ref(0);

//#region  Edit
const showDialogEdit = ref(false);
const toggleDialogEdit = (title, index) => {
  showDialogEdit.value = !showDialogEdit.value;
  dialogueTitle.value = title;
  selectedTask.value = { ...props.tasks[index] };
  selectedTaskIndex.value = index;
};

const resetEdit = () => {
  showDialogEdit.value = false;
  selectedTask.value = {};
  selectedTaskIndex.value = 0;
}

const editTask = () => {
  props.tasks[selectedTaskIndex.value] = {...selectedTask.value};
  
  resetEdit();
}

//#endregion

//#region  Delete

const showDialogDelete = ref(false);

const toggleDialogDelete = (title, index) => {
  showDialogDelete.value = !showDialogDelete.value;
  dialogueTitle.value = title;
  selectedTask.value = { ...props.tasks[index] };
  selectedTaskIndex.value = index;
};

const resetDelete = () => {
  showDialogDelete.value = false;
  selectedTask.value = {};
  selectedTaskIndex.value = 0;
}

const deleteTask = () => {
  props.tasks.splice(selectedTaskIndex.value, 1);
  
  resetDelete();
}

//#endregion
</script>