const form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    fileInput = document.getElementById("imgInput"),
    cedula = document.getElementById("cedula"),
    userName = document.getElementById("nombre"),
    lastName = document.getElementById("apellido"),
    gender = document.getElementById("gender"),
    city = document.getElementById("direccion"),
    email = document.getElementById("email"),
    phone = document.getElementById("telefono"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

// Initialize data
let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
let isEdit = false, editId;

showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Guardar';
    modalTitle.innerText = "Formulario";
    isEdit = false;
    imgInput.src = "complementos/Profile Icon.webp";
    form.reset();
});

fileInput.onchange = function () {
    if (fileInput.files[0].size < 1000000) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            imgInput.src = e.target.result;
        }
        fileReader.readAsDataURL(fileInput.files[0]);
    } else {
        alert("Es demasiado grande!");
    }
};

function validateMaxLength(event) {
    const input = event.target;
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

cedula.addEventListener('input', validateMaxLength);
telefono.addEventListener('input', validateMaxLength);

function showInfo() {
    userInfo.innerHTML = '';
    getData.forEach((element, index) => {
        const userRow = `
        <tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="Profile Picture" width="50" height="50"></td>
            <td>${element.employeeCedula}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeLastName}</td>
            <td>${element.employeeGender}</td>  
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeLastName}', '${element.employeeGender}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeCedula}', '${element.employeeName}', '${element.employeeLastName}', '${element.employeeGender}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
        userInfo.innerHTML += userRow;
    });
}

function readInfo(pic, name, lastName, gender, city, email, phone) {
    document.querySelector('.showImg').src = pic;
    document.getElementById("showName").value = name;
    document.getElementById("showLastName").value = lastName;
    document.getElementById("showGender").value = gender;
    document.getElementById("showCity").value = city;
    document.getElementById("showEmail").value = email;
    document.getElementById("showPhone").value = phone;
}

function editInfo(index, pic, cedulaVal, nameVal, lastNameVal, genderVal, cityVal, emailVal, phoneVal) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    cedula.value = cedulaVal;
    userName.value = nameVal;
    lastName.value = lastNameVal;
    gender.value = genderVal;
    city.value = cityVal;
    email.value = emailVal;
    phone.value = phoneVal;

    submitBtn.innerText = "Actualizar";
    modalTitle.innerText = "Actualizar el Formulario";
}

function deleteInfo(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src || "complementos/Profile Icon.webp",
        employeeName: userName.value,
        employeeLastName: lastName.value,
        employeeGender: gender.value,
        employeeCedula: cedula.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        getData[editId] = information;
        isEdit = false;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));
    showInfo();

    submitBtn.innerText = "Guardar";
    modalTitle.innerText = "Formulario";

    form.reset();
    imgInput.src = "complementos/Profile Icon.webp";
});
