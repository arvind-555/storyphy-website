import Image from "next/image";
import Link from "next/link";
import { nav, orderHref } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Link href="/" aria-label="Storyphy home">
          <Image src="/logo.jpg" alt="Storyphy - Dream. Read. Repeat." width={160} height={71} loading="eager" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-ink-soft hover:text-brand-purple">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={orderHref} size="md">Order a Book</Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
