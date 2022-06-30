function routerApi(app){
    app.use("/api/products", require("./productsRoutes"));
}

module.exports = routerApi;