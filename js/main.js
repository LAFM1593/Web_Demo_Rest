
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    });
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    /*$('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });*/

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    

    /*==================================================================
    [ Show / hide contact ]*/
    /*$('.btn-hide-contact100').on('click', function(){
        $('.container-contact100').fadeOut(300);
    });

    $('.btn-show-contact100').on('click', function(){
        $('.container-contact100').fadeIn(300);
    });*/
	
	function initLogin(){
	
		var input = $('.form_login .validate-input .input100');		

		input.each(function(){
			
			$(".form_backoffice input").val("");
			$(this).parent().removeClass('true-validate');
			
			$(this).focus(function(){
			   hideValidate(this);
			   $(this).parent().removeClass('true-validate');
			});
		});
			
		$('.form_login').on('submit',function(){
	
			var check = true;
			for(var i=0; i<input.length; i++) {
				if(validate(input[i]) == false){
					showValidate(input[i]);
					check=false;
				}
			}
			
			if(check){				
				login($(this).serializeObject());
			}
			
			return false;
		});
		
	}
	
	function initBackoffice(){
		
		$('.container-contact100').fadeIn(300);
		$('#container_backoffice').fadeIn(300);
		
		var input = $('.form_backoffice .validate-input .input100');		

		input.each(function(){

			$(".form_backoffice input").val("");
			$(this).parent().removeClass('true-validate');
			
			$(this).focus(function(){
			   hideValidate(this);
			   $(this).parent().removeClass('true-validate');
			});
		});
					
		$('.form_backoffice').on('submit',function(){
	
			var check = true;
			for(var i=0; i<input.length; i++) {
				if(validate(input[i]) == false){
					showValidate(input[i]);
					check=false;
				}
			}
			
			if(check){
				$('.container-contact100').fadeOut(300);
				$('#container_backoffice').fadeOut(300);
				
				descargarArchivo();
			}
			
			return false;
		});
		
	}
	
	function initRegistrarAmigo(){
		
		$('.container-contact100').fadeIn(300);
		$('#container_registrar_amigo').fadeIn(300);
		
		var input = $('.form_registrar_amigo .validate-input .input100');		

		input.each(function(){

			$(".form_registrar_amigo input").val("");
			$(this).parent().removeClass('true-validate');
			
			$(this).focus(function(){
			   hideValidate(this);
			   $(this).parent().removeClass('true-validate');
			});
		});
					
		$('.form_registrar_amigo').on('submit',function(){
	
			var check = true;
			for(var i=0; i<input.length; i++) {
				if(validate(input[i]) == false){
					showValidate(input[i]);
					check=false;
				}
			}
			
			if(check){
				$('.container-contact100').fadeOut(300);
				$('#container_registrar_amigo').fadeOut(300);
				
				//descargarArchivo();
			}
			
			return false;
		});
		
	}
	
	
	function initConsultarAmigos(){
		
		$('.container-contact100').fadeIn(300);
		$('#container_consultar_amigos').fadeIn(300);
		
		consultarAmigos();
				
	}
	
	function initOptions(){
		
		$('.container-contact100').fadeOut(300);
		$('#container_login').fadeOut(300);
		
				
		$('.btn_backoffice').on('click', function(){
			initBackoffice();			
		});
		
		$('.btn_consultar_amigos').on('click', function(){	
			initConsultarAmigos();			
		});
		
		$('.btn_registrar_amigo').on('click', function(){	
			initRegistrarAmigo();			
		});
		
		
	}
	
	$('.btn-hide-contact100').on('click', function(){
		$('.container-contact100').fadeOut(300);
		$('.wrap-contact100').fadeOut(300);
	});
	
	initLogin();
	
	/************AJAX**************/
	
	function login(data){
		
		var alert = $('#container_login .title_alert');	
		var loading = $('#container_login #loading');

		loading.css("display", "block");
			
		$.ajax({
		  type: "POST",
		  url: "http://localhost:8081/loginCliente",
		  data: data,
		  success: function(data){
			loading.css("display", "none");
			if(data.status){
				alert.text("");
				initOptions();
			}else{
				alert.text(data.message);
			}
		  },
		  contentType: "application/json",
		  dataType: "json"
		});
	}
	
	function consultarAmigos(){
		
		var alert = $('#container_login .title_alert');	
			
		$.ajax({
		  type: "POST",
		  url: "http://localhost:8081/consultarClientes",
		  success: function(data){
			if(data.status){
				alert.text("");
				
				var dataSet = [];
				
				$.each(data.data, function(i, obj){ 
					dataSet.push([centerText(obj.nombre + ' ' + obj.apaterno + ' ' + obj.amaterno), 
						centerText(obj.correo_electronico), 
						centerText(obj.telefono), obj.clienteId]);
				});
								
				$('#tb_amigos').DataTable( {
					data: dataSet,
					columns: [
						{ title: centerText("Nombre") },
						{ title: centerText("Correo") },
						{ title: centerText("Teléfono") },
						{ title: centerText("Solicitud") }
					],
					"searching": false,
					"paging":   false,
					"ordering": false,
					"info":     false,
					"responsive": true,
					"destroy": true,
					"columnDefs": [{
						"targets": 3,
						"render": function ( data, type, row ) {
							console.log(data);
							return "<center><a href='#' class='zmdi zmdi-assignment-o'></i></center>";
						}
					}]
				});
				
			}else{
				alert.text(data.message);
			}
		  },
		  contentType: "application/json",
		  dataType: "json"
		});
	}
	
	function descargarArchivo(){
		window.location.href='http://localhost:8084/download';
	}
	
	/************serializeObject**************/

	$.fn.serializeObject = function() {
		var obj = {};
		var arr = this.serializeArray();
		arr.forEach(function(item, index) {
			if (obj[item.name] === undefined) { // New
				obj[item.name] = item.value || '';
			} else {                            // Existing
				if (!obj[item.name].push) {
					obj[item.name] = [obj[item.name]];
				}
				obj[item.name].push(item.value || '');
			}
		});
		return JSON.stringify(obj);
	};
	
	function centerText(text){
		return "<center>" + text + "</center>";
	}
	
	
	
	

})(jQuery);