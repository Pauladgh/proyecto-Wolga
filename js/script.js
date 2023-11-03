// Selecciono todos los elementos del DOM con los que voy a trabajar
const botonesAgregar = document.querySelectorAll('.a-button');
const carritoMenu = document.querySelector('.carrito-menu p');

// Evento agregar al carrito haciendo clic en los botones .a-button
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