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

const deleteUser = (id) => {
    const Users = fetchUsers();
    let newUsers = Users.filter((user) => {
        return Users.id !== id;
    });
    localStorage.Users = JSON.stringify(newUsers);
}


const addUser = (user) => {
    const Users = fetchUsers();
    Users.push(user);
    localStorage.Users = JSON.stringify(Users);
}

export  { fetchUsers, addUser, deleteUser };