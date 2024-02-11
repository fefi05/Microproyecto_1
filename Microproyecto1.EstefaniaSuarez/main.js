function habilitarbotonprim() {
    let boton2 = document.getElementById("boton1");
    boton2.disabled = false;
}

function habilitarboton() {
    let input1 = document.getElementById("j1i").value;
    let input2 = document.getElementById("j2i").value;
    let input3 = document.getElementById("j3i").value;
    let input4 = document.getElementById("j4i").value;
    let boton2 = document.getElementById("boton1").disabled;

  if (input1 !== "" && input2 !== "" && input3 !== "" && input4 !== "" && boton2 == false) {
    /*window.location.href = ('http://127.0.0.1:3000/pestana3.html');*/
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

let contador1 = 0;

function contador() {
    const divContador = document.getElementById('contador');
    contador1++;
    divContador.innerText = `${contador1}`;
}



let numfilas = 0 
let numcolumnas = 0
let matriz1 = []
let matriz2 = []
let matriz3 = []
let matriz4 = []


function getnum(x) {
    numfilas = x;
    numcolumnas = x;
}

function generarMatrizAleatoria(filas, columnas) {
    var matriz = [];
    var numerosDisponibles = [];
  
    // Llenar el array con los números del 1 al 50
    for (var i = 1; i <= 50; i++) {
      numerosDisponibles.push(i);
    }
  
    // Generar la matriz aleatoria
    for (var fila = 0; fila < filas; fila++) {
      matriz[fila] = [];
  
      for (var columna = 0; columna < columnas; columna++) {
        var indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
        var numeroAleatorio = numerosDisponibles.splice(indiceAleatorio, 1)[0];
        matriz[fila][columna] = numeroAleatorio;
      }
    }
  
    return matriz;
  }

function generarGrid(matriz) {
    let gridHTML = `<div class="grid">`;
    
    for (let fila = 0; fila < matriz.length; fila++) {
      gridHTML += `<div class="grid-row">`;
      
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

    let gridHTML = generarGrid(matriz1);
    const t = document.getElementById("carton");
    t.innerHTML = gridHTML;
}

document.getElementById("boton1").addEventListener("click", function() {
    console.log("Botón clickeado");
    let seccion = document.getElementById("contenedor");
    seccion.style.display = "none";
  });