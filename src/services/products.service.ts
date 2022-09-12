import { UpdateResult } from "typeorm";
import { dataSource } from "../config/dataSource";
import { Product } from "../entities/Product";

export async function createProduct(data: Product, callBack: Function) {
  try {
    var product = new Product();
    product.product_name = data.product_name;
    product.amount = data.amount;
    product.price = data.price;
    //product.role = data.role | undefined;

    await dataSource.manager.save(product);
    return callBack(null, product);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getAllProducts(callBack: Function) {
  try {
    const products = await Product.find();
    return callBack(null, products);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getProductById(id: number, callBack: Function) {
  try {
    const product = await Product.findOneBy({ product_id: id });
    return callBack(null, product);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getProductByProductname(
  product_name: string,
  callBack: Function
) {
  try {
    const product = await Product.findOneBy({ product_name: product_name });
    return callBack(null, product);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function updateProduct(
  id: number,
  data: {
    product_name: string | undefined;
    amount: number | undefined;
    price: number | undefined;
  },
  callBack: Function
) {
  try {
    const product: UpdateResult = await dataSource
      .createQueryBuilder()
      .update(Product)
      .set({
        product_name: data.product_name,
        amount: data.amount,
        price: data.price,
      })
      .where("product_id = :product_id", { product_id: id })
      .execute();
    return callBack(null, product);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function deleteProduct(id: number, callBack: Function) {
  try {
    const result = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("product_id = :product_id", { product_id: id })
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
}
