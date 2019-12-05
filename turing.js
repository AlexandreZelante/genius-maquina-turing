// Programa
const program = {
  q0: {
    'Y': { w:'0', m:1, n:'q1' },
    'B': { w:'1', m:1, n:'q1' },
    'R': { w:'2', m:1, n:'q1' },
    'G': { w:'3', m:1, n:'q1' },

    '3': { w:'3', m:-1, n:'q4' },
    '2': { w:'2', m:-1, n:'q4' },
    '1': { w:'1', m:-1, n:'q4' },
    '0': { w:'0', m:-1, n:'q4' },
  },
  q1: {
    'Y': { w:'Y', m:1, n:'q1' },
    'B': { w:'B', m:1, n:'q1' },
    'R': { w:'R', m:1, n:'q1' },
    'G': { w:'G', m:1, n:'q1' },

    '3': { w:'3', m:-1, n:'q2' },
    '2': { w:'2', m:-1, n:'q2' },
    '1': { w:'1', m:-1, n:'q2' },
    '0': { w:'0', m:-1, n:'q2' },

    'X': { w:'X', m:-1, n:'q2' },
  },
  q2: {
    'Y': { w:'0', m:-1, n:'q3' },
    'B': { w:'1', m:-1, n:'q3' },
    'R': { w:'2', m:-1, n:'q3' },
    'G': { w:'3', m:-1, n:'q3' },
  },
  q3: {
    'Y': { w:'Y', m:-1, n:'q3' },
    'B': { w:'B', m:-1, n:'q3' },
    'R': { w:'R', m:-1, n:'q3' },
    'G': { w:'G', m:-1, n:'q3' },

    '3': { w:'3', m:1, n:'q0' },
    '2': { w:'2', m:1, n:'q0' },
    '1': { w:'1', m:1, n:'q0' },
    '0': { w:'0', m:1, n:'q0' },
  },
  q4: {
    '0': { w:'Y', m:-1, n:'q4' },
    '1': { w:'B', m:-1, n:'q4' },
    '2': { w:'R', m:-1, n:'q4' },
    '3': { w:'G', m:-1, n:'q4' },

    'X': { w:'X', m:1, n:'q5' },
  },
  q5: {
    'Y': { w:'0', m:1, n:'q6' },
    'B': { w:'1', m:1, n:'q7' },
    'R': { w:'2', m:1, n:'q8' },
    'G': { w:'3', m:1, n:'q9' },

    'Z': { w:'Z', m:-1, n:'q11' },
  },
  q6: {
    'Z': { w:'Z', m:1, n:'q6' },
    'Y': { w:'Y', m:1, n:'q6' },
    'B': { w:'B', m:1, n:'q6' },
    'R': { w:'R', m:1, n:'q6' },
    'G': { w:'G', m:1, n:'q6' },

    '0': { w:'Z', m:-1, n:'q10' },
  },
  q7: {
    'Z': { w:'Z', m:1, n:'q7' },
    'Y': { w:'Y', m:1, n:'q7' },
    'B': { w:'B', m:1, n:'q7' },
    'R': { w:'R', m:1, n:'q7' },
    'G': { w:'G', m:1, n:'q7' },

    '1': { w:'Z', m:-1, n:'q10' },
  },
  q8: {
    'Z': { w:'Z', m:1, n:'q8' },
    'Y': { w:'Y', m:1, n:'q8' },
    'B': { w:'B', m:1, n:'q8' },
    'R': { w:'R', m:1, n:'q8' },
    'G': { w:'G', m:1, n:'q8' },

    '2': { w:'Z', m:-1, n:'q10' },
  },
  q9: {
    'Z': { w:'Z', m:1, n:'q9' },
    'Y': { w:'Y', m:1, n:'q9' },
    'B': { w:'B', m:1, n:'q9' },
    'R': { w:'R', m:1, n:'q9' },
    'G': { w:'G', m:1, n:'q9' },

    '3': { w:'Z', m:-1, n:'q10' },
  },
  q10: {
    'Z': { w:'Z', m:-1, n:'q10' },
    'Y': { w:'Y', m:-1, n:'q10' },
    'B': { w:'B', m:-1, n:'q10' },
    'R': { w:'R', m:-1, n:'q10' },
    'G': { w:'G', m:-1, n:'q10' },

    '3': { w:'3', m:1, n:'q5' },
    '2': { w:'2', m:1, n:'q5' },
    '1': { w:'1', m:1, n:'q5' },
    '0': { w:'0', m:1, n:'q5' },
  },
}

// Tradução
const letters = {
  yellow: 'Y',
  blue: 'B',
  red: 'R',
  green: 'G',
}

// Máquina
const TuringMachine = (tape) => {
  i = 0
  let state = 'q0'
  let final = 'q11'
  tape = tape.map(cell => letters[cell])

  while (state !== final) {
    cell = tape[i]
    current = cell
      ? program[state][cell]
      : program[state].X

    if(!current) {
      return false
    }

    tape.splice(i, 1, current.w)
    i += current.m
    state = current.n
  }

  return state === final
}
