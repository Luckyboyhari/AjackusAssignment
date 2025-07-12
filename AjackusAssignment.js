let employees = [];
let editingId = null;

const employeeList = document.getElementById("employeeList");
const form = document.getElementById("employeeForm");
const modal = document.getElementById("employeeModal");
const searchInput = document.getElementById("searchInput");

form.addEventListener("submit", saveEmployee);
searchInput.addEventListener("input", displayEmployees);

// Sample initial data
employees = [{
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        department: "Engineering",
        role: "Developer"
    }
];

function displayEmployees() {
    const query = searchInput.value.toLowerCase();
    employeeList.innerHTML = "";

    const filtered = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query)
    );

    filtered.forEach(emp => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
      <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
      <p>${emp.email}</p>
      <p>${emp.department} - ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        employeeList.appendChild(card);
    });
}

function openForm() {
    modal.style.display = "flex";
    form.reset();
    editingId = null;
    document.getElementById("formTitle").textContent = "Add Employee";
}

function closeForm() {
    modal.style.display = "none";
}

function saveEmployee(e) {
    e.preventDefault();
    const newEmp = {
        id: editingId || Date.now(),
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        department: form.department.value,
        role: form.role.value
    };

    if (!validateEmail(newEmp.email)) {
        alert("Please enter a valid email.");
        return;
    }

    if (editingId) {
        const index = employees.findIndex(e => e.id === editingId);
        employees[index] = newEmp;
    } else {
        employees.push(newEmp);
    }

    closeForm();
    displayEmployees();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (emp) {
        editingId = id;
        openForm();
        form.firstName.value = emp.firstName;
        form.lastName.value = emp.lastName;
        form.email.value = emp.email;
        form.department.value = emp.department;
        form.role.value = emp.role;
        document.getElementById("formTitle").textContent = "Edit Employee";
    }
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(e => e.id !== id);
        displayEmployees();
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

displayEmployees();