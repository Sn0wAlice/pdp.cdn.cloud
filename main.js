const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");
const app = express();
const PORT = process.env.PORT || 3000;

// Dossier où on stocke les SVG
const pdpDir = path.join(__dirname, "public", "pdp");
if (!fs.existsSync(pdpDir)) {
  fs.mkdirSync(pdpDir, { recursive: true });
}

// Middleware pour servir les assets
app.use("/assets/pdp", express.static(pdpDir));

// Route /new
app.get("/new/:uuid/:key", async (req, res) => {
  try {

    // check uuid is a valid uuid
    const { uuid } = req.params;
    if (!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }
    // check key is a valid key
    const { key } = req.params;
    if (key !== config.security_key) {
      return res.status(403).json({ error: "Invalid key" });
    }

    console.log("Generating new image for user:", uuid);

    const seed = uuidv4();
    const filename = `${uuid}.svg`;
    const url = `https://api.dicebear.com/9.x/${config.collection}/svg?backgroundColor=${config.background}&seed=${seed}`;
    const filepath = path.join(pdpDir, filename);

    const response = await axios.get(url, { responseType: "stream" });

    // delete file if it exists
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      res.json({ url: `/assets/pdp/${filename}` });
    });

    writer.on("error", (err) => {
      console.error("Error writing file:", err);
      res.status(500).json({ error: "Failed to save image" });
    });
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`CDN API running on http://localhost:${PORT}`);
});
