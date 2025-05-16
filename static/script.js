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
document.getElementById('footerContactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        
        const responseElement = document.getElementById('footerFormResponse');
        
        if (response.ok) {
            responseElement.innerHTML = `
                <div class="alert alert-success">
                    ¡Mensaje enviado!
                </div>
            `;
            form.reset();
        } else {
            throw new Error('Error al enviar');
        }
    } catch (error) {
        document.getElementById('footerFormResponse').innerHTML = `
            <div class="alert alert-danger">
                Error al enviar
            </div>
        `;
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});
window.onload = displayVault;