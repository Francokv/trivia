<template>
  <v-card @click="$router.push(`/trivia/${trivia.id}`)" height="100%">
    <v-card-text class="d-flex justify-space-between flex-column h-100">
      <div class="mb-2">
        <h3 class="mb-2 text-primary"> 
          {{ trivia?.title }}
        </h3>
        <p>
          {{ trivia?.description }}
        </p>
     </div>
      <div class="d-flex ga-1">
        <v-chip color="primary" dark>
          <v-icon class="mr-2">mdi-tag</v-icon>
          {{ trivia.category }}
        </v-chip>
        <v-chip :color="getDifficultyColor(trivia.difficulty)" dark>
          <v-icon class="mr-2">mdi-speedometer</v-icon>
          {{ trivia.difficulty }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { getDifficultyColor } from '@/utils'

export default {
  props: {
    trivia : {
      type: Object,
      required: true
    }
  },
  methods: {
    getDifficultyColor
  },
}
</script>