import { dataSource } from "../config/dataSource";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { ProductToOrder } from "../entities/productToOrder.entity";
import { User } from "../entities/user.entity";

class OrderService {
  static createOrder = async (
    data: {
      user_id: number;
      items: { product_id: number; quantity: number }[];
    },
    callBack: Function
  ) => {
    try {
      var order = Order.create();
      const userOfOrder = await User.findOneBy({
        id: data.user_id,
      }).then((user) => {
        if (user) {
          order.user = user;
        } else {
          return callBack(
            Error(`Unable to find user. UserID ${data.user_id} does not exist.`)
          );
        }
      });
      await order.save();
      data.items.forEach((item) => {
        Product.findOneBy({ id: item.product_id }).then((product) => {
          if (product) {
            if (product.quantity >= item.quantity) {
              const productToOrderInstance = new ProductToOrder();
              productToOrderInstance.order = order;
              productToOrderInstance.product = product;
              productToOrderInstance.quantity = item.quantity;
              product.quantity -= item.quantity;
              product.save();
              productToOrderInstance.save();
            } else {
              return callBack(Error(`Insufficient stock on ${product.name}.`));
            }
          } else {
            return callBack(
              Error(
                `Unable to find product. Product ID ${item.product_id} does not exist.`
              )
            );
          }
        });
      });
      const savedOrder = await dataSource.manager.save(order);
      return callBack(null, savedOrder);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getAllOrders = async (callBack: Function) => {
    try {
      const orders = await Order.find({
        relations: {
          user: true,
          productToOrder: true,
        },
      });
      return callBack(null, orders);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getOrderById = async (order_id: number, callBack: Function) => {
    try {
      const order = await Order.findOneBy({ id: order_id });
      return callBack(null, order);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static getAllOrdersOfUserId = async (user_id: number, callBack: Function) => {
    try {
      const order = await Order.find({
        relations: {
          user: true,
          productToOrder: true,
        },
      });
      return callBack(null, order);
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static updateOrder = async (
    order_id: number,
    data: {
      user_id: number | undefined;
      products: Product[] | undefined;
    },
    callBack: Function
  ) => {
    try {
    } catch (error) {
      console.log(error);
      return callBack(error);
    }
  };

  static deleteOrder = async (order_id: number, callBack: Function) => {
    try {
      const result = await dataSource
        .createQueryBuilder()
        .delete()
        .from(Order)
        .where("order_id = :order_id", { order_id: order_id })
        .execute();
      if (result.affected == 0) {
        return callBack("error", "An error occured when deleting.");
      }
      return callBack(null, "Successfully deleted.");
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  };
}

export default OrderService;
