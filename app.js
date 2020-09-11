const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
var fonts = {
  Roboto: {
    normal: path.join(
      __dirname,

      "/example",
      "/Roboto/Roboto-Regular.ttf"
    ),
    bold: path.join(
      __dirname,

      "/example",
      "/Roboto/Roboto-Medium.ttf"
    ),
    italics: path.join(
      __dirname,

      "/example",
      "/Roboto/Roboto-Italic.ttf"
    ),
    bolditalics: path.join(
      __dirname,

      "/example",
      "/Roboto/Roboto-MediumItalic.ttf"
    ),
  },
};

let student_name = "";
let student_group = "";
let student_htno = "";
let student_rollno = "";
let student_mobile = "";
let disease_1 = "";
let disease_2 = "";
let disease_3 = "";
let disease_4 = "";

let date = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

app.post("/", function (req, res) {
  student_name = req.body.sname;
  student_group = req.body.sgroup;
  student_htno = req.body.shtno;
  student_rollno = req.body.srollno;
  student_mobile = req.body.stel;
  disease_1 = req.body.disease1;
  disease_2 = req.body.disease2;
  disease_3 = req.body.disease3;
  disease_4 = req.body.disease4;

  res.render("conformDetails.ejs", {
    name: student_name,
    group: student_group,
    htno: student_htno,
    rollno: student_rollno,
    mobile: student_mobile,
    d1: disease_1,
    d2: disease_2,
    d3: disease_2,
    d4: disease_4,
  });
});

var PdfPrinter = require("pdfmake");
var printer = new PdfPrinter(fonts);
var fs = require("fs");
const { setTimeout } = require("timers");

app.post("/dRequest", function (req, res) {
  var dTemplate = {
    content: [
      {
        text: "SRI VENKATESWARA ARTS COLLEGE-TIRUPATI",
        fontSize: 19,
        alignment: "center",
        bold: true,
        margin: [0, 5],
        width: "80%",
      },
      {
        text:
          "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
      },
      {
        text: "Self-Declaration",
        decoration: "underline",
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 15,
        alignment: "center",
      },
      {
        text:
          ' We are concerned a about your health, safety and hygiene. In the interest of your well-being and that of everyone at the venue, you are requested to declare if you have any of the followng listed symptoms by using " Yes " (Yes, I have) or " No " (No, I dont not have).',
        fontSize: 12,
        margin: [0, 10, 0, 10],
      },
      {
        layout: "noBorders",
        fontSize: 14,
        margin: [0, 20, 0, 20],
        table: {
          headerRows: 0,
          widths: [130, 50, 50, 130, 50, 50],
          body: [
            ["Cough", ":", disease_1, "Fever", ":", disease_2],
            [
              "Cold/Runny Nose",
              ":",
              disease_3,
              "Breathing Problem",
              ":",
              disease_4,
            ],
          ],
        },
      },
      {
        text:
          "I'm certifying that I've NOT tested Positive for the Coronavirus or identified as a potential carrier of the COVID-19 Virus.",
        margin: [0, 20, 0, 20],
        bold: true,
        fontSize: 15,
      },
      {
        layout: "noBorders",
        fontSize: 14,
        margin: [0, 20, 0, 20],
        table: {
          headerRows: 0,
          widths: [150, 30, "auto"],
          body: [
            ["Candidate Name", ":", student_name.toUpperCase()],
            ["Group", ":", student_group],
            ["Hallticket", ":", student_htno],
            ["Roll No", ":", student_rollno],
            ["Phone No", ":", student_mobile],
          ],
        },
      },

      {
        text: "Signatrue of the Candidate",
        alignment: "right",
        margin: [0, 50, 0, 20],
        bold: true,
      },

      {
        text: "COVID-19 INSTRUCTIONS TO THE CANDIDATE",
        alignment: "center",
        decoration: "underline",
        margin: [0, 10, 0, 10],
        bold: true,
      },
      {
        // for numbered lists set the ol key

        ol: [
          "Candidates must maintain social distancing starting from point of entry in the exam venue till his/her exit from the exam venue.",
          "Candidate must must bring their own Mask and Personal Hand sanitizer.",
          {
            text:
              "Candidates will have to bring a hard copy of signed Self-Declartion(this form).",
            bold: true,
          },
        ],
      },

      {
        text:
          "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
        margin: [0, 50, 0, 0],
      },
      {
        text: "Generated on " + date,
        fontSize: 8,
        italics: true,
      },
    ],
  };
  var pdfDoc = printer.createPdfKitDocument(dTemplate);
  pdfDoc.pipe(
    fs.createWriteStream(__dirname + "/public/Self-DeclarationForm.pdf")
  );
  pdfDoc.end();
  setTimeout(function () {
    res.sendFile(__dirname + "/public/Self-DeclarationForm.pdf");
  }, 100);
});

app.get("/editDetails", function (req, res) {
  res.render("index", {
    name: student_name.toUpperCase(),
    group: student_group,
    htno: student_htno,
    rollno: student_rollno,
    mobile: student_mobile,
    method: "/dRequest",
    submitText: "Generate Self Declaration",
  });
});

app.get("/", function (req, res) {
  res.render("index", {
    name: "",
    group: "",
    htno: "",
    rollno: "",
    mobile: "",
    method: "/",
    submitText: "Submit",
  });
});
// app.get("/", function (req, res) {
//   res.send("hi");
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server deployed, listening at 3000 port");
});
