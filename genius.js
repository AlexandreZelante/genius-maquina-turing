const MAX_LEVEL = 4

const Game = {
  running: true,
  level: 0,
  userSequence: [],
  gameSequence: [],
}

const colors = ['green', 'red', 'yellow', 'blue']
const sounds = {
  green: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  red: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
  blue: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
}

const displayText = (text) => $('.display').text(text)

const handleInput = (color) => {
  setActiveClass(color)
  Game.userSequence.push(color)

  if (!checkUserSequence()) {
    resetGame()
    showError()
    return
  }

  if (Game.userSequence.length === Game.gameSequence.length) {
    Game.level++
    Game.userSequence = []

    if (Game.level === MAX_LEVEL) {
      resetGame()
      showWin()
      return
    }

    generateSequence()
  }
}

const generateSequence = () => {
  displayText(Game.level)

  const color = getRandomColor()
  Game.gameSequence.push(color)

  let i = 0
  const interval = setInterval(() => {
    setActiveClass(Game.gameSequence[i])
    i++

    if (i === Game.gameSequence.length) {
      clearInterval(interval)
    }
  }, 1000)
}

const getRandomColor = () => {
  const index = Math.floor(Math.random() * 4)
  return colors[index]
}

const setActiveClass = (color) => {
  const pad = $(`.${color}`)
  const className = `${color}-active`

  playSound(color)
  pad.addClass(className)
  setTimeout(() => {
    pad.removeClass(className)
  }, 500)
}

const checkUserSequence = () => {
  for (let i = 0; i < Game.userSequence.length; i++) {
    if (Game.userSequence[i] !== Game.gameSequence[i]) {
      return false
    }
  }

  if (Game.gameSequence.length === Game.userSequence.length) {
    const turingMachineTape = Game.gameSequence.concat(Game.userSequence)
    const verifiedByTuringMachine = TuringMachine(turingMachineTape)
    return verifiedByTuringMachine
  }

  return true
}

const startGame = () => {
  resetGame()
  Game.level = 1
  generateSequence()
}

const resetGame = () => {
  Game.userSequence = []
  Game.gameSequence = []
  Game.level = 0
  displayText(Game.level)
}

const showError = () => {
  displayText('ERRO')
  const interval = setInterval(() => {
    clearInterval(interval)
    displayText('00')
  }, 500)
}

const showWin = () => {
  displayText('GANHOU!')
  const interval = setInterval(() => {
    clearInterval(interval)
    displayText('00')
  }, 500)
}

const playSound = (color) => {
  const sound = new Audio(sounds[color])
  sound.play()
}
