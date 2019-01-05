const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "ja";
recognition.onresult = event => {
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      const word = hiraganaToKatakana(
        removeSpace(event.results[i][0].transcript)
      );
      console.log(word);
      if (word.match(/ハローココチャン/)) {
        fetch("http://localhost:3000/api/robots/servoBot/commands/move", {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(error => console.error(error));
      }
    }
  }
};
recognition.error = e => {
  console.error(e);
};

recognition.start();

/**
 * ひらがな to カタカナ
 * @param {String} str
 */
const hiraganaToKatakana = str => {
  return str.replace(/[\u3041-\u3096]/g, function(match) {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
};

/**
 * 空白除去
 * @param {String} str
 */
const removeSpace = str => {
  return str.replace(/\s+/g, "");
};
