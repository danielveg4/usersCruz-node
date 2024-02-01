import { useEffect, useState } from 'react';
import { deleteData, getData } from '../../utils/api';
import { URLS } from '../../constants/urls';
import CreateUser from '../create-user/CreateUser';
import UpdateUser from '../update-user/UpdateUser';

const Main = () => {
	const [users, setUsers] = useState([]);
	const [userToEdit, setUserToEdit] = useState();

	useEffect(() => {
		getAllUsers(setUsers);
	}, []);

	if (users.length === 0) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<div>
			{users.map(user => (
				<div key={user.id}>
					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<button onClick={() => setUserToEdit(user)}>Edit</button>
					<button onClick={() => deleteUser(user.userId, setUsers)}>
						Delete
					</button>
				</div>
			))}
			{!userToEdit && <CreateUser setUsers={setUsers} />}
			{userToEdit && (
				<UpdateUser
					userToEdit={userToEdit}
					setUserToEdit={setUserToEdit}
					setUsers={setUsers}
				/>
			)}
		</div>
	);
};

const getAllUsers = async setUsers => {
	try {
		const allUsers = await getData(URLS.API_USERS);
		setUsers(allUsers);
	} catch (err) {
		console.log('Error', err);
	}
};

const deleteUser = async (id, setUsers) => {
	// en un try catch hay que hacerlo
	const usersUpdated = await deleteData(`${URLS.API_USERS}/${id}`);
	setUsers(usersUpdated);

	console.log('Deleting user', id);
};

export default Main;
