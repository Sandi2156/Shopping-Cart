import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
	isCartOpen: boolean;
};

const ShoppingCart = ({ isCartOpen }: ShoppingCartProps) => {
	const { closeCart, cartItems } = useShoppingCart();
	return (
		<Offcanvas show={isCartOpen} placement="end" onHide={closeCart}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => {
						return <CartItem key={item.id} {...item} />;
					})}
					<div className="ms-auto fw-bold fs-5">
						{formatCurrency(
							cartItems.reduce((total, item) => {
								const tmp = storeItems.find((i) => i.id === item.id);
								return total + (tmp?.price || 0) * item.quantity;
							}, 0)
						)}
					</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingCart;
