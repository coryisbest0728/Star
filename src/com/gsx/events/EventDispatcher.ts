/**
 * @file The implement of IEventDispatcher.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/eventemitter3/eventemitter3.d.ts" />

import {IEventDispatcher} from 'com/gsx/events/IEventDispatcher';
import {EventType} from 'com/gsx/events/EventType';
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
    public on(eventType: string, fn: Function, context?: any): IEventDispatcher;
    public on(eventType: EventType, fn: Function, context?: any): IEventDispatcher;
    public on(eventType: any, fn: Function, context?: any): IEventDispatcher {
        this.eventEmitter.on(eventType + '', fn, context || this);
        return this;
    }

    /**
     * @override
     * Return a list of assigned event listeners.
     *
     * @param {string} eventType The events that should be listed.
     * @return {Array}
     */
    public listeners(eventType: string): Function[];
    public listeners(eventType: EventType): Function[];
    public listeners(eventType: any): Function[] {
        return this.eventEmitter.listeners(eventType + '');
    }

    /**
     * @override
     * Emit an event to all registered event listeners.
     *
     * @param {string} eventType The name of the event.
     * @return {boolean} Indication if we've emitted an event.
     */
    public emit(eventType: string, ...args: any[]): boolean;
    public emit(eventType: EventType, ...args: any[]): boolean;
    public emit(eventType: any, ...args: any[]): boolean {
        return this.eventEmitter.emit(eventType + '', ...args);
    }

    /**
     * @override
     * Add an EventListener that's only called once.
     *
     * @param {string} eventType Name of the event.
     * @param {Function} fn Callback function.
     * @param {Mixed} context The context of the function.
     */
    public once(eventType: string, fn: Function, context?: any): IEventDispatcher;
    public once(eventType: EventType, fn: Function, context?: any): IEventDispatcher;
    public once(eventType: any, fn: Function, context?: any): IEventDispatcher {
        this.eventEmitter.once(eventType + '', fn, context || this);
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
    public off(eventType: string, fn: Function, once?: boolean): IEventDispatcher;
    public off(eventType: EventType, fn: Function, once?: boolean): IEventDispatcher;
    public off(eventType: any, fn: Function, once?: boolean): IEventDispatcher {
        this.eventEmitter.off(eventType + '', fn, once);
        return this;
    }

    /**
     * Remove all listeners or only the listeners for the specified event.
     *
     * @param {string} event The event want to remove all listeners for.
     */
    public removeAllListeners(eventType?: string): IEventDispatcher;
    public removeAllListeners(eventType?: EventType): IEventDispatcher;
    public removeAllListeners(eventType?: any): IEventDispatcher {
        this.eventEmitter.removeAllListeners(eventType);
        return this;
    }
}
