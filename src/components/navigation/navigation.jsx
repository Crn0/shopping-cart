import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./css/navigation.module.css";

function Navigation({cartList}) {

    return(
        <header>
            <nav className={`${styles.flex} ${styles.childPos}`}>
                <div className={`${styles.flex}`}>
                    <img src="https://placehold.co/100" alt="place holder image" />
                </div>
                <div className={`${styles.flex} ${styles.gap}`}>
                    <Link to="home">Home</Link>
                    <Link to="shop">Shop</Link>
                    <Link to="cart">Cart <span>{cartList}</span></Link>
                </div>
            </nav>
        </header>
    );
}

Navigation.defaultProps = {
    cartList: 0,
};

Navigation.propTypes = {
    cartList: PropTypes.number
};

export default Navigation;