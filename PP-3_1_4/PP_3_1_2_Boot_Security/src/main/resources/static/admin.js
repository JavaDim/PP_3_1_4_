const url = 'http://localhost:8080/api/users'

let adminInfo = document.querySelector('#adminInfo')
fetch('http://localhost:8080/api/user')
    .then(res => res.json())
    .then(user => {
        adminInfo.innerHTML = `
                                <strong> ${user.name}</strong>
                                <small>with roles:</small>
                                <b> ${user.roles.map(r => ' ' + r.name)}</b>
                                 `;
    })

let output = ''
const renderUsers = (users) => {
    users.forEach((u) => {
        output += '<tr><td>' + u.id + '</td>\n' +
            '      <td>' + u.name + '</td>\n' +
            '      <td>' + u.lastName + '</td>\n' +
            '      <td>' + u.age + '</td>\n' +
            '      <td>' + u.roles.map(r => ' ' + r.name) + '</td>\n' +
            '<td>' + '<button type="button" onclick="functionEdit(' + u.id + ')" '
            + 'class="btn btn-primary">Edit</button>' +
            '<td>' + '<button type="button" onclick="functionDelete(' + u.id + ')" '
            + 'class="btn btn-danger">Delete</button>'
    })
    document.getElementById("data").innerHTML = output
}

function showAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => renderUsers(data))
}

function functionDelete(id) {
    fetch(url + '/' + id)
        .then(res => res.json())
        .then(user => {
            $("#modalDelete").modal()
            document.getElementById("idDelete").value = user.id
            document.getElementById("nameDelete").value = user.name
            document.getElementById("lastNameDelete").value = user.lastName
            document.getElementById("ageDelete").value = user.age
            document.getElementById("rolesDelete").value = user.roles
        })
}

function fDelete() {
    let id = window.delForm.idDelete.value
    fetch(url + '/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .then(() => location.reload())
}

function functionEdit(id){
    fetch(url + '/' + id)
        .then(res => res.json())
        .then(user => {
            console.log('Получил User по id')
            $("#modalEdit").modal()
            document.getElementById("idEdit").value = user.id
            document.getElementById("nameEdit").value = user.name
            document.getElementById("lastNameEdit").value = user.lastName
            document.getElementById("ageEdit").value = user.age
            document.getElementById("passwordEdit").value = user.password
        })
}


function fEdit() {
    let id = window.formModalEdit.idEdit.value
    let rolesList = []
    for (let i = 0; i < $('#rolesEdit').val().length; i++) {
        rolesList[i] = $('#rolesEdit').val()[i]
    }
        fetch('http://localhost:8080/api/users', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                name: window.formModalEdit.nameEdit.value,
                lastName: window.formModalEdit.lastNameEdit.value,
                age: window.formModalEdit.ageEdit.value,
                password: window.formModalEdit.passwordEdit.value,
                roles: rolesList
            }),
        }).then(response => {
            temp = ""
            temp += "<tr id='" + id + "'>"
            temp += "<td>" + id
            temp += "<td>" + window.formModalEdit.nameEdit.value
            temp += "<td>" + window.formModalEdit.lastNameEdit.value
            temp += "<td>" + window.formModalEdit.ageEdit.value
            temp += "<td>" + window.formModalEdit.passwordEdit.value
            temp += "<td>" + window.formModalEdit.rolesEdit.value
            temp += "<td>" + '<button type="button" onclick="functionEdit(' + id + ')" '
                + 'class="btn btn-primary">Edit</button>'
            temp += "<td>" + '<button type="button" onclick="functionDelete(' + id + ')" '
                + 'class="btn btn-danger">Delete</button>' + '</tr>'

            $("#" + id).replaceWith(temp)
        }).then(() => location.reload())
    }

function newUser() {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.getElementById('name-value').value,
            lastName: document.getElementById('lastname-value').value,
            age: document.getElementById('age-value').value,
            password: document.getElementById('password-value').value,
            roles: getRoles()
        })
    })
        .then(res => res.json())

}

function getRoles(){
    let rolesList = []
    for (let i = 0; i < $('#role-value').val().length; i++) {
        rolesList[i] = $('#role-value').val()[i]
    }
    return rolesList
}

showAllUsers()
