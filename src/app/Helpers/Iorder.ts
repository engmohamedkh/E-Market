import { IProduct } from "./Iproduct";

export interface Iorder {
    orderDate: Date;
    orderAddress: string;
    orderID: number;
    customerID: string;
    Opened: boolean;
    products: { prod: IProduct, quantity: number }[]
}