
function habilitarboton() {
  let input1 = document.getElementById("j1i").value;
  let input2 = document.getElementById("j2i").value;
  let input3 = document.getElementById("j3i").value;
  let input4 = document.getElementById("j4i").value;

  const valores = [input1, input2, input3, input4];

  // Verificar si hay valores duplicados
  const duplicados = valores.filter((valor, index) => valores.indexOf(valor) !== index);


  if(input1 == "" || input2 == "" || input3 == "" || input4 == "" ){
    alert("Por favor, completa todos los campos.");
  } else if( numfilas == 0 && numcolumnas == 0 ){
    alert("Por favor, elige el tamaño de carton.");
  } else if(duplicados.length > 0){
    alert("Por favor, corregir los nombres de los jugadores no puede ver duplicados");
  } else {
    const partida = document.getElementById("partida");
    partida.classList.remove("d-none");
    partida.classList.add("d-block");
    matrices();
  } 
}

let contador1 = 1;

function contador() {
    if (contador1 < 25) {
      contador1++;
      generarNumero(); // Generar el número aleatorio
      verificarLinea();
    }
}

let numfilas = 0 
let numcolumnas = 0
let matriz1 = []
let matriz2 = []
let matriz3 = []
let matriz4 = []
let jugadores = []
let contadorJugador = 0
let numerosGenerados = []; // Lista para almacenar los números generados
let partidaTerminada = false;
let victoriasJugadores = [];



function getnum(x) {
    numfilas = x;
    numcolumnas = x;
}

function generarMatrizAleatoria(filas, columnas) {
    let matriz = [];
    let numerosDisponibles = [];
  
    // Llenar el array con los números del 1 al 50
    for (let i = 1; i <= 50; i++) {
      numerosDisponibles.push(i);
    }
  
    // Generar la matriz aleatoria
    for (let fila = 0; fila < filas; fila++) {
      matriz[fila] = [];
  
      for (let columna = 0; columna < columnas; columna++) {
        let indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
        let numeroAleatorio = numerosDisponibles.splice(indiceAleatorio, 1)[0];
        matriz[fila][columna] = numeroAleatorio;
      }
    }
  
    return matriz;
  }

function generarGrid(matriz) {
    let gridHTML = `<div class="grid">`;
    gridHTML += `<div class="grid-row-bingo"><h1 id="BINGO">BING🎱</h1></div>`;
    for (let fila = 0; fila < matriz.length; fila++) {
      gridHTML += `<div class="grid-row-${numcolumnas}">`;
      
      for (let columna = 0; columna < matriz[fila].length; columna++) {
        gridHTML += `<div class="grid-cell">` + matriz[fila][columna] + `</div>`;
      }
      
      gridHTML += `</div>`;
    }
    
    gridHTML += `</div>`;
    
    return gridHTML;
}


function matrices() {
    contador1 = 1;
    const botonResultado = document.getElementById("resultado");
    botonResultado.classList.remove("d-block");
    botonResultado.classList.add("d-none");

    const botnRuleta = document.getElementById("ruleta");
    botnRuleta.classList.remove("d-none");
    botnRuleta.classList.add("d-block");

    matriz1 = generarMatrizAleatoria(numfilas, numcolumnas);
    matriz2 = generarMatrizAleatoria(numfilas, numcolumnas);
    matriz3 = generarMatrizAleatoria(numfilas, numcolumnas);
    matriz4 = generarMatrizAleatoria(numfilas, numcolumnas);

    //jugador 1
    jugadores.push({
      nombre: document.getElementById("j1i").value,
      puntuacion: 0,
      carton: matriz1,
    });

    //jugador 2
    jugadores.push({
      nombre: document.getElementById("j2i").value,
      puntuacion: 0,
      carton: matriz2
    });

    //jugador 3
    jugadores.push({
      nombre: document.getElementById("j3i").value,
      puntuacion: 0,
      carton: matriz3
    });

    //jugador 4
    jugadores.push({
      nombre: document.getElementById("j4i").value,
      puntuacion: 0,
      carton: matriz4
    });

    let seccion = document.getElementById("contenedor");
    seccion.classList.add("d-none");

    //dibujar carton
    let gridHTML = generarGrid(jugadores[contadorJugador].carton);
    const t = document.getElementById("carton");
    t.innerHTML = "";
    t.innerHTML = gridHTML;

    generarNumero(); // Generar el número aleatorio
    dibujar_estadistica_carton_jugador();
}

