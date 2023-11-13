// Carrito de compras

// JSON de los productos con su imagen, precio y nombre
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Manta Tusor',
        precio: 200,
        imagen: '../imagenes/producto1-mantatusor.jpeg'
    },
    {
        id: 2,
        nombre: 'Almohadon',
        precio: 200,
        imagen: '../imagenes/producto2-almohadonlienzo.jpg'
    },
    {
        id: 3,
        nombre: 'Blazer Coral',
        precio: 200,
        imagen: '../imagenes/producto3-blazersastrero.png'
    }

];
//variables con las que voy a trabajar
let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones con las que voy a trabajar

// Creo las cards del producto a partir de json
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura de card
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        // Boton
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('bbtn', 'a-button');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', aniadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

// agregar al carrito
function aniadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito
    renderizarCarrito();

}

function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('bttnx', 'a-button');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '2rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

// Evento para borrar un elemento del carrito
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    let cantidadCarri = parseInt(carritoMenu.textContent);

    cantidadCarri--;
    
    carritoMenu.textContent = cantidadCarri;
    renderizarCarrito();
}

// calcula precio total
function calcularTotal() {
    // Recorremos el array del carrito
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

// Varia el carrito y vuelve a dibujarlo
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

// Selecciono todos los elementos del DOM con los que voy a trabajar
const botonesAgregar = document.querySelectorAll('.bbtn');
const carritoMenu = document.querySelector('.carrito-menu p');
const botonVaciar = document.querySelectorAll('#boton-vaciar');
const botonElimina = document.querySelectorAll('.bttnx');

// Evento agregar al carrito haciendo clic en los botones bbtn
function agregarAlCarrito() {
    // Obtiene el valor actual del carrito y lo convierte a un número entero con ParseInt
    let cantidadCarrito = parseInt(carritoMenu.textContent);

    // Incrementa la cantidad en 1 producto
    cantidadCarrito++;

    // Actualizala cantidad de productos en el carrito
    carritoMenu.textContent = cantidadCarrito;
}

// Itera sobre todos los botones
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

// 0 para el icono del carrito
function vaciarCarro() {
    let cantidadCarro = parseInt(carritoMenu.textContent);

    cantidadCarro = 0;

    carritoMenu.textContent = cantidadCarro;
}

botonVaciar.forEach(bton => {
    bton.addEventListener('click',vaciarCarro);
});