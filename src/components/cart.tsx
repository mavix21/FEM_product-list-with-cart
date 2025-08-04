import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DessertItem } from "@/types/dessert";
import emptyCart from "@/assets/images/illustration-empty-cart.svg";

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
      <Card className="border-0 bg-white shadow-none">
        <CardContent>
          <h2 className="text-primary mb-6 text-2xl font-bold">
            Your Cart ({getTotalItems()})
          </h2>

          {cart.length === 0 ? (
            <div className="py-8 text-center">
              <img
                src={emptyCart}
                alt="Empty Cart"
                className="mx-auto mb-4 size-32"
              />
              <p className="text-muted-foreground">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <>
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-muted flex items-center justify-between border-b py-4"
                  >
                    <div className="flex-1">
                      <h4 className="text-card-foreground text-sm font-semibold">
                        {item.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-4">
                        <span className="text-primary font-semibold">
                          {item.quantity}x
                        </span>
                        <span className="text-muted-foreground">
                          @ ${item.price.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-card-foreground border-muted h-6 w-6 rounded-full border p-0"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <img
                        src="/images/icon-remove-item.svg"
                        alt=""
                        className="size-3"
                      />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-card-foreground text-sm">
                  Order Total
                </span>
                <span className="text-card-foreground text-2xl font-bold">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="bg-background mb-6 flex items-center justify-center gap-2 rounded-md py-4 text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/icon-carbon-neutral.svg"
                    alt="Leaf"
                    className="size-4"
                  />
                  This is a{" "}
                  <span className="font-semibold">carbon-neutral</span> delivery
                </div>
              </div>

              <Button
                className="bg-primary hover:bg-primary/90 w-full rounded-full py-3 text-white"
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
