import './header.css';
import { Link } from 'react-router-dom';
function Header({ cart }){

    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });
    return(
        <>
           <div className ="header">
            <div className ="left-section">
                <Link to="/" className ="header-link">
                {/* <img className ="logo"
                    src="https://m.media-amazon.com/images/I/81j4snJN95L.png" /> */}
                   <img className ="mobile-logo"
                    src="https://cdn.shopify.com/s/files/1/0066/8912/8511/files/Logo_copy.jpeg?height=628&pad_color=fff&v=1614913224&width=1200" />
                </Link>
            </div>

            <div className ="middle-section">
                <input className ="search-bar" type="text" placeholder="Search" />

                <button className ="search-button">
                <img className ="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className ="right-section">
                <Link className ="orders-link header-link" to="/orders">

                <span className ="orders-text">Orders</span>
                </Link>

                <Link className ="cart-link header-link" to="/checkoutPage">
                <img className ="cart-icon" src="images/icons/cart-icon.png" />
                <div className ="cart-quantity">{totalQuantity}</div>
                <div className ="cart-text">Cart</div>
                </Link>
            </div>
           </div>
        </>
    )
}
export default Header;