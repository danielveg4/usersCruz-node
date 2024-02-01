import { URLS } from '../../constants/urls';
import { patchData } from '../../utils/api';

const UpdateUser = ({ userToEdit, userId, setUsers, setUserToEdit }) => {
	return (
		<>
			<h1>Update user</h1>
			<form onSubmit={e => handleSubmit(e, userId, setUsers, setUserToEdit)}>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' defaultValue={userToEdit.name} />
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' defaultValue={userToEdit.email} />
				</div>
				<button>Update User</button>
			</form>
		</>
	);
};

const updateUser = async (name, email, userId, setUsers, setUserToEdit) => {
	const updateUser = { name, email };
	const updateUsers = await patchData(
		`${URLS.API_USERS}/${userId}`,
		updateUser
	);
	setUsers(updateUsers);
	setUserToEdit();
};

const validateForm = (name, email, userId, setUsers, setUserToEdit) => {
	if (!name || !email) return;

	updateUser(name, email, userId, setUsers);
};

const handleSubmit = (e, userId, setUsers, setUserToEdit) => {
	e.preventDefault();
	const name = e.target.name.value;
	const email = e.target.email.value;
	e.target.reset();

	validateForm(name, email, userId, setUsers, setUserToEdit);

	console.log('Form submitted');
};

export default UpdateUser;
