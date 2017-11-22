$(document).ready(function(){

	var book = {
		name: 'Personal Contacts',

		contacts: [],

		add: function(contact){
				this.contacts.push(contact);
				createContactBox(contact);
		},

		remover: function(nome){
			for(indice in this.contatos){
				var contato = this.contatos[indice];
				if(contato.nome === nome){
					this.contatos.splice(indice,1);
					return true;
				}
			}
			throw new Error('Error removing user');
		},

		list: function(){
			this.pegarContatosSalvos();
			for(indice in this.contatos){
				var contato = this.contatos[indice];
				criarNovoContato(contato);
			}
		},

		save: function(){
			var contatosString = JSON.stringify(this.contatos);
			console.log("stringyyy -> " + contatosString);
			localStorage.contatos = contatosString;
			
		},

		pegarContatosSalvos: function(){
			contatos = JSON.parse(localStorage.contatos);
		}
	};

	$("#register").submit(function(event){
		event.preventDefault();
		var contact = {
			name: $('#txtName').val(),
			email: $('#txtEmail').val(),
			phone: $('#txtPhone').val(),
			website: $('#txtWebSite').val()
		}
		console.log("This contact " + contact);
		book.add(contact);
	});

	var createContactBox = function(contact){
		var colors = [
			'green-box',
			'orange-box',
			'blue-box',
			'purple-box',
			'red-box'
		]

		var color = colors[Math.floor(Math.random() * colors.length)];

		var $box = $('<div>',{class:'contact-box '+ color});
		var $name = $('<h3>',{text:contact.name});
		var $email = $('<p>',{text:contact.email});
		var $phone = $('<p>',{text:contact.phone});
		var $website = $('<p>',{text:contact.website});
		var $contacts = $('#contacts');

		$box.append($name);
		$box.append($email);
		$box.append($phone);
		$box.append($website);
		$contacts.append($box);
	}

	book.list();
	book.save();

});