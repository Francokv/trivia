<template>
  <h4 class="mb-4">
    Ultimas Trivias
  </h4>
  <TriviaList :trivias="trivias" />
</template>


<script>
import TriviaList from './TriviaList.vue';

export default {
  components: {
    TriviaList
  },
  data: () => ({
    trivias: [
      {
        id: 1,
        name: 'Trivia 1',
        description: 'Description 1'
      },
      {
        id: 2,
        name: 'Trivia 2',
        description: 'Description 2'
      },
      {
        id: 3,
        name: 'Trivia 3',
        description: 'Description 3'
      },
      {
        id: 4,
        name: 'Trivia 4',
        description: 'Description 4'
      },
    ]
  }),
  methods: {
    async fetchTrivias() {
      const trivias = await $fetch('/api/trivia?take=12', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this.trivias = trivias
    },
    created() {
      this.fetchTrivias()
    }
  },
  created() {
    this.fetchTrivias()
  }
}
</script>