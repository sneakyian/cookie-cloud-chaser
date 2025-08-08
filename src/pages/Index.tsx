import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import imgChocChip from "@/assets/cookies/chocolate-chip.jpg";
import imgDoubleFudge from "@/assets/cookies/double-fudge-brownie.jpg";
import imgOatmealRaisin from "@/assets/cookies/oatmeal-raisin.jpg";
import imgSugarCookie from "@/assets/cookies/sugar-cookie.jpg";
import imgPeanutButter from "@/assets/cookies/peanut-butter.jpg";
import imgRedVelvet from "@/assets/cookies/red-velvet.jpg";
const Index = () => {
  const cookies = [
    {
      id: 1,
      name: "Chocolate Chip Classic",
      price: 12.99,
      rating: 4.8,
      image: imgChocChip,
      imageAlt: "Photorealistic chocolate chip cookies on dark backdrop",
      description: "Our signature chocolate chip cookies with premium Belgian chocolate",
      category: "Classic",
    },
    {
      id: 2,
      name: "Double Fudge Brownie",
      price: 14.99,
      rating: 4.9,
      image: imgDoubleFudge,
      imageAlt: "Double fudge brownie cookies with glossy drizzle, moody lighting",
      description: "Rich, chewy brownie cookies with double chocolate fudge",
      category: "Premium",
    },
    {
      id: 3,
      name: "Oatmeal Raisin",
      price: 11.99,
      rating: 4.6,
      image: imgOatmealRaisin,
      imageAlt: "Oatmeal raisin cookies with visible oats and plump raisins",
      description: "Classic oatmeal cookies with plump raisins and cinnamon",
      category: "Classic",
    },
    {
      id: 4,
      name: "Sugar Cookie Delights",
      price: 10.99,
      rating: 4.7,
      image: imgSugarCookie,
      imageAlt: "Sugar cookies dusted with crystalline sugar, studio shot",
      description: "Soft, buttery sugar cookies dusted with crystalline sugar",
      category: "Classic",
    },
    {
      id: 5,
      name: "Peanut Butter Bliss",
      price: 13.99,
      rating: 4.8,
      image: imgPeanutButter,
      imageAlt: "Peanut butter cookies with classic fork marks, premium look",
      description: "Creamy peanut butter cookies with a perfect chewy texture",
      category: "Specialty",
    },
    {
      id: 6,
      name: "Red Velvet Dreams",
      price: 15.99,
      rating: 4.9,
      image: imgRedVelvet,
      imageAlt: "Red velvet cookies with cream cheese centers, dark moody style",
      description: "Luxurious red velvet cookies with cream cheese centers",
      category: "Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍪</span>
            <h1 className="text-2xl font-bold text-primary">Cookie Cloud Chaser</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/order" className="text-foreground hover:text-primary transition-colors">Orders</Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">Profile</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-bold tracking-tight">
              Heavenly Cookies
              <span className="text-primary block">Delivered Fresh</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Handcrafted with love, baked to perfection. Experience the ultimate cookie indulgence delivered right to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Order Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cookies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Signature Collection</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each cookie is made with premium ingredients and baked fresh daily for the perfect taste experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookies.map((cookie) => (
              <Card key={cookie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="relative mb-3">
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-md border bg-secondary/30">
                      <img
                        src={cookie.image}
                        alt={cookie.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2 bg-background/60 backdrop-blur border">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{cookie.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{cookie.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="mb-2">{cookie.name}</CardTitle>
                  <CardDescription className="mb-4">{cookie.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${cookie.price}</span>
                    <Button size="sm" className="ml-auto">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl">🚚</div>
              <h4 className="text-xl font-semibold">Fast Delivery</h4>
              <p className="text-muted-foreground">Fresh cookies delivered within 2 hours in select areas</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl">🌟</div>
              <h4 className="text-xl font-semibold">Premium Quality</h4>
              <p className="text-muted-foreground">Made with the finest ingredients and traditional recipes</p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl">💝</div>
              <h4 className="text-xl font-semibold">Gift Ready</h4>
              <p className="text-muted-foreground">Beautiful packaging perfect for any special occasion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🍪</span>
                <span className="text-xl font-bold">Cookie Cloud Chaser</span>
              </div>
              <p className="text-muted-foreground">
                Crafting the perfect cookies since 2020. Made with love, delivered with care.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Quick Links</h5>
              <div className="space-y-2">
                <Link to="/order" className="block text-muted-foreground hover:text-primary transition-colors">Order Now</Link>
                <Link to="/profile" className="block text-muted-foreground hover:text-primary transition-colors">My Account</Link>
                <Link to="/cart" className="block text-muted-foreground hover:text-primary transition-colors">Cart</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Support</h5>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Track Order</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Connect</h5>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Facebook</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Cookie Cloud Chaser. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;