import { useState } from "react";
import { DessertCard } from "@/components/dessert-card";
import Cart from "@/components/cart";
import type { DessertItem, CartItem } from "@/types/dessert";
import desserts from "@/data/desserts.json";

export default function DessertOrdering() {
  const [cart, setCart] = useState<CartItem[]>([]);

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
    // Handle order confirmation logic here
    console.log("Order confirmed:", cart);
    alert("Order confirmed! Thank you for your purchase.");
  };

  return (
    <div className="min-h-screen bg-card p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Desserts Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
              Desserts
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
