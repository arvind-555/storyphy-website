import Link from "next/link";
import { nav, site, whatsappLink } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-white">Storyphy</p>
          <p className="mt-1 text-sm tracking-widest text-brand-gold">DREAM · READ · REPEAT</p>
          <p className="mt-4 text-sm">
            Personalized storybooks where every child is the hero. Made with love in India.
          </p>
        </div>
        <div>
          <p className="mb-3 font-bold text-white">Explore</p>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold text-white">Contact us</p>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><a href={site.phoneHref} className="hover:text-white">{site.phoneDisplay}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp us</a></li>
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        Secure payments · UPI, cards and netbanking · © {new Date().getFullYear()} Storyphy. Made with love in India.
      </div>
    </footer>
  );
}
