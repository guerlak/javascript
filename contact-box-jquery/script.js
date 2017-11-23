$(document).ready(function(){
	
		var book = {
			name: 'Personal Contacts',
	
			contacts: [],
	
			add: function(contact){
				
				for(key in this.contacts){
					console.log("entered for add");
					var c = this.contacts[key];
						if(contact.phone === c.phone){
							alert("phone not");
							return;
					}
				}

				this.contacts.push(contact);
				createContactBox(contact);
				save();
			},
	
			delete: function(phone){
				for(key in this.contacts){
					console.log("entrou no for delete")
					var contact = this.contacts[key];
					if(contact.phone === phone){
						console.log("entrou no if delete")
						this.contacts.splice(key,1);
						this.save();
						return true;
					}
				}
				//throw new Error('Error removing user...');
			},
	
			list: function(){
				this.getSavedContacts();
				for(key in this.contatos){
					var contact = this.contacts[key];
					createNewContact(contato)
				}
			},
	
			save: function(){
				var contactsString = JSON.stringify(this.contacts);
				console.log("stringyyy -> " + contatosString);
				localStorage.contacts = contactsString;
				
			},
	
			getSavedContacts: function(){
				contacts = JSON.parse(localStorage.contacts);
			}
		};
	
		$("#register").submit(function(event){
			event.preventDefault();
			var contact = {
				name: $('#txtName').val(),
				email: $('#txtEmail').val(),
				phone: $('#txtPhone').val(),
				website: $('#txtWebSite').val(),
			}
			console.log("This contact: " + contact.name);
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
	
			var $box = $('<div>',{class:'contact-box '+ color, id:contact.phone});
			var $name = $('<h3>',{text:contact.name});
			var $email = $('<p>',{text:contact.email});
			var $phone = $('<p>',{text:contact.phone});
			var $website = $('<p>',{text:contact.website});
			var $btnDelete = $('<button>',{class:'btnDelete',text:'x','data-phone':contact.phone});
			var $contacts = $('#contacts');

			$btnDelete.click(function(event){
				console.log("passing delete")
				var $btn = $(event.target);
				var phone = $btn.data('phone');
				var $box = $('#'.concat(phone));

					book.delete(phone);
					$box.remove();
			});
	
			$box.append($name);
			$box.append($email);
			$box.append($phone);
			$box.append($website);
			$box.append($btnDelete);
			$contacts.append($box);
		}
	
		book.list();
		book.save();
		console.log("All : "+book.getSavedContacts());
	
	});