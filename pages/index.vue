<template>
  <v-container class="h-screen">
    <h1 class="text-center mt-md-16" style="font-size: 60px;">TRIV<span class="text-primary">IA</span></h1>
    <div class="text-center mb-4">
      <span style="max-width: 500px; display: inline-block;">Bienvenido al futuro de la trivia. Nuestra IA genera preguntas que expanden tu conocimiento y desafían tus habilidades, haciendo el aprendizaje más divertido.</span>
    </div>
    <TriviaForm/>
    <LatestTriviaSection/>
  </v-container>
</template>

<script>
import CreateTriviaLoadingModal from '~/components/CreateTriviaLoadingModal.vue'
import LatestTriviaSection from '~/components/LatestTriviaSection.vue';
import TriviaForm from '~/components/TriviaForm.vue';

export default {
  components: {
    CreateTriviaLoadingModal,
    LatestTriviaSection,
  },
}
</script>
