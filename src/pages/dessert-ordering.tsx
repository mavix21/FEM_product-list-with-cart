import { useState } from "react";
import { DessertCard } from "@/components/dessert-card";
import Cart from "@/components/cart";
import type { DessertItem, CartItem } from "@/types/dessert";
import desserts from "@/data/desserts.json";

export default function DessertOrdering() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [, setOrderConfirmed] = useState(false);

  const addToCart = (dessert: DessertItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dessert.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...dessert, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getItemQuantity = (id: string) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    setCart([]);
    setOrderConfirmed(false);
  };

  return (
    <div className="bg-card min-h-screen px-4 py-12 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Desserts Grid */}
          <div className="space-y-6 lg:col-span-2">
            <h1 className="text-card-foreground text-3xl font-bold lg:text-4xl">
              Desserts
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {desserts.map((dessert) => (
                <DessertCard
                  key={dessert.id}
                  dessert={dessert}
                  quantity={getItemQuantity(dessert.id)}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <Cart
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onConfirmOrder={handleConfirmOrder}
              onStartNewOrder={handleStartNewOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
