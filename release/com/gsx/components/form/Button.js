/**
 * @file 事件触发源实现。
 *
 * @author kuanghongrui@baijiahulian.com
 */
define('com/gsx/events/EventDispatcher',["require", "exports"], function (require, exports) {
    //import {IEventDispatcher} from './IEventDispatcher';
    //import EventEmitter = require('eventemitter3');
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.eventEmitter = new EventEmitter3.EventEmitter();
        }
        /**
         * @override
         * Register a new EventListener for the given event.
         *
         * @param {string} eventType Name of the event.
         * @param {Functon} fn Callback function.
         * @param {Mixed} context The context of the function.
         */
        EventDispatcher.prototype.on = function (eventType, fn, context) {
            this.eventEmitter.on(eventType, fn, context);
            return this;
        };
        /**
         * @override
         * Return a list of assigned event listeners.
         *
         * @param {string} eventType The events that should be listed.
         * @return {Array}
         */
        EventDispatcher.prototype.listeners = function (eventType) {
            return this.eventEmitter.listeners(eventType);
        };
        /**
         * @override
         * Emit an event to all registered event listeners.
         *
         * @param {string} eventType The name of the event.
         * @return {boolean} Indication if we've emitted an event.
         */
        EventDispatcher.prototype.emit = function (eventType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this.eventEmitter.apply(this, [eventType].concat(args));
        };
        /**
         * @override
         * Add an EventListener that's only called once.
         *
         * @param {string} eventType Name of the event.
         * @param {Function} fn Callback function.
         * @param {Mixed} context The context of the function.
         */
        EventDispatcher.prototype.once = function (eventType, fn, context) {
            this.eventEmitter.once(eventType, fn, context);
            return this;
        };
        /**
         * @override
         * Remove event listeners.
         *
         * @param {string} eventType The event we want to remove.
         * @param {Function} fn The listener that we need to find.
         * @param {boolean} once Only remove once listeners.
         */
        EventDispatcher.prototype.off = function (eventType, fn, once) {
            this.eventEmitter.off(eventType, fn, once);
            return this;
        };
        return EventDispatcher;
    })();
    exports.EventDispatcher = EventDispatcher;
});

//# sourceMappingURL=EventDispatcher.js.map
;
/**
 * @file UIComponent基类。
 *
 * @author kuanghongrui@baijiahulian.com
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('com/gsx/components/UIComponent',["require", "exports", 'com/gsx/events/EventDispatcher'], function (require, exports, EventDispatcher_1) {
    //import {ITemplated} from './ITemplated';
    var UIComponent = (function (_super) {
        __extends(UIComponent, _super);
        /**
         * 该组件对应的node节点。
         */
        //    private node:Node;
        function UIComponent(params) {
            _super.call(this);
            this.create(params);
        }
        /**
         * 组件生命周期启始方法。
         * @param {Object} params 创建组件时传入的参数。
         */
        UIComponent.prototype.create = function (params) {
            this.buildRendering();
        };
        /**
         * @override
         */
        UIComponent.prototype.buildRendering = function () {
            var tempElement = document.createElement('div');
            tempElement.innerHTML = this.getTemplateString();
            console.log(tempElement.firstChild);
        };
        /**
         * @override
         */
        UIComponent.prototype.destroy = function () {
        };
        UIComponent.prototype.getTemplateString = function () {
            return '';
        };
        /**
         * @override
         */
        UIComponent.prototype.getParent = function () {
            return null;
        };
        /**
         * 得到该组件的node节点。
         * @return {Node} 得到该组件的node节点。
         */
        //    public getNode(): Node {
        //        return this.node;
        //    }
        /**
         * @override
         */
        UIComponent.prototype.getWidth = function () {
            return 0;
        };
        /**
         * @override
         */
        UIComponent.prototype.getHeight = function () {
            return 0;
        };
        /**
         * @override
         */
        UIComponent.prototype.getX = function () {
            return 0;
        };
        /**
         * @override
         */
        UIComponent.prototype.getY = function () {
            return 0;
        };
        return UIComponent;
    })(EventDispatcher_1.EventDispatcher);
    exports.UIComponent = UIComponent;
});

//# sourceMappingURL=UIComponent.js.map
;
/**
 * @file UIComponent基类。
 *
 * @author kuanghongrui@baijiahulian.com
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('com/gsx/components/form/Button.js',["require", "exports", 'com/gsx/components/UIComponent'], function (require, exports, UIComponent_1) {
    //import {UIComponent} from '../UIComponent';
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.apply(this, arguments);
        }
        /**
         * @override
         */
        Button.prototype.getTemplateString = function () {
            return '<button class="btn"></button>';
        };
        return Button;
    })(UIComponent_1.UIComponent);
    exports.Button = Button;
});

//# sourceMappingURL=Button.js.map
;
