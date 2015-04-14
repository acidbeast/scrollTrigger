(function($){


	$.fn.scrollTrigger = function(options){




		/* Дефолтные настройки */
		var options = $.extend({
			on: undefined,
			off: undefined
		}, options || {});




		/* Переменные */
		var 
			box = $(this),
			offset,
			isArray = false,
			trigger = true,
			triggersArray = [];




		/* Проверяет тип */
		if(options.offset && $.isArray(options.offset) == true){
			isArray = true;
		}



		/* Функции */




		/* Получает оффсет */
		var getOffset = function(){



			/* Передан через options */
			if(options.offset){
				offset = options.offset;
			}

			else {


				/* Не задан */
				if(typeof(offset) == "undefined"){
					offset = box.offset().top;
				}


				/* Задан в data-аттрибутах */
				else{
 					offset = box.data('offset');
				}

			}


		}



		/* Events */



		$(window).scroll(function(){



			/* Get window scrolltop */
			offsetTop = $(window).scrollTop();



			/* Если offset передан как массив */
			if(isArray == true){

				for(key in options.offset){



					/* Создает триггеры для каждого элемента массива */
					if($.inArray(key, triggersArray) == -1){
						triggersArray.push(false);
					}



					/* Проверяет на наличие функции в offset */
					var arrayOffset;

					if(options.offset[key] instanceof Function){
						arrayOffset = options.offset[key]();
					}
					else{
						arrayOffset = options.offset[key];
					}



					/* Выполняет callback on для каждого элемента при соотвествующем оффсете */
					if(offsetTop > arrayOffset && triggersArray[key] == true){
						triggersArray[key] = false;
						if(options.handlers[key].on instanceof Function){
							options.handlers[key].on (box,offset);
						}
					}



					/* Выполняет callback off для каждого элемента при соотвествующем оффсете */					
					else if(offsetTop < arrayOffset && triggersArray[key] == false) {
						triggersArray[key] = true;
						if(options.handlers[key].off instanceof Function){
							options.handlers[key].off(box,offset);
						}
					}



				}


			}

			else {



				/* Выполняет callback on */
				if(offsetTop > offset && trigger == true){
					trigger = false;
					if(options.on instanceof Function){
						options.on(box,offset);
					}
				}



				/* Выполняет callback off */
				else if(offsetTop < offset && trigger == false) {
					trigger = true;
					if(options.off instanceof Function){
						options.off(box,offset);
					}
				}

			}



		});



	}


})(jQuery);