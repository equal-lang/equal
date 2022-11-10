(()=>{var e={652:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(81),o=r.n(n),a=r(645),l=r.n(a)()(o());l.push([e.id,"body {\r\n  padding-left: 9vw;\r\n  padding-right: 9vw;\r\n\r\n}\r\n\r\ndiv.main {\r\n  display: grid;\r\n  grid-template-columns: 70% 30%;\r\n  /* change with js */\r\n  grid-template-rows: 10vh 85vh;\r\n  /* grid-template-rows: 10vh 45vh 40vh; */\r\n}\r\n\r\nh1.title {\r\n  grid-column: 1 / 3;\r\n  text-align: center;\r\n}\r\n\r\ndiv.code-editor, div.equal-viewer {\r\n  padding: 5px;\r\n  border: 1px black solid;\r\n}\r\n\r\n@media (max-width: 1101px) {\r\n  div.code-editor {\r\n    --toolbar-height: 50px;\r\n  }\r\n}\r\n\r\n@media (min-width: 1102px) {\r\n  div.code-editor {\r\n    --toolbar-height: 28px;\r\n  }\r\n}\r\n\r\ndiv.code-editor {\r\n  display: grid;\r\n  grid-template-rows: var(--toolbar-height) calc(100% - var(--toolbar-height));\r\n}\r\n\r\n.cm-editor {\r\n  max-height: 100%;\r\n}\r\n\r\ndiv.equal-viewer {\r\n  overflow: auto;\r\n}\r\n\r\ndiv.html-viewer {\r\n  grid-column: 1 / 3;\r\n}\r\n\r\niframe#html-rendered {\r\n  height: 100%;\r\n  width: 100%;\r\n   /* change with js */\r\n   display: none;\r\n   /* display: block; */\r\n}\r\n",""]);const i=l},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var l={};if(n)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(l[s]=!0)}for(var u=0;u<e.length;u++){var c=[].concat(e[u]);n&&l[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),r&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=r):c[2]=r),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),t.push(c))}},t}},81:e=>{"use strict";e.exports=function(e){return e[1]}},338:(e,t,r)=>{var n=r(202);e.exports=(n.default||n).template({1:function(e,t,r,n,o){return"*"},compiler:[8,">= 4.3.0"],main:function(e,t,r,n,o){var a,l,i=null!=t?t:e.nullContext||{},s=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<span id="file-name">'+e.escapeExpression("function"==typeof(l=null!=(l=s(r,"name")||(null!=t?s(t,"name"):t))?l:e.hooks.helperMissing)?l.call(i,{name:"name",hash:{},data:o,loc:{start:{line:1,column:21},end:{line:1,column:29}}}):l)+'</span><span id="file-saved">'+(null!=(a=s(r,"if").call(i,null!=t?s(t,"unsaved"):t,{name:"if",hash:{},fn:e.program(1,o,0),inverse:e.noop,data:o,loc:{start:{line:1,column:58},end:{line:1,column:81}}}))?a:"")+"</span>"},useData:!0})},623:(e,t,r)=>{var n=r(202);e.exports=(n.default||n).template({1:function(e,t,r,n,o){var a,l=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return null!=(a=l(r,"if").call(null!=t?t:e.nullContext||{},null!=t?l(t,"name"):t,{name:"if",hash:{},fn:e.program(2,o,0),inverse:e.noop,data:o,loc:{start:{line:2,column:0},end:{line:10,column:7}}}))?a:""},2:function(e,t,r,n,o){var a,l=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<button id="tool-'+e.escapeExpression(e.lambda(null!=t?l(t,"name"):t,t))+'">\r\n'+(null!=(a=l(r,"if").call(null!=t?t:e.nullContext||{},null!=t?l(t,"display"):t,{name:"if",hash:{},fn:e.program(3,o,0),inverse:e.program(5,o,0),data:o,loc:{start:{line:4,column:2},end:{line:8,column:9}}}))?a:"")+"</button>\r\n"},3:function(e,t,r,n,o){var a=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return"  "+e.escapeExpression(e.lambda(null!=t?a(t,"display"):t,t))+"\r\n"},5:function(e,t,r,n,o){var a=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return"  "+e.escapeExpression(e.lambda(null!=t?a(t,"name"):t,t))+"\r\n"},compiler:[8,">= 4.3.0"],main:function(e,t,r,n,o){var a,l=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return(null!=(a=l(r,"each").call(null!=t?t:e.nullContext||{},null!=t?l(t,"tools"):t,{name:"each",hash:{},fn:e.program(1,o,0),inverse:e.noop,data:o,loc:{start:{line:1,column:0},end:{line:11,column:9}}}))?a:"")+'<span id="toolbar-file"></span>'},useData:!0})},834:(e,t,r)=>{"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}t.__esModule=!0;var a=o(r(67)),l=n(r(558)),i=n(r(728)),s=o(r(392)),u=o(r(628)),c=n(r(982));function d(){var e=new a.HandlebarsEnvironment;return s.extend(e,a),e.SafeString=l.default,e.Exception=i.default,e.Utils=s,e.escapeExpression=s.escapeExpression,e.VM=u,e.template=function(t){return u.template(t,e)},e}var p=d();p.create=d,c.default(p),p.default=p,t.default=p,e.exports=t.default},67:(e,t,r)=>{"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.HandlebarsEnvironment=d;var o=r(392),a=n(r(728)),l=r(638),i=r(967),s=n(r(37)),u=r(293);t.VERSION="4.7.7",t.COMPILER_REVISION=8,t.LAST_COMPATIBLE_COMPILER_REVISION=7,t.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};var c="[object Object]";function d(e,t,r){this.helpers=e||{},this.partials=t||{},this.decorators=r||{},l.registerDefaultHelpers(this),i.registerDefaultDecorators(this)}d.prototype={constructor:d,logger:s.default,log:s.default.log,registerHelper:function(e,t){if(o.toString.call(e)===c){if(t)throw new a.default("Arg not supported with multiple helpers");o.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(o.toString.call(e)===c)o.extend(this.partials,e);else{if(void 0===t)throw new a.default('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if(o.toString.call(e)===c){if(t)throw new a.default("Arg not supported with multiple decorators");o.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]},resetLoggedPropertyAccesses:function(){u.resetLoggedProperties()}};var p=s.default.log;t.log=p,t.createFrame=o.createFrame,t.logger=s.default},967:(e,t,r)=>{"use strict";t.__esModule=!0,t.registerDefaultDecorators=function(e){o.default(e)};var n,o=(n=r(670))&&n.__esModule?n:{default:n}},670:(e,t,r)=>{"use strict";t.__esModule=!0;var n=r(392);t.default=function(e){e.registerDecorator("inline",(function(e,t,r,o){var a=e;return t.partials||(t.partials={},a=function(o,a){var l=r.partials;r.partials=n.extend({},l,t.partials);var i=e(o,a);return r.partials=l,i}),t.partials[o.args[0]]=o.fn,a}))},e.exports=t.default},728:(e,t)=>{"use strict";t.__esModule=!0;var r=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"];function n(e,t){var o=t&&t.loc,a=void 0,l=void 0,i=void 0,s=void 0;o&&(a=o.start.line,l=o.end.line,i=o.start.column,s=o.end.column,e+=" - "+a+":"+i);for(var u=Error.prototype.constructor.call(this,e),c=0;c<r.length;c++)this[r[c]]=u[r[c]];Error.captureStackTrace&&Error.captureStackTrace(this,n);try{o&&(this.lineNumber=a,this.endLineNumber=l,Object.defineProperty?(Object.defineProperty(this,"column",{value:i,enumerable:!0}),Object.defineProperty(this,"endColumn",{value:s,enumerable:!0})):(this.column=i,this.endColumn=s))}catch(e){}}n.prototype=new Error,t.default=n,e.exports=t.default},638:(e,t,r)=>{"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.registerDefaultHelpers=function(e){o.default(e),a.default(e),l.default(e),i.default(e),s.default(e),u.default(e),c.default(e)},t.moveHelperToHooks=function(e,t,r){e.helpers[t]&&(e.hooks[t]=e.helpers[t],r||delete e.helpers[t])};var o=n(r(342)),a=n(r(822)),l=n(r(905)),i=n(r(405)),s=n(r(702)),u=n(r(593)),c=n(r(978))},342:(e,t,r)=>{"use strict";t.__esModule=!0;var n=r(392);t.default=function(e){e.registerHelper("blockHelperMissing",(function(t,r){var o=r.inverse,a=r.fn;if(!0===t)return a(this);if(!1===t||null==t)return o(this);if(n.isArray(t))return t.length>0?(r.ids&&(r.ids=[r.name]),e.helpers.each(t,r)):o(this);if(r.data&&r.ids){var l=n.createFrame(r.data);l.contextPath=n.appendContextPath(r.data.contextPath,r.name),r={data:l}}return a(t,r)}))},e.exports=t.default},822:(e,t,r)=>{"use strict";t.__esModule=!0;var n,o=r(392),a=(n=r(728))&&n.__esModule?n:{default:n};t.default=function(e){e.registerHelper("each",(function(e,t){if(!t)throw new a.default("Must pass iterator to #each");var n,l=t.fn,i=t.inverse,s=0,u="",c=void 0,d=void 0;function p(t,r,n){c&&(c.key=t,c.index=r,c.first=0===r,c.last=!!n,d&&(c.contextPath=d+t)),u+=l(e[t],{data:c,blockParams:o.blockParams([e[t],t],[d+t,null])})}if(t.data&&t.ids&&(d=o.appendContextPath(t.data.contextPath,t.ids[0])+"."),o.isFunction(e)&&(e=e.call(this)),t.data&&(c=o.createFrame(t.data)),e&&"object"==typeof e)if(o.isArray(e))for(var f=e.length;s<f;s++)s in e&&p(s,s,s===e.length-1);else if(r.g.Symbol&&e[r.g.Symbol.iterator]){for(var h=[],m=e[r.g.Symbol.iterator](),v=m.next();!v.done;v=m.next())h.push(v.value);for(f=(e=h).length;s<f;s++)p(s,s,s===e.length-1)}else n=void 0,Object.keys(e).forEach((function(e){void 0!==n&&p(n,s-1),n=e,s++})),void 0!==n&&p(n,s-1,!0);return 0===s&&(u=i(this)),u}))},e.exports=t.default},905:(e,t,r)=>{"use strict";t.__esModule=!0;var n,o=(n=r(728))&&n.__esModule?n:{default:n};t.default=function(e){e.registerHelper("helperMissing",(function(){if(1!==arguments.length)throw new o.default('Missing helper: "'+arguments[arguments.length-1].name+'"')}))},e.exports=t.default},405:(e,t,r)=>{"use strict";t.__esModule=!0;var n,o=r(392),a=(n=r(728))&&n.__esModule?n:{default:n};t.default=function(e){e.registerHelper("if",(function(e,t){if(2!=arguments.length)throw new a.default("#if requires exactly one argument");return o.isFunction(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||o.isEmpty(e)?t.inverse(this):t.fn(this)})),e.registerHelper("unless",(function(t,r){if(2!=arguments.length)throw new a.default("#unless requires exactly one argument");return e.helpers.if.call(this,t,{fn:r.inverse,inverse:r.fn,hash:r.hash})}))},e.exports=t.default},702:(e,t)=>{"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("log",(function(){for(var t=[void 0],r=arguments[arguments.length-1],n=0;n<arguments.length-1;n++)t.push(arguments[n]);var o=1;null!=r.hash.level?o=r.hash.level:r.data&&null!=r.data.level&&(o=r.data.level),t[0]=o,e.log.apply(e,t)}))},e.exports=t.default},593:(e,t)=>{"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("lookup",(function(e,t,r){return e?r.lookupProperty(e,t):e}))},e.exports=t.default},978:(e,t,r)=>{"use strict";t.__esModule=!0;var n,o=r(392),a=(n=r(728))&&n.__esModule?n:{default:n};t.default=function(e){e.registerHelper("with",(function(e,t){if(2!=arguments.length)throw new a.default("#with requires exactly one argument");o.isFunction(e)&&(e=e.call(this));var r=t.fn;if(o.isEmpty(e))return t.inverse(this);var n=t.data;return t.data&&t.ids&&((n=o.createFrame(t.data)).contextPath=o.appendContextPath(t.data.contextPath,t.ids[0])),r(e,{data:n,blockParams:o.blockParams([e],[n&&n.contextPath])})}))},e.exports=t.default},572:(e,t,r)=>{"use strict";t.__esModule=!0,t.createNewLookupObject=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.extend.apply(void 0,[Object.create(null)].concat(t))};var n=r(392)},293:(e,t,r)=>{"use strict";t.__esModule=!0,t.createProtoAccessControl=function(e){var t=Object.create(null);t.constructor=!1,t.__defineGetter__=!1,t.__defineSetter__=!1,t.__lookupGetter__=!1;var r=Object.create(null);return r.__proto__=!1,{properties:{whitelist:n.createNewLookupObject(r,e.allowedProtoProperties),defaultValue:e.allowProtoPropertiesByDefault},methods:{whitelist:n.createNewLookupObject(t,e.allowedProtoMethods),defaultValue:e.allowProtoMethodsByDefault}}},t.resultIsAllowed=function(e,t,r){return function(e,t){return void 0!==e.whitelist[t]?!0===e.whitelist[t]:void 0!==e.defaultValue?e.defaultValue:(function(e){!0!==a[e]&&(a[e]=!0,o.log("error",'Handlebars: Access has been denied to resolve the property "'+e+'" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details'))}(t),!1)}("function"==typeof e?t.methods:t.properties,r)},t.resetLoggedProperties=function(){Object.keys(a).forEach((function(e){delete a[e]}))};var n=r(572),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(37)),a=Object.create(null)},5:(e,t)=>{"use strict";t.__esModule=!0,t.wrapHelper=function(e,t){return"function"!=typeof e?e:function(){return arguments[arguments.length-1]=t(arguments[arguments.length-1]),e.apply(this,arguments)}}},37:(e,t,r)=>{"use strict";t.__esModule=!0;var n=r(392),o={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var t=n.indexOf(o.methodMap,e.toLowerCase());e=t>=0?t:parseInt(e,10)}return e},log:function(e){if(e=o.lookupLevel(e),"undefined"!=typeof console&&o.lookupLevel(o.level)<=e){var t=o.methodMap[e];console[t]||(t="log");for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];console[t].apply(console,n)}}};t.default=o,e.exports=t.default},982:(e,t,r)=>{"use strict";t.__esModule=!0,t.default=function(e){var t=void 0!==r.g?r.g:window,n=t.Handlebars;e.noConflict=function(){return t.Handlebars===e&&(t.Handlebars=n),e}},e.exports=t.default},628:(e,t,r)=>{"use strict";t.__esModule=!0,t.checkRevision=function(e){var t=e&&e[0]||1,r=l.COMPILER_REVISION;if(!(t>=l.LAST_COMPATIBLE_COMPILER_REVISION&&t<=l.COMPILER_REVISION)){if(t<l.LAST_COMPATIBLE_COMPILER_REVISION){var n=l.REVISION_CHANGES[r],o=l.REVISION_CHANGES[t];throw new a.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+o+").")}throw new a.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}},t.template=function(e,t){if(!t)throw new a.default("No environment passed to template");if(!e||!e.main)throw new a.default("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var r=e.compiler&&7===e.compiler[0],n={strict:function(e,t,r){if(!e||!(t in e))throw new a.default('"'+t+'" not defined in '+e,{loc:r});return n.lookupProperty(e,t)},lookupProperty:function(e,t){var r=e[t];return null==r||Object.prototype.hasOwnProperty.call(e,t)||u.resultIsAllowed(r,n.protoAccessControl,t)?r:void 0},lookup:function(e,t){for(var r=e.length,o=0;o<r;o++)if(null!=(e[o]&&n.lookupProperty(e[o],t)))return e[o][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:o.escapeExpression,invokePartial:function(r,n,l){l.hash&&(n=o.extend({},n,l.hash),l.ids&&(l.ids[0]=!0)),r=t.VM.resolvePartial.call(this,r,n,l);var i=o.extend({},l,{hooks:this.hooks,protoAccessControl:this.protoAccessControl}),s=t.VM.invokePartial.call(this,r,n,i);if(null==s&&t.compile&&(l.partials[l.name]=t.compile(r,e.compilerOptions,t),s=l.partials[l.name](n,i)),null!=s){if(l.indent){for(var u=s.split("\n"),c=0,d=u.length;c<d&&(u[c]||c+1!==d);c++)u[c]=l.indent+u[c];s=u.join("\n")}return s}throw new a.default("The partial "+l.name+" could not be compiled when running in runtime-only mode")},fn:function(t){var r=e[t];return r.decorator=e[t+"_d"],r},programs:[],program:function(e,t,r,n,o){var a=this.programs[e],l=this.fn(e);return t||o||n||r?a=c(this,e,l,t,r,n,o):a||(a=this.programs[e]=c(this,e,l)),a},data:function(e,t){for(;e&&t--;)e=e._parent;return e},mergeIfNeeded:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=o.extend({},t,e)),r},nullContext:Object.seal({}),noop:t.VM.noop,compilerInfo:e.compiler};function l(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=r.data;l._setup(r),!r.partial&&e.useData&&(o=p(t,o));var a=void 0,i=e.useBlockParams?[]:void 0;function s(t){return""+e.main(n,t,n.helpers,n.partials,o,i,a)}return e.useDepths&&(a=r.depths?t!=r.depths[0]?[t].concat(r.depths):r.depths:[t]),(s=f(e.main,s,n,r.depths||[],o,i))(t,r)}return l.isTop=!0,l._setup=function(a){if(a.partial)n.protoAccessControl=a.protoAccessControl,n.helpers=a.helpers,n.partials=a.partials,n.decorators=a.decorators,n.hooks=a.hooks;else{var l=o.extend({},t.helpers,a.helpers);!function(e,t){Object.keys(e).forEach((function(r){var n=e[r];e[r]=function(e,t){var r=t.lookupProperty;return s.wrapHelper(e,(function(e){return o.extend({lookupProperty:r},e)}))}(n,t)}))}(l,n),n.helpers=l,e.usePartial&&(n.partials=n.mergeIfNeeded(a.partials,t.partials)),(e.usePartial||e.useDecorators)&&(n.decorators=o.extend({},t.decorators,a.decorators)),n.hooks={},n.protoAccessControl=u.createProtoAccessControl(a);var c=a.allowCallsToHelperMissing||r;i.moveHelperToHooks(n,"helperMissing",c),i.moveHelperToHooks(n,"blockHelperMissing",c)}},l._child=function(t,r,o,l){if(e.useBlockParams&&!o)throw new a.default("must pass block params");if(e.useDepths&&!l)throw new a.default("must pass parent depths");return c(n,t,e[t],r,0,o,l)},l},t.wrapProgram=c,t.resolvePartial=function(e,t,r){return e?e.call||r.name||(r.name=e,e=r.partials[e]):e="@partial-block"===r.name?r.data["partial-block"]:r.partials[r.name],e},t.invokePartial=function(e,t,r){var n=r.data&&r.data["partial-block"];r.partial=!0,r.ids&&(r.data.contextPath=r.ids[0]||r.data.contextPath);var i=void 0;if(r.fn&&r.fn!==d&&function(){r.data=l.createFrame(r.data);var e=r.fn;i=r.data["partial-block"]=function(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.data=l.createFrame(r.data),r.data["partial-block"]=n,e(t,r)},e.partials&&(r.partials=o.extend({},r.partials,e.partials))}(),void 0===e&&i&&(e=i),void 0===e)throw new a.default("The partial "+r.name+" could not be found");if(e instanceof Function)return e(t,r)},t.noop=d;var n,o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(392)),a=(n=r(728))&&n.__esModule?n:{default:n},l=r(67),i=r(638),s=r(5),u=r(293);function c(e,t,r,n,o,a,l){function i(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=l;return!l||t==l[0]||t===e.nullContext&&null===l[0]||(i=[t].concat(l)),r(e,t,e.helpers,e.partials,o.data||n,a&&[o.blockParams].concat(a),i)}return(i=f(r,i,e,l,n,a)).program=t,i.depth=l?l.length:0,i.blockParams=o||0,i}function d(){return""}function p(e,t){return t&&"root"in t||((t=t?l.createFrame(t):{}).root=e),t}function f(e,t,r,n,a,l){if(e.decorator){var i={};t=e.decorator(t,i,r,n&&n[0],a,l,n),o.extend(t,i)}return t}},558:(e,t)=>{"use strict";function r(e){this.string=e}t.__esModule=!0,r.prototype.toString=r.prototype.toHTML=function(){return""+this.string},t.default=r,e.exports=t.default},392:(e,t)=>{"use strict";t.__esModule=!0,t.extend=l,t.indexOf=function(e,t){for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1},t.escapeExpression=function(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}return o.test(e)?e.replace(n,a):e},t.isEmpty=function(e){return!e&&0!==e||!(!u(e)||0!==e.length)},t.createFrame=function(e){var t=l({},e);return t._parent=e,t},t.blockParams=function(e,t){return e.path=t,e},t.appendContextPath=function(e,t){return(e?e+".":"")+t};var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},n=/[&<>"'`=]/g,o=/[&<>"'`=]/;function a(e){return r[e]}function l(e){for(var t=1;t<arguments.length;t++)for(var r in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],r)&&(e[r]=arguments[t][r]);return e}var i=Object.prototype.toString;t.toString=i;var s=function(e){return"function"==typeof e};s(/x/)&&(t.isFunction=s=function(e){return"function"==typeof e&&"[object Function]"===i.call(e)}),t.isFunction=s;var u=Array.isArray||function(e){return!(!e||"object"!=typeof e)&&"[object Array]"===i.call(e)};t.isArray=u},202:(e,t,r)=>{e.exports=r(834).default},379:e=>{"use strict";var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var a={},l=[],i=0;i<e.length;i++){var s=e[i],u=n.base?s[0]+n.base:s[0],c=a[u]||0,d="".concat(u," ").concat(c);a[u]=c+1;var p=r(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(f);else{var h=o(f,n);n.byIndex=i,t.splice(i,0,{identifier:d,updater:h,references:1})}l.push(d)}return l}function o(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,o){var a=n(e=e||[],o=o||{});return function(e){e=e||[];for(var l=0;l<a.length;l++){var i=r(a[l]);t[i].references--}for(var s=n(e,o),u=0;u<a.length;u++){var c=r(a[u]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}a=s}}},569:e=>{"use strict";var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,r)=>{"use strict";e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,o&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0,(()=>{"use strict";var e=r(379),t=r.n(e),n=r(795),o=r.n(n),a=r(569),l=r.n(a),i=r(565),s=r.n(i),u=r(216),c=r.n(u),d=r(589),p=r.n(d),f=r(652),h={};h.styleTagTransform=p(),h.setAttributes=s(),h.insert=l().bind(null,"head"),h.domAPI=o(),h.insertStyleElement=c(),t()(f.Z,h),f.Z&&f.Z.locals&&f.Z.locals;var m=r(623),v=r.n(m),g=r(338),y=r.n(g);function w(e="Untitled",t=!0){document.getElementById("toolbar-file").innerHTML=y()({name:e,unsaved:t})}document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("toolbar").innerHTML=v()({tools:[{name:"new-file",display:"new-file"},{name:"open-file",display:"open-file"},{name:"save-file",display:"save"},{name:"save-file-as",display:"save-as"},{name:"run",display:"run"},{name:"verbose",display:"verbose"},{name:"clear-console",display:"clear-console"},{name:"html-viewer",display:"view-page"},{name:"html-refresh",display:"refresh-page"},{name:"help",display:"help"}]}),w();const e=b(),t="rgb(212, 245, 198)",r=_("tool-help");document.getElementById("tool-open-file").addEventListener("click",(()=>{window.showOpenFilePicker({types:[{description:"Equal Files",accept:{"text/plain":[".eq",".txt"],"text/html":[".html"]}}],excludeAcceptAllOption:!0,multiple:!1}).then((e=>e[0])).catch(E).then((t=>(e.setFileHandle(t),function(e){return e.getFile().then((e=>e.text()))}(t)))).then((e=>{var t;t=e,editor.editor.dispatch({changes:[{from:0,to:editor.editor.state.doc.length,insert:t}]})})).catch(E)})),document.getElementById("tool-save-file").addEventListener("click",(()=>{var t,r;void 0!==e.getFileHandle()&&(t=e,r=x(),t.getFileHandle().getFile().then((e=>{let n=!0;t.newVersion(e.lastModified)&&(n=confirm("A newer version of the currently open file exists, which will be overwritten by this operation. Proceed?")),n&&t.getFileHandle().createWritable().then((e=>(e.write(r),e))).then((e=>{e.close(),t.saved()})).catch(E)})))})),document.getElementById("tool-save-file-as").addEventListener("click",(()=>{console.log("sfa")})),document.getElementById("tool-run").addEventListener("click",(()=>{new Promise(((e,r)=>{let n=!1;_("tool-verbose")==t&&(n=!0),function(e,t=!1){new equal.Equal({mode:t?"VERBOSE":"NORMAL",source:e,output:e=>function(e,t="\n"){document.getElementById("console").innerText+=e+t}(e)}).run()}(x(),n),e(n),r()})).then((e=>{e&&console.debug("Finished running script")})).catch(E)})),document.getElementById("tool-verbose").addEventListener("click",(()=>{!function(e,t,r){_(e)==t?P(e,r):P(e,t)}("tool-verbose",t,r)})),document.getElementById("tool-clear-console").addEventListener("click",(()=>{document.getElementById("console").innerText=""})),document.getElementById("tool-html-viewer").addEventListener("click",(()=>{var e;!function(e){const t=window.getComputedStyle(document.getElementById("html-rendered"));return!("none"==t.display||"hidden"==t.visibility)}()?(P("tool-html-viewer",t),e=x(),document.getElementsByClassName("main")[0].style["grid-template-rows"]="10vh 45vh 40vh",document.getElementById("html-rendered").setAttribute("srcdoc",e),document.getElementById("html-rendered").style.display="block"):(P("tool-html-viewer",r),document.getElementsByClassName("main")[0].style["grid-template-rows"]="10vh 85vh",document.getElementById("html-rendered").style.display="none")})),document.getElementById("tool-help").addEventListener("click",(()=>{console.log("h")})),document.addEventListener("editor-change",(t=>{t.detail.docChanged&&e.notSaved()}))}));const b=function(){let e,t,r=!1;return{getFileHandle:()=>e,getUnsaved:()=>r,saved(e=0){r=!1,t=Date.now(),setTimeout(this.updateToolbarFile(),e)},notSaved(){r=!0,this.updateToolbarFile()},setFileHandle(t){e=t,this.saved(1e3)},newVersion:e=>e>t+1e3,updateToolbarFile(){w(e.name,r)}}};function x(){return editor.editor.viewState.state.doc.toString()}function _(e){return window.getComputedStyle(document.getElementById(e))["background-color"]}function P(e,t){document.getElementById(e).style["background-color"]=t}function E(e){console.error(e)}})()})();