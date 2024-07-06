//Creacion de variable "numeroSecreto" para generar numero aleatorio con la funcion "generarNumeroSecreto()"
let numeroSecreto = 0;
let intentos = 0 ;
//declaramos una lista de numero sorteados para que se almacenen en un array.Para que no se repitan en el juego.
let listaNumerosSorteados = [];

let numeroMaximo = 10 ;

//accediendo a los objetos a traves de js;
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Juego del numero secreto';

//let parrafo = document.querySelector('p');
//parrafo.innerHTML = 'Indica un numero del 1 al 10';

//Ahora asignamos una funcion (asignarTextoElemento) con dos parametros (elemento,texto).

//En esta funcion eliminamos las declaraciones de variables que hicimos anteriormente y llamamos al document, 
//lo encapsulamos dentro de una funcion (asignarTextoElemento), y invocamos a la funcion , en este caso en dos veces
//una para el 'h1' y otra para el 'p' 
function asignarTextoElemento(elemento, texto){
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
};
//Evento click, capturamos el numero que el usuario declara mediante el querySelector('input') que es la etiqueta 
//que se encuentra en el archivo HTML;
//Con la funcion parseInt forzamos a que el programa use solo numeros y  no string, 
//los diferentes console.log typeof son usados para verificar que clase de datos estamos usando (numeros o string)
//y los console.log son usados para ver el numero que genera la maquina y el que pone el usuario.
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
  
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //en caso de que el usuario acierte quitamos el atributo disabled que tiene el boton reiniciar en el html
        //para que el boton "reiniciar" quede habilidado
        //para ello llamamos al elemento por su id
        document.getElementById('reiniciar').removeAttribute('disabled');
//Si el usuario no acertó corresponde el siguiente "else":
    } else{
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            if(numeroDeUsuario < numeroSecreto){
                asignarTextoElemento('p','El número secreto es mayor');
            }
        }
        intentos++;
        limpiarCaja();
    }
    return;

};

//Creamos una funcion para limpiar el espacio donde el usuario coloca el numero:
function limpiarCaja(){
    //de esta forma el query selector obtiene elementos por id ('#nombreDelId').
    //con el  ( .value = '' ) limpiamos la caja donde el usuario coloca el numero.
   document.querySelector('#valorUsuario').value = '';
    
}

//Creamos la funcion para generar un numero aleatorio (generarNumeroSecreto).

function generarNumeroSecreto() {
   let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
   console.log(numeroGenerado);
   console.log(listaNumerosSorteados);
   //Si ya sorteamos todos los numeros:
   if(listaNumerosSorteados.length == numeroMaximo){
     asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    }else {

   
      //Si el numero generado esta incluido en la lista hacemos la siguiente operacion:
      if(listaNumerosSorteados.includes(numeroGenerado)) {
         return generarNumeroSecreto()
        }else {
         listaNumerosSorteados.push(numeroGenerado);
         return numeroGenerado;
        }
    } 
};


//creamos una funcion para los mensajes iniciales:
function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos= 1;
}


//Creamos la funcion para reiniciar el juego, 
function reiniciarJuego(){
      //para ello necesitamos:
     // 1)limpiar la caja 
      limpiarCaja(); 
     // 2)indicar el mensaje incial de intervalo de numeros.
     
    // 3)generar el numero aleatorio.
    // 4)inicializar el numero de intentos.
   condicionesIniciales();
   // 5)deshabilitar el boton de nuevo juego.
   document.querySelector('#reiniciar').setAttribute('disabled','true');

}



//Llamamos a la funcion "asignarTextoElemento" y le damos sus parametros , una para el 'h1' y otra para el 'p'
condicionesIniciales();