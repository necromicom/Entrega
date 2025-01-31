
const Obj = function (name, pri, stock, img) {
    this.name = name;
    this.pri = pri;
    this.stock = stock;
    this.img = img;
};

let o1 = new Obj("alcohol", 1500, 30, "images/alcohol.jpeg");
let o2 = new Obj("mascara facial", 15000, 10, "images/mascara.jpeg");
let o3 = new Obj("crema para manos", 5000, 20, "images/cremamanos.jpeg");
let o4 = new Obj("aposito", 500, 500, "images/apositos.jpeg");
let o5 = new Obj("Gasa", 500, 1000, "images/gasa.jpeg");
let o6 = new Obj("aguja", 600, 700, "images/aguja_18.jpeg");
let o7 = new Obj("jeringa", 700, 700, "images/jeringa.jpeg");

let list = [o1, o2, o3, o4, o5, o6, o7];
if (localStorage.getItem("objetos")) {
    list = JSON.parse(localStorage.getItem("objetos"));
}

function agregarObj() {
    Swal.fire({
        title: `Agregar objeto`,
        html: ` <div class="input-group">
            <label>Nombre:</label>
            <input id="name-input" class="swal2-input" type="text" autofocus>
        </div>
        
        <div class="input-group">
            <label>Precio:</label>
            <input id="pri-input" class="swal2-input" type="number" step="0.01">
            <label>Stock:</label>
            <input id="stock-input" class="swal2-input" type="number" step="1">
        </div>

        <div class="input-group">
            <label>Imagen:</label>
            <input id="img-input" class="swal2-input" type="file">
        </div>
    `,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            let name = document.getElementById("name-input").value.trim();
            let pri = parseFloat(document.getElementById("pri-input").value.trim());
            let stock = parseInt(document.getElementById("stock-input").value.trim());
            let imagen = document.getElementById("img-input").files[0];

            if (!imagen){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Falta imagen",
                })
                return;
            }


            if (isNaN(pri) || isNaN(stock) || name === "") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor ingresa valores válidos",
                });
                return;
            }

            if (list.some((elemento) => elemento.name === name)) {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "El producto ya existe en la lista",
                });
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(imagen);
            reader.onload = function () {
                let objeto = {
                    name: name,
                    pri: pri,
                    stock: stock,
                    img: reader.result 
                };

                list.push(objeto);
                localStorage.setItem("objetos", JSON.stringify(list));

                Swal.fire({
                    icon: "success",
                    title: "Objeto Agregado",
                    text: `Se agregó el objeto ${objeto.name} a la lista.`,
                    timer: 3000,
                });
            };
            
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



let carroarray = JSON.parse(localStorage.getItem("carro")) || [];
function agregarcarro(objeto){
    
    if (carroarray.some((item) => item.name === objeto.name)) {
        Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Este producto ya está en el carrito.",
        });
        return;
    }
    carroarray.push(objeto);
    localStorage.setItem("carro", JSON.stringify(carroarray)); 

    Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `El producto ${objeto.name} fue agregado al carrito.`,
        timer: 2000,
    });

    
}
let objeto = document.getElementById("object");
list.forEach(obj =>{
    let card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.textAlign = "center";
    card.style.backgroundColor = "#69766c";
    card.style.content = "border-box"

    let img = document.createElement("img");
    img.src = obj.img;
    img.alt = obj.name;
    img.style.width = "4vph";
    
    let btn = document.createElement("button");
    btn.textContent = "agregar";
    btn.addEventListener("click", () => agregarcarro(obj));

    
    let nombre = document.createElement("h2");
    nombre.textContent = obj.name;

    let precio = document.createElement("p");
    precio.textContent = `Precio: $${obj.pri}`;

    let stock = document.createElement("p");
    stock.textContent = `Stock: ${obj.stock}`;

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(stock);
    card.appendChild(btn);
    objeto.appendChild(card);
}

)


function krro() {
    let carro = JSON.parse(localStorage.getItem("carro")) || [];
    let price = carro.reduce((acc, obj) => acc + obj.pri, 0); 
    fetch('https://dolarapi.com/v1/dolares/blue')
    .then(response => response.json())
    .then(data => {
        let price2 = (price / data.venta).toFixed(2);
        if (carro.length > 0) {
            Swal.fire({
                
                title: `Carrito de Compras`,
                html: `
                    <p>En el carrito hay <strong>${carro.length}</strong> objetos.</p>
                    <p>El valor total de los objetos seleccionados es <strong>$${price}</strong></p>
                    <p>el valor en dolares de tu compra es <strong>$${price2}</strong></p>
                    <button id="pay-button" class="swal2-confirm swal2-styled">Pagar</button>
                `,
                showConfirmButton: false,
                didOpen: () => {
                    document.getElementById("pay-button").addEventListener("click", () => {
                        Swal.fire({
                            icon: "info",
                            title: "Procesando pago...",
                            text: "Por favor, espera un momento.",
                            timer: 2000, 
                            showConfirmButton: false,
                            didClose: ()=>{
                                setTimeout(() => {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Pago realizado con éxito",
                                        text: "Gracias por tu compra.",
                                        timer: 3000,
                                        showConfirmButton: false
                                    });
                                    localStorage.removeItem("carro");
                                }, 2000);
                            }
                        });
                    });
                }
            });
    
        } else {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "No hay nada en el carrito.",
            });
        }
    });
    
}


let cart = document.getElementById("carro");
cart.addEventListener("click",krro);
