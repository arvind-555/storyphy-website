export type QuoteInput = {
  school: string;
  city: string;
  contactName: string;
  role: string;
  children: string;
  occasion: string;
  targetDate: string;
  phone: string;
  email: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

export function validateQuote(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!input.school.trim()) errors.school = "Please enter your school's name.";
  if (!input.city.trim()) errors.city = "Please enter your city.";
  if (!input.contactName.trim()) errors.contactName = "Please enter a contact name.";
  if (!/^[6-9]\d{9}$/.test(normalizePhone(input.phone))) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }
  if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (input.children.trim() && !/^[1-9]\d*$/.test(input.children.trim())) {
    errors.children = "Please enter a whole number of children.";
  }
  return errors;
}

export function buildQuoteMessage(input: QuoteInput): string {
  const lines: [string, string][] = [
    ["School", input.school],
    ["City", input.city],
    ["Contact", input.contactName],
    ["Role", input.role],
    ["Phone", input.phone],
    ["Email", input.email],
    ["Approx. children", input.children],
    ["Occasion", input.occasion],
    ["Target date", input.targetDate],
  ];
  const body = lines
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join("\n");
  return `Hi Storyphy! We'd like a school quote.\n${body}`;
}
