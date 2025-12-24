import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, CreditCardIcon, TruckIcon, UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context";
import { getFirstImage } from "@/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type CheckoutStep = "contact" | "delivery" | "payment" | "review";

const STEPS: { id: CheckoutStep; label: string; icon: typeof UserIcon }[] = [
  { id: "contact", label: "Contact", icon: UserIcon },
  { id: "delivery", label: "Delivery", icon: TruckIcon },
  { id: "payment", label: "Payment", icon: CreditCardIcon },
  { id: "review", label: "Review", icon: ShieldCheckIcon }
];

interface FormData {
  // Contact
  email: string;
  phone: string;
  // Delivery
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  deliveryMethod: "standard" | "express" | "pickup";
  // Payment
  paymentMethod: "card" | "apple_pay" | "google_pay" | "cod";
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, tax, shipping, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
    deliveryMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: ""
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Redirect to cart if empty
  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: CheckoutStep): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === "contact") {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
    }

    if (step === "delivery") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.address) newErrors.address = "Address is required";
    }

    if (step === "payment" && formData.paymentMethod === "card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!formData.cardExpiry) newErrors.cardExpiry = "Expiry is required";
      if (!formData.cardCvc) newErrors.cardCvc = "CVC is required";
      if (!formData.cardName) newErrors.cardName = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;

    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep("payment")) return;

    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
  };

  // Order success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Order Placed!</h1>
            <p className="mb-6 text-gray-600">
              Thank you for your order. We've sent a confirmation to {formData.email}
            </p>
            <p className="mb-8 text-sm text-gray-500">Order #: {orderId}</p>
            <button
              onClick={() => navigate("/")}
              className="rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const deliveryFee =
    formData.deliveryMethod === "express" ? 19.99 : formData.deliveryMethod === "pickup" ? 0 : shipping;
  const finalTotal = subtotal + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
          />
        </div>

        {/* Progress Steps */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center justify-center">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (index < currentStepIndex) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={index > currentStepIndex}
                  className={`flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                    index === currentStepIndex
                      ? "bg-gray-900 text-white"
                      : index < currentStepIndex
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <step.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className={`mx-1 h-0.5 w-4 sm:mx-2 sm:w-8 md:w-16 ${index < currentStepIndex ? "bg-green-300" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-8">
              {/* Contact Step */}
              {currentStep === "contact" && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Contact Information</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => updateField("email", e.target.value)}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => updateField("phone", e.target.value)}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Step */}
              {currentStep === "delivery" && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Delivery Details</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={e => updateField("firstName", e.target.value)}
                          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                            errors.firstName ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.firstName && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={e => updateField("lastName", e.target.value)}
                          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                            errors.lastName ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.lastName && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Country</label>
                        <select
                          value={formData.country}
                          onChange={e => updateField("country", e.target.value)}
                          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                            errors.country ? "border-red-500" : "border-gray-200"
                          }`}
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                        {errors.country && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.country}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => updateField("city", e.target.value)}
                          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                            errors.city ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.city && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.city}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e => updateField("address", e.target.value)}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                          errors.address ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Street address"
                      />
                      {errors.address && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.address}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={e => updateField("zipCode", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3"
                      />
                    </div>

                    {/* Delivery Method */}
                    <div className="mt-4 sm:mt-6">
                      <label className="mb-2 block text-xs font-medium text-gray-700 sm:mb-3 sm:text-sm">
                        Delivery Method
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "standard", label: "Standard Delivery", price: "$9.99", time: "5-7 business days" },
                          { id: "express", label: "Express Delivery", price: "$19.99", time: "1-2 business days" },
                          { id: "pickup", label: "Store Pickup", price: "Free", time: "Ready in 2 hours" }
                        ].map(method => (
                          <label
                            key={method.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors sm:rounded-xl sm:p-4 ${
                              formData.deliveryMethod === method.id
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <input
                                type="radio"
                                name="deliveryMethod"
                                value={method.id}
                                checked={formData.deliveryMethod === method.id}
                                onChange={e =>
                                  updateField("deliveryMethod", e.target.value as FormData["deliveryMethod"])
                                }
                                className="h-3 w-3 text-gray-900 sm:h-4 sm:w-4"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{method.label}</p>
                                <p className="text-xs text-gray-500">{method.time}</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{method.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Payment Method</h2>

                  {/* Payment Method Selector */}
                  <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:grid-cols-4 sm:gap-3">
                    {[
                      { id: "card", label: "Card", icon: "💳" },
                      { id: "apple_pay", label: "Apple Pay", icon: "" },
                      { id: "google_pay", label: "Google Pay", icon: "🅖" },
                      { id: "cod", label: "Cash", icon: "💵" }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => updateField("paymentMethod", method.id as FormData["paymentMethod"])}
                        className={`flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors sm:gap-2 sm:rounded-xl sm:p-4 ${
                          formData.paymentMethod === method.id
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xl sm:text-2xl">{method.icon}</span>
                        <span className="text-xs font-medium sm:text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card Form */}
                  {formData.paymentMethod === "card" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Card Number</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={e => updateField("cardNumber", e.target.value)}
                          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                            errors.cardNumber ? "border-red-500" : "border-gray-200"
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Expiry Date</label>
                          <input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={e => updateField("cardExpiry", e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                              errors.cardExpiry ? "border-red-500" : "border-gray-200"
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.cardExpiry && (
                            <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">CVC</label>
                          <input
                            type="text"
                            value={formData.cardCvc}
                            onChange={e => updateField("cardCvc", e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                              errors.cardCvc ? "border-red-500" : "border-gray-200"
                            }`}
                            placeholder="123"
                          />
                          {errors.cardCvc && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.cardCvc}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm">Name on Card</label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={e => updateField("cardName", e.target.value)}
                          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-gray-900 focus:outline-none sm:rounded-xl sm:px-4 sm:py-3 ${
                            errors.cardName ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.cardName && <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.cardName}</p>}
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "cod" && (
                    <div className="rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800 sm:rounded-xl sm:p-4 sm:text-sm">
                      💵 Pay with cash when your order is delivered. A small handling fee may apply.
                    </div>
                  )}

                  {(formData.paymentMethod === "apple_pay" || formData.paymentMethod === "google_pay") && (
                    <div className="rounded-lg bg-gray-50 p-3 text-center text-xs text-gray-600 sm:rounded-xl sm:p-4 sm:text-sm">
                      You'll be redirected to complete payment after placing your order.
                    </div>
                  )}
                </div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Review Your Order</h2>

                  {/* Contact Summary */}
                  <div className="mb-4 rounded-lg bg-gray-50 p-3 sm:mb-6 sm:rounded-xl sm:p-4">
                    <h3 className="mb-1 text-sm font-medium text-gray-900 sm:mb-2">Contact</h3>
                    <p className="text-xs text-gray-600 sm:text-sm">{formData.email}</p>
                    <p className="text-xs text-gray-600 sm:text-sm">{formData.phone}</p>
                  </div>

                  {/* Delivery Summary */}
                  <div className="mb-4 rounded-lg bg-gray-50 p-3 sm:mb-6 sm:rounded-xl sm:p-4">
                    <h3 className="mb-1 text-sm font-medium text-gray-900 sm:mb-2">Delivery</h3>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-xs text-gray-600 sm:text-sm">{formData.address}</p>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      {formData.city}, {formData.zipCode}, {formData.country}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-900 sm:mt-2 sm:text-sm">
                      {formData.deliveryMethod === "express"
                        ? "Express Delivery"
                        : formData.deliveryMethod === "pickup"
                          ? "Store Pickup"
                          : "Standard Delivery"}
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="rounded-lg bg-gray-50 p-3 sm:rounded-xl sm:p-4">
                    <h3 className="mb-1 text-sm font-medium text-gray-900 sm:mb-2">Payment</h3>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      {formData.paymentMethod === "card" && `Card ending in ${formData.cardNumber.slice(-4)}`}
                      {formData.paymentMethod === "apple_pay" && "Apple Pay"}
                      {formData.paymentMethod === "google_pay" && "Google Pay"}
                      {formData.paymentMethod === "cod" && "Cash on Delivery"}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between sm:mt-8">
                {currentStepIndex > 0 ? (
                  <button
                    onClick={goToPrevStep}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:rounded-xl sm:px-6 sm:py-3"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep === "review" ? (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50 sm:rounded-xl sm:px-8 sm:py-3"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-5 sm:w-5" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={goToNextStep}
                    className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:rounded-xl sm:px-8 sm:py-3"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <h2 className="mb-3 text-base font-bold text-gray-900 sm:mb-4 sm:text-lg">Order Summary</h2>

              {/* Items */}
              <div className="mb-3 max-h-48 space-y-2 overflow-y-auto sm:mb-4 sm:max-h-64 sm:space-y-3">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-2 sm:gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-16 sm:w-16">
                      <img
                        src={getFirstImage(item.product.images)}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-medium text-gray-900 sm:text-sm">{item.product.name}</p>
                      <p className="text-[10px] text-gray-500 sm:text-xs">Qty: {item.quantity}</p>
                      <p className="text-xs font-medium text-gray-900 sm:text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 border-t border-gray-100 pt-3 sm:space-y-2 sm:pt-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4">
                <span className="text-base font-bold text-gray-900 sm:text-lg">Total</span>
                <span className="text-base font-bold text-gray-900 sm:text-lg">${finalTotal.toFixed(2)}</span>
              </div>

              {/* Trust */}
              <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-gray-400 sm:mt-4 sm:text-xs">
                <ShieldCheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                Secure & encrypted checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
