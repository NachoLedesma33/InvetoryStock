"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export const CartIcon = () => {
    const {cart} = useCart();
}
