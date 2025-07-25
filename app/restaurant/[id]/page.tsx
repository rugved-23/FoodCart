"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { CartMiniPreview } from "@/components/cart-mini-preview"

const restaurantData = {
  1: {
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=300&width=600",
    address: "123 Curry Lane, Spice District",
    menu: [
      {
        id: 101,
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Main Course",
        veg: false,
      },
      {
        id: 102,
        name: "Paneer Tikka Masala",
        description: "Grilled cottage cheese in rich tomato gravy",
        price: 14.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Main Course",
        veg: true,
      },
      {
        id: 103,
        name: "Chicken Biryani",
        description: "Fragrant basmati rice with spices and chicken",
        price: 18.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Main Course",
        veg: false,
      },
      {
        id: 104,
        name: "Garlic Naan",
        description: "Fresh baked Indian flatbread with garlic",
        price: 3.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Sides",
        veg: true,
      },
      {
        id: 105,
        name: "Mango Lassi",
        description: "Refreshing yogurt drink with mango",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Beverages",
        veg: true,
      },
      {
        id: 106,
        name: "Samosa (2 pcs)",
        description: "Crispy pastry filled with spiced potatoes",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Appetizers",
        veg: true,
      },
    ],
  },
  2: {
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=300&width=600",
    address: "456 Pizza Street, Little Italy",
    menu: [
      {
        id: 201,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 14.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Pizza",
        veg: true,
      },
      {
        id: 202,
        name: "Pepperoni Pizza",
        description: "Traditional pizza with pepperoni and mozzarella",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Pizza",
        veg: false,
      },
      {
        id: 203,
        name: "Chicken Alfredo Pasta",
        description: "Creamy pasta with grilled chicken and parmesan",
        price: 15.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Pasta",
        veg: false,
      },
      {
        id: 204,
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with caesar dressing and croutons",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Salads",
        veg: true,
      },
      {
        id: 205,
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Sides",
        veg: true,
      },
    ],
  },
  3: {
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-35 min",
    image: "/placeholder.svg?height=300&width=600",
    address: "789 Burger Ave, Downtown",
    menu: [
      {
        id: 301,
        name: "Classic Cheeseburger",
        description: "Beef patty with cheese, lettuce, tomato, and pickles",
        price: 12.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Burgers",
        veg: false,
      },
      {
        id: 302,
        name: "BBQ Bacon Burger",
        description: "Beef patty with bacon, BBQ sauce, and onion rings",
        price: 15.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Burgers",
        veg: false,
      },
      {
        id: 303,
        name: "Crispy Chicken Sandwich",
        description: "Fried chicken breast with mayo and lettuce",
        price: 13.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Sandwiches",
        veg: false,
      },
      {
        id: 304,
        name: "French Fries",
        description: "Golden crispy potato fries",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Sides",
        veg: true,
      },
      {
        id: 305,
        name: "Chocolate Milkshake",
        description: "Rich chocolate milkshake with whipped cream",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Beverages",
        veg: true,
      },
    ],
  },
  4: {
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "35-50 min",
    image: "/placeholder.svg?height=300&width=600",
    address: "321 Zen Garden, Japantown",
    menu: [
      {
        id: 401,
        name: "Salmon Sashimi",
        description: "Fresh salmon slices served with wasabi and ginger",
        price: 18.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Sashimi",
        veg: false,
      },
      {
        id: 402,
        name: "California Roll",
        description: "Crab, avocado, and cucumber roll with sesame seeds",
        price: 12.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Rolls",
        veg: false,
      },
      {
        id: 403,
        name: "Chicken Teriyaki",
        description: "Grilled chicken with teriyaki sauce and steamed rice",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Main Course",
        veg: false,
      },
      {
        id: 404,
        name: "Miso Soup",
        description: "Traditional soybean paste soup with tofu and seaweed",
        price: 3.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Soups",
        veg: true,
      },
      {
        id: 405,
        name: "Green Tea",
        description: "Premium Japanese green tea",
        price: 2.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Beverages",
        veg: true,
      },
    ],
  },
  5: {
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "25-40 min",
    image: "/placeholder.svg?height=300&width=600",
    address: "654 Fiesta Blvd, Mexican Quarter",
    menu: [
      {
        id: 501,
        name: "Beef Tacos (3 pcs)",
        description: "Seasoned ground beef with lettuce, cheese, and salsa",
        price: 11.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Tacos",
        veg: false,
      },
      {
        id: 502,
        name: "Chicken Quesadilla",
        description: "Grilled chicken and cheese in a flour tortilla",
        price: 13.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Quesadillas",
        veg: false,
      },
      {
        id: 503,
        name: "Guacamole & Chips",
        description: "Fresh avocado dip with crispy tortilla chips",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Appetizers",
        veg: true,
      },
      {
        id: 504,
        name: "Churros",
        description: "Fried dough pastry with cinnamon sugar",
        price: 6.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Desserts",
        veg: true,
      },
      {
        id: 505,
        name: "Horchata",
        description: "Traditional rice and cinnamon drink",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Beverages",
        veg: true,
      },
    ],
  },
  6: {
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.1,
    deliveryTime: "30-45 min",
    image: "/placeholder.svg?height=300&width=600",
    address: "987 Dragon Street, Chinatown",
    menu: [
      {
        id: 601,
        name: "Sweet & Sour Chicken",
        description: "Battered chicken with sweet and sour sauce",
        price: 14.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Main Course",
        veg: false,
      },
      {
        id: 602,
        name: "Beef Lo Mein",
        description: "Stir-fried noodles with beef and vegetables",
        price: 13.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Noodles",
        veg: false,
      },
      {
        id: 603,
        name: "Vegetable Fried Rice",
        description: "Wok-fried rice with mixed vegetables and egg",
        price: 10.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Rice",
        veg: true,
      },
      {
        id: 604,
        name: "Spring Rolls (4 pcs)",
        description: "Crispy rolls filled with vegetables",
        price: 6.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Appetizers",
        veg: true,
      },
      {
        id: 605,
        name: "Hot & Sour Soup",
        description: "Traditional Chinese soup with tofu and mushrooms",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=200",
        category: "Soups",
        veg: true,
      },
    ],
  },
}

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = Number.parseInt(params.id as string)
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [showCartPreview, setShowCartPreview] = useState(false)
  const { addItem, items } = useCart()
  const { toast } = useToast()

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const categories = [...new Set(restaurant.menu.map((item) => item.category))]
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }))
  }

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantId: restaurantId,
        restaurantName: restaurant.name,
      })
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your cart`,
    })

    setQuantities((prev) => ({ ...prev, [item.id]: 0 }))

    // Show cart preview briefly
    setShowCartPreview(true)
    setTimeout(() => setShowCartPreview(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={() => setShowCartPreview(!showCartPreview)}
            className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartItemCount}
              </Badge>
            </div>
          </Button>
        </motion.div>
      )}

      {/* Cart Mini Preview */}
      <CartMiniPreview isOpen={showCartPreview} onClose={() => setShowCartPreview(false)} />

      {/* Header */}
      <div className="relative h-64 md:h-80">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-4 left-4">
          <Link href="/restaurants">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {restaurant.rating}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {restaurant.address}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      document.getElementById(category)?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            {categories.map((category) => (
              <div key={category} id={category} className="mb-8">
                <div className="relative mb-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 rounded-lg"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=100&width=800')`,
                    }}
                  />
                  <div className="relative z-10 p-4">
                    <h2 className="text-2xl font-bold">{category}</h2>
                  </div>
                </div>
                <div className="grid gap-4">
                  {restaurant.menu
                    .filter((item) => item.category === category)
                    .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="font-bold text-lg">{item.name}</h3>
                                  <Badge variant={item.veg ? "secondary" : "destructive"}>
                                    {item.veg ? "🟢 Veg" : "🔴 Non-Veg"}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-orange-500">${item.price}</span>
                                  <div className="flex items-center gap-2">
                                    {quantities[item.id] > 0 && (
                                      <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">{quantities[item.id]}</span>
                                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                    <Button
                                      onClick={() => {
                                        if (quantities[item.id] > 0) {
                                          handleAddToCart(item)
                                        } else {
                                          updateQuantity(item.id, 1)
                                        }
                                      }}
                                      className="bg-orange-500 hover:bg-orange-600"
                                    >
                                      {quantities[item.id] > 0 ? "Add to Cart" : "Add"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-48 h-48 md:h-auto relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
