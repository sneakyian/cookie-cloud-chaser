import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Heart, Settings, CreditCard, Bell, Shield, HelpCircle, LogOut, Edit } from "lucide-react";

const Profile = () => {
  const location = useLocation();
  const isSettings = location.pathname === "/profile/settings";
  
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Cookie Street, Sweet City, SC 12345",
    joinDate: "2023-06-15",
    avatar: "",
    preferences: {
      notifications: true,
      newsletter: true,
      cookieUpdates: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const favoriteItems = [
    { id: 1, name: "Chocolate Chip Classic", image: "🍪", orders: 12 },
    { id: 2, name: "Double Fudge Brownie", image: "🍫", orders: 8 },
    { id: 3, name: "Peanut Butter Bliss", image: "🥜", orders: 6 }
  ];

  const orderStats = {
    totalOrders: 24,
    totalSpent: 456.78,
    avgOrderValue: 19.03,
    memberSince: "June 2023"
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xl">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                    <p className="text-muted-foreground">Cookie Enthusiast</p>
                    <Badge variant="secondary" className="mt-2">
                      Member since {orderStats.memberSince}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-1">
                  <Link 
                    to="/profile" 
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      !isSettings ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link to="/order" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Order History</span>
                  </Link>
                  <Link to="/profile/billing" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent transition-colors">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                  <Link 
                    to="/profile/settings" 
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isSettings ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent transition-colors cursor-pointer">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </div>
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isSettings ? (
              <SettingsContent user={user} setUser={setUser} />
            ) : (
              <ProfileContent 
                user={user} 
                setUser={setUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleSaveProfile={handleSaveProfile}
                favoriteItems={favoriteItems}
                orderStats={orderStats}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileContent = ({ user, setUser, isEditing, setIsEditing, handleSaveProfile, favoriteItems, orderStats }: any) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={user.firstName}
                onChange={(e) => setUser({...user, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={user.lastName}
                onChange={(e) => setUser({...user, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({...user, phone: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                value={user.address}
                onChange={(e) => setUser({...user, address: e.target.value})}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{orderStats.totalOrders}</div>
            <p className="text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">${orderStats.totalSpent.toFixed(2)}</div>
            <p className="text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">${orderStats.avgOrderValue.toFixed(2)}</div>
            <p className="text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Favorite Cookies</span>
          </CardTitle>
          <CardDescription>Your most ordered cookies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {favoriteItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Ordered {item.orders} times</p>
                  </div>
                </div>
                <Button size="sm">Order Again</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SettingsContent = ({ user, setUser }: any) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Preferences</span>
          </CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive order updates and promotions</p>
            </div>
            <input
              type="checkbox"
              checked={user.preferences.notifications}
              onChange={(e) => setUser({
                ...user,
                preferences: { ...user.preferences, notifications: e.target.checked }
              })}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Newsletter</h4>
              <p className="text-sm text-muted-foreground">Weekly cookie news and recipes</p>
            </div>
            <input
              type="checkbox"
              checked={user.preferences.newsletter}
              onChange={(e) => setUser({
                ...user,
                preferences: { ...user.preferences, newsletter: e.target.checked }
              })}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">New Cookie Alerts</h4>
              <p className="text-sm text-muted-foreground">Get notified about new cookie flavors</p>
            </div>
            <input
              type="checkbox"
              checked={user.preferences.cookieUpdates}
              onChange={(e) => setUser({
                ...user,
                preferences: { ...user.preferences, cookieUpdates: e.target.checked }
              })}
              className="rounded"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Download My Data
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;