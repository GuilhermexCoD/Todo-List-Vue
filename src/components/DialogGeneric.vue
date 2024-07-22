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
            {{ props.description }}
          </v-card-text>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn @click="$emit('cancel')">
              {{props.cancelButtonText}}
            </v-btn>
  
            <v-btn @click="$emit('success')">
              {{props.successButtonText}}
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
  description: String,
  successButtonText: String,
  cancelButtonText: String,
})

</script>