import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    // send data to backend
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        // create new users
        const newUsers = [...users, data];

        // set users to displayed users
        setUsers(newUsers);

        // reset the form(e.target.reset())
        form.reset();
      });
  };

  return (
    <>
      <h1>Users Management client</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <div>
        {users.map(user => (
          <p key={user.id}>
            {user.id}: {user.name}: {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
