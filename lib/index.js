module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(56)('wks');
var uid = __webpack_require__(40);
var Symbol = __webpack_require__(13).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var core = __webpack_require__(1);
var ctx = __webpack_require__(39);
var hide = __webpack_require__(22);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = (typeof Symbol!=='undefined' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol!=='undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};


var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vert|word|writing|x)[A-Z]/;


var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process==='undefined' || !process.env || "production"!=='production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() { return null; }



// make react think we're react.
var VNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function() { return this.nodeName; },
	set: function(v) { this.nodeName = v; },
	configurable:true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function() { return this.attributes; },
	set: function(v) { this.attributes = v; },
	configurable:true
});



var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) { e = oldEventHook(e); }
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};


var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
			attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag==='function') {
			if (tag[COMPONENT_WRAPPER_KEY]===true || (tag.prototype && 'isReactComponent' in tag.prototype)) {
				if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
				if (vnode.children) { attrs.children = vnode.children; }

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		}
		else {
			if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
			if (vnode.children) { attrs.children = vnode.children; }

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value!==0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) { oldVnodeHook(vnode); }
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
		a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) { extend(vnode.attributes, tag.defaultProps); }
	if (a) { extend(vnode.attributes, a); }
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) { if ((shouldSanitize = CAMEL_PROPS.test(i))) { break; } }
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[ CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i ] = a[i];
				}
			}
		}
	}
}



// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode!==parent) { prev = null; }

	// default to first Element child
	if (!prev) { prev = parent.children[0]; }

	// remove unaffected siblings
	for (var i=parent.childNodes.length; i--; ) {
		if (parent.childNodes[i]!==prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) { parent._preactCompatRendered = out && (out._component || { base: out }); }
	if (typeof callback==='function') { callback(); }
	return out && out._component || out;
}


var ContextProvider = function () {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var c = render$1(wrap, container);
	if (callback) { callback(c); }
	return c._component || c.base;
}


function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode===container) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}



var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		return children.map(fn);
	},
	forEach: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		children.forEach(fn);
	},
	count: function(children) {
		return children && children.length || 0;
	},
	only: function(children) {
		children = Children.toArray(children);
		if (children.length!==1) { throw new Error('Children.only() expects only one child.'); }
		return children[0];
	},
	toArray: function(children) {
		if (children == null) { return []; }
		return Array.isArray && Array.isArray(children) ? children : ARR.concat(children);
	}
};


/** Track current render() component for ref assignment */
var currentComponent;


function createFactory(type) {
	return createElement.bind(null, type);
}


var DOM = {};
for (var i=ELEMENTS.length; i--; ) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i=offset || 0; i<arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		}
		else if (obj && typeof obj==='object' && !isValidElement(obj) && ((obj.props && obj.type) || (obj.attributes && obj.nodeName) || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c==='function' && !(c.prototype && c.prototype.render);
}


// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function() {
			return WrappedComponent(this.props, this.context);
		}
	});
}


function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) { return Wrapped===true ? Ctor : Wrapped; }

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable:true, value:true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable:true, value:Wrapped });

	return Wrapped;
}


function createElement() {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}


function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
		type = ref && typeof ref;
	if (currentComponent && (type==='string' || type==='number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}


function cloneElement$1(element, props) {
	var children = [], len = arguments.length - 2;
	while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

	if (!isValidElement(element)) { return element; }
	var elementProps = element.attributes || element.props;
	var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(
		element.nodeName || element.type,
		elementProps,
		element.children || elementProps && elementProps.children
	);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	}
	else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}


function isValidElement(element) {
	return element && ((element instanceof VNode) || element.$$typeof===REACT_ELEMENT_TYPE);
}


function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved===null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}


function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName!=='string') { return; }
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName==='textarea' || (nodeName.toLowerCase()==='input' && !/^fil|che|rad/i.test(attributes.type)))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}


function applyClassName(ref) {
	var attributes = ref.attributes;

	if (!attributes) { return; }
	var cl = attributes.className || attributes.class;
	if (cl) { attributes.className = cl; }
}


function extend(base, props) {
	for (var key in props) {
		if (props.hasOwnProperty(key)) {
			base[key] = props[key];
		}
	}
	return base;
}


function shallowDiffers(a, b) {
	for (var i in a) { if (!(i in b)) { return true; } }
	for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
	return false;
}


function findDOMNode(component) {
	return component && component.base || component;
}


function F(){}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps();
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}


// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i=0; i<mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key]==='function') {
				(keyed[key] || (keyed[key]=[])).push(mixin[key]);
			}
		}
	}
	return keyed;
}


// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) { if (mixins.hasOwnProperty(key)) {
		proto[key] = multihook(
			mixins[key].concat(proto[key] || ARR),
			key==='getDefaultProps' || key==='getInitialState' || key==='getChildContext'
		);
	} }
}


function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v==='function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}


function callMethod(ctx, m, args) {
	if (typeof m==='string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m==='function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function() {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i=0; i<hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r!=null) {
				if (!ret) { ret = {}; }
				for (var key in r) { if (r.hasOwnProperty(key)) {
					ret[key] = r[key];
				} }
			}
			else if (typeof r!=='undefined') { ret = r; }
		}
		return ret;
	};
}


function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}


function propsHook(props, context) {
	if (!props) { return; }

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length===1) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children==='object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this==='function' ? this : this.constructor,
			propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}


function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent===this) {
		currentComponent = null;
	}
}



function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts!==BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function() {
		return this.base;
	},

	isMounted: function() {
		return !!this.base;
	}
});



function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function(props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};



var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=preact-compat.es.js.map


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(7), __webpack_require__(4), __webpack_require__(26), __webpack_require__(12), __webpack_require__(10), __webpack_require__(65), __webpack_require__(64), __webpack_require__(11), __webpack_require__(46), __webpack_require__(0), __webpack_require__(231), __webpack_require__(69), __webpack_require__(42), __webpack_require__(251)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/array/from'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/symbol/iterator'), require('babel-runtime/core-js/symbol'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/core-js/json/stringify'), require('preact'), require('raven-js'), require('../components/utils/array'), require('object-loops/map'), require('script-loader!../../node_modules/wpt/wpt.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.defineProperty, global.assign, global.from, global.setPrototypeOf, global.create, global.iterator, global.symbol, global.getPrototypeOf, global.stringify, global.preact, global.ravenJs, global.array, global.map, global.wpt);
    global.index = mod.exports;
  }
})(this, function (module, exports, _defineProperty2, _assign, _from, _setPrototypeOf, _create, _iterator, _symbol, _getPrototypeOf, _stringify, _preact, _ravenJs, _array, _map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _assign2 = _interopRequireDefault(_assign);

  var _from2 = _interopRequireDefault(_from);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _iterator2 = _interopRequireDefault(_iterator);

  var _symbol2 = _interopRequireDefault(_symbol);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _ravenJs2 = _interopRequireDefault(_ravenJs);

  var _map2 = _interopRequireDefault(_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      (0, _defineProperty3.default)(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty3.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return (0, _from2.default)(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
  };

  var RavenTracker = _ravenJs2.default.config('https://6e3dc0335efc49889187ec90288a84fd@sentry.io/109946');

  //TODO change Woopra to export properly, commonjs style
  //This is necessary because of the horrible way that woopra loads its trackers to the global context
  //This is actuall a less horrible way,
  //because the original way expects the tracker names to be inside of a global list with name __woo

  //this is necessary because woopra will load a script
  //that updates a key in window which has the name which is passed to WoopraTracker
  var trackerName = "onfidojssdkwoopra";

  var woopra = new window.WoopraTracker(trackerName);

  var setUp = function setUp() {
    woopra.init();

    // configure tracker
    woopra.config({
      domain: "onfido-js-sdk.com",
      cookie_name: 'onfido-js-sdk-woopra',
      cookie_domain: location.hostname,
      referer: location.href
    });

    woopra.identify({
      sdk_version: "1.1.0",
      client: window.location.hostname
    });

    _ravenJs2.default.TraceKit.collectWindowErrors = true; //TODO scope exceptions to sdk code only
  };

  var track = function track() {
    woopra.track();
    RavenTracker.install();
  };

  var formatProperties = function formatProperties(properties) {
    return (0, _map2.default)(properties, function (value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? (0, _stringify2.default)(value) : value;
    });
  };

  var sendEvent = function sendEvent(eventName, properties) {
    return woopra.track(eventName, formatProperties(properties));
  };

  var screeNameHierarchyFormat = function screeNameHierarchyFormat(screeNameHierarchy) {
    return 'screen_' + (0, _array.cleanFalsy)(screeNameHierarchy).join('_');
  };

  var sendScreen = function sendScreen(screeNameHierarchy, properties) {
    return sendEvent(screeNameHierarchyFormat(screeNameHierarchy), properties);
  };

  var appendToTracking = function appendToTracking(Acomponent, ancestorScreeNameHierarchy) {
    return function (_Component) {
      _inherits(_class2, _Component);

      function _class2() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.trackScreen = function (screenNameHierarchy) {
          var _this$props;

          for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            others[_key2 - 1] = arguments[_key2];
          }

          return (_this$props = _this.props).trackScreen.apply(_this$props, [[].concat(_toConsumableArray((0, _array.wrapArray)(ancestorScreeNameHierarchy)), _toConsumableArray((0, _array.wrapArray)(screenNameHierarchy)))].concat(others));
        }, _this.render = function () {
          return (0, _preact.h)(Acomponent, _extends({}, _this.props, { trackScreen: _this.trackScreen }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      return _class2;
    }(_preact.Component);
  };

  var trackComponent = function trackComponent(Acomponent, screenName) {
    return function (_Component2) {
      _inherits(_class4, _Component2);

      function _class4() {
        var _ref2;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, _class4);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = _class4.__proto__ || (0, _getPrototypeOf2.default)(_class4)).call.apply(_ref2, [this].concat(args))), _this2), _this2.render = function () {
          return (0, _preact.h)(Acomponent, _this2.props);
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
      }

      _createClass(_class4, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.props.trackScreen(screenName);
        }
      }]);

      return _class4;
    }(_preact.Component);
  };

  var trackComponentMode = function trackComponentMode(Acomponent, propKey) {
    return function (_Component3) {
      _inherits(_class6, _Component3);

      function _class6() {
        var _ref3;

        var _temp3, _this3, _ret3;

        _classCallCheck(this, _class6);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = _class6.__proto__ || (0, _getPrototypeOf2.default)(_class6)).call.apply(_ref3, [this].concat(args))), _this3), _this3.render = function () {
          return (0, _preact.h)(Acomponent, _this3.props);
        }, _temp3), _possibleConstructorReturn(_this3, _ret3);
      }

      _createClass(_class6, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.trackScreen(this.props);
        }
      }, {
        key: 'trackScreen',
        value: function trackScreen(props) {
          var _props;

          var propValue = props[propKey];
          var params = propValue ? [propKey, _defineProperty({}, propKey, propValue)] : [];
          (_props = this.props).trackScreen.apply(_props, params);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (this.props[propKey] !== nextProps[propKey]) {
            this.trackScreen(nextProps);
          }
        }
      }]);

      return _class6;
    }(_preact.Component);
  };

  var trackComponentAndMode = function trackComponentAndMode(Acomponent, screenName, propKey) {
    return appendToTracking(trackComponentMode(Acomponent, propKey), screenName);
  };

  var sendError = function sendError(message, extra) {
    RavenTracker.captureException(new Error(message), {
      extra: extra
    });
  };

  exports.default = { setUp: setUp, track: track, sendError: sendError, sendEvent: sendEvent, sendScreen: sendScreen, trackComponent: trackComponent, trackComponentAndMode: trackComponentAndMode, appendToTracking: appendToTracking };
  module.exports = exports['default'];
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(79);
var toPrimitive = __webpack_require__(59);
var dP = Object.defineProperty;

exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(17)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(48);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(198);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(38), __webpack_require__(37), __webpack_require__(223), __webpack_require__(0), __webpack_require__(203)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/is-iterable'), require('babel-runtime/core-js/get-iterator'), require('parse-unit'), require('preact'), require('enumerate-devices'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isIterable, global.getIterator, global.parseUnit, global.preact, global.enumerateDevices);
    global.index = mod.exports;
  }
})(this, function (exports, _isIterable2, _getIterator2, _parseUnit3, _preact, _enumerateDevices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.humanizeField = exports.checkIfHasWebcam = exports.isDesktop = exports.preventDefaultOnClick = exports.wrapWithClass = exports.getCSSMilisecsValue = exports.getCSSValue = exports.functionalSwitch = undefined;

  var _isIterable3 = _interopRequireDefault(_isIterable2);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _parseUnit4 = _interopRequireDefault(_parseUnit3);

  var _enumerateDevices2 = _interopRequireDefault(_enumerateDevices);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var functionalSwitch = exports.functionalSwitch = function functionalSwitch(key, hash) {
    return (hash[key] || function () {
      return null;
    })();
  };

  var getCSSValue = exports.getCSSValue = function getCSSValue(expectedUnit, cssUnit) {
    var _parseUnit = (0, _parseUnit4.default)(cssUnit),
        _parseUnit2 = _slicedToArray(_parseUnit, 2),
        value = _parseUnit2[0],
        resUnit = _parseUnit2[1];

    if (resUnit !== expectedUnit) {
      console.warn('The css @value: ' + cssUnit + ' unit is ' + resUnit + ' but it should be ' + expectedUnit);
    }
    return value;
  };
  var getCSSMilisecsValue = exports.getCSSMilisecsValue = function getCSSMilisecsValue(cssUnit) {
    return getCSSValue("ms", cssUnit);
  };

  var wrapWithClass = exports.wrapWithClass = function wrapWithClass(className, children) {
    return (0, _preact.h)(
      'div',
      { className: className },
      children
    );
  };

  var preventDefaultOnClick = exports.preventDefaultOnClick = function preventDefaultOnClick(callback) {
    return function (event) {
      event.preventDefault();
      callback();
    };
  };

  // Copied from https://github.com/muaz-khan/DetectRTC/blob/master/DetectRTC.js
  var isDesktop = exports.isDesktop = !/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || '');

  var enumerateDevicesInternal = function enumerateDevicesInternal(onSuccess, onError) {
    try {
      (0, _enumerateDevices2.default)().then(onSuccess).catch(onError);
    } catch (exception) {
      onError(exception);
    }
  };

  var checkIfHasWebcam = exports.checkIfHasWebcam = function checkIfHasWebcam(onResult) {
    enumerateDevicesInternal(function (devices) {
      return onResult(devices.some(function (device) {
        return device.kind === "videoinput";
      }));
    }, function () {
      return onResult(false);
    });
  };

  var humanizeField = exports.humanizeField = function humanizeField(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).split('_').join(' ');
  };
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(14);
var createDesc = __webpack_require__(30);
module.exports = __webpack_require__(16) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(45), __webpack_require__(120), __webpack_require__(123), __webpack_require__(72)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./store/store'), require('./core/events'), require('./store/actions'), require('./store/selectors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.store, global.events, global.actions, global.selectors);
    global.index = mod.exports;
  }
})(this, function (exports, _store, _events, _actions, _selectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectors = exports.unboundActions = exports.events = exports.actions = exports.store = undefined;

  var _store2 = _interopRequireDefault(_store);

  var _events2 = _interopRequireDefault(_events);

  var selectors = _interopRequireWildcard(_selectors);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.store = _store2.default;
  exports.actions = _actions.actions;
  exports.events = _events2.default;
  exports.unboundActions = _actions.unboundActions;
  exports.selectors = selectors;
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, URL, webkitURL, FileReader */

;(function ($) {
  'use strict'

  // Loads an image for a given File object.
  // Invokes the callback with an img or optional canvas
  // element (if supported by the browser) as parameter:
  function loadImage (file, callback, options) {
    var img = document.createElement('img')
    var url
    img.onerror = function (event) {
      return loadImage.onerror(img, event, file, callback, options)
    }
    img.onload = function (event) {
      return loadImage.onload(img, event, file, callback, options)
    }
    if (typeof file === 'string') {
      loadImage.fetchBlob(file, function (blob) {
        if (blob) {
          file = blob
          url = loadImage.createObjectURL(file)
        } else {
          url = file
          if (options && options.crossOrigin) {
            img.crossOrigin = options.crossOrigin
          }
        }
        img.src = url
      }, options)
      return img
    } else if (loadImage.isInstanceOf('Blob', file) ||
        // Files are also Blob instances, but some browsers
        // (Firefox 3.6) support the File API but not Blobs:
        loadImage.isInstanceOf('File', file)) {
      url = img._objectURL = loadImage.createObjectURL(file)
      if (url) {
        img.src = url
        return img
      }
      return loadImage.readFile(file, function (e) {
        var target = e.target
        if (target && target.result) {
          img.src = target.result
        } else if (callback) {
          callback(e)
        }
      })
    }
  }
  // The check for URL.revokeObjectURL fixes an issue with Opera 12,
  // which provides URL.createObjectURL but doesn't properly implement it:
  var urlAPI = (window.createObjectURL && window) ||
                (window.URL && URL.revokeObjectURL && URL) ||
                (window.webkitURL && webkitURL)

  function revokeHelper (img, options) {
    if (img._objectURL && !(options && options.noRevoke)) {
      loadImage.revokeObjectURL(img._objectURL)
      delete img._objectURL
    }
  }

  // If the callback given to this function returns a blob, it is used as image
  // source instead of the original url and overrides the file argument used in
  // the onload and onerror event callbacks:
  loadImage.fetchBlob = function (url, callback, options) {
    callback()
  }

  loadImage.isInstanceOf = function (type, obj) {
    // Cross-frame instanceof check
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }

  loadImage.transform = function (img, options, callback, file, data) {
    callback(img, data)
  }

  loadImage.onerror = function (img, event, file, callback, options) {
    revokeHelper(img, options)
    if (callback) {
      callback.call(img, event)
    }
  }

  loadImage.onload = function (img, event, file, callback, options) {
    revokeHelper(img, options)
    if (callback) {
      loadImage.transform(img, options, callback, file, {})
    }
  }

  loadImage.createObjectURL = function (file) {
    return urlAPI ? urlAPI.createObjectURL(file) : false
  }

  loadImage.revokeObjectURL = function (url) {
    return urlAPI ? urlAPI.revokeObjectURL(url) : false
  }

  // Loads a given File object via FileReader interface,
  // invokes the callback with the event object (load or error).
  // The result can be read via event.target.result:
  loadImage.readFile = function (file, callback, method) {
    if (window.FileReader) {
      var fileReader = new FileReader()
      fileReader.onload = fileReader.onerror = callback
      method = method || 'readAsDataURL'
      if (fileReader[method]) {
        fileReader[method](file)
        return fileReader
      }
    }
    return false
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return loadImage
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    module.exports = loadImage
  } else {
    $.loadImage = loadImage
  }
}(window))


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(85);
var enumBugKeys = __webpack_require__(49);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(48);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = __webpack_require__(96);

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = __webpack_require__(247);

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = __webpack_require__(246);

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = __webpack_require__(245);

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = __webpack_require__(95);

var _compose2 = _interopRequireDefault(_compose);

var _warning = __webpack_require__(97);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (false) {
  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2["default"];
exports.combineReducers = _combineReducers2["default"];
exports.bindActionCreators = _bindActionCreators2["default"];
exports.applyMiddleware = _applyMiddleware2["default"];
exports.compose = _compose2["default"];

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * @module object-loops/for-each
 */

/**
 * Executes a provided function once per each object value.
 * @function module:object-loops/for-each
 * @param {object} [obj] - object to forEach, not accepted if being used directly on Object.prototype
 * @param {forEachCallback} callback - function that will be invoked once for each key-value pair
 * @param {*} [thisArg] - context to bind to callback
 */
module.exports = forEach

function forEach (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.forEach(callback, thisArg)
  }
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError(obj + ' must be an object')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  Object.keys(obj).forEach(function (key) {
    var val = obj[key]
    callback.call(thisArg, val, key, obj)
  })
}
/**
 * This callback type is called `forEachCallback` and is displayed as a global symbol.
 * @callback forEachCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 */


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.connect = exports.Provider = undefined;

var _Provider = __webpack_require__(240);

var _Provider2 = _interopRequireDefault(_Provider);

var _connect = __webpack_require__(241);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.Provider = _Provider2["default"];
exports.connect = _connect2["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var SET_DOCUMENT_TYPE = exports.SET_DOCUMENT_TYPE = 'SET_DOCUMENT_TYPE';

  var CAPTURE_CREATE = exports.CAPTURE_CREATE = 'CAPTURE_CREATE';
  var CAPTURE_VALIDATE = exports.CAPTURE_VALIDATE = 'CAPTURE_VALIDATE';
  var CAPTURE_CONFIRM = exports.CAPTURE_CONFIRM = 'CAPTURE_CONFIRM';
  var CAPTURE_DELETE = exports.CAPTURE_DELETE = 'CAPTURE_DELETE';
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(148);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(168)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(81)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module object-loops/map
 */
var forEach = __webpack_require__(34)

/**
 * Creates a new object with the results of calling a provided function on every value in the object.
 * @function module:object-loops/map
 * @param {object} [obj] - object to map values, not accepted if being used directly on Object.prototype
 * @param {mapCallback} callback - function that produces the new value for the new mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped values
 */
module.exports = map

function map (obj, callback, thisArg) {
  if (Array.isArray(obj)) {
    return obj.map(callback, thisArg)
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var mappedObj = {}
  forEach(obj, function (val, key, obj) {
    mappedObj[key] = callback.call(thisArg, val, key, obj)
  })
  return mappedObj
}
/**
 * This callback type is called `mapCallback` and is displayed as a global symbol.
 * @callback mapCallback
 * @param {*} val - value for key
 * @param {string} key - object key (used in current iteration)
 * @param {object} obj - object which values are being iterated
 * @returns {*} mappedValue - value for key in the new, mapped object
 */


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(265), __webpack_require__(70)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('supports-webp'), require('./func'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.supportsWebp, global.func);
    global.canvas = mod.exports;
  }
})(this, function (exports, _supportsWebp, _func) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.canvasToBase64Images = exports.toLossyImageDataUrl = exports.cloneCanvas = undefined;

  var _supportsWebp2 = _interopRequireDefault(_supportsWebp);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var cloneCanvas = exports.cloneCanvas = function cloneCanvas(oldCanvas) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    if (width === null) width = oldCanvas.width;
    if (height === null) height = oldCanvas.height;

    //set dimensions
    newCanvas.width = width;
    newCanvas.height = height;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0, width, height);

    //return the new canvas
    return newCanvas;
  };

  var cloneLowResCanvas = function cloneLowResCanvas(canvas, maxHeight) {
    var width = canvas.width,
        height = canvas.height;

    var ratio = width / height;

    var lowHeight = Math.min(maxHeight, canvas.height);
    var lowWidth = lowHeight * ratio;

    return cloneCanvas(canvas, lowWidth, lowHeight);
  };

  var toDataUrl = function toDataUrl(type) {
    return function (canvas, callback) {
      return (0, _func.tick)(function () {
        return callback(canvas.toDataURL(type));
      });
    };
  };

  var browserSupportedLossyFormat = 'image/' + (_supportsWebp2.default ? 'webp' : 'jpeg');

  var toLossyImageDataUrl = exports.toLossyImageDataUrl = toDataUrl(browserSupportedLossyFormat);
  var toPngImageDataUrl = toDataUrl("image/png");

  var canvasToBase64Images = exports.canvasToBase64Images = function canvasToBase64Images(canvas, callback /*(imageLossy, imagePng)*/) {
    if (!canvas) return;

    var onPngImage = function onPngImage(imagePng) {
      return (0, _func.asyncFunc)(cloneLowResCanvas, [canvas, 200], function (lowResCanvas) {
        return onLowResCanvas(lowResCanvas, imagePng);
      });
    };

    var onLowResCanvas = function onLowResCanvas(lowResCanvas, imagePng) {
      return toLossyImageDataUrl(lowResCanvas, function (imageLossy) {
        return onLossyImage(imageLossy, imagePng);
      });
    };

    var onLossyImage = function onLossyImage(imageLossy, imagePng) {
      return callback(imageLossy, imagePng);
    };

    (0, _func.tick)(function () {
      return toPngImageDataUrl(canvas, onPngImage);
    });
  };
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(27), __webpack_require__(43), __webpack_require__(132), __webpack_require__(131)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('blueimp-load-image/js/load-image'), require('./canvas.js'), require('blueimp-load-image/js/load-image-orientation'), require('blueimp-load-image/js/load-image-exif'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.loadImage, global.canvas, global.loadImageOrientation, global.loadImageExif);
    global.file = mod.exports;
  }
})(this, function (exports, _loadImage, _canvas) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fileToLossyBase64Image = exports.isOfFileType = exports.fileType = exports.base64toBlob = exports.fileToBase64 = undefined;

  var _loadImage2 = _interopRequireDefault(_loadImage);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var fileToBase64 = exports.fileToBase64 = function fileToBase64(file, callback, errorCallback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.warn('File Reading Error: ', error);
      errorCallback(error);
    };
  };

  var decodeBase64 = function decodeBase64(image) {
    var byteString = atob(image.split(',')[1]);
    var mimeString = image.split(',')[0].split(':')[1].split(';')[0];
    var integerArray = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      integerArray[i] = byteString.charCodeAt(i);
    }
    return { integerArray: integerArray, mimeString: mimeString };
  };

  var base64toBlob = exports.base64toBlob = function base64toBlob(image) {
    var base64Data = decodeBase64(image);
    return new Blob([base64Data.integerArray], { type: base64Data.mimeString });
  };

  var fileType = exports.fileType = function fileType(file) {
    return file.type.split('/')[1];
  };

  var isOfFileType = exports.isOfFileType = function isOfFileType(fileTypeList, file) {
    return fileTypeList.some(function (acceptableFileType) {
      return acceptableFileType === fileType(file);
    });
  };

  var fileToCanvas = function fileToCanvas(file, callback, errorCallback) {
    return (0, _loadImage2.default)(file, function (canvasOrEventError) {
      if (canvasOrEventError.type === "error") {
        errorCallback(canvasOrEventError);
      } else {
        callback(canvasOrEventError);
      }
    }, { maxWidth: 960, maxHeight: 960, orientation: true });
  };

  var fileToLossyBase64Image = exports.fileToLossyBase64Image = function fileToLossyBase64Image(file, callback, errorCallback) {
    return fileToCanvas(file, function (canvas) {
      return (0, _canvas.toLossyImageDataUrl)(canvas, callback);
    }, errorCallback);
  };
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(32), __webpack_require__(126)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('redux'), require('./reducers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.redux, global.reducers);
    global.store = mod.exports;
  }
})(this, function (module, exports, _redux, _reducers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reducers2 = _interopRequireDefault(_reducers);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var store = (0, _redux.createStore)(_reducers2.default, window.devToolsExtension ? window.devToolsExtension() : undefined);

  exports.default = store;
  module.exports = exports['default'];
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(47);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(15);
var dPs = __webpack_require__(162);
var enumBugKeys = __webpack_require__(49);
var IE_PROTO = __webpack_require__(55)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(78)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(154).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(14).f;
var has = __webpack_require__(18);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(56)('keys');
var uid = __webpack_require__(40);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(57);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(23);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(51);
var wksExt = __webpack_require__(61);
var defineProperty = __webpack_require__(14).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(174);
var global = __webpack_require__(13);
var hide = __webpack_require__(22);
var Iterators = __webpack_require__(24);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(215),
    getPrototype = __webpack_require__(217),
    isObjectLike = __webpack_require__(222);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(20), __webpack_require__(256)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('preact'), require('../Theme/style.css'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.preact, global.style, global.style);
    global.index = mod.exports;
  }
})(this, function (exports, _preact, _style, _style3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DocumentInstructions = exports.DocumentOverlay = exports.DocumentTitle = undefined;

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DocumentTitle = exports.DocumentTitle = function DocumentTitle(_ref) {
    var useCapture = _ref.useCapture,
        side = _ref.side,
        title = _ref.title;

    var titleType = useCapture ? 'captureTitle' : 'uploadTitle';
    return (0, _preact.h)(
      'div',
      { className: _style2.default.title },
      title[side][titleType]
    );
  };

  DocumentTitle.defaultProps = {
    title: {
      front: {
        captureTitle: 'Place the front of your document in the rectangle',
        uploadTitle: 'Upload the front of your document'
      },
      back: {
        captureTitle: 'Place the back of your document in the rectangle',
        uploadTitle: 'Upload the back of your document'
      }
    }
  };

  var DocumentOverlay = exports.DocumentOverlay = function DocumentOverlay() {
    return (0, _preact.h)(
      'div',
      { className: _style2.default.overlay },
      (0, _preact.h)('span', { className: _style2.default["overlay-shape"] + ' ' + _style4.default.rectangle })
    );
  };

  var DocumentInstructions = exports.DocumentInstructions = function DocumentInstructions() {
    return (0, _preact.h)(
      'div',
      { className: _style4.default.capture },
      (0, _preact.h)(
        'p',
        { className: _style2.default.center },
        'Once it is detected you will be automatically directed to the next step.'
      )
    );
  };
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(0), __webpack_require__(20), __webpack_require__(259)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('preact'), require('../Theme/style.css'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.preact, global.style, global.style);
    global.index = mod.exports;
  }
})(this, function (exports, _preact, _style, _style3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FaceInstructions = exports.FaceOverlay = exports.FaceTitle = undefined;

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FaceTitle = exports.FaceTitle = function FaceTitle(_ref) {
    var useCapture = _ref.useCapture;

    var titleString = useCapture ? 'Place your face in the circle' : 'Upload a picture of your face';

    return (0, _preact.h)(
      'div',
      { className: _style2.default.title },
      titleString
    );
  };

  var FaceOverlay = exports.FaceOverlay = function FaceOverlay() {
    return (0, _preact.h)(
      'div',
      { className: _style2.default.overlay },
      (0, _preact.h)('span', { className: _style2.default["overlay-shape"] + ' ' + _style4.default.circle })
    );
  };

  var FaceInstructions = exports.FaceInstructions = function FaceInstructions(_ref2) {
    var handeClick = _ref2.handeClick;

    return (0, _preact.h)(
      'div',
      { className: _style4.default.instructions },
      (0, _preact.h)(
        'button',
        {
          className: _style2.default.btn + ' ' + _style2.default["btn-primary"] + ' ' + _style2.default["btn-centered"],
          onClick: handeClick
        },
        'Take photo'
      )
    );
  };
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.errors = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var errors = exports.errors = {
    'INVALID_CAPTURE': { message: 'No document detected', instruction: 'Make sure all the document is in picture' },
    'INVALID_TYPE': { message: 'File not uploading', instruction: 'Try using another file type' },
    'UNSUPPORTED_FILE': { message: 'Unsupported file type', instruction: 'Try using a .jpg or .png file' },
    'INVALID_SIZE': { message: 'File size too large', instruction: 'Size needs to be smaller than 10MB' },
    'NO_FACE_ERROR': { message: 'No face found', instruction: 'Your face is needed in the selfie' },
    'MULTIPLE_FACES_ERROR': { message: 'Multiple faces found', instruction: 'Only your face can be in the selfie' },
    'SERVER_ERROR': { message: 'Connection lost', instruction: 'Please try again' },
    'GLARE_DETECTED': { message: 'Glare detected', instruction: 'All details should be clear and readable' }
  };
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(128)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require("babel-runtime/core-js/array/filter"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.filter);
    global.array = mod.exports;
  }
})(this, function (exports, _filter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.wrapArray = exports.cleanFalsy = undefined;

  var _filter2 = _interopRequireDefault(_filter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var cleanFalsy = exports.cleanFalsy = function cleanFalsy(list) {
    return (0, _filter2.default)(list, function (n) {
      return n;
    });
  };
  var wrapArray = exports.wrapArray = function wrapArray(maybeArray) {
    return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
  };
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require("babel-runtime/core-js/array/from"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.from);
    global.func = mod.exports;
  }
})(this, function (exports, _from) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tick = exports.asyncFunc = undefined;

  var _from2 = _interopRequireDefault(_from);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return (0, _from2.default)(arr);
    }
  }

  var asyncFunc = exports.asyncFunc = function asyncFunc(fn, args, callback) {
    return tick(function () {
      return callback(fn.apply(undefined, _toConsumableArray(args)));
    });
  };

  var tick = exports.tick = function tick(fn) {
    return requestAnimationFrame(fn);
  };
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.http = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var performHttpReq = exports.performHttpReq = function performHttpReq(_ref, onSuccess, onError) {
    var payload = _ref.payload,
        endpoint = _ref.endpoint,
        contentType = _ref.contentType,
        token = _ref.token;

    var request = new XMLHttpRequest();
    request.open('POST', endpoint);
    if (contentType) {
      request.setRequestHeader('Content-Type', contentType);
    }
    request.setRequestHeader('Authorization', token);

    request.onload = function () {
      if (request.status === 200 || request.status === 201) {
        onSuccess(JSON.parse(request.response));
      } else {
        onError(request);
      }
    };
    request.onerror = function () {
      return onError(request);
    };

    request.send(payload);
  };
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(248), __webpack_require__(42)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('reselect'), require('object-loops/map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reselect, global.map);
    global.index = mod.exports;
  }
})(this, function (exports, _reselect, _map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.confirmedCaptures = exports.allInvalidCaptureSelector = exports.unprocessedCaptures = exports.currentValidCaptures = undefined;

  var _map2 = _interopRequireDefault(_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var currentCaptures = function currentCaptures(state, _ref) {
    var method = _ref.method,
        _ref$side = _ref.side,
        side = _ref$side === undefined ? null : _ref$side;
    return state.captures[method].filter(function (c) {
      return c.side === side;
    });
  };

  var outputCaptures = function outputCaptures(state) {
    var captures = state.captures;
    return {
      face: captures.face,
      document: captures.document.filter(function (c) {
        return c.side === 'front';
      }),
      documentBack: captures.document.filter(function (c) {
        return c.side === 'back';
      })
    };
  };

  var currentValidCaptures = exports.currentValidCaptures = (0, _reselect.createSelector)(currentCaptures, function (captures) {
    return captures.filter(function (capture) {
      return capture.valid;
    });
  });

  var unprocessedCaptures = exports.unprocessedCaptures = (0, _reselect.createSelector)(currentCaptures, function (captures) {
    return captures.filter(function (capture) {
      return !capture.processed;
    });
  });

  var allInvalidCaptureSelector = exports.allInvalidCaptureSelector = (0, _reselect.createSelector)(currentCaptures, function (captures) {
    return captures.length > 0 && captures.every(function (c) {
      return c.processed && !c.valid;
    });
  });

  var validCaptures = (0, _reselect.createSelector)(outputCaptures, function (captures) {
    return (0, _map2.default)(captures, function (value) {
      return value.filter(function (c) {
        return c.valid;
      });
    });
  });

  var confirmedCaptures = exports.confirmedCaptures = (0, _reselect.createSelector)(validCaptures, function (captures) {
    return (0, _map2.default)(captures, function (value) {
      return value.filter(function (c) {
        return c.confirmed;
      })[0];
    });
  });
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Meta
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Image meta data handling implementation
 * based on the help and contribution of
 * Achim Stöhr.
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, Blob */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(27)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./load-image'))
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
}(function (loadImage) {
  'use strict'

  var hasblobSlice = window.Blob && (Blob.prototype.slice ||
  Blob.prototype.webkitSlice || Blob.prototype.mozSlice)

  loadImage.blobSlice = hasblobSlice && function () {
    var slice = this.slice || this.webkitSlice || this.mozSlice
    return slice.apply(this, arguments)
  }

  loadImage.metaDataParsers = {
    jpeg: {
      0xffe1: [] // APP1 marker
    }
  }

  // Parses image meta data and calls the callback with an object argument
  // with the following properties:
  // * imageHead: The complete image head as ArrayBuffer (Uint8Array for IE10)
  // The options arguments accepts an object and supports the following properties:
  // * maxMetaDataSize: Defines the maximum number of bytes to parse.
  // * disableImageHead: Disables creating the imageHead property.
  loadImage.parseMetaData = function (file, callback, options, data) {
    options = options || {}
    data = data || {}
    var that = this
    // 256 KiB should contain all EXIF/ICC/IPTC segments:
    var maxMetaDataSize = options.maxMetaDataSize || 262144
    var noMetaData = !(window.DataView && file && file.size >= 12 &&
                      file.type === 'image/jpeg' && loadImage.blobSlice)
    if (noMetaData || !loadImage.readFile(
        loadImage.blobSlice.call(file, 0, maxMetaDataSize),
        function (e) {
          if (e.target.error) {
            // FileReader error
            console.log(e.target.error)
            callback(data)
            return
          }
          // Note on endianness:
          // Since the marker and length bytes in JPEG files are always
          // stored in big endian order, we can leave the endian parameter
          // of the DataView methods undefined, defaulting to big endian.
          var buffer = e.target.result
          var dataView = new DataView(buffer)
          var offset = 2
          var maxOffset = dataView.byteLength - 4
          var headLength = offset
          var markerBytes
          var markerLength
          var parsers
          var i
          // Check for the JPEG marker (0xffd8):
          if (dataView.getUint16(0) === 0xffd8) {
            while (offset < maxOffset) {
              markerBytes = dataView.getUint16(offset)
              // Search for APPn (0xffeN) and COM (0xfffe) markers,
              // which contain application-specific meta-data like
              // Exif, ICC and IPTC data and text comments:
              if ((markerBytes >= 0xffe0 && markerBytes <= 0xffef) ||
                markerBytes === 0xfffe) {
                // The marker bytes (2) are always followed by
                // the length bytes (2), indicating the length of the
                // marker segment, which includes the length bytes,
                // but not the marker bytes, so we add 2:
                markerLength = dataView.getUint16(offset + 2) + 2
                if (offset + markerLength > dataView.byteLength) {
                  console.log('Invalid meta data: Invalid segment size.')
                  break
                }
                parsers = loadImage.metaDataParsers.jpeg[markerBytes]
                if (parsers) {
                  for (i = 0; i < parsers.length; i += 1) {
                    parsers[i].call(
                      that,
                      dataView,
                      offset,
                      markerLength,
                      data,
                      options
                    )
                  }
                }
                offset += markerLength
                headLength = offset
              } else {
                // Not an APPn or COM marker, probably safe to
                // assume that this is the end of the meta data
                break
              }
            }
            // Meta length must be longer than JPEG marker (2)
            // plus APPn marker (2), followed by length bytes (2):
            if (!options.disableImageHead && headLength > 6) {
              if (buffer.slice) {
                data.imageHead = buffer.slice(0, headLength)
              } else {
                // Workaround for IE10, which does not yet
                // support ArrayBuffer.slice:
                data.imageHead = new Uint8Array(buffer)
                  .subarray(0, headLength)
              }
            }
          } else {
            console.log('Invalid JPEG file: Missing JPEG marker.')
          }
          callback(data)
        },
        'readAsArrayBuffer'
      )) {
      callback(data)
    }
  }

  // Determines if meta data should be loaded automatically:
  loadImage.hasMetaOption = function (options) {
    return options && options.meta
  }

  var originalTransform = loadImage.transform
  loadImage.transform = function (img, options, callback, file, data) {
    if (loadImage.hasMetaOption(options)) {
      loadImage.parseMetaData(file, function (data) {
        originalTransform.call(loadImage, img, options, callback, file, data)
      }, options, data)
    } else {
      originalTransform.apply(loadImage, arguments)
    }
  }
}))


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(58);
var toAbsoluteIndex = __webpack_require__(169);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(47);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var document = __webpack_require__(13).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function () {
  return Object.defineProperty(__webpack_require__(78)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(47);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(51);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(86);
var hide = __webpack_require__(22);
var has = __webpack_require__(18);
var Iterators = __webpack_require__(24);
var $iterCreate = __webpack_require__(157);
var setToStringTag = __webpack_require__(54);
var getPrototypeOf = __webpack_require__(84);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(30);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(59);
var has = __webpack_require__(18);
var IE8_DOM_DEFINE = __webpack_require__(79);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(85);
var hiddenKeys = __webpack_require__(49).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(18);
var toObject = __webpack_require__(31);
var IE_PROTO = __webpack_require__(55)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(76)(false);
var IE_PROTO = __webpack_require__(55)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(77);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var stripPrefix = exports.stripPrefix = function stripPrefix(path, prefix) {
  return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(221);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(8));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Dropzone"] = factory(require("react"));
	else
		root["Dropzone"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _attrAccept = __webpack_require__(1);
	
	var _attrAccept2 = _interopRequireDefault(_attrAccept);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;
	
	var Dropzone = function (_React$Component) {
	  _inherits(Dropzone, _React$Component);
	
	  function Dropzone(props, context) {
	    _classCallCheck(this, Dropzone);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropzone).call(this, props, context));
	
	    _this.onClick = _this.onClick.bind(_this);
	    _this.onDragEnter = _this.onDragEnter.bind(_this);
	    _this.onDragLeave = _this.onDragLeave.bind(_this);
	    _this.onDragOver = _this.onDragOver.bind(_this);
	    _this.onDrop = _this.onDrop.bind(_this);
	
	    _this.state = {
	      isDragActive: false
	    };
	    return _this;
	  }
	
	  _createClass(Dropzone, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.enterCounter = 0;
	    }
	  }, {
	    key: 'onDragEnter',
	    value: function onDragEnter(e) {
	      e.preventDefault();
	
	      // Count the dropzone and any children that are entered.
	      ++this.enterCounter;
	
	      // This is tricky. During the drag even the dataTransfer.files is null
	      // But Chrome implements some drag store, which is accesible via dataTransfer.items
	      var dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];
	
	      // Now we need to convert the DataTransferList to Array
	      var allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));
	
	      this.setState({
	        isDragActive: allFilesAccepted,
	        isDragReject: !allFilesAccepted
	      });
	
	      if (this.props.onDragEnter) {
	        this.props.onDragEnter.call(this, e);
	      }
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'onDragLeave',
	    value: function onDragLeave(e) {
	      e.preventDefault();
	
	      // Only deactivate once the dropzone and all children was left.
	      if (--this.enterCounter > 0) {
	        return;
	      }
	
	      this.setState({
	        isDragActive: false,
	        isDragReject: false
	      });
	
	      if (this.props.onDragLeave) {
	        this.props.onDragLeave.call(this, e);
	      }
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(e) {
	      e.preventDefault();
	
	      // Reset the counter along with the drag on a drop.
	      this.enterCounter = 0;
	
	      this.setState({
	        isDragActive: false,
	        isDragReject: false
	      });
	
	      var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
	      var max = this.props.multiple ? droppedFiles.length : Math.min(droppedFiles.length, 1);
	      var files = [];
	
	      for (var i = 0; i < max; i++) {
	        var file = droppedFiles[i];
	        // We might want to disable the preview creation to support big files
	        if (!this.props.disablePreview) {
	          file.preview = window.URL.createObjectURL(file);
	        }
	        files.push(file);
	      }
	
	      if (this.props.onDrop) {
	        this.props.onDrop.call(this, files, e);
	      }
	
	      if (this.allFilesAccepted(files)) {
	        if (this.props.onDropAccepted) {
	          this.props.onDropAccepted.call(this, files, e);
	        }
	      } else {
	        if (this.props.onDropRejected) {
	          this.props.onDropRejected.call(this, files, e);
	        }
	      }
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick() {
	      if (!this.props.disableClick) {
	        this.open();
	      }
	    }
	  }, {
	    key: 'allFilesAccepted',
	    value: function allFilesAccepted(files) {
	      var _this2 = this;
	
	      return files.every(function (file) {
	        return (0, _attrAccept2.default)(file, _this2.props.accept);
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.fileInputEl.value = null;
	      this.fileInputEl.click();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var _props = this.props;
	      var accept = _props.accept;
	      var activeClassName = _props.activeClassName;
	      var inputProps = _props.inputProps;
	      var multiple = _props.multiple;
	      var name = _props.name;
	      var rejectClassName = _props.rejectClassName;
	
	      var rest = _objectWithoutProperties(_props, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName']);
	
	      var activeStyle = // eslint-disable-line prefer-const
	      rest.activeStyle;
	      var className = rest.className;
	      var rejectStyle = rest.rejectStyle;
	      var style = rest.style;
	
	      var props = _objectWithoutProperties(rest, ['activeStyle', 'className', 'rejectStyle', 'style']);
	
	      var _state = this.state;
	      var isDragActive = _state.isDragActive;
	      var isDragReject = _state.isDragReject;
	
	
	      className = className || '';
	
	      if (isDragActive && activeClassName) {
	        className += ' ' + activeClassName;
	      }
	      if (isDragReject && rejectClassName) {
	        className += ' ' + rejectClassName;
	      }
	
	      if (!className && !style && !activeStyle && !rejectStyle) {
	        style = {
	          width: 200,
	          height: 200,
	          borderWidth: 2,
	          borderColor: '#666',
	          borderStyle: 'dashed',
	          borderRadius: 5
	        };
	        activeStyle = {
	          borderStyle: 'solid',
	          backgroundColor: '#eee'
	        };
	        rejectStyle = {
	          borderStyle: 'solid',
	          backgroundColor: '#ffdddd'
	        };
	      }
	
	      var appliedStyle = void 0;
	      if (activeStyle && isDragActive) {
	        appliedStyle = _extends({}, style, activeStyle);
	      } else if (rejectStyle && isDragReject) {
	        appliedStyle = _extends({}, style, rejectStyle);
	      } else {
	        appliedStyle = _extends({}, style);
	      }
	
	      var inputAttributes = {
	        accept: accept,
	        type: 'file',
	        style: { display: 'none' },
	        multiple: supportMultiple && multiple,
	        ref: function ref(el) {
	          return _this3.fileInputEl = el;
	        },
	        onChange: this.onDrop
	      };
	
	      if (name && name.length) {
	        inputAttributes.name = name;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        _extends({
	          className: className,
	          style: appliedStyle
	        }, props /* expand user provided props first so event handlers are never overridden */, {
	          onClick: this.onClick,
	          onDragEnter: this.onDragEnter,
	          onDragOver: this.onDragOver,
	          onDragLeave: this.onDragLeave,
	          onDrop: this.onDrop
	        }),
	        this.props.children,
	        _react2.default.createElement('input', _extends({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes))
	      );
	    }
	  }]);
	
	  return Dropzone;
	}(_react2.default.Component);
	
	Dropzone.defaultProps = {
	  disablePreview: false,
	  disableClick: false,
	  multiple: true
	};
	
	Dropzone.propTypes = {
	  onDrop: _react2.default.PropTypes.func,
	  onDropAccepted: _react2.default.PropTypes.func,
	  onDropRejected: _react2.default.PropTypes.func,
	  onDragEnter: _react2.default.PropTypes.func,
	  onDragLeave: _react2.default.PropTypes.func,
	
	  children: _react2.default.PropTypes.node,
	  style: _react2.default.PropTypes.object,
	  activeStyle: _react2.default.PropTypes.object,
	  rejectStyle: _react2.default.PropTypes.object,
	  className: _react2.default.PropTypes.string,
	  activeClassName: _react2.default.PropTypes.string,
	  rejectClassName: _react2.default.PropTypes.string,
	
	  disablePreview: _react2.default.PropTypes.bool,
	  disableClick: _react2.default.PropTypes.bool,
	
	  inputProps: _react2.default.PropTypes.object,
	  multiple: _react2.default.PropTypes.bool,
	  accept: _react2.default.PropTypes.string,
	  name: _react2.default.PropTypes.string
	};
	
	exports.default = Dropzone;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,d,y=t&s.G,h=t&s.P,v=y?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=y?o:o[n]||(o[n]={});y&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],d=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,d),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
}

function hidden(el) {
  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === 'none';
}

function visible(element) {
  while (element) {
    if (element === document.body) break;
    if (hidden(element)) return false;
    element = element.parentNode;
  }
  return true;
}

function tabbable(element) {
  var tabIndex = element.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(function (el) {
    return tabbable(el);
  });
}

module.exports = findTabbableDescendants;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

exports["default"] = _react.PropTypes.shape({
  subscribe: _react.PropTypes.func.isRequired,
  dispatch: _react.PropTypes.func.isRequired,
  getState: _react.PropTypes.func.isRequired
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  } else {
    var _ret = function () {
      var last = funcs[funcs.length - 1];
      var rest = funcs.slice(0, -1);
      return {
        v: function v() {
          return rest.reduceRight(function (composed, f) {
            return f(composed);
          }, last.apply(undefined, arguments));
        }
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ActionTypes = undefined;
exports["default"] = createStore;

var _isPlainObject = __webpack_require__(63);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(266);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [initialState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, initialState, enhancer) {
  var _ref2;

  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, initialState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = initialState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2["default"])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */

      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2["default"]] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (false) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(25), __webpack_require__(260), __webpack_require__(239), __webpack_require__(0), __webpack_require__(21)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('../../core'), require('./style.css'), require('react-modal'), require('preact'), require('../utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.core, global.style, global.reactModal, global.preact, global.utils);
    global.index = mod.exports;
  }
})(this, function (module, exports, _defineProperty, _setPrototypeOf, _create, _getPrototypeOf, _core, _style, _reactModal, _preact, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _style2 = _interopRequireDefault(_style);

  var _reactModal2 = _interopRequireDefault(_reactModal);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MODAL_ANIMATION_DURATION = (0, _utils.getCSSMilisecsValue)(_style2.default.modal_animation_duration);

  var WrapperContent = function WrapperContent(_ref) {
    var children = _ref.children;
    return (0, _utils.wrapWithClass)(_style2.default.content, children);
  };

  var Wrapper = function Wrapper(_ref2) {
    var children = _ref2.children;
    return (0, _utils.wrapWithClass)(_style2.default.inner, (0, _preact.h)(
      WrapperContent,
      null,
      children
    ));
  };

  var ModalStrict = function (_Component) {
    _inherits(ModalStrict, _Component);

    function ModalStrict(props) {
      _classCallCheck(this, ModalStrict);

      var _this = _possibleConstructorReturn(this, (ModalStrict.__proto__ || (0, _getPrototypeOf2.default)(ModalStrict)).call(this, props));

      _this.openModal = function () {
        _core.events.emit('onBeforeOpen');
        _this.setState({ isOpen: true });
      };

      _this.onAfterOpen = function () {
        return _core.events.emit('onOpen');
      };

      _this.onRequestClose = function () {
        _core.events.emit('onBeforeClose');
        _this.setState({ isOpen: false });
      };

      _this.onAfterClose = function () {
        return _core.events.emit('onClose');
      };

      _this.state = { isOpen: false };
      return _this;
    }

    _createClass(ModalStrict, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var buttonId = this.props.buttonId;

        var button = document.getElementById(buttonId);
        if (!button) {
          console.warn('The button with id #' + buttonId + ' cannot be found');
          return;
        }
        button.addEventListener('click', this.openModal);
        button.disabled = false;
        this.setState({ button: button });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var button = this.state.button;

        if (button) button.removeEventListener('click', this.openModal);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _preact.h)(
          _reactModal2.default,
          {
            isOpen: this.state.isOpen || this.props.isOpen,
            onAfterOpen: this.onAfterOpen,
            onRequestClose: this.onRequestClose,
            onAfterClose: this.onAfterClose,
            portalClassName: _style2.default.portal,
            overlayClassName: _style2.default.overlay,
            bodyClassName: _style2.default.modalBody,
            className: _style2.default.inner,
            shouldCloseOnOverlayClick: true,
            closeTimeoutMS: MODAL_ANIMATION_DURATION
          },
          (0, _preact.h)(
            WrapperContent,
            null,
            this.props.children
          )
        );
      }
    }]);

    return ModalStrict;
  }(_preact.Component);

  var ModalPure = function ModalPure(_ref3) {
    var useModal = _ref3.useModal,
        children = _ref3.children,
        otherProps = _objectWithoutProperties(_ref3, ['useModal', 'children']);

    return useModal ? (0, _preact.h)(
      ModalStrict,
      otherProps,
      children
    ) : (0, _preact.h)(
      Wrapper,
      null,
      children
    );
  };

  var Modal = function (_Component2) {
    _inherits(Modal, _Component2);

    function Modal() {
      var _ref4;

      var _temp, _this2, _ret;

      _classCallCheck(this, Modal);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref4 = Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call.apply(_ref4, [this].concat(args))), _this2), _this2.render = function () {
        return (0, _preact.h)(ModalPure, _this2.props);
      }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Modal, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.props.useModal) {
          _core.events.emit('onBeforeOpen');
          _core.events.emit('onOpen');
        }
      }
    }]);

    return Modal;
  }(_preact.Component);

  exports.default = Modal;
  module.exports = exports['default'];
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(26), __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(0), __webpack_require__(211), __webpack_require__(32), __webpack_require__(35), __webpack_require__(25), __webpack_require__(9), __webpack_require__(69), __webpack_require__(112)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/array/from'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('history/createBrowserHistory'), require('redux'), require('react-redux'), require('../../core'), require('../../Tracker'), require('../utils/array'), require('./StepComponentMap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.from, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.preact, global.createBrowserHistory, global.redux, global.reactRedux, global.core, global.Tracker, global.array, global.StepComponentMap);
    global.index = mod.exports;
  }
})(this, function (module, exports, _assign, _from, _defineProperty, _setPrototypeOf, _create, _getPrototypeOf, _preact, _createBrowserHistory, _redux, _reactRedux, _core, _Tracker, _array, _StepComponentMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _from2 = _interopRequireDefault(_from);

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return (0, _from2.default)(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var history = (0, _createBrowserHistory2.default)();

  var Router = function (_Component) {
    _inherits(Router, _Component);

    function Router(props) {
      _classCallCheck(this, Router);

      var _this = _possibleConstructorReturn(this, (Router.__proto__ || (0, _getPrototypeOf2.default)(Router)).call(this, props));

      _this.nextStep = function () {
        var components = _this.state.componentsList;
        var currentStep = _this.state.step;
        var newStepIndex = currentStep + 1;
        if (components.length === newStepIndex) {
          _core.events.emit('complete');
        } else {
          _this.setStepIndex(newStepIndex);
        }
      };

      _this.previousStep = function () {
        var currentStep = _this.state.step;
        _this.setStepIndex(currentStep - 1);
      };

      _this.setStepIndex = function (newStepIndex) {
        var state = { step: newStepIndex };
        var path = '' + location.pathname + location.search + location.hash;
        history.push(path, state);
      };

      _this.trackScreen = function (screenNameHierarchy) {
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this$currentComponen = _this.currentComponent(),
            step = _this$currentComponen.step;

        (0, _Tracker.sendScreen)([step.type].concat(_toConsumableArray((0, _array.wrapArray)(screenNameHierarchy))), _extends({}, properties, step.options));
      };

      _this.currentComponent = function () {
        return _this.state.componentsList[_this.state.step];
      };

      _this.createComponentListFromProps = function (_ref) {
        var documentType = _ref.documentType,
            steps = _ref.options.steps;
        return (0, _StepComponentMap.createComponentList)(steps, documentType);
      };

      _this.render = function (_ref2) {
        var globalUserOptions = _objectWithoutProperties(_ref2.options, []),
            otherProps = _objectWithoutProperties(_ref2, ['options']);

        var componentBlob = _this.currentComponent();
        var CurrentComponent = componentBlob.component;
        return (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(CurrentComponent, _extends({}, _extends({}, componentBlob.step.options, globalUserOptions, otherProps), {
            nextStep: _this.nextStep,
            previousStep: _this.previousStep,
            trackScreen: _this.trackScreen }))
        );
      };

      _this.state = {
        step: 0,
        componentsList: _this.createComponentListFromProps(_this.props)
      };
      _this.unlisten = history.listen(function (_ref3) {
        var _ref3$state = _ref3.state,
            state = _ref3$state === undefined ? _this.initialState : _ref3$state;

        _this.setState(state);
      });
      return _this;
    }

    _createClass(Router, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var componentsList = this.createComponentListFromProps(nextProps);
        this.setState({ componentsList: componentsList });
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setStepIndex(this.state.step);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unlisten();
      }
    }]);

    return Router;
  }(_preact.Component);

  function mapStateToProps(state) {
    return _extends({}, state.globals);
  }

  function mapDispatchToProps(dispatch) {
    return { actions: (0, _redux.bindActionCreators)(_core.unboundActions, dispatch) };
  }

  exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Router);
  module.exports = exports['default'];
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module object-loops/map
 */
var forEach = __webpack_require__(34)

/**
 * Creates a new object with the results of calling a provided function on every key in the object.
 * @function module:object-loops/map
 * @param {object} [obj] - object to map keys, not accepted if being used directly on Object.prototype
 * @param {mapKeysCallback} callback - function that produces the new key for the new mapped object
 * @param {*} [thisArg] - optional. context to bind to callback
 * @returns {object} newly created object with mapped keys
 */
module.exports = mapKeys

function mapKeys (obj, callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' must be a function')
  }
  var objIsArray = Array.isArray(obj)
  var mapped = objIsArray ? [] : {}
  if (objIsArray) {
    obj.forEach(eachCallback)
  } else {
    forEach(obj, eachCallback)
  }
  function eachCallback (val, key, obj) {
    var newKey = callback.call(thisArg, key, val, obj)
    mapped[newKey] = val
  }
  return mapped
}
/**
 * This callback type is called `mapKeysCallback` and is displayed as a global symbol.
 * @callback mapKeysCallback
 * @param {string} key - object key (used in current iteration)
 * @param {*} val - value for key
 * @param {object} obj - object which keys are being iterated
 * @returns {*} mappedKey - value for key in the new, mapped object
 */


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(38), __webpack_require__(37), __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(0), __webpack_require__(244), __webpack_require__(186), __webpack_require__(91), __webpack_require__(269), __webpack_require__(66), __webpack_require__(67), __webpack_require__(109), __webpack_require__(21), __webpack_require__(43), __webpack_require__(70), __webpack_require__(252)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/is-iterable'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('react-webcam-onfido'), require('countup.js'), require('react-dropzone'), require('visibilityjs'), require('../Document'), require('../Face'), require('../Countdown'), require('../utils'), require('../utils/canvas.js'), require('../utils/func'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.isIterable, global.getIterator, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.preact, global.reactWebcamOnfido, global.countup, global.reactDropzone, global.visibilityjs, global.Document, global.Face, global.Countdown, global.utils, global.canvas, global.func, global.style);
    global.index = mod.exports;
  }
})(this, function (module, exports, _assign, _isIterable2, _getIterator2, _defineProperty, _setPrototypeOf, _create, _getPrototypeOf, _preact, _reactWebcamOnfido, _countup, _reactDropzone, _visibilityjs, _Document, _Face, _Countdown, _utils, _canvas, _func, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _isIterable3 = _interopRequireDefault(_isIterable2);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _reactWebcamOnfido2 = _interopRequireDefault(_reactWebcamOnfido);

  var _countup2 = _interopRequireDefault(_countup);

  var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

  var _visibilityjs2 = _interopRequireDefault(_visibilityjs);

  var _Countdown2 = _interopRequireDefault(_Countdown);

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var Overlay = function Overlay(_ref) {
    var method = _ref.method,
        countDownRef = _ref.countDownRef;
    return (0, _utils.functionalSwitch)(method, {
      document: function document() {
        return (0, _preact.h)(_Document.DocumentOverlay, null);
      },
      face: function face() {
        return (0, _preact.h)(
          'div',
          { className: _style2.default.overlay },
          (0, _preact.h)(_Countdown2.default, { ref: countDownRef }),
          (0, _preact.h)(_Face.FaceOverlay, null)
        );
      }
    });
  };

  var Instructions = function Instructions(_ref2) {
    var method = _ref2.method,
        faceCaptureClick = _ref2.faceCaptureClick;
    return (0, _utils.functionalSwitch)(method, {
      'document': function document() {
        return (0, _preact.h)(_Document.DocumentInstructions, null);
      },
      'face': function face() {
        return (0, _preact.h)(_Face.FaceInstructions, { handeClick: faceCaptureClick });
      }
    });
  };

  var UploadFallback = function UploadFallback(_ref3) {
    var onUploadFallback = _ref3.onUploadFallback,
        onFallbackClick = _ref3.onFallbackClick;
    return (0, _preact.h)(
      _reactDropzone2.default,
      {
        onDrop: function onDrop(_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
              file = _ref5[0];

          return onUploadFallback(file);
        },
        className: _style2.default.uploadFallback,
        multiple: false },
      (0, _preact.h)(
        'button',
        { onClick: onFallbackClick() },
        ' Having problems? Click here to upload a file'
      )
    );
  };

  var CameraPure = function CameraPure(_ref6) {
    var method = _ref6.method,
        onUploadFallback = _ref6.onUploadFallback,
        onFallbackClick = _ref6.onFallbackClick,
        onUserMedia = _ref6.onUserMedia,
        faceCaptureClick = _ref6.faceCaptureClick,
        countDownRef = _ref6.countDownRef,
        webcamRef = _ref6.webcamRef,
        onWebcamError = _ref6.onWebcamError;
    return (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(
        'div',
        { className: _style2.default["video-overlay"] },
        (0, _preact.h)(_reactWebcamOnfido2.default, _extends({
          className: _style2.default.video,
          audio: false,
          width: 960,
          height: 720
        }, { onUserMedia: onUserMedia, ref: webcamRef, onFailure: onWebcamError })),
        (0, _preact.h)(Overlay, { method: method, countDownRef: countDownRef }),
        (0, _preact.h)(UploadFallback, { onUploadFallback: onUploadFallback, onFallbackClick: onFallbackClick })
      ),
      (0, _preact.h)(Instructions, { method: method, faceCaptureClick: faceCaptureClick })
    );
  };

  var Camera = function (_Component) {
    _inherits(Camera, _Component);

    function Camera() {
      var _ref7;

      var _temp, _this, _ret;

      _classCallCheck(this, Camera);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref7 = Camera.__proto__ || (0, _getPrototypeOf2.default)(Camera)).call.apply(_ref7, [this].concat(args))), _this), _this.webcam = null, _this.capture = {
        start: function start() {
          _this.capture.stop();
          _this.interval = _visibilityjs2.default.every(1000, _this.screenshot);
        },
        stop: function stop() {
          return _visibilityjs2.default.stop(_this.interval);
        },
        once: function once() {
          var options = { useEasing: false, useGrouping: false };
          var countdown = new _countup2.default(_this.countdown.base, 3, 0, 0, 3, options);
          countdown.start(function () {
            return _this.screenshot();
          });
        }
      }, _this.screenshot = function () {
        var onScreenshot = _this.props.onScreenshot;

        var canvas = _this.webcam.getCanvas();
        if (!canvas) {
          console.error('webcam canvas is null');
          return;
        }
        (0, _func.asyncFunc)(_canvas.cloneCanvas, [canvas], onScreenshot);
      }, _this.stopCamera = function () {
        _this.capture.stop();
      }, _this.render = function (_ref8) {
        var method = _ref8.method,
            onUserMedia = _ref8.onUserMedia,
            onUploadFallback = _ref8.onUploadFallback,
            onWebcamError = _ref8.onWebcamError;
        return (0, _preact.h)(CameraPure, {
          method: method, onUserMedia: onUserMedia, onUploadFallback: onUploadFallback, onWebcamError: onWebcamError,
          faceCaptureClick: _this.capture.once,
          countDownRef: function countDownRef(c) {
            _this.countdown = c;
          },
          webcamRef: function webcamRef(c) {
            _this.webcam = c;
          },
          onFallbackClick: function onFallbackClick() {
            return _this.stopCamera;
          } });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Camera, [{
      key: 'webcamMounted',
      value: function webcamMounted() {
        var autoCapture = this.props.autoCapture;

        if (autoCapture) this.capture.start();
      }
    }, {
      key: 'webcamUnmounted',
      value: function webcamUnmounted() {
        this.capture.stop();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.webcamMounted();
        this.props.trackScreen('camera');
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.webcamUnmounted();
      }
    }]);

    return Camera;
  }(_preact.Component);

  exports.default = Camera;
  module.exports = exports['default'];
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(46), __webpack_require__(11), __webpack_require__(0), __webpack_require__(25), __webpack_require__(74), __webpack_require__(35), __webpack_require__(118), __webpack_require__(115), __webpack_require__(103), __webpack_require__(67), __webpack_require__(66), __webpack_require__(253), __webpack_require__(21), __webpack_require__(43), __webpack_require__(44), __webpack_require__(119)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('../../core'), require('classnames'), require('react-redux'), require('../utils/randomString'), require('../Uploader'), require('../Camera'), require('../Face'), require('../Document'), require('./style.css'), require('../utils'), require('../utils/canvas.js'), require('../utils/file.js'), require('../utils/sdkBackend'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.defineProperty, global.setPrototypeOf, global.create, global.stringify, global.getPrototypeOf, global.preact, global.core, global.classnames, global.reactRedux, global.randomString, global.Uploader, global.Camera, global.Face, global.Document, global.style, global.utils, global.canvas, global.file, global.sdkBackend);
    global.capture = mod.exports;
  }
})(this, function (module, exports, _assign, _defineProperty2, _setPrototypeOf, _create, _stringify, _getPrototypeOf, _preact, _core, _classnames, _reactRedux, _randomString, _Uploader, _Camera, _Face, _Document, _style, _utils, _canvas, _file, _sdkBackend) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _randomString2 = _interopRequireDefault(_randomString);

  var _Camera2 = _interopRequireDefault(_Camera);

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty3.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var hasWebcamStartupValue = true; //asume there is a webcam first,
  //assuming it's better to get flicker from webcam to file upload
  //than the other way around

  (0, _utils.checkIfHasWebcam)(function (hasWebcam) {
    return hasWebcamStartupValue = hasWebcam;
  });

  var Capture = function (_Component) {
    _inherits(Capture, _Component);

    function Capture(props) {
      _classCallCheck(this, Capture);

      var _this = _possibleConstructorReturn(this, (Capture.__proto__ || (0, _getPrototypeOf2.default)(Capture)).call(this, props));

      _this.checkWebcamSupport = function () {
        (0, _utils.checkIfHasWebcam)(function (hasWebcam) {
          return _this.setState({ hasWebcam: hasWebcam });
        });
      };

      _this.maxAutomaticCaptures = 3;

      _this.onValidationServiceResponse = function (payload, _ref) {
        var valid = _ref.valid;
        var nextStep = _this.props.nextStep;

        _this.validateCaptures(payload, valid);
        if (valid) nextStep();
      };

      _this.handleCapture = function (blob, base64) {
        if (!blob) {
          console.warn('Cannot handle a null image');
          return;
        }

        var payload = _this.initialiseCapturePayload(blob, base64);
        (0, _utils.functionalSwitch)(_this.props.method, {
          document: function document() {
            return _this.handleDocument(payload);
          },
          face: function face() {
            return _this.handleFace(payload);
          }
        });
      };

      _this.initialiseCapturePayload = function (blob, base64) {
        return { id: (0, _randomString2.default)(), blob: blob, base64: base64 };
      };

      _this.validationServicePayload = function (_ref2) {
        var id = _ref2.id,
            base64 = _ref2.base64;
        return (0, _stringify2.default)({ id: id, image: base64 });
      };

      _this.onUploadFallback = function (file) {
        _this.setState({ uploadFallback: true });
        _this.clearErrors();
        _this.deleteCaptures();
        _this.onImageFileSelected(file);
      };

      _this.onWebcamError = function () {
        _this.setState({ uploadFallback: true });
        _this.deleteCaptures();
      };

      _this.onScreenshot = function (canvas) {
        return (0, _canvas.canvasToBase64Images)(canvas, function (lossyBase64, base64) {
          var blob = (0, _file.base64toBlob)(base64);
          _this.handleCapture(blob, lossyBase64);
        });
      };

      _this.onImageFileSelected = function (file) {
        var imageTypes = ['jpg', 'jpeg', 'png'];
        var pdfType = ['pdf'];
        var allAcceptedTypes = [].concat(imageTypes, pdfType);

        if (!(0, _file.isOfFileType)(allAcceptedTypes, file)) {
          _this.onFileTypeError();
          return;
        }

        // The Onfido API only accepts files below 10 MB
        if (file.size > 10000000) {
          _this.onFileSizeError();
          return;
        }

        var handleFile = function handleFile(file) {
          return (0, _file.fileToBase64)(file, function (base64) {
            return _this.handleCapture(file, base64);
          }, _this.onFileGeneralError);
        };

        if ((0, _file.isOfFileType)(pdfType, file)) {
          //avoid rendering pdfs, due to inconsistencies between different browsers
          handleFile(file);
        } else if ((0, _file.isOfFileType)(imageTypes, file)) {
          (0, _file.fileToLossyBase64Image)(file, function (lossyBase64) {
            return _this.handleCapture(file, lossyBase64);
          }, function () {
            return handleFile(file);
          });
        }
      };

      _this.onFileTypeError = function () {
        return _this.setError('INVALID_TYPE');
      };

      _this.onFileSizeError = function () {
        return _this.setError('INVALID_SIZE');
      };

      _this.onFileGeneralError = function () {
        return _this.setError('INVALID_CAPTURE');
      };

      _this.onValidationServerError = function () {
        _this.deleteCaptures();
        _this.setError('SERVER_ERROR');
      };

      _this.setError = function (name) {
        return _this.setState({ error: { name: name } });
      };

      _this.deleteCaptures = function () {
        var _this$props = _this.props,
            method = _this$props.method,
            side = _this$props.side,
            deleteCaptures = _this$props.actions.deleteCaptures;

        deleteCaptures({ method: method, side: side });
      };

      _this.validateCaptures = function (payload, valid) {
        var _this$props2 = _this.props,
            actions = _this$props2.actions,
            method = _this$props2.method;

        actions.validateCapture({ id: payload.id, valid: valid, method: method });
      };

      _this.clearErrors = function () {
        _this.setState({ error: {} });
      };

      _this.state = {
        uploadFallback: false,
        error: {},
        hasWebcam: hasWebcamStartupValue
      };
      return _this;
    }

    _createClass(Capture, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.webcamChecker = setInterval(this.checkWebcamSupport, 2000);
        this.checkWebcamSupport();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.setState({ uploadFallback: false });
        clearInterval(this.webcamChecker);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var validCaptures = nextProps.validCaptures,
            unprocessedCaptures = nextProps.unprocessedCaptures,
            allInvalid = nextProps.allInvalid;

        if (validCaptures.length > 0) this.setState({ uploadFallback: false });
        if (unprocessedCaptures.length > 0) this.clearErrors();
        if (allInvalid) this.onFileGeneralError();
      }
    }, {
      key: 'createCapture',
      value: function createCapture(payload) {
        var _props = this.props,
            actions = _props.actions,
            method = _props.method,
            side = _props.side;

        var capture = _extends({}, payload, { side: side });
        actions.createCapture({ method: method, capture: capture, maxCaptures: this.maxAutomaticCaptures });
      }
    }, {
      key: 'validateAndProceed',
      value: function validateAndProceed(payload) {
        var nextStep = this.props.nextStep;

        var valid = true;
        this.validateCaptures(payload, valid);
        nextStep();
      }
    }, {
      key: 'handleAutocapture',
      value: function handleAutocapture(payload) {
        var _this2 = this;

        var _props2 = this.props,
            token = _props2.token,
            unprocessedCaptures = _props2.unprocessedCaptures;

        if (unprocessedCaptures.length === this.maxAutomaticCaptures) {
          console.warn('Server response is slow, waiting for responses before uploading more');
          return;
        }
        (0, _sdkBackend.postToBackend)(this.validationServicePayload(payload), token, function (response) {
          return _this2.onValidationServiceResponse(payload, response);
        }, this.onValidationServerError);
      }
    }, {
      key: 'handleCaptureFromUploader',
      value: function handleCaptureFromUploader(payload) {
        this.validateAndProceed(payload);
      }
    }, {
      key: 'createDocumentPayload',
      value: function createDocumentPayload(payload) {
        var documentType = this.props.documentType;

        return _extends({}, payload, { documentType: documentType });
      }
    }, {
      key: 'handleDocument',
      value: function handleDocument(payload) {
        var documentPayload = this.createDocumentPayload(payload);
        this.createCapture(documentPayload);
        if (this.props.useWebcam && !this.state.uploadFallback) {
          this.handleAutocapture(documentPayload);
        } else {
          this.handleCaptureFromUploader(documentPayload);
        }
      }
    }, {
      key: 'handleFace',
      value: function handleFace(payload) {
        this.createCapture(payload);
        this.validateAndProceed(payload);
      }
    }, {
      key: 'render',
      value: function render(_ref3) {
        var method = _ref3.method,
            side = _ref3.side,
            validCaptures = _ref3.validCaptures,
            useWebcam = _ref3.useWebcam,
            other = _objectWithoutProperties(_ref3, ['method', 'side', 'validCaptures', 'useWebcam']);

        var useCapture = !this.state.uploadFallback && useWebcam && _utils.isDesktop && this.state.hasWebcam;
        return (0, _preact.h)(CaptureScreen, _extends({ method: method, side: side, validCaptures: validCaptures, useCapture: useCapture,
          onScreenshot: this.onScreenshot,
          onUploadFallback: this.onUploadFallback,
          onImageSelected: this.onImageFileSelected,
          onWebcamError: this.onWebcamError,
          error: this.state.error
        }, other));
      }
    }]);

    return Capture;
  }(_preact.Component);

  var Title = function Title(_ref4) {
    var method = _ref4.method,
        side = _ref4.side,
        useCapture = _ref4.useCapture;
    return (0, _utils.functionalSwitch)(method, {
      document: function document() {
        return (0, _preact.h)(_Document.DocumentTitle, { useCapture: useCapture, side: side });
      },
      face: function face() {
        return (0, _preact.h)(_Face.FaceTitle, { useCapture: useCapture });
      }
    });
  };

  var CaptureMode = function CaptureMode(_ref5) {
    var method = _ref5.method,
        side = _ref5.side,
        useCapture = _ref5.useCapture,
        other = _objectWithoutProperties(_ref5, ['method', 'side', 'useCapture']);

    return (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(Title, { method: method, side: side, useCapture: useCapture }),
      useCapture ? (0, _preact.h)(_Camera2.default, _extends({ method: method }, other)) : (0, _preact.h)(_Uploader.Uploader, _extends({ method: method }, other))
    );
  };

  var CaptureScreen = function CaptureScreen(_ref6) {
    var _classNames;

    var validCaptures = _ref6.validCaptures,
        useCapture = _ref6.useCapture,
        other = _objectWithoutProperties(_ref6, ['validCaptures', 'useCapture']);

    var hasCapture = validCaptures.length > 0;
    return (0, _preact.h)(
      'div',
      {
        className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, _style2.default.camera, useCapture && !hasCapture), _defineProperty(_classNames, _style2.default.uploader, !useCapture && !hasCapture), _classNames))
      },
      (0, _preact.h)(CaptureMode, _extends({ useCapture: useCapture }, other))
    );
  };

  var mapStateToProps = function mapStateToProps(state, props) {
    return { allInvalid: _core.selectors.allInvalidCaptureSelector(state, props),
      validCaptures: _core.selectors.currentValidCaptures(state, props),
      unprocessedCaptures: _core.selectors.unprocessedCaptures(state, props) };
  };

  exports.default = (0, _reactRedux.connect)(mapStateToProps)(Capture);
  module.exports = exports['default'];
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(0), __webpack_require__(104), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('preact'), require('./capture.js'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.preact, global.capture, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (module, exports, _assign, _preact, _capture, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _capture2 = _interopRequireDefault(_capture);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var DocumentCapture = function DocumentCapture(props) {
    return (0, _preact.h)(_capture2.default, _extends({ autoCapture: true }, props));
  };

  DocumentCapture.defaultProps = {
    useWebcam: false,
    method: 'document'
  };

  var FrontDocumentCapture = function FrontDocumentCapture(options) {
    return (0, _preact.h)(DocumentCapture, options);
  };
  FrontDocumentCapture.defaultProps = { side: 'front' };

  var BackDocumentCapture = function BackDocumentCapture(options) {
    return (0, _preact.h)(DocumentCapture, options);
  };

  BackDocumentCapture.defaultProps = { side: 'back' };

  var FaceCapture = function FaceCapture(options) {
    return (0, _preact.h)(_capture2.default, _extends({ autoCapture: false }, options));
  };

  FaceCapture.defaultProps = {
    useWebcam: true,
    method: 'face',
    side: null
  };

  exports.default = {
    FrontDocumentCapture: (0, _Tracker.appendToTracking)(FrontDocumentCapture, 'front_capture'),
    BackDocumentCapture: (0, _Tracker.appendToTracking)(BackDocumentCapture, 'back_capture'),
    FaceCapture: (0, _Tracker.appendToTracking)(FaceCapture, 'capture')
  };
  module.exports = exports['default'];
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(0), __webpack_require__(20), __webpack_require__(254), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('../Theme/style.css'), require('./style.css'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.preact, global.style, global.style, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (module, exports, _defineProperty, _setPrototypeOf, _create, _getPrototypeOf, _preact, _style, _style3, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Complete = function (_Component) {
    _inherits(Complete, _Component);

    function Complete(props) {
      _classCallCheck(this, Complete);

      return _possibleConstructorReturn(this, (Complete.__proto__ || (0, _getPrototypeOf2.default)(Complete)).call(this, props));
    }

    _createClass(Complete, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.nextStep();
      }
    }, {
      key: 'render',
      value: function render(_ref) {
        var message = _ref.message,
            submessage = _ref.submessage;

        return (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'div',
            { className: _style2.default.step },
            (0, _preact.h)('span', { className: _style2.default.icon + '  ' + _style4.default.icon }),
            (0, _preact.h)(
              'h1',
              { className: _style2.default.title + ' ' + _style2.default.center },
              message
            ),
            (0, _preact.h)(
              'p',
              { className: _style2.default["mbottom-large"] + ' ' + _style2.default.center },
              submessage
            )
          )
        );
      }
    }]);

    return Complete;
  }(_preact.Component);

  Complete.defaultProps = {
    message: 'Verification complete',
    submessage: 'Thank you.'
  };

  exports.default = (0, _Tracker.trackComponent)(Complete);
  module.exports = exports['default'];
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(0), __webpack_require__(224), __webpack_require__(21), __webpack_require__(98)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('pdfobject'), require('../utils'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.preact, global.pdfobject, global.utils, global.style);
    global.PdfPreview = mod.exports;
  }
})(this, function (module, exports, _defineProperty, _setPrototypeOf, _create, _getPrototypeOf, _preact, _pdfobject, _utils, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _pdfobject2 = _interopRequireDefault(_pdfobject);

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var IEPdfBlobLink = function IEPdfBlobLink(_ref) {
    var blob = _ref.blob;

    // Object urls created from Blobs don't work on IE11 and Edge, so we use this component as a fallback
    // Without this component PDFObject would display an error instead of the expected PDFObject link fallback.
    var downloadPDF = function downloadPDF() {
      window.navigator.msSaveOrOpenBlob(blob, 'document.pdf');
    };
    return (0, _preact.h)('a', { href: '#',
      onClick: (0, _utils.preventDefaultOnClick)(downloadPDF),
      className: _style2.default.pdfIcon
    });
  };

  var i = 0;

  var PDFPreview = function (_Component) {
    _inherits(PDFPreview, _Component);

    function PDFPreview(props) {
      _classCallCheck(this, PDFPreview);

      var _this = _possibleConstructorReturn(this, (PDFPreview.__proto__ || (0, _getPrototypeOf2.default)(PDFPreview)).call(this, props));

      _this.options = {
        width: '92%',
        height: '290px',
        'max-height': '70vh',
        border: 0,
        fallbackLink: '<a href=\'[url]\' class=' + _style2.default.pdfIcon + ' download/>'
      };

      _this.id = 'pdfContainer' + i++;
      return _this;
    }

    _createClass(PDFPreview, [{
      key: 'embedPDF',
      value: function embedPDF(previewUrl) {
        _pdfobject2.default.embed(previewUrl, '#' + this.id, this.options);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var previewUrl = this.props.previewUrl;

        this.embedPDF(previewUrl);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        return false;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(_ref2) {
        var previewUrl = _ref2.previewUrl;

        if (this.props.pdfPreview !== previewUrl) this.embedPDF(previewUrl);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _preact.h)('div', { id: this.id });
      }
    }]);

    return PDFPreview;
  }(_preact.Component);

  var PdfViewer = function (_Component2) {
    _inherits(PdfViewer, _Component2);

    function PdfViewer() {
      _classCallCheck(this, PdfViewer);

      return _possibleConstructorReturn(this, (PdfViewer.__proto__ || (0, _getPrototypeOf2.default)(PdfViewer)).apply(this, arguments));
    }

    _createClass(PdfViewer, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        return false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            blob = _props.blob,
            previewUrl = _props.previewUrl;

        return (0, _preact.h)(
          'div',
          null,
          window.navigator.msSaveOrOpenBlob ? (0, _preact.h)(IEPdfBlobLink, { blob: blob }) : (0, _preact.h)(PDFPreview, { previewUrl: previewUrl })
        );
      }
    }]);

    return PdfViewer;
  }(_preact.Component);

  exports.default = PdfViewer;
  module.exports = exports['default'];
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(38), __webpack_require__(37), __webpack_require__(130), __webpack_require__(4), __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(0), __webpack_require__(25), __webpack_require__(35), __webpack_require__(20), __webpack_require__(98), __webpack_require__(74), __webpack_require__(44), __webpack_require__(21), __webpack_require__(117), __webpack_require__(107), __webpack_require__(111), __webpack_require__(114), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/is-iterable'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/object/entries'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('../../core'), require('react-redux'), require('../Theme/style.css'), require('./style.css'), require('classnames'), require('../utils/file'), require('../utils'), require('../utils/onfidoApi'), require('./PdfPreview'), require('../Error'), require('../Spinner'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isIterable, global.getIterator, global.entries, global.assign, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.preact, global.core, global.reactRedux, global.style, global.style, global.classnames, global.file, global.utils, global.onfidoApi, global.PdfPreview, global.Error, global.Spinner, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (exports, _isIterable2, _getIterator2, _entries, _assign, _defineProperty2, _setPrototypeOf, _create, _getPrototypeOf, _preact, _core, _reactRedux, _style, _style3, _classnames, _file, _utils, _onfidoApi, _PdfPreview, _Error, _Spinner, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FaceConfirm = exports.DocumentBackConfrim = exports.DocumentFrontConfirm = undefined;

  var _isIterable3 = _interopRequireDefault(_isIterable2);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _entries2 = _interopRequireDefault(_entries);

  var _assign2 = _interopRequireDefault(_assign);

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _PdfPreview2 = _interopRequireDefault(_PdfPreview);

  var _Error2 = _interopRequireDefault(_Error);

  var _Spinner2 = _interopRequireDefault(_Spinner);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty3.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var CaptureViewerPure = function CaptureViewerPure(_ref) {
    var _ref$capture = _ref.capture,
        blob = _ref$capture.blob,
        base64 = _ref$capture.base64,
        previewUrl = _ref$capture.previewUrl;
    return (0, _preact.h)(
      'div',
      { className: _style4.default.captures },
      (0, _file.isOfFileType)(['pdf'], blob) ? (0, _preact.h)(_PdfPreview2.default, { previewUrl: previewUrl, blob: blob }) : (0, _preact.h)('img', { className: _style4.default.image
        //we use base64 if the capture is a File, since its base64 version is exif rotated
        //if it's not a File (just a Blob), it means it comes from the webcam,
        //so the base64 version is actually lossy and since no rotation is necessary
        //the blob is the best candidate in this case
        , src: blob instanceof File ? base64 : previewUrl
      })
    );
  };

  var CaptureViewer = function (_Component) {
    _inherits(CaptureViewer, _Component);

    function CaptureViewer(props) {
      _classCallCheck(this, CaptureViewer);

      var _this = _possibleConstructorReturn(this, (CaptureViewer.__proto__ || (0, _getPrototypeOf2.default)(CaptureViewer)).call(this, props));

      _initialiseProps.call(_this);

      var blob = props.capture.blob;

      _this.state = _this.previewUrlState(blob);
      return _this;
    }

    _createClass(CaptureViewer, [{
      key: 'updateBlobPreview',
      value: function updateBlobPreview(blob) {
        this.revokePreviewURL();
        this.setState(this.previewUrlState(blob));
      }
    }, {
      key: 'revokePreviewURL',
      value: function revokePreviewURL() {
        URL.revokeObjectURL(this.state.previewUrl);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(_ref2) {
        var blob = _ref2.capture.blob;

        if (this.props.capture.blob !== blob) this.updateBlobPreview(blob);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.revokePreviewURL();
      }
    }, {
      key: 'render',
      value: function render() {
        var capture = this.props.capture;

        return (0, _preact.h)(CaptureViewerPure, {
          capture: _extends({}, capture, {
            previewUrl: this.state.previewUrl
          }) });
      }
    }]);

    return CaptureViewer;
  }(_preact.Component);

  var _initialiseProps = function _initialiseProps() {
    this.previewUrlState = function (blob) {
      return blob ? { previewUrl: URL.createObjectURL(blob) } : {};
    };
  };

  var PreviewHeader = function PreviewHeader() {
    return (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(
        'h1',
        { className: _style2.default.title },
        'Confirm capture'
      ),
      (0, _preact.h)(
        'p',
        null,
        'Please confirm that you are happy with this photo.'
      )
    );
  };

  var RetakeAction = function RetakeAction(_ref3) {
    var retakeAction = _ref3.retakeAction;
    return (0, _preact.h)(
      'button',
      { onClick: retakeAction,
        className: _style2.default.btn + ' ' + _style4.default["btn-outline"] },
      'Take again'
    );
  };

  var ConfirmAction = function ConfirmAction(_ref4) {
    var confirmAction = _ref4.confirmAction,
        error = _ref4.error;
    return (0, _preact.h)(
      'a',
      { href: '#', className: _style2.default.btn + ' ' + _style2.default["btn-primary"],
        onClick: (0, _utils.preventDefaultOnClick)(confirmAction) },
      error.type === 'warn' ? 'Continue' : 'Confirm'
    );
  };

  var Actions = function Actions(_ref5) {
    var retakeAction = _ref5.retakeAction,
        confirmAction = _ref5.confirmAction,
        error = _ref5.error;
    return (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(
        'div',
        { className: (0, _classnames2.default)(_style2.default.actions, _style4.default.actions, _defineProperty({}, _style4.default.error, error.type === 'error')) },
        (0, _preact.h)(RetakeAction, { retakeAction: retakeAction }),
        error.type === 'error' ? null : (0, _preact.h)(ConfirmAction, { confirmAction: confirmAction, error: error })
      )
    );
  };

  var Previews = function Previews(_ref6) {
    var capture = _ref6.capture,
        retakeAction = _ref6.retakeAction,
        confirmAction = _ref6.confirmAction,
        error = _ref6.error;
    return (0, _preact.h)(
      'div',
      { className: _style2.default.previews + ' ' + _style2.default.step },
      error.type ? (0, _preact.h)(_Error2.default, { error: error }) : (0, _preact.h)(PreviewHeader, null),
      (0, _preact.h)(CaptureViewer, { capture: capture }),
      (0, _preact.h)(Actions, { retakeAction: retakeAction, confirmAction: confirmAction, error: error })
    );
  };

  var ProcessingApiRequest = function ProcessingApiRequest() {
    return (0, _preact.h)(
      'div',
      { className: _style2.default.center },
      (0, _preact.h)(_Spinner2.default, null)
    );
  };

  var Confirm = function (_Component2) {
    _inherits(Confirm, _Component2);

    function Confirm(props) {
      _classCallCheck(this, Confirm);

      var _this2 = _possibleConstructorReturn(this, (Confirm.__proto__ || (0, _getPrototypeOf2.default)(Confirm)).call(this, props));

      _this2.onGlareWarning = function () {
        _this2.setWarning('GLARE_DETECTED');
      };

      _this2.setError = function (name) {
        return _this2.setState({ error: { name: name, type: 'error' } });
      };

      _this2.setWarning = function (name) {
        return _this2.setState({ error: { name: name, type: 'warn' } });
      };

      _this2.onfidoErrorFieldMap = function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            key = _ref8[0],
            val = _ref8[1];

        if (key === 'document_detection') return 'INVALID_CAPTURE';
        // on corrupted PDF or other unsupported file types
        if (key === 'file') return 'INVALID_TYPE';
        // hit on PDF/invalid file type submission for face detection
        if (key === 'attachment' || key === 'attachment_content_type') return 'UNSUPPORTED_FILE';
        if (key === 'face_detection') {
          return val[0].indexOf('Multiple faces') === -1 ? 'NO_FACE_ERROR' : 'MULTIPLE_FACES_ERROR';
        }
      };

      _this2.onfidoErrorReduce = function (_ref9) {
        var fields = _ref9.fields;

        var _Object$entries$map = (0, _entries2.default)(fields).map(_this2.onfidoErrorFieldMap),
            _Object$entries$map2 = _slicedToArray(_Object$entries$map, 1),
            first = _Object$entries$map2[0];

        return first;
      };

      _this2.onApiError = function (_ref10) {
        var status = _ref10.status,
            response = _ref10.response;

        var errorKey = void 0;
        if (status === 422) {
          errorKey = _this2.onfidoErrorReduce(response.error);
        } else {
          (0, _Tracker.sendError)(status + ' - ' + response);
          errorKey = 'SERVER_ERROR';
        }

        _this2.setState({ uploadInProgress: false });
        _this2.setError(errorKey);
      };

      _this2.onApiSuccess = function (apiResponse) {
        _this2.setState({ onfidoId: apiResponse.id });
        var warnings = apiResponse.sdk_warnings;
        if (warnings && !warnings.detect_glare.valid) {
          _this2.onGlareWarning();
        } else {
          _this2.confirmAndProceed(apiResponse);
        }
        _this2.setState({ uploadInProgress: false });
      };

      _this2.confirmEvent = function (method, side) {
        if (method === 'document') {
          if (side === 'front') _core.events.emit('documentCapture');else if (side === 'back') _core.events.emit('documentBackCapture');
        } else if (method === 'face') _core.events.emit('faceCapture');
      };

      _this2.confirmAndProceed = function () {
        var _this2$props = _this2.props,
            method = _this2$props.method,
            side = _this2$props.side,
            nextStep = _this2$props.nextStep,
            confirmCapture = _this2$props.actions.confirmCapture;

        confirmCapture({ method: method, id: _this2.state.captureId, onfidoId: _this2.state.onfidoId });
        _this2.confirmEvent(method, side);
        nextStep();
      };

      _this2.uploadCaptureToOnfido = function () {
        _this2.setState({ uploadInProgress: true });
        var _this2$props2 = _this2.props,
            validCaptures = _this2$props2.validCaptures,
            method = _this2$props2.method,
            side = _this2$props2.side,
            token = _this2$props2.token;
        var _validCaptures$ = validCaptures[0],
            blob = _validCaptures$.blob,
            documentType = _validCaptures$.documentType,
            id = _validCaptures$.id;

        _this2.setState({ captureId: id });

        if (method === 'document') {
          var data = { file: blob, type: documentType, side: side };
          (0, _onfidoApi.uploadDocument)(data, token, _this2.onApiSuccess, _this2.onApiError);
        } else if (method === 'face') {
          var _data = { file: blob };
          (0, _onfidoApi.uploadLivePhoto)(_data, token, _this2.onApiSuccess, _this2.onApiError);
        }
      };

      _this2.onConfirm = function () {
        _this2.state.error.type === 'warn' ? _this2.confirmAndProceed() : _this2.uploadCaptureToOnfido();
      };

      _this2.render = function (_ref11) {
        var validCaptures = _ref11.validCaptures,
            previousStep = _ref11.previousStep;
        return _this2.state.uploadInProgress ? (0, _preact.h)(ProcessingApiRequest, null) : (0, _preact.h)(Previews, {
          capture: validCaptures[0],
          retakeAction: function retakeAction() {
            previousStep();
          },
          confirmAction: _this2.onConfirm,
          error: _this2.state.error
        });
      };

      _this2.state = {
        uploadInProgress: false,
        error: {},
        captureId: null,
        onfidoId: null
      };
      return _this2;
    }

    return Confirm;
  }(_preact.Component);

  var mapStateToProps = function mapStateToProps(state, props) {
    return {
      validCaptures: _core.selectors.currentValidCaptures(state, props),
      unprocessedCaptures: _core.selectors.unprocessedCaptures(state, props)
    };
  };

  var TrackedConfirmComponent = (0, _Tracker.trackComponentAndMode)(Confirm, 'confirmation', 'error');

  var MapConfirm = (0, _reactRedux.connect)(mapStateToProps)(TrackedConfirmComponent);

  var DocumentFrontWrapper = function DocumentFrontWrapper(props) {
    return (0, _preact.h)(MapConfirm, _extends({}, props, { method: 'document', side: 'front' }));
  };

  var DocumentBackWrapper = function DocumentBackWrapper(props) {
    return (0, _preact.h)(MapConfirm, _extends({}, props, { method: 'document', side: 'back' }));
  };

  var FaceConfirm = function FaceConfirm(props) {
    return (0, _preact.h)(MapConfirm, _extends({}, props, { method: 'face' }));
  };

  var DocumentFrontConfirm = (0, _Tracker.appendToTracking)(DocumentFrontWrapper, 'front');
  var DocumentBackConfrim = (0, _Tracker.appendToTracking)(DocumentBackWrapper, 'back');

  exports.DocumentFrontConfirm = DocumentFrontConfirm;
  exports.DocumentBackConfrim = DocumentBackConfrim;
  exports.FaceConfirm = FaceConfirm;
});

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(255)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('preact'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.preact, global.style);
    global.index = mod.exports;
  }
})(this, function (module, exports, _preact, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Countdown = function Countdown() {
    return (0, _preact.h)('span', { className: _style2.default.countdown });
  };

  exports.default = Countdown;
  module.exports = exports['default'];
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(7), __webpack_require__(12), __webpack_require__(10), __webpack_require__(11), __webpack_require__(0), __webpack_require__(257)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/set-prototype-of'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/get-prototype-of'), require('preact'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.defineProperty, global.setPrototypeOf, global.create, global.getPrototypeOf, global.preact, global.style);
    global.index = mod.exports;
  }
})(this, function (module, exports, _defineProperty, _setPrototypeOf, _create, _getPrototypeOf, _preact, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty2 = _interopRequireDefault(_defineProperty);

  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

  var _create2 = _interopRequireDefault(_create);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  }

  // The value of these options must match the API document types.
  // See https://documentation.onfido.com/#document-types
  var defaultOptions = [{
    value: 'passport',
    label: 'Passport',
    icon: 'icon-passport'
  }, {
    value: 'driving_licence',
    label: 'Driver\'s License',
    icon: 'icon-license'
  }, {
    value: 'national_identity_card',
    label: 'Identity Card',
    icon: 'icon-identity'
  }];

  var DocumentSelector = function (_Component) {
    _inherits(DocumentSelector, _Component);

    function DocumentSelector() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, DocumentSelector);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DocumentSelector.__proto__ || (0, _getPrototypeOf2.default)(DocumentSelector)).call.apply(_ref, [this].concat(args))), _this), _this.getOptions = function () {
        var types = _this.props.types;

        var options = defaultOptions.filter(function (option) {
          return types.indexOf(option.value) >= 0;
        });

        // If no valid options passed, default to all options
        return options.length === 0 ? defaultOptions : options;
      }, _this.handleSelect = function (e, value) {
        e.stopPropagation();

        var _this$props = _this.props,
            setDocumentType = _this$props.setDocumentType,
            nextStep = _this$props.nextStep;

        setDocumentType(value);
        nextStep();
      }, _this.renderOption = function (option) {
        return (0, _preact.h)(
          'div',
          {
            'class': _style2.default.option,
            onClick: function onClick(e) {
              return _this.handleSelect(e, option.value);
            }
          },
          (0, _preact.h)('div', { 'class': _style2.default.icon + ' ' + _style2.default[option.icon] }),
          (0, _preact.h)(
            'span',
            null,
            option.label
          )
        );
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DocumentSelector, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var options = this.getOptions();

        return (0, _preact.h)(
          'div',
          { 'class': _style2.default.selector },
          options.map(function (op) {
            return _this2.renderOption(op);
          })
        );
      }
    }]);

    return DocumentSelector;
  }(_preact.Component);

  exports.default = DocumentSelector;
  module.exports = exports['default'];
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(68), __webpack_require__(258)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('preact'), require('../strings/errors'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.preact, global.errors, global.style);
    global.index = mod.exports;
  }
})(this, function (module, exports, _preact, _errors, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Error = function Error(_ref) {
    var error = _ref.error;

    var errorText = _errors.errors[error.name];
    var errorType = error.type === 'error' ? 'error' : 'warning';
    return (0, _preact.h)(
      'div',
      { className: _style2.default['container-' + errorType] },
      (0, _preact.h)(
        'div',
        { className: _style2.default.title },
        (0, _preact.h)('span', { className: _style2.default['title-icon-' + errorType] }),
        (0, _preact.h)(
          'span',
          { className: _style2.default['title-text'] },
          errorText.message
        )
      ),
      (0, _preact.h)(
        'p',
        { className: _style2.default.instruction },
        errorText.instruction
      )
    );
  };

  exports.default = Error;
  module.exports = exports['default'];
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(26), __webpack_require__(129), __webpack_require__(0), __webpack_require__(116), __webpack_require__(113), __webpack_require__(105), __webpack_require__(108), __webpack_require__(106)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/array/from'), require('babel-runtime/core-js/array/includes'), require('preact'), require('../Welcome'), require('../Select'), require('../Capture'), require('../Confirm'), require('../Complete'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.from, global.includes, global.preact, global.Welcome, global.Select, global.Capture, global.Confirm, global.Complete);
    global.StepComponentMap = mod.exports;
  }
})(this, function (exports, _from, _includes, _preact, _Welcome, _Select, _Capture, _Confirm, _Complete) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createComponentList = undefined;

  var _from2 = _interopRequireDefault(_from);

  var _includes2 = _interopRequireDefault(_includes);

  var _Welcome2 = _interopRequireDefault(_Welcome);

  var _Select2 = _interopRequireDefault(_Select);

  var _Complete2 = _interopRequireDefault(_Complete);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return (0, _from2.default)(arr);
    }
  }

  var createComponentList = exports.createComponentList = function createComponentList(steps, documentType) {
    var mapSteps = function mapSteps(step) {
      return createComponent(step, documentType);
    };
    return shallowFlatten(steps.map(mapSteps));
  };

  var createComponent = function createComponent(step, documentType) {
    var stepMap = {
      welcome: function welcome() {
        return [_Welcome2.default];
      },
      face: function face() {
        return [_Capture.FaceCapture, _Confirm.FaceConfirm];
      },
      document: function document() {
        return createDocumentComponents(documentType);
      },
      complete: function complete() {
        return [_Complete2.default];
      }
    };
    var type = step.type;

    if (!(type in stepMap)) {
      console.error('No such step: ' + type);
    }
    return stepMap[type]().map(wrapComponent(step));
  };

  var createDocumentComponents = function createDocumentComponents(documentType) {
    var double_sided_docs = ['driving_licence', 'national_identity_card'];
    var frontDocumentFlow = [_Select2.default, _Capture.FrontDocumentCapture, _Confirm.DocumentFrontConfirm];
    if ((0, _includes2.default)(double_sided_docs, documentType)) {
      return [].concat(frontDocumentFlow, [_Capture.BackDocumentCapture, _Confirm.DocumentBackConfrim]);
    }
    return frontDocumentFlow;
  };

  var wrapComponent = function wrapComponent(step) {
    return function (component) {
      return { component: component, step: step };
    };
  };

  var shallowFlatten = function shallowFlatten(list) {
    var _ref;

    return (_ref = []).concat.apply(_ref, _toConsumableArray(list));
  };
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(0), __webpack_require__(20), __webpack_require__(261), __webpack_require__(110), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('preact'), require('../Theme/style.css'), require('./style.css'), require('../DocumentSelector'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.preact, global.style, global.style, global.DocumentSelector, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (module, exports, _assign, _preact, _style, _style3, _DocumentSelector, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  var _DocumentSelector2 = _interopRequireDefault(_DocumentSelector);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var Select = function Select(props) {
    var setDocumentType = props.actions.setDocumentType,
        _props$data = props.data,
        title = _props$data.title,
        hint = _props$data.hint,
        types = props.types;

    return (0, _preact.h)(
      'div',
      { className: _style4.default.wrapper },
      (0, _preact.h)(
        'div',
        { className: _style4.default.methods + ' ' + _style2.default.step },
        (0, _preact.h)(
          'h1',
          { className: _style2.default.title },
          title
        ),
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'p',
            { className: _style2.default["mbottom-large"] },
            hint
          ),
          (0, _preact.h)(_DocumentSelector2.default, _extends({
            setDocumentType: setDocumentType }, props, {
            types: types
          }))
        )
      )
    );
  };

  Select.defaultProps = {
    data: {
      hint: 'Select the type of document you would like to upload',
      title: 'Verify your identity'
    },
    types: []
  };

  exports.default = (0, _Tracker.trackComponent)(Select, 'type_select');
  module.exports = exports['default'];
});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(262)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('preact'), require('./style.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.preact, global.style);
    global.index = mod.exports;
  }
})(this, function (module, exports, _preact, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _style2 = _interopRequireDefault(_style);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Spinner = function Spinner() {
    return (0, _preact.h)(
      'div',
      { className: _style2.default.loader },
      (0, _preact.h)(
        'div',
        { className: _style2.default.inner },
        (0, _preact.h)('div', null),
        (0, _preact.h)('div', null),
        (0, _preact.h)('div', null)
      )
    );
  };

  exports.default = Spinner;
  module.exports = exports['default'];
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(38), __webpack_require__(37), __webpack_require__(0), __webpack_require__(91), __webpack_require__(20), __webpack_require__(263), __webpack_require__(68), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/is-iterable'), require('babel-runtime/core-js/get-iterator'), require('preact'), require('react-dropzone'), require('../Theme/style.css'), require('./style.css'), require('../strings/errors'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isIterable, global.getIterator, global.preact, global.reactDropzone, global.style, global.style, global.errors, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (exports, _isIterable2, _getIterator2, _preact, _reactDropzone, _style, _style3, _errors, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Uploader = undefined;

  var _isIterable3 = _interopRequireDefault(_isIterable2);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var UploadInstructions = function UploadInstructions(_ref) {
    var error = _ref.error;
    return (0, _preact.h)(
      'div',
      { className: _style4.default.base },
      (0, _preact.h)('span', { className: _style2.default.icon + ' ' + _style4.default.icon }),
      (0, _preact.h)(
        'p',
        { className: _style4.default.text },
        'Take a photo with your camera or upload one from your library.'
      ),
      (0, _preact.h)(UploadError, { error: _errors.errors[error.name] })
    );
  };

  var UploadError = function UploadError(_ref2) {
    var error = _ref2.error;
    return error && (0, _preact.h)(
      'div',
      { className: _style4.default.text + ' ' + _style4.default.error },
      error.message + '. ' + error.instruction + '.'
    );
  };

  var UploaderPure = function UploaderPure(_ref3) {
    var onImageSelected = _ref3.onImageSelected,
        error = _ref3.error;
    return (0, _preact.h)(
      _reactDropzone2.default,
      {
        onDrop: function onDrop(_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
              file = _ref5[0];

          //removes a memory leak created by react-dropzone
          URL.revokeObjectURL(file.preview);
          delete file.preview;
          onImageSelected(file);
        },
        multiple: false,
        className: _style4.default.dropzone
      },
      (0, _preact.h)(UploadInstructions, { error: error })
    );
  };

  var Uploader = exports.Uploader = (0, _Tracker.trackComponentAndMode)(UploaderPure, 'file_upload', 'error');
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(20), __webpack_require__(264), __webpack_require__(21), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('preact'), require('../Theme/style.css'), require('./style.css'), require('../utils'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.preact, global.style, global.style, global.utils, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (module, exports, _preact, _style, _style3, _utils, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _style2 = _interopRequireDefault(_style);

  var _style4 = _interopRequireDefault(_style3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Welcome = function Welcome(_ref) {
    var title = _ref.title,
        descriptions = _ref.descriptions,
        nextButton = _ref.nextButton,
        nextStep = _ref.nextStep;
    return (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(
        'div',
        { className: _style2.default.step },
        (0, _preact.h)(
          'h1',
          { className: _style2.default.title },
          title
        ),
        (0, _preact.h)(
          'div',
          { className: _style4.default['mtop-large'] + ' ' + _style2.default["mbottom-large"] },
          descriptions.map(function (description) {
            return (0, _preact.h)(
              'p',
              null,
              description
            );
          })
        ),
        (0, _preact.h)(
          'a',
          {
            href: '',
            className: _style2.default.btn + ' ' + _style2.default["btn-centered"] + ' ' + _style2.default["btn-primary"],
            onClick: (0, _utils.preventDefaultOnClick)(nextStep) },
          nextButton
        )
      )
    );
  };

  Welcome.defaultProps = {
    title: 'Open your new bank account',
    descriptions: ['To open a bank account, we will need to verify your identity.', 'It will only take a couple of minutes.'],
    nextButton: 'Verify Identity'
  };

  exports.default = (0, _Tracker.trackComponent)(Welcome);
  module.exports = exports['default'];
});

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4), __webpack_require__(46), __webpack_require__(71), __webpack_require__(34), __webpack_require__(44)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/json/stringify'), require('../utils/http'), require('object-loops/for-each'), require('../utils/file.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assign, global.stringify, global.http, global.forEach, global.file);
    global.onfidoApi = mod.exports;
  }
})(this, function (exports, _assign, _stringify, _http, _forEach, _file) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.uploadLivePhoto = exports.uploadDocument = undefined;

  var _assign2 = _interopRequireDefault(_assign);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _forEach2 = _interopRequireDefault(_forEach);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var formatError = function formatError(_ref, onError) {
    var response = _ref.response,
        status = _ref.status;
    return onError({ status: status, response: JSON.parse(response) });
  };

  var sdkValidations = function sdkValidations(data) {
    var detectDocument = { 'detect_document': 'error' };
    if (!(0, _file.isOfFileType)(['pdf'], data.file)) return _extends({}, detectDocument, { 'detect_glare': 'warn' });
    return detectDocument;
  };

  var uploadDocument = exports.uploadDocument = function uploadDocument(data, token, onSuccess, onError) {
    var validations = sdkValidations(data);
    data = _extends({}, data, {
      sdk_validations: (0, _stringify2.default)(validations)
    });
    var endpoint = "https://api.onfido.com" + '/v2/documents';
    sendFile(endpoint, data, token, onSuccess, onError);
  };

  var uploadLivePhoto = exports.uploadLivePhoto = function uploadLivePhoto(data, token, onSuccess, onError) {
    var endpoint = "https://api.onfido.com" + '/v2/live_photos';
    sendFile(endpoint, data, token, onSuccess, onError);
  };

  var objectToFormData = function objectToFormData(object) {
    var formData = new FormData();
    (0, _forEach2.default)(object, function (value, key) {
      return formData.append(key, value);
    });
    return formData;
  };

  var sendFile = function sendFile(endpoint, data, token, onSuccess, onError) {
    data = _extends({}, data, {
      sdk_source: 'onfido_web_sdk',
      sdk_version: "1.1.0"
    });

    var requestParams = {
      payload: objectToFormData(data),
      endpoint: endpoint,
      token: 'Bearer ' + token
    };
    (0, _http.performHttpReq)(requestParams, onSuccess, function (request) {
      return formatError(request, onError);
    });
  };
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.randomString = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var randomId = function randomId() {
    return Math.random().toString(36).substring(7);
  };

  exports.default = randomId;
  module.exports = exports["default"];
});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(71), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../utils/http'), require('../../Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.http, global.Tracker);
    global.sdkBackend = mod.exports;
  }
})(this, function (exports, _http, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.postToBackend = undefined;

  var _Tracker2 = _interopRequireDefault(_Tracker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var handleError = function handleError(_ref, callback) {
    var status = _ref.status,
        response = _ref.response;

    console.error(status, response);
    _Tracker2.default.sendError(status + ' - ' + response);
    callback();
  };

  var postToBackend = exports.postToBackend = function postToBackend(payload, token, onSuccess, errorCallback) {
    var endpoint = "https://sdk.onfido.com" + '/validate_document';
    var options = {
      payload: payload, endpoint: endpoint, token: token,
      contentType: 'application/json'
    };
    (0, _http.performHttpReq)(options, onSuccess, function (response) {
      return handleError(response, errorCallback);
    });
  };
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(204), __webpack_require__(45), __webpack_require__(72)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('eventemitter2'), require('../store/store'), require('../store/selectors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.eventemitter2, global.store, global.selectors);
    global.events = mod.exports;
  }
})(this, function (module, exports, _eventemitter, _store, _selectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _eventemitter2 = _interopRequireDefault(_eventemitter);

  var _store2 = _interopRequireDefault(_store);

  var selectors = _interopRequireWildcard(_selectors);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var events = new _eventemitter2.default();

  //these methods have been bounded to their object, since they will be used
  //more than once and inside of other functions too
  var getState = function getState() {
    return _store2.default.getState();
  };
  var getCaptures = function getCaptures() {
    return selectors.confirmedCaptures(getState());
  };
  events.getCaptures = getCaptures;

  exports.default = events;
  module.exports = exports['default'];
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4), __webpack_require__(36)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/assign'), require('../../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assign, global.constants);
    global.captures = mod.exports;
  }
})(this, function (exports, _assign, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.deleteCaptures = exports.confirmCapture = exports.validateCapture = exports.createCapture = undefined;

  var _assign2 = _interopRequireDefault(_assign);

  var constants = _interopRequireWildcard(_constants);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var identity = function identity(a) {
    return a;
  };

  //follows https://github.com/acdlite/redux-actions design
  var createAction = function createAction(type, payloadCreator) {
    return function (payload) {
      return {
        type: type,
        payload: (payloadCreator || identity)(payload)
      };
    };
  };

  var createCapture = exports.createCapture = createAction(constants.CAPTURE_CREATE, function (payload) {
    return _extends({ maxCaptures: 3 }, payload);
  });
  var validateCapture = exports.validateCapture = createAction(constants.CAPTURE_VALIDATE, function (payload) {
    return _extends({ valid: true }, payload);
  });
  var confirmCapture = exports.confirmCapture = createAction(constants.CAPTURE_CONFIRM);
  var deleteCaptures = exports.deleteCaptures = createAction(constants.CAPTURE_DELETE);
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(36)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.constants);
    global.globals = mod.exports;
  }
})(this, function (exports, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setDocumentType = setDocumentType;

  var constants = _interopRequireWildcard(_constants);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function setDocumentType(payload) {
    return {
      type: constants.SET_DOCUMENT_TYPE,
      payload: payload
    };
  }
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4), __webpack_require__(32), __webpack_require__(45), __webpack_require__(122), __webpack_require__(121)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/assign'), require('redux'), require('../store'), require('./globals'), require('./captures'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assign, global.redux, global.store, global.globals, global.captures);
    global.index = mod.exports;
  }
})(this, function (exports, _assign, _redux, _store, _globals, _captures) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.actions = exports.unboundActions = undefined;

  var _assign2 = _interopRequireDefault(_assign);

  var _store2 = _interopRequireDefault(_store);

  var globals = _interopRequireWildcard(_globals);

  var captures = _interopRequireWildcard(_captures);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var unboundActions = exports.unboundActions = _extends({}, globals, captures);
  var actions = exports.actions = (0, _redux.bindActionCreators)(unboundActions, _store2.default.dispatch);
});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(26), __webpack_require__(7), __webpack_require__(4), __webpack_require__(36)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/array/from'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/core-js/object/assign'), require('../../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.from, global.defineProperty, global.assign, global.constants);
    global.captures = mod.exports;
  }
})(this, function (exports, _from, _defineProperty2, _assign, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.captures = captures;

  var _from2 = _interopRequireDefault(_from);

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _assign2 = _interopRequireDefault(_assign);

  var constants = _interopRequireWildcard(_constants);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return (0, _from2.default)(arr);
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      (0, _defineProperty3.default)(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var initialState = {
    document: [],
    face: []
  };

  var changeCapturesThatMatchValidator = function changeCapturesThatMatchValidator(captures, validator, newCaptureDiffState) {
    return captures.map(function (capture) {
      return validator(capture) ? _extends({}, capture, newCaptureDiffState) : capture;
    });
  };

  function captures() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var payload = action.payload || {};
    var captureType = payload.method;
    var captures = state[captureType];

    var changeStateWithNewCaptures = function changeStateWithNewCaptures(newCaptureState) {
      return _extends({}, state, _defineProperty({}, captureType, newCaptureState));
    };
    var changeCapturesThatMatchPayloadId = changeCapturesThatMatchValidator.bind(this, captures, function (capture) {
      return capture.id === payload.id;
    });

    switch (action.type) {
      case constants.CAPTURE_CREATE:
        {
          var maxCaptures = payload.maxCaptures,
              capture = payload.capture;

          var oldCaptures = captures.slice(0, maxCaptures - 1);
          return changeStateWithNewCaptures([capture].concat(_toConsumableArray(oldCaptures)));
        }
      case constants.CAPTURE_VALIDATE:
        {
          var validatedCaptures = changeCapturesThatMatchPayloadId({ valid: payload.valid, processed: true });
          return changeStateWithNewCaptures(validatedCaptures);
        }
      case constants.CAPTURE_CONFIRM:
        {
          var confirmedCaptures = changeCapturesThatMatchPayloadId({ confirmed: true, onfidoId: payload.onfidoId });
          return changeStateWithNewCaptures(confirmedCaptures);
        }
      case constants.CAPTURE_DELETE:
        {
          // Only delete the captures with the side specified in the payload.
          var differentSideCaptures = captures.filter(function (capture) {
            return capture.side !== payload.side;
          });
          return changeStateWithNewCaptures(differentSideCaptures);
        }
      default:
        {
          return state;
        }
    }
  }
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(36)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('../../constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.constants);
    global.globals = mod.exports;
  }
})(this, function (module, exports, _assign, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = globals;

  var _assign2 = _interopRequireDefault(_assign);

  var constants = _interopRequireWildcard(_constants);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var initialState = {
    documentType: null
  };

  function globals() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
      case constants.SET_DOCUMENT_TYPE:
        return _extends({}, state, { documentType: action.payload });
      default:
        return state;
    }
  }
  module.exports = exports['default'];
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(32), __webpack_require__(124), __webpack_require__(125)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('redux'), require('./captures'), require('./globals'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.redux, global.captures, global.globals);
    global.index = mod.exports;
  }
})(this, function (module, exports, _redux, _captures, _globals) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _globals2 = _interopRequireDefault(_globals);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _redux.combineReducers)({
    captures: _captures.captures,
    globals: _globals2.default
  });
  module.exports = exports['default'];
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(65), __webpack_require__(64), __webpack_require__(4), __webpack_require__(0), __webpack_require__(35), __webpack_require__(25), __webpack_require__(100), __webpack_require__(101), __webpack_require__(34), __webpack_require__(42), __webpack_require__(102), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/symbol/iterator'), require('babel-runtime/core-js/symbol'), require('babel-runtime/core-js/object/assign'), require('preact'), require('react-redux'), require('./core'), require('./components/Modal'), require('./components/Router'), require('object-loops/for-each'), require('object-loops/map'), require('object-loops/map-keys'), require('./Tracker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.iterator, global.symbol, global.assign, global.preact, global.reactRedux, global.core, global.Modal, global.Router, global.forEach, global.map, global.mapKeys, global.Tracker);
    global.index = mod.exports;
  }
})(this, function (module, exports, _iterator, _symbol, _assign, _preact, _reactRedux, _core, _Modal, _Router, _forEach, _map, _mapKeys, _Tracker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _iterator2 = _interopRequireDefault(_iterator);

  var _symbol2 = _interopRequireDefault(_symbol);

  var _assign2 = _interopRequireDefault(_assign);

  var _Modal2 = _interopRequireDefault(_Modal);

  var _Router2 = _interopRequireDefault(_Router);

  var _forEach2 = _interopRequireDefault(_forEach);

  var _map2 = _interopRequireDefault(_map);

  var _mapKeys2 = _interopRequireDefault(_mapKeys);

  var _Tracker2 = _interopRequireDefault(_Tracker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
  };

  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  _Tracker2.default.setUp();

  var ModalApp = function ModalApp(_ref) {
    var _ref$options = _ref.options,
        useModal = _ref$options.useModal,
        isModalOpen = _ref$options.isModalOpen,
        buttonId = _ref$options.buttonId,
        otherOptions = _objectWithoutProperties(_ref$options, ['useModal', 'isModalOpen', 'buttonId']),
        otherProps = _objectWithoutProperties(_ref, ['options']);

    return (0, _preact.h)(
      _Modal2.default,
      _extends({ useModal: useModal, buttonId: buttonId }, { isOpen: isModalOpen }),
      (0, _preact.h)(_Router2.default, _extends({ options: otherOptions }, otherProps))
    );
  };

  var Container = function Container(_ref2) {
    var options = _ref2.options;
    return (0, _preact.h)(
      _reactRedux.Provider,
      { store: _core.store },
      (0, _preact.h)(ModalApp, { options: options })
    );
  };

  /**
   * Renders the Onfido component
   *
   * @param {DOMelement} [merge] preact requires the element which was created from the first render to be passed as 3rd argument for a rerender
   * @returns {DOMelement} Element which was generated from render
   */
  var onfidoRender = function onfidoRender(options, el, merge) {
    return (0, _preact.render)((0, _preact.h)(Container, { options: options }), el, merge);
  };

  var stripOneCapture = function stripOneCapture(_ref3) {
    var blob = _ref3.blob,
        documentType = _ref3.documentType,
        onfidoId = _ref3.onfidoId,
        side = _ref3.side;

    var capture = { id: onfidoId, blob: blob };
    if (documentType) capture.documentType = documentType;
    if (side) capture.side = side;
    return capture;
  };

  var stripCapturesHash = function stripCapturesHash(captures) {
    return (0, _map2.default)(captures, function (capture) {
      return capture ? stripOneCapture(capture) : null;
    });
  };

  var getCaptures = function getCaptures() {
    return (0, _mapKeys2.default)(stripCapturesHash(_core.events.getCaptures()), function (key) {
      return key + 'Capture';
    });
  };

  function bindEvents(options) {
    var eventListenersMap = {
      documentCapture: function documentCapture() {
        return options.onDocumentCapture(getCaptures().documentCapture);
      },
      documentBackCapture: function documentBackCapture() {
        return options.onDocumentCapture(getCaptures().documentBackCapture);
      },
      faceCapture: function faceCapture() {
        return options.onFaceCapture(getCaptures().faceCapture);
      },
      complete: function complete() {
        var captures = getCaptures();

        var takenCaptures = (0, _map2.default)(captures, function (value) {
          return !!value;
        });
        _Tracker2.default.sendEvent('completed flow', takenCaptures);

        options.onComplete(captures);
      }
    };

    (0, _forEach2.default)(eventListenersMap, function (listener, event) {
      return _core.events.on(event, listener);
    });
    return eventListenersMap;
  }

  function unbindEvents(eventListenersMap) {
    (0, _forEach2.default)(eventListenersMap, function (listener, event) {
      _core.events.off(event, listener);
    });
  }

  function rebindEvents(newOptions, previousEventListenersMap) {
    if (previousEventListenersMap) unbindEvents(previousEventListenersMap);
    return bindEvents(newOptions);
  }

  var Onfido = {};

  Onfido.getCaptures = function () {
    return getCaptures();
  };

  var noOp = function noOp() {};

  var defaults = {
    token: 'some token',
    buttonId: 'onfido-button',
    containerId: 'onfido-mount',
    onReady: noOp,
    onDocumentCapture: noOp,
    onFaceCapture: noOp,
    onComplete: noOp
  };

  var isStep = function isStep(val) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
  };
  var formatStep = function formatStep(typeOrStep) {
    return isStep(typeOrStep) ? typeOrStep : { type: typeOrStep };
  };

  var formatOptions = function formatOptions(_ref4) {
    var steps = _ref4.steps,
        otherOptions = _objectWithoutProperties(_ref4, ['steps']);

    return _extends({}, otherOptions, {
      steps: (steps || ['welcome', 'document', 'face', 'complete']).map(formatStep)
    });
  };

  Onfido.init = function (opts) {
    console.log("onfido_sdk_version", "1.1.0");
    _Tracker2.default.track();
    var options = formatOptions(_extends({}, defaults, opts));
    var eventListenersMap = bindEvents(options);

    var containerEl = document.getElementById(options.containerId);
    var element = onfidoRender(options, containerEl);

    return {
      options: options,
      element: element,
      eventListenersMap: eventListenersMap,
      setOptions: function setOptions(changedOptions) {
        this.options = formatOptions(_extends({}, this.options, changedOptions));
        this.eventListenersMap = rebindEvents(this.options, this.eventListenersMap);
        this.element = onfidoRender(this.options, containerEl, this.element);
        return this.options;
      },
      tearDown: function tearDown() {
        // TODO should use a actions.resetState() once onfido-sdk-core has been merged
        // See https://github.com/onfido/onfido-sdk-ui/issues/158
        [{ method: 'document', side: 'front' }, { method: 'document', side: 'back' }, { method: 'face', side: null }].forEach(_core.actions.deleteCaptures);

        (0, _preact.render)(null, containerEl, this.element);
      }
    };
  };

  exports.default = Onfido;
  module.exports = exports['default'];
});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Exif Parser
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(27), __webpack_require__(73)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./load-image'), require('./load-image-meta'))
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
}(function (loadImage) {
  'use strict'

  loadImage.ExifMap = function () {
    return this
  }

  loadImage.ExifMap.prototype.map = {
    'Orientation': 0x0112
  }

  loadImage.ExifMap.prototype.get = function (id) {
    return this[id] || this[this.map[id]]
  }

  loadImage.getExifThumbnail = function (dataView, offset, length) {
    var hexData,
      i,
      b
    if (!length || offset + length > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid thumbnail data.')
      return
    }
    hexData = []
    for (i = 0; i < length; i += 1) {
      b = dataView.getUint8(offset + i)
      hexData.push((b < 16 ? '0' : '') + b.toString(16))
    }
    return 'data:image/jpeg,%' + hexData.join('%')
  }

  loadImage.exifTagTypes = {
    // byte, 8-bit unsigned int:
    1: {
      getValue: function (dataView, dataOffset) {
        return dataView.getUint8(dataOffset)
      },
      size: 1
    },
    // ascii, 8-bit byte:
    2: {
      getValue: function (dataView, dataOffset) {
        return String.fromCharCode(dataView.getUint8(dataOffset))
      },
      size: 1,
      ascii: true
    },
    // short, 16 bit int:
    3: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getUint16(dataOffset, littleEndian)
      },
      size: 2
    },
    // long, 32 bit int:
    4: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getUint32(dataOffset, littleEndian)
      },
      size: 4
    },
    // rational = two long values, first is numerator, second is denominator:
    5: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getUint32(dataOffset, littleEndian) /
        dataView.getUint32(dataOffset + 4, littleEndian)
      },
      size: 8
    },
    // slong, 32 bit signed int:
    9: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getInt32(dataOffset, littleEndian)
      },
      size: 4
    },
    // srational, two slongs, first is numerator, second is denominator:
    10: {
      getValue: function (dataView, dataOffset, littleEndian) {
        return dataView.getInt32(dataOffset, littleEndian) /
        dataView.getInt32(dataOffset + 4, littleEndian)
      },
      size: 8
    }
  }
  // undefined, 8-bit byte, value depending on field:
  loadImage.exifTagTypes[7] = loadImage.exifTagTypes[1]

  loadImage.getExifValue = function (dataView, tiffOffset, offset, type, length, littleEndian) {
    var tagType = loadImage.exifTagTypes[type]
    var tagSize
    var dataOffset
    var values
    var i
    var str
    var c
    if (!tagType) {
      console.log('Invalid Exif data: Invalid tag type.')
      return
    }
    tagSize = tagType.size * length
    // Determine if the value is contained in the dataOffset bytes,
    // or if the value at the dataOffset is a pointer to the actual data:
    dataOffset = tagSize > 4
      ? tiffOffset + dataView.getUint32(offset + 8, littleEndian)
      : (offset + 8)
    if (dataOffset + tagSize > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid data offset.')
      return
    }
    if (length === 1) {
      return tagType.getValue(dataView, dataOffset, littleEndian)
    }
    values = []
    for (i = 0; i < length; i += 1) {
      values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian)
    }
    if (tagType.ascii) {
      str = ''
      // Concatenate the chars:
      for (i = 0; i < values.length; i += 1) {
        c = values[i]
        // Ignore the terminating NULL byte(s):
        if (c === '\u0000') {
          break
        }
        str += c
      }
      return str
    }
    return values
  }

  loadImage.parseExifTag = function (dataView, tiffOffset, offset, littleEndian, data) {
    var tag = dataView.getUint16(offset, littleEndian)
    data.exif[tag] = loadImage.getExifValue(
      dataView,
      tiffOffset,
      offset,
      dataView.getUint16(offset + 2, littleEndian), // tag type
      dataView.getUint32(offset + 4, littleEndian), // tag length
      littleEndian
    )
  }

  loadImage.parseExifTags = function (dataView, tiffOffset, dirOffset, littleEndian, data) {
    var tagsNumber,
      dirEndOffset,
      i
    if (dirOffset + 6 > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid directory offset.')
      return
    }
    tagsNumber = dataView.getUint16(dirOffset, littleEndian)
    dirEndOffset = dirOffset + 2 + 12 * tagsNumber
    if (dirEndOffset + 4 > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid directory size.')
      return
    }
    for (i = 0; i < tagsNumber; i += 1) {
      this.parseExifTag(
        dataView,
        tiffOffset,
        dirOffset + 2 + 12 * i, // tag offset
        littleEndian,
        data
      )
    }
    // Return the offset to the next directory:
    return dataView.getUint32(dirEndOffset, littleEndian)
  }

  loadImage.parseExifData = function (dataView, offset, length, data, options) {
    if (options.disableExif) {
      return
    }
    var tiffOffset = offset + 10
    var littleEndian
    var dirOffset
    var thumbnailData
    // Check for the ASCII code for "Exif" (0x45786966):
    if (dataView.getUint32(offset + 4) !== 0x45786966) {
      // No Exif data, might be XMP data instead
      return
    }
    if (tiffOffset + 8 > dataView.byteLength) {
      console.log('Invalid Exif data: Invalid segment size.')
      return
    }
    // Check for the two null bytes:
    if (dataView.getUint16(offset + 8) !== 0x0000) {
      console.log('Invalid Exif data: Missing byte alignment offset.')
      return
    }
    // Check the byte alignment:
    switch (dataView.getUint16(tiffOffset)) {
      case 0x4949:
        littleEndian = true
        break
      case 0x4D4D:
        littleEndian = false
        break
      default:
        console.log('Invalid Exif data: Invalid byte alignment marker.')
        return
    }
    // Check for the TIFF tag marker (0x002A):
    if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
      console.log('Invalid Exif data: Missing TIFF marker.')
      return
    }
    // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
    dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian)
    // Create the exif object to store the tags:
    data.exif = new loadImage.ExifMap()
    // Parse the tags of the main image directory and retrieve the
    // offset to the next directory, usually the thumbnail directory:
    dirOffset = loadImage.parseExifTags(
      dataView,
      tiffOffset,
      tiffOffset + dirOffset,
      littleEndian,
      data
    )
    if (dirOffset && !options.disableExifThumbnail) {
      thumbnailData = {exif: {}}
      dirOffset = loadImage.parseExifTags(
        dataView,
        tiffOffset,
        tiffOffset + dirOffset,
        littleEndian,
        thumbnailData
      )
      // Check for JPEG Thumbnail offset:
      if (thumbnailData.exif[0x0201]) {
        data.exif.Thumbnail = loadImage.getExifThumbnail(
          dataView,
          tiffOffset + thumbnailData.exif[0x0201],
          thumbnailData.exif[0x0202] // Thumbnail data length
        )
      }
    }
    // Check for Exif Sub IFD Pointer:
    if (data.exif[0x8769] && !options.disableExifSub) {
      loadImage.parseExifTags(
        dataView,
        tiffOffset,
        tiffOffset + data.exif[0x8769], // directory offset
        littleEndian,
        data
      )
    }
    // Check for GPS Info IFD Pointer:
    if (data.exif[0x8825] && !options.disableExifGps) {
      loadImage.parseExifTags(
        dataView,
        tiffOffset,
        tiffOffset + data.exif[0x8825], // directory offset
        littleEndian,
        data
      )
    }
  }

  // Registers the Exif parser for the APP1 JPEG meta data segment:
  loadImage.metaDataParsers.jpeg[0xffe1].push(loadImage.parseExifData)

  // Adds the following properties to the parseMetaData callback data:
  // * exif: The exif tags, parsed by the parseExifData method

  // Adds the following options to the parseMetaData method:
  // * disableExif: Disables Exif parsing.
  // * disableExifThumbnail: Disables parsing of the Exif Thumbnail.
  // * disableExifSub: Disables parsing of the Exif Sub IFD.
  // * disableExifGps: Disables parsing of the Exif GPS Info IFD.
}))


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Orientation
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(27), __webpack_require__(133), __webpack_require__(73)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    factory(
      require('./load-image'),
      require('./load-image-scale'),
      require('./load-image-meta')
    )
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
}(function (loadImage) {
  'use strict'

  var originalHasCanvasOption = loadImage.hasCanvasOption
  var originalHasMetaOption = loadImage.hasMetaOption
  var originalTransformCoordinates = loadImage.transformCoordinates
  var originalGetTransformedOptions = loadImage.getTransformedOptions

  // Determines if the target image should be a canvas element:
  loadImage.hasCanvasOption = function (options) {
    return !!options.orientation ||
      originalHasCanvasOption.call(loadImage, options)
  }

  // Determines if meta data should be loaded automatically:
  loadImage.hasMetaOption = function (options) {
    return options && options.orientation === true ||
      originalHasMetaOption.call(loadImage, options)
  }

  // Transform image orientation based on
  // the given EXIF orientation option:
  loadImage.transformCoordinates = function (canvas, options) {
    originalTransformCoordinates.call(loadImage, canvas, options)
    var ctx = canvas.getContext('2d')
    var width = canvas.width
    var height = canvas.height
    var styleWidth = canvas.style.width
    var styleHeight = canvas.style.height
    var orientation = options.orientation
    if (!orientation || orientation > 8) {
      return
    }
    if (orientation > 4) {
      canvas.width = height
      canvas.height = width
      canvas.style.width = styleHeight
      canvas.style.height = styleWidth
    }
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(width, 0)
        ctx.scale(-1, 1)
        break
      case 3:
        // 180° rotate left
        ctx.translate(width, height)
        ctx.rotate(Math.PI)
        break
      case 4:
        // vertical flip
        ctx.translate(0, height)
        ctx.scale(1, -1)
        break
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.scale(1, -1)
        break
      case 6:
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(0, -height)
        break
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI)
        ctx.translate(width, -height)
        ctx.scale(-1, 1)
        break
      case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI)
        ctx.translate(-width, 0)
        break
    }
  }

  // Transforms coordinate and dimension options
  // based on the given orientation option:
  loadImage.getTransformedOptions = function (img, opts, data) {
    var options = originalGetTransformedOptions.call(loadImage, img, opts)
    var orientation = options.orientation
    var newOptions
    var i
    if (orientation === true && data && data.exif) {
      orientation = data.exif.get('Orientation')
    }
    if (!orientation || orientation > 8 || orientation === 1) {
      return options
    }
    newOptions = {}
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        newOptions[i] = options[i]
      }
    }
    newOptions.orientation = orientation
    switch (orientation) {
      case 2:
        // horizontal flip
        newOptions.left = options.right
        newOptions.right = options.left
        break
      case 3:
        // 180° rotate left
        newOptions.left = options.right
        newOptions.top = options.bottom
        newOptions.right = options.left
        newOptions.bottom = options.top
        break
      case 4:
        // vertical flip
        newOptions.top = options.bottom
        newOptions.bottom = options.top
        break
      case 5:
        // vertical flip + 90 rotate right
        newOptions.left = options.top
        newOptions.top = options.left
        newOptions.right = options.bottom
        newOptions.bottom = options.right
        break
      case 6:
        // 90° rotate right
        newOptions.left = options.top
        newOptions.top = options.right
        newOptions.right = options.bottom
        newOptions.bottom = options.left
        break
      case 7:
        // horizontal flip + 90 rotate right
        newOptions.left = options.bottom
        newOptions.top = options.right
        newOptions.right = options.top
        newOptions.bottom = options.left
        break
      case 8:
        // 90° rotate left
        newOptions.left = options.bottom
        newOptions.top = options.left
        newOptions.right = options.top
        newOptions.bottom = options.right
        break
    }
    if (newOptions.orientation > 4) {
      newOptions.maxWidth = options.maxHeight
      newOptions.maxHeight = options.maxWidth
      newOptions.minWidth = options.minHeight
      newOptions.minHeight = options.minWidth
      newOptions.sourceWidth = options.sourceHeight
      newOptions.sourceHeight = options.sourceWidth
    }
    return newOptions
  }
}))


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image Scaling
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

;(function (factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(27)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./load-image'))
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
}(function (loadImage) {
  'use strict'

  var originalTransform = loadImage.transform

  loadImage.transform = function (img, options, callback, file, data) {
    originalTransform.call(
      loadImage,
      loadImage.scale(img, options, data),
      options,
      callback,
      file,
      data
    )
  }

  // Transform image coordinates, allows to override e.g.
  // the canvas orientation based on the orientation option,
  // gets canvas, options passed as arguments:
  loadImage.transformCoordinates = function () {
    return
  }

  // Returns transformed options, allows to override e.g.
  // maxWidth, maxHeight and crop options based on the aspectRatio.
  // gets img, options passed as arguments:
  loadImage.getTransformedOptions = function (img, options) {
    var aspectRatio = options.aspectRatio
    var newOptions
    var i
    var width
    var height
    if (!aspectRatio) {
      return options
    }
    newOptions = {}
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        newOptions[i] = options[i]
      }
    }
    newOptions.crop = true
    width = img.naturalWidth || img.width
    height = img.naturalHeight || img.height
    if (width / height > aspectRatio) {
      newOptions.maxWidth = height * aspectRatio
      newOptions.maxHeight = height
    } else {
      newOptions.maxWidth = width
      newOptions.maxHeight = width / aspectRatio
    }
    return newOptions
  }

  // Canvas render method, allows to implement a different rendering algorithm:
  loadImage.renderImageToCanvas = function (
    canvas,
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destX,
    destY,
    destWidth,
    destHeight
  ) {
    canvas.getContext('2d').drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      destWidth,
      destHeight
    )
    return canvas
  }

  // Determines if the target image should be a canvas element:
  loadImage.hasCanvasOption = function (options) {
    return options.canvas || options.crop || !!options.aspectRatio
  }

  // Scales and/or crops the given image (img or canvas HTML element)
  // using the given options.
  // Returns a canvas object if the browser supports canvas
  // and the hasCanvasOption method returns true or a canvas
  // object is passed as image, else the scaled image:
  loadImage.scale = function (img, options, data) {
    options = options || {}
    var canvas = document.createElement('canvas')
    var useCanvas = img.getContext ||
                    (loadImage.hasCanvasOption(options) && canvas.getContext)
    var width = img.naturalWidth || img.width
    var height = img.naturalHeight || img.height
    var destWidth = width
    var destHeight = height
    var maxWidth
    var maxHeight
    var minWidth
    var minHeight
    var sourceWidth
    var sourceHeight
    var sourceX
    var sourceY
    var pixelRatio
    var downsamplingRatio
    var tmp
    function scaleUp () {
      var scale = Math.max(
        (minWidth || destWidth) / destWidth,
        (minHeight || destHeight) / destHeight
      )
      if (scale > 1) {
        destWidth *= scale
        destHeight *= scale
      }
    }
    function scaleDown () {
      var scale = Math.min(
        (maxWidth || destWidth) / destWidth,
        (maxHeight || destHeight) / destHeight
      )
      if (scale < 1) {
        destWidth *= scale
        destHeight *= scale
      }
    }
    if (useCanvas) {
      options = loadImage.getTransformedOptions(img, options, data)
      sourceX = options.left || 0
      sourceY = options.top || 0
      if (options.sourceWidth) {
        sourceWidth = options.sourceWidth
        if (options.right !== undefined && options.left === undefined) {
          sourceX = width - sourceWidth - options.right
        }
      } else {
        sourceWidth = width - sourceX - (options.right || 0)
      }
      if (options.sourceHeight) {
        sourceHeight = options.sourceHeight
        if (options.bottom !== undefined && options.top === undefined) {
          sourceY = height - sourceHeight - options.bottom
        }
      } else {
        sourceHeight = height - sourceY - (options.bottom || 0)
      }
      destWidth = sourceWidth
      destHeight = sourceHeight
    }
    maxWidth = options.maxWidth
    maxHeight = options.maxHeight
    minWidth = options.minWidth
    minHeight = options.minHeight
    if (useCanvas && maxWidth && maxHeight && options.crop) {
      destWidth = maxWidth
      destHeight = maxHeight
      tmp = sourceWidth / sourceHeight - maxWidth / maxHeight
      if (tmp < 0) {
        sourceHeight = maxHeight * sourceWidth / maxWidth
        if (options.top === undefined && options.bottom === undefined) {
          sourceY = (height - sourceHeight) / 2
        }
      } else if (tmp > 0) {
        sourceWidth = maxWidth * sourceHeight / maxHeight
        if (options.left === undefined && options.right === undefined) {
          sourceX = (width - sourceWidth) / 2
        }
      }
    } else {
      if (options.contain || options.cover) {
        minWidth = maxWidth = maxWidth || minWidth
        minHeight = maxHeight = maxHeight || minHeight
      }
      if (options.cover) {
        scaleDown()
        scaleUp()
      } else {
        scaleUp()
        scaleDown()
      }
    }
    if (useCanvas) {
      pixelRatio = options.pixelRatio
      if (pixelRatio > 1) {
        canvas.style.width = destWidth + 'px'
        canvas.style.height = destHeight + 'px'
        destWidth *= pixelRatio
        destHeight *= pixelRatio
        canvas.getContext('2d').scale(pixelRatio, pixelRatio)
      }
      downsamplingRatio = options.downsamplingRatio
      if (downsamplingRatio > 0 && downsamplingRatio < 1 &&
            destWidth < sourceWidth && destHeight < sourceHeight) {
        while (sourceWidth * downsamplingRatio > destWidth) {
          canvas.width = sourceWidth * downsamplingRatio
          canvas.height = sourceHeight * downsamplingRatio
          loadImage.renderImageToCanvas(
            canvas,
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            canvas.width,
            canvas.height
          )
          sourceX = 0
          sourceY = 0
          sourceWidth = canvas.width
          sourceHeight = canvas.height
          img = document.createElement('canvas')
          img.width = sourceWidth
          img.height = sourceHeight
          loadImage.renderImageToCanvas(
            img,
            canvas,
            0,
            0,
            sourceWidth,
            sourceHeight,
            0,
            0,
            sourceWidth,
            sourceHeight
          )
        }
      }
      canvas.width = destWidth
      canvas.height = destHeight
      loadImage.transformCoordinates(
        canvas,
        options
      )
      return loadImage.renderImageToCanvas(
        canvas,
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        destWidth,
        destHeight
      )
    }
    img.width = destWidth
    img.height = destHeight
    return img
  }
}))


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
module.exports = __webpack_require__(1).Array.filter;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(173);
module.exports = __webpack_require__(1).Array.from;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(182);
module.exports = __webpack_require__(1).Array.includes;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(41);
module.exports = __webpack_require__(170);


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(41);
module.exports = __webpack_require__(171);


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(175);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(176);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(177);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(183);
module.exports = __webpack_require__(1).Object.entries;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(178);
module.exports = __webpack_require__(1).Object.getPrototypeOf;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(179);
module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(181);
__webpack_require__(180);
__webpack_require__(184);
__webpack_require__(185);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(62);
module.exports = __webpack_require__(61).f('iterator');


/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(39);
var IObject = __webpack_require__(50);
var toObject = __webpack_require__(31);
var toLength = __webpack_require__(58);
var asc = __webpack_require__(151);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var isArray = __webpack_require__(80);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(150);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(14);
var createDesc = __webpack_require__(30);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(29);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(13).document;
module.exports = document && document.documentElement;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(24);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(15);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(52);
var descriptor = __webpack_require__(30);
var setToStringTag = __webpack_require__(54);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(22)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(40)('meta');
var isObject = __webpack_require__(23);
var has = __webpack_require__(18);
var setDesc = __webpack_require__(14).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(17)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(31);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(17)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(14);
var anObject = __webpack_require__(15);
var getKeys = __webpack_require__(28);

module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(83).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(1);
var fails = __webpack_require__(17);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(28);
var toIObject = __webpack_require__(19);
var isEnum = __webpack_require__(29).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(23);
var anObject = __webpack_require__(15);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(39)(Function.call, __webpack_require__(82).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(17);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57);
var defined = __webpack_require__(48);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var get = __webpack_require__(87);
module.exports = __webpack_require__(1).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(77);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(1).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(6);
var $filter = __webpack_require__(149)(2);

$export($export.P + $export.F * !__webpack_require__(167)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(39);
var $export = __webpack_require__(6);
var toObject = __webpack_require__(31);
var call = __webpack_require__(156);
var isArrayIter = __webpack_require__(155);
var toLength = __webpack_require__(58);
var createProperty = __webpack_require__(152);
var getIterFn = __webpack_require__(87);

$export($export.S + $export.F * !__webpack_require__(158)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(75);
var step = __webpack_require__(159);
var Iterators = __webpack_require__(24);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(81)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(161) });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(52) });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(16), 'Object', { defineProperty: __webpack_require__(14).f });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(31);
var $getPrototypeOf = __webpack_require__(84);

__webpack_require__(164)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(166).set });


/***/ }),
/* 180 */
/***/ (function(module, exports) {



/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(13);
var has = __webpack_require__(18);
var DESCRIPTORS = __webpack_require__(16);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(86);
var META = __webpack_require__(160).KEY;
var $fails = __webpack_require__(17);
var shared = __webpack_require__(56);
var setToStringTag = __webpack_require__(54);
var uid = __webpack_require__(40);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(61);
var wksDefine = __webpack_require__(60);
var enumKeys = __webpack_require__(153);
var isArray = __webpack_require__(80);
var anObject = __webpack_require__(15);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(59);
var createDesc = __webpack_require__(30);
var _create = __webpack_require__(52);
var gOPNExt = __webpack_require__(163);
var $GOPD = __webpack_require__(82);
var $DP = __webpack_require__(14);
var $keys = __webpack_require__(28);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(83).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  __webpack_require__(53).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(51)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(22)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(6);
var $includes = __webpack_require__(76)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(75)('includes');


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(6);
var $entries = __webpack_require__(165)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('asyncIterator');


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('observable');


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(a,t){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=t(require,exports,module):a.CountUp=t()}(this,function(a,t,n){var e=function(a,t,n,e,i,r){for(var o=0,s=["webkit","moz","ms","o"],m=0;m<s.length&&!window.requestAnimationFrame;++m)window.requestAnimationFrame=window[s[m]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[m]+"CancelAnimationFrame"]||window[s[m]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,t){var n=(new Date).getTime(),e=Math.max(0,16-(n-o)),i=window.setTimeout(function(){a(n+e)},e);return o=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});var u=this;u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var l in r)r.hasOwnProperty(l)&&(u.options[l]=r[l]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof a?document.getElementById(a):a,u.startVal=Number(t),u.endVal=Number(n),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,e||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(i)||2e3,u.formatNumber=function(a){a=a.toFixed(u.decimals),a+="";var t,n,e,i;if(t=a.split("."),n=t[0],e=t.length>1?u.options.decimal+t[1]:"",i=/(\d+)(\d{3})/,u.options.useGrouping)for(;i.test(n);)n=n.replace(i,"$1"+u.options.separator+"$2");return u.options.prefix+n+e+u.options.suffix},u.easeOutExpo=function(a,t,n,e){return n*(-Math.pow(2,-10*a/e)+1)*1024/1023+t},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(a){var t=u.formattingFn(a);"INPUT"===u.d.tagName?this.d.value=t:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=t:this.d.innerHTML=t},u.count=function(a){u.startTime||(u.startTime=a),u.timestamp=a;var t=a-u.startTime;u.remaining=u.duration-t,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(t,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(t,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(t/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(t/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),t<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(a){return u.callback=a,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=t,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(a){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(a),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)};return e});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Camera-video-overlay {\n  /* Relatively positioned so absolute children are bound to this overlay */\n  position: relative;\n  overflow: hidden;\n  margin-top: -10px;\n  width: 100%;\n}\n.onfido-sdk-ui-Camera-video-overlay:before {\n  content: \"\";\n  display: block;\n  padding-top: 76%;\n}\n.onfido-sdk-ui-Camera-overlay {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  position: absolute;\n}\n.onfido-sdk-ui-Camera-video {\n  max-width: 100%;\n  display: block;\n  position: absolute;\n  width: auto;\n  height: 100%;\n  top: 0;\n  margin: auto;\n  -o-object-fit: cover;\n     object-fit: cover;\n  /*Mirroring transform: scale(-1, 1); */\n}\n.onfido-sdk-ui-Camera-uploadFallback {\n  display: block;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  padding-right: 7px;\n  padding-bottom: 3px;\n}\n.onfido-sdk-ui-Camera-uploadFallback button {\n  /* ref: http://stackoverflow.com/a/12642009/689223 */\n  /* Remove all decorations to look like normal text */\n  background: none;\n  border: none;\n  display: inline;\n  font: inherit;\n  margin: 0;\n  padding: 0;\n  outline: none;\n  outline-offset: 0;\n  /* Additional styles to look like a link */\n  cursor: pointer;\n  /*Custom style*/\n  color: white;\n}\n.onfido-sdk-ui-Camera-uploadFallback button:hover {\n  text-decoration: underline;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Camera/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;ECCE,0EAA0E;EDC1E,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,YAAA;CCCD;ADED;EACE,YAAA;EACA,eAAA;EACA,iBAAA;CCAD;ADGD;EACE,YAAA;EACA,aAAA;EACA,OAAA;EACA,mBAAA;CCDD;ADID;EACE,gBAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,OAAA;EACA,aAAA;EACA,qBAAA;KAAA,kBAAA;ECFA,uCAAuC;CACxC;ADKD;EACE,eAAA;EACA,mBAAA;EACA,UAAA;EACA,SAAA;EACA,mBAAA;EACA,oBAAA;CCHD;ADKC;ECHA,qDAAqD;EACrD,qDAAqD;EDKnD,iBAAA;EACA,aAAA;EACA,gBAAA;EACA,cAAA;EACA,UAAA;EACA,WAAA;EACA,cAAA;EACA,kBAAA;ECHF,2CAA2C;EDKzC,gBAAA;ECHF,gBAAgB;EDMd,aAAA;CCJH;ADKG;EACE,2BAAA;CCHL","file":"style.css","sourcesContent":[".video-overlay {\n  /* Relatively positioned so absolute children are bound to this overlay */\n  position: relative;\n  overflow: hidden;\n  margin-top: -10px;\n  width: 100%;\n}\n\n.video-overlay:before {\n  content: \"\";\n  display: block;\n  padding-top: 76%;\n}\n\n.overlay {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  position: absolute;\n}\n\n.video {\n  max-width: 100%;\n  display: block;\n  position: absolute;\n  width: auto;\n  height: 100%;\n  top: 0;\n  margin: auto;\n  object-fit: cover;\n  /*Mirroring transform: scale(-1, 1); */\n}\n\n.uploadFallback{\n  display: block;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  padding-right: 7px;\n  padding-bottom: 3px;\n\n  & button{\n    /* ref: http://stackoverflow.com/a/12642009/689223 */\n    /* Remove all decorations to look like normal text */\n    background: none;\n    border: none;\n    display: inline;\n    font: inherit;\n    margin: 0;\n    padding: 0;\n    outline: none;\n    outline-offset: 0;\n    /* Additional styles to look like a link */\n    cursor: pointer;\n\n    /*Custom style*/\n    color: white;\n    &:hover{\n      text-decoration: underline;\n    }\n  }\n}\n",".video-overlay {\n  /* Relatively positioned so absolute children are bound to this overlay */\n  position: relative;\n  overflow: hidden;\n  margin-top: -10px;\n  width: 100%;\n}\n.video-overlay:before {\n  content: \"\";\n  display: block;\n  padding-top: 76%;\n}\n.overlay {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  position: absolute;\n}\n.video {\n  max-width: 100%;\n  display: block;\n  position: absolute;\n  width: auto;\n  height: 100%;\n  top: 0;\n  margin: auto;\n  object-fit: cover;\n  /*Mirroring transform: scale(-1, 1); */\n}\n.uploadFallback {\n  display: block;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  padding-right: 7px;\n  padding-bottom: 3px;\n}\n.uploadFallback button {\n  /* ref: http://stackoverflow.com/a/12642009/689223 */\n  /* Remove all decorations to look like normal text */\n  background: none;\n  border: none;\n  display: inline;\n  font: inherit;\n  margin: 0;\n  padding: 0;\n  outline: none;\n  outline-offset: 0;\n  /* Additional styles to look like a link */\n  cursor: pointer;\n  /*Custom style*/\n  color: white;\n}\n.uploadFallback button:hover {\n  text-decoration: underline;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"video-overlay": "onfido-sdk-ui-Camera-video-overlay",
	"overlay": "onfido-sdk-ui-Camera-overlay",
	"video": "onfido-sdk-ui-Camera-video",
	"uploadFallback": "onfido-sdk-ui-Camera-uploadFallback"
};

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Capture-camera,\n.onfido-sdk-ui-Capture-uploader {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Capture/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;EACA,mBAAA;CCED","file":"style.css","sourcesContent":[".camera, .uploader {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n}\n",".camera,\n.uploader {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"camera": "onfido-sdk-ui-Capture-camera",
	"uploader": "onfido-sdk-ui-Capture-uploader"
};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Complete-icon {\n  height: 4rem;\n  background-size: contain;\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2247px%22%20height%3D%2243px%22%20viewBox%3D%220%200%2047%2043%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EE5C2839F-CF3B-4CE6-BC83-EE4E41D1604F%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20sketchtool.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2208%22%20transform%3D%22translate%28-697.000000%2C%20-360.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-160%22%20fill%3D%22%23F3F3F3%22%20x%3D%22470%22%20y%3D%22213%22%20width%3D%22500%22%20height%3D%22600%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M713.693755%2C402.826033%20C712.867822%2C402.826033%20712.093511%2C402.516308%20711.525682%2C401.94848%20L698.001041%2C388.010872%20C696.710522%2C386.823594%20696.658901%2C384.810384%20697.8978%2C383.519865%20C699.085077%2C382.229346%20701.098287%2C382.177725%20702.388806%2C383.416624%20L712.299994%2C390.488669%20C712.867822%2C391.004877%20713.745376%2C390.901635%20714.209962%2C390.282186%20L737.697412%2C361.271314%20C738.729828%2C359.877553%20740.743038%2C359.567829%20742.136798%2C360.651865%20C743.530559%2C361.68428%20743.840284%2C363.69749%20742.756248%2C365.091251%20L716.223172%2C401.535513%20C715.655344%2C402.258204%20714.829412%2C402.722791%20713.951859%2C402.774412%20C713.848617%2C402.826033%20713.796996%2C402.826033%20713.693755%2C402.826033%22%20id%3D%22Fill-1%22%20fill%3D%22%239B9B9B%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Complete/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;EACE,aAAA;EACA,yBAAA;EACA,u5DAAA;EACA,mBAAA;EACA,sBAAA;CCCD","file":"style.css","sourcesContent":[".icon {\n  height: 4rem;\n  background-size: contain;\n  background-image: url('assets/complete.svg');\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n",".icon {\n  height: 4rem;\n  background-size: contain;\n  background-image: url('assets/complete.svg');\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"icon": "onfido-sdk-ui-Complete-icon"
};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Confirm-title {\n  padding-bottom: 0px;\n}\n.onfido-sdk-ui-Confirm-captures {\n  margin-bottom: 1.5rem;\n}\n.onfido-sdk-ui-Confirm-image {\n  max-width: 92%;\n  display: block;\n  margin: 0 auto;\n  max-height: 35vh;\n  padding: 0 10px;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Confirm-image {\n    max-width: 100%;\n    max-height: 40vh;\n    padding: 0;\n  }\n}\n.onfido-sdk-ui-Confirm-btn-outline {\n  background-color: transparent;\n  border: solid 1px #ccc;\n  color: #9b9b9b;\n}\n.onfido-sdk-ui-Confirm-actions {\n  padding: 0;\n}\n.onfido-sdk-ui-Confirm-pdfIcon {\n  display: inline-block;\n  width: 100%;\n  height: 180px;\n  max-width: 100%;\n  margin: 0 auto 1rem;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: 20%;\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2264px%22%20%20height%3D%2264px%22%20viewBox%3D%220%200%2064%2064%22%20enable-background%3D%22new%200%200%2064%2064%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%20id%3D%22passport-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22visa-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22support-docs-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22support-docs-empty-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22letter-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22pdf-large%22%3E%20%3Cg%20id%3D%22pdf-outline%22%3E%20%20%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M17%2C55c-1.1%2C0-2-0.9-2-2V11c0-1.1%2C0.9-2%2C2-2h24.4l7.6%2C8.4V53c0%2C1.1-0.9%2C2-2%2C2H17z%22%2F%3E%20%20%3Cpath%20fill%3D%22%232C3E4F%22%20d%3D%22M40.9%2C10l7.1%2C7.8V53c0%2C0.5-0.5%2C1-1%2C1H17c-0.5%2C0-1-0.5-1-1V11c0-0.5%2C0.5-1%2C1-1H40.9%20M41.8%2C8H17%20%20%20c-1.7%2C0-3%2C1.4-3%2C3v42c0%2C1.6%2C1.3%2C3%2C3%2C3h30c1.7%2C0%2C3-1.4%2C3-3V17L41.8%2C8L41.8%2C8z%22%2F%3E%20%3C%2Fg%3E%20%3Cpath%20id%3D%22fold_8_%22%20fill%3D%22none%22%20stroke%3D%22%232C3E4F%22%20stroke-width%3D%222%22%20stroke-miterlimit%3D%2210%22%20d%3D%22M48%2C18h-5c-1.1%2C0-2-0.9-2-2v-6%22%2F%3E%20%3Cg%20id%3D%22pdf-container%22%3E%20%20%3Cpath%20id%3D%22container%22%20fill%3D%22%23F5272E%22%20d%3D%22M53%2C48H28c-0.5%2C0-1-0.5-1-1V37c0-0.5%2C0.5-1%2C1-1h25c0.5%2C0%2C1%2C0.5%2C1%2C1v10%20%20%20C54%2C47.5%2C53.5%2C48%2C53%2C48z%22%2F%3E%20%20%3Cg%20id%3D%22pdf-text%22%3E%20%20%20%3Cpath%20id%3D%22P%22%20fill%3D%22%23FFFFFF%22%20d%3D%22M35.7%2C40.4c0%2C0.8-0.3%2C1.5-0.9%2C1.9c-0.6%2C0.4-1.4%2C0.7-2.5%2C0.7h-0.9v3H30v-8h2.5%20%20%20%20c1.1%2C0%2C1.9%2C0.2%2C2.4%2C0.6C35.4%2C39%2C35.7%2C39.6%2C35.7%2C40.4z%20M31.4%2C41.9h0.7c0.7%2C0%2C1.2-0.1%2C1.6-0.4c0.3-0.2%2C0.5-0.6%2C0.5-1.1%20%20%20%20c0-0.5-0.1-0.8-0.5-1c-0.3-0.2-0.8-0.3-1.4-0.3h-1V41.9z%22%2F%3E%20%20%20%3Cpath%20id%3D%22D%22%20fill%3D%22%23FFFFFF%22%20d%3D%22M44%2C41.9c0%2C1.3-0.4%2C2.3-1.2%2C3c-0.8%2C0.7-1.9%2C1-3.4%2C1H37v-8h2.6c1.4%2C0%2C2.4%2C0.3%2C3.2%2C1%20%20%20%20C43.6%2C39.7%2C44%2C40.7%2C44%2C41.9z%20M42.5%2C42c0-1.9-1-2.9-2.9-2.9h-1.2v5.8h1C41.5%2C44.9%2C42.5%2C43.9%2C42.5%2C42z%22%2F%3E%20%20%20%3Cpath%20id%3D%22F%22%20fill%3D%22%23FFFFFF%22%20d%3D%22M47.4%2C46H46v-8h5v1.1h-3.6v2.5h3.3v1.1h-3.3V46z%22%2F%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22success-tick%22%3E%20%20%3Ccircle%20id%3D%22circle_5_%22%20fill%3D%22%232C3E4F%22%20cx%3D%2216%22%20cy%3D%2211%22%20r%3D%227%22%2F%3E%20%20%3Cpath%20id%3D%22tick_1_%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23FFFFFF%22%20d%3D%22M18.1%2C8.5l-2.9%2C3.1l-0.7-0.8%20%20%20c-0.3-0.3-0.8-0.3-1.2%2C0c-0.3%2C0.3-0.3%2C0.9%2C0%2C1.2l1.3%2C1.4c0.3%2C0.3%2C0.8%2C0.3%2C1.2%2C0l3.5-3.7c0.3-0.3%2C0.3-0.9%2C0-1.2%20%20%20C18.9%2C8.2%2C18.4%2C8.2%2C18.1%2C8.5z%22%2F%3E%20%3C%2Fg%3E%3C%2Fg%3E%3Cg%20id%3D%22certificate-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22ukbrp-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22id-card-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22drivers-licence-large%22%3E%3C%2Fg%3E%3Cg%20id%3D%22national-insurance-card%22%3E%3C%2Fg%3E%3Cg%20id%3D%22passport%22%3E%3C%2Fg%3E%3Cg%20id%3D%22visa%22%3E%3C%2Fg%3E%3Cg%20id%3D%22support-docs%22%3E%3C%2Fg%3E%3Cg%20id%3D%22support-docs-empty%22%3E%3C%2Fg%3E%3Cg%20id%3D%22letter%22%3E%3C%2Fg%3E%3Cg%20id%3D%22certificate%22%3E%3C%2Fg%3E%3Cg%20id%3D%22ukbrp%22%3E%3C%2Fg%3E%3Cg%20id%3D%22id-card%22%3E%3C%2Fg%3E%3Cg%20id%3D%22drivers-licence%22%3E%3C%2Fg%3E%3Cg%20id%3D%22national-insurance-card_1_%22%3E%3C%2Fg%3E%3Cg%20id%3D%22passport-disabled%22%3E%3C%2Fg%3E%3Cg%20id%3D%22support-docs-empty-disabled%22%3E%3C%2Fg%3E%3Cg%20id%3D%22letter-disabled%22%3E%3C%2Fg%3E%3Cg%20id%3D%22certificate-disabled%22%3E%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-Confirm-error {\n  display: block;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Confirm-error {\n    font-size: 11px;\n  }\n}\n.onfido-sdk-ui-Confirm-error .onfido-sdk-ui-Confirm-btn-outline {\n  width: 90%;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Confirm/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAEA;EACE,oBAAA;CCED;ADAD;EACE,sBAAA;CCED;ADCD;EACE,eAAA;EACA,eAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;CCCD;ADAC;EAuCF;IAtCI,gBAAA;IACA,iBAAA;IACA,WAAA;GCGD;CACF;ADAD;EACE,8BAAA;EACA,uBAAA;EACA,eAAA;CCED;ADCD;EACE,WAAA;CCCD;ADED;EACE,sBAAA;EACA,YAAA;EACA,cAAA;EACA,gBAAA;EACA,oBAAA;EAEA,6BAAA;EACA,6BAAA;EACA,qBAAA;EACA,+0HAAA;CCDD;ADID;EACE,eAAA;CCFD;ADGC;EAOF;IANI,gBAAA;GCAD;CACF;ADJD;EAMI,WAAA;CCCH","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.title {\n  padding-bottom: 0px;\n}\n.captures {\n  margin-bottom: 1.5rem;\n}\n\n.image {\n  max-width: 92%;\n  display: block;\n  margin: 0 auto;\n  max-height: 35vh;\n  padding: 0 10px;\n  @media (--small-viewport) {\n    max-width: 100%;\n    max-height: 40vh;\n    padding: 0;\n  }\n}\n\n.btn-outline {\n  background-color: transparent;\n  border: solid 1px #ccc;\n  color: #9b9b9b;\n}\n\n.actions{\n  padding: 0;\n}\n\n.pdfIcon {\n  display: inline-block;\n  width: 100%;\n  height: 180px;\n  max-width: 100%;\n  margin: 0 auto 1rem;\n\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: 20%;\n  background-image: url('assets/pdf-success.svg');\n}\n\n.error {\n  display: block;\n  @media (--small-viewport) {\n    font-size: 11px;\n  }\n  .btn-outline {\n    width: 90%;\n  }\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n.title {\n  padding-bottom: 0px;\n}\n.captures {\n  margin-bottom: 1.5rem;\n}\n.image {\n  max-width: 92%;\n  display: block;\n  margin: 0 auto;\n  max-height: 35vh;\n  padding: 0 10px;\n}\n@media (--small-viewport) {\n  .image {\n    max-width: 100%;\n    max-height: 40vh;\n    padding: 0;\n  }\n}\n.btn-outline {\n  background-color: transparent;\n  border: solid 1px #ccc;\n  color: #9b9b9b;\n}\n.actions {\n  padding: 0;\n}\n.pdfIcon {\n  display: inline-block;\n  width: 100%;\n  height: 180px;\n  max-width: 100%;\n  margin: 0 auto 1rem;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: 20%;\n  background-image: url('assets/pdf-success.svg');\n}\n.error {\n  display: block;\n}\n@media (--small-viewport) {\n  .error {\n    font-size: 11px;\n  }\n}\n.error .btn-outline {\n  width: 90%;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"title": "onfido-sdk-ui-Confirm-title",
	"captures": "onfido-sdk-ui-Confirm-captures",
	"image": "onfido-sdk-ui-Confirm-image",
	"btn-outline": "onfido-sdk-ui-Confirm-btn-outline",
	"actions": "onfido-sdk-ui-Confirm-actions",
	"pdfIcon": "onfido-sdk-ui-Confirm-pdfIcon",
	"error": "onfido-sdk-ui-Confirm-error"
};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Countdown-countdown {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  color: #fff;\n  text-shadow: 0 0 0.35rem rgba(0, 0, 0, 0.7);\n  font-size: 6rem;\n  line-height: 1;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Countdown/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAA;EACA,SAAA;EACA,UAAA;EACA,yCAAA;UAAA,iCAAA;EACA,YAAA;EACA,4CAAA;EACA,gBAAA;EACA,eAAA;CCCD","file":"style.css","sourcesContent":[".countdown {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #fff;\n  text-shadow: 0 0 .35rem rgba(0, 0, 0, 0.7);\n  font-size: 6rem;\n  line-height: 1;\n}\n",".countdown {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #fff;\n  text-shadow: 0 0 0.35rem rgba(0, 0, 0, 0.7);\n  font-size: 6rem;\n  line-height: 1;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"countdown": "onfido-sdk-ui-Countdown-countdown"
};

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Document-capture {\n  width: 100%;\n  padding: 1rem 1.5rem 3rem;\n  color: #9b9b9b;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.onfido-sdk-ui-Document-capture p {\n  margin: 0;\n}\n.onfido-sdk-ui-Document-rectangle {\n  /*\n    From the equation below one can find out @height-percent\n    aspect-ratio = (width-frame * width-percent) / (height-frame * height-percent)\n   */\n  width: 80%;\n  height: 67.94055202%;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Document/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;EACE,YAAA;EACA,0BAAA;EACA,eAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;CCCD;ADED;EACE,UAAA;CCAD;ADGD;ECDE;;;KAGG;EDaH,WAAA;EACA,qBAAA;CCXD","file":"style.css","sourcesContent":[".capture{\n  width: 100%;\n  padding: 1rem 1.5rem 3rem;\n  color: #9b9b9b;\n  display: flex;\n}\n\n.capture p {\n  margin: 0;\n}\n\n.rectangle {\n  //default value of react-webcam https://github.com/cezary/react-webcam\n  @width-frame: 640;\n  @height-frame: 480;\n\n  //Spec of overlay\n  @width-percent: 80%;\n  @aspect-ratio: 1.57;\n\n  /*\n    From the equation below one can find out @height-percent\n    aspect-ratio = (width-frame * width-percent) / (height-frame * height-percent)\n   */\n  @height-percent: (@width-frame * @width-percent) / (@height-frame * @aspect-ratio);\n\n  width: @width-percent;\n  height: @height-percent;\n}\n",".capture {\n  width: 100%;\n  padding: 1rem 1.5rem 3rem;\n  color: #9b9b9b;\n  display: flex;\n}\n.capture p {\n  margin: 0;\n}\n.rectangle {\n  /*\n    From the equation below one can find out @height-percent\n    aspect-ratio = (width-frame * width-percent) / (height-frame * height-percent)\n   */\n  width: 80%;\n  height: 67.94055202%;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"capture": "onfido-sdk-ui-Document-capture",
	"rectangle": "onfido-sdk-ui-Document-rectangle"
};

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-DocumentSelector-option {\n  cursor: pointer;\n  float: left;\n  width: 33.33333333%;\n  padding: 0 9px 0;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-DocumentSelector-option {\n    float: none;\n    margin: 2rem auto;\n    width: 100%;\n  }\n}\n.onfido-sdk-ui-DocumentSelector-icon {\n  width: 124px;\n  max-width: 100%;\n  margin: 0 auto 1rem;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: 50%;\n}\n/*Solution for responsive square https://spin.atomicobject.com/2015/07/14/css-responsive-square/*/\n.onfido-sdk-ui-DocumentSelector-icon:after {\n  content: \"\";\n  display: block;\n  padding-bottom: 100%;\n  /*this is done to compensate later for the increase in border size*/\n  padding-top: 2px;\n  border: 1px solid #dadada;\n  border-radius: 5px;\n}\n.onfido-sdk-ui-DocumentSelector-option:hover .onfido-sdk-ui-DocumentSelector-icon:after {\n  border: solid 2px #20c7a0;\n  padding-top: 0;\n  position: relative;\n}\n.onfido-sdk-ui-DocumentSelector-icon.onfido-sdk-ui-DocumentSelector-icon-passport {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2263px%22%20height%3D%2289px%22%20viewBox%3D%220%200%2063%2089%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EGroup%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Desktop-HD%22%20transform%3D%22translate%28-456.000000%2C%20-322.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate%28456.000000%2C%20322.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M37.322%2C37.1444826%20L32.699%2C37.1444826%20L32.699%2C43.3274826%20L38.493%2C43.3274826%20C38.417%2C41.1514826%2038.012%2C39.0754826%2037.322%2C37.1444826%20L37.322%2C37.1444826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M32.699%2C30.0954826%20L32.699%2C35.6144826%20L36.706%2C35.6144826%20C35.709%2C33.4394826%2034.331%2C31.5544826%2032.699%2C30.0954826%20L32.699%2C30.0954826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M38.494%2C44.8534826%20L32.699%2C44.8534826%20L32.699%2C51.0384826%20L37.323%2C51.0384826%20C38.012%2C49.1074826%2038.417%2C47.0314826%2038.494%2C44.8534826%20L38.494%2C44.8534826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M31.183%2C58.0874826%20L31.183%2C52.5684826%20L27.176%2C52.5684826%20C28.173%2C54.7434826%2029.549%2C56.6284826%2031.183%2C58.0874826%20L31.183%2C58.0874826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M36.706%2C52.5674826%20L32.699%2C52.5674826%20L32.699%2C58.0864826%20C34.333%2C56.6284826%2035.709%2C54.7434826%2036.706%2C52.5674826%20L36.706%2C52.5674826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M43.112%2C35.6154826%20C41.259%2C33.1724826%2038.46%2C31.1984826%2035.186%2C30.4614826%20C36.454%2C31.9304826%2037.554%2C33.7034826%2038.354%2C35.6154826%20L43.112%2C35.6154826%20L43.112%2C35.6154826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M35.187%2C57.7224826%20C38.46%2C56.9844826%2041.26%2C55.0114826%2043.113%2C52.5684826%20L38.356%2C52.5684826%20C37.555%2C54.4804826%2036.454%2C56.2534826%2035.187%2C57.7224826%20L35.187%2C57.7224826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M40.009%2C44.8534826%20C39.938%2C47.0284826%2039.561%2C49.1084826%2038.928%2C51.0314826%20L44.116%2C51.0364826%20C45.168%2C49.1964826%2045.815%2C47.0944826%2045.936%2C44.8534826%20L40.009%2C44.8534826%20L40.009%2C44.8534826%20L40.009%2C44.8534826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M26.56%2C51.0384826%20L31.184%2C51.0384826%20L31.184%2C44.8534826%20L25.39%2C44.8534826%20C25.465%2C47.0314826%2025.87%2C49.1074826%2026.56%2C51.0384826%20L26.56%2C51.0384826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M40.009%2C43.3294826%20L45.936%2C43.3294826%20C45.816%2C41.0864826%2045.169%2C38.9864826%2044.116%2C37.1444826%20L38.928%2C37.1504826%20C39.559%2C39.0744826%2039.937%2C41.1534826%2040.009%2C43.3294826%20L40.009%2C43.3294826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M23.873%2C44.8534826%20L17.946%2C44.8534826%20L17.946%2C44.8534826%20C18.066%2C47.0944826%2018.713%2C49.1964826%2019.766%2C51.0384826%20L24.954%2C51.0334826%20C24.321%2C49.1084826%2023.945%2C47.0274826%2023.873%2C44.8534826%20L23.873%2C44.8534826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M24.953%2C37.1494826%20L19.765%2C37.1434826%20C18.713%2C38.9854826%2018.066%2C41.0864826%2017.945%2C43.3284826%20L23.872%2C43.3284826%20C23.945%2C41.1534826%2024.321%2C39.0744826%2024.953%2C37.1494826%20L24.953%2C37.1494826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M26.56%2C37.1444826%20C25.872%2C39.0744826%2025.465%2C41.1514826%2025.389%2C43.3274826%20L31.183%2C43.3274826%20L31.183%2C37.1444826%20L26.56%2C37.1444826%20L26.56%2C37.1444826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M28.695%2C57.7224826%20C27.428%2C56.2534826%2026.327%2C54.4804826%2025.527%2C52.5684826%20L20.77%2C52.5684826%20C22.623%2C55.0114826%2025.424%2C56.9844826%2028.695%2C57.7224826%20L28.695%2C57.7224826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M28.695%2C30.4604826%20C25.422%2C31.1984826%2022.623%2C33.1714826%2020.769%2C35.6144826%20L25.526%2C35.6144826%20C26.327%2C33.7024826%2027.428%2C31.9284826%2028.695%2C30.4604826%20L28.695%2C30.4604826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M31.183%2C35.6154826%20L31.183%2C30.0964826%20C29.551%2C31.5564826%2028.173%2C33.4414826%2027.176%2C35.6154826%20L31.183%2C35.6154826%20L31.183%2C35.6154826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M59.117%2C0.0914825785%20L4.765%2C0.0914825785%20C2.62%2C0.0914825785%200.882%2C1.82948258%200.882%2C3.97348258%20L0.882%2C84.2084826%20C0.882%2C86.3534826%202.62%2C88.0914826%204.765%2C88.0914826%20L59.118%2C88.0914826%20C61.262%2C88.0914826%2063%2C86.3534826%2063%2C84.2094826%20L63%2C3.97348258%20C63%2C1.82948258%2061.262%2C0.0914825785%2059.117%2C0.0914825785%20L59.117%2C0.0914825785%20Z%20M31.941%2C28.5624826%20C40.517%2C28.5624826%2047.47%2C35.5154826%2047.47%2C44.0914826%20C47.47%2C52.6674826%2040.517%2C59.6204826%2031.941%2C59.6204826%20C23.365%2C59.6204826%2016.412%2C52.6674826%2016.412%2C44.0914826%20C16.412%2C35.5154826%2023.365%2C28.5624826%2031.941%2C28.5624826%20L31.941%2C28.5624826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20fill%3D%22%23F1F8FE%22%20x%3D%2211.9049644%22%20y%3D%2272.3217781%22%20width%3D%2241%22%20height%3D%221%22%20rx%3D%220.5%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20fill%3D%22%23F1F8FE%22%20x%3D%2211.9049644%22%20y%3D%2277.4493031%22%20width%3D%2241%22%20height%3D%221%22%20rx%3D%220.5%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-80%22%20fill%3D%22%23F1F8FE%22%20x%3D%2216%22%20y%3D%228.61571707%22%20width%3D%2231%22%20height%3D%222.50948416%22%20rx%3D%221.25474208%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-80%22%20fill%3D%22%23F1F8FE%22%20x%3D%2221.5760711%22%20y%3D%2214.9430433%22%20width%3D%2220.7543312%22%20height%3D%221%22%20rx%3D%220.5%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-DocumentSelector-option:hover .onfido-sdk-ui-DocumentSelector-icon.onfido-sdk-ui-DocumentSelector-icon-passport {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2263px%22%20height%3D%2289px%22%20viewBox%3D%220%200%2063%2089%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EGroup%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Desktop-HD%22%20transform%3D%22translate%28-456.000000%2C%20-322.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%20transform%3D%22translate%28456.000000%2C%20322.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M37.322%2C37.1444826%20L32.699%2C37.1444826%20L32.699%2C43.3274826%20L38.493%2C43.3274826%20C38.417%2C41.1514826%2038.012%2C39.0754826%2037.322%2C37.1444826%20L37.322%2C37.1444826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M32.699%2C30.0954826%20L32.699%2C35.6144826%20L36.706%2C35.6144826%20C35.709%2C33.4394826%2034.331%2C31.5544826%2032.699%2C30.0954826%20L32.699%2C30.0954826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M38.494%2C44.8534826%20L32.699%2C44.8534826%20L32.699%2C51.0384826%20L37.323%2C51.0384826%20C38.012%2C49.1074826%2038.417%2C47.0314826%2038.494%2C44.8534826%20L38.494%2C44.8534826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M31.183%2C58.0874826%20L31.183%2C52.5684826%20L27.176%2C52.5684826%20C28.173%2C54.7434826%2029.549%2C56.6284826%2031.183%2C58.0874826%20L31.183%2C58.0874826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M36.706%2C52.5674826%20L32.699%2C52.5674826%20L32.699%2C58.0864826%20C34.333%2C56.6284826%2035.709%2C54.7434826%2036.706%2C52.5674826%20L36.706%2C52.5674826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M43.112%2C35.6154826%20C41.259%2C33.1724826%2038.46%2C31.1984826%2035.186%2C30.4614826%20C36.454%2C31.9304826%2037.554%2C33.7034826%2038.354%2C35.6154826%20L43.112%2C35.6154826%20L43.112%2C35.6154826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M35.187%2C57.7224826%20C38.46%2C56.9844826%2041.26%2C55.0114826%2043.113%2C52.5684826%20L38.356%2C52.5684826%20C37.555%2C54.4804826%2036.454%2C56.2534826%2035.187%2C57.7224826%20L35.187%2C57.7224826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M40.009%2C44.8534826%20C39.938%2C47.0284826%2039.561%2C49.1084826%2038.928%2C51.0314826%20L44.116%2C51.0364826%20C45.168%2C49.1964826%2045.815%2C47.0944826%2045.936%2C44.8534826%20L40.009%2C44.8534826%20L40.009%2C44.8534826%20L40.009%2C44.8534826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M26.56%2C51.0384826%20L31.184%2C51.0384826%20L31.184%2C44.8534826%20L25.39%2C44.8534826%20C25.465%2C47.0314826%2025.87%2C49.1074826%2026.56%2C51.0384826%20L26.56%2C51.0384826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M40.009%2C43.3294826%20L45.936%2C43.3294826%20C45.816%2C41.0864826%2045.169%2C38.9864826%2044.116%2C37.1444826%20L38.928%2C37.1504826%20C39.559%2C39.0744826%2039.937%2C41.1534826%2040.009%2C43.3294826%20L40.009%2C43.3294826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M23.873%2C44.8534826%20L17.946%2C44.8534826%20L17.946%2C44.8534826%20C18.066%2C47.0944826%2018.713%2C49.1964826%2019.766%2C51.0384826%20L24.954%2C51.0334826%20C24.321%2C49.1084826%2023.945%2C47.0274826%2023.873%2C44.8534826%20L23.873%2C44.8534826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M24.953%2C37.1494826%20L19.765%2C37.1434826%20C18.713%2C38.9854826%2018.066%2C41.0864826%2017.945%2C43.3284826%20L23.872%2C43.3284826%20C23.945%2C41.1534826%2024.321%2C39.0744826%2024.953%2C37.1494826%20L24.953%2C37.1494826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M26.56%2C37.1444826%20C25.872%2C39.0744826%2025.465%2C41.1514826%2025.389%2C43.3274826%20L31.183%2C43.3274826%20L31.183%2C37.1444826%20L26.56%2C37.1444826%20L26.56%2C37.1444826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M28.695%2C57.7224826%20C27.428%2C56.2534826%2026.327%2C54.4804826%2025.527%2C52.5684826%20L20.77%2C52.5684826%20C22.623%2C55.0114826%2025.424%2C56.9844826%2028.695%2C57.7224826%20L28.695%2C57.7224826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M28.695%2C30.4604826%20C25.422%2C31.1984826%2022.623%2C33.1714826%2020.769%2C35.6144826%20L25.526%2C35.6144826%20C26.327%2C33.7024826%2027.428%2C31.9284826%2028.695%2C30.4604826%20L28.695%2C30.4604826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M31.183%2C35.6154826%20L31.183%2C30.0964826%20C29.551%2C31.5564826%2028.173%2C33.4414826%2027.176%2C35.6154826%20L31.183%2C35.6154826%20L31.183%2C35.6154826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M59.117%2C0.0914825785%20L4.765%2C0.0914825785%20C2.62%2C0.0914825785%200.882%2C1.82948258%200.882%2C3.97348258%20L0.882%2C84.2084826%20C0.882%2C86.3534826%202.62%2C88.0914826%204.765%2C88.0914826%20L59.118%2C88.0914826%20C61.262%2C88.0914826%2063%2C86.3534826%2063%2C84.2094826%20L63%2C3.97348258%20C63%2C1.82948258%2061.262%2C0.0914825785%2059.117%2C0.0914825785%20L59.117%2C0.0914825785%20Z%20M31.941%2C28.5624826%20C40.517%2C28.5624826%2047.47%2C35.5154826%2047.47%2C44.0914826%20C47.47%2C52.6674826%2040.517%2C59.6204826%2031.941%2C59.6204826%20C23.365%2C59.6204826%2016.412%2C52.6674826%2016.412%2C44.0914826%20C16.412%2C35.5154826%2023.365%2C28.5624826%2031.941%2C28.5624826%20L31.941%2C28.5624826%20Z%22%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20fill%3D%22%23F1F8FE%22%20x%3D%2211.9049644%22%20y%3D%2272.3217781%22%20width%3D%2241%22%20height%3D%221%22%20rx%3D%220.5%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20fill%3D%22%23F1F8FE%22%20x%3D%2211.9049644%22%20y%3D%2277.4493031%22%20width%3D%2241%22%20height%3D%221%22%20rx%3D%220.5%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-80%22%20fill%3D%22%23F1F8FE%22%20x%3D%2216%22%20y%3D%228.61571707%22%20width%3D%2231%22%20height%3D%222.50948416%22%20rx%3D%221.25474208%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-80%22%20fill%3D%22%23F1F8FE%22%20x%3D%2221.5760711%22%20y%3D%2214.9430433%22%20width%3D%2220.7543312%22%20height%3D%221%22%20rx%3D%220.5%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-DocumentSelector-icon.onfido-sdk-ui-DocumentSelector-icon-identity {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2282px%22%20height%3D%2252px%22%20viewBox%3D%220%200%2082%2052%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EB1819F19-251B-4135-8B81-3983F35580E2%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20sketchtool.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20rx%3D%225%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20maskContentUnits%3D%22userSpaceOnUse%22%20maskUnits%3D%22objectBoundingBox%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20fill%3D%22white%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2202%22%20transform%3D%22translate%28-530.000000%2C%20-559.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-6%22%20transform%3D%22translate%28470.000000%2C%20212.000000%29%22%20fill%3D%22%23F3F3F3%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-160%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22500%22%20height%3D%22600%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-4%22%20transform%3D%22translate%28501.000000%2C%20515.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22Rectangle-186%22%20stroke%3D%22%23DADADA%22%20mask%3D%22url%28%23mask-2%29%22%20stroke-width%3D%222%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-2%22%20transform%3D%22translate%2829.000000%2C%2044.000000%29%22%20fill%3D%22%23DADADA%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.28305865%2C0.313063783%20C2.08305865%2C0.313063783%200.283058647%2C2.11306378%200.283058647%2C4.31306378%20L0.283058647%2C47.2130638%20C0.283058647%2C49.4130638%202.08305865%2C51.2130638%204.28305865%2C51.2130638%20L77.5830586%2C51.2130638%20C79.7830586%2C51.2130638%2081.5830586%2C49.4130638%2081.5830586%2C47.2130638%20L81.5830586%2C4.31306378%20C81.5830586%2C2.11306378%2079.7830586%2C0.313063783%2077.5830586%2C0.313063783%20L4.28305865%2C0.313063783%20Z%20M21.3830586%2C37.6130638%20L21.3830586%2C37.6130638%20C21.4830586%2C37.6130638%209.98305865%2C37.6130638%209.98305865%2C37.6130638%20L10.1830586%2C36.4130638%20C10.6830586%2C35.1130638%2010.6830586%2C34.2130638%2012.0830586%2C33.6130638%20C13.8830586%2C32.8130638%2016.7830586%2C32.0130638%2017.7830586%2C31.1130638%20C18.2830586%2C30.6130638%2018.3830586%2C30.1130638%2018.3830586%2C29.5130638%20C18.3830586%2C29.3130638%2018.3830586%2C29.1130638%2018.2830586%2C28.9130638%20C17.4830586%2C28.6130638%2016.9830586%2C27.0130638%2016.7830586%2C26.5130638%20C16.4830586%2C26.4130638%2016.2830586%2C26.3130638%2016.1830586%2C26.1130638%20C15.2830586%2C24.6130638%2014.8830586%2C23.5130638%2015.7830586%2C23.4130638%20C15.7830586%2C23.4130638%2015.6830586%2C22.9130638%2015.6830586%2C22.0130638%20L15.1830586%2C20.5130638%20C15.1830586%2C20.5130638%2015.1830586%2C20.1130638%2015.5830586%2C19.0130638%20C15.9830586%2C17.8130638%2015.4830586%2C16.9130638%2017.1830586%2C17.1130638%20C17.1830586%2C17.1130638%2016.9830586%2C15.4130638%2021.5830586%2C14.3130638%20C26.1830586%2C13.2130638%2024.8830586%2C15.8130638%2027.2830586%2C17.0130638%20C27.2830586%2C17.0130638%2027.6830586%2C18.1130638%2026.7830586%2C18.9130638%20C27.5830586%2C21.1130638%2027.0830586%2C23.5130638%2027.0830586%2C23.5130638%20C27.8830586%2C23.6130638%2027.5830586%2C24.7130638%2026.6830586%2C26.2130638%20C26.5830586%2C26.4130638%2026.2830586%2C26.5130638%2026.0830586%2C26.6130638%20C25.8830586%2C27.1130638%2025.3830586%2C28.7130638%2024.5830586%2C29.0130638%20C24.4830586%2C29.2130638%2024.4830586%2C29.4130638%2024.4830586%2C29.6130638%20C24.4830586%2C30.2130638%2024.5830586%2C30.7130638%2025.0830586%2C31.2130638%20C26.0830586%2C32.2130638%2028.9830586%2C33.0130638%2030.7830586%2C33.7130638%20C32.1830586%2C34.3130638%2032.1830586%2C35.2130638%2032.6830586%2C36.5130638%20L32.8830586%2C37.7130638%20C32.7830586%2C37.6130638%2021.2830586%2C37.6130638%2021.3830586%2C37.6130638%20L21.3830586%2C37.6130638%20Z%20M38.3830586%2C19.1130638%20C38.3830586%2C18.8369214%2038.6140146%2C18.6130638%2038.8809394%2C18.6130638%20L68.7851779%2C18.6130638%20C69.0601498%2C18.6130638%2069.2830586%2C18.8449974%2069.2830586%2C19.1130638%20L69.2830586%2C19.1130638%20C69.2830586%2C19.3892062%2069.0521027%2C19.6130638%2068.7851779%2C19.6130638%20L38.8809394%2C19.6130638%20C38.6059675%2C19.6130638%2038.3830586%2C19.3811302%2038.3830586%2C19.1130638%20L38.3830586%2C19.1130638%20Z%20M38.3830586%2C25.7630638%20C38.3830586%2C25.4869214%2038.6140146%2C25.2630638%2038.8809394%2C25.2630638%20L68.7851779%2C25.2630638%20C69.0601498%2C25.2630638%2069.2830586%2C25.4949974%2069.2830586%2C25.7630638%20L69.2830586%2C25.7630638%20C69.2830586%2C26.0392062%2069.0521027%2C26.2630638%2068.7851779%2C26.2630638%20L38.8809394%2C26.2630638%20C38.6059675%2C26.2630638%2038.3830586%2C26.0311302%2038.3830586%2C25.7630638%20L38.3830586%2C25.7630638%20Z%20M38.3830586%2C32.4130638%20C38.3830586%2C32.1369214%2038.6148942%2C31.9130638%2038.8918617%2C31.9130638%20L54.2742556%2C31.9130638%20C54.5552598%2C31.9130638%2054.7830586%2C32.1449974%2054.7830586%2C32.4130638%20L54.7830586%2C32.4130638%20C54.7830586%2C32.6892062%2054.5512231%2C32.9130638%2054.2742556%2C32.9130638%20L38.8918617%2C32.9130638%20C38.6108575%2C32.9130638%2038.3830586%2C32.6811302%2038.3830586%2C32.4130638%20L38.3830586%2C32.4130638%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-DocumentSelector-option:hover .onfido-sdk-ui-DocumentSelector-icon.onfido-sdk-ui-DocumentSelector-icon-identity {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2282px%22%20height%3D%2252px%22%20viewBox%3D%220%200%2082%2052%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EB1819F19-251B-4135-8B81-3983F35580E2%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20sketchtool.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20rx%3D%225%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20maskContentUnits%3D%22userSpaceOnUse%22%20maskUnits%3D%22objectBoundingBox%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20fill%3D%22white%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2202%22%20transform%3D%22translate%28-530.000000%2C%20-559.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-6%22%20transform%3D%22translate%28470.000000%2C%20212.000000%29%22%20fill%3D%22%23F3F3F3%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-160%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22500%22%20height%3D%22600%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-4%22%20transform%3D%22translate%28501.000000%2C%20515.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22Rectangle-186%22%20stroke%3D%22%2320c7a0%22%20mask%3D%22url%28%23mask-2%29%22%20stroke-width%3D%222%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-2%22%20transform%3D%22translate%2829.000000%2C%2044.000000%29%22%20fill%3D%22%2320c7a0%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.28305865%2C0.313063783%20C2.08305865%2C0.313063783%200.283058647%2C2.11306378%200.283058647%2C4.31306378%20L0.283058647%2C47.2130638%20C0.283058647%2C49.4130638%202.08305865%2C51.2130638%204.28305865%2C51.2130638%20L77.5830586%2C51.2130638%20C79.7830586%2C51.2130638%2081.5830586%2C49.4130638%2081.5830586%2C47.2130638%20L81.5830586%2C4.31306378%20C81.5830586%2C2.11306378%2079.7830586%2C0.313063783%2077.5830586%2C0.313063783%20L4.28305865%2C0.313063783%20Z%20M21.3830586%2C37.6130638%20L21.3830586%2C37.6130638%20C21.4830586%2C37.6130638%209.98305865%2C37.6130638%209.98305865%2C37.6130638%20L10.1830586%2C36.4130638%20C10.6830586%2C35.1130638%2010.6830586%2C34.2130638%2012.0830586%2C33.6130638%20C13.8830586%2C32.8130638%2016.7830586%2C32.0130638%2017.7830586%2C31.1130638%20C18.2830586%2C30.6130638%2018.3830586%2C30.1130638%2018.3830586%2C29.5130638%20C18.3830586%2C29.3130638%2018.3830586%2C29.1130638%2018.2830586%2C28.9130638%20C17.4830586%2C28.6130638%2016.9830586%2C27.0130638%2016.7830586%2C26.5130638%20C16.4830586%2C26.4130638%2016.2830586%2C26.3130638%2016.1830586%2C26.1130638%20C15.2830586%2C24.6130638%2014.8830586%2C23.5130638%2015.7830586%2C23.4130638%20C15.7830586%2C23.4130638%2015.6830586%2C22.9130638%2015.6830586%2C22.0130638%20L15.1830586%2C20.5130638%20C15.1830586%2C20.5130638%2015.1830586%2C20.1130638%2015.5830586%2C19.0130638%20C15.9830586%2C17.8130638%2015.4830586%2C16.9130638%2017.1830586%2C17.1130638%20C17.1830586%2C17.1130638%2016.9830586%2C15.4130638%2021.5830586%2C14.3130638%20C26.1830586%2C13.2130638%2024.8830586%2C15.8130638%2027.2830586%2C17.0130638%20C27.2830586%2C17.0130638%2027.6830586%2C18.1130638%2026.7830586%2C18.9130638%20C27.5830586%2C21.1130638%2027.0830586%2C23.5130638%2027.0830586%2C23.5130638%20C27.8830586%2C23.6130638%2027.5830586%2C24.7130638%2026.6830586%2C26.2130638%20C26.5830586%2C26.4130638%2026.2830586%2C26.5130638%2026.0830586%2C26.6130638%20C25.8830586%2C27.1130638%2025.3830586%2C28.7130638%2024.5830586%2C29.0130638%20C24.4830586%2C29.2130638%2024.4830586%2C29.4130638%2024.4830586%2C29.6130638%20C24.4830586%2C30.2130638%2024.5830586%2C30.7130638%2025.0830586%2C31.2130638%20C26.0830586%2C32.2130638%2028.9830586%2C33.0130638%2030.7830586%2C33.7130638%20C32.1830586%2C34.3130638%2032.1830586%2C35.2130638%2032.6830586%2C36.5130638%20L32.8830586%2C37.7130638%20C32.7830586%2C37.6130638%2021.2830586%2C37.6130638%2021.3830586%2C37.6130638%20L21.3830586%2C37.6130638%20Z%20M38.3830586%2C19.1130638%20C38.3830586%2C18.8369214%2038.6140146%2C18.6130638%2038.8809394%2C18.6130638%20L68.7851779%2C18.6130638%20C69.0601498%2C18.6130638%2069.2830586%2C18.8449974%2069.2830586%2C19.1130638%20L69.2830586%2C19.1130638%20C69.2830586%2C19.3892062%2069.0521027%2C19.6130638%2068.7851779%2C19.6130638%20L38.8809394%2C19.6130638%20C38.6059675%2C19.6130638%2038.3830586%2C19.3811302%2038.3830586%2C19.1130638%20L38.3830586%2C19.1130638%20Z%20M38.3830586%2C25.7630638%20C38.3830586%2C25.4869214%2038.6140146%2C25.2630638%2038.8809394%2C25.2630638%20L68.7851779%2C25.2630638%20C69.0601498%2C25.2630638%2069.2830586%2C25.4949974%2069.2830586%2C25.7630638%20L69.2830586%2C25.7630638%20C69.2830586%2C26.0392062%2069.0521027%2C26.2630638%2068.7851779%2C26.2630638%20L38.8809394%2C26.2630638%20C38.6059675%2C26.2630638%2038.3830586%2C26.0311302%2038.3830586%2C25.7630638%20L38.3830586%2C25.7630638%20Z%20M38.3830586%2C32.4130638%20C38.3830586%2C32.1369214%2038.6148942%2C31.9130638%2038.8918617%2C31.9130638%20L54.2742556%2C31.9130638%20C54.5552598%2C31.9130638%2054.7830586%2C32.1449974%2054.7830586%2C32.4130638%20L54.7830586%2C32.4130638%20C54.7830586%2C32.6892062%2054.5512231%2C32.9130638%2054.2742556%2C32.9130638%20L38.8918617%2C32.9130638%20C38.6108575%2C32.9130638%2038.3830586%2C32.6811302%2038.3830586%2C32.4130638%20L38.3830586%2C32.4130638%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-DocumentSelector-icon.onfido-sdk-ui-DocumentSelector-icon-license {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2282px%22%20height%3D%2252px%22%20viewBox%3D%220%200%2082%2052%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EA6BE5E14-EA91-43EA-9B09-3188B38721E3%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20sketchtool.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20rx%3D%225%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20maskContentUnits%3D%22userSpaceOnUse%22%20maskUnits%3D%22objectBoundingBox%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20fill%3D%22white%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2202%22%20transform%3D%22translate%28-829.000000%2C%20-559.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-6%22%20transform%3D%22translate%28470.000000%2C%20212.000000%29%22%20fill%3D%22%23F3F3F3%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-160%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22500%22%20height%3D%22600%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-7%22%20transform%3D%22translate%28800.000000%2C%20515.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22Rectangle-186%22%20stroke%3D%22%23DADADA%22%20mask%3D%22url%28%23mask-2%29%22%20stroke-width%3D%222%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-2%22%20transform%3D%22translate%2829.000000%2C%2044.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Shape%22%20fill%3D%22%23DADADA%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2281.2178872%22%20height%3D%2251.4546762%22%20rx%3D%224%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%20transform%3D%22translate%289.874020%2C%2019.825959%29%22%20fill%3D%22%23FFFFFF%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M27.320118%2C6.37074412%20C27.3062114%2C6.29249668%2027.2783984%2C6.19830308%2027.2227722%2C6.07666726%20L22.2057223%2C1.93363238%20L12.1099346%2C1.93363238%20C11.8760195%2C1.91916958%2011.7490778%2C2.03338859%2011.6392519%2C2.16689133%20L8.26424281%2C5.68246335%20L0.884864867%2C6.95889783%20C0.781813877%2C7.05160806%200.67840631%2C7.14283493%200.596393412%2C7.38313986%20L0.611726258%2C10.0238981%20C0.771829698%2C10.4470276%200.880585933%2C10.3921432%201.00182239%2C10.4514777%20L2.42242842%2C10.4514777%20C2.42242842%2C6.86173751%207.5635674%2C6.8762003%207.5635674%2C10.4514777%20L20.6735075%2C10.4514777%20C20.6735075%2C6.85432069%2025.7754229%2C6.86173751%2025.7754229%2C10.4514777%20L26.940006%2C10.4514777%20C27.1350541%2C10.4325648%2027.2448801%2C10.2530778%2027.3383034%2C10.042811%20L27.320118%2C6.37074412%20Z%20M16.4837181%2C6.19978645%20L9.48980077%2C6.19978645%20C9.22379372%2C6.09113005%209.18777936%2C5.92462248%209.29903164%2C5.72325585%20L11.8132618%2C3.1433155%20C11.8703143%2C3.09251029%2011.9148865%2C3.02427556%2012.0125888%2C3.03873835%20L16.4837181%2C3.03873835%20L16.4837181%2C6.19978645%20Z%20M23.7265267%2C6.20126981%20L17.3152576%2C6.20126981%20L17.3152576%2C3.04022172%20L21.0775101%2C3.04022172%20C21.1762822%2C3.02427556%2021.2208544%2C3.09399365%2021.2764805%2C3.14479886%20L23.4312803%2C5.40173676%20C23.6306073%2C5.71138894%2024.030331%2C6.13748517%2023.7265267%2C6.20126981%20L23.7265267%2C6.20126981%20Z%22%20id%3D%22Fill-1%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.98123084%2C8.28576668%20C3.8277016%2C8.28576668%202.89453745%2C9.25774076%202.89453745%2C10.455557%20C2.89453745%2C11.6552274%203.82912791%2C12.6257181%204.98123084%2C12.6257181%20C6.1344035%2C12.6257181%207.06756765%2C11.653744%207.06756765%2C10.455557%20C7.06756765%2C9.2562574%206.13297719%2C8.28576668%204.98123084%2C8.28576668%20L4.98123084%2C8.28576668%20Z%20M4.98123084%2C11.3667131%20C4.49521527%2C11.3667131%204.10084021%2C10.9569339%204.10084021%2C10.4514777%20C4.10084021%2C9.94565069%204.49521527%2C9.53587146%204.98123084%2C9.53587146%20C5.46724641%2C9.53587146%205.86162147%2C9.94565069%205.86162147%2C10.4514777%20C5.86162147%2C10.9569339%205.46724641%2C11.3667131%204.98123084%2C11.3667131%20L4.98123084%2C11.3667131%20Z%22%20id%3D%22Fill-2%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M23.2251783%2C8.28428332%20C22.0720057%2C8.28428332%2021.1384849%2C9.2562574%2021.1384849%2C10.4540736%20C21.1384849%2C11.653744%2022.0730754%2C12.6242347%2023.2251783%2C12.6242347%20C24.378351%2C12.6242347%2025.3115151%2C11.6522607%2025.3115151%2C10.4540736%20C25.3115151%2C9.25477403%2024.378351%2C8.28428332%2023.2251783%2C8.28428332%20L23.2251783%2C8.28428332%20Z%20M23.2251783%2C11.3667131%20C22.7391628%2C11.3667131%2022.3447877%2C10.9569339%2022.3447877%2C10.4514777%20C22.3447877%2C9.94565069%2022.7391628%2C9.53587146%2023.2251783%2C9.53587146%20C23.7111939%2C9.53587146%2024.105569%2C9.94565069%2024.105569%2C10.4514777%20C24.105569%2C10.9569339%2023.7111939%2C11.3667131%2023.2251783%2C11.3667131%20L23.2251783%2C11.3667131%20Z%22%20id%3D%22Fill-3%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20x%3D%2232.3281796%22%20y%3D%220.0370233284%22%20width%3D%2230.9997555%22%20height%3D%220.89101877%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20x%3D%2232.6621834%22%20y%3D%2213.3851802%22%20width%3D%2216.077044%22%20height%3D%220.89101877%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20x%3D%2232.3281796%22%20y%3D%226.90141318%22%20width%3D%2230.9997555%22%20height%3D%220.89101877%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-DocumentSelector-option:hover .onfido-sdk-ui-DocumentSelector-icon.onfido-sdk-ui-DocumentSelector-icon-license {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2282px%22%20height%3D%2252px%22%20viewBox%3D%220%200%2082%2052%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EA6BE5E14-EA91-43EA-9B09-3188B38721E3%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20sketchtool.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20rx%3D%225%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20maskContentUnits%3D%22userSpaceOnUse%22%20maskUnits%3D%22objectBoundingBox%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22140%22%20height%3D%22140%22%20fill%3D%22white%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2202%22%20transform%3D%22translate%28-829.000000%2C%20-559.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-6%22%20transform%3D%22translate%28470.000000%2C%20212.000000%29%22%20fill%3D%22%23F3F3F3%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-160%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22500%22%20height%3D%22600%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-7%22%20transform%3D%22translate%28800.000000%2C%20515.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22Rectangle-186%22%20stroke%3D%22%2320c7a0%22%20mask%3D%22url%28%23mask-2%29%22%20stroke-width%3D%222%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group-2%22%20transform%3D%22translate%2829.000000%2C%2044.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Shape%22%20fill%3D%22%2320c7a0%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2281.2178872%22%20height%3D%2251.4546762%22%20rx%3D%224%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%20transform%3D%22translate%289.874020%2C%2019.825959%29%22%20fill%3D%22%23FFFFFF%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M27.320118%2C6.37074412%20C27.3062114%2C6.29249668%2027.2783984%2C6.19830308%2027.2227722%2C6.07666726%20L22.2057223%2C1.93363238%20L12.1099346%2C1.93363238%20C11.8760195%2C1.91916958%2011.7490778%2C2.03338859%2011.6392519%2C2.16689133%20L8.26424281%2C5.68246335%20L0.884864867%2C6.95889783%20C0.781813877%2C7.05160806%200.67840631%2C7.14283493%200.596393412%2C7.38313986%20L0.611726258%2C10.0238981%20C0.771829698%2C10.4470276%200.880585933%2C10.3921432%201.00182239%2C10.4514777%20L2.42242842%2C10.4514777%20C2.42242842%2C6.86173751%207.5635674%2C6.8762003%207.5635674%2C10.4514777%20L20.6735075%2C10.4514777%20C20.6735075%2C6.85432069%2025.7754229%2C6.86173751%2025.7754229%2C10.4514777%20L26.940006%2C10.4514777%20C27.1350541%2C10.4325648%2027.2448801%2C10.2530778%2027.3383034%2C10.042811%20L27.320118%2C6.37074412%20Z%20M16.4837181%2C6.19978645%20L9.48980077%2C6.19978645%20C9.22379372%2C6.09113005%209.18777936%2C5.92462248%209.29903164%2C5.72325585%20L11.8132618%2C3.1433155%20C11.8703143%2C3.09251029%2011.9148865%2C3.02427556%2012.0125888%2C3.03873835%20L16.4837181%2C3.03873835%20L16.4837181%2C6.19978645%20Z%20M23.7265267%2C6.20126981%20L17.3152576%2C6.20126981%20L17.3152576%2C3.04022172%20L21.0775101%2C3.04022172%20C21.1762822%2C3.02427556%2021.2208544%2C3.09399365%2021.2764805%2C3.14479886%20L23.4312803%2C5.40173676%20C23.6306073%2C5.71138894%2024.030331%2C6.13748517%2023.7265267%2C6.20126981%20L23.7265267%2C6.20126981%20Z%22%20id%3D%22Fill-1%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.98123084%2C8.28576668%20C3.8277016%2C8.28576668%202.89453745%2C9.25774076%202.89453745%2C10.455557%20C2.89453745%2C11.6552274%203.82912791%2C12.6257181%204.98123084%2C12.6257181%20C6.1344035%2C12.6257181%207.06756765%2C11.653744%207.06756765%2C10.455557%20C7.06756765%2C9.2562574%206.13297719%2C8.28576668%204.98123084%2C8.28576668%20L4.98123084%2C8.28576668%20Z%20M4.98123084%2C11.3667131%20C4.49521527%2C11.3667131%204.10084021%2C10.9569339%204.10084021%2C10.4514777%20C4.10084021%2C9.94565069%204.49521527%2C9.53587146%204.98123084%2C9.53587146%20C5.46724641%2C9.53587146%205.86162147%2C9.94565069%205.86162147%2C10.4514777%20C5.86162147%2C10.9569339%205.46724641%2C11.3667131%204.98123084%2C11.3667131%20L4.98123084%2C11.3667131%20Z%22%20id%3D%22Fill-2%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M23.2251783%2C8.28428332%20C22.0720057%2C8.28428332%2021.1384849%2C9.2562574%2021.1384849%2C10.4540736%20C21.1384849%2C11.653744%2022.0730754%2C12.6242347%2023.2251783%2C12.6242347%20C24.378351%2C12.6242347%2025.3115151%2C11.6522607%2025.3115151%2C10.4540736%20C25.3115151%2C9.25477403%2024.378351%2C8.28428332%2023.2251783%2C8.28428332%20L23.2251783%2C8.28428332%20Z%20M23.2251783%2C11.3667131%20C22.7391628%2C11.3667131%2022.3447877%2C10.9569339%2022.3447877%2C10.4514777%20C22.3447877%2C9.94565069%2022.7391628%2C9.53587146%2023.2251783%2C9.53587146%20C23.7111939%2C9.53587146%2024.105569%2C9.94565069%2024.105569%2C10.4514777%20C24.105569%2C10.9569339%2023.7111939%2C11.3667131%2023.2251783%2C11.3667131%20L23.2251783%2C11.3667131%20Z%22%20id%3D%22Fill-3%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20x%3D%2232.3281796%22%20y%3D%220.0370233284%22%20width%3D%2230.9997555%22%20height%3D%220.89101877%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20x%3D%2232.6621834%22%20y%3D%2213.3851802%22%20width%3D%2216.077044%22%20height%3D%220.89101877%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-78%22%20x%3D%2232.3281796%22%20y%3D%226.90141318%22%20width%3D%2230.9997555%22%20height%3D%220.89101877%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n.onfido-sdk-ui-DocumentSelector-selector {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  width: 100%;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/DocumentSelector/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAEA;EACE,gBAAA;EAEA,YAAA;EAEA,oBAAA;EACA,iBAAA;EAEA,gBAAA;EACA,sBAAA;CCDD;ADGC;EA2DF;IA1DI,YAAA;IACA,kBAAA;IACA,YAAA;GCAD;CACF;ADGD;EACE,aAAA;EACA,gBAAA;EACA,oBAAA;EAEA,6BAAA;EACA,6BAAA;EACA,qBAAA;CCFD;AACD,kGAAkG;ADKlG;EACE,YAAA;EACA,eAAA;EACA,qBAAA;ECHA,oEAAoE;EDKpE,iBAAA;EACA,0BAAA;EACA,mBAAA;CCHD;ADMD;EACE,0BAAA;EACA,eAAA;EACA,mBAAA;CCJD;ADOD;EACE,6vPAAA;CCLD;ADOD;EACE,6vPAAA;CCLD;ADOD;EACE,mpMAAA;CCLD;ADOD;EACE,mpMAAA;CCLD;ADOD;EACE,0nNAAA;CCLD;ADOD;EACE,0nNAAA;CCLD;ADQD;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,mBAAA;EACA,YAAA;CCND","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.option {\n  cursor: pointer;\n\n  float: left;\n\n  width: 100%/3;\n  padding: 0 9px 0;\n\n  font-size: 12px;\n  letter-spacing: 0.2px;\n\n  @media (--small-viewport) {\n    float: none;\n    margin: 2rem auto;\n    width: 100%;\n  }\n}\n\n.icon {\n  width: 124px;\n  max-width: 100%;\n  margin: 0 auto 1rem;\n\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: 50%;\n}\n\n/*Solution for responsive square https://spin.atomicobject.com/2015/07/14/css-responsive-square/*/\n.icon:after {\n  content: \"\";\n  display: block;\n  padding-bottom: 100%;\n  /*this is done to compensate later for the increase in border size*/\n  padding-top: 2px;\n  border: 1px solid #dadada;\n  border-radius: 5px;\n}\n\n.option:hover .icon:after {\n  border: solid 2px #20c7a0;\n  padding-top: 0;\n  position: relative;\n}\n\n.icon.icon-passport {\n  background-image: url('assets/icon-passport.svg');\n}\n.option:hover .icon.icon-passport {\n  background-image: url('assets/icon-passport-hover.svg');\n}\n.icon.icon-identity {\n  background-image: url('assets/icon-identity.svg');\n}\n.option:hover .icon.icon-identity {\n  background-image: url('assets/icon-identity-hover.svg');\n}\n.icon.icon-license {\n  background-image: url('assets/icon-license.svg');\n}\n.option:hover .icon.icon-license {\n  background-image: url('assets/icon-license-hover.svg');\n}\n\n.selector {\n  display: flex;\n  justify-content: center;\n  position: relative;\n  width: 100%;\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n.option {\n  cursor: pointer;\n  float: left;\n  width: 33.33333333%;\n  padding: 0 9px 0;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n}\n@media (--small-viewport) {\n  .option {\n    float: none;\n    margin: 2rem auto;\n    width: 100%;\n  }\n}\n.icon {\n  width: 124px;\n  max-width: 100%;\n  margin: 0 auto 1rem;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: 50%;\n}\n/*Solution for responsive square https://spin.atomicobject.com/2015/07/14/css-responsive-square/*/\n.icon:after {\n  content: \"\";\n  display: block;\n  padding-bottom: 100%;\n  /*this is done to compensate later for the increase in border size*/\n  padding-top: 2px;\n  border: 1px solid #dadada;\n  border-radius: 5px;\n}\n.option:hover .icon:after {\n  border: solid 2px #20c7a0;\n  padding-top: 0;\n  position: relative;\n}\n.icon.icon-passport {\n  background-image: url('assets/icon-passport.svg');\n}\n.option:hover .icon.icon-passport {\n  background-image: url('assets/icon-passport-hover.svg');\n}\n.icon.icon-identity {\n  background-image: url('assets/icon-identity.svg');\n}\n.option:hover .icon.icon-identity {\n  background-image: url('assets/icon-identity-hover.svg');\n}\n.icon.icon-license {\n  background-image: url('assets/icon-license.svg');\n}\n.option:hover .icon.icon-license {\n  background-image: url('assets/icon-license-hover.svg');\n}\n.selector {\n  display: flex;\n  justify-content: center;\n  position: relative;\n  width: 100%;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"option": "onfido-sdk-ui-DocumentSelector-option",
	"icon": "onfido-sdk-ui-DocumentSelector-icon",
	"icon-passport": "onfido-sdk-ui-DocumentSelector-icon-passport",
	"icon-identity": "onfido-sdk-ui-DocumentSelector-icon-identity",
	"icon-license": "onfido-sdk-ui-DocumentSelector-icon-license",
	"selector": "onfido-sdk-ui-DocumentSelector-selector"
};

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Error-container,\n.onfido-sdk-ui-Error-container-error,\n.onfido-sdk-ui-Error-container-warning {\n  border-radius: 6px;\n  text-align: left;\n  color: #FFFFFF;\n  margin-top: .75rem;\n  margin-bottom: 27px;\n  padding: 20px 24px;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-container,\n  .onfido-sdk-ui-Error-container-error,\n  .onfido-sdk-ui-Error-container-warning {\n    padding: 16px;\n    margin-bottom: 48px;\n  }\n}\n.onfido-sdk-ui-Error-container-error {\n  background-color: #DC2A2A;\n}\n.onfido-sdk-ui-Error-container-warning {\n  background-color: #2A7AB0;\n}\n.onfido-sdk-ui-Error-instruction {\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  margin-left: 40px;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-instruction {\n    font-size: 13px;\n    line-height: 20px;\n    margin-left: 24px;\n  }\n}\n.onfido-sdk-ui-Error-title {\n  position: relative;\n  margin-bottom: 4px;\n  height: 28px;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-title {\n    margin-bottom: 0px;\n  }\n}\n.onfido-sdk-ui-Error-title-text {\n  display: inline-block;\n  font-size: 24px;\n  font-weight: 600;\n  line-height: 28px;\n  padding-left: 40px;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-title-text {\n    font-size: 20px;\n    padding-left: 24px;\n  }\n}\n.onfido-sdk-ui-Error-title-icon,\n.onfido-sdk-ui-Error-title-icon-error,\n.onfido-sdk-ui-Error-title-icon-warning {\n  position: absolute;\n  height: 100%;\n  width: 24px;\n  background-position: left center;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-title-icon,\n  .onfido-sdk-ui-Error-title-icon-error,\n  .onfido-sdk-ui-Error-title-icon-warning {\n    width: 16px;\n  }\n}\n.onfido-sdk-ui-Error-title-icon-error {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eerror-large%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Ccircle%20id%3D%22path-1%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%3E%3C%2Fcircle%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22validation%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22validation_warning_large%22%20transform%3D%22translate%28-48.000000%2C%20-54.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22warning-msg%22%20transform%3D%22translate%2824.000000%2C%2032.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22inset%22%20transform%3D%22translate%2824.000000%2C%2020.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22error-large%22%20transform%3D%22translate%280.000000%2C%202.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Oval%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23FFFFFF%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccircle%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%222%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2211%22%3E%3C%2Fcircle%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20stroke-width%3D%221%22%20fill-rule%3D%22evenodd%22%20transform%3D%22translate%2812.000000%2C%2012.000000%29%20rotate%2845.000000%29%20translate%28-12.000000%2C%20-12.000000%29%20translate%285.000000%2C%205.000000%29%22%20id%3D%22cross%22%20fill%3D%22%23DC2A2A%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle%22%20x%3D%220%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%222%22%20rx%3D%221%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-Copy%22%20transform%3D%22translate%287.000000%2C%207.000000%29%20rotate%2890.000000%29%20translate%28-7.000000%2C%20-7.000000%29%20%22%20x%3D%220%22%20y%3D%226%22%20width%3D%2214%22%20height%3D%222%22%20rx%3D%221%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-title-icon-error {\n    background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eerror-small%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Ccircle%20id%3D%22path-1%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%3E%3C%2Fcircle%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22selfie-error%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2202-mobile-selfie-error%22%20transform%3D%22translate%28-40.000000%2C%20-62.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22error-msg-copy%22%20transform%3D%22translate%2824.000000%2C%2040.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22inset%22%20transform%3D%22translate%2816.000000%2C%2015.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22error-small%22%20transform%3D%22translate%280.000000%2C%207.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Oval%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23FFFFFF%22%20fill-rule%3D%22evenodd%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccircle%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%221.33333333%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%227.33333333%22%3E%3C%2Fcircle%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22cross%22%20transform%3D%22translate%288.000000%2C%208.000000%29%20rotate%2845.000000%29%20translate%28-8.000000%2C%20-8.000000%29%20translate%283.000000%2C%203.000000%29%22%20fill%3D%22%23DC2A2A%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-3%22%20x%3D%224%22%20y%3D%220%22%20width%3D%222%22%20height%3D%2210%22%20rx%3D%221%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-3-Copy%22%20transform%3D%22translate%285.000000%2C%205.000000%29%20rotate%2890.000000%29%20translate%28-5.000000%2C%20-5.000000%29%20%22%20x%3D%224%22%20y%3D%220%22%20width%3D%222%22%20height%3D%2210%22%20rx%3D%221%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n  }\n}\n.onfido-sdk-ui-Error-title-icon-warning {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ewarning-large%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22validation%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22validation_warning_large%22%20transform%3D%22translate%28-48.000000%2C%20-54.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22warning-msg%22%20transform%3D%22translate%2824.000000%2C%2032.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22inset%22%20transform%3D%22translate%2824.000000%2C%2020.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22warning-large%22%20transform%3D%22translate%280.000000%2C%202.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccircle%20id%3D%22Oval%22%20fill%3D%22%23FFFFFF%22%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%3E%3C%2Fcircle%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22info%22%20stroke-width%3D%221%22%20transform%3D%22translate%2811.000000%2C%206.000000%29%22%20fill%3D%22%232A7AB0%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22stem%22%20x%3D%220%22%20y%3D%223%22%20width%3D%222%22%20height%3D%229%22%20rx%3D%221%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccircle%20id%3D%22circle%22%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%3E%3C%2Fcircle%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Error-title-icon-warning {\n    background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ewarning-small%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22validation%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22validation_warning_small%22%20transform%3D%22translate%28-40.000000%2C%20-62.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22error-msg-copy%22%20transform%3D%22translate%2824.000000%2C%2040.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22inset%22%20transform%3D%22translate%2816.000000%2C%2015.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22warning-small%22%20transform%3D%22translate%280.000000%2C%207.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccircle%20id%3D%22Oval%22%20fill%3D%22%23FFFFFF%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%3E%3C%2Fcircle%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22info%22%20stroke-width%3D%221%22%20transform%3D%22translate%287.000000%2C%203.000000%29%22%20fill%3D%22%232A7AB0%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22stem%22%20x%3D%220%22%20y%3D%223%22%20width%3D%222%22%20height%3D%227%22%20rx%3D%221%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccircle%20id%3D%22circle%22%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%3E%3C%2Fcircle%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n  }\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Error/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAEA;;;EACE,mBAAA;EACA,iBAAA;EACA,eAAA;EACA,mBAAA;EACA,oBAAA;EACA,mBAAA;CCID;ADHC;EAmFF;;;IAlFI,cAAA;IACA,oBAAA;GCQD;CACF;ADLD;EAEE,0BAAA;CCMD;ADHD;EAEE,0BAAA;CCID;ADDD;EACE,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,kBAAA;CCGD;ADFC;EA4DF;IA3DI,gBAAA;IACA,kBAAA;IACA,kBAAA;GCKD;CACF;ADAD;EACE,mBAAA;EACA,mBAAA;EACA,aAAA;CCED;ADDC;EA+CF;IA9CI,mBAAA;GCID;CACF;ADED;EACE,sBAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;CCAD;ADCC;EAiCF;IAhCI,gBAAA;IACA,mBAAA;GCED;CACF;ADCD;;;EACE,mBAAA;EACA,aAAA;EACA,YAAA;EAIA,iCAAA;EACA,6BAAA;EACA,yBAAA;CCAD;ADLC;EAuBF;;;IAtBI,YAAA;GCUD;CACF;ADJD;EAEE,oxGAAA;CCKD;ADJC;EAYF;IAXI,8uGAAA;GCOD;CACF;ADJD;EAEE,swEAAA;CCKD;ADJC;EAIF;IAHI,qwEAAA;GCOD;CACF","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.container {\n  border-radius: 6px;\n  text-align: left;\n  color: #FFFFFF;\n  margin-top: .75rem;\n  margin-bottom: 27px;\n  padding: 20px 24px;\n  @media (--small-viewport) {\n    padding: 16px;\n    margin-bottom: 48px;\n  }\n}\n\n.container-error {\n  &:extend(.container);\n  background-color: #DC2A2A;\n}\n\n.container-warning {\n  &:extend(.container);\n  background-color: #2A7AB0;\n}\n\n.instruction {\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  margin-left: 40px;\n  @media (--small-viewport) {\n    font-size: 13px;\n    line-height: 20px;\n    margin-left: 24px;\n  }\n}\n\n@title-height: 28px;\n\n.title {\n  position: relative;\n  margin-bottom: 4px;\n  height: @title-height;\n  @media (--small-viewport) {\n    margin-bottom: 0px;\n  }\n}\n\n@icon-width: 24px;\n@icon-width-small: 16px;\n\n.title-text {\n  display: inline-block;\n  font-size: 24px;\n  font-weight: 600;\n  line-height: @title-height;\n  padding-left: 16px + @icon-width;\n  @media (--small-viewport) {\n    font-size: 20px;\n    padding-left: 8px + @icon-width-small;\n  }\n}\n\n.title-icon {\n  position: absolute;\n  height: 100%;\n  width: @icon-width;\n  @media (--small-viewport) {\n    width: @icon-width-small;\n  }\n  background-position: left center;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.title-icon-error {\n  &:extend(.title-icon);\n  background-image: url('assets/errorLarge.svg');\n  @media (--small-viewport) {\n    background-image: url('assets/errorSmall.svg');\n  }\n}\n\n.title-icon-warning {\n  &:extend(.title-icon);\n  background-image: url('assets/warningLarge.svg');\n  @media (--small-viewport) {\n    background-image: url('assets/warningSmall.svg');\n  }\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n.container,\n.container-error,\n.container-warning {\n  border-radius: 6px;\n  text-align: left;\n  color: #FFFFFF;\n  margin-top: .75rem;\n  margin-bottom: 27px;\n  padding: 20px 24px;\n}\n@media (--small-viewport) {\n  .container,\n  .container-error,\n  .container-warning {\n    padding: 16px;\n    margin-bottom: 48px;\n  }\n}\n.container-error {\n  background-color: #DC2A2A;\n}\n.container-warning {\n  background-color: #2A7AB0;\n}\n.instruction {\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  margin-left: 40px;\n}\n@media (--small-viewport) {\n  .instruction {\n    font-size: 13px;\n    line-height: 20px;\n    margin-left: 24px;\n  }\n}\n.title {\n  position: relative;\n  margin-bottom: 4px;\n  height: 28px;\n}\n@media (--small-viewport) {\n  .title {\n    margin-bottom: 0px;\n  }\n}\n.title-text {\n  display: inline-block;\n  font-size: 24px;\n  font-weight: 600;\n  line-height: 28px;\n  padding-left: 40px;\n}\n@media (--small-viewport) {\n  .title-text {\n    font-size: 20px;\n    padding-left: 24px;\n  }\n}\n.title-icon,\n.title-icon-error,\n.title-icon-warning {\n  position: absolute;\n  height: 100%;\n  width: 24px;\n  background-position: left center;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n@media (--small-viewport) {\n  .title-icon,\n  .title-icon-error,\n  .title-icon-warning {\n    width: 16px;\n  }\n}\n.title-icon-error {\n  background-image: url('assets/errorLarge.svg');\n}\n@media (--small-viewport) {\n  .title-icon-error {\n    background-image: url('assets/errorSmall.svg');\n  }\n}\n.title-icon-warning {\n  background-image: url('assets/warningLarge.svg');\n}\n@media (--small-viewport) {\n  .title-icon-warning {\n    background-image: url('assets/warningSmall.svg');\n  }\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"container": "onfido-sdk-ui-Error-container",
	"container-error": "onfido-sdk-ui-Error-container-error",
	"container-warning": "onfido-sdk-ui-Error-container-warning",
	"instruction": "onfido-sdk-ui-Error-instruction",
	"title": "onfido-sdk-ui-Error-title",
	"title-text": "onfido-sdk-ui-Error-title-text",
	"title-icon": "onfido-sdk-ui-Error-title-icon",
	"title-icon-error": "onfido-sdk-ui-Error-title-icon-error",
	"title-icon-warning": "onfido-sdk-ui-Error-title-icon-warning"
};

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Face-circle {\n  width: 45%;\n  max-height: 80%;\n  border-radius: 100%;\n}\n.onfido-sdk-ui-Face-circle:before {\n  content: \"\";\n  display: block;\n  padding-top: 125%;\n}\n.onfido-sdk-ui-Face-instructions {\n  margin: 15px 0 55px;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Face/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;EACE,WAAA;EACA,gBAAA;EACA,oBAAA;CCCD;ADED;EACI,YAAA;EACA,eAAA;EACA,kBAAA;CCAH;ADGD;EACE,oBAAA;CCDD","file":"style.css","sourcesContent":[".circle{\n  width: 45%;\n  max-height: 80%;\n  border-radius: 100%;\n}\n\n.circle:before {\n    content: \"\";\n    display: block;\n    padding-top: 125%;\n}\n\n.instructions {\n  margin: 15px 0 55px;\n}\n",".circle {\n  width: 45%;\n  max-height: 80%;\n  border-radius: 100%;\n}\n.circle:before {\n  content: \"\";\n  display: block;\n  padding-top: 125%;\n}\n.instructions {\n  margin: 15px 0 55px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"circle": "onfido-sdk-ui-Face-circle",
	"instructions": "onfido-sdk-ui-Face-instructions"
};

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "@media (min-width: 30em) {\n  .onfido-sdk-ui-Select-methods {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex: auto;\n            flex: auto;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n  }\n}\n.onfido-sdk-ui-Select-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Select/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAGE;EAWF;IAVI,qBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,oBAAA;QAAA,eAAA;YAAA,WAAA;IACA,oBAAA;QAAA,gBAAA;GCED;CACF;ADCD;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;CCCD","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.methods {\n  @media (--large) {\n    display: flex;\n    flex: auto;\n    flex-wrap: wrap;\n  }\n}\n\n.wrapper{\n  display: flex;\n  flex-direction: column;\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n@media (--large) {\n  .methods {\n    display: flex;\n    flex: auto;\n    flex-wrap: wrap;\n  }\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"methods": "onfido-sdk-ui-Select-methods",
	"wrapper": "onfido-sdk-ui-Select-wrapper"
};

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Spinner-loader {\n  width: 48px;\n  height: 48px;\n  margin: 0 auto 1.5rem auto;\n}\n@-webkit-keyframes onfido-sdk-ui-Spinner-ball-scale-ripple-multiple {\n  0% {\n    -webkit-transform: scale(0.1);\n            transform: scale(0.1);\n    opacity: 1;\n  }\n  70% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 0.0;\n  }\n}\n@keyframes onfido-sdk-ui-Spinner-ball-scale-ripple-multiple {\n  0% {\n    -webkit-transform: scale(0.1);\n            transform: scale(0.1);\n    opacity: 1;\n  }\n  70% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 0.0;\n  }\n}\n.onfido-sdk-ui-Spinner-inner {\n  position: relative;\n  -webkit-transform: translateX(25px);\n          transform: translateX(25px);\n}\n.onfido-sdk-ui-Spinner-inner > div:nth-child(0) {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n}\n.onfido-sdk-ui-Spinner-inner > div:nth-child(1) {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s;\n}\n.onfido-sdk-ui-Spinner-inner > div:nth-child(2) {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.onfido-sdk-ui-Spinner-inner > div:nth-child(3) {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.onfido-sdk-ui-Spinner-inner > div {\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  position: absolute;\n  top: -2px;\n  left: -26px;\n  width: 50px;\n  height: 50px;\n  border-radius: 100%;\n  border: 2px solid #ccc;\n  -webkit-animation: onfido-sdk-ui-Spinner-ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);\n          animation: onfido-sdk-ui-Spinner-ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Spinner/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;EACE,YAAA;EACA,aAAA;EACA,2BAAA;CCCD;ADED;EACE;IACE,8BAAA;YAAA,sBAAA;IACA,WAAA;GCAD;EDED;IACE,4BAAA;YAAA,oBAAA;IACA,aAAA;GCAD;EDED;IACE,aAAA;GCAD;CACF;ADXD;EACE;IACE,8BAAA;YAAA,sBAAA;IACA,WAAA;GCAD;EDED;IACE,4BAAA;YAAA,oBAAA;IACA,aAAA;GCAD;EDED;IACE,aAAA;GCAD;CACF;ADGD;EACE,mBAAA;EACA,oCAAA;UAAA,4BAAA;CCDD;ADGC;EACE,+BAAA;UAAA,uBAAA;CCDH;ADIC;EACE,+BAAA;UAAA,uBAAA;CCFH;ADKC;EACE,+BAAA;UAAA,uBAAA;CCHH;ADMC;EACE,+BAAA;UAAA,uBAAA;CCJH;ADOC;EACE,kCAAA;UAAA,0BAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,uBAAA;EACA,0HAAA;UAAA,kHAAA;CCLH","file":"style.css","sourcesContent":[".loader {\n  width: 48px;\n  height: 48px;\n  margin: 0 auto 1.5rem auto;\n}\n\n@keyframes ball-scale-ripple-multiple {\n  0% {\n    transform: scale(0.1);\n    opacity: 1;\n  }\n  70% {\n    transform: scale(1);\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 0.0;\n  }\n}\n\n.inner {\n  position: relative;\n  transform: translateX(25px);\n\n  & > div:nth-child(0) {\n    animation-delay: -0.8s;\n  }\n\n  & > div:nth-child(1) {\n    animation-delay: -0.6s;\n  }\n\n  & > div:nth-child(2) {\n    animation-delay: -0.4s;\n  }\n\n  & > div:nth-child(3) {\n    animation-delay: -0.2s;\n  }\n\n  & > div {\n    animation-fill-mode: both;\n    position: absolute;\n    top: -2px;\n    left: -26px;\n    width: 50px;\n    height: 50px;\n    border-radius: 100%;\n    border: 2px solid #ccc;\n    animation: ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);\n  }\n}\n",".loader {\n  width: 48px;\n  height: 48px;\n  margin: 0 auto 1.5rem auto;\n}\n@keyframes ball-scale-ripple-multiple {\n  0% {\n    transform: scale(0.1);\n    opacity: 1;\n  }\n  70% {\n    transform: scale(1);\n    opacity: 0.7;\n  }\n  100% {\n    opacity: 0.0;\n  }\n}\n.inner {\n  position: relative;\n  transform: translateX(25px);\n}\n.inner > div:nth-child(0) {\n  animation-delay: -0.8s;\n}\n.inner > div:nth-child(1) {\n  animation-delay: -0.6s;\n}\n.inner > div:nth-child(2) {\n  animation-delay: -0.4s;\n}\n.inner > div:nth-child(3) {\n  animation-delay: -0.2s;\n}\n.inner > div {\n  animation-fill-mode: both;\n  position: absolute;\n  top: -2px;\n  left: -26px;\n  width: 50px;\n  height: 50px;\n  border-radius: 100%;\n  border: 2px solid #ccc;\n  animation: ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"loader": "onfido-sdk-ui-Spinner-loader",
	"inner": "onfido-sdk-ui-Spinner-inner",
	"ball-scale-ripple-multiple": "onfido-sdk-ui-Spinner-ball-scale-ripple-multiple"
};

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Theme-step {\n  background: #f3f3f3;\n  margin: 0 1.5rem 4rem;\n}\n@media (min-width: 30em) {\n  .onfido-sdk-ui-Theme-step {\n    margin: 0 3rem 4rem;\n  }\n}\n.onfido-sdk-ui-Theme-title {\n  font-weight: 300;\n  font-size: 24px;\n  margin-top: 0;\n  color: #4a4a4a;\n  width: 100%;\n  text-align: center;\n  padding-bottom: 1.8rem;\n  padding-top: 1.2rem;\n}\n.onfido-sdk-ui-Theme-mbottom-large {\n  margin-bottom: 4rem;\n}\n.onfido-sdk-ui-Theme-btn {\n  font: inherit;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: inherit;\n  text-decoration: none;\n  text-align: center;\n  cursor: pointer;\n  display: inline-block;\n  border: none;\n  border-radius: 2rem;\n  padding: 1.2rem 2rem;\n  outline: none;\n}\n.onfido-sdk-ui-Theme-btn:disabled {\n  opacity: .5;\n}\n.onfido-sdk-ui-Theme-btn-centered {\n  margin: auto;\n}\n.onfido-sdk-ui-Theme-btn-primary {\n  /*layout*/\n  display: block;\n  width: 215px;\n  border: none;\n  background: #20c7a0;\n  /*text*/\n  color: #fff;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Theme-btn-primary {\n    width: initial;\n  }\n}\n.onfido-sdk-ui-Theme-btn-alternative {\n  background-color: #2980b9;\n}\n.onfido-sdk-ui-Theme-center {\n  text-align: center;\n}\n.onfido-sdk-ui-Theme-overlay-shape {\n  border: 1px solid #00c8a0;\n  position: absolute;\n  bottom: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, 50%);\n          transform: translate(-50%, 50%);\n  /* 300px box-shadow, so 600px by 600px, so as to definitely cover the modal */\n  -webkit-box-shadow: 0 0 0 300px rgba(0, 0, 0, 0.7);\n          box-shadow: 0 0 0 300px rgba(0, 0, 0, 0.7);\n}\n.onfido-sdk-ui-Theme-overlay {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.onfido-sdk-ui-Theme-icon {\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 4rem;\n}\n.onfido-sdk-ui-Theme-actions {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: .75rem 1.5rem 0 1.5rem;\n}\n@media (min-width: 30em) {\n  .onfido-sdk-ui-Theme-actions {\n    padding: 1.5em 3rem 0 3rem;\n  }\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Theme/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAEA;EACE,oBAAA;EACA,sBAAA;CCED;ADDC;EAqGF;IApGI,oBAAA;GCID;CACF;ADDD;EACE,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,eAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EACA,oBAAA;CCGD;ADAD;EACE,oBAAA;CCED;ADCD;EACE,cAAA;EACA,iBAAA;EACA,gBAAA;EACA,qBAAA;EAEA,sBAAA;EACA,mBAAA;EACA,gBAAA;EAEA,sBAAA;EACA,aAAA;EACA,oBAAA;EACA,qBAAA;EAEA,cAAA;CCFD;ADIC;EACE,YAAA;CCFH;ADKC;EACE,aAAA;CCHH;ADMC;ECJA,UAAU;EDMR,eAAA;EACA,aAAA;EAIA,aAAA;EAEA,oBAAA;ECRF,QAAQ;EDWN,YAAA;CCTH;ADCG;EAoDJ;IAnDM,eAAA;GCEH;CACF;ADOC;EACE,0BAAA;CCLH;ADSD;EACE,mBAAA;CCPD;ADUD;EACE,0BAAA;EACA,mBAAA;EACA,YAAA;EACA,UAAA;EACA,wCAAA;UAAA,gCAAA;ECRA,8EAA8E;EDU9E,mDAAA;UAAA,2CAAA;CCRD;ADWD;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,YAAA;EACA,aAAA;CCTD;ADYD;EACE,eAAA;EACA,6BAAA;EACA,4BAAA;EACA,aAAA;CCVD;ADaD;EACE,YAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,+BAAA;EACA,gCAAA;CCXD;ADYC;EAIF;IAHI,2BAAA;GCTD;CACF","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.step {\n  background: #f3f3f3;\n  margin: 0 1.5rem 4rem;\n  @media (--large) {\n    margin: 0 3rem 4rem;\n  }\n}\n\n.title {\n  font-weight: 300;\n  font-size: 24px;\n  margin-top: 0;\n  color: #4a4a4a;\n  width: 100%;\n  text-align: center;\n  padding-bottom: 1.8rem;\n  padding-top: 1.2rem;\n}\n\n.mbottom-large {\n  margin-bottom: 4rem;\n}\n\n.btn {\n  font: inherit;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: inherit;\n\n  text-decoration: none;\n  text-align: center;\n  cursor: pointer;\n\n  display: inline-block;\n  border: none;\n  border-radius: 2rem;\n  padding: 1.2rem 2rem;\n\n  outline: none;\n\n  &:disabled {\n    opacity: .5;\n  }\n\n  &-centered {\n    margin: auto;\n  }\n\n  &-primary {\n    /*layout*/\n    display: block;\n    width: 215px;\n    @media (--small-viewport) {\n      width: initial;\n    }\n    border: none;\n\n    background: #20c7a0;\n\n    /*text*/\n    color: #fff;\n  }\n\n  &-alternative{\n    background-color: #2980b9;\n  }\n}\n\n.center {\n  text-align: center;\n}\n\n.overlay-shape {\n  border: 1px solid #00c8a0;\n  position: absolute;\n  bottom: 50%;\n  left: 50%;\n  transform: translate(-50%, 50%);\n  /* 300px box-shadow, so 600px by 600px, so as to definitely cover the modal */\n  box-shadow: 0 0 0 300px rgba(0, 0, 0, 0.7);\n}\n\n.overlay {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n\n.icon {\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 4rem;\n}\n\n.actions {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  padding: .75rem 1.5rem 0 1.5rem;\n  @media (--large) {\n    padding: 1.5em 3rem 0 3rem;\n  }\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n.step {\n  background: #f3f3f3;\n  margin: 0 1.5rem 4rem;\n}\n@media (--large) {\n  .step {\n    margin: 0 3rem 4rem;\n  }\n}\n.title {\n  font-weight: 300;\n  font-size: 24px;\n  margin-top: 0;\n  color: #4a4a4a;\n  width: 100%;\n  text-align: center;\n  padding-bottom: 1.8rem;\n  padding-top: 1.2rem;\n}\n.mbottom-large {\n  margin-bottom: 4rem;\n}\n.btn {\n  font: inherit;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: inherit;\n  text-decoration: none;\n  text-align: center;\n  cursor: pointer;\n  display: inline-block;\n  border: none;\n  border-radius: 2rem;\n  padding: 1.2rem 2rem;\n  outline: none;\n}\n.btn:disabled {\n  opacity: .5;\n}\n.btn-centered {\n  margin: auto;\n}\n.btn-primary {\n  /*layout*/\n  display: block;\n  width: 215px;\n  border: none;\n  background: #20c7a0;\n  /*text*/\n  color: #fff;\n}\n@media (--small-viewport) {\n  .btn-primary {\n    width: initial;\n  }\n}\n.btn-alternative {\n  background-color: #2980b9;\n}\n.center {\n  text-align: center;\n}\n.overlay-shape {\n  border: 1px solid #00c8a0;\n  position: absolute;\n  bottom: 50%;\n  left: 50%;\n  transform: translate(-50%, 50%);\n  /* 300px box-shadow, so 600px by 600px, so as to definitely cover the modal */\n  box-shadow: 0 0 0 300px rgba(0, 0, 0, 0.7);\n}\n.overlay {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.icon {\n  display: block;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 4rem;\n}\n.actions {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  padding: .75rem 1.5rem 0 1.5rem;\n}\n@media (--large) {\n  .actions {\n    padding: 1.5em 3rem 0 3rem;\n  }\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"step": "onfido-sdk-ui-Theme-step",
	"title": "onfido-sdk-ui-Theme-title",
	"mbottom-large": "onfido-sdk-ui-Theme-mbottom-large",
	"btn": "onfido-sdk-ui-Theme-btn",
	"btn-centered": "onfido-sdk-ui-Theme-btn-centered",
	"btn-primary": "onfido-sdk-ui-Theme-btn-primary",
	"btn-alternative": "onfido-sdk-ui-Theme-btn-alternative",
	"center": "onfido-sdk-ui-Theme-center",
	"overlay-shape": "onfido-sdk-ui-Theme-overlay-shape",
	"overlay": "onfido-sdk-ui-Theme-overlay",
	"icon": "onfido-sdk-ui-Theme-icon",
	"actions": "onfido-sdk-ui-Theme-actions"
};

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Uploader-base {\n  padding: 1.5rem;\n}\n.onfido-sdk-ui-Uploader-text {\n  text-align: center;\n  padding: 0 1.5rem;\n  margin-bottom: 0;\n}\n.onfido-sdk-ui-Uploader-text + .onfido-sdk-ui-Uploader-text {\n  margin-top: 1.5rem;\n}\n.onfido-sdk-ui-Uploader-processing {\n  text-align: center;\n}\n.onfido-sdk-ui-Uploader-icon {\n  background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2280px%22%20height%3D%2274px%22%20viewBox%3D%220%200%2080%2074%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Enoun_148000_cc%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22noun_148000_cc%22%20fill%3D%22%234A88C2%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M79.523%2C39.069%20C79.523%2C44.071%2077.649%2C48.89%2074.248%2C52.638%20C70.822%2C56.413%2066.222%2C58.683%2061.294%2C59.031%20C61.248%2C59.034%2061.202%2C59.036%2061.156%2C59.036%20L49.014%2C59.036%20C47.933%2C59.036%2047.057%2C58.16%2047.057%2C57.079%20C47.057%2C55.998%2047.933%2C55.122%2049.014%2C55.122%20L61.084%2C55.122%20C69.1%2C54.519%2075.609%2C47.333%2075.609%2C39.069%20C75.609%2C31.28%2070.026%2C24.451%2062.623%2C23.185%20C61.752%2C23.036%2061.089%2C22.322%2061.005%2C21.442%20C60.078%2C11.723%2051.998%2C4.394%2042.211%2C4.394%20C34.93%2C4.394%2028.223%2C8.645%2025.127%2C15.223%20C24.694%2C16.143%2023.628%2C16.578%2022.676%2C16.224%20C21.769%2C15.888%2020.801%2C15.717%2019.798%2C15.717%20C15.138%2C15.717%2011.348%2C19.508%2011.348%2C24.167%20C11.348%2C25.182%2011.519%2C26.157%2011.855%2C27.063%20C12.185%2C27.954%2011.827%2C28.954%2011.006%2C29.434%20C6.926%2C31.814%204.392%2C36.221%204.392%2C40.937%20C4.392%2C48.227%2010.143%2C54.709%2016.961%2C55.121%20L30.976%2C55.121%20C32.057%2C55.121%2032.933%2C55.997%2032.933%2C57.078%20C32.933%2C58.159%2032.057%2C59.035%2030.976%2C59.035%20L16.903%2C59.035%20C16.867%2C59.035%2016.83%2C59.034%2016.794%2C59.032%20C12.411%2C58.788%208.287%2C56.714%205.181%2C53.194%20C2.147%2C49.756%200.477%2C45.403%200.477%2C40.938%20C0.477%2C35.355%203.222%2C30.106%207.731%2C26.895%20C7.533%2C26.012%207.433%2C25.1%207.433%2C24.168%20C7.433%2C17.351%2012.979%2C11.804%2019.796%2C11.804%20C20.666%2C11.804%2021.522%2C11.893%2022.354%2C12.069%20C26.362%2C4.978%2033.982%2C0.481%2042.21%2C0.481%20C47.918%2C0.481%2053.379%2C2.6%2057.588%2C6.446%20C61.408%2C9.937%2063.906%2C14.576%2064.716%2C19.632%20C73.252%2C21.803%2079.523%2C29.904%2079.523%2C39.069%20L79.523%2C39.069%20Z%20M50.321%2C42.847%20C50.703%2C43.229%2051.204%2C43.42%2051.705%2C43.42%20C52.206%2C43.42%2052.707%2C43.229%2053.088%2C42.847%20C53.852%2C42.083%2053.852%2C40.844%2053.088%2C40.08%20L41.384%2C28.375%20C40.62%2C27.611%2039.381%2C27.611%2038.617%2C28.375%20L26.912%2C40.079%20C26.148%2C40.843%2026.148%2C42.082%2026.912%2C42.846%20C27.294%2C43.228%2027.795%2C43.419%2028.296%2C43.419%20C28.797%2C43.419%2029.298%2C43.228%2029.679%2C42.846%20L38.044%2C34.481%20L38.044%2C71.562%20C38.044%2C72.643%2038.92%2C73.519%2040.001%2C73.519%20C41.082%2C73.519%2041.958%2C72.643%2041.958%2C71.562%20L41.958%2C34.482%20L50.321%2C42.847%20L50.321%2C42.847%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E');\n  background-size: 4rem auto;\n}\n.onfido-sdk-ui-Uploader-error {\n  color: #DC0505;\n  margin-top: .75rem;\n  font-weight: 400;\n}\n.onfido-sdk-ui-Uploader-dropzone {\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  cursor: pointer;\n}\n@media (min-width: 30em) {\n  .onfido-sdk-ui-Uploader-dropzone {\n    min-height: 20rem;\n  }\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Uploader/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAEA;EACE,gBAAA;CCED;ADCD;EACE,mBAAA;EACA,kBAAA;EACA,iBAAA;CCCD;ADED;EACE,mBAAA;CCAD;ADGD;EACE,mBAAA;CCDD;ADID;EACE,6sGAAA;EACA,2BAAA;CCFD;ADKD;EACE,eAAA;EACA,mBAAA;EACA,iBAAA;CCHD;ADMD;EACE,oBAAA;MAAA,eAAA;UAAA,WAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,gBAAA;CCJD;ADKC;EAIF;IAHI,kBAAA;GCFD;CACF","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.base {\n  padding: 1.5rem;\n}\n\n.text {\n  text-align: center;\n  padding: 0 1.5rem;\n  margin-bottom: 0;\n}\n\n.text + .text {\n  margin-top: 1.5rem;\n}\n\n.processing {\n  text-align: center;\n}\n\n.icon {\n  background-image: url('assets/upload.svg');\n  background-size: 4rem auto;\n}\n\n.error {\n  color: #DC0505;\n  margin-top: .75rem;\n  font-weight: 400;\n}\n\n.dropzone {\n  flex: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n  @media (--large) {\n    min-height: 20rem;\n  }\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n.base {\n  padding: 1.5rem;\n}\n.text {\n  text-align: center;\n  padding: 0 1.5rem;\n  margin-bottom: 0;\n}\n.text + .text {\n  margin-top: 1.5rem;\n}\n.processing {\n  text-align: center;\n}\n.icon {\n  background-image: url('assets/upload.svg');\n  background-size: 4rem auto;\n}\n.error {\n  color: #DC0505;\n  margin-top: .75rem;\n  font-weight: 400;\n}\n.dropzone {\n  flex: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n}\n@media (--large) {\n  .dropzone {\n    min-height: 20rem;\n  }\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"base": "onfido-sdk-ui-Uploader-base",
	"text": "onfido-sdk-ui-Uploader-text",
	"processing": "onfido-sdk-ui-Uploader-processing",
	"icon": "onfido-sdk-ui-Uploader-icon",
	"error": "onfido-sdk-ui-Uploader-error",
	"dropzone": "onfido-sdk-ui-Uploader-dropzone"
};

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Welcome-mtop-large {\n  margin-top: 4rem;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Welcome/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAAA;EACE,iBAAA;CCCD","file":"style.css","sourcesContent":[".mtop-large {\n  margin-top: 4rem;\n}\n",".mtop-large {\n  margin-top: 4rem;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"mtop-large": "onfido-sdk-ui-Welcome-mtop-large"
};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".onfido-sdk-ui-Modal-portal > * {\n  opacity: 0;\n}\n.onfido-sdk-ui-Modal-modalBody {\n  /*! Just a placeholder no namespace this element using css modules*/\n}\n.onfido-sdk-ui-Modal-overlay {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-transition: opacity 200ms, z-index 0s 200ms;\n  transition: opacity 200ms, z-index 0s 200ms;\n}\n.onfido-sdk-ui-Modal-overlay--after-open {\n  opacity: 1;\n}\n.onfido-sdk-ui-Modal-overlay--before-close {\n  opacity: 0;\n}\n.onfido-sdk-ui-Modal-inner {\n  /* Relative positioning so overflow affects absolute children */\n  position: relative;\n  overflow: auto;\n  margin: auto;\n  width: 94vw;\n  max-width: 32rem;\n  height: 600px;\n  text-align: center;\n  max-height: calc(100% + 4px);\n  background: #f3f3f3 url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%22109px%22%20height%3D%2223px%22%20viewBox%3D%220%200%20109%2023%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3EB0C1F3F5-ACA4-4559-9115-540CB810D458%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20sketchtool.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Crect%20id%3D%22path-1%22%20x%3D%220%22%20y%3D%220.00851075359%22%20width%3D%22108.871354%22%20height%3D%2222.0104878%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22mask-2%22%20maskContentUnits%3D%22userSpaceOnUse%22%20maskUnits%3D%22objectBoundingBox%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22108.871354%22%20height%3D%2222.0104878%22%20fill%3D%22white%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%2201%22%20transform%3D%22translate%28-663.000000%2C%20-771.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-160%22%20fill%3D%22%23F3F3F3%22%20x%3D%22469%22%20y%3D%22212%22%20width%3D%22500%22%20height%3D%22600%22%20rx%3D%223%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Powered-by-Onfido%22%20transform%3D%22translate%28663.000000%2C%20771.000000%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M71.6045005%2C13.9209592%20C73.1935808%2C13.9209592%2074.5317537%2C12.8190103%2074.5317537%2C11.1376863%20C74.5317537%2C9.45636218%2073.1935808%2C8.38849419%2071.6045005%2C8.38849419%20C70.0273682%2C8.38849419%2068.7011433%2C9.45636218%2068.7011433%2C11.1376863%20C68.7011433%2C12.8190103%2070.0273682%2C13.9209592%2071.6045005%2C13.9209592%20L71.6045005%2C13.9209592%20L71.6045005%2C13.9209592%20Z%20M86.9314726%2C8.50192423%20L84.3649347%2C8.50209716%20L84.3649347%2C8.01360436%20C84.3649347%2C7.34334679%2084.5441543%2C6.741251%2085.3566164%2C6.741251%20L85.965963%2C6.741251%20L85.965963%2C5.61658152%20L85.3566164%2C5.61658152%20C83.827276%2C5.61658152%2083.1223456%2C6.55948624%2083.1223456%2C8.01360436%20L83.1223456%2C8.50209716%20L82.1063801%2C8.50209716%20L82.1063801%2C9.46772248%20L83.1223456%2C9.46772248%20L83.1223456%2C13.8073562%20L84.3649347%2C13.8073562%20L84.3649347%2C9.46772248%20L86.9314726%2C9.46772248%20L86.9314726%2C13.8073562%20L88.1501657%2C13.8073562%20L88.1501657%2C8.50187059%20L86.9314726%2C8.50187059%20L86.9314726%2C8.50192423%20Z%20M71.6369327%2C12.8271266%20C70.7169388%2C12.8271266%2069.9522686%2C12.1795897%2069.9522686%2C11.1798835%20C69.9522686%2C10.2028978%2070.7169388%2C9.57808146%2071.6369327%2C9.57808146%20C72.5688745%2C9.57808146%2073.3335447%2C10.2028978%2073.3335447%2C11.1798835%20C73.3335447%2C12.1795897%2072.5688745%2C12.8271266%2071.6369327%2C12.8271266%20L71.6369327%2C12.8271266%20Z%20M77.09732%2C10.9957606%20C77.09732%2C9.95061317%2077.8022504%2C9.57572334%2078.5310767%2C9.57572334%20C79.247955%2C9.57572334%2079.701978%2C10.0528558%2079.701978%2C10.8935179%20L79.701978%2C13.8471953%20L80.9326191%2C13.8471953%20L80.9326191%2C10.7571943%20C80.9326191%2C9.257635%2080.1560009%2C8.42833326%2078.80588%2C8.42833326%20C78.1845855%2C8.42833326%2077.4199153%2C8.723701%2077.09732%2C9.33715708%20L77.09732%2C8.54193624%20L75.8666789%2C8.54193624%20L75.8666789%2C13.8471953%20L77.09732%2C13.8471953%20L77.09732%2C10.9957606%20L77.09732%2C10.9957606%20Z%20M86.7164091%2C6.17872514%20C86.7164091%2C6.59905616%2087.0987442%2C6.9171445%2087.5408192%2C6.9171445%20C87.9948421%2C6.9171445%2088.3532813%2C6.59905616%2088.3532813%2C6.17872514%20C88.3532813%2C5.75839412%2087.9948421%2C5.44030578%2087.5408192%2C5.44030578%20C87.0987442%2C5.44030578%2086.7164091%2C5.75839412%2086.7164091%2C6.17872514%20L86.7164091%2C6.17872514%20Z%20M94.1869752%2C13.8073562%20L95.4056683%2C13.8073562%20L95.4056683%2C5.61658152%20L94.1869752%2C5.61658152%20L94.1869752%2C9.26323712%20C93.840484%2C8.68386193%2093.0877618%2C8.38849419%2092.2991956%2C8.38849419%20C90.7937511%2C8.38849419%2089.5153181%2C9.45636218%2089.5153181%2C11.1604069%20C89.5153181%2C12.8303706%2090.7937511%2C13.9209592%2092.2991956%2C13.9209592%20C93.0638658%2C13.9209592%2093.840484%2C13.6028709%2094.1869752%2C13.034856%20L94.1869752%2C13.8073562%20L94.1869752%2C13.8073562%20Z%20M94.1630793%2C11.1376863%20C94.1630793%2C12.1714734%2093.3625651%2C12.7849294%2092.4545192%2C12.7849294%20C91.5225774%2C12.7849294%2090.7818031%2C12.1146719%2090.7818031%2C11.1376863%20C90.7818031%2C10.1607006%2091.5225774%2C9.52452397%2092.4545192%2C9.52452397%20C93.2908773%2C9.52452397%2094.1630793%2C10.0925389%2094.1630793%2C11.1376863%20L94.1630793%2C11.1376863%20Z%20M102.595264%2C11.1376863%20C102.595264%2C9.45636218%20101.257091%2C8.38849419%2099.6680108%2C8.38849419%20C98.0908785%2C8.38849419%2096.7646536%2C9.45636218%2096.7646536%2C11.1376863%20C96.7646536%2C12.8190103%2098.0908785%2C13.9209592%2099.6680108%2C13.9209592%20C101.257091%2C13.9209592%20102.595264%2C12.8190103%20102.595264%2C11.1376863%20L102.595264%2C11.1376863%20Z%20M62.0506072%2C8.4936649%20C61.283336%2C7.65833059%2060.1549203%2C7.13060169%2058.8968708%2C7.13060169%20C56.5852373%2C7.13060169%2054.7112881%2C8.91237858%2054.7112881%2C11.1103118%20C54.7112881%2C13.3082449%2056.5852373%2C15.0900218%2058.8968708%2C15.0900218%20C61.2085042%2C15.0900218%2063.0824534%2C13.3082449%2063.0824534%2C11.1103118%20C63.0824534%2C11.0394937%2063.0804937%2C11.0080214%2063.0804937%2C11.0080214%20C63.0784965%2C10.9473238%2063.1126943%2C10.8649421%2063.1571387%2C10.8226838%20L64.4929757%2C9.55255148%20C64.5379262%2C9.50981185%2064.5877355%2C9.52289552%2064.6053584%2C9.58069962%20C64.6053584%2C9.58069962%2064.6267875%2C9.6482133%2064.650259%2C9.73555617%20C64.7702431%2C10.1820429%2064.8340289%2C10.6499092%2064.8340289%2C11.1319407%20C64.8340289%2C14.2377159%2062.1860572%2C16.7554442%2058.9196186%2C16.7554442%20C55.6531799%2C16.7554442%2053.0052082%2C14.2377159%2053.0052082%2C11.1319407%20C53.0052082%2C8.02616549%2055.6531799%2C5.50843722%2058.9196186%2C5.50843722%20C60.6434589%2C5.50843722%2062.1950483%2C6.20965662%2063.2760838%2C7.32846475%20L64.7692695%2C5.90872299%20C64.813329%2C5.8668306%2064.8989338%2C5.83287011%2064.9626423%2C5.83287011%20L66.7826753%2C5.83287011%20C67.0339001%2C5.83287011%2067.0934933%2C5.96984895%2066.915312%2C6.13926628%20L59.0479212%2C13.6196907%20C58.9588875%2C13.7043452%2058.8154719%2C13.7052355%2058.7265936%2C13.6207288%20L56.4981236%2C11.6100129%20C56.4535235%2C11.5676065%2056.417368%2C11.4857957%2056.417368%2C11.4252207%20L56.417368%2C9.6947081%20C56.417368%2C9.45583999%2056.5608038%2C9.39857982%2056.7389248%2C9.5679398%20L58.8059559%2C11.4251574%20C58.850556%2C11.4675637%2058.9232404%2C11.4672087%2058.9664883%2C11.426088%20L62.0506072%2C8.4936649%20L62.0506072%2C8.4936649%20Z%20M99.6680108%2C12.7849294%20C98.748017%2C12.7849294%2097.9833468%2C12.1373925%2097.9833468%2C11.1376863%20C97.9833468%2C10.1607006%2098.748017%2C9.53588427%2099.6680108%2C9.53588427%20C100.599953%2C9.53588427%20101.364623%2C10.1607006%20101.364623%2C11.1376863%20C101.364623%2C12.1373925%20100.599953%2C12.7849294%2099.6680108%2C12.7849294%20L99.6680108%2C12.7849294%20Z%22%20id%3D%22Path%22%20fill%3D%22%23DADADA%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20id%3D%22Rectangle-82%22%20stroke%3D%22%23DADADA%22%20mask%3D%22url%28%23mask-2%29%22%20stroke-width%3D%222%22%20xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctext%20id%3D%22powered-by%22%20font-family%3D%22OpenSans%2C%20Open%20Sans%2C%20sans-serif%22%20font-size%3D%227.76784438%22%20font-weight%3D%22normal%22%20fill%3D%22%23DADADA%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctspan%20x%3D%227%22%20y%3D%2213%22%3Epowered%20by%3C%2Ftspan%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftext%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E') 50% calc(100% - 20px) no-repeat;\n  border-radius: 3px;\n  font-size: .875rem;\n  font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n  line-height: 1.5;\n  font-weight: 300;\n}\n@media (max-width: 30em) {\n  .onfido-sdk-ui-Modal-inner {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n  }\n}\n.onfido-sdk-ui-Modal-inner,\n.onfido-sdk-ui-Modal-inner *,\n.onfido-sdk-ui-Modal-inner *:before,\n.onfido-sdk-ui-Modal-inner *:after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.onfido-sdk-ui-Modal-portal .onfido-sdk-ui-Modal-inner {\n  margin: auto;\n  z-index: -1;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: opacity 200ms, z-index 0s 200ms, -webkit-transform 200ms;\n  transition: opacity 200ms, z-index 0s 200ms, -webkit-transform 200ms;\n  transition: opacity 200ms, transform 200ms, z-index 0s 200ms;\n  transition: opacity 200ms, transform 200ms, z-index 0s 200ms, -webkit-transform 200ms;\n}\n.onfido-sdk-ui-Modal-overlay--after-open .onfido-sdk-ui-Modal-inner {\n  z-index: 100;\n  opacity: 1;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  -webkit-transition: opacity 200ms, -webkit-transform 200ms;\n  transition: opacity 200ms, -webkit-transform 200ms;\n  transition: opacity 200ms, transform 200ms;\n  transition: opacity 200ms, transform 200ms, -webkit-transform 200ms;\n}\n.onfido-sdk-ui-Modal-content {\n  color: #9b9b9b;\n  font-size: 18px;\n  width: 100%;\n  max-height: 100%;\n  /*\n  using top and inverting with transform causes a bug on IE,\n  where the scrolling area is considered bigger than it really is,\n  hence why bottom was used instead\n  ref: http://stackoverflow.com/a/27990348/689223\n  ref: https://css-tricks.com/centering-css-complete-guide/#vertical-block-unknown\n  */\n  bottom: 50%;\n  -webkit-transform: translateY(50%);\n          transform: translateY(50%);\n  position: absolute;\n}\n", "", {"version":3,"sources":["/home/nicolas/Playground/onfido-sdk-ui/src/components/Modal/style.css","/home/nicolas/Playground/onfido-sdk-ui/style.css"],"names":[],"mappings":"AAEA;EAGE,WAAA;CCAD;ADGD;ECDE,oEAAoE;CACrE;ADMD;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,gBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EAEA,+BAAA;EACA,oDAAA;EAAA,4CAAA;CCJD;ADMC;EACE,WAAA;CCJH;ADMC;EACE,WAAA;CCJH;ADQD;ECNE,gEAAgE;EDQhE,mBAAA;EACA,eAAA;EACA,aAAA;EAEA,YAAA;EACA,iBAAA;EACA,cAAA;EACA,mBAAA;EACA,6BAAA;EACA,qqQAAA;EACA,mBAAA;EAEA,mBAAA;EACA,wDAAA;EACA,iBAAA;EACA,iBAAA;CCRD;ADUC;EA8CF;IA7CI,YAAA;IACA,aAAA;IACA,mBAAA;GCPD;CACF;ADSC;;;;EACE,+BAAA;UAAA,uBAAA;CCJH;ADOC;EACE,aAAA;EACA,YAAA;EACA,WAAA;EACA,4BAAA;UAAA,oBAAA;EACA,6EAAA;EAAA,qEAAA;EAAA,6DAAA;EAAA,sFAAA;CCLH;ADQC;EACE,aAAA;EACA,WAAA;EACA,4BAAA;UAAA,oBAAA;EACA,2DAAA;EAAA,mDAAA;EAAA,2CAAA;EAAA,oEAAA;CCNH;ADuBD;EACE,eAAA;EACA,gBAAA;EACA,YAAA;EACA,iBAAA;ECrBA;;;;;;IAME;EDMF,YAAA;EACA,mCAAA;UAAA,2BAAA;EACA,mBAAA;CCJD","file":"style.css","sourcesContent":["@import (less) \"../Theme/constants.css\";\n\n.portal > * {\n  // When the modal is closed, overlay div has no css class\n  // This selector should be overridden by the `&--after-open` class below\n  opacity: 0;\n}\n\n.modalBody {\n  /*! Just a placeholder no namespace this element using css modules*/\n}\n\n@value modal_animation_duration: 200ms;\n\n.overlay {\n  display: flex;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n\n  background: rgba(0, 0, 0, 0.6);\n  transition: opacity modal_animation_duration, z-index 0s modal_animation_duration;\n\n  &--after-open {\n    opacity: 1;\n  }\n  &--before-close {\n    opacity: 0;\n  }\n}\n\n.inner {\n  /* Relative positioning so overflow affects absolute children */\n  position: relative;\n  overflow: auto;\n  margin: auto;\n\n  width: 94vw;\n  max-width: 32rem;\n  height: 600px;\n  text-align: center;\n  max-height: ~\"calc(100% + 4px)\";\n  background: #f3f3f3 url('./assets/powered-by-onfido.svg') 50% ~\"calc(100% - 20px)\" no-repeat;\n  border-radius: 3px;\n\n  font-size: .875rem;\n  font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n  line-height: 1.5;\n  font-weight: 300;\n\n  @media (--small-viewport) {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n  }\n\n  &, *, *:before, *:after {\n    box-sizing: border-box;\n  }\n\n  .portal & {\n    margin: auto;\n    z-index: -1;\n    opacity: 0;\n    transform: scale(0);\n    transition: opacity modal_animation_duration, transform modal_animation_duration, z-index 0s modal_animation_duration;\n  }\n\n  .overlay--after-open & {\n    z-index: 100;\n    opacity: 1;\n    transform: scale(1);\n    transition: opacity modal_animation_duration, transform modal_animation_duration;\n  }\n}\n\n.verticalCenterWithUnknownHeight(){\n  /*\n  using top and inverting with transform causes a bug on IE,\n  where the scrolling area is considered bigger than it really is,\n  hence why bottom was used instead\n  ref: http://stackoverflow.com/a/27990348/689223\n  ref: https://css-tricks.com/centering-css-complete-guide/#vertical-block-unknown\n  */\n  bottom: 50%;\n  transform: translateY(50%);\n  position: absolute;\n}\n\n.content {\n  color: #9b9b9b;\n  font-size: 18px;\n  width: 100%;\n  max-height: 100%;\n  .verticalCenterWithUnknownHeight()\n}\n","@custom-media --large (min-width: 30em);\n@custom-media --small-viewport (max-width: 30em);\n@custom-media --large (min-width: 30em);\n.portal > * {\n  opacity: 0;\n}\n.modalBody {\n  /*! Just a placeholder no namespace this element using css modules*/\n}\n@value modal_animation_duration: 200ms;\n.overlay {\n  display: flex;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  transition: opacity modal_animation_duration, z-index 0s modal_animation_duration;\n}\n.overlay--after-open {\n  opacity: 1;\n}\n.overlay--before-close {\n  opacity: 0;\n}\n.inner {\n  /* Relative positioning so overflow affects absolute children */\n  position: relative;\n  overflow: auto;\n  margin: auto;\n  width: 94vw;\n  max-width: 32rem;\n  height: 600px;\n  text-align: center;\n  max-height: calc(100% + 4px);\n  background: #f3f3f3 url('assets/powered-by-onfido.svg') 50% calc(100% - 20px) no-repeat;\n  border-radius: 3px;\n  font-size: .875rem;\n  font-family: \"Gotham SSm A\", \"Gotham SSm B\", sans-serif;\n  line-height: 1.5;\n  font-weight: 300;\n}\n@media (--small-viewport) {\n  .inner {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n  }\n}\n.inner,\n.inner *,\n.inner *:before,\n.inner *:after {\n  box-sizing: border-box;\n}\n.portal .inner {\n  margin: auto;\n  z-index: -1;\n  opacity: 0;\n  transform: scale(0);\n  transition: opacity modal_animation_duration, transform modal_animation_duration, z-index 0s modal_animation_duration;\n}\n.overlay--after-open .inner {\n  z-index: 100;\n  opacity: 1;\n  transform: scale(1);\n  transition: opacity modal_animation_duration, transform modal_animation_duration;\n}\n.content {\n  color: #9b9b9b;\n  font-size: 18px;\n  width: 100%;\n  max-height: 100%;\n  /*\n  using top and inverting with transform causes a bug on IE,\n  where the scrolling area is considered bigger than it really is,\n  hence why bottom was used instead\n  ref: http://stackoverflow.com/a/27990348/689223\n  ref: https://css-tricks.com/centering-css-complete-guide/#vertical-block-unknown\n  */\n  bottom: 50%;\n  transform: translateY(50%);\n  position: absolute;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"modal_animation_duration": "200ms",
	"portal": "onfido-sdk-ui-Modal-portal",
	"modalBody": "onfido-sdk-ui-Modal-modalBody",
	"overlay": "onfido-sdk-ui-Modal-overlay",
	"overlay--after-open": "onfido-sdk-ui-Modal-overlay--after-open",
	"overlay--before-close": "onfido-sdk-ui-Modal-overlay--before-close",
	"inner": "onfido-sdk-ui-Modal-inner",
	"content": "onfido-sdk-ui-Modal-content"
};

/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = function(opts) {
  return new ElementClass(opts)
}

function indexOf(arr, prop) {
  if (arr.indexOf) return arr.indexOf(prop)
  for (var i = 0, len = arr.length; i < len; i++)
    if (arr[i] === prop) return i
  return -1
}

function ElementClass(opts) {
  if (!(this instanceof ElementClass)) return new ElementClass(opts)
  var self = this
  if (!opts) opts = {}

  // similar doing instanceof HTMLElement but works in IE8
  if (opts.nodeType) opts = {el: opts}

  this.opts = opts
  this.el = opts.el || document.body
  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
}

ElementClass.prototype.add = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return el.className = className
  var classes = el.className.split(' ')
  if (indexOf(classes, className) > -1) return classes
  classes.push(className)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.remove = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return
  var classes = el.className.split(' ')
  var idx = indexOf(classes, className)
  if (idx > -1) classes.splice(idx, 1)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.has = function(className) {
  var el = this.el
  if (!el) return
  var classes = el.className.split(' ')
  return indexOf(classes, className) > -1
}

ElementClass.prototype.toggle = function(className) {
  var el = this.el
  if (!el) return
  if (this.has(className)) this.remove(className)
  else this.add(className)
}


/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = function (cb) {
    if (typeof Promise !== 'function') {
      var err = new Error('Device enumeration not supported.');
      err.kind = 'METHOD_NOT_AVAILABLE';
      if (cb) {
          console.warn('module now uses promise based api - callback is deprecated');
          return cb(err);
      }
      throw err;
    }

    return new Promise(function(resolve, reject) {
        var processDevices = function (devices) {
            var normalizedDevices = [];
            for (var i = 0; i < devices.length; i++) {
                var device = devices[i];
                //make chrome values match spec
                var kind = device.kind || null;
                if (kind && kind.toLowerCase() === 'audio') {
                    kind = 'audioinput';
                } else if (kind && kind.toLowerCase() === 'video') {
                    kind = 'videoinput';
                }
                normalizedDevices.push({
                    facing: device.facing || null,
                    deviceId: device.id || device.deviceId || null,
                    label: device.label || null,
                    kind: kind,
                    groupId: device.groupId || null
                });
            }
            resolve(normalizedDevices);
            if (cb) {
                console.warn('module now uses promise based api - callback is deprecated');
                cb(null, normalizedDevices);
            }
        };

        if (window.navigator && window.navigator.mediaDevices && window.navigator.mediaDevices.enumerateDevices) {
            window.navigator.mediaDevices.enumerateDevices().then(processDevices);
        } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
            window.MediaStreamTrack.getSources(processDevices);
        } else {
            var err = new Error('Device enumeration not supported.');
            err.kind = 'METHOD_NOT_AVAILABLE';
            reject(err);
            if (cb) {
                console.warn('module now uses promise based api - callback is deprecated');
                cb(err);
            }
        }
    });
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._events.maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._events.maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count) {
    console.error('(node) warning: possible EventEmitter memory ' +
      'leak detected. %d listeners added. ' +
      'Use emitter.setMaxListeners() to increase limit.',
      count);

    if (console.trace){
      console.trace();
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._events.maxListeners > 0 &&
            tree._listeners.length > this._events.maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak(tree._listeners.length);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._events || init.call(this);
      this._events.maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._events.maxListeners > 0 &&
        this._events[type].length > this._events.maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak(this._events[type].length);
      }
    }

    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }

        this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++)
        this.emit("removeListenerAny", fns[i]);
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__(249);

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(268);

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(88);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(99);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(89);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(210);

var _PathUtils = __webpack_require__(88);

var _createTransitionManager = __webpack_require__(212);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _ExecutionEnvironment = __webpack_require__(209);

var _DOMUtils = __webpack_require__(208);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/mjackson/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  !_ExecutionEnvironment.canUseDOM ?  false ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$basename = props.basename,
      basename = _props$basename === undefined ? '' : _props$basename,
      _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

    return _extends({}, (0, _PathUtils.parsePath)(path), {
      state: state,
      key: key
    });
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      (function () {
        var action = 'POP';

        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
          if (ok) {
            setState({ action: action, location: location });
          } else {
            revertPop(location);
          }
        });
      })();
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
     false ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
         false ? (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
     false ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
         false ? (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      return unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(99);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
     false ? (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time') : void 0;

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 214 */
/***/ (function(module, exports) {

exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(90),
    getRawTag = __webpack_require__(218),
    objectToString = __webpack_require__(219);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(220);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(90);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 219 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 220 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(216);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 222 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = function parseUnit(str, out) {
    if (!out)
        out = [ 0, '' ]

    str = String(str)
    var num = parseFloat(str, 10)
    out[0] = num
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
    return out
}

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global ActiveXObject, window, console, define, module, jQuery */
//jshint unused:false, strict: false

/*
    PDFObject v2.0.201604172
    https://github.com/pipwerks/PDFObject
    Copyright (c) 2008-2016 Philip Hutchison
    MIT-style license: http://pipwerks.mit-license.org/
    UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
*/

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.PDFObject = factory();
  }
}(this, function () {

    "use strict";
    //jshint unused:true

    //PDFObject is designed for client-side (browsers), not server-side (node)
    //Will choke on undefined navigator and window vars when run on server
    //Return boolean false and exit function when running server-side

    if(typeof window === "undefined" || typeof navigator === "undefined"){ return false; }

    var pdfobjectversion = "2.0.201604172",
        supportsPDFs,

        //declare functions
        createAXO,
        isIE,
        supportsPdfMimeType = (typeof navigator.mimeTypes['application/pdf'] !== "undefined"),
        supportsPdfActiveX,
        buildFragmentString,
        log,
        embedError,
        embed,
        getTargetElement,
        generatePDFJSiframe,
        isIOS = (function (){ return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())); })(),
        generateEmbedElement;


    /* ----------------------------------------------------
       Supporting functions
       ---------------------------------------------------- */

    createAXO = function (type){
        var ax;
        try {
            ax = new ActiveXObject(type);
        } catch (e) {
            ax = null; //ensure ax remains null
        }
        return ax;
    };

    //IE11 still uses ActiveX for Adobe Reader, but IE 11 doesn't expose
    //window.ActiveXObject the same way previous versions of IE did
    //window.ActiveXObject will evaluate to false in IE 11, but "ActiveXObject" in window evaluates to true
    //so check the first one for older IE, and the second for IE11
    //FWIW, MS Edge (replacing IE11) does not support ActiveX at all, both will evaluate false
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    isIE = function (){ return !!(window.ActiveXObject || "ActiveXObject" in window); };

    //If either ActiveX support for "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    supportsPdfActiveX = function (){ return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl")); };

    //Determines whether PDF support is available
    supportsPDFs = (supportsPdfMimeType || (isIE() && supportsPdfActiveX()));

    //Create a fragment identifier for using PDF Open parameters when embedding PDF
    buildFragmentString = function(pdfParams){

        var string = "",
            prop;

        if(pdfParams){

            for (prop in pdfParams) {
                if (pdfParams.hasOwnProperty(prop)) {
                    string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
                }
            }

            //The string will be empty if no PDF Params found
            if(string){

                string = "#" + string;

                //Remove last ampersand
                string = string.slice(0, string.length - 1);

            }

        }

        return string;

    };

    log = function (msg){
        if(typeof console !== "undefined" && console.log){
            console.log("[PDFObject] " + msg);
        }
    };

    embedError = function (msg){
        log(msg);
        return false;
    };

    getTargetElement = function (targetSelector){

        //Default to body for full-browser PDF
        var targetNode = document.body;

        //If a targetSelector is specified, check to see whether
        //it's passing a selector, jQuery object, or an HTML element

        if(typeof targetSelector === "string"){

            //Is CSS selector
            targetNode = document.querySelector(targetSelector);

        } else if (typeof jQuery !== "undefined" && targetSelector instanceof jQuery && targetSelector.length) {

            //Is jQuery element. Extract HTML node
            targetNode = targetSelector.get(0);

        } else if (typeof targetSelector.nodeType !== "undefined" && targetSelector.nodeType === 1){

            //Is HTML element
            targetNode = targetSelector;

        }

        return targetNode;

    };

    generatePDFJSiframe = function (targetNode, url, pdfOpenFragment, PDFJS_URL, id){

        var fullURL = PDFJS_URL + "?file=" + encodeURIComponent(url) + pdfOpenFragment;
        var scrollfix = (isIOS) ? "-webkit-overflow-scrolling: touch; overflow-y: scroll; " : "overflow: hidden; ";
        var iframe = "<div style='" + scrollfix + "position: absolute; top: 0; right: 0; bottom: 0; left: 0;'><iframe  " + id + " src='" + fullURL + "' style='border: none; width: 100%; height: 100%;' frameborder='0'></iframe></div>";
        targetNode.className += " pdfobject-container";
        targetNode.style.position = "relative";
        targetNode.style.overflow = "auto";
        targetNode.innerHTML = iframe;
        return targetNode.getElementsByTagName("iframe")[0];

    };

    generateEmbedElement = function (targetNode, targetSelector, url, pdfOpenFragment, width, height, id){

        var style = "";

        if(targetSelector && targetSelector !== document.body){
            style = "width: " + width + "; height: " + height + ";";
        } else {
            style = "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
        }

        targetNode.className += " pdfobject-container";
        targetNode.innerHTML = "<embed " + id + " class='pdfobject' src='" + url + pdfOpenFragment + "' type='application/pdf' style='overflow: auto; " + style + "'/>";

        return targetNode.getElementsByTagName("embed")[0];

    };

    embed = function(url, targetSelector, options){

        //Ensure URL is available. If not, exit now.
        if(typeof url !== "string"){ return embedError("URL is not valid"); }

        //If targetSelector is not defined, convert to boolean
        targetSelector = (typeof targetSelector !== "undefined") ? targetSelector : false;

        //Ensure options object is not undefined -- enables easier error checking below
        options = (typeof options !== "undefined") ? options : {};

        //Get passed options, or set reasonable defaults
        var id = (options.id && typeof options.id === "string") ? "id='" + options.id + "'" : "",
            page = (options.page) ? options.page : false,
            pdfOpenParams = (options.pdfOpenParams) ? options.pdfOpenParams : {},
            fallbackLink = (typeof options.fallbackLink !== "undefined") ? options.fallbackLink : true,
            width = (options.width) ? options.width : "100%",
            height = (options.height) ? options.height : "100%",
            forcePDFJS = (typeof options.forcePDFJS === "boolean") ? options.forcePDFJS : false,
            PDFJS_URL = (options.PDFJS_URL) ? options.PDFJS_URL : false,
            targetNode = getTargetElement(targetSelector),
            fallbackHTML = "",
            pdfOpenFragment = "",
            fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";

        //If target element is specified but is not valid, exit without doing anything
        if(!targetNode){ return embedError("Target element cannot be determined"); }


        //page option overrides pdfOpenParams, if found
        if(page){
            pdfOpenParams.page = page;
        }

        //Stringify optional Adobe params for opening document (as fragment identifier)
        pdfOpenFragment = buildFragmentString(pdfOpenParams);

        //Do the dance
        if(forcePDFJS && PDFJS_URL){

            return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id);

        } else if(supportsPDFs){

            return generateEmbedElement(targetNode, targetSelector, url, pdfOpenFragment, width, height, id);

        } else {

            if(PDFJS_URL){

                return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id);

            } else if(fallbackLink){

                fallbackHTML = (typeof fallbackLink === "string") ? fallbackLink : fallbackHTML_default;
                targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);

            }

            return embedError("This browser does not support embedded PDFs");

        }

    };

    return {
        embed: function (a,b,c){ return embed(a,b,c); },
        pdfobjectversion: (function () { return pdfobjectversion; })(),
        supportsPDFs: (function (){ return supportsPDFs; })()
    };

}));

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(206);
var invariant = __webpack_require__(207);
var ReactPropTypesSecret = __webpack_require__(227);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(225)();
}


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function RavenConfigError(message) {
    this.name = 'RavenConfigError';
    this.message = message;
}
RavenConfigError.prototype = new Error();
RavenConfigError.prototype.constructor = RavenConfigError;

module.exports = RavenConfigError;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrapMethod = function(console, level, callback) {
    var originalConsoleLevel = console[level];
    var originalConsole = console;

    if (!(level in console)) {
        return;
    }

    var sentryLevel = level === 'warn'
        ? 'warning'
        : level;

    console[level] = function () {
        var args = [].slice.call(arguments);

        var msg = '' + args.join(' ');
        var data = {level: sentryLevel, logger: 'console', extra: {'arguments': args}};
        callback && callback(msg, data);

        // this fails for some browsers. :(
        if (originalConsoleLevel) {
            // IE9 doesn't allow calling apply on console functions directly
            // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
            Function.prototype.apply.call(
                originalConsoleLevel,
                originalConsole,
                args
            );
        }
    };
};

module.exports = {
    wrapMethod: wrapMethod
};


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*global XDomainRequest:false, __DEV__:false*/


var TraceKit = __webpack_require__(232);
var RavenConfigError = __webpack_require__(228);
var stringify = __webpack_require__(214);

var wrapConsoleMethod = __webpack_require__(229).wrapMethod;

var dsnKeys = 'source protocol user pass host port path'.split(' '),
    dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

function now() {
    return +new Date();
}

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window = typeof window !== 'undefined' ? window
            : typeof global !== 'undefined' ? global
            : typeof self !== 'undefined' ? self
            : {};
var _document = _window.document;

// First, check for JSON support
// If there is no JSON, we no-op the core features of Raven
// since JSON is required to encode the payload
function Raven() {
    this._hasJSON = !!(typeof JSON === 'object' && JSON.stringify);
    // Raven can run in contexts where there's no document (react-native)
    this._hasDocument = !isUndefined(_document);
    this._lastCapturedException = null;
    this._lastEventId = null;
    this._globalServer = null;
    this._globalKey = null;
    this._globalProject = null;
    this._globalContext = {};
    this._globalOptions = {
        logger: 'javascript',
        ignoreErrors: [],
        ignoreUrls: [],
        whitelistUrls: [],
        includePaths: [],
        crossOrigin: 'anonymous',
        collectWindowErrors: true,
        maxMessageLength: 0,
        stackTraceLimit: 50,
        autoBreadcrumbs: true
    };
    this._ignoreOnError = 0;
    this._isRavenInstalled = false;
    this._originalErrorStackTraceLimit = Error.stackTraceLimit;
    // capture references to window.console *and* all its methods first
    // before the console plugin has a chance to monkey patch
    this._originalConsole = _window.console || {};
    this._originalConsoleMethods = {};
    this._plugins = [];
    this._startTime = now();
    this._wrappedBuiltIns = [];
    this._breadcrumbs = [];
    this._lastCapturedEvent = null;
    this._keypressTimeout;
    this._location = _window.location;
    this._lastHref = this._location && this._location.href;

    for (var method in this._originalConsole) {  // eslint-disable-line guard-for-in
      this._originalConsoleMethods[method] = this._originalConsole[method];
    }
}

/*
 * The core Raven singleton
 *
 * @this {Raven}
 */

Raven.prototype = {
    // Hardcode version string so that raven source can be loaded directly via
    // webpack (using a build step causes webpack #1617). Grunt verifies that
    // this value matches package.json during build.
    //   See: https://github.com/getsentry/raven-js/issues/465
    VERSION: '3.9.1',

    debug: false,

    TraceKit: TraceKit, // alias to TraceKit

    /*
     * Configure Raven with a DSN and extra options
     *
     * @param {string} dsn The public Sentry DSN
     * @param {object} options Optional set of of global options [optional]
     * @return {Raven}
     */
    config: function(dsn, options) {
        var self = this;

        if (self._globalServer) {
                this._logDebug('error', 'Error: Raven has already been configured');
            return self;
        }
        if (!dsn) return self;

        var globalOptions = self._globalOptions;

        // merge in options
        if (options) {
            each(options, function(key, value){
                // tags and extra are special and need to be put into context
                if (key === 'tags' || key === 'extra' || key === 'user') {
                    self._globalContext[key] = value;
                } else {
                    globalOptions[key] = value;
                }
            });
        }

        self.setDSN(dsn);

        // "Script error." is hard coded into browsers for errors that it can't read.
        // this is the result of a script being pulled in from an external domain and CORS.
        globalOptions.ignoreErrors.push(/^Script error\.?$/);
        globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

        // join regexp rules into one big rule
        globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
        globalOptions.ignoreUrls = globalOptions.ignoreUrls.length ? joinRegExp(globalOptions.ignoreUrls) : false;
        globalOptions.whitelistUrls = globalOptions.whitelistUrls.length ? joinRegExp(globalOptions.whitelistUrls) : false;
        globalOptions.includePaths = joinRegExp(globalOptions.includePaths);
        globalOptions.maxBreadcrumbs = Math.max(0, Math.min(globalOptions.maxBreadcrumbs || 100, 100)); // default and hard limit is 100

        var autoBreadcrumbDefaults = {
            xhr: true,
            console: true,
            dom: true,
            location: true
        };

        var autoBreadcrumbs = globalOptions.autoBreadcrumbs;
        if ({}.toString.call(autoBreadcrumbs) === '[object Object]') {
            autoBreadcrumbs = objectMerge(autoBreadcrumbDefaults, autoBreadcrumbs);
        } else if (autoBreadcrumbs !== false) {
            autoBreadcrumbs = autoBreadcrumbDefaults;
        }
        globalOptions.autoBreadcrumbs = autoBreadcrumbs;

        TraceKit.collectWindowErrors = !!globalOptions.collectWindowErrors;

        // return for chaining
        return self;
    },

    /*
     * Installs a global window.onerror error handler
     * to capture and report uncaught exceptions.
     * At this point, install() is required to be called due
     * to the way TraceKit is set up.
     *
     * @return {Raven}
     */
    install: function() {
        var self = this;
        if (self.isSetup() && !self._isRavenInstalled) {
            TraceKit.report.subscribe(function () {
                self._handleOnErrorStackInfo.apply(self, arguments);
            });
            self._instrumentTryCatch();
            if (self._globalOptions.autoBreadcrumbs)
                self._instrumentBreadcrumbs();

            // Install all of the plugins
            self._drainPlugins();

            self._isRavenInstalled = true;
        }

        Error.stackTraceLimit = self._globalOptions.stackTraceLimit;
        return this;
    },

    /*
     * Set the DSN (can be called multiple time unlike config)
     *
     * @param {string} dsn The public Sentry DSN
     */
    setDSN: function(dsn) {
        var self = this,
            uri = self._parseDSN(dsn),
          lastSlash = uri.path.lastIndexOf('/'),
          path = uri.path.substr(1, lastSlash);

        self._dsn = dsn;
        self._globalKey = uri.user;
        self._globalSecret = uri.pass && uri.pass.substr(1);
        self._globalProject = uri.path.substr(lastSlash + 1);

        self._globalServer = self._getGlobalServer(uri);

        self._globalEndpoint = self._globalServer +
            '/' + path + 'api/' + self._globalProject + '/store/';
    },

    /*
     * Wrap code within a context so Raven can capture errors
     * reliably across domains that is executed immediately.
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The callback to be immediately executed within the context
     * @param {array} args An array of arguments to be called with the callback [optional]
     */
    context: function(options, func, args) {
        if (isFunction(options)) {
            args = func || [];
            func = options;
            options = undefined;
        }

        return this.wrap(options, func).apply(this, args);
    },

    /*
     * Wrap code within a context and returns back a new function to be executed
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The function to be wrapped in a new context
     * @param {function} func A function to call before the try/catch wrapper [optional, private]
     * @return {function} The newly wrapped functions with a context
     */
    wrap: function(options, func, _before) {
        var self = this;
        // 1 argument has been passed, and it's not a function
        // so just return it
        if (isUndefined(func) && !isFunction(options)) {
            return options;
        }

        // options is optional
        if (isFunction(options)) {
            func = options;
            options = undefined;
        }

        // At this point, we've passed along 2 arguments, and the second one
        // is not a function either, so we'll just return the second argument.
        if (!isFunction(func)) {
            return func;
        }

        // We don't wanna wrap it twice!
        try {
            if (func.__raven__) {
                return func;
            }

            // If this has already been wrapped in the past, return that
            if (func.__raven_wrapper__ ){
                return func.__raven_wrapper__ ;
            }
        } catch (e) {
            // Just accessing custom props in some Selenium environments
            // can cause a "Permission denied" exception (see raven-js#495).
            // Bail on wrapping and return the function as-is (defers to window.onerror).
            return func;
        }

        function wrapped() {
            var args = [], i = arguments.length,
                deep = !options || options && options.deep !== false;

            if (_before && isFunction(_before)) {
                _before.apply(this, arguments);
            }

            // Recursively wrap all of a function's arguments that are
            // functions themselves.
            while(i--) args[i] = deep ? self.wrap(options, arguments[i]) : arguments[i];

            try {
                return func.apply(this, args);
            } catch(e) {
                self._ignoreNextOnError();
                self.captureException(e, options);
                throw e;
            }
        }

        // copy over properties of the old function
        for (var property in func) {
            if (hasKey(func, property)) {
                wrapped[property] = func[property];
            }
        }
        wrapped.prototype = func.prototype;

        func.__raven_wrapper__ = wrapped;
        // Signal that this function has been wrapped already
        // for both debugging and to prevent it to being wrapped twice
        wrapped.__raven__ = true;
        wrapped.__inner__ = func;

        return wrapped;
    },

    /*
     * Uninstalls the global error handler.
     *
     * @return {Raven}
     */
    uninstall: function() {
        TraceKit.report.uninstall();

        this._restoreBuiltIns();

        Error.stackTraceLimit = this._originalErrorStackTraceLimit;
        this._isRavenInstalled = false;

        return this;
    },

    /*
     * Manually capture an exception and send it over to Sentry
     *
     * @param {error} ex An exception to be logged
     * @param {object} options A specific set of options for this error [optional]
     * @return {Raven}
     */
    captureException: function(ex, options) {
        // If not an Error is passed through, recall as a message instead
        if (!isError(ex)) {
            return this.captureMessage(ex, objectMerge({
                trimHeadFrames: 1,
                stacktrace: true // if we fall back to captureMessage, default to attempting a new trace
            }, options));
        }

        // Store the raw exception object for potential debugging and introspection
        this._lastCapturedException = ex;

        // TraceKit.report will re-raise any exception passed to it,
        // which means you have to wrap it in try/catch. Instead, we
        // can wrap it here and only re-raise if TraceKit.report
        // raises an exception different from the one we asked to
        // report on.
        try {
            var stack = TraceKit.computeStackTrace(ex);
            this._handleStackInfo(stack, options);
        } catch(ex1) {
            if(ex !== ex1) {
                throw ex1;
            }
        }

        return this;
    },

    /*
     * Manually send a message to Sentry
     *
     * @param {string} msg A plain message to be captured in Sentry
     * @param {object} options A specific set of options for this message [optional]
     * @return {Raven}
     */
    captureMessage: function(msg, options) {
        // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
        // early call; we'll error on the side of logging anything called before configuration since it's
        // probably something you should see:
        if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(msg)) {
            return;
        }

        options = options || {};

        var data = objectMerge({
            message: msg + ''  // Make sure it's actually a string
        }, options);

        if (this._globalOptions.stacktrace || (options && options.stacktrace)) {
            var ex;
            // create a stack trace from this point; just trim
            // off extra frames so they don't include this function call (or
            // earlier Raven.js library fn calls)
            try {
                throw new Error(msg);
            } catch (ex1) {
                ex = ex1;
            }

            // null exception name so `Error` isn't prefixed to msg
            ex.name = null;

            options = objectMerge({
                // fingerprint on msg, not stack trace (legacy behavior, could be
                // revisited)
                fingerprint: msg,
                trimHeadFrames: (options.trimHeadFrames || 0) + 1
            }, options);

            var stack = TraceKit.computeStackTrace(ex);
            var frames = this._prepareFrames(stack, options);
            data.stacktrace = {
                // Sentry expects frames oldest to newest
                frames: frames.reverse()
            }
        }

        // Fire away!
        this._send(data);

        return this;
    },

    captureBreadcrumb: function (obj) {
        var crumb = objectMerge({
            timestamp: now() / 1000
        }, obj);

        if (isFunction(this._globalOptions.breadcrumbCallback)) {
            var result = this._globalOptions.breadcrumbCallback(crumb);

            if (isObject(result) && !isEmptyObject(result)) {
                crumb = result;
            } else if (result === false) {
                return this;
            }
        }

        this._breadcrumbs.push(crumb);
        if (this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs) {
            this._breadcrumbs.shift();
        }
        return this;
    },

    addPlugin: function(plugin /*arg1, arg2, ... argN*/) {
        var pluginArgs = [].slice.call(arguments, 1);

        this._plugins.push([plugin, pluginArgs]);
        if (this._isRavenInstalled) {
            this._drainPlugins();
        }

        return this;
    },

    /*
     * Set/clear a user to be sent along with the payload.
     *
     * @param {object} user An object representing user data [optional]
     * @return {Raven}
     */
    setUserContext: function(user) {
        // Intentionally do not merge here since that's an unexpected behavior.
        this._globalContext.user = user;

        return this;
    },

    /*
     * Merge extra attributes to be sent along with the payload.
     *
     * @param {object} extra An object representing extra data [optional]
     * @return {Raven}
     */
    setExtraContext: function(extra) {
        this._mergeContext('extra', extra);

        return this;
    },

    /*
     * Merge tags to be sent along with the payload.
     *
     * @param {object} tags An object representing tags [optional]
     * @return {Raven}
     */
    setTagsContext: function(tags) {
        this._mergeContext('tags', tags);

        return this;
    },

    /*
     * Clear all of the context.
     *
     * @return {Raven}
     */
    clearContext: function() {
        this._globalContext = {};

        return this;
    },

    /*
     * Get a copy of the current context. This cannot be mutated.
     *
     * @return {object} copy of context
     */
    getContext: function() {
        // lol javascript
        return JSON.parse(stringify(this._globalContext));
    },


    /*
     * Set environment of application
     *
     * @param {string} environment Typically something like 'production'.
     * @return {Raven}
     */
    setEnvironment: function(environment) {
        this._globalOptions.environment = environment;

        return this;
    },

    /*
     * Set release version of application
     *
     * @param {string} release Typically something like a git SHA to identify version
     * @return {Raven}
     */
    setRelease: function(release) {
        this._globalOptions.release = release;

        return this;
    },

    /*
     * Set the dataCallback option
     *
     * @param {function} callback The callback to run which allows the
     *                            data blob to be mutated before sending
     * @return {Raven}
     */
    setDataCallback: function(callback) {
        var original = this._globalOptions.dataCallback;
        this._globalOptions.dataCallback = isFunction(callback)
          ? function (data) { return callback(data, original); }
          : callback;

        return this;
    },

    /*
     * Set the breadcrumbCallback option
     *
     * @param {function} callback The callback to run which allows filtering
     *                            or mutating breadcrumbs
     * @return {Raven}
     */
    setBreadcrumbCallback: function(callback) {
        var original = this._globalOptions.breadcrumbCallback;
        this._globalOptions.breadcrumbCallback = isFunction(callback)
          ? function (data) { return callback(data, original); }
          : callback;

        return this;
    },

    /*
     * Set the shouldSendCallback option
     *
     * @param {function} callback The callback to run which allows
     *                            introspecting the blob before sending
     * @return {Raven}
     */
    setShouldSendCallback: function(callback) {
        var original = this._globalOptions.shouldSendCallback;
        this._globalOptions.shouldSendCallback = isFunction(callback)
            ? function (data) { return callback(data, original); }
            : callback;

        return this;
    },

    /**
     * Override the default HTTP transport mechanism that transmits data
     * to the Sentry server.
     *
     * @param {function} transport Function invoked instead of the default
     *                             `makeRequest` handler.
     *
     * @return {Raven}
     */
    setTransport: function(transport) {
        this._globalOptions.transport = transport;

        return this;
    },

    /*
     * Get the latest raw exception that was captured by Raven.
     *
     * @return {error}
     */
    lastException: function() {
        return this._lastCapturedException;
    },

    /*
     * Get the last event id
     *
     * @return {string}
     */
    lastEventId: function() {
        return this._lastEventId;
    },

    /*
     * Determine if Raven is setup and ready to go.
     *
     * @return {boolean}
     */
    isSetup: function() {
        if (!this._hasJSON) return false;  // needs JSON support
        if (!this._globalServer) {
            if (!this.ravenNotConfiguredError) {
              this.ravenNotConfiguredError = true;
              this._logDebug('error', 'Error: Raven has not been configured.');
            }
            return false;
        }
        return true;
    },

    afterLoad: function () {
        // TODO: remove window dependence?

        // Attempt to initialize Raven on load
        var RavenConfig = _window.RavenConfig;
        if (RavenConfig) {
            this.config(RavenConfig.dsn, RavenConfig.config).install();
        }
    },

    showReportDialog: function (options) {
        if (!_document) // doesn't work without a document (React native)
            return;

        options = options || {};

        var lastEventId = options.eventId || this.lastEventId();
        if (!lastEventId) {
            throw new RavenConfigError('Missing eventId');
        }

        var dsn = options.dsn || this._dsn;
        if (!dsn) {
            throw new RavenConfigError('Missing DSN');
        }

        var encode = encodeURIComponent;
        var qs = '';
        qs += '?eventId=' + encode(lastEventId);
        qs += '&dsn=' + encode(dsn);

        var user = options.user || this._globalContext.user;
        if (user) {
            if (user.name)  qs += '&name=' + encode(user.name);
            if (user.email) qs += '&email=' + encode(user.email);
        }

        var globalServer = this._getGlobalServer(this._parseDSN(dsn));

        var script = _document.createElement('script');
        script.async = true;
        script.src = globalServer + '/api/embed/error-page/' + qs;
        (_document.head || _document.body).appendChild(script);
    },

    /**** Private functions ****/
    _ignoreNextOnError: function () {
        var self = this;
        this._ignoreOnError += 1;
        setTimeout(function () {
            // onerror should trigger before setTimeout
            self._ignoreOnError -= 1;
        });
    },

    _triggerEvent: function(eventType, options) {
        // NOTE: `event` is a native browser thing, so let's avoid conflicting wiht it
        var evt, key;

        if (!this._hasDocument)
            return;

        options = options || {};

        eventType = 'raven' + eventType.substr(0,1).toUpperCase() + eventType.substr(1);

        if (_document.createEvent) {
            evt = _document.createEvent('HTMLEvents');
            evt.initEvent(eventType, true, true);
        } else {
            evt = _document.createEventObject();
            evt.eventType = eventType;
        }

        for (key in options) if (hasKey(options, key)) {
            evt[key] = options[key];
        }

        if (_document.createEvent) {
            // IE9 if standards
            _document.dispatchEvent(evt);
        } else {
            // IE8 regardless of Quirks or Standards
            // IE9 if quirks
            try {
                _document.fireEvent('on' + evt.eventType.toLowerCase(), evt);
            } catch(e) {
                // Do nothing
            }
        }
    },

    /**
     * Wraps addEventListener to capture UI breadcrumbs
     * @param evtName the event name (e.g. "click")
     * @returns {Function}
     * @private
     */
    _breadcrumbEventHandler: function(evtName) {
        var self = this;
        return function (evt) {
            // reset keypress timeout; e.g. triggering a 'click' after
            // a 'keypress' will reset the keypress debounce so that a new
            // set of keypresses can be recorded
            self._keypressTimeout = null;

            // It's possible this handler might trigger multiple times for the same
            // event (e.g. event propagation through node ancestors). Ignore if we've
            // already captured the event.
            if (self._lastCapturedEvent === evt)
                return;

            self._lastCapturedEvent = evt;
            var elem = evt.target;

            var target;

            // try/catch htmlTreeAsString because it's particularly complicated, and
            // just accessing the DOM incorrectly can throw an exception in some circumstances.
            try {
                target = htmlTreeAsString(elem);
            } catch (e) {
                target = '<unknown>';
            }

            self.captureBreadcrumb({
                category: 'ui.' + evtName, // e.g. ui.click, ui.input
                message: target
            });
        };
    },

    /**
     * Wraps addEventListener to capture keypress UI events
     * @returns {Function}
     * @private
     */
    _keypressEventHandler: function() {
        var self = this,
            debounceDuration = 1000; // milliseconds

        // TODO: if somehow user switches keypress target before
        //       debounce timeout is triggered, we will only capture
        //       a single breadcrumb from the FIRST target (acceptable?)
        return function (evt) {
            var target = evt.target,
                tagName = target && target.tagName;

            // only consider keypress events on actual input elements
            // this will disregard keypresses targeting body (e.g. tabbing
            // through elements, hotkeys, etc)
            if (!tagName || tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)
                return;

            // record first keypress in a series, but ignore subsequent
            // keypresses until debounce clears
            var timeout = self._keypressTimeout;
            if (!timeout) {
                self._breadcrumbEventHandler('input')(evt);
            }
            clearTimeout(timeout);
            self._keypressTimeout = setTimeout(function () {
                self._keypressTimeout = null;
            }, debounceDuration);
        };
    },

    /**
     * Captures a breadcrumb of type "navigation", normalizing input URLs
     * @param to the originating URL
     * @param from the target URL
     * @private
     */
    _captureUrlChange: function(from, to) {
        var parsedLoc = parseUrl(this._location.href);
        var parsedTo = parseUrl(to);
        var parsedFrom = parseUrl(from);

        // because onpopstate only tells you the "new" (to) value of location.href, and
        // not the previous (from) value, we need to track the value of the current URL
        // state ourselves
        this._lastHref = to;

        // Use only the path component of the URL if the URL matches the current
        // document (almost all the time when using pushState)
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host)
            to = parsedTo.relative;
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host)
            from = parsedFrom.relative;

        this.captureBreadcrumb({
            category: 'navigation',
            data: {
                to: to,
                from: from
            }
        });
    },

    /**
     * Install any queued plugins
     */
    _instrumentTryCatch: function() {
        var self = this;

        var wrappedBuiltIns = self._wrappedBuiltIns;

        function wrapTimeFn(orig) {
            return function (fn, t) { // preserve arity
                // Make a copy of the arguments to prevent deoptimization
                // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
                var args = new Array(arguments.length);
                for(var i = 0; i < args.length; ++i) {
                    args[i] = arguments[i];
                }
                var originalCallback = args[0];
                if (isFunction(originalCallback)) {
                    args[0] = self.wrap(originalCallback);
                }

                // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
                // also supports only two arguments and doesn't care what this is, so we
                // can just call the original function directly.
                if (orig.apply) {
                    return orig.apply(this, args);
                } else {
                    return orig(args[0], args[1]);
                }
            };
        }

        var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

        function wrapEventTarget(global) {
            var proto = _window[global] && _window[global].prototype;
            if (proto && proto.hasOwnProperty && proto.hasOwnProperty('addEventListener')) {
                fill(proto, 'addEventListener', function(orig) {
                    return function (evtName, fn, capture, secure) { // preserve arity
                        try {
                            if (fn && fn.handleEvent) {
                                fn.handleEvent = self.wrap(fn.handleEvent);
                            }
                        } catch (err) {
                            // can sometimes get 'Permission denied to access property "handle Event'
                        }

                        // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
                        // so that we don't have more than one wrapper function
                        var before,
                            clickHandler,
                            keypressHandler;

                        if (autoBreadcrumbs && autoBreadcrumbs.dom && (global === 'EventTarget' || global === 'Node')) {
                            // NOTE: generating multiple handlers per addEventListener invocation, should
                            //       revisit and verify we can just use one (almost certainly)
                            clickHandler = self._breadcrumbEventHandler('click');
                            keypressHandler = self._keypressEventHandler();
                            before = function (evt) {
                                // need to intercept every DOM event in `before` argument, in case that
                                // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                                // see #724
                                if (!evt) return;

                                if (evt.type === 'click')
                                    return clickHandler(evt);
                                else if (evt.type === 'keypress')
                                    return keypressHandler(evt);
                            };
                        }
                        return orig.call(this, evtName, self.wrap(fn, undefined, before), capture, secure);
                    };
                }, wrappedBuiltIns);
                fill(proto, 'removeEventListener', function (orig) {
                    return function (evt, fn, capture, secure) {
                        try {
                            fn = fn && (fn.__raven_wrapper__ ? fn.__raven_wrapper__  : fn);
                        } catch (e) {
                            // ignore, accessing __raven_wrapper__ will throw in some Selenium environments
                        }
                        return orig.call(this, evt, fn, capture, secure);
                    };
                }, wrappedBuiltIns);
            }
        }

        fill(_window, 'setTimeout', wrapTimeFn, wrappedBuiltIns);
        fill(_window, 'setInterval', wrapTimeFn, wrappedBuiltIns);
        if (_window.requestAnimationFrame) {
            fill(_window, 'requestAnimationFrame', function (orig) {
                return function (cb) {
                    return orig(self.wrap(cb));
                };
            }, wrappedBuiltIns);
        }

        // event targets borrowed from bugsnag-js:
        // https://github.com/bugsnag/bugsnag-js/blob/master/src/bugsnag.js#L666
        var eventTargets = ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'];
        for (var i = 0; i < eventTargets.length; i++) {
            wrapEventTarget(eventTargets[i]);
        }

        var $ = _window.jQuery || _window.$;
        if ($ && $.fn && $.fn.ready) {
            fill($.fn, 'ready', function (orig) {
                return function (fn) {
                    return orig.call(this, self.wrap(fn));
                };
            }, wrappedBuiltIns);
        }
    },


    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - XMLHttpRequests
     *  - DOM interactions (click/typing)
     *  - window.location changes
     *  - console
     *
     * Can be disabled or individually configured via the `autoBreadcrumbs` config option
     */
    _instrumentBreadcrumbs: function () {
        var self = this;
        var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

        var wrappedBuiltIns = self._wrappedBuiltIns;

        function wrapProp(prop, xhr) {
            if (prop in xhr && isFunction(xhr[prop])) {
                fill(xhr, prop, function (orig) {
                    return self.wrap(orig);
                }); // intentionally don't track filled methods on XHR instances
            }
        }

        if (autoBreadcrumbs.xhr && 'XMLHttpRequest' in _window) {
            var xhrproto = XMLHttpRequest.prototype;
            fill(xhrproto, 'open', function(origOpen) {
                return function (method, url) { // preserve arity

                    // if Sentry key appears in URL, don't capture
                    if (isString(url) && url.indexOf(self._globalKey) === -1) {
                        this.__raven_xhr = {
                            method: method,
                            url: url,
                            status_code: null
                        };
                    }

                    return origOpen.apply(this, arguments);
                };
            }, wrappedBuiltIns);

            fill(xhrproto, 'send', function(origSend) {
                return function (data) { // preserve arity
                    var xhr = this;

                    function onreadystatechangeHandler() {
                        if (xhr.__raven_xhr && (xhr.readyState === 1 || xhr.readyState === 4)) {
                            try {
                                // touching statusCode in some platforms throws
                                // an exception
                                xhr.__raven_xhr.status_code = xhr.status;
                            } catch (e) { /* do nothing */ }
                            self.captureBreadcrumb({
                                type: 'http',
                                category: 'xhr',
                                data: xhr.__raven_xhr
                            });
                        }
                    }

                    var props = ['onload', 'onerror', 'onprogress'];
                    for (var j = 0; j < props.length; j++) {
                        wrapProp(props[j], xhr);
                    }

                    if ('onreadystatechange' in xhr && isFunction(xhr.onreadystatechange)) {
                        fill(xhr, 'onreadystatechange', function (orig) {
                            return self.wrap(orig, undefined, onreadystatechangeHandler);
                        } /* intentionally don't track this instrumentation */);
                    } else {
                        // if onreadystatechange wasn't actually set by the page on this xhr, we
                        // are free to set our own and capture the breadcrumb
                        xhr.onreadystatechange = onreadystatechangeHandler;
                    }

                    return origSend.apply(this, arguments);
                };
            }, wrappedBuiltIns);
        }

        if (autoBreadcrumbs.xhr && 'fetch' in _window) {
            fill(_window, 'fetch', function(origFetch) {
                return function (fn, t) { // preserve arity
                    // Make a copy of the arguments to prevent deoptimization
                    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
                    var args = new Array(arguments.length);
                    for(var i = 0; i < args.length; ++i) {
                        args[i] = arguments[i];
                    }

                    var method = 'GET';

                    if (args[1] && args[1].method) {
                        method = args[1].method;
                    }

                    var fetchData = {
                        method: method,
                        url: args[0],
                        status_code: null
                    };

                    self.captureBreadcrumb({
                        type: 'http',
                        category: 'fetch',
                        data: fetchData
                    });

                    return origFetch.apply(this, args).then(function (response) {
                        fetchData.status_code = response.status;

                        return response;
                    });
                };
            }, wrappedBuiltIns);
        }

        // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
        // to the document. Do this before we instrument addEventListener.
        if (autoBreadcrumbs.dom && this._hasDocument) {
            if (_document.addEventListener) {
                _document.addEventListener('click', self._breadcrumbEventHandler('click'), false);
                _document.addEventListener('keypress', self._keypressEventHandler(), false);
            }
            else {
                // IE8 Compatibility
                _document.attachEvent('onclick', self._breadcrumbEventHandler('click'));
                _document.attachEvent('onkeypress', self._keypressEventHandler());
            }
        }

        // record navigation (URL) changes
        // NOTE: in Chrome App environment, touching history.pushState, *even inside
        //       a try/catch block*, will cause Chrome to output an error to console.error
        // borrowed from: https://github.com/angular/angular.js/pull/13945/files
        var chrome = _window.chrome;
        var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
        var hasPushState = !isChromePackagedApp && _window.history && history.pushState;
        if (autoBreadcrumbs.location && hasPushState) {
            // TODO: remove onpopstate handler on uninstall()
            var oldOnPopState = _window.onpopstate;
            _window.onpopstate = function () {
                var currentHref = self._location.href;
                self._captureUrlChange(self._lastHref, currentHref);

                if (oldOnPopState) {
                    return oldOnPopState.apply(this, arguments);
                }
            };

            fill(history, 'pushState', function (origPushState) {
                // note history.pushState.length is 0; intentionally not declaring
                // params to preserve 0 arity
                return function (/* state, title, url */) {
                    var url = arguments.length > 2 ? arguments[2] : undefined;

                    // url argument is optional
                    if (url) {
                        // coerce to string (this is what pushState does)
                        self._captureUrlChange(self._lastHref, url + '');
                    }

                    return origPushState.apply(this, arguments);
                };
            }, wrappedBuiltIns);
        }

        if (autoBreadcrumbs.console && 'console' in _window && console.log) {
            // console
            var consoleMethodCallback = function (msg, data) {
                self.captureBreadcrumb({
                    message: msg,
                    level: data.level,
                    category: 'console'
                });
            };

            each(['debug', 'info', 'warn', 'error', 'log'], function (_, level) {
                wrapConsoleMethod(console, level, consoleMethodCallback);
            });
        }

    },

    _restoreBuiltIns: function () {
        // restore any wrapped builtins
        var builtin;
        while (this._wrappedBuiltIns.length) {
            builtin = this._wrappedBuiltIns.shift();

            var obj = builtin[0],
              name = builtin[1],
              orig = builtin[2];

            obj[name] = orig;
        }
    },

    _drainPlugins: function() {
        var self = this;

        // FIX ME TODO
        each(this._plugins, function(_, plugin) {
            var installer = plugin[0];
            var args = plugin[1];
            installer.apply(self, [self].concat(args));
        });
    },

    _parseDSN: function(str) {
        var m = dsnPattern.exec(str),
            dsn = {},
            i = 7;

        try {
            while (i--) dsn[dsnKeys[i]] = m[i] || '';
        } catch(e) {
            throw new RavenConfigError('Invalid DSN: ' + str);
        }

        if (dsn.pass && !this._globalOptions.allowSecretKey) {
            throw new RavenConfigError('Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key');
        }

        return dsn;
    },

    _getGlobalServer: function(uri) {
        // assemble the endpoint from the uri pieces
        var globalServer = '//' + uri.host +
            (uri.port ? ':' + uri.port : '');

        if (uri.protocol) {
            globalServer = uri.protocol + ':' + globalServer;
        }
        return globalServer;
    },

    _handleOnErrorStackInfo: function() {
        // if we are intentionally ignoring errors via onerror, bail out
        if (!this._ignoreOnError) {
            this._handleStackInfo.apply(this, arguments);
        }
    },

    _handleStackInfo: function(stackInfo, options) {
        var frames = this._prepareFrames(stackInfo, options);

        this._triggerEvent('handle', {
            stackInfo: stackInfo,
            options: options
        });

        this._processException(
            stackInfo.name,
            stackInfo.message,
            stackInfo.url,
            stackInfo.lineno,
            frames,
            options
        );
    },

    _prepareFrames: function(stackInfo, options) {
        var self = this;
        var frames = [];
        if (stackInfo.stack && stackInfo.stack.length) {
            each(stackInfo.stack, function(i, stack) {
                var frame = self._normalizeFrame(stack);
                if (frame) {
                    frames.push(frame);
                }
            });

            // e.g. frames captured via captureMessage throw
            if (options && options.trimHeadFrames) {
                for (var j = 0; j < options.trimHeadFrames && j < frames.length; j++) {
                    frames[j].in_app = false;
                }
            }
        }
        frames = frames.slice(0, this._globalOptions.stackTraceLimit);
        return frames;
    },


    _normalizeFrame: function(frame) {
        if (!frame.url) return;

        // normalize the frames data
        var normalized = {
            filename:   frame.url,
            lineno:     frame.line,
            colno:      frame.column,
            'function': frame.func || '?'
        };

        normalized.in_app = !( // determine if an exception came from outside of our app
            // first we check the global includePaths list.
            !!this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(normalized.filename) ||
            // Now we check for fun, if the function name is Raven or TraceKit
            /(Raven|TraceKit)\./.test(normalized['function']) ||
            // finally, we do a last ditch effort and check for raven.min.js
            /raven\.(min\.)?js$/.test(normalized.filename)
        );

        return normalized;
    },

    _processException: function(type, message, fileurl, lineno, frames, options) {
        var stacktrace;
        if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(message)) return;

        message += '';

        if (frames && frames.length) {
            fileurl = frames[0].filename || fileurl;
            // Sentry expects frames oldest to newest
            // and JS sends them as newest to oldest
            frames.reverse();
            stacktrace = {frames: frames};
        } else if (fileurl) {
            stacktrace = {
                frames: [{
                    filename: fileurl,
                    lineno: lineno,
                    in_app: true
                }]
            };
        }

        if (!!this._globalOptions.ignoreUrls.test && this._globalOptions.ignoreUrls.test(fileurl)) return;
        if (!!this._globalOptions.whitelistUrls.test && !this._globalOptions.whitelistUrls.test(fileurl)) return;

        var data = objectMerge({
            // sentry.interfaces.Exception
            exception: {
                values: [{
                    type: type,
                    value: message,
                    stacktrace: stacktrace
                }]
            },
            culprit: fileurl
        }, options);

        // Fire away!
        this._send(data);
    },

    _trimPacket: function(data) {
        // For now, we only want to truncate the two different messages
        // but this could/should be expanded to just trim everything
        var max = this._globalOptions.maxMessageLength;
        if (data.message) {
            data.message = truncate(data.message, max);
        }
        if (data.exception) {
            var exception = data.exception.values[0];
            exception.value = truncate(exception.value, max);
        }

        return data;
    },

    _getHttpData: function() {
        if (!this._hasDocument || !_document.location || !_document.location.href) {
            return;
        }

        var httpData = {
            headers: {
                'User-Agent': navigator.userAgent
            }
        };

        httpData.url = _document.location.href;

        if (_document.referrer) {
            httpData.headers.Referer = _document.referrer;
        }

        return httpData;
    },


    _send: function(data) {
        var globalOptions = this._globalOptions;

        var baseData = {
            project: this._globalProject,
            logger: globalOptions.logger,
            platform: 'javascript'
        }, httpData = this._getHttpData();

        if (httpData) {
            baseData.request = httpData;
        }

        // HACK: delete `trimHeadFrames` to prevent from appearing in outbound payload
        if (data.trimHeadFrames) delete data.trimHeadFrames;

        data = objectMerge(baseData, data);

        // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
        data.tags = objectMerge(objectMerge({}, this._globalContext.tags), data.tags);
        data.extra = objectMerge(objectMerge({}, this._globalContext.extra), data.extra);

        // Send along our own collected metadata with extra
        data.extra['session:duration'] = now() - this._startTime;

        if (this._breadcrumbs && this._breadcrumbs.length > 0) {
            // intentionally make shallow copy so that additions
            // to breadcrumbs aren't accidentally sent in this request
            data.breadcrumbs = {
                values: [].slice.call(this._breadcrumbs, 0)
            };
        }

        // If there are no tags/extra, strip the key from the payload alltogther.
        if (isEmptyObject(data.tags)) delete data.tags;

        if (this._globalContext.user) {
            // sentry.interfaces.User
            data.user = this._globalContext.user;
        }

        // Include the environment if it's defined in globalOptions
        if (globalOptions.environment) data.environment = globalOptions.environment;

        // Include the release if it's defined in globalOptions
        if (globalOptions.release) data.release = globalOptions.release;

        // Include server_name if it's defined in globalOptions
        if (globalOptions.serverName) data.server_name = globalOptions.serverName;

        if (isFunction(globalOptions.dataCallback)) {
            data = globalOptions.dataCallback(data) || data;
        }

        // Why??????????
        if (!data || isEmptyObject(data)) {
            return;
        }

        // Check if the request should be filtered or not
        if (isFunction(globalOptions.shouldSendCallback) && !globalOptions.shouldSendCallback(data)) {
            return;
        }

        this._sendProcessedPayload(data);
    },

    _getUuid: function () {
      return uuid4();
    },

    _sendProcessedPayload: function(data, callback) {
        var self = this;
        var globalOptions = this._globalOptions;

        // Send along an event_id if not explicitly passed.
        // This event_id can be used to reference the error within Sentry itself.
        // Set lastEventId after we know the error should actually be sent
        this._lastEventId = data.event_id || (data.event_id = this._getUuid());

        // Try and clean up the packet before sending by truncating long values
        data = this._trimPacket(data);

        this._logDebug('debug', 'Raven about to send:', data);

        if (!this.isSetup()) return;

        var auth = {
            sentry_version: '7',
            sentry_client: 'raven-js/' + this.VERSION,
            sentry_key: this._globalKey
        };
        if (this._globalSecret) {
            auth.sentry_secret = this._globalSecret;
        }

        var exception = data.exception && data.exception.values[0];
        this.captureBreadcrumb({
            category: 'sentry',
            message: exception
                ? (exception.type ? exception.type + ': ' : '') + exception.value
                : data.message,
            event_id: data.event_id,
            level: data.level || 'error' // presume error unless specified
        });

        var url = this._globalEndpoint;
        (globalOptions.transport || this._makeRequest).call(this, {
            url: url,
            auth: auth,
            data: data,
            options: globalOptions,
            onSuccess: function success() {
                self._triggerEvent('success', {
                    data: data,
                    src: url
                });
                callback && callback();
            },
            onError: function failure(error) {
                self._triggerEvent('failure', {
                    data: data,
                    src: url
                });
                error = error || new Error('Raven send failed (no additional details provided)');
                callback && callback(error);
            }
        });
    },

    _makeRequest: function(opts) {
        var request = new XMLHttpRequest();

        // if browser doesn't support CORS (e.g. IE7), we are out of luck
        var hasCORS =
            'withCredentials' in request ||
            typeof XDomainRequest !== 'undefined';

        if (!hasCORS) return;

        var url = opts.url;
        function handler() {
            if (request.status === 200) {
                if (opts.onSuccess) {
                    opts.onSuccess();
                }
            } else if (opts.onError) {
                opts.onError(new Error('Sentry error code: ' + request.status));
            }
        }

        if ('withCredentials' in request) {
            request.onreadystatechange = function () {
                if (request.readyState !== 4) {
                    return;
                }
                handler();
            };
        } else {
            request = new XDomainRequest();
            // xdomainrequest cannot go http -> https (or vice versa),
            // so always use protocol relative
            url = url.replace(/^https?:/, '');

            // onreadystatechange not supported by XDomainRequest
            request.onload = handler;
        }

        // NOTE: auth is intentionally sent as part of query string (NOT as custom
        //       HTTP header) so as to avoid preflight CORS requests
        request.open('POST', url + '?' + urlencode(opts.auth));
        request.send(stringify(opts.data));
    },

    _logDebug: function(level) {
        if (this._originalConsoleMethods[level] && this.debug) {
            // In IE<10 console methods do not have their own 'apply' method
            Function.prototype.apply.call(
                this._originalConsoleMethods[level],
                this._originalConsole,
                [].slice.call(arguments, 1)
            );
        }
    },

    _mergeContext: function(key, context) {
        if (isUndefined(context)) {
            delete this._globalContext[key];
        } else {
            this._globalContext[key] = objectMerge(this._globalContext[key] || {}, context);
        }
    }
};

/*------------------------------------------------
 * utils
 *
 * conditionally exported for test via Raven.utils
 =================================================
 */
var objectPrototype = Object.prototype;

function isUndefined(what) {
    return what === void 0;
}

function isFunction(what) {
    return typeof what === 'function';
}

function isString(what) {
    return objectPrototype.toString.call(what) === '[object String]';
}

function isObject(what) {
    return typeof what === 'object' && what !== null;
}

function isEmptyObject(what) {
    for (var _ in what) return false;  // eslint-disable-line guard-for-in, no-unused-vars
    return true;
}

// Sorta yanked from https://github.com/joyent/node/blob/aa3b4b4/lib/util.js#L560
// with some tiny modifications
function isError(what) {
    var toString = objectPrototype.toString.call(what);
    return isObject(what) &&
        toString === '[object Error]' ||
        toString === '[object Exception]' || // Firefox NS_ERROR_FAILURE Exceptions
        what instanceof Error;
}

function each(obj, callback) {
    var i, j;

    if (isUndefined(obj.length)) {
        for (i in obj) {
            if (hasKey(obj, i)) {
                callback.call(null, i, obj[i]);
            }
        }
    } else {
        j = obj.length;
        if (j) {
            for (i = 0; i < j; i++) {
                callback.call(null, i, obj[i]);
            }
        }
    }
}

function objectMerge(obj1, obj2) {
    if (!obj2) {
        return obj1;
    }
    each(obj2, function(key, value){
        obj1[key] = value;
    });
    return obj1;
}

function truncate(str, max) {
    return !max || str.length <= max ? str : str.substr(0, max) + '\u2026';
}

/**
 * hasKey, a better form of hasOwnProperty
 * Example: hasKey(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
function hasKey(object, key) {
    return objectPrototype.hasOwnProperty.call(object, key);
}

function joinRegExp(patterns) {
    // Combine an array of regular expressions and strings into one large regexp
    // Be mad.
    var sources = [],
        i = 0, len = patterns.length,
        pattern;

    for (; i < len; i++) {
        pattern = patterns[i];
        if (isString(pattern)) {
            // If it's a string, we need to escape it
            // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'));
        } else if (pattern && pattern.source) {
            // If it's a regexp already, we want to extract the source
            sources.push(pattern.source);
        }
        // Intentionally skip other cases
    }
    return new RegExp(sources.join('|'), 'i');
}

function urlencode(o) {
    var pairs = [];
    each(o, function(key, value) {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    return pairs.join('&');
}

// borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
// intentionally using regex and not <a/> href parsing trick because React Native and other
// environments where DOM might not be available
function parseUrl(url) {
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) return {};

    // coerce to undefined values to empty string so we don't get 'undefined'
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        protocol: match[2],
        host: match[4],
        path: match[5],
        relative: match[5] + query + fragment // everything minus origin
    };
}
function uuid4() {
    var crypto = _window.crypto || _window.msCrypto;

    if (!isUndefined(crypto) && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr);

        // set 4 in byte 7
        arr[3] = arr[3] & 0xFFF | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        arr[4] = arr[4] & 0x3FFF | 0x8000;

        var pad = function(num) {
            var v = num.toString(16);
            while (v.length < 4) {
                v = '0' + v;
            }
            return v;
        };

        return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) +
        pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
    } else {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0,
                v = c === 'x' ? r : r&0x3|0x8;
            return v.toString(16);
        });
    }
}

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @param elem
 * @returns {string}
 */
function htmlTreeAsString(elem) {
    /* eslint no-extra-parens:0*/
    var MAX_TRAVERSE_HEIGHT = 5,
        MAX_OUTPUT_LEN = 80,
        out = [],
        height = 0,
        len = 0,
        separator = ' > ',
        sepLength = separator.length,
        nextStr;

    while (elem && height++ < MAX_TRAVERSE_HEIGHT) {

        nextStr = htmlElementAsString(elem);
        // bail out if
        // - nextStr is the 'html' element
        // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
        //   (ignore this limit if we are on the first iteration)
        if (nextStr === 'html' || height > 1 && len + (out.length * sepLength) + nextStr.length >= MAX_OUTPUT_LEN) {
            break;
        }

        out.push(nextStr);

        len += nextStr.length;
        elem = elem.parentNode;
    }

    return out.reverse().join(separator);
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @param HTMLElement
 * @returns {string}
 */
function htmlElementAsString(elem) {
    var out = [],
        className,
        classes,
        key,
        attr,
        i;

    if (!elem || !elem.tagName) {
        return '';
    }

    out.push(elem.tagName.toLowerCase());
    if (elem.id) {
        out.push('#' + elem.id);
    }

    className = elem.className;
    if (className && isString(className)) {
        classes = className.split(' ');
        for (i = 0; i < classes.length; i++) {
            out.push('.' + classes[i]);
        }
    }
    var attrWhitelist = ['type', 'name', 'title', 'alt'];
    for (i = 0; i < attrWhitelist.length; i++) {
        key = attrWhitelist[i];
        attr = elem.getAttribute(key);
        if (attr) {
            out.push('[' + key + '="' + attr + '"]');
        }
    }
    return out.join('');
}

/**
 * Polyfill a method
 * @param obj object e.g. `document`
 * @param name method name present on object e.g. `addEventListener`
 * @param replacement replacement function
 * @param track {optional} record instrumentation to an array
 */
function fill(obj, name, replacement, track) {
    var orig = obj[name];
    obj[name] = replacement(orig);
    if (track) {
        track.push([obj, name, orig]);
    }
}

if (typeof __DEV__ !== 'undefined' && __DEV__) {
    Raven.utils = {
        isUndefined: isUndefined,
        isFunction: isFunction,
        isString: isString,
        isObject: isObject,
        isEmptyObject: isEmptyObject,
        isError: isError,
        each: each,
        objectMerge: objectMerge,
        truncate: truncate,
        hasKey: hasKey,
        joinRegExp: joinRegExp,
        urlencode: urlencode,
        uuid4: uuid4,
        htmlTreeAsString: htmlTreeAsString,
        htmlElementAsString: htmlElementAsString,
        parseUrl: parseUrl,
        fill: fill
    };
};

// Deprecations
Raven.prototype.setUser = Raven.prototype.setUserContext;
Raven.prototype.setReleaseContext = Raven.prototype.setRelease;

module.exports = Raven;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Enforces a single instance of the Raven client, and the
 * main entry point for Raven. If you are a consumer of the
 * Raven library, you SHOULD load this file (vs raven.js).
 **/



var RavenConstructor = __webpack_require__(230);

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window = typeof window !== 'undefined' ? window
            : typeof global !== 'undefined' ? global
            : typeof self !== 'undefined' ? self
            : {};
var _Raven = _window.Raven;

var Raven = new RavenConstructor();

/*
 * Allow multiple versions of Raven to be installed.
 * Strip Raven from the global context and returns the instance.
 *
 * @return {Raven}
 */
Raven.noConflict = function () {
	_window.Raven = _Raven;
	return Raven;
};

Raven.afterLoad();

module.exports = Raven;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*
 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
 MIT license
*/

var TraceKit = {
    collectWindowErrors: true,
    debug: false
};

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window = typeof window !== 'undefined' ? window
            : typeof global !== 'undefined' ? global
            : typeof self !== 'undefined' ? self
            : {};

// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
var ERROR_TYPES_RE = /^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;

function getLocationHref() {
    if (typeof document === 'undefined')
        return '';

    return document.location.href;
}

/**
 * TraceKit.report: cross-browser processing of unhandled exceptions
 *
 * Syntax:
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *              on top frame; column number is not guaranteed
 *   - Opera:   full stack trace with line and column numbers
 *   - Chrome:  full stack trace with line and column numbers
 *   - Safari:  line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *   - IE:      line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires TraceKit.computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that TraceKit.report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where TraceKit.report was called.
 *
 * Handlers receive a stackInfo object as described in the
 * TraceKit.computeStackTrace docs.
 */
TraceKit.report = (function reportModuleWrapper() {
    var handlers = [],
        lastArgs = null,
        lastException = null,
        lastExceptionStack = null;

    /**
     * Add a crash handler.
     * @param {Function} handler
     */
    function subscribe(handler) {
        installGlobalHandler();
        handlers.push(handler);
    }

    /**
     * Remove a crash handler.
     * @param {Function} handler
     */
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; --i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
    }

    /**
     * Remove all crash handlers.
     */
    function unsubscribeAll() {
        uninstallGlobalHandler();
        handlers = [];
    }

    /**
     * Dispatch stack information to all handlers.
     * @param {Object.<string, *>} stack
     */
    function notifyHandlers(stack, isWindowError) {
        var exception = null;
        if (isWindowError && !TraceKit.collectWindowErrors) {
          return;
        }
        for (var i in handlers) {
            if (handlers.hasOwnProperty(i)) {
                try {
                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
                } catch (inner) {
                    exception = inner;
                }
            }
        }

        if (exception) {
            throw exception;
        }
    }

    var _oldOnerrorHandler, _onErrorHandlerInstalled;

    /**
     * Ensures all global unhandled exceptions are recorded.
     * Supported by Gecko and IE.
     * @param {string} message Error message.
     * @param {string} url URL of script that generated the exception.
     * @param {(number|string)} lineNo The line number at which the error
     * occurred.
     * @param {?(number|string)} colNo The column number at which the error
     * occurred.
     * @param {?Error} ex The actual Error object.
     */
    function traceKitWindowOnError(message, url, lineNo, colNo, ex) {
        var stack = null;

        if (lastExceptionStack) {
            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
            processLastException();
        } else if (ex) {
            // New chrome and blink send along a real error object
            // Let's just report that like a normal error.
            // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
            stack = TraceKit.computeStackTrace(ex);
            notifyHandlers(stack, true);
        } else {
            var location = {
                'url': url,
                'line': lineNo,
                'column': colNo
            };

            var name = undefined;
            var msg = message; // must be new var or will modify original `arguments`
            var groups;
            if ({}.toString.call(message) === '[object String]') {
                var groups = message.match(ERROR_TYPES_RE);
                if (groups) {
                    name = groups[1];
                    msg = groups[2];
                }
            }

            location.func = UNKNOWN_FUNCTION;

            stack = {
                'name': name,
                'message': msg,
                'url': getLocationHref(),
                'stack': [location]
            };
            notifyHandlers(stack, true);
        }

        if (_oldOnerrorHandler) {
            return _oldOnerrorHandler.apply(this, arguments);
        }

        return false;
    }

    function installGlobalHandler ()
    {
        if (_onErrorHandlerInstalled) {
            return;
        }
        _oldOnerrorHandler = _window.onerror;
        _window.onerror = traceKitWindowOnError;
        _onErrorHandlerInstalled = true;
    }

    function uninstallGlobalHandler ()
    {
        if (!_onErrorHandlerInstalled) {
            return;
        }
        _window.onerror = _oldOnerrorHandler;
        _onErrorHandlerInstalled = false;
        _oldOnerrorHandler = undefined;
    }

    function processLastException() {
        var _lastExceptionStack = lastExceptionStack,
            _lastArgs = lastArgs;
        lastArgs = null;
        lastExceptionStack = null;
        lastException = null;
        notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
    }

    /**
     * Reports an unhandled Error to TraceKit.
     * @param {Error} ex
     * @param {?boolean} rethrow If false, do not re-throw the exception.
     * Only used for window.onerror to not cause an infinite loop of
     * rethrowing.
     */
    function report(ex, rethrow) {
        var args = _slice.call(arguments, 1);
        if (lastExceptionStack) {
            if (lastException === ex) {
                return; // already caught by an inner catch block, ignore
            } else {
              processLastException();
            }
        }

        var stack = TraceKit.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;
        lastArgs = args;

        // If the stack trace is incomplete, wait for 2 seconds for
        // slow slow IE to see if onerror occurs or not before reporting
        // this exception; otherwise, we will end up with an incomplete
        // stack trace
        setTimeout(function () {
            if (lastException === ex) {
                processLastException();
            }
        }, (stack.incomplete ? 2000 : 0));

        if (rethrow !== false) {
            throw ex; // re-throw to propagate to the top level (and cause window.onerror)
        }
    }

    report.subscribe = subscribe;
    report.unsubscribe = unsubscribe;
    report.uninstall = unsubscribeAll;
    return report;
}());

/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 * Returns:
 *   s.name              - exception name
 *   s.message           - exception message
 *   s.stack[i].url      - JavaScript or HTML file URL
 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
 *   s.stack[i].args     - arguments passed to the function, if known
 *   s.stack[i].line     - line number, if known
 *   s.stack[i].column   - column number, if known
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * TraceKit.computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with TraceKit.report,
 * which builds on top of TraceKit.computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
    /**
     * Escapes special characters, except for whitespace, in a string to be
     * used inside a regular expression as a string literal.
     * @param {string} text The string.
     * @return {string} The escaped string literal.
     */
    function escapeRegExp(text) {
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
    }

    /**
     * Escapes special characters in a string to be used inside a regular
     * expression as a string literal. Also ensures that HTML entities will
     * be matched the same as their literal friends.
     * @param {string} body The string.
     * @return {string} The escaped string.
     */
    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
    }

    // Contents of Exception in various browsers.
    //
    // SAFARI:
    // ex.message = Can't find variable: qq
    // ex.line = 59
    // ex.sourceId = 580238192
    // ex.sourceURL = http://...
    // ex.expressionBeginOffset = 96
    // ex.expressionCaretOffset = 98
    // ex.expressionEndOffset = 98
    // ex.name = ReferenceError
    //
    // FIREFOX:
    // ex.message = qq is not defined
    // ex.fileName = http://...
    // ex.lineNumber = 59
    // ex.columnNumber = 69
    // ex.stack = ...stack trace... (see the example below)
    // ex.name = ReferenceError
    //
    // CHROME:
    // ex.message = qq is not defined
    // ex.name = ReferenceError
    // ex.type = not_defined
    // ex.arguments = ['aa']
    // ex.stack = ...stack trace...
    //
    // INTERNET EXPLORER:
    // ex.message = ...
    // ex.name = ReferenceError
    //
    // OPERA:
    // ex.message = ...message... (see the example below)
    // ex.name = ReferenceError
    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

    /**
     * Computes stack trace information from the stack property.
     * Chrome and Gecko use this property.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceFromStackProp(ex) {
        if (typeof ex.stack === 'undefined' || !ex.stack) return;

        var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
            gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,
            winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
            lines = ex.stack.split('\n'),
            stack = [],
            parts,
            element,
            reference = /^(.*) is undefined$/.exec(ex.message);

        for (var i = 0, j = lines.length; i < j; ++i) {
            if ((parts = chrome.exec(lines[i]))) {
                var isNative = parts[2] && parts[2].indexOf('native') !== -1;
                element = {
                    'url': !isNative ? parts[2] : null,
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': isNative ? [parts[2]] : [],
                    'line': parts[3] ? +parts[3] : null,
                    'column': parts[4] ? +parts[4] : null
                };
            } else if ( parts = winjs.exec(lines[i]) ) {
                element = {
                    'url': parts[2],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': [],
                    'line': +parts[3],
                    'column': parts[4] ? +parts[4] : null
                };
            } else if ((parts = gecko.exec(lines[i]))) {
                element = {
                    'url': parts[3],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': parts[2] ? parts[2].split(',') : [],
                    'line': parts[4] ? +parts[4] : null,
                    'column': parts[5] ? +parts[5] : null
                };
            } else {
                continue;
            }

            if (!element.func && element.line) {
                element.func = UNKNOWN_FUNCTION;
            }

            stack.push(element);
        }

        if (!stack.length) {
            return null;
        }

        if (!stack[0].column && typeof ex.columnNumber !== 'undefined') {
            // FireFox uses this awesome columnNumber property for its top frame
            // Also note, Firefox's column number is 0-based and everything else expects 1-based,
            // so adding 1
            stack[0].column = ex.columnNumber + 1;
        }

        return {
            'name': ex.name,
            'message': ex.message,
            'url': getLocationHref(),
            'stack': stack
        };
    }

    /**
     * Adds information about the first frame to incomplete stack traces.
     * Safari and IE require this to get complete data on the first frame.
     * @param {Object.<string, *>} stackInfo Stack trace information from
     * one of the compute* methods.
     * @param {string} url The URL of the script that caused an error.
     * @param {(number|string)} lineNo The line number of the script that
     * caused an error.
     * @param {string=} message The error generated by the browser, which
     * hopefully contains the name of the object that caused the error.
     * @return {boolean} Whether or not the stack information was
     * augmented.
     */
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            'url': url,
            'line': lineNo
        };

        if (initial.url && initial.line) {
            stackInfo.incomplete = false;

            if (!initial.func) {
                initial.func = UNKNOWN_FUNCTION;
            }

            if (stackInfo.stack.length > 0) {
                if (stackInfo.stack[0].url === initial.url) {
                    if (stackInfo.stack[0].line === initial.line) {
                        return false; // already in stack trace
                    } else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                        stackInfo.stack[0].line = initial.line;
                        return false;
                    }
                }
            }

            stackInfo.stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        } else {
            stackInfo.incomplete = true;
        }

        return false;
    }

    /**
     * Computes stack trace information by walking the arguments.caller
     * chain at the time the exception occurred. This will cause earlier
     * frames to be missed but is the only way to get any stack trace in
     * Safari and IE. The top frame is restored by
     * {@link augmentStackTraceWithInitialElement}.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
            stack = [],
            funcs = {},
            recursion = false,
            parts,
            item,
            source;

        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === computeStackTrace || curr === TraceKit.report) {
                // console.log('skipping internal function');
                continue;
            }

            item = {
                'url': null,
                'func': UNKNOWN_FUNCTION,
                'line': null,
                'column': null
            };

            if (curr.name) {
                item.func = curr.name;
            } else if ((parts = functionName.exec(curr.toString()))) {
                item.func = parts[1];
            }

            if (typeof item.func === 'undefined') {
              try {
                item.func = parts.input.substring(0, parts.input.indexOf('{'));
              } catch (e) { }
            }

            if (funcs['' + curr]) {
                recursion = true;
            }else{
                funcs['' + curr] = true;
            }

            stack.push(item);
        }

        if (depth) {
            // console.log('depth is ' + depth);
            // console.log('stack is ' + stack.length);
            stack.splice(0, depth);
        }

        var result = {
            'name': ex.name,
            'message': ex.message,
            'url': getLocationHref(),
            'stack': stack
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }

    /**
     * Computes a stack trace for an exception.
     * @param {Error} ex
     * @param {(string|number)=} depth
     */
    function computeStackTrace(ex, depth) {
        var stack = null;
        depth = (depth == null ? 0 : +depth);

        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (TraceKit.debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (TraceKit.debug) {
                throw e;
            }
        }

        return {
            'name': ex.name,
            'message': ex.message,
            'url': getLocationHref()
        };
    }

    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;

    return computeStackTrace;
}());

module.exports = TraceKit;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 233 */
/***/ (function(module, exports) {

module.exports = "(function(window, document) {\n    'use strict';\n\n    var Woopra = {},\n        _on,\n        _handler = [],\n        _download_tracking = false,\n        _download_pause,\n        _outgoing_tracking = false,\n        _outgoing_pause,\n        _auto_decorate,\n        _outgoing_ignore_subdomain = true;\n\n    /**\n     * Constants\n     */\n    var VERSION = 11;\n    var ENDPOINT = 'woopra.com/track/';\n    var XDM_PARAM_NAME = '__woopraid';\n\n    /**\n     * addEventListener polyfill 1.0 / Eirik Backer / MIT Licence\n     * https://gist.github.com/eirikbacker/2864711\n     * removeEventListener from https://gist.github.com/jonathantneal/3748027\n     */\n    /*eslint-disable*/\n    (function(win, doc){\n        if (win.addEventListener) return;\t\t//No need to polyfill\n\n        var listeners = [];\n\n        function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}\n        function addEvent(on, fn, self) {\n            self = this;\n\n            listeners.unshift([self, on, fn, function(e) {\n                var e = e || win.event;\n                e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}\n                e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}\n                e.currentTarget = self;\n                e.target = e.srcElement || self;\n                fn.call(self, e);\n            }]);\n\n            return this.attachEvent('on' + on, listeners[0][3])\n        }\n\n        function removeEvent(on, fn) {\n            for (var index = 0, register; register = listeners[index]; ++index) {\n                if (register[0] == this && register[1] == on && register[2] == fn) {\n                    return this.detachEvent(\"on\" + on, listeners.splice(index, 1)[0][3]);\n                }\n            }\n        }\n\n        function addListen(obj, i){\n            if (obj && (i = obj.length)) {\n                while(i--) {\n                    obj[i].addEventListener = addEvent;\n                    obj[i].removeEventListener = removeEvent;\n                }\n            }\n            else if (obj) {\n                obj.addEventListener = addEvent;\n                obj.removeEventListener = removeEvent;\n            }\n\n            return obj;\n        }\n\n        addListen([doc, win]);\n        if ('Element' in win) {\n            // IE 8\n            win.Element.prototype.addEventListener = addEvent;\n            win.Element.prototype.removeEventListener = removeEvent;\n        }\n        else {\n            // IE < 8\n            //Make sure we also init at domReady\n            doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});\n            docHijack('getElementsByTagName');\n            docHijack('getElementById');\n            docHijack('createElement');\n            addListen(doc.all);\n        }\n    })(window, document);\n\n    /**\n     * Array.prototype.indexOf polyfill via\n     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf\n     */\n    if (!Array.prototype.indexOf) {\n        Array.prototype.indexOf = function (searchElement, fromIndex) {\n            if ( this === undefined || this === null ) {\n                throw new TypeError( '\"this\" is null or not defined' );\n            }\n\n            var length = this.length >>> 0; // Hack to convert object.length to a UInt32\n\n            fromIndex = +fromIndex || 0;\n\n            if (Math.abs(fromIndex) === Infinity) {\n                fromIndex = 0;\n            }\n\n            if (fromIndex < 0) {\n                fromIndex += length;\n                if (fromIndex < 0) {\n                    fromIndex = 0;\n                }\n            }\n\n            for (;fromIndex < length; fromIndex++) {\n                if (this[fromIndex] === searchElement) {\n                    return fromIndex;\n                }\n            }\n\n            return -1;\n        };\n    }\n\n    /**\n     * Helper functions\n     */\n    Woopra.extend = function(o1, o2) {\n        for (var key in o2) {\n            o1[key] = o2[key];\n        }\n    };\n\n    // https://code.google.com/p/form-serialize/\n    // modified to return an object\n    Woopra.serializeForm = function(form, options) {\n        if (!form || form.nodeName !== \"FORM\") {\n            return;\n        }\n        var _options = options || {};\n        var _exclude = _options.exclude || [];\n        var i, j, data = {};\n        for (i = form.elements.length - 1; i >= 0; i = i - 1) {\n            if (form.elements[i].name === \"\" || _exclude.indexOf(form.elements[i].name) > -1) {\n                continue;\n            }\n            switch (form.elements[i].nodeName) {\n                case 'INPUT':\n                    switch (form.elements[i].type) {\n                    case 'text':\n                        case 'hidden':\n                        case 'button':\n                        case 'reset':\n                        case 'submit':\n                        data[form.elements[i].name] = form.elements[i].value;\n                    break;\n                    case 'checkbox':\n                        case 'radio':\n                        if (form.elements[i].checked) {\n                            data[form.elements[i].name] = form.elements[i].value;\n                        }\n                    break;\n                    case 'file':\n                        break;\n                }\n                break;\n                case 'TEXTAREA':\n                    data[form.elements[i].name] = form.elements[i].value;\n                break;\n                case 'SELECT':\n                    switch (form.elements[i].type) {\n                    case 'select-one':\n                        data[form.elements[i].name] = form.elements[i].value;\n                    break;\n                    case 'select-multiple':\n                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {\n                        if (form.elements[i].options[j].selected) {\n                            data[form.elements[i].name] = form.elements[i].options[j].value;\n                        }\n                    }\n                    break;\n                }\n                break;\n                case 'BUTTON':\n                    switch (form.elements[i].type) {\n                    case 'reset':\n                        case 'submit':\n                        case 'button':\n                        data[form.elements[i].name] = form.elements[i].value;\n                    break;\n                }\n                break;\n            }\n        }\n        return data;\n    };\n\n    /*\\\n    |*|\n    |*|  :: cookies.js ::\n    |*|\n    |*|  A complete cookies reader/writer framework with full unicode support.\n    |*|\n    |*|  Revision #1 - September 4, 2014\n    |*|\n    |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie\n    |*|  https://developer.mozilla.org/User:fusionchess\n    |*|\n    |*|  This framework is released under the GNU Public License, version 3 or later.\n    |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html\n    |*|\n    |*|  Syntaxes:\n    |*|\n    |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])\n    |*|  * docCookies.getItem(name)\n    |*|  * docCookies.removeItem(name[, path[, domain]])\n    |*|  * docCookies.hasItem(name)\n    |*|  * docCookies.keys()\n    |*|\n    \\*/\n    var docCookies = {\n        getItem: function (sKey) {\n            if (!sKey) { return null; }\n            return decodeURIComponent(document.cookie.replace(new RegExp(\"(?:(?:^|.*;)\\\\s*\" + encodeURIComponent(sKey).replace(/[\\-\\.\\+\\*]/g, \"\\\\$&\") + \"\\\\s*\\\\=\\\\s*([^;]*).*$)|^.*$\"), \"$1\")) || null;\n        },\n        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {\n            if (!sKey || /^(?:expires|max\\-age|path|domain|secure)$/i.test(sKey)) { return false; }\n            var sExpires = \"\";\n            if (vEnd) {\n                switch (vEnd.constructor) {\n                    case Number:\n                        sExpires = vEnd === Infinity ? \"; expires=Fri, 31 Dec 9999 23:59:59 GMT\" : \"; max-age=\" + vEnd;\n                    break;\n                    case String:\n                        sExpires = \"; expires=\" + vEnd;\n                    break;\n                    case Date:\n                        sExpires = \"; expires=\" + vEnd.toUTCString();\n                    break;\n                }\n            }\n            document.cookie = encodeURIComponent(sKey) + \"=\" + encodeURIComponent(sValue) + sExpires + (sDomain ? \"; domain=\" + sDomain : \"\") + (sPath ? \"; path=\" + sPath : \"\") + (bSecure ? \"; secure\" : \"\");\n            return true;\n        },\n        removeItem: function (sKey, sPath, sDomain) {\n            if (!this.hasItem(sKey)) { return false; }\n            document.cookie = encodeURIComponent(sKey) + \"=; expires=Thu, 01 Jan 1970 00:00:00 GMT\" + (sDomain ? \"; domain=\" + sDomain : \"\") + (sPath ? \"; path=\" + sPath : \"\");\n            return true;\n        },\n        hasItem: function (sKey) {\n            if (!sKey) { return false; }\n            return (new RegExp(\"(?:^|;\\\\s*)\" + encodeURIComponent(sKey).replace(/[\\-\\.\\+\\*]/g, \"\\\\$&\") + \"\\\\s*\\\\=\")).test(document.cookie);\n        },\n        keys: function () {\n            var aKeys = document.cookie.replace(/((?:^|\\s*;)[^\\=]+)(?=;|$)|^\\s*|\\s*(?:\\=[^;]*)?(?:\\1|$)/g, \"\").split(/\\s*(?:\\=[^;]*)?;\\s*/);\n            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }\n            return aKeys;\n        }\n    };\n\n    Woopra.docCookies = docCookies;\n    /*eslint-enable*/\n\n    /**\n     * Wrapper for window.location\n     */\n    Woopra.location = function(property, value) {\n        // make sure property is valid\n        if (typeof window.location[property] !== 'undefined') {\n            if (typeof value !== 'undefined') {\n                window.location[property] = value;\n            }\n            else {\n                return window.location[property];\n            }\n        }\n    };\n\n    /**\n     * Parses current URL for parameters that start with either `utm_` or `woo_`\n     * and have the keys `source`, `medium`, `content`, `campaign`, `term`\n     *\n     * @return {Object} Returns an object with campaign keys as keys\n     */\n    Woopra.getCampaignData = function() {\n        var vars = Woopra.getUrlParams(),\n            campaign = {},\n            campaignKeys = ['source', 'medium', 'content', 'campaign', 'term'],\n            key,\n            value;\n\n        for (var i = 0; i < campaignKeys.length; i++) {\n            key = campaignKeys[i];\n            value = vars['utm_' + key] || vars['woo_' + key];\n\n            if (typeof value !== 'undefined') {\n                campaign['campaign_' + (key === 'campaign' ? 'name' : key)] = value;\n            }\n        }\n\n        return campaign;\n    };\n\n    Woopra.mapQueryParams = function(mapping) {\n      var vars = Woopra.getUrlParams(),\n        params = {};\n\n      for (var key in mapping) {\n        var value = vars[key];\n        if (typeof value !== 'undefined') {\n          params[mapping[key]] = value;\n        }\n      }\n\n      return params;\n    }\n\n\n    /**\n     * Parses the URL parameters for data beginning with a certain prefix\n     *\n     * @param {Function} method The callback method for each key found matching `prefix`\n     * @param {string} prefix The prefix that the parameter should start with\n     */\n    Woopra.getCustomData = function(method, prefix) {\n        var vars = Woopra.getUrlParams(),\n            i,\n            _prefix = prefix || 'wv_',\n            key,\n            value;\n\n        for (i in vars) {\n            if (vars.hasOwnProperty(i)) {\n                value = vars[i];\n\n                if (i.substring(0, _prefix.length) === _prefix) {\n                    key = i.substring(_prefix.length);\n                    method.call(this, key, value);\n                }\n            }\n        }\n    };\n\n    /**\n     * Parses Visitor Data in the URL.\n     *\n     * Query params that start with 'wv_'\n     */\n    Woopra.getVisitorUrlData = function(context) {\n        Woopra.getCustomData.call(context, context.identify, 'wv_');\n    };\n\n\n    /**\n     * Hides any campaign data (query params: wv_, woo_, utm_) from the URL\n     * by using pushState (if available)\n     */\n    Woopra.hideCampaignData = function() {\n        return Woopra.hideUrlParams(['wv_', 'woo_', 'utm_']);\n    };\n    Woopra.hideCrossDomainId = function() {\n        return Woopra.hideUrlParams([XDM_PARAM_NAME]);\n    };\n\n    /**\n     * Hides any URL parameters by calling window.history.replaceState\n     *\n     * @param {Array} params A list of parameter prefixes that will be hidden\n     * @return {String} Returns the new URL that will be used\n     */\n    Woopra.hideUrlParams = function(params) {\n        var regex = new RegExp('[?&]+((?:' + params.join('|') + ')[^=&]*)=([^&#]*)', 'gi');\n        var href = Woopra.location('href').replace(regex, '');\n\n        if (window.history && window.history.replaceState) {\n            window.history.replaceState(null, null, href);\n        }\n\n        return href;\n    };\n\n    /**\n     * Retrieves the current URL parameters as an object\n     *\n     * @return {Object} An object for all of the URL parameters\n     */\n    Woopra.getUrlParams = function() {\n        var vars = {};\n        var href = Woopra.location('href');\n\n        if (href) {\n            href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {\n                vars[key] = decodeURIComponent(value.split('+').join(' '));\n            });\n        }\n        return vars;\n    };\n\n    Woopra.buildUrlParams = function(params, prefix) {\n        var _prefix = prefix || '',\n            key,\n            p = [];\n\n        if (typeof params === 'undefined') {\n            return params;\n        }\n\n        for (key in params) {\n            if (params.hasOwnProperty(key)) {\n                if (params[key] !== 'undefined' &&\n                    params[key] !== 'null' &&\n                    typeof params[key] !== 'undefined') {\n                    p.push(_prefix + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));\n                }\n            }\n        }\n        return p.join('&');\n    };\n\n    /**\n     * Generates a random 12 character string\n     *\n     * @return {String} Returns a random 12 character string\n     */\n    Woopra.randomString = function() {\n        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',\n            i,\n            rnum,\n            s = '';\n\n        for (i = 0; i < 12; i++) {\n            rnum = Math.floor(Math.random() * chars.length);\n            s += chars.substring(rnum, rnum + 1);\n        }\n\n        return s;\n    };\n\n    Woopra.loadScript = function(url, callback) {\n        var ssc,\n            _callback,\n            script = document.createElement('script');\n\n        script.type = 'text/javascript';\n        script.async = true;\n\n        if (callback && typeof callback === 'function') {\n            _callback = callback;\n        }\n\n        if (typeof script.onreadystatechange !== 'undefined') {\n            script.onreadystatechange = function() {\n                if (this.readyState === 4 ||\n                    this.readyState === 'complete' ||\n                    this.readyState === 'loaded') {\n                    if (_callback) {\n                        _callback();\n                    }\n                    Woopra.removeScript(script);\n                }\n            };\n        }\n        else {\n            script.onload = function() {\n                if (_callback) {\n                    _callback();\n                }\n                Woopra.removeScript(script);\n            };\n            script.onerror = function() {\n                Woopra.removeScript(script);\n            };\n        }\n\n        script.src = url;\n\n        ssc = document.getElementsByTagName('script')[0];\n        ssc.parentNode.insertBefore(script, ssc);\n    };\n\n    Woopra.removeScript = function(script) {\n        if (script && script.parentNode) {\n            script.parentNode.removeChild(script);\n        }\n    };\n\n    /**\n     * Helper to either query an element by id, or return element if passed\n     * through options\n     *\n     * Supports searching by ids and classnames (or querySelector if browser supported)\n     */\n    Woopra.getElement = function(selector, options) {\n        var _options = typeof selector === 'string' ? options || {} : selector || {};\n        var _selector = selector;\n\n        if (_options.el) {\n            return _options.el;\n        }\n        else if (typeof selector === 'string') {\n            if (document.querySelectorAll) {\n                return document.querySelectorAll(_selector);\n            }\n            else if (selector[0] === '#') {\n                _selector = selector.substr(1);\n                return document.getElementById(_selector);\n            }\n            else if (selector[0] === '.') {\n                _selector = selector.substr(1);\n                return document.getElementsByClassName(_selector);\n            }\n        }\n    };\n\n    /**\n     * Retrieves the current client domain name using the hostname\n     * and returning the last two tokens with a `.` separator (domain + tld).\n     *\n     * This can be an issue if there is a second level domain\n     */\n    Woopra.getDomain = function(hostname) {\n        var _hostname = hostname || Woopra.location('hostname');\n        var secondLevelTlds = {\n            'com.au': 1,\n            'net.au': 1,\n            'org.au': 1,\n            'co.hu': 1,\n            'com.ru': 1,\n            'ac.za': 1,\n            'net.za': 1,\n            'com.za': 1,\n            'co.za': 1,\n            'co.uk': 1,\n            'org.uk': 1,\n            'me.uk': 1,\n            'net.uk': 1\n        };\n        var domain = _hostname.substring(_hostname.lastIndexOf('.', _hostname.lastIndexOf('.') - 1) + 1);\n\n        // check if domain is in list of second level domains, ignore if so\n        if (secondLevelTlds[domain]) {\n            domain = _hostname.substring(_hostname.lastIndexOf('.', _hostname.indexOf(domain) - 2) + 1);\n        }\n\n        return domain;\n    };\n\n    /**\n     * Returns the current hostname with 'www' stripped out\n     */\n    Woopra.getHostnameNoWww = function() {\n        var hostname = Woopra.location('hostname');\n\n        if (hostname.indexOf('www.') === 0) {\n            return hostname.replace('www.', '');\n        }\n\n        return hostname;\n    };\n\n    /**\n     * Checks if string ends with suffix\n     *\n     * @param {string} str The haystack string\n     * @param {string} suffix The needle\n     * @return {boolean} True if needle was found in haystack\n     */\n    Woopra.endsWith = function(str, suffix) {\n        return str.indexOf(suffix, str.length - suffix.length) !== -1;\n    };\n\n    /**\n     * Checks if string starts with prefix\n     *\n     * @param {string} str The haystack string\n     * @param {string} prefix The needle\n     * @return {boolean} True if needle was found in haystack\n     */\n    Woopra.startsWith = function(str, prefix) {\n        return str.indexOf(prefix) === 0;\n    };\n\n    _on = Woopra._on = function(parent, event, callback) {\n        var id = parent.instanceName;\n\n        if (!_handler[event]) {\n            _handler[event] = {};\n        }\n        _handler[event][id] = parent;\n\n        if (parent.__l) {\n            if (!parent.__l[event]) {\n                parent.__l[event] = [];\n            }\n            parent.__l[event].push(callback);\n        }\n    };\n\n    Woopra._fire = function(event) {\n        var handler;\n        var _event = _handler[event];\n        var _l;\n\n        if (_event) {\n            for (var id in _event) {\n                if (_event.hasOwnProperty(id)) {\n                    handler = _event[id];\n                    _l = handler && handler.__l;\n                    if (_l && _l[event]) {\n                        for (var i = 0; i < _l[event].length; i++) {\n                            _l[event][i].apply(this, Array.prototype.slice.call(arguments, 1));\n                        }\n                    }\n\n                }\n            }\n        }\n    };\n\n    Woopra.attachEvent = function(element, type, callback) {\n        if (element.addEventListener) {\n           element.addEventListener(type, callback);\n        }\n        else if (element.attachEvent) {\n            /*eslint-disable*/\n            element.attachEvent('on' + type, function(e) {\n                var e = e || win.event;\n                e.preventDefault = e.preventDefault || function() {e.returnValue = false};\n                e.stopPropagation = e.stopPropagation || function() {e.cancelBubble = true};\n                callback.call(self, e);\n            });\n            /*eslint-enable*/\n        }\n    };\n\n    Woopra.leftClick = function(evt) {\n        evt = evt || window.event;\n        var button = (typeof evt.which !== 'undefined' && evt.which === 1) ||\n                    (typeof evt.button !== 'undefined' && evt.button === 0);\n        return button && !evt.metaKey && !evt.altKey && !evt.ctrlKey && !evt.shiftKey;\n    };\n\n    Woopra.redirect = function(link) {\n        Woopra.location('href', link);\n    };\n\n    /**\n     * Determines if the current URL should be considered an outgoing URL\n     */\n    Woopra.isOutgoingLink = function(targetHostname) {\n        var currentHostname = Woopra.location('hostname');\n        var currentDomain = Woopra.getDomain(currentHostname);\n\n        return targetHostname !== currentHostname &&\n            targetHostname.replace(/^www\\./, '') !== currentHostname.replace(/^www\\./, '') &&\n            (\n                !_outgoing_ignore_subdomain ||\n                currentDomain !== Woopra.getDomain(targetHostname)\n            ) &&\n            !Woopra.startsWith(targetHostname, 'javascript') &&\n            targetHostname !== '' &&\n            targetHostname !== '#';\n    };\n\n    // attaches any events\n    // needs to be handled here, instead of in a tracking instance because\n    // these events should only be fired once on a page\n    (function(on, fire) {\n        on(document, 'mousedown', function(e) {\n            var cElem;\n\n            fire('mousemove', e, new Date());\n\n            if (_auto_decorate) {\n                cElem = e.srcElement || e.target;\n                while (typeof cElem !== 'undefined' && cElem !== null) {\n                    if (cElem.tagName && cElem.tagName.toLowerCase() === 'a') {\n                        break;\n                    }\n                    cElem = cElem.parentNode;\n                }\n                if (typeof cElem !== 'undefined' && cElem !== null) {\n                    fire('auto_decorate', cElem);\n                }\n            }\n        });\n\n        on(document, 'click', function(e) {\n            var cElem,\n                link,\n                ignoreTarget = '_blank',\n                _download;\n\n            cElem = e.srcElement || e.target;\n\n            if (Woopra.leftClick(e)) {\n                fire('click', e, cElem);\n            }\n\n            if (_download_tracking || _outgoing_tracking) {\n\n                // searches for an anchor element\n                while (typeof cElem !== 'undefined' && cElem !== null) {\n                    if (cElem.tagName && cElem.tagName.toLowerCase() === 'a') {\n                        break;\n                    }\n                    cElem = cElem.parentNode;\n                }\n\n                if (typeof cElem !== 'undefined' && cElem !== null &&\n                    !cElem.getAttribute('data-woopra-tracked')) {\n                    link = cElem;\n                    _download = link.pathname.match(/(?:doc|dmg|eps|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3|mp4|m4v)($|\\&)/);\n\n                    if (_download_tracking && _download) {\n                        fire('download', link.href);\n\n                        if (link.target !== ignoreTarget && Woopra.leftClick(e)) {\n                            e.preventDefault();\n                            e.stopPropagation();\n\n                            link.setAttribute('data-woopra-tracked', true);\n                            window.setTimeout(function() {\n                                link.click();\n                            }, _download_pause);\n                        }\n                    }\n                    // Make sure\n                    // * outgoing tracking is enabled\n                    // * this URL does not match a download URL (doesn't end\n                    //   in a binary file extension)\n                    // * not ignoring subdomains OR link hostname is not a partial\n                    //   match of current hostname (to check for subdomains),\n                    // * hostname is not empty\n                    if (_outgoing_tracking &&\n                        !_download &&\n                        Woopra.isOutgoingLink(link.hostname)) {\n                        fire('outgoing', link.href);\n\n                        if (link.target !== ignoreTarget && Woopra.leftClick(e)) {\n                            e.preventDefault();\n                            e.stopPropagation();\n\n                            link.setAttribute('data-woopra-tracked', true);\n\n                            window.setTimeout(function() {\n                                link.click();\n                            }, _outgoing_pause);\n                        }\n                    }\n                }\n            }\n        });\n\n        on(document, 'mousemove', function(e) {\n            fire('mousemove', e, new Date());\n        });\n\n        on(document, 'keydown', function() {\n            fire('keydown');\n        });\n    })(Woopra.attachEvent, Woopra._fire);\n\n    var Tracker = function(instanceName) {\n        this.visitorData = {};\n        this.sessionData = {};\n\n        this.options = {\n            app: 'js-client',\n            use_cookies: true,\n            ping: true,\n            ping_interval: 12000,\n            idle_timeout: 300000,\n            idle_threshold: 10000,\n            download_pause: _download_pause || 200,\n            outgoing_pause: _outgoing_pause || 200,\n            download_tracking: false,\n            outgoing_tracking: false,\n            outgoing_ignore_subdomain: true,\n            hide_campaign: false,\n            hide_xdm_data: false,\n            campaign_once: false,\n            third_party: false,\n            save_url_hash: true,\n            cross_domain: false,\n            region: null,\n            ignore_query_url: false,\n            map_query_params: {},\n            cookie_name: 'wooTracker',\n            cookie_domain: '.' + Woopra.getHostnameNoWww(),\n            cookie_path: '/',\n            cookie_expire: new Date(new Date().setDate(new Date().getDate() + 730))\n        };\n\n        this.instanceName = instanceName || 'woopra';\n        this.idle = 0;\n        this.cookie = '';\n        this.last_activity = new Date();\n        this.loaded = false;\n        this.dirtyCookie = false;\n        this.sentCampaign = false;\n        this.version = VERSION;\n\n        if (instanceName && instanceName !== '') {\n            window[instanceName] = this;\n        }\n    };\n\n    Tracker.prototype = {\n        docCookies: docCookies,\n        init: function() {\n            var callback,\n                self = this;\n\n            this.__l = {};\n            this._processQueue('config');\n            this._setupCookie();\n            this._bindEvents();\n\n            // Otherwise loading indicator gets stuck until the every response\n            // in the queue has been received\n            setTimeout(function() {\n                self._processQueue();\n            }, 1);\n\n            this.loaded = true;\n\n            callback = this.config('initialized');\n            if (callback && typeof callback === 'function') {\n                callback(this.instanceName);\n            }\n\n            // Safe to remove cross domain url parameter after setupCookie is called\n            // Should only need to be called once on load\n            if (this.config('hide_xdm_data')) {\n                Woopra.hideCrossDomainId();\n            }\n\n        },\n\n        /**\n         * Processes the tracker queue in case user tries to push events\n         * before tracker is ready.\n         */\n        _processQueue: function(type) {\n            var i,\n                action,\n                events,\n                _wpt;\n\n            _wpt = window.__woo ? window.__woo[this.instanceName] : _wpt;\n            _wpt = window._w ? window._w[this.instanceName] : _wpt;\n\n            // if _wpt is undefined, means script was loaded asynchronously and\n            // there is no queue\n\n            if (_wpt && _wpt._e) {\n                events = _wpt._e;\n                for (i = 0; i < events.length; i++) {\n                    action = events[i];\n                    if (typeof action !== 'undefined' && this[action[0]] &&\n                        (typeof type === 'undefined' || type === action[0])) {\n                        this[action[0]].apply(this, Array.prototype.slice.call(action, 1));\n                    }\n                }\n            }\n        },\n\n        /**\n         * Sets up the tracking cookie\n         */\n        _setupCookie: function() {\n            var url_id = this.getUrlId();\n\n            this.cookie = this.getCookie();\n\n            // overwrite saved cookie if id is in url\n            if (url_id) {\n                this.cookie = url_id;\n            }\n\n            // Setup cookie\n            if (!this.cookie || this.cookie.length < 1) {\n                this.cookie = Woopra.randomString();\n            }\n\n            docCookies.setItem(\n                this.config('cookie_name'),\n                this.cookie,\n                this.config('cookie_expire'),\n                this.config('cookie_path'),\n                this.config('cookie_domain')\n            );\n\n            this.dirtyCookie = true;\n        },\n\n        /**\n         * Binds some events to measure mouse and keyboard events\n         */\n        _bindEvents: function() {\n            var self = this;\n\n            _on(this, 'mousemove', function() {\n                self.moved.apply(self, arguments);\n            });\n            _on(this, 'keydown', function() {\n                self.typed.apply(self, arguments);\n            });\n            _on(this, 'download', function() {\n              self.downloaded.apply(self, arguments);\n            });\n            _on(this, 'outgoing', function() {\n              self.outgoing.apply(self, arguments);\n            });\n            _on(this, 'auto_decorate', function() {\n              self.autoDecorate.apply(self, arguments);\n            });\n        },\n\n        /**\n         * Sets/gets values from dataStore depending on arguments passed\n         *\n         * @param dataStore Object The tracker property to read/write\n         * @param key String/Object Returns property object if key and value is undefined,\n         *      acts as a getter if only `key` is defined and a string, and\n         *      acts as a setter if `key` and `value` are defined OR if `key` is an object.\n         */\n        _dataSetter: function(dataStore, key, value) {\n            var i;\n\n            if (typeof key === 'undefined') {\n                return dataStore;\n            }\n\n            if (typeof value === 'undefined') {\n                if (typeof key === 'string') {\n                    return dataStore[key];\n                }\n                if (typeof key === 'object') {\n                    for (i in key) {\n                        if (key.hasOwnProperty(i)) {\n                            if (i.substring(0, 7) === 'cookie_') {\n                                this.dirtyCookie = true;\n                            }\n                            dataStore[i] = key[i];\n                        }\n                    }\n                }\n            }\n            else {\n                if (key.substring(0, 7) === 'cookie_') {\n                    this.dirtyCookie = true;\n                }\n                dataStore[key] = value;\n            }\n\n            return this;\n        },\n\n        /**\n         * Builds the correct tracking Url and performs an HTTP request\n         */\n        _push: function(options) {\n            var _options = options || {},\n                random = 'ra=' + Woopra.randomString(),\n                queryString,\n                endpoint,\n                urlParam,\n                scriptUrl,\n                types = [\n                    ['visitorData', 'cv_'],\n                    ['eventData', 'ce_'],\n                    ['sessionData', 'cs_']\n                ],\n                _type,\n                i,\n                data = [];\n\n            endpoint = this.getEndpoint(_options.endpoint);\n\n            // Load custom visitor params from url\n            Woopra.getVisitorUrlData(this);\n\n            if (this.config('hide_campaign')) {\n                Woopra.hideCampaignData();\n            }\n\n            data.push(random);\n\n            // push tracker config values\n            data.push(Woopra.buildUrlParams(this.getOptionParams()));\n\n            // push eventName if it exists\n            if (_options.eventName) {\n                data.push('event=' + _options.eventName);\n            }\n\n            for (i in types) {\n                if (types.hasOwnProperty(i)) {\n                    _type = types[i];\n                    if (_options[_type[0]]) {\n                        urlParam = Woopra.buildUrlParams(_options[_type[0]], _type[1]);\n                        if (urlParam) {\n                            data.push(urlParam);\n                        }\n                    }\n                }\n            }\n\n            queryString = '?' + data.join('&');\n\n            scriptUrl = endpoint + queryString;\n            Woopra.loadScript(scriptUrl, _options.callback);\n        },\n\n        /*\n         * Returns the Woopra cookie string\n         */\n        getCookie: function() {\n            return docCookies.getItem(this.config('cookie_name'));\n        },\n\n        /**\n         * Generates a destination endpoint string to use depending on different\n         * configuration options\n         */\n        getEndpoint: function(path) {\n            var protocol = this.config('protocol');\n            var _protocol = protocol && protocol !== '' ? protocol + ':' : '';\n            var _path = path || '';\n            var endpoint = _protocol + '//';\n            var region = this.config('region');\n            var thirdPartyPath;\n\n            if (this.config('third_party') && !this.config('domain')) {\n                throw new Error('Error: `domain` is not set.');\n            }\n\n            // create endpoint, default is www.woopra.com/track/\n            // China region will be cn.t.woopra.com/track\n            if (region) {\n                endpoint += region + '.t.';\n            }\n            else {\n                endpoint += 'www.';\n            }\n\n            thirdPartyPath = this.config('third_party') ? 'tp/' + this.config('domain') : '';\n\n            if (_path && !Woopra.endsWith(_path, '/')) {\n                _path += '/';\n            }\n\n            if (thirdPartyPath && !Woopra.startsWith(_path, '/')) {\n                thirdPartyPath += '/';\n            }\n\n            endpoint += ENDPOINT + thirdPartyPath + _path;\n\n            return endpoint;\n        },\n\n        /**\n         * Sets configuration options\n         */\n        config: function(key, value) {\n            var data = this._dataSetter(this.options, key, value);\n\n            // dataSetter returns `this` when it is used as a setter\n            if (data === this) {\n                // do validation\n                if (this.options.ping_interval < 6000) {\n                    this.options.ping_interval = 6000;\n                }\n                else if (this.options.ping_interval > 60000) {\n                    this.options.ping_interval = 60000;\n                }\n\n                // set script wide variables for events that are bound on script load\n                // since we shouldn't bind per tracker instance\n                _outgoing_tracking = this.options.outgoing_tracking;\n                _outgoing_pause = this.options.outgoing_pause;\n                _download_tracking = this.options.download_tracking;\n                _download_pause = this.options.download_pause;\n                _auto_decorate = typeof _auto_decorate === 'undefined' && this.options.cross_domain ? this.options.cross_domain : _auto_decorate;\n                _outgoing_ignore_subdomain = this.options.outgoing_ignore_subdomain;\n\n                if (this.dirtyCookie && this.loaded) {\n                    this._setupCookie();\n                }\n            }\n\n            return data;\n        },\n\n        /**\n         * Use to attach custom visit data that doesn't stick to visitor\n         * ** Not in use yet\n         */\n        visit: function(key, value) {\n            return this._dataSetter(this.sessionData, key, value);\n        },\n\n        /**\n         * Attach custom visitor data\n         */\n        identify: function(key, value) {\n            return this._dataSetter(this.visitorData, key, value);\n        },\n\n        /**\n         * Generic method to call any tracker method\n         */\n        call: function(funcName) {\n            if (this[funcName] && typeof this[funcName] === 'function') {\n                this[funcName].apply(this, Array.prototype.slice.call(arguments, 1));\n            }\n\n        },\n\n        /**\n         * Send an event to tracking servr\n         */\n        track: function(name, options) {\n            var event = {},\n                eventName = '',\n                cb,\n                _hash,\n                _cb = arguments[arguments.length - 1];\n\n            // Load campaign params (load first to allow overrides)\n            if (!this.config('campaign_once') || !this.sentCampaign) {\n                Woopra.extend(event, Woopra.getCampaignData());\n                this.sentCampaign = true;\n            }\n\n            // Load query params mapping into Woopra event\n            Woopra.extend(event, Woopra.mapQueryParams(this.config('map_query_params')));\n\n\n            if (typeof _cb === 'function') {\n                cb = _cb;\n            }\n            // Track default: pageview\n            if (typeof name === 'undefined' || name === cb) {\n                eventName = 'pv';\n            }\n            // Track custom events\n            else if (typeof options === 'undefined' || options === cb) {\n                if (typeof name === 'string') {\n                    eventName = name;\n                }\n                if (typeof name === 'object') {\n                    if (name.name && name.name === 'pv') {\n                        eventName = 'pv';\n                    }\n\n                    this._dataSetter(event, name);\n                }\n            }\n            // Track custom events in format of name,object\n            else {\n                this._dataSetter(event, options);\n                eventName = name;\n            }\n\n            // Add some defaults for pageview\n            if (eventName === 'pv') {\n                event.url = event.url || this.getPageUrl();\n                event.title = event.title || this.getPageTitle();\n                event.domain = event.domain || this.getDomainName();\n                event.uri = event.uri || this.getURI();\n\n                if (this.config('save_url_hash')) {\n                    _hash = event.hash || this.getPageHash();\n                    if (_hash !== '') {\n                        event.hash = _hash;\n                    }\n                }\n            }\n\n            this._push({\n                endpoint: 'ce',\n                visitorData: this.visitorData,\n                sessionData: this.sessionData,\n                eventName: eventName,\n                eventData: event,\n                callback: cb\n            });\n\n            this.startPing();\n        },\n\n        /**\n         * Tracks a single form and then resubmits it\n         */\n        trackForm: function(eventName, selector, options) {\n            var els;\n            var _event = eventName || 'Tracked Form';\n            var _options = typeof selector === 'string' ? options || {} : selector || {};\n            var bindEl;\n            var self = this;\n\n            bindEl = function(el, ev, props, opts) {\n                Woopra.attachEvent(el, 'submit', function(e) {\n                    self.trackFormHandler(e, el, ev, _options);\n                });\n            };\n\n            if (_options.elements) {\n                els = _options.elements;\n            }\n            else {\n                els = Woopra.getElement(selector, _options);\n            }\n\n            // attach event if form was found\n            if (els && els.length > 0) {\n                for (var i in els) {\n                    bindEl(els[i], _event, _options);\n                }\n            }\n        },\n\n        trackFormHandler: function(e, el, eventName, options) {\n            var data;\n            var personData;\n            var trackFinished = false;\n\n            if (!el.getAttribute('data-tracked')) {\n                data = Woopra.serializeForm(el, options);\n\n                if (options.identify && typeof options.identify === 'function') {\n                    personData = options.identify(data) || {};\n                    if (personData) {\n                        this.identify(personData);\n                    }\n                }\n\n                if (options.noSubmit) {\n                    this.track(eventName, data, function() {\n                        if (typeof options.callback === 'function') {\n                            options.callback(data);\n                        }\n                    });\n                }\n                else {\n                    e.preventDefault();\n                    e.stopPropagation();\n\n                    el.setAttribute('data-tracked', 1);\n\n                    // submit the form if the reply takes less than 250ms\n                    this.track(eventName, data, function() {\n                        trackFinished = true;\n\n                        if (typeof options.callback === 'function') {\n                            options.callback(data);\n                        }\n\n                        el.submit();\n                    });\n\n                    // set timeout to resubmit to be a hard 250ms\n                    // so even if woopra does not reply it will still\n                    // submit the form\n                    setTimeout(function() {\n                        if (!trackFinished) {\n                            el.submit();\n                        }\n                    }, 250);\n                }\n            }\n        },\n\n        /**\n         * Tracks clicks\n         *\n         * @param {String} eventName The name of the event to track\n         * @param {String} selector The id of element to track\n         * @param {Object} properties Any event properties to track with\n         * @param {Object} options (Optional) Options object\n         * @param {Array} options.elements Supports an array of elements (jQuery object)\n         * @param {Boolean} options.noNav (Default: false) If true, will only perform the track event and let the click event bubble up\n         */\n        trackClick: function(eventName, selector, properties, options) {\n            var els = [];\n            var i;\n            var _options = options || {};\n            var _event = eventName || 'Item Clicked';\n            var bindEl;\n            var self = this;\n\n            bindEl = function(el, ev, props, opts) {\n                Woopra.attachEvent(el, 'click', function(e) {\n                    self.trackClickHandler(e, el, ev, props, opts);\n                });\n            };\n\n            /**\n             * Support an array of elements\n             */\n            if (_options.elements) {\n                els = _options.elements;\n            }\n            else {\n                els = Woopra.getElement(selector, _options);\n            }\n\n            if (els) {\n                for (i = 0; i < els.length; i++) {\n                    bindEl(els[i], _event, properties, _options);\n                }\n            }\n        },\n\n        trackClickHandler: function(e, el, eventName, properties, options) {\n            var trackFinished = false;\n\n            if (!el.getAttribute('data-tracked')) {\n                if (options.noNav) {\n                    this.track(eventName, properties);\n                }\n                else {\n                    e.preventDefault();\n\n                    el.setAttribute('data-tracked', 1);\n\n                    this.track(eventName, properties, function() {\n                        trackFinished = true;\n\n                        if (typeof options.callback === 'function') {\n                            options.callback();\n                        }\n\n                        el.click();\n                    });\n\n                    setTimeout(function() {\n                        if (!trackFinished) {\n                            el.click();\n                        }\n                    }, 250);\n                }\n            }\n        },\n\n        startPing: function() {\n            var self = this;\n\n            if (typeof this.pingInterval === 'undefined') {\n                this.pingInterval = window.setInterval(function() {\n                    self.ping();\n                }, this.config('ping_interval'));\n            }\n        },\n\n        stopPing: function() {\n            if (typeof this.pingInterval !== 'undefined') {\n                window.clearInterval(this.pingInterval);\n                delete this.pingInterval;\n            }\n        },\n\n        /**\n         * Pings tracker with visitor info\n         */\n        ping: function() {\n            var now;\n\n            if (this.config('ping') && this.idle < this.config('idle_timeout')) {\n                this._push({\n                    endpoint: 'ping'\n                });\n            }\n            else {\n                this.stopPing();\n            }\n\n            now = new Date();\n            if (now - this.last_activity > this.config('idle_threshold')) {\n                this.idle = now - this.last_activity;\n            }\n\n            return this;\n        },\n\n        /**\n         * Pushes visitor data to server without sending an event\n         */\n        push: function(cb) {\n            this._push({\n                endpoint: 'identify',\n                visitorData: this.visitorData,\n                sessionData: this.sessionData,\n                callback: cb\n            });\n            return this;\n        },\n\n        /**\n         * synchronous sleep\n         */\n        sleep: function() {\n        },\n\n        // User Action tracking and event handlers\n\n        /**\n         * Clicks\n         */\n\n        /**\n         * Measure when the user last moved their mouse to update idle state\n         */\n        moved: function(e, last_activity) {\n            this.last_activity = last_activity;\n            this.idle = 0;\n        },\n\n        /**\n         * Measure when user last typed\n         */\n        typed: function() {\n            this.vs = 2;\n        },\n\n        downloaded: function(url) {\n            this.track('download', {\n                url: url\n            });\n        },\n\n        outgoing: function(url) {\n            this.track('outgoing', {\n                url: url\n            });\n        },\n\n        /**\n         * Event handler for decorating an element with a URL (for now only\n         * anchor tags)\n         */\n        autoDecorate: function(elem) {\n            var decorated;\n            var canDecorate;\n            var xdm = this.config('cross_domain');\n\n            if (xdm) {\n                if (typeof xdm === 'string') {\n                    canDecorate = elem.href.indexOf(xdm) > -1;\n                }\n                else if (xdm.push) {\n                    canDecorate = xdm.indexOf(elem.hostname) > -1;\n                }\n\n                if (canDecorate) {\n                    decorated = this.decorate(elem);\n\n                    if (decorated) {\n                        elem.href = decorated;\n                        // bind an event handler on mouseup to remove the url\n                    }\n                }\n            }\n        },\n\n        /**\n         * Resets cookie\n         */\n        reset: function() {\n            docCookies.removeItem(\n                this.config('cookie_name'),\n                this.config('cookie_path'),\n                this.config('cookie_domain')\n            );\n            this.cookie = null;\n            this._setupCookie();\n        },\n\n        /**\n         * Decorates a given URL with a __woopraid query param with value of\n         * the current cookie\n         */\n        decorate: function(url) {\n            var el;\n            var query;\n            var pathname;\n            var host;\n\n            if (typeof url === 'string') {\n                el = document.createElement('a');\n                el.href = url;\n                query = el.search ? '&' : '?';\n            }\n            else if (url && url.href) {\n                el = url;\n            }\n\n            if (el) {\n                query = el.search ? '&' : '?';\n                pathname = el.pathname && el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname;\n\n                host = el.hostname + (el.port && el.port !== '' && el.port !== '80' && el.port !== '0' ? ':' + el.port : '');\n\n                return el.protocol + '//' +\n                    host +\n                    pathname +\n                    el.search +\n                    query + XDM_PARAM_NAME + '=' + this.cookie +\n                    el.hash;\n            }\n        },\n\n        /**\n         * Undecorates a URL with __woopraid query param\n         */\n        undecorate: function(url) {\n            var regex = new RegExp('[?&]+(?:' + XDM_PARAM_NAME + ')=([^&#]*)', 'gi');\n            var _url = url;\n\n            if (url && url.href) {\n                _url = url.href;\n            }\n\n            if (_url) {\n                return _url.replace(regex, '');\n            }\n       },\n\n        getPageUrl: function() {\n            if (this.options.ignore_query_url) {\n                return Woopra.location('pathname');\n            }\n            else {\n                return Woopra.location('pathname') + Woopra.location('search');\n            }\n        },\n\n        getPageHash: function() {\n            return Woopra.location('hash');\n        },\n\n        getPageTitle: function() {\n            return (document.getElementsByTagName('title').length === 0) ? '' : document.getElementsByTagName('title')[0].innerHTML;\n        },\n\n        getDomainName: function() {\n          return Woopra.location('hostname');\n        },\n\n        getURI: function() {\n          return Woopra.location('href');\n        },\n\n        /**\n         * Retrieves a Woopra unique id from a URL's query param (__woopraid)\n         *\n         * @param {String} href The full URL to extract from\n         */\n        getUrlId: function(href) {\n            var _href = href || Woopra.location('href');\n            var matches;\n            var regex = new RegExp(XDM_PARAM_NAME + '=([^&#]+)');\n\n            matches = _href.match(regex);\n\n            if (matches && matches[1]) {\n                return matches[1];\n            }\n        },\n\n        getOptionParams: function() {\n            // default params\n            var o = {\n                alias: this.config('domain') || Woopra.getHostnameNoWww(),\n                instance: this.instanceName,\n                ka: this.config('keep_alive') || this.config('ping_interval') * 2,\n                meta: docCookies.getItem('wooMeta') || '',\n                screen: window.screen.width + 'x' + window.screen.height,\n                language: window.navigator.browserLanguage || window.navigator.language || '',\n                app: this.config('app'),\n                referer: this.config('referer') || document.referrer,\n                idle: '' + parseInt(this.idle / 1000, 10),\n                vs: 'i'\n            };\n\n            if (!this.config('domain')) {\n                o._warn = 'no_domain';\n\n                if (Woopra.getHostnameNoWww() !== Woopra.getDomain()) {\n                    o._warn += ',domain_mismatch';\n                }\n            }\n\n            // set cookie if configured\n            if (this.config('use_cookies')) {\n                o.cookie = this.getCookie() || this.cookie;\n            }\n\n            // set ip if configured\n            if (this.config('ip')) {\n                o.ip = this.config('ip');\n            }\n            // this.vs is 2 after typing so 'writing'\n            if (this.vs === 2) {\n                o.vs = 'w';\n                this.vs = 0;\n            }\n            else if (this.idle === 0) {\n                o.vs = 'r';\n            }\n\n            return o;\n        },\n\n        /**\n         * Stop ping timers and cleanup any globals.  Shouldn't really\n         * be needed by clients.\n         */\n        dispose: function() {\n            this.stopPing();\n\n            for (var id in this.__l) {\n                if (this.__l.hasOwnProperty(id)) {\n                    _handler[id][this.instanceName] = null;\n                }\n            }\n            this.__l = null;\n\n            // cleanup global\n            if (typeof window[this.instanceName] !== 'undefined') {\n                try {\n                    delete window[this.instanceName];\n                }\n                catch(e) {\n                    window[this.instanceName] = undefined;\n                }\n            }\n        }\n    };\n\n    window.WoopraTracker = Tracker;\n    window.WoopraLoadScript = Woopra.loadScript;\n\n    if (typeof window.exports !== 'undefined') {\n        Woopra.Tracker = Tracker;\n        window.exports.Woopra = Woopra;\n\n        if (typeof window.woopraLoaded === 'function') {\n            window.woopraLoaded();\n            window.woopraLoaded = null;\n        }\n    }\n\n    // Initialize instances & preloaded settings/events\n    var _queue = window.__woo || window._w;\n    if (typeof _queue !== 'undefined') {\n        for (var name in _queue) {\n            if (_queue.hasOwnProperty(name)) {\n                var instance = new Tracker(name);\n                instance.init();\n\n                // DO NOT REMOVE\n                // compatibility with old tracker and chat\n                if (typeof window.woopraTracker === 'undefined') {\n                    window.woopraTracker = instance;\n                }\n            }\n        }\n    }\n\n})(window, document);\n"

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = __webpack_require__(8);
var ReactDOM = __webpack_require__(8);
var ExecutionEnvironment = __webpack_require__(205);
var ModalPortal = React.createFactory(__webpack_require__(235));
var ariaAppHider = __webpack_require__(236);
var elementClass = __webpack_require__(202);
var renderSubtreeIntoContainer = __webpack_require__(8).unstable_renderSubtreeIntoContainer;

var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};
var AppElement = ExecutionEnvironment.canUseDOM ? document.body : { appendChild: function appendChild() {} };

var Modal = React.createClass({

  displayName: 'Modal',
  statics: {
    setAppElement: function setAppElement(element) {
      AppElement = ariaAppHider.setElement(element);
    },
    injectCSS: function injectCSS() {
      "production" !== "production" && console.warn('React-Modal: injectCSS has been deprecated ' + 'and no longer has any effect. It will be removed in a later version');
    }
  },

  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    style: React.PropTypes.shape({
      content: React.PropTypes.object,
      overlay: React.PropTypes.object
    }),
    portalClassName: React.PropTypes.string,
    bodyClassName: React.PropTypes.string,
    appElement: React.PropTypes.instanceOf(SafeHTMLElement),
    onAfterOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    closeTimeoutMS: React.PropTypes.number,
    ariaHideApp: React.PropTypes.bool,
    shouldCloseOnOverlayClick: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isOpen: false,
      portalClassName: 'ReactModalPortal',
      bodyClassName: 'ReactModal__Body',
      ariaHideApp: true,
      closeTimeoutMS: 0,
      shouldCloseOnOverlayClick: true
    };
  },

  componentDidMount: function componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = this.props.portalClassName;
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  },

  componentWillUnmount: function componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
    elementClass(document.body).remove(this.openBodyClass());
  },

  openBodyClass: function openBodyClass() {
    return this.props.bodyClassName + "--open";
  },

  renderPortal: function renderPortal(props) {
    if (props.isOpen) {
      elementClass(document.body).add(this.openBodyClass());
    } else {
      elementClass(document.body).remove(this.openBodyClass());
    }

    if (props.ariaHideApp) {
      ariaAppHider.toggle(props.isOpen, props.appElement);
    }

    this.portal = renderSubtreeIntoContainer(this, ModalPortal(_extends({}, props, { defaultStyles: Modal.defaultStyles })), this.node);
  },

  render: function render() {
    return React.DOM.noscript();
  }
});

Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

module.exports = Modal;

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = __webpack_require__(8);
var div = React.DOM.div;
var focusManager = __webpack_require__(237);
var scopeTab = __webpack_require__(238);

var noOp = function noOp() {};

var defaultProps = {
  onAfterClose: noOp,
  style: {
    overlay: {},
    content: {}
  },
  overlayClassName: 'ReactModal__Overlay',
  className: 'ReactModal__Content'
};

var ModalPortal = module.exports = React.createClass({
  displayName: 'ModalPortal',
  shouldClose: null,

  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },

  getInitialState: function getInitialState() {
    return {
      afterOpen: false,
      beforeClose: false
    };
  },

  componentDidMount: function componentDidMount() {
    // Focus needs to be set when mounting and already open
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.closeTimer);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && newProps.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(false);
    }
  },

  setFocusAfterRender: function setFocusAfterRender(focus) {
    this.focusAfterRender = focus;
  },

  open: function open() {
    if (this.state.afterOpen && this.state.beforeClose) {
      clearTimeout(this.closeTimer);
      this.setState({ beforeClose: false });
    } else {
      focusManager.setupScopedFocus(this.node);
      focusManager.markForFocusLater();
      this.setState({ isOpen: true }, function () {
        this.setState({ afterOpen: true });

        if (this.props.isOpen && this.props.onAfterOpen) {
          this.props.onAfterOpen();
        }
      }.bind(this));
    }
  },

  close: function close() {
    if (!this.ownerHandlesClose()) return;
    if (this.props.closeTimeoutMS > 0) this.closeWithTimeout();else this.closeWithoutTimeout();
  },

  focusContent: function focusContent() {
    // Don't steal focus from inner elements
    if (!this.contentHasFocus()) {
      this.refs.content.focus();
    }
  },

  closeWithTimeout: function closeWithTimeout() {
    this.setState({ beforeClose: true }, function () {
      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
    }.bind(this));
  },

  closeWithoutTimeout: function closeWithoutTimeout() {
    this.setState({
      beforeClose: false,
      isOpen: false,
      afterOpen: false
    }, this.afterClose);
  },

  afterClose: function afterClose() {
    focusManager.returnFocus();
    focusManager.teardownScopedFocus();
    this.props.onAfterClose();
  },

  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode == 9 /*tab*/) scopeTab(this.refs.content, event);
    if (event.keyCode == 27 /*esc*/) {
        event.preventDefault();
        this.requestClose(event);
      }
  },

  handleOverlayMouseDown: function handleOverlayMouseDown(event) {
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }
  },

  handleOverlayMouseUp: function handleOverlayMouseUp(event) {
    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {
      if (this.ownerHandlesClose()) this.requestClose(event);else this.focusContent();
    }
    this.shouldClose = null;
  },

  handleContentMouseDown: function handleContentMouseDown(event) {
    this.shouldClose = false;
  },

  handleContentMouseUp: function handleContentMouseUp(event) {
    this.shouldClose = false;
  },

  requestClose: function requestClose(event) {
    if (this.ownerHandlesClose()) this.props.onRequestClose(event);
  },

  ownerHandlesClose: function ownerHandlesClose() {
    return this.props.onRequestClose;
  },

  shouldBeClosed: function shouldBeClosed() {
    return !this.props.isOpen && !this.state.beforeClose;
  },

  contentHasFocus: function contentHasFocus() {
    return document.activeElement === this.refs.content || this.refs.content.contains(document.activeElement);
  },

  buildClassName: function buildClassName(baseClass) {
    var className = baseClass + " ";
    if (this.state.afterOpen) className += baseClass + '--after-open';
    if (this.state.beforeClose) className += baseClass + '--before-close';
    return className;
  },

  getPropInlineStyle: function getPropInlineStyle(useDefaultStyle, styleName) {
    var defaultStyles = useDefaultStyle ? this.props.defaultStyles[styleName] : {};
    var propsStyles = this.props.style[styleName] || {};
    return _extends({}, defaultStyles, propsStyles);
  },

  isPropEqualToDefault: function isPropEqualToDefault(propName) {
    return this.props[propName] === defaultProps[propName];
  },

  render: function render() {
    var contentStyles = this.getPropInlineStyle(this.isPropEqualToDefault("className"), "content");
    var overlayStyles = this.getPropInlineStyle(this.isPropEqualToDefault("overlayClassName"), "overlay");

    return this.shouldBeClosed() ? div() : div({
      ref: "overlay",
      className: this.buildClassName(this.props.overlayClassName),
      style: overlayStyles,
      onMouseDown: this.handleOverlayMouseDown,
      onMouseUp: this.handleOverlayMouseUp
    }, div({
      ref: "content",
      style: contentStyles,
      className: this.buildClassName(this.props.className),
      tabIndex: "-1",
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleContentMouseDown,
      onMouseUp: this.handleContentMouseUp,
      role: "dialog"
    }, this.props.children));
  }
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _element = typeof document !== 'undefined' ? document.body : null;

function setElement(element) {
  if (typeof element === 'string') {
    var el = document.querySelectorAll(element);
    element = 'length' in el ? el[0] : el;
  }
  _element = element || _element;
  return _element;
}

function hide(appElement) {
  validateElement(appElement);
  (appElement || _element).setAttribute('aria-hidden', 'true');
}

function show(appElement) {
  validateElement(appElement);
  (appElement || _element).removeAttribute('aria-hidden');
}

function toggle(shouldHide, appElement) {
  if (shouldHide) hide(appElement);else show(appElement);
}

function validateElement(appElement) {
  if (!appElement && !_element) throw new Error('react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible');
}

function resetForTesting() {
  _element = document.body;
}

exports.toggle = toggle;
exports.setElement = setElement;
exports.show = show;
exports.hide = hide;
exports.resetForTesting = resetForTesting;

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var findTabbable = __webpack_require__(92);
var modalElement = null;
var focusLaterElement = null;
var needToFocus = false;

function handleBlur(event) {
  needToFocus = true;
}

function handleFocus(event) {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation 
    // is that the document.body gets focus, and then we focus our element right 
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) return;
      var el = findTabbable(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

exports.markForFocusLater = function () {
  focusLaterElement = document.activeElement;
};

exports.returnFocus = function () {
  try {
    focusLaterElement.focus();
  } catch (e) {
    console.warn('You tried to return focus to ' + focusLaterElement + ' but it is not in the DOM anymore');
  }
  focusLaterElement = null;
};

exports.setupScopedFocus = function (element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener('blur', handleBlur, false);
    document.addEventListener('focus', handleFocus, true);
  } else {
    window.attachEvent('onBlur', handleBlur);
    document.attachEvent('onFocus', handleFocus);
  }
};

exports.teardownScopedFocus = function () {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener('blur', handleBlur);
    document.removeEventListener('focus', handleFocus);
  } else {
    window.detachEvent('onBlur', handleBlur);
    document.detachEvent('onFocus', handleFocus);
  }
};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var findTabbable = __webpack_require__(92);

module.exports = function (node, event) {
  var tabbable = findTabbable(node);
  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  var leavingFinalTabbable = finalTabbable === document.activeElement ||
  // handle immediate shift+tab after opening with mouse
  node === document.activeElement;
  if (!leavingFinalTabbable) return;
  event.preventDefault();
  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  target.focus();
};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(234);

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = undefined;

var _react = __webpack_require__(8);

var _storeShape = __webpack_require__(93);

var _storeShape2 = _interopRequireDefault(_storeShape);

var _warning = __webpack_require__(94);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store };
  };

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.store = props.store;
    return _this;
  }

  Provider.prototype.render = function render() {
    return _react.Children.only(this.props.children);
  };

  return Provider;
}(_react.Component);

exports["default"] = Provider;


if (false) {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;


    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
}

Provider.propTypes = {
  store: _storeShape2["default"].isRequired,
  children: _react.PropTypes.element.isRequired
};
Provider.childContextTypes = {
  store: _storeShape2["default"].isRequired
};

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = connect;

var _react = __webpack_require__(8);

var _storeShape = __webpack_require__(93);

var _storeShape2 = _interopRequireDefault(_storeShape);

var _shallowEqual = __webpack_require__(242);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _wrapActionCreators = __webpack_require__(243);

var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

var _warning = __webpack_require__(94);

var _warning2 = _interopRequireDefault(_warning);

var _isPlainObject = __webpack_require__(63);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _hoistNonReactStatics = __webpack_require__(213);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = __webpack_require__(89);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultMapStateToProps = function defaultMapStateToProps(state) {
  return {};
}; // eslint-disable-line no-unused-vars
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
  return _extends({}, parentProps, stateProps, dispatchProps);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var errorObject = { value: null };
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx);
  } catch (e) {
    errorObject.value = e;
    return errorObject;
  }
}

// Helps track hot reloading.
var nextVersion = 0;

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var shouldSubscribe = Boolean(mapStateToProps);
  var mapState = mapStateToProps || defaultMapStateToProps;

  var mapDispatch = void 0;
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps;
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps;
  } else {
    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
  }

  var finalMergeProps = mergeProps || defaultMergeProps;
  var _options$pure = options.pure,
      pure = _options$pure === undefined ? true : _options$pure,
      _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef;

  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

  // Helps track hot reloading.
  var version = nextVersion++;

  return function wrapWithConnect(WrappedComponent) {
    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

    function checkStateShape(props, methodName) {
      if (!(0, _isPlainObject2["default"])(props)) {
        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
      }
    }

    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
      if (false) {
        checkStateShape(mergedProps, 'mergeProps');
      }
      return mergedProps;
    }

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
      };

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.store = props.store || context.store;

        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

        var storeState = _this.store.getState();
        _this.state = { storeState: storeState };
        _this.clearCache();
        return _this;
      }

      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props);
        }

        var state = store.getState();
        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

        if (false) {
          checkStateShape(stateProps, 'mapStateToProps');
        }
        return stateProps;
      };

      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
        var mappedState = mapState(store.getState(), props);
        var isFactory = typeof mappedState === 'function';

        this.finalMapStateToProps = isFactory ? mappedState : mapState;
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

        if (isFactory) {
          return this.computeStateProps(store, props);
        }

        if (false) {
          checkStateShape(mappedState, 'mapStateToProps');
        }
        return mappedState;
      };

      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props);
        }

        var dispatch = store.dispatch;

        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

        if (false) {
          checkStateShape(dispatchProps, 'mapDispatchToProps');
        }
        return dispatchProps;
      };

      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
        var mappedDispatch = mapDispatch(store.dispatch, props);
        var isFactory = typeof mappedDispatch === 'function';

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

        if (isFactory) {
          return this.computeDispatchProps(store, props);
        }

        if (false) {
          checkStateShape(mappedDispatch, 'mapDispatchToProps');
        }
        return mappedDispatch;
      };

      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
        var nextStateProps = this.computeStateProps(this.store, this.props);
        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
          return false;
        }

        this.stateProps = nextStateProps;
        return true;
      };

      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
          return false;
        }

        this.dispatchProps = nextDispatchProps;
        return true;
      };

      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
          return false;
        }

        this.mergedProps = nextMergedProps;
        return true;
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return typeof this.unsubscribe === 'function';
      };

      Connect.prototype.trySubscribe = function trySubscribe() {
        if (shouldSubscribe && !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
          this.handleChange();
        }
      };

      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        this.trySubscribe();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
          this.haveOwnPropsChanged = true;
        }
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        this.tryUnsubscribe();
        this.clearCache();
      };

      Connect.prototype.clearCache = function clearCache() {
        this.dispatchProps = null;
        this.stateProps = null;
        this.mergedProps = null;
        this.haveOwnPropsChanged = true;
        this.hasStoreStateChanged = true;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;
        this.renderedElement = null;
        this.finalMapDispatchToProps = null;
        this.finalMapStateToProps = null;
      };

      Connect.prototype.handleChange = function handleChange() {
        if (!this.unsubscribe) {
          return;
        }

        var storeState = this.store.getState();
        var prevStoreState = this.state.storeState;
        if (pure && prevStoreState === storeState) {
          return;
        }

        if (pure && !this.doStatePropsDependOnOwnProps) {
          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
          if (!haveStatePropsChanged) {
            return;
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value;
          }
          this.haveStatePropsBeenPrecalculated = true;
        }

        this.hasStoreStateChanged = true;
        this.setState({ storeState: storeState });
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

        return this.refs.wrappedInstance;
      };

      Connect.prototype.render = function render() {
        var haveOwnPropsChanged = this.haveOwnPropsChanged,
            hasStoreStateChanged = this.hasStoreStateChanged,
            haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
            statePropsPrecalculationError = this.statePropsPrecalculationError,
            renderedElement = this.renderedElement;


        this.haveOwnPropsChanged = false;
        this.hasStoreStateChanged = false;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError;
        }

        var shouldUpdateStateProps = true;
        var shouldUpdateDispatchProps = true;
        if (pure && renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
        }

        var haveStatePropsChanged = false;
        var haveDispatchPropsChanged = false;
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true;
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded();
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
        }

        var haveMergedPropsChanged = true;
        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
        } else {
          haveMergedPropsChanged = false;
        }

        if (!haveMergedPropsChanged && renderedElement) {
          return renderedElement;
        }

        if (withRef) {
          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
            ref: 'wrappedInstance'
          }));
        } else {
          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
        }

        return this.renderedElement;
      };

      return Connect;
    }(_react.Component);

    Connect.displayName = connectDisplayName;
    Connect.WrappedComponent = WrappedComponent;
    Connect.contextTypes = {
      store: _storeShape2["default"]
    };
    Connect.propTypes = {
      store: _storeShape2["default"]
    };

    if (false) {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return;
        }

        // We are hot reloading!
        this.version = version;
        this.trySubscribe();
        this.clearCache();
      };
    }

    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
  };
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = shallowEqual;
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = wrapActionCreators;

var _redux = __webpack_require__(32);

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
  };
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(8), __webpack_require__(8));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Webcam"] = factory(require("react"), require("react-dom"));
	else
		root["Webcam"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	/*
	Deliberatly ignoring the old api, due to very inconsistent behaviours
	*/
	var mediaDevices = navigator.mediaDevices;
	var getUserMedia = mediaDevices && mediaDevices.getUserMedia ? mediaDevices.getUserMedia.bind(mediaDevices) : null;
	var hasGetUserMedia = !!getUserMedia;

	var Webcam = (function (_Component) {
	  _inherits(Webcam, _Component);

	  _createClass(Webcam, null, [{
	    key: 'propTypes',
	    value: {
	      audio: _react.PropTypes.bool,
	      muted: _react.PropTypes.bool,
	      onUserMedia: _react.PropTypes.func,
	      onFailure: _react.PropTypes.func,
	      height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	      width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	      screenshotFormat: _react.PropTypes.oneOf(['image/webp', 'image/png', 'image/jpeg']),
	      className: _react.PropTypes.string,
	      audioSource: _react.PropTypes.string,
	      videoSource: _react.PropTypes.string
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      audio: true,
	      height: 480,
	      width: 640,
	      screenshotFormat: 'image/webp',
	      onUserMedia: function onUserMedia() {},
	      onFailure: function onFailure() {}
	    },
	    enumerable: true
	  }, {
	    key: 'mountedInstances',
	    value: [],
	    enumerable: true
	  }, {
	    key: 'userMediaRequested',
	    value: false,
	    enumerable: true
	  }]);

	  function Webcam(props) {
	    _classCallCheck(this, Webcam);

	    _Component.call(this, props);
	    this.state = {
	      hasUserMedia: false
	    };

	    if (!hasGetUserMedia) {
	      var error = new Error('getUserMedia is not supported by this browser');
	      this.props.onFailure(error);
	    }
	  }

	  Webcam.prototype.componentDidMount = function componentDidMount() {
	    Webcam.mountedInstances.push(this);

	    if (!Webcam.userMediaRequested) {
	      this.requestUserMedia();
	    }
	  };

	  Webcam.prototype.requestUserMedia = function requestUserMedia() {
	    var _this = this;

	    var sourceSelected = function sourceSelected(audioSource, videoSource) {
	      var _props = _this.props;
	      var width = _props.width;
	      var height = _props.height;

	      /* There is an inconsistency between Chrome v58 and Firefox
	      `exact` resolution constraint works in a different way to firefox. If the requested `exact` resolution is higher than the supported webcam resolution then Chrome will upscale.
	      However Firefox will trigger an OverConstraintError. I suspect Firefox is following the standard
	       In case a non exact resolution is requested, instead an `ideal` is, Firefox will handle all cases gracefully and prepare a resolution which is as close as possible to the requested one.
	      If the supported webcam resolution is higher than the requested one, then it downscales;
	      if it's lower, then it gives the highest available.
	      However, Chrome will just give the lowest resolution of the webcam, this seems like a bug.
	       Therefore, if one wants the ideal constraint functionality, the `exact` constraint works best on Chrome and the ideal one best on Firefox.
	       This lead us to use the `advanced` constraint to create a list of potential constraint fallbacks.
	      The weird thing is, that Chrome seems to work well with `ideal` if the constraint is defined as list element in `advanced`.
	      Which means that setting a list with multiple fallbacks is not necessary, but setting the one constaint in `advance` is.
	       The problem is that Firefox does not work with ideal well if advanced is used,
	      which means the ideal needs to go on the parent constraint, together with advanced for Chome.
	       ref: https://webrtchacks.com/getusermedia-resolutions-3/
	      ref: https://w3c.github.io/mediacapture-main/getusermedia.html#constrainable-interface
	      ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	      ref: https://github.com/webrtc/adapter/issues/408 They discuss the Chrome bug
	      ref: https://bugs.chromium.org/p/chromium/issues/detail?id=682887 the actual chrome bug
	       */
	      var constraints = {
	        video: {
	          sourceId: videoSource,
	          width: width, height: height, // Necessary to get Firefox to work with ideal resolutions
	          advanced: [{ width: width, height: height }] // Necessary to get Chrome to work with ideal resolutions
	        }
	      };

	      if (_this.props.audio) {
	        constraints.audio = {
	          sourceId: audioSource
	        };
	      }

	      var logError = function logError(e) {
	        return console.log('error', e, typeof e);
	      };

	      var onSuccess = function onSuccess(stream) {
	        Webcam.mountedInstances.forEach(function (instance) {
	          return instance.handleUserMedia(stream);
	        });
	      };

	      var onError = function onError(e) {
	        logError(e);
	        Webcam.mountedInstances.forEach(function (instance) {
	          return instance.handleError(e);
	        });
	      };

	      getUserMedia(constraints).then(onSuccess)['catch'](onError);
	    };

	    if (this.props.audioSource && this.props.videoSource) {
	      sourceSelected(this.props.audioSource, this.props.videoSource);
	    } else {
	      mediaDevices.enumerateDevices().then(function (devices) {
	        var audioSource = null;
	        var videoSource = null;

	        devices.forEach(function (device) {
	          if (device.kind === 'audio') {
	            audioSource = device.id;
	          } else if (device.kind === 'video') {
	            videoSource = device.id;
	          }
	        });

	        sourceSelected(audioSource, videoSource);
	      })['catch'](function (error) {
	        console.log(error.name + ': ' + error.message); // eslint-disable-line no-console
	      });
	    }

	    Webcam.userMediaRequested = true;
	  };

	  Webcam.prototype.handleError = function handleError(error) {
	    this.setState({
	      hasUserMedia: false
	    });
	    this.props.onFailure(error);
	  };

	  Webcam.prototype.handleUserMedia = function handleUserMedia(stream) {
	    var src = window.URL.createObjectURL(stream);
	    if (this.state.src) window.URL.revokeObjectURL(src);

	    this.stream = stream;
	    this.setState({
	      hasUserMedia: true,
	      src: src
	    });

	    this.props.onUserMedia();
	  };

	  Webcam.prototype.componentWillUnmount = function componentWillUnmount() {
	    var index = Webcam.mountedInstances.indexOf(this);
	    Webcam.mountedInstances.splice(index, 1);

	    if (Webcam.mountedInstances.length === 0 && this.state.hasUserMedia) {
	      if (this.stream.stop) {
	        this.stream.stop();
	      } else {
	        if (this.stream.getVideoTracks) {
	          for (var _iterator = this.stream.getVideoTracks(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }

	            var track = _ref;

	            track.stop();
	          }
	        }
	        if (this.stream.getAudioTracks) {
	          for (var _iterator2 = this.stream.getAudioTracks(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	            var _ref2;

	            if (_isArray2) {
	              if (_i2 >= _iterator2.length) break;
	              _ref2 = _iterator2[_i2++];
	            } else {
	              _i2 = _iterator2.next();
	              if (_i2.done) break;
	              _ref2 = _i2.value;
	            }

	            var track = _ref2;

	            track.stop();
	          }
	        }
	      }
	      Webcam.userMediaRequested = false;
	      window.URL.revokeObjectURL(this.state.src);
	    }
	  };

	  Webcam.prototype.getScreenshot = function getScreenshot() {
	    if (!this.state.hasUserMedia) return null;

	    var canvas = this.getCanvas();
	    return canvas.toDataURL(this.props.screenshotFormat);
	  };

	  Webcam.prototype.getCanvas = function getCanvas() {
	    if (!this.state.hasUserMedia) return null;

	    var video = _reactDom.findDOMNode(this);

	    if (!this.canvas) this.canvas = document.createElement('canvas');
	    var canvas = this.canvas;

	    if (!this.ctx) this.ctx = canvas.getContext('2d');
	    var ctx = this.ctx;

	    // This is set every time incase the video element has resized
	    canvas.width = video.videoWidth;
	    canvas.height = video.videoHeight;

	    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	    return canvas;
	  };

	  Webcam.prototype.render = function render() {
	    return _react2['default'].createElement('video', {
	      autoPlay: true,
	      width: this.props.width,
	      height: this.props.height,
	      src: this.state.src,
	      muted: this.props.muted,
	      className: this.props.className
	    });
	  };

	  return Webcam;
	})(_react.Component);

	exports['default'] = Webcam;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ])
});
;

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = applyMiddleware;

var _compose = __webpack_require__(95);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, initialState, enhancer) {
      var store = createStore(reducer, initialState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = combineReducers;

var _createStore = __webpack_require__(96);

var _isPlainObject = __webpack_require__(63);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(97);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2["default"])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key);
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (false) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
      if (warningMessage) {
        (0, _warning2["default"])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createSelector = createSelector;
exports.createStructuredSelector = createStructuredSelector;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function defaultEqualityCheck(a, b) {
  return a === b;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (lastArgs !== null && lastArgs.length === args.length && args.every(function (value, index) {
      return equalityCheck(value, lastArgs[index]);
    })) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = func.apply(undefined, args);
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    memoizeOptions[_key2 - 1] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      funcs[_key3] = arguments[_key3];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      return resultFunc.apply(undefined, arguments);
    }].concat(memoizeOptions));

    var selector = function selector(state, props) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var params = dependencies.map(function (dependency) {
        return dependency.apply(undefined, [state, props].concat(args));
      });
      return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
    };

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

function createSelector() {
  return createSelectorCreator(defaultMemoize).apply(undefined, arguments);
}

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      values[_key5] = arguments[_key5];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),
/* 250 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(250)(__webpack_require__(233))

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(187);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(188);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(189);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(191);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(192);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(193);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(194);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(195);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(201);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(196);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(197);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(199);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(200);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-1!../../../node_modules/postcss-loader/lib/index.js??ref--3-2!../../../node_modules/less-loader/dist/cjs.js??ref--3-3!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! npm.im/supports-webp */


var canvas = document.createElement('canvas');
canvas.width = canvas.height = 1;
var index = canvas.toDataURL && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

module.exports = index;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


module.exports = __webpack_require__(267)(global || window || this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var valueEqual = function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
    return valueEqual(item, b[index]);
  });

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
};

exports.default = valueEqual;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(271)


/***/ }),
/* 270 */
/***/ (function(module, exports) {

;(function (global) {
    "use strict";

    var lastId = -1;

    // Visibility.js allow you to know, that your web page is in the background
    // tab and thus not visible to the user. This library is wrap under
    // Page Visibility API. It fix problems with different vendor prefixes and
    // add high-level useful functions.
    var self = {

        // Call callback only when page become to visible for user or
        // call it now if page is visible now or Page Visibility API
        // doesn’t supported.
        //
        // Return false if API isn’t supported, true if page is already visible
        // or listener ID (you can use it in `unbind` method) if page isn’t
        // visible now.
        //
        //   Visibility.onVisible(function () {
        //       startIntroAnimation();
        //   });
        onVisible: function (callback) {
            var support = self.isSupported();
            if ( !support || !self.hidden() ) {
                callback();
                return support;
            }

            var listener = self.change(function (e, state) {
                if ( !self.hidden() ) {
                    self.unbind(listener);
                    callback();
                }
            });
            return listener;
        },

        // Call callback when visibility will be changed. First argument for
        // callback will be original event object, second will be visibility
        // state name.
        //
        // Return listener ID to unbind listener by `unbind` method.
        //
        // If Page Visibility API doesn’t supported method will be return false
        // and callback never will be called.
        //
        //   Visibility.change(function(e, state) {
        //       Statistics.visibilityChange(state);
        //   });
        //
        // It is just proxy to `visibilitychange` event, but use vendor prefix.
        change: function (callback) {
            if ( !self.isSupported() ) {
                return false;
            }
            lastId += 1;
            var number = lastId;
            self._callbacks[number] = callback;
            self._listen();
            return number;
        },

        // Remove `change` listener by it ID.
        //
        //   var id = Visibility.change(function(e, state) {
        //       firstChangeCallback();
        //       Visibility.unbind(id);
        //   });
        unbind: function (id) {
            delete self._callbacks[id];
        },

        // Call `callback` in any state, expect “prerender”. If current state
        // is “prerender” it will wait until state will be changed.
        // If Page Visibility API doesn’t supported, it will call `callback`
        // immediately.
        //
        // Return false if API isn’t supported, true if page is already after
        // prerendering or listener ID (you can use it in `unbind` method)
        // if page is prerended now.
        //
        //   Visibility.afterPrerendering(function () {
        //       Statistics.countVisitor();
        //   });
        afterPrerendering: function (callback) {
            var support   = self.isSupported();
            var prerender = 'prerender';

            if ( !support || prerender != self.state() ) {
                callback();
                return support;
            }

            var listener = self.change(function (e, state) {
                if ( prerender != state ) {
                    self.unbind(listener);
                    callback();
                }
            });
            return listener;
        },

        // Return true if page now isn’t visible to user.
        //
        //   if ( !Visibility.hidden() ) {
        //       VideoPlayer.play();
        //   }
        //
        // It is just proxy to `document.hidden`, but use vendor prefix.
        hidden: function () {
            return !!(self._doc.hidden || self._doc.webkitHidden);
        },

        // Return visibility state: 'visible', 'hidden' or 'prerender'.
        //
        //   if ( 'prerender' == Visibility.state() ) {
        //       Statistics.pageIsPrerendering();
        //   }
        //
        // Don’t use `Visibility.state()` to detect, is page visible, because
        // visibility states can extend in next API versions.
        // Use more simpler and general `Visibility.hidden()` for this cases.
        //
        // It is just proxy to `document.visibilityState`, but use
        // vendor prefix.
        state: function () {
            return self._doc.visibilityState       ||
                   self._doc.webkitVisibilityState ||
                   'visible';
        },

        // Return true if browser support Page Visibility API.
        //
        //   if ( Visibility.isSupported() ) {
        //       Statistics.startTrackingVisibility();
        //       Visibility.change(function(e, state)) {
        //           Statistics.trackVisibility(state);
        //       });
        //   }
        isSupported: function () {
            return !!(self._doc.visibilityState ||
                      self._doc.webkitVisibilityState);
        },

        // Link to document object to change it in tests.
        _doc: document || {},

        // Callbacks from `change` method, that wait visibility changes.
        _callbacks: { },

        // Listener for `visibilitychange` event.
        _change: function(event) {
            var state = self.state();

            for ( var i in self._callbacks ) {
                self._callbacks[i].call(self._doc, event, state);
            }
        },

        // Set listener for `visibilitychange` event.
        _listen: function () {
            if ( self._init ) {
                return;
            }

            var event = 'visibilitychange';
            if ( self._doc.webkitVisibilityState ) {
                event = 'webkit' + event;
            }

            var listener = function () {
                self._change.apply(self, arguments);
            };
            if ( self._doc.addEventListener ) {
                self._doc.addEventListener(event, listener);
            } else {
                self._doc.attachEvent(event, listener);
            }
            self._init = true;
        }

    };

    if ( typeof(module) != 'undefined' && module.exports ) {
        module.exports = self;
    } else {
        global.Visibility = self;
    }

})(this);


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

;(function (window) {
    "use strict";

    var lastTimer = -1;

    var install = function (Visibility) {

        // Run callback every `interval` milliseconds if page is visible and
        // every `hiddenInterval` milliseconds if page is hidden.
        //
        //   Visibility.every(60 * 1000, 5 * 60 * 1000, function () {
        //       checkNewMails();
        //   });
        //
        // You can skip `hiddenInterval` and callback will be called only if
        // page is visible.
        //
        //   Visibility.every(1000, function () {
        //       updateCountdown();
        //   });
        //
        // It is analog of `setInterval(callback, interval)` but use visibility
        // state.
        //
        // It return timer ID, that you can use in `Visibility.stop(id)` to stop
        // timer (`clearInterval` analog).
        // Warning: timer ID is different from interval ID from `setInterval`,
        // so don’t use it in `clearInterval`.
        //
        // On change state from hidden to visible timers will be execute.
        Visibility.every = function (interval, hiddenInterval, callback) {
            Visibility._time();

            if ( !callback ) {
                callback = hiddenInterval;
                hiddenInterval = null;
            }

            lastTimer += 1;
            var number = lastTimer;

            Visibility._timers[number] = {
                visible:  interval,
                hidden:   hiddenInterval,
                callback: callback
            };
            Visibility._run(number, false);

            if ( Visibility.isSupported() ) {
                Visibility._listen();
            }
            return number;
        };

        // Stop timer from `every` method by it ID (`every` method return it).
        //
        //   slideshow = Visibility.every(5 * 1000, function () {
        //       changeSlide();
        //   });
        //   $('.stopSlideshow').click(function () {
        //       Visibility.stop(slideshow);
        //   });
        Visibility.stop = function(id) {
            if ( !Visibility._timers[id] ) {
                return false;
            }
            Visibility._stop(id);
            delete Visibility._timers[id];
            return true;
        };

        // Callbacks and intervals added by `every` method.
        Visibility._timers = { };

        // Initialize variables on page loading.
        Visibility._time = function () {
            if ( Visibility._timed ) {
                return;
            }
            Visibility._timed     = true;
            Visibility._wasHidden = Visibility.hidden();

            Visibility.change(function () {
                Visibility._stopRun();
                Visibility._wasHidden = Visibility.hidden();
            });
        };

        // Try to run timer from every method by it’s ID. It will be use
        // `interval` or `hiddenInterval` depending on visibility state.
        // If page is hidden and `hiddenInterval` is null,
        // it will not run timer.
        //
        // Argument `runNow` say, that timers must be execute now too.
        Visibility._run = function (id, runNow) {
            var interval,
                timer = Visibility._timers[id];

            if ( Visibility.hidden() ) {
                if ( null === timer.hidden ) {
                    return;
                }
                interval = timer.hidden;
            } else {
                interval = timer.visible;
            }

            var runner = function () {
                timer.last = new Date();
                timer.callback.call(window);
            }

            if ( runNow ) {
                var now  = new Date();
                var last = now - timer.last ;

                if ( interval > last ) {
                    timer.delay = setTimeout(function () {
                        timer.id = setInterval(runner, interval);
                        runner();
                    }, interval - last);
                } else {
                    timer.id = setInterval(runner, interval);
                    runner();
                }

            } else {
              timer.id = setInterval(runner, interval);
            }
        };

        // Stop timer from `every` method by it’s ID.
        Visibility._stop = function (id) {
            var timer = Visibility._timers[id];
            clearInterval(timer.id);
            clearTimeout(timer.delay);
            delete timer.id;
            delete timer.delay;
        };

        // Listener for `visibilitychange` event.
        Visibility._stopRun = function (event) {
            var isHidden  = Visibility.hidden(),
                wasHidden = Visibility._wasHidden;

            if ( (isHidden && !wasHidden) || (!isHidden && wasHidden) ) {
                for ( var i in Visibility._timers ) {
                    Visibility._stop(i);
                    Visibility._run(i, !isHidden);
                }
            }
        };

        return Visibility;
    }

    if ( typeof(module) != 'undefined' && module.exports ) {
        module.exports = install(__webpack_require__(270));
    } else {
        install(window.Visibility)
    }

})(window);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map