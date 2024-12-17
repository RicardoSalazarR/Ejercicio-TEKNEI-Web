import React, { useState } from "react";
import axios from "axios";
import "./usersTable.css";

const UsersTable = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const handleFetchUser = async () => {
    try {
      const {
        data: {
          results: [newUser],
        },
      } = await axios.get("https://randomuser.me/api/");

      const userData = {
        name: `${newUser.name.title} ${newUser.name.first} ${newUser.name.last}`,
        location: `${newUser.location.city}, ${newUser.location.state}, ${newUser.location.country}`,
        PC: newUser.location.postcode,
        email: newUser.email,
      };

      const updatedUsers = [...users, userData];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  const handleInputChange = (value, index, field) => {
    if (field === "name" && !/^[\p{L}\s]*$/u.test(value)) return;
    if (field === "location" && !/^[\p{L}\s,.üáéíóúÁÉÍÓÚñÑ-]*$/u.test(value)) return;
    if (field === "PC" && !/^\d*$/.test(value)) return;
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);

    if (field !== "email") {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleBlurEmail = (value, index) => {
    const storedUsers = localStorage.getItem("users");
    const pastUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const trimmedValue = value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedValue || !emailRegex.test(trimmedValue)) {
      alert("Correo electrónico inválido");
      setUsers(pastUsers);
    } else {
      const updatedUsers = [...pastUsers];
      updatedUsers[index].email = trimmedValue;
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="users">
      <h2>Usuarios</h2>
      <button onClick={handleFetchUser}>Obtener Usuario</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Código Postal</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "name")
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.location}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "location")
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.PC}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "PC")
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "email")
                  }
                  onBlur={(e) => handleBlurEmail(e.target.value, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
