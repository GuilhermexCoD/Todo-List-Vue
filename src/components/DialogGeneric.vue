<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.show" max-width="auto" persistent>
      <v-card :title="props.title">
        <v-card-text>
          {{ props.description }}
        </v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="$emit('cancel')" 
            :color="cancelButton.color"
            :variant="cancelButton.variant"
          >
            {{ props.cancelButton.text }}
          </v-btn>

          <v-btn 
            @click="$emit('success')"
            :color="successButton.color"
            :variant="successButton.variant"
          >
            {{ props.successButton.text }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  show: Boolean,
  title: String,
  description: String,
  successButton: {
    text: String,
    color: String,
    variant: String,
  },
  cancelButton: {
    text: String,
    color: String,
    variant: String,
  },
});
</script>
