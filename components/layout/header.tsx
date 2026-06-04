"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
};

const navItems = [
  { href: "/", label: "Menu", id: "nav-link-menu" },
  { href: "/deals", label: "Deals", id: "nav-link-deals" },
  { href: "/pedidos", label: "Orders", id: "nav-link-orders" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (href: string) => {
    const active = isActive(pathname, href);
    return `font-semibold border-b-2 pb-1 font-label-md text-label-md lg:text-sm transition-all duration-200 ${
      active
        ? "text-primary border-primary"
        : "text-green-100 border-transparent hover:text-primary hover:border-primary/50"
    }`;
  };

  const mobileLinkClass = (href: string) => {
    const active = isActive(pathname, href);
    return `text-left py-2 font-semibold font-label-md text-label-md transition-colors block ${
      active ? "text-primary border-l-4 border-primary pl-2" : "text-green-100 pl-2"
    }`;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent border-b border-white/5 transition-all duration-300">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 lg:h-14 max-w-container-max mx-auto">
        <Link
          href="/"
          className="text-xl sm:text-2xl lg:text-3xl font-headline-md text-amber-400 text-neon-amber uppercase tracking-tight cursor-pointer transition-all duration-300 hover:opacity-100"
          id="header-brand"
        >
          Bigpizza do Gu
        </Link>

        <nav className="hidden md:flex gap-8 lg:gap-6" id="header-nav-web">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass(item.href)}
              id={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 lg:gap-3 text-primary" id="header-actions">
          <button
            type="button"
            onClick={onCartClick}
            className="relative cursor-pointer active:scale-95 transition-transform p-2 lg:p-1.5 bg-primary-container text-on-primary-container rounded-full w-11 h-11 lg:w-10 lg:h-10 flex items-center justify-center hover:brightness-110"
            title="Visualizar Sacola de Compras"
            id="btn-shopping-cart"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden cursor-pointer active:scale-95 transition-transform p-2 hover:bg-green-800 rounded-full text-green-100"
            id="btn-mobile-menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/5 backdrop-blur-[2px] border-t border-white/5 py-4 px-margin-mobile flex flex-col gap-4 transition-all duration-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={mobileLinkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
