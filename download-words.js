const fs = require("fs");
const { fetch } = require("ofetch");

const write = fs.createWriteStream("words.txt", {
  flags: "w+",
});

fetch("https://github.com/dwyl/english-words/blob/master/words.txt?raw=true")
  .then((res) => res.text())
  .then((text) => {
    write.write(text);
  });
