<template>
<div class="d-flex justify-center flex-column align-center ga-4">
  <h1 :class="`text-center text-primary`" style="max-width: 500px;">{{ message }}</h1>

  <div class="d-flex justify-center align-center">
    <v-icon color="yellow-lighten-2" size="100">{{ stars >= 1 ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
    <v-icon color="yellow-lighten-2" size="130">{{ stars >= 2 ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
    <v-icon color="yellow-lighten-2" size="100">{{ stars >= 3 ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
  </div>
  <div class="text-center">
    <v-btn color="primary" dark to="/" size="x-large" style="margin-top: 20px;">Volver al inicio</v-btn>
  </div>
</div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({

  }),
  computed: {
    stars() {
      if (this.errors === 0) {
        return 3
      } else if (this.errors === 1) {
        return 2
      } else {
        return 1
      }
    },
    message() {
      if (this.errors === 0) {
        return '¡Felicidades! Has completado la trivia sin errores.'
      } else if (this.errors === 1) {
        return '¡Casi perfecto! Solo has cometido un error en la trivia.'
      } else {
        return `Has cometido ${this.errors} errores en la trivia.`
      }
    },
  },

}

</script>