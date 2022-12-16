import React from "react";
import { useStateValue } from "../../helpers/context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct.component";

import Subtotal from "../Subtotal/Subtotal.component";

import "./Checkout.scss";

export default function Checkout() {
	const [{ basket, user }] = useStateValue();

	return (
		<div className="checkout">
			<div className="checkout__left">
				<img
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB4324392668_.jpg"
					alt=""
					className="checkout__ad"
				/>
				<div>
					<h3>Hello, {user ? user?.email : "Guest"}.</h3>
					<h2 className="checkout__title">Your Shopping Basket</h2>

					{basket.map((el) => {
						console.log(el);
						return (
							<CheckoutProduct
								key={el.id}
								id={el.id}
								image={el.image}
								title={el.title}
								rating={el.rating}
								price={el.price}
							/>
						);
					})}
				</div>
			</div>
			<div className="checkout__right">
				<Subtotal />
			</div>
		</div>
	);
}
