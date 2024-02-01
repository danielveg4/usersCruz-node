import { URLS } from '../../constants/urls';
import { postData } from '../../utils/api';

const CreateUser = ({ setUsers }) => {
	return (
		<>
			<h1>Crear usuario</h1>
			<form onSubmit={e => handleSubmit(e, setUsers)}>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' />
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' />
				</div>
				<button>Create User</button>
			</form>
		</>
	);
};

const createUser = async (name, email, setUsers) => {
	const newUser = { name, email };
	const newUsers = await postData(URLS.API_USERS, newUser);
	console.log('Creating user', name, email);
	setUsers(newUsers);
};

const validateForm = (name, email, setUsers) => {
	if (!name || !email) return;

	createUser(name, email, setUsers);
};

const handleSubmit = (e, setUsers) => {
	e.preventDefault();
	const name = e.target.name.value;
	const email = e.target.email.value;
	e.target.reset();

	validateForm(name, email, setUsers);

	console.log('Form submitted');
};

export default CreateUser;
