<template>

  <div>
    <div class="text-center" style="font-size: 1.5rem;">
      <span v-if="question.questionEmoji" style="font-size: 40px;">{{ question.questionEmoji }}</span>
      {{ question.question }}
    </div>
  </div>

  <!-- Alternativas -->
  <div>
    <v-row>
      <v-col v-for="answer in question.answers" :key="answer.answer" sm="6" cols="12">
        <v-btn block color="primary" dark @click="selectedAnswer = answer" variant="outlined" :active="selectedAnswer?.id === answer.id">
          {{ answer.answer }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedAnswer: null,
    }
  },
  methods: {
    checkAnswer() {
      emit('answer', this.selectedAnswer)
    },
  },
}
</script>