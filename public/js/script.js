// Toggle password visibility
function togglePassword() {
    var password = document.getElementById("password");
    var type = password.type === "password" ? "text" : "password";
    password.type = type;
}