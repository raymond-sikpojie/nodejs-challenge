const express = require("express");
const validator = require("validator")
const axios = require("axios")
const path = require("path");
const fs = require("fs")
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

// Make a post req which contains the url and the selected fields
app.post("/", (req, res) => {
    try {
const {csv} = req.body
let csvUrl = csv.url
let selectFieldsArray = csv.select_fields

    // validate url 
//    if(!validator.isURL(csvUrl)) {
//      return res.status(400).send("Enter a valid url")
//    }


// Function to get data from csv file
   const urlHandler = async () => {
    const url = axios.get(csvUrl)
    const getCsv = await url;

    let csvData = getCsv.data
    // console.log(csvData)
    
    // Write data to a file
    fs.writeFile("Newfile.csv", csvData, (err) => {
      if(err) throw err;
      console.log("File saved")
    })

    // Convert csv to json
    const csvFilePath = path.join(__dirname, "Newfile.csv");

    const jsonArray = await csvtojson().fromFile(csvFilePath)
    // console.log(jsonArray)
    // console.log(selectFieldsArray)


    // Map content of jsonArray to the selected fields array
    if(!selectFieldsArray) {
      // console.log(jsonArray)
    }
    
    // loop through the select fields array to get individual item
  const fields =  selectFieldsArray.map((item) => {
      return item;
    })
  
  console.log(fields)
  

   }
   
// Call function
   urlHandler()

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