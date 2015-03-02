MathJax.Hub.Config({
tex2jax:{skipTags: ["script","noscript","style","textarea","pre"]}
});MathJax.Hub.Configured();

function expandMathJaxKeyword (str) {
    /*
     * % \sum_{k=1}^n f(k) % 
     *    => `\( \sum_{k=1}^n f(k) \)`
     *
     * ```math 
     * \sum_{k=1}^n f(k) 
     * ``` 
     *    => `\[ \sum_{k=1}^n f(k) \]`
     */
    return str
	.replace(/%((\\%|[^%])*)%/g,"`\\($1\\)`")
	.replace(/```math((.|\n)*?)```/g,"`\\[$1\\]`");
}

function renderMarkdown(id,src){
    /*
     * rendering markdown
     */
    var w = document.getElementById(id);
    w.innerHTML = src;
    w.innerHTML = marked(src);
}

function renderTeX(id){
    /* 
     * redering mathematical expression
     */
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);
}

window.onload = function (){
    var body = document.forms.input.body.value;
    function preview() {
	if(body!=document.forms.input.body.value){
	    body = document.forms.input.body.value;
	    renderMarkdown('preview',expandMathJaxKeyword(body));
	    renderTeX('preview');
	}
    }
    setInterval(preview,200);
};
