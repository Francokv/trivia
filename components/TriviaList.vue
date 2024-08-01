<template>
  <v-row>
    <v-col v-for="trivia in trivias" cols="12" sm="6" md="4" lg="3">
      <TriviaCard :key="trivia.id" :trivia="trivia"/>
    </v-col>
  </v-row>
</template>

<script>
import TriviaCard from './TriviaCard.vue'

export default {
  props: {
    trivias : {
      type: Array,
      required: true
    }
  }
}
</script>