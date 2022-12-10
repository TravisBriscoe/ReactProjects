import React from "react";

import Subtotal from "../Subtotal/Subtotal.component";

import "./Checkout.scss";

export default function Checkout({ cart }) {
	return (
		<div className="checkout">
			<div className="checkout__left">
				<img
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB4324392668_.jpg"
					alt=""
					className="checkout__ad"
				/>
				<div>
					<h2 className="checkout__title">Your Shopping Basket</h2>
				</div>
				{/* {cart.map((el, i) => {
					return null;
				})} */}
			</div>
			<div className="checkout__right">
				<Subtotal />
			</div>
		</div>
	);
}
