<template>
  <v-container>
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
              <div>
                <div class="text-center" style="font-size: 1.5rem;">
                  <span v-if="question.questionEmoji" style="font-size: 40px;">{{ question.questionEmoji }}</span>
                  {{ question.question }}
                </div>
              </div>

              <!-- Alternativas -->
              <div>
                <v-row>
                  <v-col v-for="answer in question.answers" :key="answer.answer" sm="6" cols="12">
                    <v-btn block color="primary" dark @click="checkAnswer(answer.correct)" variant="outlined">
                      {{ answer.answer }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>

              <div class="text-right">
                <v-btn color="success" dark @click="nextQuestion">Continuar</v-btn>
              </div>
            </div>

          </v-tabs-window-item>
        </v-tabs-window>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    trivia: {
      "triviaName": "Desafío JavaScript Imposible",
      "triviaLargeDescription": "¡Pon a prueba tus conocimientos de JavaScript con este desafío imposible! Solo los expertos en programación podrán superar este reto.",
      "category": "Tecnologia",
      "difficulty": "Imposible",
      "uid": "asdf"
    },
    currentQuestion: 0,
    questions: [
      {
        "question": "¿Cuál es el resultado de 2 + 2?",
        "questionEmoji": "🤔",
        "answers": [
          {
            "answer": "4",
            "correct": true
          },
          {
            "answer": "5",
            "correct": false
          },
          {
            "answer": "6",
            "correct": false
          },
          {
            "answer": "7",
            "correct": false
          }
        ]
      },
      {
        "question": "¿Cuál es el resultado de 2 + 3?",
        "questionEmoji": "🤔",
        "answers": [
          {
            "answer": "4",
            "correct": true
          },
          {
            "answer": "5",
            "correct": false
          },
          {
            "answer": "6",
            "correct": false
          },
          {
            "answer": "7",
            "correct": false
          }
        ]
      },
      {
        "question": "¿Cuál es el resultado de 2 + 6?",
        "questionEmoji": "🤔",
        "answers": [
          {
            "answer": "4",
            "correct": true
          },
          {
            "answer": "5",
            "correct": false
          },
          {
            "answer": "6",
            "correct": false
          },
          {
            "answer": "7",
            "correct": false
          }
        ]
      }
    ]
  }),
  methods: {
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      }
    },
  }
}

</script>