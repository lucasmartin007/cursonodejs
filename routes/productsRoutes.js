const express = require("express");

// const faker = require("faker");

const ProductsService = require("../services/productsService");

const validatorHandler = require("../middlewares/validatorHandler");

const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/productsSchema");

const service = new ProductsService();

const router = express.Router();

router.get("/", async (req, res) => {
// res.json(
//     [
//         {
//             "name":"Product 1",
//             "price": 1000
//         },
//         {
//             "name":"Product 2",
//             "price": 2000
//         },
//         {
//             "name":"Product 3",
//             "price": 3000
//         }
//     ]
// );
const products = await service.find();
res.json(products);
});

router.get("/:id",
validatorHandler(getProductSchema, "params"), 
async (req, res, next) => {
try {
const { id } = req.params;
// if(parseInt(id_producto) === 999){
//     res.status(404).json({
//         "message":"Not found"
//     })
// }else{
//     res.json({
//     id: id_producto,
//     name: "Product 1",
//     price: 1000
//     });
// }
const product = await service.findOne(id);
res.json(product);
} catch (error) {
next(error);
}
});

router.post("/", 
validatorHandler(createProductSchema, "body"),
async (req, res) => {
// res.status(201).json({
//     message:"Created",
//     data:req.body
// });
const newProduct = await service.create(req.body);
res.status(201).json(newProduct);
});

router.patch('/:id', 
validatorHandler(getProductSchema, "params"),
validatorHandler(updateProductSchema, "body"),
async (req, res, next) => {
try {
const { id } = req.params;
const body = req.body;
// res.json({
// message: 'update',
// data: body,
// id,
// });
const product = await service.update(id, body);
res.json(product);
} catch (error) {
next(error);
}
});

router.delete('/:id', async (req, res) => {
const { id } = req.params;
// res.json({
// message: 'deleted',
// id,
// });
const resp = await service.delete(id);
res.json(resp);
});

// router.get("/desde-limite", (req, res) => {
// const { limit, offset } = req.query;
// if(limit && offset){
// res.json({
// desde:parseInt(offset), hasta:parseInt(limit)
// });
// }else{
// res.send("No hay parametros");
// }
// });

module.exports = router;
