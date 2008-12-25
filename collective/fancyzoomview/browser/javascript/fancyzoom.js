jQuery.fn.fancyZoom = function(options){

  var options   = options || {};
  var directory = options && options.directory ? options.directory : '++resource++collective.fancyzoomview.images';
  var zooming   = false;

  if (jq('#zoom').length == 0) {
    var ext = jq.browser.msie ? 'gif' : 'png';
    var html = '<div id="zoom" style="display:none; z-index: 999;"> \
                  <table id="zoom_table" style="border-collapse:collapse; width:100%; height:100%;"> \
                    <tbody> \
                      <tr> \
                        <td class="tl" style="background:url(' + directory + '/tl.' + ext + ') 0 0 no-repeat; width:20px; height:20px; overflow:hidden;" /> \
                        <td class="tm" style="background:url(' + directory + '/tm.' + ext + ') 0 0 repeat-x; height:20px; overflow:hidden;" /> \
                        <td class="tr" style="background:url(' + directory + '/tr.' + ext + ') 100% 0 no-repeat; width:20px; height:20px; overflow:hidden;" /> \
                      </tr> \
                      <tr> \
                        <td class="ml" style="background:url(' + directory + '/ml.' + ext + ') 0 0 repeat-y; width:20px; overflow:hidden;" /> \
                        <td class="mm" style="background:#fff; vertical-align:top; padding:10px;"> \
                          <div id="zoom_content"> \
                          </div> \
                        </td> \
                        <td class="mr" style="background:url(' + directory + '/mr.' + ext + ') 100% 0 repeat-y;  width:20px; overflow:hidden;" /> \
                      </tr> \
                      <tr> \
                        <td class="bl" style="background:url(' + directory + '/bl.' + ext + ') 0 100% no-repeat; width:20px; height:20px; overflow:hidden;" /> \
                        <td class="bm" style="background:url(' + directory + '/bm.' + ext + ') 0 100% repeat-x; height:20px; overflow:hidden;" /> \
                        <td class="br" style="background:url(' + directory + '/br.' + ext + ') 100% 100% no-repeat; width:20px; height:20px; overflow:hidden;" /> \
                      </tr> \
                    </tbody> \
                  </table> \
                  <a href="#" title="Close" id="zoom_close" style="position:absolute; top:0; left:0;"> \
                    <img src="' + directory + '/closebox.' + ext + '" alt="Close" style="border:none; margin:0; padding:0;" /> \
                  </a> \
                </div>';

    jq('body').append(html);

    jq('html').click(function(e){if(jq(e.target).parents('#zoom:visible').length == 0) hide();});
    jq(document).keyup(function(event){
        if (event.keyCode == 27 && jq('#zoom:visible').length > 0) hide();
    });

    jq('#zoom_close').click(hide);
  }

  var zoom          = jq('#zoom');
  var zoom_table    = jq('#zoom_table');
  var zoom_close    = jq('#zoom_close');
  var zoom_content  = jq('#zoom_content');
  var middle_row    = jq('td.ml,td.mm,td.mr');

  this.each(function(i) {
    jq(jq(this).attr('href')).hide();
    jq(this).click(show);
  });

  return this;

  function show(e) {
    if (zooming) return false;
		zooming         = true;
		var content_div = jq(jq(this).attr('href'));
  	var zoom_width  = options.width;
		var zoom_height = options.height;

		var width       = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
  	var height      = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
  	var x           = window.pageXOffset || (window.document.documentElement.scrollLeft || window.document.body.scrollLeft);
  	var y           = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop);
  	var window_size = {'width':width, 'height':height, 'x':x, 'y':y}

		var width              = (zoom_width || content_div.width()) + 60;
		var height             = (zoom_height || content_div.height()) + 60;
		var d                  = window_size;

		// ensure that newTop is at least 0 so it doesn't hide close button
		var newTop             = Math.max((d.height/2) - (height/2) + y, 0);
		var newLeft            = (d.width/2) - (width/2);
		var curTop             = e.pageY;
		var curLeft            = e.pageX;

		zoom_close.attr('curTop', curTop);
		zoom_close.attr('curLeft', curLeft);
		zoom_close.attr('scaleImg', options.scaleImg ? 'true' : 'false');

    jq('#zoom').hide().css({
			position	: 'absolute',
			top				: curTop + 'px',
			left			: curLeft + 'px',
			width     : '1px',
			height    : '1px'
		});

    fixBackgroundsForIE();
    zoom_close.hide();

    if (options.closeOnClick) {
      jq('#zoom').click(hide);
    }

		if (options.scaleImg) {
  		zoom_content.html(content_div.html());
  		jq('#zoom_content img').css('width', '100%');
		} else {
		  zoom_content.html('');
		}

    jq('#zoom').animate({
      top     : newTop + 'px',
      left    : newLeft + 'px',
      opacity : "show",
      width   : width,
      height  : height
    }, 500, null, function() {
      if (options.scaleImg != true) {
    		zoom_content.html(content_div.html());
  		}
			unfixBackgroundsForIE();
			zoom_close.show();
			zooming = false;
    })
    return false;
  }

  function hide() {
    if (zooming) return false;
		zooming         = true;
	  jq('#zoom').unbind('click');
		fixBackgroundsForIE();
		if (zoom_close.attr('scaleImg') != 'true') {
  		zoom_content.html('');
		}
		zoom_close.hide();
		jq('#zoom').animate({
      top     : zoom_close.attr('curTop') + 'px',
      left    : zoom_close.attr('curLeft') + 'px',
      opacity : "hide",
      width   : '1px',
      height  : '1px'
    }, 500, null, function() {
      if (zoom_close.attr('scaleImg') == 'true') {
    		zoom_content.html('');
  		}
      unfixBackgroundsForIE();
			zooming = false;
    });
    return false;
  }

  function switchBackgroundImagesTo(to) {
    jq('#zoom_table td').each(function(i) {
      var bg = jq(this).css('background-image').replace(/\.(png|gif|none)\"\)jq/, '.' + to + '")');
      jq(this).css('background-image', bg);
    });
    var close_img = zoom_close.children('img');
    var new_img = close_img.attr('src').replace(/\.(png|gif|none)jq/, '.' + to);
    close_img.attr('src', new_img);
  }

  function fixBackgroundsForIE() {
    if (jq.browser.msie && parseFloat(jq.browser.version) >= 7) {
      switchBackgroundImagesTo('gif');
    }
	}

  function unfixBackgroundsForIE() {
    if (jq.browser.msie && jq.browser.version >= 7) {
      switchBackgroundImagesTo('png');
    }
	}
}