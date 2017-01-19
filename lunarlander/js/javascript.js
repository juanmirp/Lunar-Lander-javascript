var y = 80; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var pause=false;
var gameOver=false;



//al cargar por completo la página...
window.onload = function(){
	
document.onmousedown= function () {
 	  if(a==g&&!pause){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
 document.onmouseup=motorOff;
	
	document.getElementsByClassName("pausa")[0].onclick=function(){
		mostrarPausa();
		ocultarHelp();
	    stop();
		pause=true;
		naveNormal();
		}
		
		document.getElementsByClassName("play")[0].onclick=function(){
		QuitarPausa();
		ocultarHelp();
		if(pause){
		ocultarElementoPlay();
		ocultarElementoReplay();
		ocultarElementoHelp();
		start();
		pause=false;
		}
		
		
	}
	
			document.getElementsByClassName("replay")[0].onclick=function(){
		y=80;
        v=0;
		a=g;
		fuel=100;
		pause=false;
		gameOver=false;
		RellenarBarra();
		QuitarPausa();
		ocultarHelp();
		stop();
		motorOff();
		start();
		document.getElementsByClassName("fin")[0].style.display="none";
	    }
		
		document.getElementsByClassName("help")[0].onclick=function(){
		mostrarHelp();
		QuitarPausa();
		pause=true;
		stop();
		document.getElementsByClassName("fin")[0].style.display="none";
	    }
		
		document.getElementsByClassName("herramientas")[0].onclick=function(){
			
			stop();
			pause=true;
			mostrarElementoPlay();
			mostrarElementoReplay();
			mostrarElementoHelp();
		}
		
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	document.ontouchstart=motorOn;
	document.ontouchend=motorOff;
	
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementsByClassName("vel1")[0].innerHTML=v.toFixed(2);
	y -=v*dt;
	document.getElementsByClassName("altura1")[0].innerHTML=(y-35).toFixed(2);
	
	//mover hasta que top sea un 65% de la pantalla
	if (y>30){ 
		document.getElementsByClassName("nave")[0].style.top =(100-y)+"%"; 
	} else { 
	document.getElementsByClassName("vel1")[0].innerHTML=v.toFixed(2);	
		stop();
		if(v>6){
			perder();
			v=0;
			y=0;
			document.getElementsByClassName("vel1")[0].innerHTML=v;
			document.getElementsByClassName("altura1")[0].innerHTML=y;
		}else{
			ganar();
			v=0;
			y=0;
			document.getElementsByClassName("vel1")[0].innerHTML=v;
			document.getElementsByClassName("altura1")[0].innerHTML=y;
		}
	}
	
}
function motorOn(){
	if(y>1){
     a=-g
	 naveFuego();
	 if (timerFuel==null)
	 timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
	      }
	
}
function motorOff(){
	if(!gameOver){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	naveNormal();
	}
	
}
function actualizarFuel(){
	
	if(!gameOver){
		 if(fuel>0){
		 fuel-=0.1;
	     document.getElementById("progressBar").value=fuel;
          	}
	     else{
		 motorOff();
	     }
	             }
}

function mostrarPausa(){
	document.getElementsByClassName("pausamenu")[0].style.display="block";
}

function QuitarPausa(){
	document.getElementsByClassName("pausamenu")[0].style.display="none";
}

function mostrarHelp (){
		document.getElementsByClassName("helpmenu")[0].style.display="block";	
	}
	
	function ocultarHelp (){
		document.getElementsByClassName("helpmenu")[0].style.display="none";	
	}
	function naveNormal(){
		 document.getElementById("imagenNave").src="img/ship.png";
	}
	function naveFuego(){
		 document.getElementById("imagenNave").src="img/shipfire1.png";
	}
	function explotar(){
		document.getElementById("imagenNave").src="img/boom.jpg";
	}
	
	function RellenarBarra(){
		document.getElementById("progressBar").value=100;
	}
	
	function perder(){
		explotar();
	    gameOver=true;
		document.getElementsByClassName("fin")[0].style.display="block";
		document.getElementsByClassName("fintexto")[0].innerHTML="Has perdido!!";
		
	}
	function ganar(){
		gameOver=true;
		document.getElementsByClassName("fin")[0].style.display="block";
		document.getElementsByClassName("fintexto")[0].innerHTML="Has ganado!!";
	}
	
	function mostrarElementoPlay(){
		document.getElementsByClassName("play")[0].style.display="block";
	}
	function mostrarElementoReplay(){
		document.getElementsByClassName("replay")[0].style.display="block";
	}
	function mostrarElementoHelp(){
		document.getElementsByClassName("help")[0].style.display="block";
	}
	function ocultarElementoPlay(){
		document.getElementsByClassName("play")[0].style.display="none";
	}
	function ocultarElementoReplay(){
		document.getElementsByClassName("replay")[0].style.display="none";
	}
	function ocultarElementoHelp(){
		document.getElementsByClassName("help")[0].style.display="none";
	}
	
