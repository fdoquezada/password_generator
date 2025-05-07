function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("password").value = password;
}

function savePassword() {
    const password = document.getElementById("password").value;
    if (password) {
        let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwords.push(password);
        localStorage.setItem("passwords", JSON.stringify(passwords));
        displayVault();
    }
}

function displayVault() {
    const vault = document.getElementById("vault");
    vault.innerHTML = "";
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.forEach((pwd, index) => {
        vault.innerHTML += `<li>${pwd} <button onclick="deletePassword(${index})">Eliminar</button></li>`;
    });
}

function deletePassword(index) {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    displayVault();
}

function clearPassword() {
    document.getElementById("password").value = "";
}

function copyPassword() {
    const passwordInput = document.getElementById("password");
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                // Opcional: feedback visual
                alert("¡Contraseña copiada al portapapeles!");
            })
            .catch(() => {
                alert("No se pudo copiar la contraseña.");
            });
    }
}

window.onload = displayVault;