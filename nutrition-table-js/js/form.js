var titulo = document.querySelector(".titulo");
titulo.textContent = "Nutrition Web";

	var botao = document.querySelector("#adicionar-paciente");

	botao.addEventListener("click", function(){
		event.preventDefault();
		console.log("vc clicou");

		

		var form = document.querySelector("#formulario");
		var paciente = getFormPacientes(form);

		var erros = validaPaciente(paciente);

		if(erros.length > 0){

			invalidAdvise(erros);
			return;
		}
		
		//adding to table
		addPacientenaTabela(paciente);

		var ul = document.querySelector("#errorAdvices");
		ul.innerHTML = "";

		form.reset();
		
	});

	function addPacientenaTabela(paciente){
		var pacienteTr = createTableTr(paciente);
		var tabela = document.querySelector("#tabela-pacientes");
		tabela.appendChild(pacienteTr);

	}


	function getFormPacientes(form){

		var paciente = {
			nome: form.nome.value,
			peso: form.peso.value,
		    altura: form.altura.value,
		    gordura: form.gordura.value,
		    imc: calculaImc(form.peso.value, form.altura.value),
		    remove: "Remover"
		}

		return paciente;
	}

	function createTableTr(paciente){

		var pacienteTr = document.createElement("tr");
		pacienteTr.classList.add("paciente");

		var nomeTd = createTd(paciente.nome, "info-nome");
		var pesoTd = createTd(paciente.peso, "info-peso");
		var alturaTd = createTd(paciente.altura, "info-altura");
		var gorduraTd = createTd(paciente.gordura, "info-gordura");
		var imcTd = createTd(paciente.imc, "info-imc");


		pacienteTr.appendChild(nomeTd);
		pacienteTr.appendChild(pesoTd);
		pacienteTr.appendChild(alturaTd);
		pacienteTr.appendChild(gorduraTd);
		pacienteTr.appendChild(imcTd);



		var tabela = document.querySelector("#tabela-pacientes");

		tabela.appendChild(pacienteTr);

		return pacienteTr;
	
	}

	function createTd(dado,classe){
		var td = document.createElement("td");
		td.textContent = dado;
		td.classList.add(classe);

		return td;
	}

	function validaPaciente(paciente){

		var erros = [];

		if(paciente.nome.length == 0){
			erros.push("Nome em branco")
		}

		if(!validaAltura(paciente.altura)){
			erros.push("Altura inválida");
		}

		if(!validaPeso(paciente.peso)){
			erros.push("Peso inválido");
		}

		return erros;
	}

	function invalidAdvise(erros){

		var ul = document.querySelector("#errorAdvices");
		ul.innerHTML = "";
		erros.forEach(function(erro){
			var li = document.createElement("li");
			li.textContent = erro;
			ul.appendChild(li);
		});	
	
	}











