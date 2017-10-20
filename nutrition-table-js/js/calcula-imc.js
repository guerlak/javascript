var todosPacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < todosPacientes.length; i++) {
	
		paciente = todosPacientes[i];

		var tdPeso = paciente.querySelector(".info-peso");
		var peso = tdPeso.textContent;

		var tdAltura = paciente.querySelector(".info-altura");
		var altura = tdAltura.textContent;

		var tdImc = paciente.querySelector(".info-imc");
		tdImc.textContent = calculaImc(peso, altura);

		var alturaValida = validaAltura(altura);
		var pesoValido = validaPeso(peso);

		if(!alturaValida){
			tdImc.textContent = "Altura invalida";
			paciente.classList.add("paciente-erro")
				
			}

		if(!pesoValido){
			tdImc.textContent = "Peso invalido";
			paciente.classList.add("paciente-erro")
		}

	}

	function validaAltura(altura){

		if(altura < 0.5 || altura > 3){
			return false;
		}else{
			return true;
		}
	}

	function validaPeso(peso){

		if(peso < 10 || peso > 300){
				return false;
		}else{
			return true;
		}
	}

		

	function calculaImc(peso,altura) {

		var imc = 0;
		imc = peso / (altura * altura)
		return imc.toFixed(2);
	}

	

