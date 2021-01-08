SET UP APP
run "npm install"

After installing dependencies, run node server.js from the root directory

This is my solution to the challenge given below. It is implemented in node.js.

Create a single express API endpoint route [HTTP POST] that accepts the following payload
{
"csv":{
"url": "https://linktocsv",
"select_fields": ["First Name", "Last Name", "Age"],
}
}

Your endpoint should (among other things):

1. Ensure the URL contains a valid CSV
2. Convert the CSV to a JSON array
3. The JSON array should only contain the fields specified in the "select_fields" parameter.
   An example: If the CSV has 2 items, and the following fields, "First Name, Last Name, Age, DOB, Mobile, Email, MatricNumber"
   Based on the example payload shared above, the returned JSON array should have this structure:
   [
   {
   "First Name":"Ade",
   "Last Name":"Stark",
   "Age": 21
   },
   {
   "First Name":"Ade",
   "Last Name":"Stark",
   "Age": 21
   }
   ]
   (PS: If the select_fields parameter is not passed, your service should return all fields)
4. Once you have parsed the results, generate a random identifier and return an API response that looks like the below:
   {
   "conversion_key": "ZEMAHBb54vkFXPHA9jHY6Xp3gMnMAKYg",
   "json": [
   {
   "First Name":"Ade",
   "Last Name":"Stark",
   "Age": 21
   },
   {
   "First Name":"Ade",
   "Last Name":"Stark",
   "Age": 21
   }
   ]
   }
