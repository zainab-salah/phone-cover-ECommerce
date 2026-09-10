"use server"

import { db } from "@/db"
import { getAuthSession } from '@/auth'

export const getPaymentStatus = async ({orderId}:{
    orderId: string
}) => {
    const user = (await getAuthSession())?.user

    if(!user?.id || !user.email){
        throw new Error("You need to be logged in to see this page")
    }

    const order = await db.order.findFirst({
        where: {
            id: orderId,
            userId: user.id
        }, 
        include: {
            billingAddress: true,
            configuration: true,
            shippingAddress: true,
            user: true,
        }
    })
    if(!order){
        throw new Error("Order not found")
    }
    if(order.isPaid){
        return order
    } else{
        return false
    }
}
