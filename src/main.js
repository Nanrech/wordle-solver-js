// words.js contains `const answers = [...]`

function getRowValues(rowId) {
  const inputs = document.querySelectorAll(`#${rowId} input`);
  return Array.from(inputs, input => input.value.trim().toLowerCase());
}

function getWrongInput() {
  return document.getElementById("wrongInput").value.trim().toLowerCase();
}

function getWordOutput() {
  return document.getElementById("wordOutput");
}

function updateOutput() {
  const greenRow = getRowValues("greenRow");
  const yellowRow = getRowValues("yellowRow");
  const wrongInput = getWrongInput();
  const wordOutput = getWordOutput();

  let out = []; // output of possible answers

  answers.forEach((word) => {
    wordCheck: {
      // Green check
      for (let i = 0; i < greenRow.length; i++) {
        if (greenRow[i] && word[i] !== greenRow[i]) {
          break wordCheck;
        }
      }

      // Yellow check
      for (let i = 0; i < yellowRow.length; i++) {
        const letters = yellowRow[i];
        for (const c of letters) {
          if (!word.includes(c)) {
            break wordCheck;
          }
          if (word[i] === c) {
            break wordCheck;
          }
        }
      }

      // Grey check
      for (const c of wrongInput) {
        if (word.includes(c)) {
          break wordCheck;
        }
      }

      out.push(word);
    }
  });

  // Limit output
  const outLimited = out.slice(0, 15);

  // Update the output element
  if (outLimited.length > 0) {
    outLimited.forEach((word, index) => {
      outLimited[index] = word.toUpperCase();
    });
    wordOutput.innerHTML = `<ul>${outLimited.map(w => `<li>${w}</li>`).join("")}</ul>`;
  } else {
    wordOutput.innerHTML = ""
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const allInputs = document.querySelectorAll("#greenRow input, #yellowRow input, #wrongInput");

  allInputs.forEach(input => {
    input.addEventListener("input", () => {
      input.value = input.value.toLowerCase();
      updateOutput();
    });
  });
});
