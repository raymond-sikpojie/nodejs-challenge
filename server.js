const express = require("express");
const validator = require("validator")
const axios = require("axios")
const path = require("path");
const csvtojson =require("csvtojson")
const app = express()
app.use(express.json())


// const url = "https://docs.google.com/spreadsheets/d/1i3wYp_mKBTVm88vvhR9w8X-jL6l3vCSmLpO2JA1dOo4/edit?usp=sharing"

app.get("/", (req, res) => {
    res.send("Hello world")
})

// Request to get csv file
app.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "test.csv"))
})

// Send information which contains the url
app.post("/", (req, res) => {
    try {
const {csv} = req.body
let csvUrl = csv.url

    // validate url 
//    if(!validator.isURL(csvUrl)) {
//      return res.status(400).send("Enter a valid url")
//    }


// Funtion to get data from csv file
   const urlHandler = async () => {
    const url = axios.get(csvUrl)
    const getCsv = await url;

    let csvData = getCsv.data
    console.log(csvData)
    // console.log(path.join(__dirname, "test"))
   }
   
// Call function
   urlHandler()
   
    // res.send(csv)
  res.send(req.body)

    }catch (e) {
      return  res.send(e)
    }
   
})

// set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});