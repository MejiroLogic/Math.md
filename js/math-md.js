MathJax.Hub.Config({
    tex2jax: {
	inlineMath: [['$','$'],['\\(','\\)']],
	processEnvironments: true
    }
});
MathJax.Hub.Configured();
$(function () {
    function makePreview() {
	input = $('#input').val();
	$('#preview').html(input);
	$('#preview').html(function (i,v) {
	    return v.replace(/\$([^_]+)_(.+)\$/g,"$$$1\\_$2$$")
		.replace(/\$([^<]+)<(.+)\$/g,"$$$1\\< $2$$")
		.replace(/\$([^>]+)>(.+)\$/g,"$$$1\\> $2$$");});
	setTimeout(function() {
	    $('#preview').html(marked($('#preview').html()));
	    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"preview"]);
	},150);
    }
    $('#input').on('keyup',function(){makePreview();});
});
