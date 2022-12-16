import React from "react";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { useStateValue } from "../../helpers/context/StateProvider";
import { auth } from "../../helpers/firebase/firebase";

import "./Header.scss";

function Header() {
	const [{ basket, user }] = useStateValue();

	const handleAuthentication = () => {
		console.log(user);

		if (user) {
			auth.signOut();
		}
	};

	return (
		<header className="header">
			<Link to="/">
				<img
					src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt="Amazon Logo"
					className="header__logo"
				/>
			</Link>

			<div className="header__search">
				<input className="header__searchInput" type="text" />
				<SearchIcon className="header__searchIcon" />
			</div>

			<div className="header__nav">
				<Link to={!user && "/login"} style={{ textDecoration: "none" }}>
					<div className="header__option" onClick={handleAuthentication}>
						<span className="header__optionLineOne">
							Hello, {user?.name ? user.name : user?.email ? user.email : "Guest"}
						</span>
						<span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
					</div>
				</Link>
				<div className="header__option">
					<span className="header__optionLineOne">Returns</span>
					<span className="header__optionLineTwo">& Orders</span>
				</div>
				<div className="header__option">
					<span className="header__optionLineOne">Your</span>
					<span className="header__optionLineTwo">Prime</span>
				</div>

				<Link to="/checkout">
					<div className="header__optionBasket">
						<ShoppingBasketIcon />
						<span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
					</div>
				</Link>
			</div>
		</header>
	);
}

export default Header;
