import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Plus, Edit, Trash2, Download, Calendar, DollarSign } from "lucide-react";

const Billing = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "5555",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false
    }
  ]);

  const [invoices] = useState([
    {
      id: "INV-2024-001",
      date: "2024-01-15",
      amount: 45.97,
      status: "paid",
      items: ["Chocolate Chip Classic (x2)", "Double Fudge Brownie (x1)", "Oatmeal Raisin (x1)"]
    },
    {
      id: "INV-2024-002",
      date: "2024-01-20",
      amount: 32.98,
      status: "paid",
      items: ["Peanut Butter Bliss (x2)", "Sugar Cookie Delights (x1)"]
    },
    {
      id: "INV-2024-003",
      date: "2024-01-22",
      amount: 28.98,
      status: "pending",
      items: ["Red Velvet Dreams (x1)", "Chocolate Chip Classic (x1)"]
    }
  ]);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  const handleAddCard = () => {
    // Add card logic here
    setIsAddingCard(false);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
  };

  const handleDeleteCard = (id: number) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const getCardIcon = (type: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  const totalSpent = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === "paid");
  const pendingInvoices = invoices.filter(inv => inv.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
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
          <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
          <p className="text-muted-foreground">
            Manage your payment methods and view billing history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingCard(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getCardIcon(method.type)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{method.type} ending in {method.last4}</span>
                          {method.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                          Set Default
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteCard(method.id)}
                        disabled={method.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {isAddingCard && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Card</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={newCard.number}
                          onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={newCard.expiry}
                            onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={newCard.cvc}
                            onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={newCard.name}
                          onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleAddCard}>Add Card</Button>
                        <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{invoice.id}</span>
                          <Badge variant={invoice.status === "paid" ? "secondary" : "destructive"}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {invoice.items.join(", ")}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === "pending" && (
                            <Button size="sm">Pay Now</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Billing Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">${totalSpent.toFixed(2)}</div>
                  <p className="text-muted-foreground">Total Spent</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Paid Invoices</span>
                    <span>{paidInvoices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Invoices</span>
                    <span className="text-orange-500">{pendingInvoices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Billing Date</span>
                    <span>-</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Recurring Order
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Invoices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Billing Address
                </Button>
              </CardContent>
            </Card>

            {/* Payment Security */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl">🔒</div>
                  <h4 className="font-medium">Secure Payments</h4>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your full card details.
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

export default Billing;