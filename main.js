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


const Obj = function(name, pri, stock){
    this.name= name
    this.pri= pri
    this.stock = stock
}
let o1  = new Obj("alcohol",1500,30)
let o2  = new Obj("mascara facial",15000,10)
let o3  = new Obj("crema para manos",5000,20)
let o4  = new Obj("aposito",500,500)
let o5  = new Obj("gasa",500,1000)
let o6  = new Obj("aguja",600,700)
let o7  = new Obj("jeringa",700,700)

let list = [o1,o2,o3,o4,o5,o6,o7]
function agregarProducto(){
    let name= prompt("ingresa el nombre del producto")
    let pri = prompt("ingresa el precio del producto")
    let stock = prompt("ingresa el stock del producto")
    
    if(isNaN(pri) || isNaN(stock) || name == ""){
        alert("por favor ingrese valores validos")
        return
    }
    let producto = new Obj (name,pri,stock)    
    lista.push(p)
    console.log(list)
    }

