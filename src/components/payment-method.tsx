"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { addPayment } from "@/lib/api";

export function AddPaymentMethodModal({ owner, userId }: { owner: string, userId: string }) {
    const [open, setOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cvc, setCvc] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitting payment method:", {
            cardNumber,
            expiryMonth,
            expiryYear,
            cvc,
        });
        addPayment({
            userId: userId,
            owner: owner,
            number: cardNumber,
            expirationDate: `${expiryMonth}/${expiryYear}`,
            cvv: cvc,
            billingAddress: "",
            type: "credit",

        });
        setOpen(false);
        setCardNumber("");
        setExpiryMonth("");
        setExpiryYear("");
        setCvc("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Payment Method</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                        Enter your card details to add a new payment method.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="cardNumber">Card number</Label>
                            <Input
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="expiryMonth">Expiry Month</Label>
                                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                                    <SelectTrigger id="expiryMonth">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                            (month) => (
                                                <SelectItem
                                                    key={month}
                                                    value={month.toString().padStart(2, "0")}
                                                >
                                                    {month.toString().padStart(2, "0")}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="expiryYear">Expiry Year</Label>
                                <Select value={expiryYear} onValueChange={setExpiryYear}>
                                    <SelectTrigger id="expiryYear">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from(
                                            { length: 10 },
                                            (_, i) => new Date().getFullYear() + i
                                        ).map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                    id="cvc"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    placeholder="123"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Payment Method</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
