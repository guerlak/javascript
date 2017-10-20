
var campoFiltro = document.querySelector("#filtro");


campoFiltro.addEventListener("input", function(){
	console.log(this.value);

	var pacientes = document.querySelectorAll(".paciente");

	for(i = 0; i < pacientes.length; i++){
		var paciente = pacientes[i];

		var tdNome = paciente.querySelector(".info-nome");
		var nome = tdNome.textContent;

		var expressao = new RegExp(this.value, "i");

		if(expressao.test(nome)){
				paciente.classList.remove("fade-out");
		}else{
				paciente.classList.add("fade-out");
		}
		
		console.log(nome);
	}

});

