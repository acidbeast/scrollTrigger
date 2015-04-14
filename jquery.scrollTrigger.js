(function($){


	$.fn.scrollTrigger = function(data, options){



		var version = "0.3";



		/* Дефолтные настройки */
		var options = $.extend({
			progress: 'total'
		}, options || {});




		/* Переменные */
		var 
			box,
			offset,
			isArray = false,
			trigger = true,
			triggersArray = [];





		/* Функции */




		/* Получает оффсет */
		var getOffset = function(box, data){



			/* Check offset in data */
			if(data.offset){
				if(data.offset instanceof Function){
					return data.offset();
				}
				else {
					return parseInt(data.offset);
				}
			}



			/* Check offset in data-attributes */
			else if (box.data('offset')) {
				return box.data('offset');
			}



			/* Get offset of the box */
			// else {
			// 	return box.offset().top;
			// }



		}





		/* Проверяет тип */
		if(data && $.isArray(data) == true){
			isArray = true;
		}
		else {
			box = $(data.container);
			offset = getOffset(box, data);
		}




		/* Events */



		$(window).scroll(function(){



			/* Get window scrolltop */
			offsetTop = $(window).scrollTop();




			/* Если offset передан как массив */
			if(isArray == true){



				for(key in data){



					/* Создает триггеры для каждого элемента массива */
					if($.inArray(key, triggersArray) == -1){
						triggersArray.push(true);
					}



					/* Проверяет на наличие функции в offset */
					var inArrayBox = $(data[key].container);
					var inArrayOffset = getOffset(inArrayBox, data[key]);




					/* Выполняет callback on для каждого элемента при соотвествующем оффсете */
					if(offsetTop > inArrayOffset && triggersArray[key] == true){
						triggersArray[key] = false;
						if(data[key].on instanceof Function){
							data[key].on(inArrayBox, inArrayOffset);
						}
					}


					/* Выполняет callback off для каждого элемента при соотвествующем оффсете */					
					else if(offsetTop < inArrayOffset && triggersArray[key] == false) {
						triggersArray[key] = true;
						if(data[key].off instanceof Function){
							data[key].off(inArrayBox, inArrayOffset);
						}
					}



				}



			}

			else {



				/* Выполняет callback on */
				if(offsetTop > offset && trigger == true){
					trigger = false;
					if(data.on instanceof Function){
						data.on(box,offset);
					}
				}



				/* Выполняет callback off */
				else if(offsetTop < offset && trigger == false) {
					trigger = true;
					if(data.off instanceof Function){
						data.off(box,offset);
					}
				}



			}



		});




		/* ############## */
		/* Add properites */
		/* ############## */


		if(isArray == true) {


			box = [];


			for(key in data){
				box.push({
					container: $(data[key].container),
					offset: data[key].offset,
					on: function(){
						data[key].on();
					},
					off: function(){
						data[key].off();
					}
				});
			}



		}
		else {


			box.callback = {};



			/* On callback property */
			if(data.on instanceof Function){
				box.callback.on = function(box, offset){
					data.on(box,offset);
				} 
			}



			/* Off callback property */
			if(data.off instanceof Function){
				box.callback.off = function(box, offset){
					data.off(box,offset);
				} 
			}


		}



		return box;



	}


})(jQuery);