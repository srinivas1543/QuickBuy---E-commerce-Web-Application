import { Link, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import './TrackingPage.css';
import dayjs from 'dayjs';

function TrackingPage({ cart }) {
  const location = useLocation();
  const { product, quantity, estimatedDeliveryTimeMs } = location.state || {};

  return (
    <>
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          {product ? (
            <>
              <div className="delivery-date">
                Arriving on{' '}
                {dayjs(estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>

              <div className="product-info">{product.name}</div>

              <div className="product-info">Quantity: {quantity}</div>

              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />

              {/* Tracking status */}
              <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div className="progress-label current-status">Shipped</div>
                <div className="progress-label">Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar"></div>
              </div>
            </>
          ) : (
            <p>No tracking details available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
