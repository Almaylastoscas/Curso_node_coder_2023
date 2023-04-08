class ProductManager {
  constructor() {
    this.products = [];
  }
  addProducts({ title, description, price, thumbnail, Stock }) {
    let id = 0;
    if (this.products.length === 0) {
      id = 1;
    } else {
      let lastProducts = this.products[this.products.length - 1];
      id = lastProducts.id + 1;
    }
    let producto = { title, description, price, thumbnail, id, Stock };
    this.products.push(producto);
  }
  getProducts() {
    console.log(this.products);
    return this.products;
  }
  getProductById = (id) => {
    let resultado = this.products.find((e) => e.id === id);
    if (resultado) {
      console.log(resultado);
      return resultado;
    } else {
      console.log("NOT FUND");
    }
  };
}

// let newProduct = new ProductManager();
// newProduct.addProducts({
//   title: "zapatilla nike",
//   description: "zapatilla deportive",
//   price: 535,
//   thumbnail: "./fotos.js",
//   Stock: "10",
// });
// newProduct.addProducts({
//   title: "zapatilla adidas",
//   description: "zapatilla deportive",
//   price: 334,
//   thumbnail: "./fotos2.js",
//   Stock: "5",
// });
// newProduct.getProducts();
// newProduct.getProductById(1);
// newProduct.getProductById(8);
