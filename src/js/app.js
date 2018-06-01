var app = {

	init : function($body,current){
		this.$body = $body;
		this.$links = $body.find('a.link');
		this.$mlinks = $body.find('a.mlink');
		this.$menuLink = $body.find('a.menu');
		this.$menu = $body.find('nav.nav');
		this.$container = $body.find('section.container');
		this.menu = false;
		this.current = current;
		this.pan.load(current);
		app.listen();
	},

	listen : function(){
		this.$links.each(function(){
			var that = $(this);
			var pan = that.attr('href');
			that.on('click',function(e){
				e.preventDefault();
				app.pan.load(pan);
			})
		});
		this.$mlinks.each(function(){
			var that = $(this);
			var pan = that.attr('href');
			that.on('click',function(e){
				e.preventDefault();
				app.pan.load(pan);
				app.toggleMenu();
			})
		});
		this.$menuLink.on('click',function(e){
			e.preventDefault();
			app.toggleMenu();
		});
		this.$container.hammer().bind('swiperight',function(e){
			app.toggleMenu();
		});
		this.$container.hammer().bind('tap swipeleft',function(e){
			if(app.menu){
				app.toggleMenu();
			}
		});
	},

	toggleMenu : function(){
		app.menu = app.menu ? false : true;
		app.$menu.toggleClass('hidden');
	},

	pan : {

		load : function(pan){
			$('head').find('link.'+app.current).remove();
			app.$container.load("pans/"+pan+".html");
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr("href","css/pans/"+pan+".css").attr('class',pan));
			app.current = pan;
		}

	}

}

$(function(){
	app.init($('body'),"friends");
});