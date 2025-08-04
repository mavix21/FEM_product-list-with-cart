"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { CartItem } from "../types/dessert";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: CartItem[];
  orderTotal: number;
  onStartNewOrder: () => void;
}

function OrderConfirmationContent({
  orderItems,
  orderTotal,
  onStartNewOrder,
}: {
  orderItems: CartItem[];
  orderTotal: number;
  onStartNewOrder: () => void;
}) {
  return (
    <div className="mx-auto w-full space-y-6 p-6">
      {/* Success Icon */}
      <div className="mb-6 flex justify-start">
        <img
          src="/images/icon-order-confirmed.svg"
          alt="Order Confirmed"
          className="size-12"
        />
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-card-foreground mb-2 text-3xl font-bold">
          Order Confirmed
        </h2>
        <p className="text-muted-foreground">We hope you enjoy your food!</p>
      </div>

      {/* Order Items */}
      <div className="bg-background divide-muted divide-y rounded-md">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg p-3">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={item.image.mobile}
                alt={item.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-card-foreground truncate text-sm font-semibold">
                {item.name}
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-semibold">
                  {item.quantity}x
                </span>
                <span className="text-muted-foreground">
                  @ ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-card-foreground font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        <div className="mb-8 flex items-center justify-between p-4">
          <span className="text-card-foreground text-sm">Order Total</span>
          <span className="text-card-foreground text-xl font-bold">
            ${orderTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Order Total */}

      {/* Start New Order Button */}
      <Button
        onClick={onStartNewOrder}
        className="bg-primary hover:bg-primary/90 w-full rounded-full py-3 text-base font-semibold text-white"
      >
        Start New Order
      </Button>
    </div>
  );
}

export default function OrderConfirmation({
  isOpen,
  onClose,
  orderItems,
  orderTotal,
  onStartNewOrder,
}: OrderConfirmationProps) {
  const isMobile = useIsMobile();

  const handleStartNewOrder = () => {
    onStartNewOrder();
    onClose();
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="bottom"
          className="h-[90vh] rounded-t-2xl border-0 p-0"
        >
          <OrderConfirmationContent
            orderItems={orderItems}
            orderTotal={orderTotal}
            onStartNewOrder={handleStartNewOrder}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gap-0 border-0 bg-white p-0 sm:max-w-md">
        <OrderConfirmationContent
          orderItems={orderItems}
          orderTotal={orderTotal}
          onStartNewOrder={handleStartNewOrder}
        />
      </DialogContent>
    </Dialog>
  );
}
