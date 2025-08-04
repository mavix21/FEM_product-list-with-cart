import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import type { DessertItem } from "@/types/dessert";

interface DessertCardProps {
  dessert: DessertItem;
  quantity: number;
  onAddToCart: (dessert: DessertItem) => void;
  onUpdateQuantity: (id: string, change: number) => void;
}

export function DessertCard({
  dessert,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}: DessertCardProps) {
  return (
    <Card className="border-0 py-0 shadow-none">
      <CardContent className="!p-0">
        <div className="relative">
          <div
            className={`relative ${quantity > 0 ? "outline-primary rounded-lg outline-2" : ""}`}
          >
            <picture>
              <source
                srcSet={dessert.image.desktop}
                media="(min-width: 1440px)"
              />
              <source
                srcSet={dessert.image.tablet}
                media="(min-width: 768px)"
              />
              <source
                srcSet={dessert.image.mobile}
                media="(min-width: 375px)"
              />
              <img
                src={dessert.image.mobile}
                alt={dessert.name}
                className="aspect-video w-full rounded-lg object-cover md:aspect-square"
              />
            </picture>
          </div>

          {quantity > 0 ? (
            <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 transform">
              <div className="bg-primary flex min-w-[148px] items-center justify-between rounded-full px-4 py-2 text-white shadow-lg">
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:text-primary h-6 w-6 rounded-full border border-white p-0 text-white hover:bg-white"
                  onClick={() => onUpdateQuantity(dessert.id, -1)}
                >
                  <Minus className="size-3" />
                </Button>
                <span className="px-3 text-sm font-semibold">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:text-primary size-6 rounded-full border border-white p-0 text-white hover:bg-white"
                  onClick={() => onUpdateQuantity(dessert.id, 1)}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 transform">
              <Button
                onClick={() => onAddToCart(dessert)}
                className="bg-background text-foreground border-primary hover:bg-muted hover:text-primary rounded-full border px-8"
                size="lg"
              >
                <img
                  src="/images/icon-add-to-cart.svg"
                  alt="Add to Cart"
                  className="size-4"
                />
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        <div className="pt-8 pb-4">
          <p className="text-muted-foreground mb-1 text-sm">
            {dessert.category}
          </p>
          <h3 className="text-card-foreground mb-1 font-semibold">
            {dessert.name}
          </h3>
          <p className="text-primary font-semibold">
            ${dessert.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
