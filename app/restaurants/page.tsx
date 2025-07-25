"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Star, Clock, MapPin, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    priceRange: "$$",
    distance: "1.2 km",
    offers: ["20% off", "Free delivery"],
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$",
    distance: "0.8 km",
    offers: ["Buy 1 Get 1"],
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-35 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    priceRange: "$",
    distance: "1.5 km",
    offers: ["Free delivery"],
  },
  {
    id: 4,
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "35-50 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$$$",
    distance: "2.1 km",
    offers: ["15% off"],
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    priceRange: "$",
    distance: "1.0 km",
    offers: ["Happy Hour"],
  },
  {
    id: 6,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.1,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$$",
    distance: "1.8 km",
    offers: ["Free delivery"],
  },
  {
    id: 7,
    name: "Curry Express",
    cuisine: "Indian",
    rating: 4.0,
    deliveryTime: "25-35 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$",
    distance: "2.3 km",
    offers: ["10% off"],
  },
  {
    id: 8,
    name: "Pasta Corner",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    priceRange: "$$",
    distance: "1.4 km",
    offers: ["Free garlic bread"],
  },
  {
    id: 9,
    name: "BBQ Junction",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "40-55 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$$",
    distance: "2.5 km",
    offers: ["Weekend special"],
  },
  {
    id: 10,
    name: "Ramen House",
    cuisine: "Japanese",
    rating: 4.5,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$$",
    distance: "1.7 km",
    offers: ["Student discount"],
  },
  {
    id: 11,
    name: "El Mariachi",
    cuisine: "Mexican",
    rating: 4.2,
    deliveryTime: "35-50 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    priceRange: "$$",
    distance: "2.0 km",
    offers: ["Taco Tuesday"],
  },
  {
    id: 12,
    name: "Golden Dragon",
    cuisine: "Chinese",
    rating: 4.4,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    priceRange: "$$",
    distance: "1.3 km",
    offers: ["Lunch combo"],
  },
]

const cuisineOptions = ["All", "Indian", "Italian", "Chinese", "Mexican", "Japanese", "American"]
const sortOptions = [
  { value: "rating", label: "Rating" },
  { value: "deliveryTime", label: "Delivery Time" },
  { value: "distance", label: "Distance" },
  { value: "priceRange", label: "Price" },
]

export default function RestaurantsPage() {
  const searchParams = useSearchParams()
  const initialCuisine = searchParams.get("cuisine") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState(
    cuisineOptions.find((c) => c.toLowerCase() === initialCuisine.toLowerCase()) || "All",
  )
  const [sortBy, setSortBy] = useState("rating")
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants)

  useEffect(() => {
    let filtered = allRestaurants

    // Filter by cuisine
    if (selectedCuisine !== "All") {
      filtered = filtered.filter((restaurant) => restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase())
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "deliveryTime":
          return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        case "priceRange":
          return a.priceRange.length - b.priceRange.length
        default:
          return 0
      }
    })

    setFilteredRestaurants(filtered)
  }, [searchQuery, selectedCuisine, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: "url('/placeholder.svg?height=200&width=1200')",
          }}
        />
        <div className="container mx-auto px-4 py-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Restaurants near you</h1>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search restaurants or cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Cuisines" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      Sort by {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredRestaurants.length} restaurants found
              {selectedCuisine !== "All" && ` for ${selectedCuisine} cuisine`}
            </p>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/restaurant/${restaurant.id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
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
                        {restaurant.offers.length > 0 && (
                          <div className="absolute bottom-3 left-3">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {restaurant.offers[0]}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{restaurant.name}</h3>
                          <span className="text-sm text-gray-500">{restaurant.priceRange}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {restaurant.deliveryTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {restaurant.distance}
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
          )}
        </motion.div>
      </div>
    </div>
  )
}
