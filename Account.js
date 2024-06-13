// Static variables to store user accounts
const users = [];
const faculties = [];

// Function to validate the password
function validatePassword(password) {
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRequirements.test(password);
}

// Function to handle form submission for signup
document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!validatePassword(password)) {
        alert('Enter a valid password. Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
        return;
    }

    const account = { name, email, password };
    if (role === 'f') {
        faculties.push(account);
    } else {
        users.push(account);
    }

    alert('Account created successfully!');
    window.location.href = 'login.html'; // Redirect to login page
});

// Function to handle form submission for login
document.getElementById('sign-in-container').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.email === email && user.password === password);
    const faculty = faculties.find(faculty => faculty.email === email && faculty.password === password);

    if (user) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to user homepage
    } else if (faculty) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to faculty homepage
    } else {
        alert('Invalid email or password.');
    }
});


// Function to handle form submission for login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.email === email && user.password === password);
    const faculty = faculties.find(faculty => faculty.email === email && faculty.password === password);

    if (user) {
        alert('Login successful!');
        window.location.href = 'user_home.html'; // Redirect to user homepage
    } else if (faculty) {
        alert('Login successful!');
        window.location.href = 'faculty_home.html'; // Redirect to faculty homepage
    } else {
        alert('Invalid email or password.');
    }
});

// Handle logout action
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Logout successful!');
    window.location.href = 'login.html'; // Redirect to login page
});

//function for drag and drop

function allowDrop(ev){
    ev.preventDefault();
}
function drag(ev){
    ev.dataTransfer.setData("text",ev.target.id);
}
function drop(ev){
    ev.preventDefault();
    var data=ev.dataTransfer.getData("text");
    var task=document.getElementById(data);
    ev.target.appendChild(task);
}