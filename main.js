
function habilitarboton() {
  let input1 = document.getElementById("j1i").value;
  let input2 = document.getElementById("j2i").value;
  let input3 = document.getElementById("j3i").value;
  let input4 = document.getElementById("j4i").value;

  if(input1 == "" || input2 == "" || input3 == "" || input4 == "" ){
    alert("Por favor, completa todos los campos.");
  } else if( numfilas == 0 && numcolumnas == 0 ){
    alert("Por favor, Elige el tamaño de carton.");
  } else {
    matrices();
  } 
}

let contador1 = 1;

function contador() {
    const divContador = document.getElementById('contador');
    if (contador1 < 25) {
      contador1++;
      divContador.innerText = `${contador1}`;}
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
    matriz1 = generarMatrizAleatoria(numfilas, numcolumnas);
    matriz2 = generarMatrizAleatoria(numfilas, numcolumnas);
    matriz3 = generarMatrizAleatoria(numfilas, numcolumnas);
    matriz4 = generarMatrizAleatoria(numfilas, numcolumnas);

    //jugador 1
    jugadores.push({
      nombre: document.getElementById("j1i").value,
      puntuacion: 0,
      tiempo: 0,
      carton: matriz1
    });

    //jugador 2
    jugadores.push({
      nombre: document.getElementById("j2i").value,
      puntuacion: 0,
      tiempo: 0,
      carton: matriz2
    });

    //jugador 3
    jugadores.push({
      nombre: document.getElementById("j3i").value,
      puntuacion: 0,
      tiempo: 0,
      carton: matriz3
    });

    //jugador 4
    jugadores.push({
      nombre: document.getElementById("j4i").value,
      puntuacion: 0,
      tiempo: 0,
      carton: matriz4
    });

    let seccion = document.getElementById("contenedor");
    seccion.style.display = "none";

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
  
  const tiempoTitulo = document.createElement("span");
  tiempoTitulo.classList.add("texto");
  tiempoTitulo.textContent = "Tiempo:";
  
  const tiempoSpan = document.createElement("span");
  tiempoSpan.classList.add("tiempo");
  tiempoSpan.textContent = jugadores[contadorJugador].tiempo;


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
  jugadorDiv.appendChild(tiempoTitulo);
  jugadorDiv.appendChild(tiempoSpan);
  jugadorDiv.appendChild(turnoTitulo);
  jugadorDiv.appendChild(turnoSpan);

  
  // Agrega el div del jugador al contenedor
  jugadoresContainer.appendChild(jugadorDiv);

  //dibujar carton
  let gridHTML = generarGrid(jugadores[contadorJugador].carton);
  const t = document.getElementById("carton");
  t.innerHTML = gridHTML;
}


function pasarSiguienteJugador(){
  const itemBoton = document.getElementsByClassName("botonSiguiente");
  if(contadorJugador <3){
    contadorJugador++;
    itemBoton.innerHTML = "Siguiente Jugado"
  }
  else{
    itemBoton.innerHTML = "Sacar un Número"
    contador()
    contadorJugador = 0;
    generarNumero(); // Generar el número aleatorio
  }
  dibujar_estadistica_carton_jugador();
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
  numerosGenerados.reverse().forEach(numero => {
    const span = document.createElement("span");
    span.classList.add("numero");
    span.textContent = numero;
    listadoNumeros.appendChild(span);
  });
}



/* document.addEventListener("DOMContentLoaded", function() {
  function generarNumeroUnico() {
    
    function generarNumero() {
      let numero;
      
      do {
        numero = Math.floor(Math.random() * 50) + 1; // Generar número aleatorio entre 1 y 50
      } while (numerosGenerados.includes(numero));
      
      numerosGenerados.push(numero); // Agregar el número a la lista
      
      const agregar = document.getElementById("num");
      agregar.innerText = `${numero}`;
      
      return numero;
    }
    
    return generarNumero;
  }
 
  
  // Obtener referencia al botón
  const boton = document.getElementById("ruleta");
  
  // Obtener referencia al elemento donde se mostrará el número
  const numeroMostrado = document.getElementById("numeroMostrado");
  
  // Crear una instancia de la función generarNumeroUnico
  const generarNumero = generarNumeroUnico();
  
  // Agregar controlador de evento al botón
  boton.addEventListener("click", function() {
    const numeroAleatorio = generarNumero(); // Generar el número aleatorio
    numeroMostrado.innerText = `Número: ${numeroAleatorio}`; // Mostrar el número en el elemento HTML
  });
});
 */