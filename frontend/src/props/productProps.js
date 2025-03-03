import PropTypes from 'prop-types';

export const ProductItemPropTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
