import { UpdateResult } from "typeorm";
import { dataSource } from "../config/dataSource";
import { Product } from "../entities/product.entity";

const productRepository = dataSource.getRepository(Product);

class ProductService {
  static createProduct = async (data: Product, callBack: Function) => {
    var product = new Product();
    product.name = data.name;
    product.quantity = data.quantity;
    product.price = data.price;
    //ileride kullanıcılar kayıt olurken rol bilgisi de girilmek istenebilir.
    //product.role = data.role | undefined;

    try {
      const savedProduct = (await productRepository.save(product)) as Product;
      return callBack(null, savedProduct);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getAllProducts = async (callBack: Function) => {
    try {
      const products = await Product.find();
      return callBack(null, products);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getProductById = async (id: number, callBack: Function) => {
    try {
      const product = await Product.findOneBy({ id: id });
      return callBack(null, product);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static updateProduct = async (
    id: number,
    data: {
      product_name: string | undefined;
      quantity: number | undefined;
      price: number | undefined;
    },
    callBack: Function
  ) => {
    try {
      const product: UpdateResult = await dataSource
        .createQueryBuilder()
        .update(Product)
        .set({
          name: data.product_name,
          quantity: data.quantity,
          price: data.price,
        })
        .where("id = :id", { id: id })
        .execute();
      if (product.affected == 1) {
        return callBack(null, "success");
      }
      return callBack(0, "failed");
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static deleteProduct = async (id: number, callBack: Function) => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where("id = :id", { id: id })
        .execute();
      if (result.affected == 0) {
        return callBack("error", "An error occured when deleting.");
      }
      return callBack(null, "Successfully deleted.");
      return callBack(null, result);
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  };
}

export default ProductService;
