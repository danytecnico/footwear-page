"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/lib/api";
import { AddPaymentMethodModal } from "@/components/payment-method";

// Definición del tipo para los métodos de pago
interface PaymentMethod {
    id: string;
    type: string;
    number: string;
    expirationDate: string;
}

export default function Account() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const user = localStorage.getItem("user_id");
    const [payments, setPayments] = useState<PaymentMethod[]>([]); // Ahora tiene tipado correcto

    const { logout } = useAuth();
    const router = useNavigate();

    const handleLogout = () => {
        logout();
        router("/");
    };

    useEffect(() => {
        if (user) {
            getUser(user).then((r) => {
                setName(r.username || "John Doe");
                setEmail(r.email || "john.doe@example.com");
                setPayments(r.paymentMethods || []); // Previene errores si la API devuelve undefined
            }).catch(err => console.error("Error fetching user:", err));
        }
    }, [user]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Account</h1>
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm">Confirm password</Label>
                                <Input id="confirm" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Change Password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing</CardTitle>
                            <CardDescription>Manage your billing information and view your invoices.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                {payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <div key={payment.id} className="flex items-center space-x-4">
                                            <CreditCard className="w-6 h-6" />
                                            <div>
                                                <p className="font-medium">
                                                    {payment.type} ending in {payment.number?.slice(-4) || "****"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Expires {payment.expirationDate || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No payments found.</p>
                                )}
                            </div>
                            <div className="flex space-x-4">
                                <Button variant="outline">View Invoices</Button>
                                {user && <AddPaymentMethodModal owner={name} userId={user} />}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Button className="mt-4" onClick={handleLogout} variant="destructive">
                Logout
            </Button>
        </div>
    );
}
