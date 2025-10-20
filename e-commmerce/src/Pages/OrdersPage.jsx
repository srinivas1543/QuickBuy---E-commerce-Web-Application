import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import "./OrdersPage.css";
import Header from "../Components/Header";
import formatMoney from "../utils/money";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Orders({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    async function getOrdersPageData() {
      const response = await axios.get(
        "http://localhost:3000/api/orders?expand=products"
      );
      setOrders(response.data);
    }
    getOrdersPageData();
  }, []);

  // ✅ Add to Cart & remove from Orders
  const addToCart = async (orderId, productId, quantity = 1) => {
    // Step 1: Add to cart
    await axios.post("http://localhost:3000/api/cart-items", {
      productId,
      quantity,
    });
    await loadCart();

    // Step 2: Remove that product from the order (locally)
    setOrders((prevOrders) =>
      prevOrders
        .map((order) => {
          if (order.id === orderId) {
            const updatedProducts = order.products.filter(
              (p) => p.product.id !== productId
            );
            return { ...order, products: updatedProducts };
          }
          return order;
        })
        .filter((order) => order.products.length > 0) // remove empty orders
    );

    // Step 3: Show feedback briefly
    setAddedProductId(productId);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length === 0 ? (
            <div className="no-orders">No orders to display</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => (
                    <Fragment key={orderProduct.id}>
                      <div className="product-image-container">
                        <img src={orderProduct.product.image} alt="Product" />
                      </div>

                      <div className="product-details">
                        <div className="product-name">
                          {orderProduct.product.name}
                        </div>
                        <div className="product-delivery-date">
                          Arriving on:{" "}
                          {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                            "MMMM D"
                          )}
                        </div>
                        <div className="product-quantity">
                          Quantity: {orderProduct.quantity}
                        </div>

                        {/* Add to Cart button */}
                        <button
                          className="buy-again-button button-primary"
                          onClick={() =>
                            addToCart(
                              order.id,
                              orderProduct.product.id,
                              orderProduct.quantity
                            )
                          }
                        >
                          <img
                            className="buy-again-icon"
                            src="images/icons/buy-again.png"
                            alt="Buy Again"
                          />
                          <span className="buy-again-message">
                            {addedProductId === orderProduct.product.id
                              ? "✓ Added"
                              : "Add to Cart"}
                          </span>
                        </button>
                      </div>

                      <div className="product-actions">
                        <Link
                          to="/trackingPage"
                          state={{
                            product: orderProduct.product,
                            quantity: orderProduct.quantity,
                            estimatedDeliveryTimeMs:
                              orderProduct.estimatedDeliveryTimeMs,
                          }}
                        >
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </Link>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
