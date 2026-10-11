import site from '@/data/site.json';

export function formatPrice(value) {
  return `${site.currency}${Number(value).toFixed(2)}`;
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`;
}

export function telHref(phone) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}
