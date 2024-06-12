import { Feedback } from '@/components/Themed';
export interface orderType{
    id: string,
    time: string,
    customer: string,
}

export interface AllorderType{
    unchecked: orderType[],
    onprogress: orderType[],
    done: orderType[],
    cancel: orderType[]
}
  
export interface productType{
    product_name: string,
    product_count: number,
    product_price: number
}
  
export interface orderDetailsType{
    order_id: string,
    customer_id: string,
    customer_name: string,
    ship_way: string,
    ship_address: string, 
    pay_way: string
    customer_phone: string,
    order_time: string,
    note: string,
    total_cost: number,
    content: productType[],
    type: string
}

export interface FeedbackType{
    status: "success" | "error" | "info" | "warning",
    title: string,
    press: boolean
}