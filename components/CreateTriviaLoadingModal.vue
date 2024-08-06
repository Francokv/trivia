<template>
<v-dialog v-model="dialog" max-width="600" persistent>
  <v-card style="position: relative;">
    <v-card-text v-if="trivia">
      <h1 class="text-center text-h4 text-primary mb-4 px-8">
        {{ trivia.title }}
      </h1>
      <h4 class="text-primary mb-1">Curiosidades</h4>
      <v-tabs-window v-model="curiosityTab" :key="trivia.id">
        <v-tabs-window-item v-for="(curiosity, index) in trivia.curiosities" :key="index" :value="index" style="min-height: 100px;">
          {{ curiosity }}
        </v-tabs-window-item>

      </v-tabs-window>
      <div v-if="progress < 100" class="mr-4">
        <small>Genrando preguntas</small>

        <v-progress-linear location="false" buffer-opacity="1" color="success" height="12" max="100" min="0"
          :model-value="progress" rounded></v-progress-linear>
      </div>
      <div class="text-center">
        <v-btn v-if="progress >= 100" color="primary" @click="goToTrivia()" size="x-large">Comenzar</v-btn>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <v-skeleton-loader
      class="mx-auto"
      width="100%"
      type="table-heading, list-item-two-line, image, table-tfoot"
    ></v-skeleton-loader>
    </v-card-text>
    <v-btn icon @click="handleCancel()" class="d-fixed" size="small" variant="flat" style="right: 20px; top: 20px; position: fixed;">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-card>
</v-dialog>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    trivia: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    progress: 0,
    progressAccelerationPerSecond: 1,
    curiosityTab: 0,
  }),
  watch: {
    trivia() {
      if (this.trivia) {
        this.startProgress()
        this.nextCuriosity()
      }
    },
  },
  methods: {
    nextCuriosity() {
      if (this.curiosityTab === this.trivia?.curiosities.length - 1) {
        this.curiosityTab = 0
      } else {
        this.curiosityTab = this.curiosityTab + 1
      }
      setTimeout(() => {
        this.nextCuriosity()
      }, 8000)
    },
    closeDialog() {
      this.dialog = false
    },
    loaded() {
      this.loading = false
    },
    goToTrivia() {
      this.$router.push(`/trivia/${this.trivia.id}`)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    startProgress() {
      this.progress = 0
      this.interval = setInterval(() => {

          if (this.progress >= 50) {
            this.progressAccelerationPerSecond = 0.2
          }

          if (this.progress >= 70) {
            this.progressAccelerationPerSecond = 0.1
          }

          if (this.progress >= 90) {
            this.progressAccelerationPerSecond = 0.05
          }

          if (this.progress >= 95) {
            this.progressAccelerationPerSecond = 0
          }

          if (!this.loading) {
            this.progressAccelerationPerSecond = 10
          }

          if (this.progress >= 100) {
          clearInterval(this.interval)
        }
        this.progress = this.progress + this.progressAccelerationPerSecond
        if (this.progress >= 100) {
          clearInterval(this.interval)
        }
      }, 100)
    },
    openDialog() {
      this.progress = 0
      this.dialog = true
      this.nextCuriosity()
    },
  },
}
</script>