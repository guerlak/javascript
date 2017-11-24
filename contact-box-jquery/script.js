$(document).ready(function(){
	
		var book = {

			name: 'Personal Contacts',
	
			contacts: [],
	
			add: function(contact){
				for(key in this.contacts){
					console.log("entered for add");
					var c = this.contacts[key];
						if(contact.phone === c.phone){
							alert("Sorry, this phone number is already registered.");
							return;
					}
				}
				this.contacts.push(contact);
				createContactBox(contact);
				this.save();
			},
	
			delete: function(phone){
				for(key in this.contacts){
					var contact = this.contacts[key];
					if(contact.phone == phone){
						this.contacts.splice(key,1);
						this.save();
						return;
					}
					this.contacts.splice(key,1);
					this.save();
				}
			},

			update: function(oldPhone, contactUpdated){
				console.log("Passou no update")
				this.delete(oldPhone);
 				this.add(contactUpdated);
			},
	
			list: function(){
				this.getSavedContacts();
				for(key in this.contatos){
					var contact = this.contacts[key];
					createNewContact(contato)
				}
			},
	
			save: function(){
				localStorage.setItem(contacts.name,  JSON.stringify(this.contacts));
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
				website: $('#txtWebSite').val()
			}

			if($('#btnSubmit').val() == 'Register'){
				console.log("This contact: " + contact.name);
				book.add(contact);
				return ;
			} 

			$('#btnSubmit').val('Register');
			book.update(oldPhone, contact);
		
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
			var $name = $('<h3>',{class:'name', text:contact.name});
			var $email = $('<p>',{class:'email',text:contact.email});
			var $phone = $('<p>',{class:'phone', text:contact.phone});
			var $website = $('<p>',{class:'website', text:contact.website});
			var $btnDelete = $('<button>',{class:'btnDelete',text:'del','data-phone':contact.phone});
			var $btnEdit = $('<button>', {class:'btnEdit', text:'edit', 'data-phone':contact.phone})
			var $contacts = $('#contacts');

			$btnDelete.click(function(event){
				console.log("passing delete")
				var $btn = $(event.target);
				var phone = $btn.data('phone');
				var $box = $('#'.concat(phone));
				console.log("O phone no delete é: " + phone);
					book.delete(phone);
					$box.remove();

			});

			$btnEdit.click(function(event){
				console.log("entered edit btn");
				var $btn = $(event.target);
				var phone = $btn.data('phone');
				var $box = $('#'.concat(phone));
				var $name = $box.find('.name');
				var $email = $box.find('.email');
				var $phone = $box.find('.phone');
				var $website = $box.find('.website');

				$('#txName').val($name.text());
				$('#txtEmail').val($email.text());
				$('#txtPhone').val($phone.text());
				$('#txtwebsite').val($email.text());
				var oldPhone = $('#oldPhone').val($phone.text());
				var phone = 	$('#txtPhone').val($phone.text());
				$('#btnSubmit').val('Update');

			});
	
			$box.append($name);
			$box.append($email);
			$box.append($phone);
			$box.append($website);
			$box.append($btnDelete);
			$box.append($btnEdit);
			$contacts.append($box);

		}
	
		book.list();
		book.save();
	
});