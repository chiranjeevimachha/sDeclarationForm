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
let student_htno = "";
let f_date = "";

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
  student_htno = req.body.shtno;
  f_date = req.body.s_date;

  // for (var i = 0; i < f_date.length; i++) {
  //   var date = f_date;
  //   f_date[f_date.length - 1] = date.split("-");
  // }

  res.render("conformDetails.ejs", {
    name: student_name,
    htno: student_htno,
    date: f_date,
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
        layout: "noBorders",
        fontSize: 14,
        margin: [0, 0, 0, 20],
        table: {
          headerRows: 0,
          widths: ["auto", "auto"],
          body: [
            [
              {
                image: "suv_logo.png",
                fit: [135, 35],
                // height: 150,
                // width: 100,
                alignment: "right",
              },
              {
                text: "SRI VENKATESWARA UNIVERSITY UG FINAL YEAR EXAMINATIONS",
                fontSize: 16,
                alignment: "center",
                bold: true,
              },
            ],
          ],
        },
      },
      // {
      //   text: "SRI VENKATESWARA UNIVERSITY UG FINAL YEAR EXAMINATIONS",
      //   fontSize: 16,
      //   alignment: "center",
      //   bold: true,
      //   margin: [0, 5],
      //   width: "80%",
      // },
      {
        text: "Student Self-Declaration Form Regarding COVID-19",
        fontSize: 16,
        alignment: "center",
        bold: true,
        margin: [0, 0, 0, 0],
        width: "80%",
      },
      {
        text:
          "For the health and safety of our community, declaration of illness is requird. Be sure that the information you'll give is accurate and complete, Please get immediate medical attention if you have any of the COVID-19 signs.",
        // fontSize: 16,
        alignment: "center",
        bold: true,
        margin: [0, 5, 0, 0],
        width: "80%",
      },
      {
        layout: "noBorders",
        fontSize: 14,
        margin: [0, 20, 0, 20],
        table: {
          headerRows: 0,
          widths: [250, 150, "auto"],
          body: [
            [
              {
                text: "Name (With Surname)",
                margin: [0, 5, 0, 5],
              },
              {
                text: ": " + student_name,
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: "Hall Ticket no.",
                margin: [0, 5, 0, 5],
              },
              {
                text: ": " + student_htno,
                margin: [0, 5, 0, 5],
              },
            ],

            [
              {
                text: "Exam Date",
                margin: [0, 5, 0, 5],
              },
              {
                text: ": " + f_date,
                margin: [0, 5, 0, 5],
              },
            ],

            [
              {
                text: "Have you travalled abroad during 2020?",
                margin: [0, 5, 0, 5],
              },
              {
                text: "(Yes/No) - ",
                margin: [0, 5, 0, 5],
                bold: true,
              },
            ],

            [
              {
                text: "If Any, Name of the area(s) visited",
                margin: [0, 5, 0, 5],
              },
              {
                text: ":",
                margin: [0, 5, 0, 5],
                bold: true,
              },
            ],

            [
              {
                text: "Dates of travel",
                margin: [0, 5, 0, 5],
              },
              {
                text: ": ",
                margin: [0, 5, 0, 5],
                bold: true,
              },
            ],
          ],
        },
      },
      {
        text:
          "Have you been in contact with people being infected, suspected or diagnosed with COVID-19?",
        margin: [0, 2, 0, 0],
      },
      {
        text: "(Yes/No) - ",
        margin: [0, 5, 0, 5],
        bold: true,
        fontSize: 13,
      },

      {
        text:
          "If any, You relationship with the people and your last conact date with them",
        margin: [0, 5, 0, 5],
      },
      {
        text: "",
        margin: [0, 5, 0, 20],
        bold: true,
        fontSize: 13,
      },

      "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
      {
        text:
          "Please state whether you've experienced/are experiencing the following",
        margin: [0, 5, 0, 5],
        alignment: "center",
        fontSize: 14,
        bold: true,
      },
      {
        image: "diseases.png",
        fit: [400, 450],
      },
      {
        text:
          "I acknowledge that the information. I've given is accurate and complete.",
        margin: [0, 5, 0, 5],
        fontSize: 12,
        bold: true,
      },
      {
        text: "Date:",
        margin: [0, 5, 0, 5],
        alignment: "left",
        fontSize: 12,
        bold: true,
      },
      {
        text: "Name & Signature",
        margin: [0, 10, 0, 10],
        alignment: "right",
        fontSize: 12,
        bold: true,
      },
    ],
  };
  var pdfDoc = printer.createPdfKitDocument(dTemplate);
  pdfDoc.pipe(
    fs.createWriteStream(__dirname + "/public/Self-DeclarationForm.pdf")
  );
  pdfDoc.end();
  setTimeout(function () {
    res.render("DeclarationForm.ejs", { htno: student_htno });
  }, 100);
});

