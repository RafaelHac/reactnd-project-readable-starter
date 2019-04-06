import * as API from '../utils/PostsAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function receiveCategories ({ categories }, categorySelected) {
  console.log(categories);
  return {
    type: RECEIVE_CATEGORIES,
    categories,
    categorySelected
  }
};

export const handleReceiveCategories = (categorySelected = '') => {
  return (dispatch) => {
    return API.getCategories()
      .then((categories) => dispatch(receiveCategories(categories, categorySelected)));
  };
};

