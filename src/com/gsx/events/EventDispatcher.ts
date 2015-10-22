/**
 * @file 事件触发源实现。
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/eventemitter3/eventemitter3.d.ts" />

import {IEventDispatcher} from 'com/gsx/events/IEventDispatcher';
import EventEmitter = require('eventemitter3');

export class EventDispatcher implements IEventDispatcher {

    private eventEmitter;

    public constructor() {
        this.eventEmitter = new EventEmitter();
    }

    /**
     * @override
     * Register a new EventListener for the given event.
     *
     * @param {string} eventType Name of the event.
     * @param {Functon} fn Callback function.
     * @param {Mixed} context The context of the function.
     */
    public on(eventType: string, fn: Function, context?: any): IEventDispatcher {
        this.eventEmitter.on(eventType, fn, context);
        return this;
    }

    /**
     * @override
     * Return a list of assigned event listeners.
     *
     * @param {string} eventType The events that should be listed.
     * @return {Array}
     */
    public listeners(eventType: string): Function[] {
        return this.eventEmitter.listeners(eventType);
    }

    /**
     * @override
     * Emit an event to all registered event listeners.
     *
     * @param {string} eventType The name of the event.
     * @return {boolean} Indication if we've emitted an event.
     */
    public emit(eventType: string, ...args: any[]): boolean {
        return this.eventEmitter(eventType, ...args);
    }

    /**
     * @override
     * Add an EventListener that's only called once.
     *
     * @param {string} eventType Name of the event.
     * @param {Function} fn Callback function.
     * @param {Mixed} context The context of the function.
     */
    public once(eventType: string, fn: Function, context?: any): IEventDispatcher {
        this.eventEmitter.once(eventType, fn, context);
        return this;
    }

    /**
     * @override
     * Remove event listeners.
     *
     * @param {string} eventType The event we want to remove.
     * @param {Function} fn The listener that we need to find.
     * @param {boolean} once Only remove once listeners.
     */
    public off(eventType: string, fn: Function, once?: boolean): IEventDispatcher {
        this.eventEmitter.off(eventType, fn, once);
        return this;
    }
}
