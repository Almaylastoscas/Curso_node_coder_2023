const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.init(path);
  }

  init(path) {
    //verifico si existe el archivo
    let file = fs.existsSync(path);
    //console.log(file)
    if (!file) {
      //si no existe lo creo
      fs.writeFileSync(path, "[]");
      console.log("file created at path: " + this.path);
      return "file created at path: " + this.path;
    } else {
      //si existe cargo los usuarios en la memoria del programa
      this.products = JSON.parse(fs.readFileSync(path, "UTF-8"));
      console.log("data recovered");
      return "data recovered";
    }
  }
  async add_pruduct({ title, description, price, thumbnail, Stock }) {
    try {
      //defino el objeto que necesito agregar al array
      let data = { title, description, price, thumbnail, Stock };
      //si la memoria tiene usuarios
      if (this.products.length > 0) {
        //busco el id del último elemento y le sumo 1
        let next_id = this.products[this.products.length - 1].id + 1;
        //agrego la propiedad al objeto
        data.id = next_id;
      } else {
        //en caso que no tenga: asigno el primer id
        data.id = 1;
      }
      //agrego el objeto (usuario) a la memoria del programa
      this.products.push(data);
      //convierto a texto plano el array
      let data_json = JSON.stringify(this.products, null, 2);
      //sobre-escribo el archivo
      await fs.promises.writeFile(this.path, data_json);
      console.log("id´ creado del producto: " + data.id);
      return "id´s producto: " + data.id;
    } catch (error) {
      console.log(error);
      return "error: al crear el producto";
    }
  }
  getProducts() {
    try {
      if (this.products.length === 0) {
        console.log("Not found");
      }
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.log(error);
      return "getProduct: Error";
    }
  }
  getProductsById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        console.log("Not Found");
        return null;
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
      return "GetProductById : Error";
    }
  }
  async update_product(id, data) {
    //data es el objeto con las propiedades que necesito modificar del usuario
    try {
      //busco el usuario
      let one = this.getProductsById(id);
      if (!one) {
        console.log("not found editado");
        return "Not found editado";
      }
      //itero para modificar la propiedad correspondiente
      for (let prop in data) {
        //console.log(prop)
        one[prop] = data[prop];
      }
      //convierto a texto plano el array
      let data_json = JSON.stringify(this.products, null, 2);
      //sobre-escribo el archivo
      await fs.promises.writeFile(this.path, data_json);
      console.log("updated user: " + id);
      return "updated user: " + id;
    } catch (error) {
      console.log(error);
      return "UpdateProduct: Error";
    }
  }

  async destroy_products(id) {
    try {
      //saco el usuario
      let one = this.getProductsById(id);
      if (!one) {
        console.log("not found eliminado");
        return "Not found eliminando";
      }
      this.products = this.products.filter((each) => each.id !== id);
      //console.log(this.users)
      //convierto a texto plano el array
      let data_json = JSON.stringify(this.products, null, 2);
      //sobre-escribo el archivo
      await fs.promises.writeFile(this.path, data_json);
      console.log("delete user: " + id);
      return "delete user: " + id;
    } catch (error) {
      console.log(error);
      return "DeleteProduct: Error ";
    }
  }
}

async function manager() {
  let newProduct = new ProductManager("./products.json");
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto1.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto2.js",
    Stock: "10",
  });

  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto3.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla deportive static",
    price: 2350,
    thumbnail: "./foto4.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla vestir poractive",
    price: 998,
    thumbnail: "./foto5.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla deportive super starr",
    price: 1390,
    thumbnail: "./foto6.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla urbana blsck",
    price: 1425,
    thumbnail: "./foto7.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla urbana pro white",
    price: 835,
    thumbnail: "./foto8.js",
    Stock: "10",
  });
  await newProduct.add_pruduct({
    title: "zapatilla nike",
    description: "zapatilla deportive react ",
    price: 2530,
    thumbnail: "./foto9.js",
    Stock: "10",
  });
  // newProduct.getProducts();
  // newProduct.getProductsById(9);
  // newProduct.update_product(9, {
  //   title: "Zapatilla NIke modificada  ",
  //   description: "zapatilla nike Editada",
  // });
  newProduct.destroy_products(10);
}
manager();
