const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Melayani file HTML

// Endpoint untuk menerima data dan menyimpan ke file JSON
app.post("/submit", (req, res) => {
  const newData = req.body;

  // Baca file JSON dan tambahkan data baru
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file.");
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).send("Invalid JSON format.");
    }

    jsonData.push(newData);

    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).send("Error writing to file.");
      }
      res.status(200).send("Terima Kasih Ucapannya Bosku🙏");
    });
  });
});

app.get("/data", (req, res) => {
  // Baca file JSON dan kirimkan isinya
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file.");
    }

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData); // Kirim data JSON ke client
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).send("Invalid JSON format.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
