import Sidebar from "./sidebar";
import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import UsersRowList from "./usersRowList";

function Users() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8500/user/passenger/getAll").then((response) => {
      setList(response.data);
    });
  },[]);

  return (
    <div>
      <Sidebar/>
      <div className="container">
      <div class="ui huge header m-3"><h2>View all the Users</h2></div>
      <table class="ui red table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            
          </tr>
        </thead>
        {list.length > 0 &&
              list.map((l) => (
                <UsersRowList
                  id={l.id}
                  username={l.username}
                  firstName={l.firstName}
                  lastName={l.lastName}
                  email={l.email}
                  gender={l.gender}></UsersRowList>
              ))}
      </table>
    </div>
    </div>
  );
}

export default Users;
