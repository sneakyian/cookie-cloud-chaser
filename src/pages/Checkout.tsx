import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, MapPin, Gift, Shield, CheckCircle } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [orderData, setOrderData] = useState({
    shipping: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States"
    },
    payment: {
      method: "card",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardholderName: ""
    },
    delivery: {
      option: "standard",
      instructions: "",
      giftMessage: ""
    }
  });

  const cartItems = [
    { id: 1, name: "Chocolate Chip Classic", price: 12.99, quantity: 2, image: "🍪" },
    { id: 2, name: "Double Fudge Brownie", price: 14.99, quantity: 1, image: "🍫" },
    { id: 3, name: "Peanut Butter Bliss", price: 13.99, quantity: 3, image: "🥜" }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = orderData.delivery.option === "express" ? 9.99 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "3-5 business days",
      price: 5.99,
      description: "Regular delivery during business hours"
    },
    {
      id: "express",
      name: "Express Delivery",
      time: "1-2 business days",
      price: 9.99,
      description: "Priority delivery with tracking"
    },
    {
      id: "pickup",
      name: "Store Pickup",
      time: "Available in 2 hours",
      price: 0,
      description: "Pick up from our Cookie Cloud location"
    }
  ];

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/order");
    }, 3000);
  };

  const updateShipping = (field: string, value: string) => {
    setOrderData({
      ...orderData,
      shipping: { ...orderData.shipping, [field]: value }
    });
  };

  const updatePayment = (field: string, value: string) => {
    setOrderData({
      ...orderData,
      payment: { ...orderData.payment, [field]: value }
    });
  };

  const updateDelivery = (field: string, value: string) => {
    setOrderData({
      ...orderData,
      delivery: { ...orderData.delivery, [field]: value }
    });
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <div className="text-6xl">🍪</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Processing Your Order</h3>
                <p className="text-muted-foreground">
                  We're preparing your delicious cookies...
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground">This may take a few moments</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
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
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
                </div>
                <span className={`ml-2 text-sm ${step >= stepNum ? "text-foreground" : "text-muted-foreground"}`}>
                  {stepNum === 1 && "Shipping"}
                  {stepNum === 2 && "Delivery"}
                  {stepNum === 3 && "Payment"}
                </span>
                {stepNum < 3 && <div className="w-12 h-px bg-border mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Shipping Information</span>
                  </CardTitle>
                  <CardDescription>Enter your delivery address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={orderData.shipping.firstName}
                        onChange={(e) => updateShipping("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={orderData.shipping.lastName}
                        onChange={(e) => updateShipping("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={orderData.shipping.email}
                        onChange={(e) => updateShipping("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={orderData.shipping.phone}
                        onChange={(e) => updateShipping("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={orderData.shipping.address}
                      onChange={(e) => updateShipping("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={orderData.shipping.city}
                        onChange={(e) => updateShipping("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={orderData.shipping.state}
                        onChange={(e) => updateShipping("state", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={orderData.shipping.zipCode}
                        onChange={(e) => updateShipping("zipCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Delivery Options</span>
                  </CardTitle>
                  <CardDescription>Choose how you'd like to receive your cookies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={orderData.delivery.option}
                    onValueChange={(value) => updateDelivery("option", value)}
                  >
                    {deliveryOptions.map((option) => (
                      <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </label>
                            <span className="font-semibold">
                              {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          <Badge variant="secondary" className="mt-2">{option.time}</Badge>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Leave at front door, ring doorbell, etc."
                        value={orderData.delivery.instructions}
                        onChange={(e) => updateDelivery("instructions", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="giftMessage" className="flex items-center space-x-2">
                        <Gift className="h-4 w-4" />
                        <span>Gift Message (Optional)</span>
                      </Label>
                      <Textarea
                        id="giftMessage"
                        placeholder="Write a special message for the recipient..."
                        value={orderData.delivery.giftMessage}
                        onChange={(e) => updateDelivery("giftMessage", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Information</span>
                  </CardTitle>
                  <CardDescription>Enter your payment details securely</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={orderData.payment.cardNumber}
                      onChange={(e) => updatePayment("cardNumber", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={orderData.payment.expiryDate}
                        onChange={(e) => updatePayment("expiryDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={orderData.payment.cvc}
                        onChange={(e) => updatePayment("cvc", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={orderData.payment.cardholderName}
                      onChange={(e) => updatePayment("cardholderName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Previous
              </Button>
              <Button onClick={handleNextStep}>
                {step === 3 ? "Place Order" : "Continue"}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{item.image}</div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl">🍪</div>
                  <p className="text-sm font-medium">Fresh & Delicious</p>
                  <p className="text-xs text-muted-foreground">
                    All cookies are baked fresh to order and shipped with care
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;