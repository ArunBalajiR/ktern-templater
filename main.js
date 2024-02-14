// Node.js example
var ImageModule = require('open-docxtemplater-image-module');
const PizZip = require("pizzip");
const fs = require("fs");
const Docxtemplater = require("docxtemplater");

var imageModule = new ImageModule({
  centered: false,
  fileType: "docx",
  getImage: function(tagValue, tagName) {
    var imagePath = __dirname + '/' + tagValue;
    return fs.readFileSync(imagePath);
  },
  getSize: function(img, tagValue, tagName) {
    // img is the image returned by opts.getImage()
    // tagValue is 'example.png'
    // tagName is 'image'
    return [380, 120];
  }
});

const templateContent = fs.readFileSync("output.docx", "binary");
const zip = new PizZip(templateContent);

var doc = new Docxtemplater()
  .attachModule(imageModule)
  .loadZip(zip)
  .setData({ image: 'image.png' })
  .render();

var buffer = doc
  .getZip()
  .generate({ type: "nodebuffer" });

fs.writeFile("test.docx", buffer, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("File has been written successfully!");
  }
});
