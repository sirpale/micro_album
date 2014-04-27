function is(o){return typeof o}
is.s = function(o){return is(o) === "string"};
is.o = function(o){return is(o) === "object"};
is.b = function(o){return is(o) === "boolean"};
is.n = function(o){return is(o) === "number"};
is.f = function(o){return is(o) === "function"};
is.u = function(o){return o === undefined};
is.a = function(o){return o instanceof Array};
is.d = function(o){return o instanceof Date};
is.r = function(o){return o instanceof RegExp};
is.e = function(o){return is.node(o) && o.nodeType === 1};
is.ni = function(o){return is.n(o) && !(o % 1)};
is.nn = function(o){return is.ni(o) && o >= 0};
is.node = function(o){return o && is.n(o.nodeType)};
(function($){
"use strict";
var hexcase = 0;
var b64pad = "";
var chrsz = 8;

function hex_sha1(s) {
	return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
	return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
	return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
	return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
	return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
	return binb2str(core_hmac_sha1(key, data));
}

function core_sha1(x, len) {
	/* append padding */
	x[len >> 5] |= 0x80 << (24 - len % 32);
	x[((len + 64 >> 9) << 4) + 15] = len;

	var w = Array(80);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	var e = -1009589776;

	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		var olde = e;

		for (var j = 0; j < 80; j++) {
			if (j < 16) w[j] = x[i + j];
			else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
			var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
			e = d;
			d = c;
			c = rol(b, 30);
			b = a;
			a = t;
		}

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
		e = safe_add(e, olde);
	}
	return Array(a, b, c, d, e);

}

function sha1_ft(t, b, c, d) {
	if (t < 20) return (b & c) | ((~b) & d);
	if (t < 40) return b ^ c ^ d;
	if (t < 60) return (b & c) | (b & d) | (c & d);
	return b ^ c ^ d;
}

function sha1_kt(t) {
	return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}

function core_hmac_sha1(key, data) {
	var bkey = str2binb(key);
	if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

	var ipad = Array(16),
	opad = Array(16);
	for (var i = 0; i < 16; i++) {
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
	return core_sha1(opad.concat(hash), 512 + 160);
}

function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}


function rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

function str2binb(str) {
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
	return bin;
}

function binb2str(bin) {
	var str = "";
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode((bin[i >> 5] >>> (32 - chrsz - i % 32)) & mask);
	return str;
}

function binb2hex(binarray) {
	var hex_tab = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i++) {
		str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
	}
	return str;
}

function binb2b64(binarray) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
		for (var j = 0; j < 4; j++) {
			if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
		}
	}
	return str;
}

var hash = $.hash = {};


hash.hex_sha1 = hex_sha1;
hash.b64_sha1 = b64_sha1;
hash.str_sha1 = str_sha1;
hash.hex_hmac_sha1 = hex_hmac_sha1;
hash.b64_hmac_sha1 = b64_hmac_sha1;
hash.str_hmac_sha1 = str_hmac_sha1;


})(jtfx);

