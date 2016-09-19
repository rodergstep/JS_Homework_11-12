// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();


// Demo data.
$(function(){

  var dataObject = {
    data:[
    {title:"Pavlo Zibrov", content:"The Head of Poland Railway"},
    {title:"Хочу вчити фронтенд, тому що:", content:"Мрію зголити вуса і відростити бороду"},
    {title:'Мій контактний телефон:', content:"+380977777777"},
    {title:'Мій профіль у facebook:', content:"www.facebook.com/pavlozibrov57"},
    {title:"My feedback:", content:"Please, don't listen my song."}
    ]
  }; // -> End of dataObject

  var results = document.getElementById("results");
  results.innerHTML = tmpl("item_tmpl", dataObject);

});

