function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");
}
function showRegister() {
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
}
function searchBooks() {
    const input = document.getElementById("bookSearch");
    const category = document.getElementById("categoryFilter");
    const cards = document.querySelectorAll("#bookGrid .book-card");
    if (!input) return;
    let count = 0;
    cards.forEach(card => {
        const matchesText = card.textContent.toLowerCase().includes(input.value.toLowerCase());
        const matchesCategory = !category || category.value === "all" || card.dataset.category === category.value;
        card.classList.toggle("hidden", !(matchesText && matchesCategory));
        if (matchesText && matchesCategory) count++;
    });
    const noBooks = document.getElementById("noBooksMessage");
    if (noBooks) noBooks.classList.toggle("hidden", count !== 0);
}
function filterBooks() { searchBooks(); }
function logoutUser() { localStorage.removeItem("loggedInUser"); window.location.href = "index.html"; }
function logoutAdmin() { localStorage.removeItem("libraryAdminLoggedIn"); window.location.href = "admin-dashboard.html"; }
function adminLogin(event) {
    event.preventDefault();
    const user = document.getElementById("adminUsername").value.trim();
    const pass = document.getElementById("adminPassword").value;
    const msg = document.getElementById("adminLoginMessage");
    msg.textContent = "";
    if (!user || !pass) { msg.textContent = "All fields are required."; return; }
    if (user === "admin" && pass === "Admin@123") {
        localStorage.setItem("libraryAdminLoggedIn", "true");
        document.getElementById("adminLoginPanel").classList.add("hidden");
        document.getElementById("adminDashboardPanel").classList.remove("hidden");
    } else { msg.textContent = "Incorrect admin username or password."; }
}
function showAdminDashboardIfLoggedIn() {
    const login = document.getElementById("adminLoginPanel");
    const dashboard = document.getElementById("adminDashboardPanel");
    if (login && dashboard && localStorage.getItem("libraryAdminLoggedIn") === "true") {
        login.classList.add("hidden");
        dashboard.classList.remove("hidden");
    }
}
function addBook(event) {
    event.preventDefault();
    const book = {
        title: document.getElementById("bookTitle").value.trim(),
        author: document.getElementById("bookAuthor").value.trim(),
        category: document.getElementById("bookCategory").value,
        isbn: document.getElementById("bookISBN").value.trim()
    };
    if (!book.title || !book.author || !book.category || !book.isbn) { alert("Please fill all book details."); return; }
    const books = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    books.push(book);
    localStorage.setItem("libraryBooks", JSON.stringify(books));
    alert("Book added successfully (demo).");
    event.target.reset();
}
document.addEventListener("DOMContentLoaded", function () {
    showAdminDashboardIfLoggedIn();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const name = document.getElementById("welcomeName");
    if (user && name) name.textContent = user.name;
});
