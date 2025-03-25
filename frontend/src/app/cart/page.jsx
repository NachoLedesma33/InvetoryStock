"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const cartTotal = cart.products.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (
      confirm("This would normally go to checkout. Clear the cart instead?")
    ) {
      clearCart();
    }
  };

  if (authLoading || cartLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Su Carrito
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Revisar y administrar sus artículos
        </p>
      </div>

      <Card>
        {cart.products.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Su carrito esta vacio
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Parece que aún no has añadido ningún producto a su carrito.
            </p>
            <Link href="/products">
              <Button>Continuar con su compra</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.products.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="mt-6 space-y-3">
                <Button variant="primary" fullWidth onClick={handleCheckout}>
                  Checkout
                </Button>

                <Link href="/products">
                  <Button variant="outline" fullWidth>
                    Continuar con su compra
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
