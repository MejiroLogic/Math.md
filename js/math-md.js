MathJax.Hub.Config({
tex2jax:{skipTags: ["script","noscript","style","textarea","pre"]}
});MathJax.Hub.Configured();

function expandMathJaxKeyword (str) {
    return str
	.replace(/([^\\])\$((\\\$|[^$])*)\$/g,"$1`\\($2\\)`")
	.replace(/^\$((\\\$|[^\$])*)\$/g,"`\\($1\\)`").replace(/\\\$/g,"$")
	.replace(/```math((.|\n)*?)```/g,"`\\[$1\\]`");
}

function renderMarkdown(id,src){
    document.getElementById(id).innerHTML = marked(src);
}

function renderTeX(id){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);
}

function setDownloadURL(src,title){
  var html = "<!doctype html><html><head><title>"+title+"</title><script type=\"text/x-mathjax-config\">MathJax.Hub.Config({tex2jax:{skipTags: [\"script\",\"noscript\",\"style\",\"textarea\",\"pre\"]}});</script><script src=\"https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\"></script><style>table{border-collapse:collapse;}table th{border-style:solid;border-width:1px;border-color:Gray;}table td{border-style:solid;border-width:1px;border-color:Gray;}#title{text-align:center;padding:auto auto;}#author,#date{font-size:1.2em;text-align:right;text-decoration:underline;}blockquote{overflow:auto;background-color:#EEEEEE;}</style></head><body>" + marked(src) +"</body></html>";
  var a    = document.getElementById('save');
  var blob = new Blob([html],{"type" : "text/plain"}); 
  var url  = window.URL.createObjectURL(blob);
  a.href   = url;
  a.download = (title?title:"output")+".html";
}

window.onload = function (){
    var src    = "";
    var body   = document.forms.input.body.value;
    var title  = document.forms.input.title.value;
    var author = document.forms.input.author.value;
    var date   = document.forms.input.date.value;
    function preview() {
	if(   body   != (body   = document.forms.input.body.value)
	   || title  != (title  = document.forms.input.title.value)
	   || author != (author = document.forms.input.author.value)
	   || date   != (date   = document.forms.input.date.value))
	{
	    src = (title  ? "<h1 id=\"title\">" + title  + "</h1>\n" : "")+
                  (author ? "<p id=\"author\">" + author + "</p>\n"  : "")+
                  (date   ? "<p id=\"date\">"   + date   + "</p>\n"  : "")+
                  body;
            src = expandMathJaxKeyword(src);
            setDownloadURL(src,title);
	    renderMarkdown('preview',src);
	    renderTeX('preview');
	}
    }
    body+=" ";//force update at first;
    setInterval(preview,200);
};
