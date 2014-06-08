/*jshint devel: true*/
/*global TweenMax: true*/

/*
	- get the behaviour JSON data
	- run the main init fnc
	- get other JSON data asynchronously
		- add in the modules DOM content once JSON has been sucessfully obtained from each source



*/

$(document).ready(function(){

	var $m = {

		init: function(){

			$m.s.init();
			$m.json.init();
			$m.masonry();

		}, // end of init

		s: {

			dom: {}, // sore the DOM references

			state: {}, // store the module active state reference

			init: function(){

				$m.s.dom.hub = $('#hub');

			} // end of init

		}, // end of settings

		state: function($data){

			// loop through behaviour date
			// add the modules active state to the global setting object

			var $state = {},
				$len = $data.length,
				$i, $active, $module;

			for($i = 0; $i < $len; $i++){

				if($data[$i].active === 'true'){

					$active = true;

				}else{

					$active = false;

				} // end of statement
				
				$module = $data[$i].module;

				$state[$module] = $active; // add the active state to this module reference

			} // end of loop

			return $state;

		}, // end of active

		json: {

			init: function(){

				var $state = $m.s.state;

				// don't worry about the behavious fnc as it was already run initially
				if($state.stories){$m.json.stories();} // if the stories module is active get it's JSON data
				if($state.deals){$m.json.deals();} // if the deals module is active get it's JSON data
				if($state.expert || $state.chat || $state.fact || $state.inspire || $state.quiz || $state.stuffNation){$m.json.custom();} // if any of the custom modules are set to be active then get the custom JSON data

			}, // end of init

			behaviour: function(){

				$.getJSON('json/behaviour.json', function($data){

					$m.s.behaviour = $data; // store JSON data in the global settings
					
					$m.s.state = $m.state($data); // parse the JSON to find what modules are active
					$m.init(); // when the behavious data has been obtained run the main initialise function

				}).fail(function(){

					console.log('failed to get behaviour data');

					// sorry there was an error - we will redirect you back to our amazing travel content
					// our technitions have been notified and will fix the problem as soon as possible

				});

			}, // end of behavious

			stories: function(){

				console.log('get stories json');

				// var $url = '/_json/travel/destinations/australia?limit=20';
				// /api/hot/GetHottestDeals.json

				// http://noraesae.github.io/perfect-scrollbar/
				$('.priceList').perfectScrollbar();

			}, // end of stories

			deals: function(){

				console.log('get deals json');

				$.getJSON('http://www.houseoftravel.uat.hot.co.nz/webservice/retail/retail.svc/getdealfeed?filter=tophotdeals&take=5', function($data){

					$m.s.deals = $data; // store JSON data in the global settings
					
					$m.s.state = $m.state($data); // parse the JSON to find what modules are active

				}).fail(function(){

					console.log('failed to get deals data');

					// sorry there was an error - we will redirect you back to our amazing travel content
					// our technitions have been notified and will fix the problem as soon as possible

				});

			}, // end of deals

			custom: function(){

				console.log('get custom json');


			} // end of custom

		}, // end of json

		mod : {

			stories: function(){


			}, // end of init

		}, // end of mod

		masonry: function(){

			console.log('running masonry');

			$m.s.dom.hub.masonry({
				'columnWidth': 300,
				'itemSelector': '.module',
				'gutter': 20
			});

		} // end of masonry

	}; // end of $m

	(function(){

		$m.json.behaviour(); // get the behaviour adata before running the module creation process

	})(); // end of anonymous fnc

}); // end of document.ready
