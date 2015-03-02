MathJax.Hub.Config(
    tex2jax: {
	inlineMath: [['$','$'],['\\(','\\)']],
	processEnvironments: true
    }
});
MathJax.Hub.Configured();

$(function () {
    var $preview = document.getElementById('preview');
    function renderer($src) {
	$preview.innerHTML =
	    "<h1 style=\"text-align:center;\">" +$('#title').val() +"</h1>" +
	    "<p style=\"text-align:right;text-decoration:underline\">" +
	    $('#author').val()+"</p>" +
	    "<p style=\"text-align:right;text-decoration:underline\">" +
	    $('#date').val()+"</p>" + marked($src);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"preview"]);
    }
    function makePreview() {
	var $input = $('#body').val()
	    .replace(/\$([^_]+)_(.+)\$/g,"$$$1\\_$2$$")	
	    .replace(/\$([^<]+)<(.+)\$/g,"$$$1\\< $2$$")
	    .replace(/\$([^>]+)>(.+)\$/g,"$$$1\\> $2$$");
	setTimeout(renderer($input),150);
    }
    function dl_html(){
	var filename = $('#title').val()==""?"output.html":$('#title').val()+".html";
	var blob = new Blob([$preview.innerHTML],{"type" : "text/plain"});
	var URL = window.URL || window.webkitURL;
	$('a#dl_html').attr("download",filename);
	$('a#dl_html').attr("href",URL.createObjectURL(blob));
    }
    $('form').on('keyup',dl_html);
    $('form').on('keyup',makePreview);
});
