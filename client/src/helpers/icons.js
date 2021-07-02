import { faSearch, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(faSearch, faShoppingCart, faTrash);
};

export default Icons;
