<template>
  <v-container class="h-screen">
    <h1 class="text-center">Triv<span class="text-purple-accent-3">ia</span></h1>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="topic"
          append-inner-icon="mdi-arrow-right"
          placeholder="javascript, idiomas"
          :loading="loadingSubmit"
          @keypress.enter="createTrivia()"
          @click:append-inner="createTrivia()">

        </v-text-field>
        <div class="text-center">
          <v-chip-group class="d-inline-block">
            <v-chip v-for="option in difficultyOptions" :key="option.value" @click="difficulty = option.value"
              :class="{ 'chip--active': difficulty === option.value }">
              {{ option.text }}
            </v-chip>
          </v-chip-group>
          <div>{{ difficulty }}</div>
          <div>{{ topic }}</div>
        </div>
      </v-col>
    </v-row>
    <LatestTriviaSection/>
  </v-container>
  <CreateTriviaLoadingModal ref="loadingTrivia" :loading="loadingQuestions" :trivia="newTrivia"/>
</template>

<script>
import CreateTriviaLoadingModal from '~/components/CreateTriviaLoadingModal.vue'
import LatestTriviaSection from '~/components/LatestTriviaSection.vue';
export default {
  components: {
    CreateTriviaLoadingModal,
    LatestTriviaSection,
  },
  data: () => ({
    difficulty: 'Normal',
    topic: '',
    loadingSubmit: false,
    loadingQuestions: false,
    newTrivia: null,
    difficultyOptions: [
      { text: 'Facil', value: 'Facil' },
      { text: 'Normal', value: 'Normal' },
      { text: 'Dificil', value: 'Dificil' },
      { text: 'Imposible', value: 'Imposible' },
    ],
  }),
  methods: {
    async createTrivia() {
      this.loadingSubmit = true
      this.loadingQuestions = true
      this.newTrivia = null
      this.$refs.loadingTrivia.openDialog()

      const data = {
        difficulty: this.difficulty,
        topic: this.topic,
      }
      // Trivia API
      const response = await $fetch('/api/trivia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      this.loadingSubmit = false

      console.log({response})
      this.newTrivia = response.body
      console.log(this.newTrivia)

      const questionsResponse = await $fetch(`/api/questions/${this.newTrivia.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      this.loadingQuestions = false
      if (!questionsResponse.ok) {
        // TODO: Show error message
      }
    },
  },
}

</script>
