import React from "react";
import { Link } from "react-router-dom";

import { useStateValue } from "../../helpers/context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct.component";

import "./Payment.scss";

function Payment() {
	const [{ user, basket }] = useStateValue();

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						{user ? (
							<>
								<p>{user?.email}</p>
								<p>123 React Lane</p>
								<p>Los Angeles, CA</p>
							</>
						) : (
							<>
								<p>Hello, Guest</p>
								<p>
									Please <Link to="/login">Sign in</Link> to proceed
								</p>
							</>
						)}
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review Items and Delivery</h3>
					</div>
					<div className="payment__items">
						{basket.length > 0 ? (
							basket.map((el) => (
								<CheckoutProduct
									key={el.id}
									item={el.id}
									image={el.image}
									title={el.title}
									price={el.price}
									rating={el.rating}
								/>
							))
						) : (
							<>
								<p>No Items in your basket!</p>
								<p>
									Add <Link to="/">Items</Link> to your basket
								</p>
							</>
						)}
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment_details"></div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
