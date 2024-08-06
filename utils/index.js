export const difficultyColors = {
  Facil: 'green',
  Normal: 'primary',
  'Difícil': 'warning',
  Dificil: 'warning',
  Imposible: 'error',
}

export const getDifficultyColor = (difficulty) => {
  return difficultyColors[difficulty]
}

export const topicsSuggestions = [
  "Guerras Mundiales",
  "Revoluciones históricas",
  "Civilizaciones antiguas",
  "Capitales del mundo",
  "Ríos y montañas",
  "Países y sus banderas",
  "Descubrimientos científicos",
  "Principios de la física",
  "Teorías biológicas",
  "Obras clásicas",
  "Premios Nobel de Literatura",
  "Autores contemporáneos",
  "Olímpicos históricos",
  "Reglas del fútbol",
  "Grandes deportistas",
  "Bandas icónicas",
  "Géneros musicales",
  "Instrumentos musicales",
  "Premios Óscar",
  "Series de televisión populares",
  "Cultura Pop",
  "Famosos y Celebridades",
  "Mitología griega",
  "Ciencia Ficción y Fantasía",
  "Lenguajes de programación",
  "Innovaciones tecnológicas",
  "Escritores y Poetas",
  "Cultura de Videojuegos",
  "Astronomía",
  "Medicina y Salud"
]

export const getRandomTopicSuggestions = () => {
  // retorna 4 topics aleatorios
  const randomTopics = []
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * topicsSuggestions.length)
    randomTopics.push(topicsSuggestions[randomIndex])
  }
  return randomTopics
}