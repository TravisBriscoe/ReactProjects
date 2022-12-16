import React from "react";
import { useNavigate } from "react-router-dom";

import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../helpers/context/reducer";
import { useStateValue } from "../../helpers/context/StateProvider";

import "./Subtotal.scss";

export default function Subtotal() {
	const [{ basket }] = useStateValue();
	const history = useNavigate();

	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket?.length} items):
							<strong>{` ${value}`}</strong>
						</p>
						<small className="subtotal__gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			{basket.length > 0 ? (
				<button onClick={(e) => history("/payment")}>Proceed To Checkout</button>
			) : (
				<button disabled style={{ backgroundColor: "grey", borderColor: "grey", color: "#696969" }}>
					Proceed To Checkout
				</button>
			)}
		</div>
	);
}
