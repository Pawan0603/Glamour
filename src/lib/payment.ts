import axios, { AxiosError } from "axios";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// const route = useRouter();

const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, salonId }: {
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  salonId: string,
}) => {
  const data = {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    salonId,
  }

  try {
    const res = axios.patch(`/api/payment/verify`, data);
    toast.success("Payment verified and appointment scheduled successfully");
    // route.push("/my-appointments");
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    toast.error(err.response?.data.error || "somethin went worng.")
  }
}

// payment functionality
declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export const handlePayment = async (amount: number, salonId: string): Promise<void> => {
  await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  const res = await fetch("/api/payment/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: amount }),
  });

  const order: RazorpayOrder = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    amount: order.amount,
    currency: "INR",
    name: "Glamour",
    description: "Test Transaction",
    order_id: order.id,

    handler: function (response: {
      razorpay_order_id: string,
      razorpay_payment_id: string,
      razorpay_signature: string,
    }) {
      console.log("Payment Success", response);
      verifyPayment({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, salonId })
    },

    prefill: {
      name: "Pawan",
      email: "pawan@email.com",
      contact: "9999999999",
    },

    theme: {
      color: "#3399cc",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};