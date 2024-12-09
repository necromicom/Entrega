function login() {
    let identificar = true;
    let intentos = 1;

    do {
        let user = prompt("Ingresar usuario:");

        if (user == null || user === "") {
            alert("Usuario inválido. Inténtelo nuevamente.");
            intentos++;
        } else if (user === "admin" || user === "user") {
            
            let pass = prompt("Ingresar contraseña:");

            if (pass == null || pass === "") {
                alert("No se ingresó ninguna contraseña. Inténtelo nuevamente.");
                intentos++;
            } else if (pass === "1234") {
                alert(`Bienvenido, usuario: ${user}`);
                identificar = false;
            } else {
                alert("Contraseña incorrecta. Inténtelo nuevamente.");
                intentos++;
            }
        } else {
            alert("Usuario invalido Inténtelo nuevamente.");
            intentos++;
        }

        if (intentos > 3) {
            alert("Usted superó los 3 intentos. Intente de nuevo");
            break;
        }
    } while (identificar);
}

login();
