/*jshint devel: true*/
/*global TweenMax: true*/

$(document).ready(function(){

	var $m = {

		init: function(){

			$m.s.init();
			$m.masonry();
			$m.json.init();

		}, // end of init

		s: {

			dom: {},


			init: function(){

				$m.s.dom.hub = $('#hub');

			} // end of init

		}, // end of settings

		json: {

			init: function(){

				$m.json.stories();

			}, // end of init

			stories: function(){

				// var $url = '/_json/travel/destinations/australia?limit=20';
				// /api/hot/GetHottestDeals.json

				// http://noraesae.github.io/perfect-scrollbar/
				$('.priceList').perfectScrollbar();

			} // end of headlines

		}, // end of json

		insert: {

			stories: function($json){

				console.log($json);

			} // end of stories

		}, // end of insert

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

		$m.init();

	})(); // end of anonymous fnc

}); // end of document.ready
