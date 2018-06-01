var app = {

	icons : {
		amis : '<i class="fas fa-plus"></i>',
		classement : '<i class="fas fa-filter"></i>'
	},

	init : function($body,current){
		this.$body = $body;
		this.$header = $body.find('header.header');
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
			app.$container.hide();
			$('head').find('link.'+app.current).remove();
			$('a.alink').remove();
			app.$container.load("pans/"+pan+".html",function(){
				app.pan.listen();
			});
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr("href","css/pans/"+pan+".css").attr('class',pan));
			if(typeof(app.icons[pan])=="string"){
				$('<a/>',{class:'alink',href:'#'}).append(app.icons[pan]).appendTo(app.$header).on('click',function(e){
					e.preventDefault();
					$('#modal').toggleClass('hidden');
				});
			}
			app.$container.show();
			app.current = pan;
		},

		listen : function(){
			app.$container.find('a').each(function(){
				var that = $(this);
				var pan = that.attr('href');
				that.on('click',function(e){
					e.preventDefault();
					app.pan.load(pan);
				})
			});
		}

	}

}

$(function(){
	app.init($('body'),"amis");
});