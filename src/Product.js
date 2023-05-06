export class Product{
    constructor(title, description, price, thumbnail, code, stock) {
        if (!!title && !!description && !!price && !!thumbnail && !!code && !!stock) {
            this.id = null;
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;
        } else throw new Error("All properties must be set");
    }

    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getPrice() {
        return this.price;
    }
    getThumbnail() {
        return this.thumbnail;
    }
    getCode() {
        return this.code;
    }
    getStock() {
        return this.stock;
    }
    setId(id) {
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setPrice(price) {
        this.price = price;
    }
    setThumbnail(thumbnail) {
        this.thumbnail = thumbnail;
    }
    setCode(code) {
        this.code = code;
    }
    setStock(stock) {
        this.stock = stock;
    }
}