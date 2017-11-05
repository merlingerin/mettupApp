//===================FETCH USERS FROM STORAGE================//
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

    return Users;
}

//===================DELETE USER FROM STORAGE BY ID================//
const deleteUser = (id) => {
    const Users = fetchUsers();
    let newUsers = Users.filter((user) => {
        return +user.userID !== +id;
    });

    localStorage.Users = JSON.stringify(newUsers);
}

//===================GET USER FROM STORAGE BY ID================//
const getUser = (id) => {
    const Users = fetchUsers();
    return Users.filter((user) => {
        return +user.userID === +id;
    });
}

//===================ADD USER TO STORAGE================//
const addUser = (user) => {
    const Users = fetchUsers();
    Users.push(user);

    localStorage.Users = JSON.stringify(Users);
}

//===================UPDATE USER IN STORAGE================//
const updateUser = (newUser) => {
	const Users = fetchUsers();
	const update = Users.map((user) => {
        return +user.userID === +newUser.userID ? newUser : user;
    });

	localStorage.Users = JSON.stringify(update);
}

export  { fetchUsers, addUser, deleteUser, updateUser, getUser };
