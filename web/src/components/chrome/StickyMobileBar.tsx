import { orderHref, orderMessage, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <Button href={orderHref} size="md" className="flex-1">Order a Book</Button>
      <Button href={whatsappLink(orderMessage())} variant="secondary" size="md" className="flex-1">
        WhatsApp
      </Button>
    </div>
  );
}
