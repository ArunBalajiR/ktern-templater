const PizZip = require("pizzip");
const fs = require("fs");
const Docxtemplater = require("docxtemplater");
const xmlDom = require("@xmldom/xmldom").DOMParser;

// Read the DOCX template
const templateContent = fs.readFileSync(
  "test.docx",
  "binary"
);
const zip = new PizZip(templateContent);
const doc = new Docxtemplater(zip);

// Add the Signature
const timestampXML = `<w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                        <w:r>
                            <w:t>{%image}</w:t>
                        </w:r>
                     </w:p>`;
const timestampNode = new xmlDom().parseFromString(
  timestampXML,
  "application/xml"
);

// Find the main document part and append the timestamp
const documentPart = doc.zip.files["word/document.xml"];
const documentXML = documentPart.asText();
const updatedDocumentXML = documentXML.replace(
  "</w:body>",
  `${timestampNode}</w:body>`
);
doc.zip.file("word/document.xml", updatedDocumentXML);

// Save the modified DOCX file
const outputPath = "./output.docx";
const outputContent = doc.getZip().generate({ type: "nodebuffer" });
fs.writeFileSync(outputPath, outputContent);

console.log("Signature placeholder added successfully!");
