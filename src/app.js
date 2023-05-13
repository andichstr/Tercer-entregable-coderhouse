import express from 'express';
import { ProductManager } from './ProductManager.js';
import path from 'path';

const app = express();
const port = 8080;
const service = new ProductManager();
await service.customConstructor(path.resolve() + "\\src\\products.json");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    let products = await service.getProducts();
    if (!!products){
        if (!!req.query.limit && req.query.limit >= 0 && products.length > req.query.limit) products = products.slice(0, req.query.limit);
        return res.status(200).json({
            status: "Success",
            message: "Products found",
            data: products
        });
    }else return res.status(404).json({
            status: "Error",
            message: "Products not found",
            data: null
        });
});

app.get('/products/:pid', async (req, res) => {
    const id = req.params.pid;
    const product = await service.getProductById(id);
    if (!!product) return res.status(200).json({
        status: "Success",
        message: "Product found",
        data: product
    })
    else return res.status(404).json({
        status: "Error",
        message: `Product with id=${id} not found`,
        data: null
    });
});

app.get('*', (req, res) => {
    return res.status(404).json({
        status: "Error",
        message: "Page not found",
        data: null
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
