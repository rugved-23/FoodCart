"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Star, Clock, Truck, ChefHat } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-35 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 4,
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "35-50 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 6,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.1,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
]

const cuisines = [
  { name: "Indian", icon: "🍛", color: "bg-orange-100 text-orange-800" },
  { name: "Italian", icon: "🍕", color: "bg-red-100 text-red-800" },
  { name: "Chinese", icon: "🥢", color: "bg-yellow-100 text-yellow-800" },
  { name: "Mexican", icon: "🌮", color: "bg-green-100 text-green-800" },
  { name: "Japanese", icon: "🍣", color: "bg-blue-100 text-blue-800" },
  { name: "American", icon: "🍔", color: "bg-purple-100 text-purple-800" },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("New York, NY")

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover the best food & drinks</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Order from your favorite restaurants and get it delivered fast
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex items-center flex-1 px-4 py-2 border-r border-gray-200">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 focus-visible:ring-0 text-gray-800"
                  />
                </div>
                <div className="flex items-center flex-1 px-4 py-2">
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <Input
                    placeholder="Search for restaurants or food"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 text-gray-800"
                  />
                </div>
                <Link href="/restaurants">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Browse Restaurants
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Food Icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-10 text-4xl opacity-20"
        >
          🍕
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-32 right-20 text-4xl opacity-20"
        >
          🍔
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 left-20 text-4xl opacity-20"
        >
          🍜
        </motion.div>
      </section>

      {/* Cuisines Section */}
      <section className="py-16 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What's on your mind?</h2>
            <p className="text-gray-600 text-lg">Choose from a variety of cuisines</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {cuisines.map((cuisine, index) => (
              <motion.div
                key={cuisine.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Link href={`/restaurants?cuisine=${cuisine.name.toLowerCase()}`}>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="text-4xl mb-3">{cuisine.icon}</div>
                      <Badge className={cuisine.color}>{cuisine.name}</Badge>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular restaurants</h2>
            <p className="text-gray-600 text-lg">Top-rated restaurants in your area</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/restaurant/${restaurant.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {restaurant.featured && <Badge className="absolute top-3 left-3 bg-orange-500">Featured</Badge>}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                      <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {restaurant.deliveryTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Free delivery
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why choose us?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="h-12 w-12 text-orange-500" />,
                title: "Fast Delivery",
                description: "Get your food delivered in 30 minutes or less",
              },
              {
                icon: <ChefHat className="h-12 w-12 text-orange-500" />,
                title: "Quality Food",
                description: "Fresh ingredients and top-rated restaurants",
              },
              {
                icon: <Star className="h-12 w-12 text-orange-500" />,
                title: "Best Experience",
                description: "Easy ordering and excellent customer service",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
