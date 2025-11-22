const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const JSON_FILE_PATH = './assets/data.json';

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save-note', async (req, res) => {
  const newData = req.body;
  try {
    let fileData = [];
    try {
      const existingContent = await fs.readFile(JSON_FILE_PATH, 'utf8');
      fileData = JSON.parse(existingContent);
    } catch (err) {
      console.log('Starting new JSON file.');
    }

    fileData.push(newData);

    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(fileData, null, 2));

    res.status(200).json({ message: 'Data saved successfully to JSON file', data: newData });
  } catch (error) {
    console.error('Error writing to file:', error);
    res.status(500).json({ message: 'Failed to save data on the server' });
  }
});

app.get("/", async(req,res) => {
  res.status(200).send("<h1>App is live</h1>")
});
app.get("/api/get-note", async (req, res) => {
  try {
    try {
      const existingContent = await fs.readFile(JSON_FILE_PATH, "utf-8");
      res.status(200).send( existingContent );
    } catch (err) {
        console.log("getting JSON file.");
    }
  } catch (err) {
    console.error("Failed to retrieve file data");
    res.status(500).json({ message: "Could not retrieve data from server" });
  }
});

app.delete('api/delete-data', async(req,res) =>{

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
