"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/data/site.json";
import { categories } from "@/lib/menu";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SearchOverlay from "@/components/layout/SearchOverlay";

function isActive(pathname, href) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-ink/95 shadow-lg backdrop-blur"
            : "border-transparent bg-ink"
        }`}
      >
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image
              src={site.logo.header}
              alt={site.name}
              width={site.logo.width}
              height={site.logo.height}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => {
                const active = isActive(pathname, item.href);
                const hasDropdown = item.dropdown === "categories";
                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1 py-2 text-base font-medium transition-colors ${
                        active ? "text-brand" : "text-white/90 hover:text-brand"
                      }`}
                    >
                      {item.label}
                      {hasDropdown && (
                        <Icon
                          name="chevronDown"
                          size={18}
                          className="transition-transform group-hover:rotate-180"
                        />
                      )}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-0.5 bg-brand transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>

                    {hasDropdown && (
                      <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="rounded-lg border border-white/10 bg-ink-900 p-2 shadow-2xl">
                          <Link
                            href="/menu"
                            className="block rounded px-3 py-2 text-base text-white/80 transition hover:bg-white/5 hover:text-brand"
                          >
                            All Items
                          </Link>
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/menu?category=${category.id}`}
                              className="block rounded px-3 py-2 text-base text-white/80 transition hover:bg-white/5   hover:text-brand"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the menu"
              className="rounded-md p-2 text-white transition hover:text-brand"
            >
              <Icon name="search" size={18} />
            </button>
            <Link
              href="/contact"
              aria-label="Contact us"
              className="hidden rounded-md p-2 text-white transition hover:text-brand sm:block"
            >
              <Icon name="user" size={18} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${itemCount} item${
                itemCount === 1 ? "" : "s"
              }`}
              className="relative rounded-md p-2 text-white transition hover:text-brand"
            >
              <Icon name="cart" size={18} />
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] animate-pop items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white"
                >
                  {itemCount}
                </span>
              )}
            </button>
            <Button
              href={site.headerCta.href}
              size="md"
              className="ml-2 hidden sm:inline-flex"
            >
              {site.headerCta.label}
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="rounded-md p-2 text-white transition hover:text-brand lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-ink transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-6 py-6">
          <ul className="space-y-1">
            {site.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-3 text-lg font-medium ${
                    isActive(pathname, item.href) ? "text-brand" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
                {item.dropdown === "categories" && (
                  <ul className="mb-2 ml-3 space-y-1 border-l border-white/10 pl-4">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/menu?category=${category.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-white/70 hover:text-brand"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Button
            href={site.headerCta.href}
            size={"lg"}
            className="mt-6 w-full"
            onClick={() => setMobileOpen(false)}
          >
            {site.headerCta.label}
          </Button>
        </nav>
      </div>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
