import { createContext, useContext, useState } from "react";

// create the context
const CartContext = createContext();

// create a provider for that context
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /**
   *  Try to find if the plant is already in the cart.
   *  If it is, then create a new copy of the cart by mapping over it and
   *  increasing the quantity of just that cart item by 1.
   *  If it isn't, then create a new cart item with a quantity of 1.
   *  A cart item is just a plant with an additional quantity property.
   */
  const addToCart = (plant) => {
    const itemExists = cart.find((i) => i.id === plant.id);
    if (itemExists) {
      setCart(
        cart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const item = { ...plant, quantity: 1 };
      setCart([...cart, item]);
    }
  };

  /**
   * First, use `map` to decrease the quantity of the item to remove by 1.
   * Then, keep only the items that have a quantity greater than 0.
   */
  const removeFromCart = (itemToRemove) => {
    setCart(
      cart
        .map((item) =>
          item.id === itemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const value = { cart, addToCart, removeFromCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context)
    throw Error("useCart must be used within a CartContext Provider");

  return context;
}
