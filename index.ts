function interpreter(code: string, tape: string): string {
  const state = tape.split('');
  let pointer = 0;
  
  for (let i = 0; i < code.length; i += 1) {
    const command = code[i];
    
    if (command === '>') {      
      if (pointer + 1 > state.length - 1) {
        break;
      }
      
      pointer += 1;
      continue;
    }
    
    if (command === '<') {      
      if (pointer - 1 < 0) {
        break;
      }
      
      pointer -= 1;
      continue;
    }

    if (command === '[' && state[pointer] === '0' && i < code.length) {
      const nextCommandIndex = code.indexOf(']', i + 1);

      if (nextCommandIndex < 0) {
        break;
      }

      i = nextCommandIndex - 1;
      continue;
    }

    if (command === ']' && state[pointer] !== '0' && i > 0) {
      const nextCommandIndex = code.lastIndexOf('[', i - 1);

      if (nextCommandIndex < 0) {
        break;
      }

      i = nextCommandIndex - 1;
      continue;
    }
    
    if (command === '*') {
      state[pointer] = state[pointer] === '0' ? '1' : '0';
    }
  }
  
  return state.join('');
}
