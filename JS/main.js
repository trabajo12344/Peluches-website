
const productos = [
  { nombre: "Creeper", precio: 5000, imagen: "imagenes/creeper.jpg" },
  { nombre: "Steve", precio: 8000, imagen: "imagenes/steve.jpg" },
  { nombre: "Zombie", precio: 6500, imagen: "imagenes/zombie.jpg" },
  { nombre: "Enderman", precio: 5500, imagen: "imagenes/enderman.jpg" },
  { nombre: "Lobo", precio: 7000, imagen: "imagenes/lobo.jpg" },
  { nombre: "Ghast", precio: 5000, imagen: "imagenes/ghast.jpg" },
  { nombre: "Abeja", precio: 8500, imagen: "imagenes/abeja.jpg" },
  { nombre: "Cerdo", precio: 4500, imagen: "imagenes/cerdo.jpg" }
];

let carrito = [];

const botonCarrito = document.getElementById('botonCarrito');
const modalCarrito = document.getElementById('modalCarrito');
const contenedorProductos = document.getElementById('contenedorProductos');
const elementosCarrito = document.getElementById('elementosCarrito');
const cerrarModal = document.getElementById('cerrarModal');

productos.forEach(producto => {
  const columna = document.createElement('div');
  columna.classList.add('col-md-3', 'mb-4');

  columna.innerHTML = `
    <div class="card">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body text-center">
        <h5 class="nombre-producto">${producto.nombre}</h5>
        <p class="precio-producto text-success fw-bold">$${producto.precio}</p>
        <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
      </div>
    </div>
  `;

  contenedorProductos.appendChild(columna);
});

botonCarrito.addEventListener('click', () => {
  actualizarVistaCarrito();
  modalCarrito.style.display = 'block';
});

cerrarModal.addEventListener('click', () => {
  modalCarrito.style.display = 'none';
});

function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarVistaCarrito();
  actualizarContador();
}

function actualizarContador() {
  const contador = document.getElementById('contadorCarrito');
  const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  contador.textContent = totalCantidad;
}

function aumentarCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad++;
    actualizarVistaCarrito();
    actualizarContador();
  }
}


function disminuirCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    eliminarDelCarrito(nombre);
  }
  actualizarVistaCarrito();
  actualizarContador();
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarVistaCarrito();
  actualizarContador();
}


function actualizarVistaCarrito() {
  elementosCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const productoEnCarrito = document.createElement('div');
    productoEnCarrito.classList.add('mb-3');
    productoEnCarrito.innerHTML = `
      <p>${item.nombre} - $${item.precio} x ${item.cantidad} = $${subtotal}</p>
      <button class="btn btn-sm btn-secondary" onclick="disminuirCantidad('${item.nombre}')">-</button>
      <button class="btn btn-sm btn-secondary" onclick="aumentarCantidad('${item.nombre}')">+</button>
      <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
    `;

    elementosCarrito.appendChild(productoEnCarrito);
  });

  document.getElementById('totalCarrito').textContent = total.toFixed(2);
}
