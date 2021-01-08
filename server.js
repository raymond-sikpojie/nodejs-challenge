const express = require("express");
const validator = require("validator")
const axios = require("axios")
const path = require("path");
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
const csvtojson =require("csvtojson");
const { json } = require("body-parser");

const app = express()
app.use(express.json())


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
  const identifier = uuidv4();

   // Get the link to csv 
   const urlHandler = async (csvLink) => {
    const url = axios.get(csvLink)
    const getCsv = await url;
    
    let csvData = getCsv.data

    fs.writeFile("Newfile.csv", csvData, (err) => {
      if(err) throw err;
    })
    
    // convert csv to json
    const csvFilePath = path.join(__dirname, "Newfile.csv");
    const jsonArray = await csvtojson().fromFile(csvFilePath)

    // if select_fields array is empty, return jsonArray 
    if(selectFieldsArray === []) {
      return jsonArray
    }

    // Parse jsonArray here to filter out unwanted fields
    res.send({conversion_key: identifier, json: jsonArray})
}
    
      urlHandler(csvUrl) // insert link to csv as the function argument

    } catch (e) {
        return  res.send(e)
    }
   
})

// set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});