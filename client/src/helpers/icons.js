import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(
    faSearch, faShoppingCart
  );
};

export default Icons;
