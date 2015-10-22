/**
 * @file 事件触发源实现。
 *
 * @author kuanghongrui@baijiahulian.com
 */
define('com/gsx/events/EventDispatcher.js',["require", "exports"], function (require, exports) {
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
