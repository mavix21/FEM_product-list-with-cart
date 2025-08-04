import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
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
    <Card className="border-0 shadow-none py-0">
      <CardContent className="!p-0">
        <div className="relative">
          <div
            className={`relative ${quantity > 0 ? "outline-2 outline-primary rounded-lg" : ""}`}
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
                className="w-full aspect-video md:aspect-square object-cover rounded-lg"
              />
            </picture>
          </div>

          {quantity > 0 ? (
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center bg-primary text-white rounded-full px-4 py-2 shadow-lg min-w-[120px] justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-primary/80 rounded-full border border-white"
                  onClick={() => onUpdateQuantity(dessert.id, -1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-semibold text-sm px-3">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-primary/80 rounded-full border border-white"
                  onClick={() => onUpdateQuantity(dessert.id, 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <Button
                onClick={() => onAddToCart(dessert)}
                className="bg-background text-card-foreground border border-muted hover:bg-muted hover:text-primary rounded-full px-6 py-2"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        <div className="pt-8 pb-4">
          <p className="text-sm text-muted-foreground mb-1">
            {dessert.category}
          </p>
          <h3 className="font-semibold text-card-foreground mb-1">
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