app.get("/editDetails", function (req, res) {
  res.render("index", {
    name: student_name.toUpperCase(),
    htno: student_htno,
    date: f_date,
    method: "/dRequest",
    submitText: "Generate Self Declaration",
  });
});

app.get("/", function (req, res) {
  res.render("index", {
    name: "",
    htno: "",
    date: "",
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

// playground requires you to assign document definition to a variable called dd

// var dTemplate = {
//   content: [
//     {
//       text: "SRI VENKATESWARA ARTS COLLEGE-TIRUPATI",
//       fontSize: 19,
//       alignment: "center",
//       bold: true,
//       margin: [0, 5],
//       width: "80%",
//     },
//     {
//       text:
//         "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
//     },
//     {
//       text: "Self-Declaration",
//       decoration: "underline",
//       bold: true,
//       margin: [0, 10, 0, 10],
//       fontSize: 15,
//       alignment: "center",
//     },
//     {
//       text:
//         ' We are concerned a about your health, safety and hygiene. In the interest of your well-being and that of everyone at the venue, you are requested to declare if you have any of the followng listed symptoms by using " Yes " (Yes, I have) or " No " (No, I dont not have).',
//       fontSize: 12,
//       margin: [0, 10, 0, 10],
//     },
//     {
//       layout: "noBorders",
//       fontSize: 14,
//       margin: [0, 20, 0, 20],
//       table: {
//         headerRows: 0,
//         widths: [130, 50, 50, 130, 50, 50],
//         body: [
//           ["Cough", ":", disease_1, "Fever", ":", disease_2],
//           [
//             "Cold/Runny Nose",
//             ":",
//             disease_3,
//             "Breathing Problem",
//             ":",
//             disease_4,
//           ],
//         ],
//       },
//     },
//     {
//       text:
//         "I'm certifying that I've NOT tested Positive for the Coronavirus or identified as a potential carrier of the COVID-19 Virus.",
//       margin: [0, 20, 0, 20],
//       bold: true,
//       fontSize: 15,
//     },
//     {
//       layout: "noBorders",
//       fontSize: 14,
//       margin: [0, 20, 0, 20],
//       table: {
//         headerRows: 0,
//         widths: [150, 30, "auto"],
//         body: [
//           ["Candidate Name", ":", student_name.toUpperCase()],
//           ["Group", ":", student_group],
//           ["Hallticket", ":", student_htno],
//           ["Roll No", ":", student_rollno],
//           ["Phone No", ":", student_mobile],
//         ],
//       },
//     },

//     {
//       text: "Signatrue of the Candidate",
//       alignment: "right",
//       margin: [0, 50, 0, 20],
//       bold: true,
//     },

//     {
//       text: "COVID-19 INSTRUCTIONS TO THE CANDIDATE",
//       alignment: "center",
//       decoration: "underline",
//       margin: [0, 10, 0, 10],
//       bold: true,
//     },
//     {
//       // for numbered lists set the ol key

//       ol: [
//         "Candidates must maintain social distancing starting from point of entry in the exam venue till his/her exit from the exam venue.",
//         "Candidate must must bring their own Mask and Personal Hand sanitizer.",
//         {
//           text:
//             "Candidates will have to bring a hard copy of signed Self-Declartion(this form).",
//           bold: true,
//         },
//         {
//           text: "Candidates must bring thier aadhar card.",
//           bold: true,
//         },
//       ],
//     },

//     {
//       text:
//         "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
//       margin: [0, 50, 0, 0],
//     },
//     {
//       text: "Generated on " + date,
//       fontSize: 8,
//       italics: true,
//     },
//   ],
// };
