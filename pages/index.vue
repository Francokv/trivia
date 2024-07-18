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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    difficulty: 'Normal',
    topic: '',
    loadingSubmit: false,
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
      console.log(response)
      this.loadingSubmit = false
    },
  },
}

</script>
