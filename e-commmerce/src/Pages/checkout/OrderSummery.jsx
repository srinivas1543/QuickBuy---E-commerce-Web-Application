import dayjs from "dayjs";
import axios from "axios";
import formatMoney from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OderSummary({ cart, deliveryOptions ,loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&  cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            });

            const deleteCartItem = async () =>{
              await axios.delete(`http://localhost:3000/api/cart-items/${cartItem.productId}`);
              await loadCart();
            };
            const updateCartItem = async () => {
              let updateNumber = prompt("Enter the new number");
              await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`,{
                quantity : Number(updateNumber)
              });;
            };
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateCartItem} >
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
