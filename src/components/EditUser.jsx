import { useState } from 'react';
import { useUsersContext } from "../contexts/usersContext";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export const EditUser = () => {
    const { users, setUsers } = useUsersContext();
    const [editUserId, setEditUserId] = useState(null);
    const [formData, setFormData] = useState({});

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setFormData(user);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveClick = (id) => {
        const updatedUsers = users.map(user => 
            user.id === id ? formData : user
        );
        setUsers(updatedUsers);
        setEditUserId(null);
    };

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {editUserId === user.id ? (
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username || ""}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td>
                                    {editUserId === user.id ? (
                                        <input
                                            type="text"
                                            name="password"
                                            value={formData.password || ""}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.password
                                    )}
                                </td>
                                <td>
                                    {editUserId === user.id ? (
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role || ""}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td>
                                    {editUserId === user.id ? (
                                        <Button onClick={() => handleSaveClick(user.id)} variant='contained' color="success" startIcon={<SaveAltIcon />}>
                                            Save
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleEditClick(user)} variant="contained" startIcon={<EditIcon />}>
                                            Edit
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
