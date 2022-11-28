import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	openCart: () => void;
	closeCart: () => void;
	cartQuantity: number;
	cartItems: CartItem[];
};

type CartItem = {
	id: number;
	quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		"cartItems",
		[]
	);
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
	// const [cartQuantity, setCartQuantity] = useState<number>(0);
	const cartQuantity = cartItems.reduce(
		(quantity, item) => quantity + item.quantity,
		0
	);

	const openCart = () => {
		setIsCartOpen(true);
	};

	const closeCart = () => {
		setIsCartOpen(false);
	};

	const getItemQuantity = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};

	const increaseCartQuantity = (id: number) => {
		setCartItems((currentItems) => {
			if (!cartItems.find((item) => item.id === id)) {
				return [...currentItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) return { ...item, quantity: item.quantity + 1 };
					else return item;
				});
			}
		});
		// setCartQuantity((pre) => pre + 1);
	};

	const decreaseCartQuantity = (id: number) => {
		setCartItems((currentItems) => {
			if (cartItems.find((item) => item.id === id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) return { ...item, quantity: item.quantity - 1 };
					else return item;
				});
			}
		});
		// setCartQuantity((pre) => pre - 1);
	};

	const removeFromCart = (id: number) => {
		// setCartQuantity((prev) => {
		// 	return prev - (cartItems.find((item) => item.id === id)?.quantity || 0);
		// });
		setCartItems((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				openCart,
				closeCart,
				cartQuantity,
			}}
		>
			{children}
			<ShoppingCart isCartOpen={isCartOpen} />
		</ShoppingCartContext.Provider>
	);
}
