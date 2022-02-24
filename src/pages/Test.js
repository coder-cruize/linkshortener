import { useState, useEffect, useReducer } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, rtdb } from "../firebaseClient";
import { ref, set } from "firebase/database";
import toast from "react-hot-toast";

function writeUserData(userId, name, email) {
  set(ref(rtdb, "links/lbi1ym/fullLink"), name)
  .then(() => {
    toast('successfully set to db')
  })
  .catch((error) => {
    toast(error.message)
  })
}

function Test() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [user, setUsers] = useState([]);
  const userRef = collection(db, "users");
  const [a, b] = useReducer(myFunc, 1)


  function myFunc(state, action){
    return action.a + action.b
  }
  const createUser = async () => {
    // await addDoc(userRef, {name: name, age: age})
    try {
      await writeUserData("", name, "a@a.com");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div>
      <span>
        {user.map((u) => {
          return (
            <div className="me" key={u.age}>
              {u.name}
            </div>
          );
        })}
      </span>

      <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="number" onChange={(e) => setAge(e.target.value)} />
      <button onClick={createUser}>create user</button>
      <br />
      <span>{a}</span>
      <button onClick={() => b({a: 2, b: a})}>Reducer</button>
    </div>
  );
}

export default Test;
