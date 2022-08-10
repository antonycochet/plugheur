import express from "express";
import bodyParser from "body-parser";
import path from "path";
import readCsv from "../core/util/readCsv";

const buildDir = path.join(process.cwd() + "/build");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildDir));

app.get("/serials", async function (req, res) {

    try {
            const result = await readCsv(req.query.serial)
            res.json(result)
        } catch (error) {
            console.log(error)
    }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});