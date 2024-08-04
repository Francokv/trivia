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
    trivias: []
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