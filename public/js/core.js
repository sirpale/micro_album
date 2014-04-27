(function(w,d,n,s,ls,ce,ac,ol,oe,pt,ct,al,rl,undefined){"use strict";var
emf = Function[pt],
re_var = /^[_$a-z][$\w]*$/i,
re_ns_path = /^[_$a-z][$\w]*(?:\.[_$a-z][$\w]*)*$/i,
re_key = /{@(\w+(?:\.\w+)*)(\:\w+)?}/g,
re_each_start = /{\$each\s+@([_$\w]+(?:\.[_$\w]+)*)?}/,
re_each_end = /{\/\$each}/,
_arr_ = Array[pt],
_str_ = String[pt],
concat = _arr_.concat,
slice = _arr_.slice,
push = _arr_.push,
unshift = _arr_.unshift,
oc = Object.create,
dde = d.documentElement,
J="$",T=true,F=false;


function is(o){return typeof o}
function uuid(){return J + Math.random().toString(36).substr(2) + Date.now().toString(36)}
function o2a(obj){var a = [];for(var i = 0, l = obj[ls]; i < l; i ++){a.push(obj[i])}return a}
function cPush(cons, coll){try{push.apply(cons, coll)}catch(e){for(var i = 0, l = coll[ls]; i < l; i ++){push.call(cons, coll[i])}}}
function cUnshift(cons, coll){try{unshift.apply(cons, coll)}catch(e){for(var i = coll[ls]; i > 0; -- i){unshift.call(cons, coll[i])}}}

is.s = function(o){return is(o) === "string"};
is.o = function(o){return is(o) === "object"};
is.b = function(o){return is(o) === "boolean"};
is.n = function(o){return is(o) === "number"};
is.f = function(o){return is(o) === "function"};
is.u = function(o){return o === undefined};
is.a = function(o){return o instanceof Array};
is.d = function(o){return o instanceof Date};
is.e = function(o){return o instanceof Element};
is.r = function(o){return o instanceof RegExp};
is.w = function(o){return o instanceof w[ct]};
is.$ = function(o){return o instanceof $};
is.ni = function(o){return is.n(o) && !(o % 1)};
is.nn = function(o){return is.ni(o) && o >= 0};
is.node = function(o){return o && is.n(o.nodeType)};
is.nodeList = function(o){return o instanceof NodeList};

function Coll(){
	if(this[ct] !== Coll){ throw(new Error("Illegal constructor")) }
	var ag = arguments, l = ag[ls];
	if(l === 1 && is.nn(ag[0])){l = ag[0];while(l --){push.call(this, undefined)}}
	else{cPush(this, ag)}
}
Coll[pt] = [];
Coll[pt][ct] = Coll;
Coll[pt].unique = function(){var o = oc(this[ct][pt]);for(var i = 0, l = this[ls]; i < l; i ++){if(_arr_.indexOf.call(o, this[i]) === -1){_arr_.push.call(o, this[i])}}return o};
Coll[pt].concat = function(){var o = this.push.apply(oc(this[ct][pt]), this);for(var i = 0, l = arguments[ls]; i < l; i ++){if(is.nn(arguments[i][ls])){cPush(o, arguments[i])}else{_.push(arguments[i])}}return o};
Coll[pt].forEach = function(){_arr_.forEach.apply(this, arguments);return this};
Coll[pt].filter = function(){return this.push.apply(oc(this[ct][pt]), _arr_.filter.apply(this, arguments))};
Coll[pt].push = function(){cPush(this, arguments);return this};
Coll[pt].unshift = function(){cUnshift(this, arguments);return this};
Coll[pt].slice = function(){return this.push.apply(oc(this[ct][pt]), _arr_.slice.apply(this, arguments))};
Coll[pt].splice = function(){return this.push.apply(oc(this[ct][pt]), _arr_.splice.apply(this, arguments))};
Coll[pt].each = Coll[pt].forEach;
Coll[pt].add = Coll[pt].push;

/*
var os = new function(){
	var c = is.f(w["getComputedStyle"]) ? w["getComputedStyle"](dde) : dde.currentStyle, os = this;
	os.cssPrefix = os.prefix = "";
	os.webkit = os.moz = os.opera = os.msie = os.msafari = F;
	os.touchable = "ontouchstart" in dde;
	if("webkitTransform" in c){os.cssPrefix = "-webkit-";os.prefix = "webkit";os.webkit = T;os.msafari = is.b(n.standalone)}
	if("MozTransform" in c){os.cssPrefix = "-moz-";os.prefix = "moz";os.moz = T}
	if("OTransform" in c){os.cssPrefix = "-o-";os.prefix = "o";os.opera = T}
	if("msTransform" in c){os.cssPrefix = "-ms-";os.prefix = "ms";os.msie = T}
	os.propertyPrefix = os.prefix;
	var dpr = w.devicePixelRatio;
	os.dpr = is.n(dpr) ? dpr : 1;
};
*/

function $(s, c){
	if(!(is.$(this))){return new $(s, c)}
	if(is.node(s) || is.w(s)){this.push(s)}
	else if(is.a(s) || is.$(s)){cPush(this, s)}
	else if(is.o(s) && is.nn(s[ls])){cPush(this, s)}
	else if(is.s(s)){var q = "querySelectorAll";try{if(c){if(is.a(c) || is.$(c) || is.nodeList(c)){for(var i = 0, l = c[ls]; i < l; i ++){if(c[i] && is.f(c[i][q])){cPush(this, c[i][q](s))}}}
	else if(is.f(c[q])){cPush(this, c[q](s))}else{cPush(this, d[q](s))}}else{cPush(this, d[q](s))}}catch(e){var r;try{r = d.createRange();r.selectNode(d.head||d.body);r=r.createContextualFragment(s);}catch(e){r=d[ce]("div");r.innerHTML=s}cPush(this, r.childNodes);r=null}}
}
$[pt] = new Coll;
$[pt][ct] = $;

var re_t = /[^a-zA-Z]+/;
var bl_w3_ev = is.f(w["addEventListener"]);
var str_add = bl_w3_ev ? "addEventListener" : "attachEvent";
var str_remove = bl_w3_ev ? "removeEventListener" : "dettachEvent";

$[pt].on = function(type, handle, capture){
	if(is.s(type) && this.length){
		type = type.split(re_t);
		for(var i = 0; i < this.length; i ++){
			if(this[i] && this[i][str_add]){
				//console.log(str_add, type[i]);
				for(var j = 0; j < type.length; j ++){
					//console.log(str_add, type[j], this[i]);
					this[i][str_add]((bl_w3_ev ? "" : "on") + type[j], handle, capture);
				}
			}
		}
	}
	return this;
};
$[pt].un = function(type, handle, capture){
	if(is.s(type) && this.length){
		type = type.split(re_t);
		for(var i = 0; i < this.length; i ++){
			if(this[i] && is.f(this[i][str_remove])){
				for(var j = 0; j < type.length; j ++){
					this[i][str_remove]((bl_w3_ev ? "" : "on") + type[j], handle, capture);
				}
			}
		}
	}
	return this;
};



var fn = $[pt], _ = function(s, c){if(is.f(s)){var q = new $(d);if(d.readyState==="complete"){s.call(d)}else{c = function(e){s.call(d,e);q.un(e.type,c)};q.on("DOMContentLoaded",c)}return q}return new $(s, c)};
_.fn = fn;
_.extend = function(prop){if(prop && is.o(prop)){for(var n in prop){(n in fn) || (fn[n] = prop[n])}}};
_.is = is;
_.uuid = uuid;
_.emf = emf;
//_.os = os;
_.iColl = Coll;




function css(u, l, e, c, s, _e){s = d[ce]("link");s.type = "text/css";s.rel = "stylesheet";s.charset = c || "utf-8";if(ol in s){s[ol] = is(l) ? l : emf;s[oe] = is.f(e) ? e : emf;s.href = u;d.head[ac](s)}else{_e = function(){s.href = u;d.head[ac](s);l()};img(u,_e,_e)}return s}
function js(u, l, e, c, s){s = d[ce]("script");s.type = "text/javascript";s.charset = c || "utf-8";s[ol] = is.f(l) ? l : emf;s[oe] = is.f(e) ? e : emf;s.src = u;return d.head[ac](s)}
function img(u, l, e, c, s){var s = new Image;s[ol] = is.f(l) ? l : emf;s[oe] = is.f(e) ? e : emf;s.src = u;return s}
_.res = function(a, _l, _p){
	a = a || 0;
	_p = is.f(_p) ?_p : emf;
	_l = is.f(_l) ?_l : emf;
	return {
		load : function(){
			var ag = $(arguments), r = this;
			var s = f = i = 0, l = ag[ls];
			function fa(){_p.call(r, s, f, i, l);if(s + f + i >= l){_l.call(r, s, f, i, l)}}
			function es(){this[ol] = this[oe] = null;s ++;if(ag[ls] && !a){next()}fa()}
			function ef(){this[ol] = this[oe] = null;f ++;if(ag[ls] && !a){next()}fa()}
			function ha(c){switch(c[0]){case "js" : js.call(null, c[1], es, ef); break;case "css" : css.call(null, c[1], es, ef); break;case "img" : img.call(null, c[1], es, ef); break;default: i ++; break;}}
			function next(c){c = ag.shift();ha(c)}
			if(ag[ls]){if(a){ag.each(function(c){ha(c)})}else{next()}}
		}
	};
};
_.res.css = css;
_.res.js = js;
_.res.img = img;


/* extend */
var fn_each_unique = function(o){
	if(this.indexOf(o) === -1){
		this.push(o);
	}
};
_arr_.unique = function(){
	var _arr = [];
	this.forEach(fn_each_unique, _arr);
	return _arr;
};


var
re_key = /{@(\w+(?:\.\w+)*)(\:\w+)?}/g,
re_each_start = /{\$each\s+@([_$\w]+(?:\.[_$\w]+)*)?}/,
re_each_end = /{\/\$each}/,
re_each_tag = new RegExp(re_each_start.source + "|" + re_each_end.source, "g"),
re_each = new RegExp(re_each_start.source + "([\\s\\S]*?" + re_each_end.source + ")", ""),
re_each_g = new RegExp(re_each.source, "g");

function _fo(t, o){
	o=o||{};
	return t.replace(re_key, function(m, n, a){
		var _;
		try{
			var _=eval("o[\""+n.split(".").join("\"][\"")+"\"]");
		}
		catch(e){}
		return is.u(_)?m:_
	});
}
function fo(){
	var j = concat.apply([], arguments).slice(1),r = [];
	while(j.length){
		r.push(_fo(arguments[0], j.shift()))
	}
	return r.join("")
}


function _t_l(c, i){
	c.i = i;
	return c.d === this.valueOf();
}
function _t_p(c){
	return c.d === this.d - 1 && c.i < this.i && c.v === 0; 
}
function _t_f(c, i){
	var p = this.filter(_t_p, c).pop();
	if(p){
		p.t.unshift(this.splice(c.i, 1)[0]);
	}
}
function _t_j(d){
	return this.map(_t_m, d).join("");
}
function _t_m(c){
	if(c.v === 0){
		return is.a(this[c.x]) ? this[c.x].map(_t_j, c.t).join("") : "";
	}
	return _fo(c.t, this);
}

function tp(t){
	if(re_each.test(t)){
		var j = concat.apply([], arguments).slice(1),r = [];
		var _r = [], dep = 0, pos = 0, mdep = 0, midep = 0;
		t.replace(re_each_tag, function(m, n, i, t){
			if(n){
				_r.push({d:dep, t:t.substring(pos, i), v : 1});
				_r.push({d:dep, n:m, v:0, x : n, t : []});
				dep ++;
				pos = i + m.length;
				mdep = dep;
			}
			else{
				_r.push({t:t.substring(pos, i), d:dep, v : 2});
				pos = i + m.length;
				dep --;
				midep = Math.min(midep, dep);
			}
		});
		if(midep !== 0 || dep !== 0){
			console.log(new Error("Illegal Template."));
		return t}

		_r.push({t:t.substring(pos, t.length), s:j, d:0, v : 1});
		while(mdep){
			_r.filter(_t_l, mdep).reverse().forEach(_t_f, _r);
			mdep --;
		}

		return j.map(_t_j, _r).join("");
	}
	else{
		return fo.apply(null, arguments);
	}
}

var re_tmpl = /([\s\S]*?)(?:<%((?:\=|\$\/)?)([\s\S]*?)%>)/g;
var fn_var = function(){ return "_" + Math.random().toString(36).substr(2); };
function run(_t, data){
	var _data = [], v = {}, var_d = fn_var(), var_t = fn_var(), var_dt = fn_var();
	v.last = _t.replace(re_tmpl, function(m, s, t, c, i){
		v["s_" + i] = s;
		_data.push(var_d + ".push(" + var_t + ".s_" + i + ");");
		if(t === "="){
			_data.push(var_d + ".push(" + c.trim() + ");");
		}
		else{
			_data.push(c.trim());
		}
		return "";
	});
	//_data.unshift("var " + var_d + "=[]," + var_t + "=" + JSON.stringify(v) + ";");
	_data.unshift("with(" + var_dt + "){");
	_data.push("}return " + var_d + ".join('') + " + var_t + ".last;");
	try{
		return new Function(var_d, var_t, var_dt, _data.join("\n"))([], v, data);
	}
	catch(e){
		return _t;
	}
}

_str_.echo = function(){
	var _ = this.split("?");
	for(var i = 0, l = Math.min(_.length - 1, arguments.length); i < l; i ++){
		_[i] += arguments[i];
	}
	return _.join("");
};
_str_.format = function(){return fo.apply(null, concat.apply([this], arguments))};
_str_.tmpl = function(){return tp.apply(null, concat.apply([this], arguments))};
_str_.run = function(){return run.apply(null, concat.apply([this], arguments))};

var re_byte_1 = /[\x00-\x7f]/g;
var re_byte_2 = /[\x80-\u07ff]/g;
var re_byte_3 = /[\u0800-\uffff]/g;

_str_.byteLength = function(){
	return this.replace(re_byte_3, "___").replace(re_byte_2, "__").length;
};


var
re_dgt = /&(?:gt|#0*62);?/g,
re_dlt = /&(?:lt|#0*60);?/g,
re_dapos = /&(?:apos|#0*39);?/g,
re_dquot = /&(?:quot|#0*34);?/g,
re_damp = /&(?:amp|#0*38);?/g;

_str_.decodeHTML = function(){
	return this
		.replace(re_dapos, "'")
		.replace(re_dquot, '"')
		.replace(re_dlt, "<")
		.replace(re_dgt, ">")
		.replace(re_damp, "&");
};
var
re_gt = />/g,
re_lt = /</g,
re_apos = /'/g,
re_quot = /"/g,
re_amp = /&/g;

_str_.encodeHTML = function(){
	return this
		.replace(re_amp, "&amp;")
		.replace(re_apos, "&apos;")
		.replace(re_quot, "&quot;")
		.replace(re_lt, "&lt;")
		.replace(re_gt, "&gt;");
};



if(is.u(w.$)){w.$=_;}
else{w.$$$ = _;}
w.jtfx = _;

/*
if(!is.f(w.requestAnimationFrame)){
	var raf = function(cb){ this.call(null, Date.now()) };
	w.requestAnimationFrame = w[os.prefix + "RequestAnimationFrame"] || function(cb){return w.setTimeout(raf.bind(is.f(cb) ? cb : emf), 17)};
	w.cancelAnimationFrame = w[os.prefix + "CancelAnimationFrame"] || function(i){return w.clearTimeout(i)};
}
*/




/* request */
var fn_get_xhr = function(){
	try{
		return new XMLHttpRequest;
	}
	catch(e){
		return new ActiveXObject("Microsoft.XMLHttp");
	}
}
function Request(method, url, data, option){
	if(this.constructor !== Request){
		return new Request(method, url, option);
	}
	var _ = this;
	this.events = {};
	var eachHandle = function(handle, i){
		handle.call(xhr, this);
	};
	var xhr = fn_get_xhr();
	xhr.open(method, url, true);
	xhr.onload = function(e){
		switch(_.responseType){
			case "json" :
				try{
					_.emit("success", JSON.parse(xhr.response || xhr.responseText || xhr.responseXML));
				}
				catch(e){
					_.emit("error", e);
				}
			break;
			default:
				_.emit("success", xhr.response || xhr.responseText || xhr.responseXML);
			break;
		}

		if(is.a(_.events.complete)){
			_.emit("complete", xhr);
		}
	};
	xhr.onerror = function(e){
		_.emit("error", e);
		_.emit("complete", xhr);
	};
	setTimeout(function(){
		xhr.send(data);
	}, 5);
}

Request.prototype.responseType = "text";
Request.prototype.__proto__ = {
	success : function(cb){
		if(!is.a(this.events.success)){
			this.events.success = [];
		}
		if(is.f(cb)){
			this.events.success.push(cb);
		}
		return this;
	},
	error : function(cb){
		if(!is.a(this.events.error)){
			this.events.error = [];
		}
		if(is.f(cb)){
			this.events.error.push(cb);
		}
		return this;
	},
	complete : function(cb){
		if(!is.a(this.events.complete)){
			this.events.complete = [];
		}
		if(is.f(cb)){
			this.events.complete.push(cb);
		}
		return this;
	},
	emit : function(type){
		if(is.s("type") && type.trim()){
			if(is.a(this.events[type]) && this.events[type].length){
				var args = _arr_.concat.apply([], arguments).slice(1);
				this.events[type].forEach(function(handle){
					if(is.f(handle)){
						handle.apply(this, args);
					}
				}, this);
			}
		}
	}
};


_.xhr = function(method, url, data, option){
	return new Request(method, url, data, option);
};
_.get = function(url, option){
	return _.xhr("GET", url, null, option);
};
_.post = function(url, data, option){
	return _.xhr("POST", url, data, option);
};




})(window,document,navigator,screen,
"length","createElement","appendChild",
"onload","onerror","prototype","constructor");

(function(dde, is, $){


/* global data-cmd */

window.cmd_pool = {};
var dom_dde = document.documentElement;
var re_t = /[^a-zA-Z]+/;
var bl_w3_ev = is.f(window.addEventListener);
var str_add = bl_w3_ev ? "addEventListener" : "attachEvent";
var str_remove = bl_w3_ev ? "removeEventListener" : "dettachEvent";

var fn_each_oncmd = function(type){
	var _type, _cap, _name;

	if(!cmd_pool.hasOwnProperty(type)){
		_type = cmd_pool[type] = {};
	}
	else{
		_type = cmd_pool[type];
	}

	if(!_type.hasOwnProperty(this[3] && bl_w3_ev ? "capture" : "bubble")){
		_cap = cmd_pool[type][this[3] && bl_w3_ev ? "capture" : "bubble"] = {};

		$(dom_dde).on(type, fn_global_cmd, this[3] && bl_w3_ev);
	}
	else{
		_cap = cmd_pool[type][this[3] && bl_w3_ev ? "capture" : "bubble"];
	}
	if(!_cap.hasOwnProperty(this[1])){
		_name = _cap[this[1]] = [];
	}
	else{
		_name = _cap[this[1]];
	}
	_name.push(this[2]);
};

var fn_check_object_has_property = function(object){
	if(is.f(Object.keys)){ return Object.keys(object).length; }
	for(var n in object){ return true; }
	return false;
}
var fn_each_uncmd = function(type){
	var _type, _cap, _name;
	_type = cmd_pool[type];
	if(_type){
		_cap = _type[this[3] && bl_w3_ev ? "capture" : "bubble"];
		if(_cap){
			_name = _cap[this[1]];
			if(is.a(_name) && _name.indexOf(this[2]) > -1){
				_name.splice(_name.indexOf(this[2]), 1);
				if(_name.length === 0){
					delete _cap[this[1]];
					$(dom_dde).un(type, fn_global_cmd, this[3] && bl_w3_ev);
					if(!fn_check_object_has_property(_cap)){
						delete _type[this[3] && bl_w3_ev ? "capture" : "bubble"];
						if(!fn_check_object_has_property(_type)){
							delete cmd_pool[type];
						}
					}
				}
			}
		}
	}
};


$.oncmd = function(type, name, fn, cap){
	if(is.s(type) && is.s(name) && (is.f(fn) || is.o(fn))){
		type.split(re_t).forEach(fn_each_oncmd, arguments);
	}
};
$.uncmd = function(type, name, fn, cap){
	if(is.s(type) && is.s(name) && (is.f(fn) || is.o(fn))){
		type.split(re_t).forEach(fn_each_uncmd, arguments);
	}
};
var fn_some_cmd = function(t){
	var cmd = t.getAttribute("data-cmd");
	var handle = this._sourceTaget.$cmd_pool[this.type];
	if(is.o(handle)){
		handle = handle[this.eventPhase === 1 ? "capture" : "bubble"];
		if(is.o(handle)){
			handle = handle[cmd];
			if(is.a(handle)){
				return handle.some(function(fn){
					if(is.f(fn)){ return fn.call(t, this) }
					if(is.o(fn) && is.f(fn.handleEvent)){
						return fn.handleEvent.call(fn, this, t);
					}
				}, this);
			}
		}
	}
	return false;
};
var fn_global_cmd = function(e){
	var target = e.target || e.srcElement;
	var path = [];
	e._sourceTaget = this === window ? document : this;

	while(target !== e._sourceTaget){
		if(is.e(target) && is.s(target.getAttribute("data-cmd"))){
			path.push(target);
		}
		target = target.parentNode;
	}
	if(is.e(target) && is.s(target.getAttribute("data-cmd"))){
		path.push(target);
	}
	//console.log(path, e._sourceTaget, e.eventPhase);
	if(e.eventPhase === 1){
		path.reverse().some(fn_some_cmd, e);
	}
	else if(e.eventPhase === 3){
		path.some(fn_some_cmd, e);
	}
	else if(e.eventPhase === 2){
		path.some(fn_some_cmd, e);
	}
	else{
		path.some(fn_some_cmd, e);
	}
	delete e._sourceTaget;
};
/* global cmd end */


var fn_each_type_oncmd = function(type){
	var _type, _cap, _name, root = this[0];
	var cmd_pool = root.$cmd_pool;

	if(!cmd_pool.hasOwnProperty(type)){
		_type = cmd_pool[type] = {};
	}
	else{
		_type = cmd_pool[type];
	}

	if(!_type.hasOwnProperty(this[4] && bl_w3_ev ? "capture" : "bubble")){
		_cap = cmd_pool[type][this[4] && bl_w3_ev ? "capture" : "bubble"] = {};

		$(root).on(type, fn_global_cmd, this[4] && bl_w3_ev);
	}
	else{
		_cap = cmd_pool[type][this[4] && bl_w3_ev ? "capture" : "bubble"];
	}
	if(!_cap.hasOwnProperty(this[2])){
		_name = _cap[this[2]] = [];
	}
	else{
		_name = _cap[this[2]];
	}
	_name.push(this[3]);
};
var fn_each_type_uncmd = function(type){
	var _type, _cap, _name, root = this[0];
	var cmd_pool = root.$cmd_pool;
	_type = cmd_pool[type];
	if(_type){
		_cap = _type[this[4] && bl_w3_ev ? "capture" : "bubble"];
		if(_cap){
			_name = _cap[this[2]];
			if(is.a(_name) && _name.indexOf(this[3]) > -1){
				_name.splice(_name.indexOf(this[3]), 1);
				if(_name.length === 0){
					delete _cap[this[2]];
					$(root).un(type, fn_global_cmd, this[4] && bl_w3_ev);
					if(!fn_check_object_has_property(_cap)){
						delete _type[this[4] && bl_w3_ev ? "capture" : "bubble"];
						if(!fn_check_object_has_property(_type)){
							delete cmd_pool[type];
							if(!fn_check_object_has_property(cmd_pool)){
								delete root.$cmd_pool;
							}
						}
					}
				}
			}
		}
	}
};


var fn_each_root_oncmd = function(root){
	if(root[str_add]){
		root.$cmd_pool = root.$cmd_pool || {};
		this[0].split(re_t).forEach(fn_each_type_oncmd, Array.prototype.concat.apply([root], this));
	}
};
var fn_each_root_uncmd = function(root){
	if(root[str_remove] && root.$cmd_pool){
		this[0].split(re_t).forEach(fn_each_type_uncmd, Array.prototype.concat.apply([root], this));
	}
};


$.fn.oncmd = function(type, name, fn, cap){
	if(is.s(type) && is.s(name) && (is.f(fn) || is.o(fn))){
		this.forEach(fn_each_root_oncmd, arguments);
	}
	return this;
};
$.fn.uncmd = function(type, name, fn, cap){
	if(is.s(type) && is.s(name) && (is.f(fn) || is.o(fn))){
		type.split(re_t).forEach(fn_each_uncmd, arguments);
	}
	return this;
};



})(document.documentElement, jtfx.is, jtfx);


