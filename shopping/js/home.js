// const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");



cargarBotones()

// Seccion donde vamos a validar los botones y las categorias

function cargarBotones() {
  botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      botonesCategorias.forEach((boton) => {
        boton.classList.remove("active");
      });
      e.currentTarget.classList.add("active");

      if (e.currentTarget.id != "todos") {
        const categoriaProductos = productos.find(
          (producto) => producto.categoria.id === e.currentTarget.id
        );
        tituloPrincipal.innerHTML = categoriaProductos.categoria.nombre;
        const productosFiltrados = productos.filter(
          (producto) => producto.categoria.id === e.currentTarget.id
        );

        cargarProductos(productosFiltrados);
        } else {
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    });
  });
}

// Seccion donde vamos a cargar la estructura de los productos 

const cargarProductos = (data) => {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";
  data.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add('card');
    div.innerHTML = `<div class="product-image">
    <img src=${producto.imagen}>
    
    </div>
    <div class="product-info">
        <h5 class="card-title producto-nombre">${producto.nombre}</h5>
        
        <p class="card-text producto-precio">$${producto.precio}</p>
        <a class="btn-p">
        <i id=${producto.id} class="button agregar" type="button">Añadir al carrito</i>
    </a>
    </div>`;
    contenedor.append(div);
  });

}



