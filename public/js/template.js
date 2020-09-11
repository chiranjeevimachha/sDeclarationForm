// playground requires you to assign document definition to a variable called dd

export var dd = {
  content: [
    {
      columns: [
        {
          image: "data:image",
          width: "20%",
        },
        {
          text: "SRI VENKATESWARA ARTS COLLEGE-TIRUPATI",
          fontSize: 19,
          alignment: "center",
          bold: true,
          margin: [0, 5],
          width: "80%",
        },
      ],
    },
    {},
    {
      text:
        "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
    },
    {
      text: "Self-Declaration",
      decoration: "underline",
      bold: true,
      margin: [0, 10, 0, 10],
      fontSize: 17,
      alignment: "center",
    },
    {
      text:
        ' We are concerned a about your health, safety and hygiene. In the interest of your well-being and that of everyone at the venue, you are requested to declare if you have any of the followng listed symptoms by using " Y " (Yes, I have) or " N " (No, I dont not have).',
      fontSize: 14,
      margin: [0, 10, 0, 10],
    },
    {
      layout: "noBorders",
      fontSize: 14,
      margin: [0, 20, 0, 20],
      table: {
        headerRows: 0,
        widths: [130, 130, 130, 130],
        body: [
          ["Cough", ":", "Fever", ":"],
          ["Cold/Nou", ":", "Breathing Problem", ":"],
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
        widths: [150, 150, 150, 150],
        body: [
          ["Candidate Name", ":"],
          ["Group", ":"],
          ["Hallticket", ":"],
          ["Roll No", ":"],
          ["Phone No", ":"],
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
            "Candidates will have to bring a signed Self-Declartion(this form).",
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
      text: "Generated at ",
      fontSize: 10,
    },
  ],
};