function dibujar_estadistica_carton_jugador(){

  const jugadoresContainer = document.getElementById("jugadoresContainer");
  //limpiar container
  jugadoresContainer.innerHTML = ''; 
  
  // Crea un div para cada jugador
  const jugadorDiv = document.createElement("div");
  jugadorDiv.classList.add("jugador");
  
  // Crea el título para el jugador
  const tituloJugador = document.createElement("h2");
  tituloJugador.classList.add(`j${contadorJugador+1}`);
  tituloJugador.textContent = `Jugador ${contadorJugador+1}:`;
  
  // Crea los elementos para mostrar el nombre, puntuación y tiempo del jugador
  
  const nombreSpan = document.createElement("span");
  nombreSpan.classList.add("nombre");
  nombreSpan.textContent = jugadores[contadorJugador].nombre;
  
  const puntuacionTitulo = document.createElement("span");
  puntuacionTitulo.classList.add("texto");
  puntuacionTitulo.textContent = "Puntuación:";
  
  const puntuacionSpan = document.createElement("span");
  puntuacionSpan.classList.add("puntuacion");
  puntuacionSpan.textContent = jugadores[contadorJugador].puntuacion;
  
  const turnoTitulo = document.createElement("span");
  turnoTitulo.classList.add("texto");
  turnoTitulo.textContent = "Turno:";
  
  const turnoSpan = document.createElement("span");
  turnoSpan.classList.add("turno");
  turnoSpan.textContent = contador1;  
  
  // Agrega los elementos al div del jugador en el orden deseado
  jugadorDiv.appendChild(tituloJugador);
  jugadorDiv.appendChild(nombreSpan);
  jugadorDiv.appendChild(puntuacionTitulo);
  jugadorDiv.appendChild(puntuacionSpan);
  jugadorDiv.appendChild(turnoTitulo);
  jugadorDiv.appendChild(turnoSpan);

  
  // Agrega el div del jugador al contenedor
  jugadoresContainer.appendChild(jugadorDiv);

}


function pasarSiguienteJugador(){
  const itemBoton = document.getElementById("botonSiguiente");
  const itemBotonRuleta = document.getElementById("ruleta");

  if(contadorJugador <3){
    contadorJugador++;
  }
  else{
    contadorJugador = 0;
  }

  //dibujar carton
  let gridHTML = generarGrid(jugadores[contadorJugador].carton);
  const t = document.getElementById("carton");
  t.innerHTML = gridHTML;
  
  validarCartonNumero();
}

function generarNumero() {
  let numero;
  
  do {
    numero = Math.floor(Math.random() * 50) + 1; // Generar número aleatorio entre 1 y 50
  } while (numerosGenerados.includes(numero));
  
  numerosGenerados.push(numero); // Agregar el número a la lista

  // Obtener referencia al listado de números
  const listadoNumeros = document.getElementById("listadoNumeros");
  listadoNumeros.innerHTML = ''; 
  // imprimr listado de numero generado

  let numerosGeneradosCopia = [].concat(numerosGenerados);
  numerosGeneradosCopia = numerosGeneradosCopia.reverse();

  numerosGeneradosCopia.forEach(numero => {
    const span = document.createElement("span");
    span.classList.add("numero");
    span.textContent = numero;
    listadoNumeros.appendChild(span);
  });

  validarCartonNumero();
}

function validarCartonNumero(){

  const items = document.querySelectorAll(".grid-cell");

  for(const item of items){
    const numeroItem = parseInt(item.textContent);
    if (numerosGenerados.includes(numeroItem)) {
      item.classList.add("seleccionado");
    }
  }
  verificarLinea();
}

function verificarLinea() {
  let elementos = document.getElementsByClassName("grid-cell");
  const gridSize = Math.sqrt(elementos.length);
  jugadores[contadorJugador].puntuacion = 0;

  // Verificar línea horizontal
  for (let i = 0; i < elementos.length; i += gridSize) {
    let lineaCompleta = true;
    for (let j = 0; j < gridSize; j++) {
      if (!elementos[i + j].classList.contains("seleccionado")) {
        lineaCompleta = false;
        break;
      }
    }
    if (lineaCompleta) {
      jugadores[contadorJugador].puntuacion = jugadores[contadorJugador].puntuacion + 1;
      console.log("Línea horizontal completa");
    }
  }

  // Verificar línea vertical
  for (let i = 0; i < gridSize; i++) {
    let lineaCompleta = true;
    for (let j = 0; j < gridSize; j++) {
      if (!elementos[i + j * gridSize].classList.contains("seleccionado")) {
        lineaCompleta = false;
        break;
      }
    }
    if (lineaCompleta) {
      jugadores[contadorJugador].puntuacion = jugadores[contadorJugador].puntuacion + 1;
      console.log("Línea vertical completa");
    }
  }

  // Verificar línea diagonal (izquierda a derecha)
  let lineaCompleta = true;
  for (let i = 0; i < gridSize; i++) {
    if (!elementos[i * (gridSize + 1)].classList.contains("seleccionado")) {
      lineaCompleta = false;
      break;
    }
  }
  if (lineaCompleta) {
    jugadores[contadorJugador].puntuacion = jugadores[contadorJugador].puntuacion + 3;
    console.log("Línea diagonal completa (izquierda a derecha)")
  }

  // Verificar línea diagonal (derecha a izquierda)
  lineaCompleta = true;
  for (let i = 0; i < gridSize; i++) {
    if (!elementos[(i + 1) * (gridSize - 1)].classList.contains("seleccionado")) {
      lineaCompleta = false;
      break;
    }
  }
  if (lineaCompleta) {
    jugadores[contadorJugador].puntuacion = jugadores[contadorJugador].puntuacion + 3;
    console.log("Línea diagonal completa (derecha a izquierda)")
  }

  // Verificar cartón lleno
  let cartonLleno = true;
  for (let i = 0; i < elementos.length; i++) {
    if (!elementos[i].classList.contains("seleccionado")) {
      cartonLleno = false;
    }
  }

  if (cartonLleno) {
    jugadores[contadorJugador].puntuacion = jugadores[contadorJugador].puntuacion + 5;
    console.log("Cartón lleno")
    partidaTerminada = true;
  }

  dibujar_estadistica_carton_jugador();

  if(partidaTerminada == true || contador1 == 25){
    const botnRuleta = document.getElementById("ruleta");
    botnRuleta.classList.add("d-none");

    const botonResultado = document.getElementById("resultado");
    botonResultado.classList.remove("d-none");
    botonResultado.classList.add("d-block");
  }
}

