<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="props.show"
        max-width="auto"
        persistent
      > 
        <v-card
          :title=props.title
        >
          <v-card-text>
            <v-text-field 
              label="Title"
              v-model="props.task.title"
            ></v-text-field>
            <v-text-field 
              label="Description"
              v-model="props.task.description"
            >
            </v-text-field>
          </v-card-text>
          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn @click="$emit('cancel')">
              Cancel
            </v-btn>
  
            <v-btn @click="$emit('success')">
              Edit
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  show: Boolean,
  title: String,
  task: Object
})

</script>