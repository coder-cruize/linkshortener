import { useReducer } from "react";

function Test() {
  const [a, b] = useReducer(myFunc, 1)

  function myFunc(state, action){
    return action.a + action.b
  }
  return (
    <div>
      <span>{a}</span><br />
      <button onClick={() => b({a: 2, b: a})}>Reducer</button>
    </div>
  );
}

export default Test;
