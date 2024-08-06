<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="topic"
          append-inner-icon="mdi-arrow-right"
          :placeholder="placeholder"
          variant="solo-filled"
          :loading="loadingSubmit"
          @keypress.enter="createTrivia()"
          @click:append-inner="createTrivia()">

        </v-text-field>
        <div class="d-flex ga-1 justify-center">
            <v-chip v-for="option in difficultyOptions" :key="option.value" :color="option.color"
              :variant="difficulty === option.value ? 'flat' : 'tonal'"
              @click="difficulty = option.value"
              >
              {{ option.text }}
            </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <CreateTriviaLoadingModal ref="loadingTrivia" :loading="loadingQuestions" :trivia="newTrivia" @cancel="handleCancel()"/>
</template>

<script>
import CreateTriviaLoadingModal from '~/components/CreateTriviaLoadingModal.vue'
import LatestTriviaSection from '~/components/LatestTriviaSection.vue';
import { getDifficultyColor, getRandomTopicSuggestions } from '@/utils'
import { useToast } from 'vue-toastification'

export default {
  components: {
    CreateTriviaLoadingModal,
    LatestTriviaSection,
  },
  data: () => ({
    difficulty: 'Normal',
    placeholder: getRandomTopicSuggestions().join(', ') + ', ...',
    topic: '',
    loadingSubmit: false,
    loadingQuestions: false,
    newTrivia: null,
    difficultyOptions: [
      { text: 'Facil', value: 'Facil', color: getDifficultyColor('Facil') },
      { text: 'Normal', value: 'Normal', color: getDifficultyColor('Normal') },
      { text: 'Dificil', value: 'Dificil', color: getDifficultyColor('Dificil') },
      { text: 'Imposible', value: 'Imposible', color: getDifficultyColor('Imposible') },
    ],
    cancel: false,
  }),
  methods: {
    async createTrivia() {
      this.cancel = false
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
      if (this.cancel) {
        return
      }
      this.loadingSubmit = false

      console.log({response})
      this.newTrivia = response.body
      if (!response.statusCode === 200) {
        this.$refs.loadingTrivia.closeDialog()
        useToast().error('Error al crear trivia, por favor intenta de nuevo')
        return
      }

      const questionsResponse = await $fetch(`/api/questions/${this.newTrivia.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (this.cancel) {
        return
      }

      this.loadingQuestions = false
      if (!questionsResponse.statusCode === 200) {
        this.$refs.loadingTrivia.closeDialog()
        useToast().error('Error al generar preguntas, por favor intenta de nuevo')
        return
      }
    },
    handleCancel() {
      useToast().warning('Creación de trivia cancelada')
      this.cancel = true
      this.loadingSubmit = false
      this.loadingQuestions = false
      this.newTrivia = null
      this.$refs.loadingTrivia.closeDialog()
    }
  },
}

</script>
