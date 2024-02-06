import Sidebar from "./sidebar";
import React from "react";
import AdminProfile from "./adminProfile";
import ForbiddenPage from "./forbiddenPage";

function Adminpage() {
  const adminData = JSON.parse(localStorage.getItem("AdminData"));

  return (
    <div>
      {adminData ? (
        <div>
          <Sidebar />
          <AdminProfile />
        </div>
      ) : (
        <ForbiddenPage />
      )}
    </div>
  );
}

export default Adminpage;
