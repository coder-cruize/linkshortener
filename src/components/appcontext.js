import { createContext } from "react";

const AppContext = createContext({
  data: () => {},
  reload: () => {},
  user: () => {},
  modal: () => {},
});

export default AppContext;