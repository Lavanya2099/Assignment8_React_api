import axios from "axios";
import React, { useEffect, useState } from "react";
import JSONHTTP from "../axiosConfig";

function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  console.log("users state", users);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setloading(true);
      const res = await JSONHTTP.get("users");

      setloading(false);
      // console.log('res',res);
      const data = res.data;
      // console.log(data);
      setusers(data);
    } catch (err) {
      console.log(err);
      setloading(false);
      seterror(err);
    }
  };

  if (!loading) {
    if (error) {
      return <div style={{ color: "red" }}>{error.message}</div>;
    } else {
      return (
        <div>
          {users.map((user) => {
            return <p key={user.id}>{user.name}</p>;
          })}
        </div>
      );
    }
  } else {
    return <h2 style={{ color: "green" }}>Loading ....</h2>;
  }
}

export default Users;