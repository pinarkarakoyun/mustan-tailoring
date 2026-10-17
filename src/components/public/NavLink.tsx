"use client";

import { Suspense, type ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type NavLinkProps = ComponentProps<typeof Link> & { href: string };

/** Menu link that is highlighted when it points to the current page. */
export function NavLink(props: NavLinkProps) {
  // usePathname() is only known at request time on dynamic pages (e.g. 404, /track/<token>).
  // Suspense lets Next.js pre-render a plain, non-highlighted link meanwhile.
  return (
    <Suspense fallback={<NavLinkView {...props} isActive={false} />}>
      <ActiveNavLink {...props} />
    </Suspense>
  );
}

function ActiveNavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    props.href === "/" ? pathname === "/" : pathname.startsWith(props.href);
  return <NavLinkView {...props} isActive={isActive} />;
}

function NavLinkView({
  isActive,
  className = "",
  ...props
}: NavLinkProps & { isActive: boolean }) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={`flex min-h-11 items-center rounded-lg px-3 font-medium ${
        isActive
          ? "bg-primary/10 text-primary underline underline-offset-4"
          : "text-foreground hover:bg-border/40"
      } ${className}`}
      {...props}
    />
  );
}
