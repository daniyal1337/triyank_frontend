import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, CreditCard, Check, Download, Package, Truck, ShieldCheck } from "lucide-react";
import CheckoutHeader from "../components/header/CheckoutHeader";
import Footer from "../components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import jsPDF from "jspdf";

const generateOrderId = () => {
  return "TRY-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
};

const Checkout = () => {
  const { cartItems, updateQuantity, clearCart, subtotal } = useCart();
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "", firstName: "", lastName: "", phone: ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "", city: "", state: "", postalCode: "", country: "India"
  });
  const [hasSeparateBilling, setHasSeparateBilling] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", postalCode: "", country: "India"
  });
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "", expiryDate: "", cvv: "", cardholderName: "", upiId: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const getShippingCost = () => {
    switch (shippingOption) {
      case "express": return 149;
      case "overnight": return 349;
      default: return 0;
    }
  };
  
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };
  const handleShippingAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };
  const handleBillingDetailsChange = (field: string, value: string) => {
    setBillingDetails(prev => ({ ...prev, [field]: value }));
  };
  const handlePaymentDetailsChange = (field: string, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const generatePDF = (oid: string) => {
    const doc = new jsPDF();
    const gold = [201, 168, 108] as const;
    
    // Header
    doc.setFillColor(26, 26, 26);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(201, 168, 108);
    doc.setFontSize(22);
    doc.text("TRIYANK", 105, 20, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("JEWELRY  •  HANDCRAFTED WITH LOVE", 105, 28, { align: "center" });

    // Order Info
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(14);
    doc.text("Order Confirmation", 20, 55);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: ${oid}`, 20, 64);
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, 20, 70);
    doc.text(`Payment: ${paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}`, 20, 76);

    // Divider
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(20, 82, 190, 82);

    // Customer Details
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Customer Details", 20, 92);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`${customerDetails.firstName} ${customerDetails.lastName}`, 20, 100);
    doc.text(customerDetails.email, 20, 106);
    doc.text(customerDetails.phone || "N/A", 20, 112);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Shipping Address", 120, 92);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(shippingAddress.address || "N/A", 120, 100);
    doc.text(`${shippingAddress.city}, ${shippingAddress.state}`, 120, 106);
    doc.text(`${shippingAddress.postalCode}, ${shippingAddress.country}`, 120, 112);

    // Items Table Header
    let y = 125;
    doc.setDrawColor(...gold);
    doc.line(20, y, 190, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("Item", 20, y);
    doc.text("Qty", 130, y, { align: "center" });
    doc.text("Price", 160, y, { align: "center" });
    doc.text("Total", 185, y, { align: "right" });
    y += 3;
    doc.line(20, y, 190, y);
    y += 8;

    // Items
    doc.setTextColor(80, 80, 80);
    cartItems.forEach(item => {
      doc.text(item.name, 20, y, { maxWidth: 100 });
      doc.text(String(item.quantity), 130, y, { align: "center" });
      doc.text(formatPrice(item.price), 160, y, { align: "center" });
      doc.text(formatPrice(item.price * item.quantity), 185, y, { align: "right" });
      y += 8;
    });

    // Totals
    y += 4;
    doc.line(120, y, 190, y);
    y += 8;
    doc.setTextColor(100, 100, 100);
    doc.text("Subtotal", 120, y);
    doc.text(formatPrice(subtotal), 185, y, { align: "right" });
    y += 7;
    doc.text("Shipping", 120, y);
    doc.text(shipping === 0 ? "Free" : formatPrice(shipping), 185, y, { align: "right" });
    y += 3;
    doc.line(120, y, 190, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Total", 120, y);
    doc.text(formatPrice(total), 185, y, { align: "right" });

    // Footer
    doc.setFillColor(245, 242, 238);
    doc.rect(0, 270, 210, 27, "F");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for shopping with Triyank Jewelry!", 105, 280, { align: "center" });
    doc.text("hello@triyank.com  •  +91 98765 43210  •  Karol Bagh, New Delhi", 105, 286, { align: "center" });

    doc.save(`Triyank-Order-${oid}.pdf`);
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    const oid = generateOrderId();
    setOrderId(oid);
    setIsProcessing(false);
    setPaymentComplete(true);
  };

  const handleDownloadPDF = () => {
    generatePDF(orderId);
  };

  // Payment success screen
  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="pt-12 pb-20">
          <div className="max-w-xl mx-auto px-6 text-center">
            {/* Success animation */}
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground font-light mb-1">Thank you for your purchase.</p>
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: <span className="text-foreground font-medium">{orderId}</span>
            </p>

            {/* Order Summary Card */}
            <div className="bg-muted/20 border border-border p-6 text-left mb-6">
              <h3 className="text-sm font-medium text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="text-foreground">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-medium">
                  <span className="text-foreground">Total Paid</span>
                  <span className="text-foreground">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/20 border border-border p-6 text-left mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="h-5 w-5 text-[#c9a86c]" />
                <span className="text-sm text-foreground">
                  {shippingOption === "overnight" ? "Delivery by tomorrow" : shippingOption === "express" ? "Delivery in 1-2 days" : "Delivery in 3-5 business days"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-[#c9a86c]" />
                <span className="text-sm text-muted-foreground">
                  {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDownloadPDF}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-none gap-2"
              >
                <Download className="h-4 w-4" /> Download Order Receipt (PDF)
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-none mt-2"
                  onClick={() => clearCart()}
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="pt-20 pb-20 text-center px-6">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-light text-foreground mb-2">Your bag is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/">
            <Button className="rounded-none h-12 px-8">Start Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />
      
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-muted/20 p-8 rounded-none sticky top-6">
                <h2 className="text-lg font-light text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-none overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-light text-foreground text-sm">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 p-0 rounded-none border-muted-foreground/20">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium text-foreground min-w-[2ch] text-center">{item.quantity}</span>
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 p-0 rounded-none border-muted-foreground/20">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-foreground text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                {/* Discount */}
                <div className="mt-8 pt-6 border-t border-muted-foreground/20">
                  {!showDiscountInput ? (
                    <button onClick={() => setShowDiscountInput(true)} className="text-sm text-foreground underline hover:no-underline">
                      Have a discount code?
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter code" className="flex-1 rounded-none" />
                      <Button variant="outline" className="rounded-none" onClick={() => setShowDiscountInput(false)}>Apply</Button>
                    </div>
                  )}
                </div>

                <div className="border-t border-muted-foreground/20 mt-4 pt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium border-t border-muted-foreground/20 pt-3">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-4 border-t border-muted-foreground/20 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Secure checkout • 100% safe payment</span>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 lg:order-1 space-y-8">

              {/* Customer Details */}
              <div className="bg-muted/20 p-8 rounded-none">
                <h2 className="text-lg font-light text-foreground mb-6">Customer Details</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-light text-foreground">Email Address *</Label>
                    <Input id="email" type="email" value={customerDetails.email}
                      onChange={(e) => handleCustomerDetailsChange("email", e.target.value)}
                      className="mt-2 rounded-none" placeholder="Enter your email" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-light text-foreground">First Name *</Label>
                      <Input value={customerDetails.firstName}
                        onChange={(e) => handleCustomerDetailsChange("firstName", e.target.value)}
                        className="mt-2 rounded-none" placeholder="First name" />
                    </div>
                    <div>
                      <Label className="text-sm font-light text-foreground">Last Name *</Label>
                      <Input value={customerDetails.lastName}
                        onChange={(e) => handleCustomerDetailsChange("lastName", e.target.value)}
                        className="mt-2 rounded-none" placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-light text-foreground">Phone Number *</Label>
                    <Input type="tel" value={customerDetails.phone}
                      onChange={(e) => handleCustomerDetailsChange("phone", e.target.value)}
                      className="mt-2 rounded-none" placeholder="+91 98765 43210" />
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t border-muted-foreground/20 pt-6 mt-8">
                    <h3 className="text-base font-light text-foreground mb-4">Shipping Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-light text-foreground">Address *</Label>
                        <Input value={shippingAddress.address}
                          onChange={(e) => handleShippingAddressChange("address", e.target.value)}
                          className="mt-2 rounded-none" placeholder="House/Flat No., Street" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-light text-foreground">City *</Label>
                          <Input value={shippingAddress.city}
                            onChange={(e) => handleShippingAddressChange("city", e.target.value)}
                            className="mt-2 rounded-none" placeholder="City" />
                        </div>
                        <div>
                          <Label className="text-sm font-light text-foreground">State *</Label>
                          <Input value={shippingAddress.state}
                            onChange={(e) => handleShippingAddressChange("state", e.target.value)}
                            className="mt-2 rounded-none" placeholder="State" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-light text-foreground">PIN Code *</Label>
                          <Input value={shippingAddress.postalCode}
                            onChange={(e) => handleShippingAddressChange("postalCode", e.target.value)}
                            className="mt-2 rounded-none" placeholder="110005" />
                        </div>
                        <div>
                          <Label className="text-sm font-light text-foreground">Country</Label>
                          <Input value={shippingAddress.country}
                            onChange={(e) => handleShippingAddressChange("country", e.target.value)}
                            className="mt-2 rounded-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separate billing */}
                  <div className="border-t border-muted-foreground/20 pt-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="separateBilling" checked={hasSeparateBilling}
                        onCheckedChange={(checked) => setHasSeparateBilling(checked === true)} />
                      <Label htmlFor="separateBilling" className="text-sm font-light text-foreground cursor-pointer">
                        Use different billing address
                      </Label>
                    </div>
                  </div>

                  {hasSeparateBilling && (
                    <div className="space-y-4 pt-4">
                      <h3 className="text-base font-light text-foreground">Billing Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-light">First Name *</Label>
                          <Input value={billingDetails.firstName}
                            onChange={(e) => handleBillingDetailsChange("firstName", e.target.value)}
                            className="mt-2 rounded-none" placeholder="First name" />
                        </div>
                        <div>
                          <Label className="text-sm font-light">Last Name *</Label>
                          <Input value={billingDetails.lastName}
                            onChange={(e) => handleBillingDetailsChange("lastName", e.target.value)}
                            className="mt-2 rounded-none" placeholder="Last name" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-light">Address *</Label>
                        <Input value={billingDetails.address}
                          onChange={(e) => handleBillingDetailsChange("address", e.target.value)}
                          className="mt-2 rounded-none" placeholder="Street address" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-light">City *</Label>
                          <Input value={billingDetails.city}
                            onChange={(e) => handleBillingDetailsChange("city", e.target.value)}
                            className="mt-2 rounded-none" placeholder="City" />
                        </div>
                        <div>
                          <Label className="text-sm font-light">PIN Code *</Label>
                          <Input value={billingDetails.postalCode}
                            onChange={(e) => handleBillingDetailsChange("postalCode", e.target.value)}
                            className="mt-2 rounded-none" placeholder="PIN code" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Options */}
              <div className="bg-muted/20 p-8 rounded-none">
                <h2 className="text-lg font-light text-foreground mb-6">Shipping Options</h2>
                <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-muted-foreground/20">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-light text-foreground">Standard Shipping</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">Free • 3-5 business days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-muted-foreground/20">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-light text-foreground">Express Shipping</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">₹149 • 1-2 business days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-muted-foreground/20">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <Label htmlFor="overnight" className="font-light text-foreground">Overnight Delivery</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">₹349 • Next business day</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment */}
              <div className="bg-muted/20 p-8 rounded-none">
                <h2 className="text-lg font-light text-foreground mb-6">Payment</h2>
                
                {/* Payment method tabs */}
                <div className="flex border-b border-muted-foreground/20 mb-6">
                  {[
                    { id: "card", label: "Card" },
                    { id: "upi", label: "UPI" },
                    { id: "cod", label: "Cash on Delivery" },
                  ].map(method => (
                    <button key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`px-6 py-3 text-sm font-light transition-colors border-b-2 -mb-[1px] ${
                        paymentMethod === method.id
                          ? "border-[#c9a86c] text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-light text-foreground">Cardholder Name *</Label>
                      <Input value={paymentDetails.cardholderName}
                        onChange={(e) => handlePaymentDetailsChange("cardholderName", e.target.value)}
                        className="mt-2 rounded-none" placeholder="Name on card" />
                    </div>
                    <div>
                      <Label className="text-sm font-light text-foreground">Card Number *</Label>
                      <div className="relative mt-2">
                        <Input value={paymentDetails.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                            if (value.length <= 19) handlePaymentDetailsChange("cardNumber", value);
                          }}
                          className="rounded-none pl-10" placeholder="4242 4242 4242 4242" maxLength={19} />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-light text-foreground">Expiry Date *</Label>
                        <Input value={paymentDetails.expiryDate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
                            if (value.length <= 5) handlePaymentDetailsChange("expiryDate", value);
                          }}
                          className="mt-2 rounded-none" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div>
                        <Label className="text-sm font-light text-foreground">CVV *</Label>
                        <Input value={paymentDetails.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) handlePaymentDetailsChange("cvv", value);
                          }}
                          className="mt-2 rounded-none" placeholder="123" maxLength={3} />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-light text-foreground">UPI ID *</Label>
                      <Input value={paymentDetails.upiId}
                        onChange={(e) => handlePaymentDetailsChange("upiId", e.target.value)}
                        className="mt-2 rounded-none" placeholder="yourname@upi" />
                    </div>
                    <p className="text-xs text-muted-foreground">We support Google Pay, PhonePe, Paytm and all UPI apps.</p>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="p-4 bg-muted/30 text-sm text-muted-foreground">
                    <p>Pay with cash when your order is delivered. An additional ₹49 COD charge applies.</p>
                  </div>
                )}

                {/* Total + Pay Button */}
                <div className="mt-8 bg-muted/10 p-6 border border-muted-foreground/20 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">COD Charge</span>
                      <span className="text-foreground">₹49</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-medium border-t border-muted-foreground/20 pt-3">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatPrice(total + (paymentMethod === "cod" ? 49 : 0))}</span>
                  </div>
                </div>

                <Button onClick={handleCompleteOrder} disabled={isProcessing}
                  className="w-full rounded-none h-12 text-base mt-6">
                  {isProcessing ? "Processing Payment..." : `Pay ${formatPrice(total + (paymentMethod === "cod" ? 49 : 0))}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
