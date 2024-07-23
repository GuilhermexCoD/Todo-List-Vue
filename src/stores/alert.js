import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    showAlert: false,
    title: String,
    text: String,
    type: String,
  }),
  actions:{
    notifyAlert(title, text, type, timeoutSeconds){
      this.title = title ?? "Undefined Title";
      this.text = text ?? "Undefined Alert";
      this.type = type ?? "Error";
      timeoutSeconds = timeoutSeconds ?? 2.5;

      this.showAlert = true;
      setTimeout(()=>{
        this.showAlert = false;
      },timeoutSeconds*1000);
    },
    notifySuccess(title, text, timeoutSeconds){
      this.notifyAlert(title, text, "success", timeoutSeconds)
    },
    notifyInfo(title, text, timeoutSeconds){
      this.notifyAlert(title, text, "info", timeoutSeconds)
    },
    notifyWarning(title, text, timeoutSeconds){
      this.notifyAlert(title, text, "warning", timeoutSeconds)
    },
    notifyError(title, text, timeoutSeconds){
      this.notifyAlert(title, text, "error", timeoutSeconds)
    }
  }
})