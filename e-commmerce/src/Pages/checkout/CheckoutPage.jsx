import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import "./Checkout-header.css";
import { Link } from "react-router-dom";
import { OderSummary } from "./OrderSummery";
import { PaymentSummary } from "./PaymentSummary";
function CheckoutPage({ cart, loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    async function getCheckoutData(){
      // delivery-options data
      let response = await axios.get("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime");
      setDeliveryOptions(response.data);
    };
    getCheckoutData();
  }, []);
   useEffect( () => {
    // payment summary data
      async function getPaymentSummary(){
        let response = await axios.get("http://localhost:3000/api/payment-summary")
        setPaymentSummary(response.data);
      }; 
      getPaymentSummary();
  },[cart])
  
  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <Link to="/">
             <button id="backButton">Back</button>
          </Link>
          <div className="checkout-header-left-section">
            <Link to="/">
              {/* <img className ="logo" src="images/logo.png" /> */}
              <img
                className="mobile-logo"
                src="https://cdn.shopify.com/s/files/1/0066/8912/8511/files/Logo_copy.jpeg?height=628&pad_color=fff&v=1614913224&width=1200"
              />
            </Link>
          </div>
          
          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          
          <OderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div> 
    </>
  );
}

export default CheckoutPage;
