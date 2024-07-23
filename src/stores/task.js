// Utilities
import { defineStore } from "pinia";
import { useAlertStore } from "./alert";

const alertStore = useAlertStore();

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [
      {
        title: "Aprender a desenvolver em VUE",
        description: "Aprendendo a desenvolver em Vue pela Udemy",
      },
    ],
    titleTaskCreate: "",
    isVisibleDialogEdit: false,
    selectedTaskIndex: 0,
    selectEditTask: {},
    isVisibleDialogDelete: false,
  }),
  actions: {
    addTask() {
      if(this.titleTaskCreate.length < 5)
        return;

      this.tasks.push({
        title: this.titleTaskCreate,
        done: false,
        // description: task.value.description,
      });
      this.titleTaskCreate = "";
      this.updateTasks();
      alertStore.notifySuccess("Created", "Task created success!");
    },
    taskDone(index){
      this.tasks[index].done = !this.tasks[index].done;
      this.updateTasks();
    },
    editTask() {
      this.tasks[this.selectedTaskIndex] = { ...this.selectEditTask };
      this.resetEdit();
      this.updateTasks();
      alertStore.notifyInfo("Updated", "Task updated success!");
    },
    deleteTask() {
      this.tasks.splice(this.selectedTaskIndex, 1);
      this.resetDelete();
      this.updateTasks();
      alertStore.notifyWarning("Deleted", "Task deleted success!");
    },
    showDialogEdit(index) {
      this.isVisibleDialogEdit = !this.isVisibleDialogEdit;
      this.selectEditTask = { ...this.tasks[index] };
      this.selectedTaskIndex = index;
    },
    resetEdit() {
      this.isVisibleDialogEdit = false;
      this.selectEditTask = {};
      this.selectedTaskIndex = 0;
    },
    showDialogDelete(index) {
      this.isVisibleDialogDelete = !this.isVisibleDialogDelete;
      this.selectedTaskIndex = index;
    },
    getTaskToDeleteTitle() {
      const task = this.tasks.find(
        (value, index) => index == this.selectedTaskIndex
      );

      return task?.title;
    },
    resetDelete() {
      this.isVisibleDialogDelete = false;
      this.selectedTaskIndex = 0;
    },
    updateTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    getTasks() {
      let items = localStorage.getItem("tasks");
      if (items) this.tasks = JSON.parse(items);
    },
  },
});
