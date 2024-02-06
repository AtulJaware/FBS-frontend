import axios from "axios";
import React from "react";

function UsersRowList({ id,username,firstName,lastName,email,gender }) {
  const deleteUser = () => {
    axios
      .delete("http://localhost:8500/user/passenger/delete/" + id,{
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("admintoken")),
          },
      })
      .then((resp) => {
        alert(resp.data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <tbody>
      <tr key={id}>
        <td>{id}</td>
        <td>{username}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>
          <button className="ui button red" data-toggle="modal" data-target="#delete">
            Delete
          </button>
        </td>
        <div class="modal" tabindex="-1" id="delete">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Delete User</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete User {username}?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="ui button" data-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="ui button red" onClick={deleteUser}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </tr>
    </tbody>
  );
}

export default UsersRowList;
