const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');
const finalizarCompra = document.querySelector(".btn-buy");


abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});



modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductosCarrito(e.target.value)
    }
    if (e.target.classList.contains('btn-info')) {
        const aumentar = 'aumentar'
        validarProductoRepetido(e.target.value, aumentar)
    }
    if (e.target.classList.contains('btn-danger')) {
        const disminuir = 'disminuir'
        validarProductoRepetido(e.target.value, disminuir)
    }
})