const faker = require("faker");

const boom = require("@hapi/boom");

class ProductsService{
constructor(){
this.products = [];
this.generate();
}

generate(){
//generar los productos
    // let prods = [];
    for (let index = 0; index < 100; index++) {
        this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean()
        })        
    }
    // this.products = prods;
}

create(data){
const newProduct = {
id:faker.datatype.uuid(),
...data
};

this.products.push(newProduct);
return newProduct;
}

find(){
// return this.products;
return new Promise((resolve, reject) => {
setTimeout(() => {
resolve(this.products);
}, 3000);
});
}

async findOne(id_producto){
// const next = this.getTotal();
const product = this.products.find(item => item.id === id_producto);
if(!product){
throw boom.notFound("product not found");
}

if(product.isBlock){
throw boom.conflict("product is blocked");
}
return product;
}

async update(id, changes){
// try{
const index = this.products.findIndex(item => item.id === id);

if(index === -1){
throw boom.notFound("product not found");
}

const product = this.products[index];
this.products[index] = {
...product,
...changes
};
return this.products[index];
// }catch(error){
// res.status(404).json({
// message: error
// });
// }
}

async delete(id){
const index = this.products.findIndex(item => item.id === id);
if(index === -1){
// throw new Error("Product not found");
throw boom.notFound("product not found");
}
this.products.splice(index, 1);
return { id };
}

}

module.exports = ProductsService;
