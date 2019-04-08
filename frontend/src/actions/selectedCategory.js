export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export function selectCategory (selectedCategory = '') {
  return {
    type: SELECT_CATEGORY,
    selectedCategory
  }
};