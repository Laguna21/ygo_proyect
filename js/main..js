const ITEMS = {
  url: "https://db.ygoprodeck.com/api/v4/cardinfo.php?",
  buscador: document.querySelector("#buscador"),
  contenedorImagenes: document.querySelector("#imagenes")
};

async function cargar_cartas(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);

    const listaFiltrada = filtrarLista(data[0], 25);
    mostrarMonstruos(listaFiltrada);
  } catch (error) {
    errorAlBuscarCartas(error);
  }
}

function buscarPorNombre() {
  const nombre = ITEMS.buscador.value;
  let buscarNombre = ITEMS.url + "fname=" + nombre;

  cargar_cartas(buscarNombre);
}

function mostrarMonstruos(lista) {
  console.log(lista);
  borrarImagenes();
  lista.forEach(item => {
    ITEMS.contenedorImagenes.innerHTML += `  <div class="card m-3 text-center" id="${item.id}">
    <h3 class="card-header">${item.name}</h3>
    <img src="${item.image_url_small}">
    <div class="card-body">
      <p class="card-text descripcion container-fluid">
      ${item.desc}
      </p>
    </div>
    <div class="card-body">
    <p class="card-text">Atk: ${item.atk} // Def: ${item.def}</p>
    </div>
    <div class="card-footer">
    <h6 class="card-subtitle text-muted">Precio: ${item.amazon_price} $</h6> 
    <button class="btn btn-danger" onclick="borrarTarjeta(${item.id})">Borrar Carta</button>
    </div>
  </div>`;
  });
}

function filtrarLista(lista, cantidadMaxima) {
  const listaFiltrada = lista.filter((item, pos) => {
    return pos < cantidadMaxima ? item : null;
  });
  return listaFiltrada;
}

function borrarImagenes() {
  ITEMS.contenedorImagenes.innerHTML = "";
}

function errorAlBuscarCartas(err) {
  ITEMS.contenedorImagenes.innerHTML = `<h3 class="text-danger">Error, cartas no encontradas...</h3>`;
  console.log(err);
}

function borrarTarjeta(tarjeta) {
  document.getElementById(tarjeta).remove();
}
