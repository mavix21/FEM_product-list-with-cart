import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DessertItem } from "@/types/dessert";
import emptyCart from "@/assets/images/illustration-empty-cart.svg";
import { Leaf } from "lucide-react";

interface CartItem extends DessertItem {
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onConfirmOrder: () => void;
}

export default function Cart({
  cart,
  onRemoveFromCart,
  onConfirmOrder,
}: CartProps) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="sticky top-8">
      <Card className="bg-white border-0 shadow-none">
        <CardContent>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Your Cart ({getTotalItems()})
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <img
                src={emptyCart}
                alt="Empty Cart"
                className="size-32 mx-auto mb-4"
              />
              <p className="text-muted-foreground">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-muted"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground text-sm">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-primary font-semibold">
                          {item.quantity}x
                        </span>
                        <span className="text-muted-foreground">
                          @ ${item.price.toFixed(2)}
                        </span>
                        <span className="font-semibold text-muted-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-card-foreground rounded-full border border-muted"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between py-4 border-t border-muted">
                <span className="text-card-foreground">Order Total</span>
                <span className="text-2xl font-bold text-card-foreground">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Leaf className="h-4 w-4" />
                This is a <span className="font-semibold">
                  carbon-neutral
                </span>{" "}
                delivery
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3"
                onClick={onConfirmOrder}
              >
                Confirm Order
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
