import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { ok } from "assert";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };
      if (!userId || !orderId) {
        throw new Error("Missing metadata");
      }
      const billingDetails = session.customer_details!.address;
      const shippingDetails = session.shipping_details!.address;
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,

          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingDetails!.city!,
              country: shippingDetails!.country!,
              postalCode: shippingDetails!.postal_code!,
              street: shippingDetails!.line1!,
              state: shippingDetails!.state!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingDetails!.city!,
              country: billingDetails!.country!,
              postalCode: billingDetails!.postal_code!,
              street: billingDetails!.line1!,
              state: billingDetails!.state!,
            },
          },
        },
      });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Somthing went wrong", ok: false },
      { status: 500 }
    );

    
  }
}
