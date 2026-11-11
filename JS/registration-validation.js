document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("registerPhone").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("registerMessage");
        message.textContent = "";

        if (!name || !email || !phone || !password || !confirmPassword) {
            message.textContent = "All fields are required.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailPattern.test(email)) {
            message.textContent = "Please enter a valid email address.";
            return;
        }

        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phone)) {
            message.textContent = "Enter a valid 10-digit Indian mobile number.";
            return;
        }

        if (password.length < 8) {
            message.textContent = "Password must be at least 8 characters long.";
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            message.textContent = "Use uppercase, lowercase, number and special character in password.";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Password and confirm password do not match.";
            return;
        }

        const users = JSON.parse(localStorage.getItem("libraryUsers")) || [];
        if (users.some(item => item.email.toLowerCase() === email.toLowerCase())) {
            message.textContent = "This email is already registered.";
            return;
        }

        users.push({name, email, phone, password});
        localStorage.setItem("libraryUsers", JSON.stringify(users));
        message.textContent = "Registration successful. You can now login.";
        form.reset();
    });
});
