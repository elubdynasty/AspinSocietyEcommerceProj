import { faSearch, faShoppingCart, faTrash, faSignInAlt, faTimes, faCheck, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(faSearch, faShoppingCart, faTrash, faSignInAlt, faTimes, faCheck, faEdit, faPlus);
};

export default Icons;
