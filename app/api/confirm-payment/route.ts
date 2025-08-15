import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, paymentMethodId } = await request.json()

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const isSuccess = Math.random() > 0.1

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        paymentIntent: {
          id: paymentIntentId,
          status: "succeeded",
          amount_received: Math.round(Math.random() * 5000 + 1000), // Random amount
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        error: {
          message: "Your card was declined. Please try a different payment method.",
          type: "card_error",
        },
      })
    }
  } catch (error) {
    console.error("Payment confirmation failed:", error)
    return NextResponse.json({ error: "Payment confirmation failed" }, { status: 500 })
  }
}
