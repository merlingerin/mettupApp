const fetchUsers = () => {
    let Users;
    try {
         Users = JSON.parse(localStorage.getItem('Users'))
    } catch(err) {
        console.log({
            message: 'Can\'t fetch users from local storage',
            error: err
        })
    }
	console.log('FETCH USER', Users);

    return Users;
}

const deleteUser = (id) => {
    const Users = fetchUsers();
    let newUsers = Users.filter((user) => {
        return +user.userID !== +id;
    });
	console.log('DELETE USER', newUsers);

    localStorage.Users = JSON.stringify(newUsers);
}

const addUser = (user) => {
    const Users = fetchUsers();
    Users.push(user);
	console.log('ADD USER', Users);

    localStorage.Users = JSON.stringify(Users);
}

const updateUser = (newUser) => {
	const Users = fetchUsers();
	console.log('newUser', newUser);
	const update = Users.map((user) => {
        return +user.userID === +user.userID ? newUser : user;
    });
	console.log('UPDATE USER', update);
	localStorage.Users = JSON.stringify(update);
}

export  { fetchUsers, addUser, deleteUser, updateUser };
