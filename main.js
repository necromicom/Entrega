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
            identificar = false;
        }
    } while (identificar);
}

const Obj = function (name, pri, stock) {
    this.name = name;
    this.pri = pri;
    this.stock = stock;
};

let o1 = new Obj("alcohol", 1500, 30);
let o2 = new Obj("mascara facial", 15000, 10);
let o3 = new Obj("crema para manos", 5000, 20);
let o4 = new Obj("aposito", 500, 500);
let o5 = new Obj("Gasa", 500, 1000);
let o6 = new Obj("aguja", 600, 700);
let o7 = new Obj("jeringa", 700, 700);

let list = [o1, o2, o3, o4, o5, o6, o7];
if (localStorage.getItem("objetos")) {
    list = JSON.parse(localStorage.getItem("objetos"));
}

function agregarObj() {
    Swal.fire({
        title: `Agregar objeto`,
        html: `<label>Nombre:</label> <input id="name-input" class="swal2-input" type="text" autofocus>
        <label>Precio:</label><input id="pri-input" class="swal2-input" type="number" step="0.01">
        <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">`,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            let name = document.getElementById("name-input").value.trim();
            let pri = parseFloat(document.getElementById("pri-input").value.trim());
            let stock = parseInt(document.getElementById("stock-input").value.trim());

            if (isNaN(pri) || isNaN(stock) || name === "") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor ingresa valores válidos",
                });
                return;
            }

            let objeto = new Obj(name, pri, stock);

            if (list.some((elemento) => elemento.name === objeto.name)) {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "El producto ya existe en la lista",
                });
                return;
            }

            list.push(objeto);
            localStorage.setItem("objetos", JSON.stringify(list));

            Swal.fire({
                icon: "success",
                title: "Objeto Agregado",
                text: `Se agregó el objeto ${objeto.name} a la lista`,
                timer: 3000,
            });
        }
    });
}

function buscarObj() {
    Swal.fire({
        title: "Ingresa el producto que deseas buscar",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Buscar",
        showLoaderOnConfirm: true,
        preConfirm: (palabraClave) => {
            palabraClave = palabraClave.trim().toUpperCase();
            let result = list.filter((objeto) =>
                objeto.name.toUpperCase().includes(palabraClave)
            );

            if (result.length > 0) {
                Swal.fire({
                    title: "Este es el resultado de tu búsqueda",
                    html:
                        "<table><tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr>" +
                        result
                            .map(
                                (objeto) =>
                                    `<tr><td>${objeto.name}</td><td>${objeto.pri}</td><td>${objeto.stock}</td></tr>`
                            )
                            .join("") +
                        "</table>",
                });
            } else {
                Swal.fire({
                    title: `No se encontraron coincidencias`,
                    icon: "error",
                    confirmButtonText: `Ok`,
                });
            }
        },
    });
}

let agregar = document.getElementById("add");
if (agregar) agregar.addEventListener("click", agregarObj);

let filtrar = document.getElementById("filtrar");
if (filtrar) filtrar.addEventListener("click", buscarObj);
