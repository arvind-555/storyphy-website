import { whatsappLink } from "@/config/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Storyphy! I have a question.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-lg hover:scale-105 md:flex"
    >
      <span aria-hidden>💬</span>
    </a>
  );
}
