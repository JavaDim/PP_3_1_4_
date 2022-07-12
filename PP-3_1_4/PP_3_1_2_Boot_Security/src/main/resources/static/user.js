const url = 'http://localhost:8080/api/user'

function showUser() {
    let loggedInUser = document.querySelector('#userTable')
    fetch(url)
        .then(res => res.json())
        .then(user => {
            loggedInUser.innerHTML = `
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.lastName}</td>
                                <td>${user.age}</td>
                                <td> ${user.roles.map(r => ' ' + r.name)}</td>
                                 `
        })
}

let userInfo = document.querySelector('#userInfo')
fetch(url)
    .then(res => res.json())
    .then(user => {
        userInfo.innerHTML = `
                                <strong> ${user.name}</strong>
                                <b>with roles:</b>
                                <b> ${user.roles.map(r => ' ' + r.name)}</b>
                                 `;
    })

showUser()