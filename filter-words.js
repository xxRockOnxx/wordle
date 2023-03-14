const fs = require("fs");
const readline = require("readline");

const read = fs.createReadStream("./words.txt");
const write = fs.createWriteStream("./words.js");

write.write("const words = [" + "\n");

readline
  .createInterface({
    input: read,
  })
  .on("line", (line) => {
    // Append 5 letter words to a new file
    if (/^\w{5}$/.test(line)) {
      write.write(`  "${line}",` + "\n");
    }
  })
  .on("close", () => {
    write.write("];" + "\n");
    write.write("export default words");
    read.close();
    write.close();
  });
