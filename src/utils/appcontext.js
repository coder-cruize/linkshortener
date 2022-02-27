import { createContext } from "react";

const AppContext = createContext({
  data: () => {},
  reload: () => {},
  user: () => {},
  newUser: false,
});

export default AppContext;