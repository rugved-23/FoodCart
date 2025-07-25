"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-green-600">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">Thank you for your order! Your delicious food is being prepared.</p>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Delivering to your address</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Track Your Order</Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
