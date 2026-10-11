import menu from '@/data/menu.json';

export const categories = menu.categories;
export const items = menu.items;

export function getItemById(id) {
  return items.find((item) => item.id === id) || null;
}

export function getHighlights() {
  return items.filter((item) => item.highlight);
}

export function getCategoryName(categoryId) {
  const found = categories.find((c) => c.id === categoryId);
  return found ? found.name : '';
}

export function isValidCategory(categoryId) {
  return categories.some((c) => c.id === categoryId);
}
