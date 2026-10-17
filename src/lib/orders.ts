import { connection } from "next/server";
import type { Order, StatusChange } from "@/types/order";
import { createSeedData } from "./mock-data";

// THE single place for order data access.
// Prototype: data lives in server memory and resets when the server restarts.
// Later, only the inside of this file changes to use a real database (Supabase/PostgreSQL).

type Store = {
  orders: Order[];
  statusChanges: StatusChange[];
};

// Kept on globalThis so it survives hot reloads in development.
const globalForStore = globalThis as unknown as { mustanStore?: Store };

async function getStore(): Promise<Store> {
  // Mock data can change at any time, so tell Next.js to read it on every
  // request instead of baking it into a pre-rendered page.
  await connection();
  globalForStore.mustanStore ??= createSeedData(new Date());
  return globalForStore.mustanStore;
}

/** All orders, newest first. Returns copies, like a database would. */
export async function listOrders(): Promise<Order[]> {
  const store = await getStore();
  return structuredClone(store.orders).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}
