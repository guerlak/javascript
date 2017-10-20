var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function() {
	event.preventDefault();

	console.log("Buscando pacientes...")
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function() {
    	if(xhr.status == 200){
    		console.log(xhr.responseText);
	        var resposta = xhr.responseText;
	        var pacientes = JSON.parse(resposta);

	        pacientes.forEach( function(paciente){
	        	addPacientenaTabela(paciente);
	        });
    }else{
    	console.log("errooooo");
    }
    	
    });

    xhr.send();
    
});