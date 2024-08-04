<template>
  <v-row class="justify-center">
    <v-col cols="12" md="6" sm="10">
      <div class="mb-md-12 mb-6">
        <div class="text-center" style="font-size: 1.5rem;">
          <span v-if="question.questionEmoji" style="font-size: 40px;">{{ question.questionEmoji }}</span>
          {{ question.question }}
        </div>
      </div>

      <!-- Alternativas -->
      <div>
        <v-row>
          <v-col v-for="answer in question.answers" :key="answer.answer" sm="6" cols="12">
            <v-card block color="primary" dark @click="selectedAnswer = answer" :variant="selectedAnswer?.id === answer.id ? 'flat' : 'outlined'" height="100%">
              <v-card-text>
                {{ answer.answer }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col cols="12" md="8">

      <QuestionResult
        :submitted="submitted"
        :isCorrect="isCorrect"
        :correctMessage="question.correctMessage"
        :wrongMessage="question.wrongMessage"
        :explanation="question.explanation"
        @submit="handleSubmit()"
        :disabled="disabledSubmit"/>
    </v-col>
  </v-row>

</template>

<script>
import QuestionResult from './QuestionResult.vue';
export default {
  components: {
    QuestionResult,
  },
  props: {
    question: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      submitted: false,
      isCorrect: false,
      selectedAnswer: null,
    }
  },
  computed: {
    disabledSubmit() {
      return !this.selectedAnswer
    },
  },
  methods: {
    handleSubmit() {
      if (this.submitted) {
        this.$emit('next')
      } else {
        this.checkAnswer()
      }
    },
    checkAnswer() {
      this.isCorrect = this.selectedAnswer.isCorrect
      this.submitted = true

      if (this.isCorrect) {
        this.$emit('correct')
        const audio = new Audio('/correct.mp3')
        audio.volume = 0.2
        audio.play()

      } else {
        this.$emit('error')
        const audio = new Audio('/error.mp3')
        audio.volume = 0.2
        audio.play()
      }
    },
  },
}
</script>