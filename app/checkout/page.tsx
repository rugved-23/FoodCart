"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, MapPin, Clock, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormData {
  firstName: string
  lastName: string
  address: string
  city: string
  zipCode: string
  phone: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success" | "error">("form")
  const [paymentError, setPaymentError] = useState("")

  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const deliveryFee = 2.99
  const tax = total * 0.08
  const finalTotal = total + deliveryFee + tax

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const validateForm = () => {
    const required = ["firstName", "lastName", "address", "city", "zipCode", "phone"]
    if (paymentMethod === "card") {
      required.push("cardNumber", "expiryDate", "cvv", "cardName")
    }

    for (const field of required) {
      if (!formData[field as keyof PaymentFormData]) {
        return false
      }
    }

    if (paymentMethod === "card") {
      if (formData.cardNumber.replace(/\s/g, "").length < 16) return false
      if (formData.expiryDate.length < 5) return false
      if (formData.cvv.length < 3) return false
    }

    return true
  }

  const processPayment = async () => {
    if (paymentMethod === "card") {
      try {
        // Create payment intent
        const paymentIntentResponse = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalTotal }),
        })

        const paymentIntent = await paymentIntentResponse.json()

        if (!paymentIntentResponse.ok) {
          throw new Error(paymentIntent.error || "Failed to create payment intent")
        }

        // Simulate payment confirmation
        const confirmResponse = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            paymentMethodId: "pm_card_visa", // Simulated
          }),
        })

        const confirmResult = await confirmResponse.json()

        if (!confirmResult.success) {
          throw new Error(confirmResult.error?.message || "Payment failed")
        }

        return true
      } catch (error) {
        throw error
      }
    }

    // For other payment methods, simulate success
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return true
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!validateForm()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setPaymentStep("processing")
    setPaymentError("")

    try {
      await processPayment()

      setPaymentStep("success")

      // Clear cart and redirect after success
      setTimeout(() => {
        clearCart()
        router.push("/order-success")
      }, 2000)
    } catch (error: any) {
      setPaymentStep("error")
      setPaymentError(error.message || "Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  if (paymentStep === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95">
          <CardContent className="p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-green-600">Payment Successful!</h3>
            <p className="text-gray-600">Redirecting to order confirmation...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStep === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-red-600">Payment Failed</h3>
            <p className="text-gray-600 mb-4">{paymentError}</p>
            <Button onClick={() => setPaymentStep("form")} className="bg-orange-500 hover:bg-orange-600">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Secure Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Delivery Address */}
              <Card className="backdrop-blur-sm bg-white/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="backdrop-blur-sm bg-white/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <Alert>
                        <Lock className="h-4 w-4" />
                        <AlertDescription>Your payment information is encrypted and secure.</AlertDescription>
                      </Alert>

                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input
                            id="expiry"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        Pay with cash when your order is delivered. Please have exact change ready.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24 backdrop-blur-sm bg-white/95">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {items.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                        <span className="flex-1">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: 30-45 minutes</span>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading || !validateForm()}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {loading ? "Processing..." : `Place Order - $${finalTotal.toFixed(2)}`}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
