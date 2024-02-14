const topdf = require('docx2pdf-converter')

const inputPath = './VP IT ESIGNATURE.docx';

topdf.convert(inputPath,'output.pdf')
console.log("Converted");