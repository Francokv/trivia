<template>
  <v-container v-if="trivia">
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
      <v-progress-linear :location="false" buffer-opacity="1" color="success" height="12" :max="questions.length" min="0"
        :model-value="currentQuestion" rounded></v-progress-linear>
    </div>
    <v-row class="justify-center">
      <v-col md="6" sm="10">
        <v-tabs-window v-model="currentQuestion">
          <v-tabs-window-item v-for="question, index in questions" :value="index">
            <div class="d-flex flex-column justify-space-between" style="height: 400px">
              <QuestionBlock :question="question"/>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import QuestionBlock from '../../components/QuestionBlock.vue'

export default {
  components: {
    QuestionBlock
  },
  data: () => ({
    trivia: null,
    currentQuestion: 0,
    questions: []
  }),
  methods: {
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
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