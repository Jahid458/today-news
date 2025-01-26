import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

// import CheckoutForm from "src\pages\Payment\CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div className="min-h-screen">
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>

    </div>
  );
};

export default Payment;