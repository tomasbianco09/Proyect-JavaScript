let carrito = []

const productoContenedor = document.getElementById("contenedor-productos");

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id)
    }
})

// Seccion donde validamos los productos

// Tambien validamos los botones de restar y sumar productos

const validarProductoRepetido = (productoId, button = null) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId)

    // if (localStorage.getItem('carrito')) {
    //     carrito = obtenerCarritoStorage()
    // }
    if (!productoRepetido) {
        const producto = productos.find(producto => producto.id == productoId)
        carrito.push(producto)
        pintarProductoCarrito(producto)
        actualizarTotalesCarrito(carrito)
    } else {
        if (button == 'aumentar') productoRepetido.cantidad++

        if (button == 'disminuir') productoRepetido.cantidad--
        

        if (productoRepetido.cantidad >= 0) {
            const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
            cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
            actualizarTotalesCarrito(carrito)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puede eliminar mas productos del carrito!',
              })
        }
        
       
    }

}

// Seccion donde pintamos los productos en el carrito

const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor')
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn btn-info" value="${producto.id}">+</button>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        <button class="btn btn-danger" value="${producto.id}">-</button>
    `
    contenedor.appendChild(div)
};

// Seccion donde vamos a actualziar los totales del carrito, en cantidad y precio

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad),0)
    pintarTotalesCarrito(totalCantidad, totalCompra)
    guardarCarritoStorage(carrito)
};

// Seccion donden pintamos los totales de la seecion anterior

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
};

// Pintamos la estructura del carrito con sus productos y los totales

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor')

    contenedor.innerHTML = ''

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <section class="botones">
                <button class="btn btn-info" value="${producto.id}">+</button>
                <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                <button class="btn btn-danger" value="${producto.id}">-</button>
            </section>
        `
        contenedor.appendChild(div)
    });
};

// Validamos el boton de eliminar carrito

const eliminarProductosCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId)
    carrito.splice(productoIndex, 1)
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
};

// Validamos el boton de finalziar compra

const comprar = document.querySelector(".btn-buy");
comprar.addEventListener("click", () => {
    if (carrito.length !==0) {
        Swal.fire({
            icon: 'success',
            title: 'Pedido finalizado',
            text: 'Gracias por tu compra!',
          })
        carrito = []
        eliminarProductosCarrito();
    }
})

// Seccion de Storage

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    return carritoStorage
};

// Seccion donde cargamos todo lo anterior en el carrito

const cargarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage()
        pintarCarrito(carrito)
        actualizarTotalesCarrito(carrito)
    }
};

// cargarCarrito()
