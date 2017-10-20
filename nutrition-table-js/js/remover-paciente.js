


var botoesRemove = document.querySelectorAll(".paciente");

botoesRemove.forEach(function(paciente){
	paciente.addEventListener("dblclick", function(event){
	console.log(event.target);

	var target = event.target;
	var parent = target.parentNode;
	parent.classList.add("fade-out");

	setTimeout(function(){
		parent.remove();
	},300);
	
	});

});

