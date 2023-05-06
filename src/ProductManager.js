import fs from 'fs/promises';

export class ProductManager {
    constructor () {}

    async customConstructor(path){
        this.path = path;
        this.products = await this.getProducts();
    }

    async getLastId() {
        const products = await this.getProducts();
        if(products.length!=0) return products[products.length-1].id;
        else return -1;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const id = await this.getLastId() + 1;
        product.id = id;
        products.push(product);
        this.products = products;
        await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");
    }

    async getProducts() {
        try {
            const response = await fs.readFile(this.path, "utf-8");
            if (response) {
                return JSON.parse(response);
            } else {
                return [];
            }
        } catch (error) {
            console.log(`Error al leer el archivo de productos: ${error.message}`);
            return [];
        }
    }

    async getProductById(id) {
        let foundProduct;
        const products = await this.getProducts();
        for (let i = 0; i<products.length; i++) {
            if (products[i].id == id){
                foundProduct = products[i];
                i = products.length;
            }
        }
        if(!!foundProduct) return foundProduct;
        else console.log(`Product with id: ${id} not found.`);
    }

    async updateProduct(id, product) {
        const products = await this.getProducts();
        product.id = id;
        for(let i=0; i<products.length; i++) {
            if(products[i].id == id) {
                products[i] = product;
                i = products.length;
            }
        }
        this.products = products;
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        products = products.filter(product => product.id == id);
        this.products = products;
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }
}
