document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");
        message.textContent = "";

        if (!email || !password) {
            message.textContent = "All fields are required.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailPattern.test(email)) {
            message.textContent = "Please enter a valid email address.";
            return;
        }

        if (password.length < 8) {
            message.textContent = "Password must contain at least 8 characters.";
            return;
        }

        const users = JSON.parse(localStorage.getItem("libraryUsers")) || [];
        const user = users.find(item => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
        if (!user) {
            message.textContent = "Invalid email or password. Please register first.";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    });
});
