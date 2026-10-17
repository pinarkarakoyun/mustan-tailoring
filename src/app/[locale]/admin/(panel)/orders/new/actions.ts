"use server";

import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { createOrder } from "@/lib/orders";
import { normalizePhone } from "@/lib/phone";

const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 30;

export type NewOrderState = {
  errors: {
    name?: "nameRequired" | "nameTooLong";
    phone?: "phoneRequired" | "phoneInvalid";
  };
  /** What the user typed, so the form keeps it after an error. */
  values: { name: string; phone: string; language: string };
};

export async function createOrderAction(
  _previousState: NewOrderState,
  formData: FormData,
): Promise<NewOrderState> {
  // Server Actions are public endpoints: always check the login again here.
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const phoneInput = String(formData.get("phone") ?? "").trim();
  const languageInput = String(formData.get("language") ?? "");

  const errors: NewOrderState["errors"] = {};
  if (!name) errors.name = "nameRequired";
  else if (name.length > MAX_NAME_LENGTH) errors.name = "nameTooLong";

  const phone = phoneInput.length <= MAX_PHONE_LENGTH ? normalizePhone(phoneInput) : null;
  if (!phoneInput) errors.phone = "phoneRequired";
  else if (!phone) errors.phone = "phoneInvalid";

  if (errors.name || errors.phone || !phone) {
    return { errors, values: { name, phone: phoneInput, language: languageInput } };
  }

  const order = await createOrder({
    customerName: name,
    customerPhone: phone,
    // Unknown values fall back to Dutch instead of failing.
    customerLanguage: hasLocale(routing.locales, languageInput)
      ? languageInput
      : routing.defaultLocale,
  });

  redirect({
    href: { pathname: `/admin/orders/${order.id}`, query: { created: "1" } },
    locale: await getLocale(),
  });
  return { errors: {}, values: { name: "", phone: "", language: "" } };
}
