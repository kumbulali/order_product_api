import { UpdateResult } from "typeorm";
import { dataSource } from "../config/dataSource";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export async function createOrder(data: Order, callBack: Function) {
  try {
    var order = new Order();
    order.user_id = data.user_id;
    order.items = data.items;

    await dataSource.manager.save(order);
    return callBack(null, order);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getAllOrders(callBack: Function) {
  try {
    const orders = await Order.find();
    return callBack(null, orders);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getOrderById(order_id: number, callBack: Function) {
  try {
    const order = await Order.findOneBy({ order_id: order_id });
    return callBack(null, order);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function getAllOrdersOfUserId(
  user_id: number,
  callBack: Function
) {
  try {
    const order = await Order.findBy({ user_id: user_id });
    return callBack(null, order);
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function updateOrder(
  order_id: number,
  data: {
    user_id: number | undefined;
    items: Product[] | undefined;
  },
  callBack: Function
) {
  try {
    const order: UpdateResult = await dataSource
      .createQueryBuilder()
      .update(Order)
      .set({
        user_id: data.user_id,
        items: data.items,
      })
      .where("order_id = :order_id", { order_id: order_id })
      .execute();
    console.log(order);
    if (order.affected == 1) {
      return callBack(null, "success");
    }
    return callBack(0, "failed");
  } catch (error) {
    console.log(error);
    return callBack(error);
  }
}

export async function deleteOrder(order_id: number, callBack: Function) {
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
    return callBack(null, result);
  } catch (error) {
    console.log(error);
    callBack(error);
  }
}
