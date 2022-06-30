const express = require("express");

const cors = require("cors");

const met_routerapi = require("./routes/routes");

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler.js");

const app = express();
// const port = 3010;
const port = process.env.PORT || 3010;

app.use(express.json());

const whitelist = ["http://localhost:8080", "https://myapp.co"];

const cors_options = {
origin: (origin, callback) => {
if(whitelist.includes(origin) || !origin){
callback(null, true);
}else{
callback(new Error("Origen no permitido"));
}
}
};

app.use(cors(cors_options));

app.get("/", (req, res) => {
res.send("Servidor de express");
});

app.get("/nueva-ruta", (req, res) => {
res.send("Nueva ruta");
});

met_routerapi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
console.log(`Escuchando en el puerto ${ port }`);
});