(function(
__arr,
__str,
__date
){
if(!is.f(__arr.filter)){
	__arr.filter = function(f, c){
		var _newArr = [];
		c = is.u(c) ? this : c;
		if(is.f(f)){
			for(var i = 0, l = this.length; i < l; i ++){
				if(f.call(c, this[i], i, this)){
					_newArr.push(this[i]);
				}
			}
		}
		return _newArr;
	};

	__arr.map = function(f, c){
		var _newArr = [];
		c = is.u(c) ? this : c;
		if(is.f(f)){
			for(var i = 0, l = this.length; i < l; i ++){
				_newArr.push(f.call(c, this[i], i, this));
			}
		}
		return _newArr;
	};
	
	__arr.some = function(f, c){
		var _newArr = [];
		c = is.u(c) ? this : c;
		if(is.f(f)){
			for(var i = 0, l = this.length; i < l; i ++){
				if(f.call(c, this[i], i, this)){
					_newArr.push(this[i]);
				}
			}
		}
		return _newArr;
	};

	__arr.forEach = function(f, c){
		c = is.u(c) ? this : c;
		if(is.f(f)){
			for(var i = 0, l = this.length; i < l; i ++){
				f.call(c, this[i], i, this);
			}
		}
	};

	__arr.every = function(f, c){
		c = is.u(c) ? this : c;
		if(is.f(f)){
			for(var i = 0, l = this.length; i < l; i ++){
				if(!f.call(c, this[i], i, this)){
					return false;
				}
			}
		}
		return true;
	};
	__arr.some = function(f, c){
		c = is.u(c) ? this : c;
		if(is.f(f)){
			for(var i = 0, l = this.length; i < l; i ++){
				if(f.call(c, this[i], i, this)){
					return true;
				}
			}
		}
		return false;
	};
	__arr.indexOf = function(c){
		for(var i = 0, l = this.length; i < l; i ++){
			if(this[i] === c){
				return i;
			}
		}
		return -1;
	};
}
var fn_each_unique = function(o){
	if(this.indexOf(o) === -1){
		this.push(o);
	}
};
__arr.unique = function(){
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
re_each_g = new RegExp(re_each.source, "g"),

concat = __arr.concat;

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


if(!is.f(__str.trim)){
	var re_trim = /^\s+|\s+$/g;
	__str.trim = function(){
		return this.replace(re_trim, "");
	};
}


__str.format = function(){return fo.apply(null, concat.apply([this], arguments))};
__str.tmpl = function(){return tp.apply(null, concat.apply([this], arguments))};
__str.run = function(){return run.apply(null, concat.apply([this], arguments))};

var re_byte_1 = /[\x00-\x7f]/g;
var re_byte_2 = /[\x80-\u07ff]/g;
var re_byte_3 = /[\u0800-\uffff]/g;

__str.byteLength = function(){
	return this.replace(re_byte_3, "___").replace(re_byte_2, "__").length;
};

/*
G	显示日期和时间。
Format(#12/31/2008 12:30:45#, "G") '2008-12-31 12:30:45

D	根据区域设置的长日期格式显示日期。
例如：

Format(#12/31/2008#, "D") '2008年12月31日

d	使用区域设置的短日期格式显示日期。
例如：

Format(#12/31/2008#, "d") '2008-12-31

T	使用区域设置的长时间格式显示时间，通常包括小时、分钟、秒。
例如：

Format(#12/31/2008 12:30:45#, "T") '12:30:45

t	使用区域设置的短时间格式显示时间。
例如：

Format(#12/31/2008 12:30:45#, "t") '12:30

f	根据您的区域设置格式显示长日期和短时间。
例如：

Format(#12/31/2008 12:30:45#, "f") '2008年12月31日 12:30

F	根据您的区域设置格式显示长日期和长时间。
例如：

Format(#12/31/2008 12:30:45#, "F") '2008年12月31日 12:30:45

g	根据您的区域设置格式显示短日期和短时间。
例如：

Format(#12/31/2008 12:30:45#, "g") '2008-12-31 12:30

M 或 m	显示日期的月份和天。
例如：

Format(#12/31/2008#, "m") '12月31日

Y 或 y	将日期格式化为年和月份。
例如：

Format(#12/31/2008#, "y") '2008年12月*/
var re_date = /(y{1,4})|(M{1,4})|(d{1,4})|(H{1,2})|(h{1,2})|(m{1,2})|(s{1,2})|(p)|(z)/g;
var arr_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var arr_day = ["Monday", "Tuesday", "Webdnesday", "Thursday", "Friday", "Saturday", "Sunday"];
__date.format = function(tp){
	if(is.s(tp)){
		switch(tp){
			default:
				var dt = this;
				return tp.replace(re_date, function(_, y, M, d, H, h, m, s, p, z){
					if(y){ return dt.getFullYear().toString().substr(y.length > 2 ? -4 : - Math.max(2, y.length)); }
					if(M){ return M.length > 2 ? arr_month[dt.getMonth()].substr(0, M.length === 3 ? 3 : 99) : (new Array(M.length).join("0") + (dt.getMonth() + 1)).substr(-2); }
					if(d){ return d.length > 2 ? arr_day[dt.getDay()].substr(0, d.length === 3 ? 3 : 99) : (new Array(d.length).join("0") + dt.getDate()).substr(-2); }
					if(H){ return (new Array(H.length).join("0") + dt.getHours()).substr(-2); }
					if(h){ return (new Array(h.length).join("0") + dt.getHours() % 12).substr(-2); }
					if(m){ return (new Array(m.length).join("0") + dt.getMinutes()).substr(-2); }
					if(s){ return (new Array(s.length).join("0") + dt.getSeconds()).substr(-2); }
					if(p){ return Math.floor(dt.getHours() / 12) ? "pm" : "am"; }
					if(z){ return "" - dt.getTimezoneOffset() / 60 ; }
					return _;
				});
			break;
		}
	}
	return this.toISOString();
};


var
re_dgt = /&(?:gt|#0*62);?/g,
re_dlt = /&(?:lt|#0*60);?/g,
re_dapos = /&(?:apos|#0*39);?/g,
re_dquot = /&(?:quot|#0*34);?/g,
re_damp = /&(?:amp|#0*38);?/g;

__str.decodeHTML = function(){
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

__str.encodeHTML = function(){
	return this
		.replace(re_amp, "&amp;")
		.replace(re_apos, "&apos;")
		.replace(re_quot, "&quot;")
		.replace(re_lt, "&lt;")
		.replace(re_gt, "&gt;");
};


function ETP(){}
var _etp = ETP.prototype;
_etp.on = function(type, listener, capture, count){
	if(!is.a(this._events)){this._events = [];}
	count = !is.n(count) ? Number.POSITIVE_INFINITY :
		(Math.floor(count) > 0 ? Math.floor(count) : 0);
	if(count && is.s(type) && type.trim() &&
		(is.f(listener) || is.o(listener))
	){
		this._events.push({
			type : type.trim(),
			capture : Boolean(capture),
			count : count,
			handle : listener
		});
	}
	return this;
};
var fn_filter_event_same = function(listener){
	return listener.type === this.type &&
		listener.capture === this.capture &&
		listener.handle === this.handle;
};
var fn_filter_event_type = function(listener){
	return listener.type === this.type &&
		listener.capture === this.capture;
};
var fn_each_event_remove = function(listener){
	var index = this.indexOf(listener);
	if(index > -1){
		this.splice(index, 1);
	}
};
var fn_each_event_exec = function(listener){
	listener.count --;
	if(is.f(listener.handle)){
		listener.handle.call(this);
	}
	else if(is.f(listener.handle.handleEvent)){
		listener.handle.handleEvent();
	}
	if(listener.count === 0){
		fn_each_event_remove.call(this._events, listener);
	}
};
_etp.un = function(type, listener, capture){
	if(is.a(this._events) && is.s(type) && type.trim() &&
		(is.f(listener) || is.o(listener))
	){
		this._events.filter(fn_filter_event_same, {
			type : type.trim(),
			capture : Boolean(capture),
			handle : listener
		}).forEach(fn_each_event_remove, this._events);
	}
	return this;
};
_etp.once = function(type, listener, capture){
	return this.on(type, listener, capture, 1);
};
_etp.dispatch = function(type, capture, args){
	var _ = this;
	if(is.a(this._events) && is.s(type) && type.trim()){
		this._events.filter(fn_filter_event_type, {
			type : type.trim(),
			capture : Boolean(capture)
		}).forEach(function(listener){
			listener.count --;
			if(is.f(listener.handle)){
				listener.handle.apply(_, args);
			}
			else if(is.f(listener.handle.handleEvent)){
				listener.handle.handleEvent.apply(listener.handle, args);
			}
			if(listener.count <= 0){
				fn_each_event_remove.call(_._events, listener);
			}
		});
	}
};

function EventEmitter(){}
EventEmitter.prototype.__proto__ = ETP.prototype;
"success complete error".split(" ").forEach(function(name){
	EventEmitter.prototype[name] = (function(n){
		return function(listener, capture){
			return this.once(n, listener, capture);
		};
	})(name);
});
EventEmitter.prototype.emit = function(type){
	var args = [];
	args.push.apply(args, arguments);
	return this.dispatch(type, false, args.splice(1));
};
window.EventEmitter = EventEmitter;
})(
Array.prototype,
String.prototype,
Date.prototype
);


function View(element){
	if(!(this instanceof View)){
		return new View(element);
	}
	this._view = is.e(element) ? element : document.createElement("div");
}
View.prototype.oncmd = function(){
	
};
View.prototype.uncmd = function(){
	
};



