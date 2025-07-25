import { type NextRequest, NextResponse } from "next/server"

// Simulate Stripe payment intent creation
export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "usd" } = await request.json()

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate successful payment intent creation
    const paymentIntent = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      status: "requires_payment_method",
    }

    return NextResponse.json(paymentIntent)
  } catch (error) {
    console.error("Payment intent creation failed:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
