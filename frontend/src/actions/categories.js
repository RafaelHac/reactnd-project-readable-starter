import * as API from '../utils/PostsAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function receiveCategories ({ categories }, selectedCategory = '') {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
    selectedCategory
  }
};

export const handleReceiveCategories = (selectedCategory = '') => {
  return (dispatch) => {
    return API.getCategories()
      .then((categories) => dispatch(receiveCategories(categories, selectedCategory)));
  };
};

