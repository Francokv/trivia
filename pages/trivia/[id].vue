<template>
  <v-container v-if="trivia" height="100vh">
    <v-row class="justify-center">
      <v-col md="6" sm="10">
        <div>
          <span class="mr-2" color="primary" dark>{{ trivia.triviaName }}</span>
          <v-chip class="mr-2" color="primary" dark>
            <v-icon class="mr-2">mdi-tag</v-icon>
            {{ trivia.category }}
          </v-chip>
          <v-chip class="mr-2" color="primary" dark>
            <v-icon class="mr-2">mdi-speedometer</v-icon>
            {{ trivia.difficulty }}
          </v-chip>
        </div>
        <div class="d-flex align-center mb-md-8 mb-4">
          <v-btn class="mr-2" color="primary" variant="text" icon to="/">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-progress-linear :location="false" buffer-opacity="1" color="success" height="12" :max="questions.length - 1" min="0"
            :model-value="currentQuestion" rounded></v-progress-linear>
          <b>
            <span class="ml-2 text-primary">{{ currentQuestion + 1 }}/{{ questions.length }}</span>
          </b>
        </div>
      </v-col>
    </v-row>
  
      <v-tabs-window v-if="!finished" v-model="currentQuestion">
        <v-tabs-window-item v-for="question, index in questions" :value="index">
          <div class="d-flex flex-column justify-space-between" style="height: 400px">
            <QuestionBlock :question="question" @next="nextQuestion()" @error="errors++"/>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="end">
        </v-tabs-window-item>

      </v-tabs-window>
      <FinishTriviaBlock v-else :errors="errors" :totalQuestions="questions.length"/>

    <div>
    </div>
  </v-container>
</template>

<script>
import QuestionBlock from '../../components/QuestionBlock.vue'
import FinishTriviaBlock from '../../components/FinishTriviaBlock.vue'

export default {
  components: {
    QuestionBlock
  },
  data: () => ({
    trivia: null,
    currentQuestion: 0,
    finished: false,
    questions: [],
    errors: 0,
  }),
  methods: {
    checkAnswer() {
      
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      } else {
        this.finished = true
      }
    },
    async fetchQuestions() {
      const { body: questions } = await $fetch(`/api/questions/${this.$route.params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(questions)
      this.questions = questions
    },
    async fetchTrivia () {
      this.trivia = await $fetch(`/api/trivia/${this.$route.params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
  created() {
    this.fetchQuestions()
    this.fetchTrivia()
  }
}

</script>