miStorage = window.localStorage;

function victorias() {
  let mayorpuntaje = 0;
  let nombreJugador = "";

  jugadores.sort(function(a, b) {
    return b.puntuacion - a.puntuacion;
  });

  if(jugadores[0].puntuacion !== jugadores[1].puntuacion){
    mayorpuntaje = jugadores[0].puntuacion;
    nombreJugador = jugadores[0].nombre;
  }

  console.log("nombre "+nombreJugador)
  console.log("mayorpuntaje "+mayorpuntaje)
  
  victoriasJugadores.push({nombre: nombreJugador, numero: 1});

  // Verificar si existe un valor en el almacenamiento local para 'victorias'
  if (localStorage.getItem('victorias') && nombreJugador !== "") {
    // Si existe, recuperar los datos almacenados
    const victoriasGuardadas = JSON.parse(localStorage.getItem('victorias'));
    let existeRegistro = false;

    // Recorrer los datos y realizar acciones
    victoriasGuardadas.forEach((victoria) => {
      const nombre = victoria.nombre;
      if(nombreJugador == nombre){
        existeRegistro = true;
        victoria.numero = victoria.numero +1;
      }
    });

    if(existeRegistro == false){
      victoriasGuardadas.push({nombre: nombreJugador, numero: 1});
    }
    
    localStorage.setItem('victorias',JSON.stringify(victoriasGuardadas));
  } else if(nombreJugador !== "") {
    localStorage.setItem('victorias',JSON.stringify(victoriasJugadores));
  }
}

function mostrarResultado() {
  victorias();
  const seccionPartida = document.getElementById("partida");
  seccionPartida.classList.remove("d-block");
  seccionPartida.classList.add("d-none");

  const seccionPartidaTerminada = document.getElementById("partidaTerminada");
  seccionPartidaTerminada.classList.remove("d-none");
  seccionPartidaTerminada.classList.add("d-block");

  let gridHTML = `<div class="grid">`;
  gridHTML += `<div class="grid-row-bingo"><h1 id="BINGO_RESULTADO">BING🎱 Resultados</h1></div>`;
  gridHTML += `<div class="grid-row-2">`;
  gridHTML += `<div class="grid-cell">Nombre</div>`;
  gridHTML += `<div class="grid-cell">Puntuaje</div>`;
  gridHTML += `</div>`;
  for (let jugador = 0; jugador < jugadores.length; jugador++) {
    gridHTML += `<div class="grid-row-2">`;
    
    gridHTML += `<div class="grid-cell">` + jugadores[jugador].nombre + `</div>`;
    gridHTML += `<div class="grid-cell">` + jugadores[jugador].puntuacion + `</div>`;
    
    gridHTML += `</div>`;
  }
  
  gridHTML += `</div>`;
  
  const mostrarTabla = document.getElementById("mostrarResultado");
  mostrarTabla.innerHTML = gridHTML;
}

function reiniciarJuego(){
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  // Código para abrir el localStorage aquí

  if (document.getElementById("tabla1") && localStorage.getItem('victorias')) {

    const victoriasGuardadas = localStorage.getItem('victorias');
    // Convertir los datos a un array de objetos
    const victorias = JSON.parse(victoriasGuardadas);
    const tabla = document.getElementById("tabla1");

    const listVictoria = [];

    // Recorrer los datos y realizar acciones
    victorias.forEach((victoria) => {
      const nombre = victoria.nombre;
      const numero = victoria.numero;

      listVictoria.push({
        nombre: nombre,
        numero: numero
      });

      // Ordenar por puntuaje
      listVictoria.sort(function(a, b) {
        return b.numero - a.numero;
      });
    });

    listVictoria.forEach((victoria) => {
      const nombre = victoria.nombre;
      const numero = victoria.numero;
      // Crea un nuevo elemento 'tr'
      const tr = document.createElement("tr");

      // Crea un nuevo elemento 'td'
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      // Agrega contenido a los elementos 'td'
      td1.textContent = nombre;
      td2.textContent = numero

      // Agrega los elementos 'td' al elemento 'tr'
      tr.appendChild(td1);
      tr.appendChild(td2);

      // Agrega el elemento 'tr' a la tabla existente
      tabla.appendChild(tr);
    });
  }
});