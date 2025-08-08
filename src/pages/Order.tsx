import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Search, Filter, Eye } from "lucide-react";

const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 45.97,
      items: [
        { name: "Chocolate Chip Classic", quantity: 2, price: 12.99 },
        { name: "Double Fudge Brownie", quantity: 1, price: 14.99 },
        { name: "Oatmeal Raisin", quantity: 1, price: 11.99 }
      ],
      trackingNumber: "CC123456789",
      deliveryDate: "2024-01-18"
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 32.98,
      items: [
        { name: "Peanut Butter Bliss", quantity: 2, price: 13.99 },
        { name: "Sugar Cookie Delights", quantity: 1, price: 10.99 }
      ],
      trackingNumber: "CC987654321",
      estimatedDelivery: "2024-01-23"
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 28.98,
      items: [
        { name: "Red Velvet Dreams", quantity: 1, price: 15.99 },
        { name: "Chocolate Chip Classic", quantity: 1, price: 12.99 }
      ]
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-25",
      status: "pending",
      total: 67.94,
      items: [
        { name: "Double Fudge Brownie", quantity: 2, price: 14.99 },
        { name: "Peanut Butter Bliss", quantity: 1, price: 13.99 },
        { name: "Red Velvet Dreams", quantity: 1, price: 15.99 },
        { name: "Oatmeal Raisin", quantity: 1, price: 11.99 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "processing": return <Package className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getOrdersByStatus = (status: string) => {
    return filteredOrders.filter(order => order.status === status);
  };

  const allOrders = filteredOrders;
  const activeOrders = filteredOrders.filter(order => 
    order.status === "pending" || order.status === "processing" || order.status === "shipped"
  );
  const completedOrders = filteredOrders.filter(order => order.status === "delivered");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍪</span>
            <h1 className="text-xl font-bold text-primary">Cookie Cloud Bakery</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your cookie orders
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID or cookie name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="all">All Orders ({allOrders.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {allOrders.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-2xl font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm ? "Try adjusting your search terms." : "You haven't placed any orders yet."}
                  </p>
                  <Link to="/">
                    <Button size="lg">Start Shopping</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              allOrders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="text-6xl mb-4">🍪</div>
                  <h3 className="text-2xl font-semibold mb-2">No active orders</h3>
                  <p className="text-muted-foreground mb-6">
                    All your orders have been delivered!
                  </p>
                  <Link to="/">
                    <Button size="lg">Order More Cookies</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-2xl font-semibold mb-2">No completed orders</h3>
                  <p className="text-muted-foreground mb-6">
                    Your completed orders will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const OrderCard = ({ order, getStatusColor, getStatusIcon }: any) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>
              Ordered on {new Date(order.date).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-2">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🍪</div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="space-y-1">
            {order.trackingNumber && (
              <p className="text-sm text-muted-foreground">
                Tracking: {order.trackingNumber}
              </p>
            )}
            {order.estimatedDelivery && (
              <p className="text-sm text-muted-foreground">
                Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            )}
            {order.deliveryDate && (
              <p className="text-sm text-green-600">
                Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="text-right space-y-2">
            <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
              {order.status === "delivered" && (
                <Button size="sm">Reorder</Button>
              )}
              {order.trackingNumber && order.status !== "delivered" && (
                <Button size="sm">Track Order</Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Order;