import React from "react";

import { useStateValue } from "../../helpers/context/StateProvider";

import "./Product.scss";

export default function Product({ id, title, image, price, rating }) {
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id,
				title,
				image,
				price,
				rating,
			},
		});
	};

	return (
		<div className="product">
			<div className="product__info">
				<p>{title}</p>
				<p className="product__price">
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className="product__rating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p key={i}>⭐</p>
						))}
				</div>
			</div>

			<div>
				<img src={image} alt="" className="product__img" />
			</div>

			<div>
				<button className="product__button" onClick={addToBasket}>
					Add To Basket
				</button>
			</div>
		</div>
	);
}
