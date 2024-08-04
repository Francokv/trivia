<template>
  <v-card variant="tonal" :color="color">
    <v-card-text class="d-md-flex justify-space-between ga-4 align-center ">
      <div>
        <div v-if="submitted">
          <h4 class="mb-2" style="font-size: 20px;">{{ message }}</h4>
          <p style="font-size: 16px;" v-html="explanation"></p>
        </div>
      </div>
      <div class="text-right mt-4 mt-md-0">
        <v-btn color="primary" dark @click="$emit('submit')" :disabled="disabled" size="x-large" style="">Continuar</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    explanation: {
      type: String,
      required: true
    },
    correctMessage: {
      type: String,
      required: true
    },
    wrongMessage: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    submitted: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    color() {
      if (!this.submitted) return 'white'
      return this.isCorrect ? 'success' : 'error'
    },
    message() {
      return this.isCorrect ? this.correctMessage : this.wrongMessage
    },
  },
}
</script>