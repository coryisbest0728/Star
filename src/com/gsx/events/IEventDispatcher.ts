/**
 * @file The interface of event dispatcher.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from 'com/gsx/events/EventType';

export interface IEventDispatcher {
    /**
     * Register a new EventListener for the given event.
     *
     * @param {string} eventType Name of the event.
     * @param {Functon} fn Callback function.
     * @param {Mixed} context The context of the function.
     * @api public
     */
    on(eventType: string, fn: Function, context?: any): IEventDispatcher;
    on(eventType: EventType, fn: Function, context?: any): IEventDispatcher;

    /**
     * Return a list of assigned event listeners.
     *
     * @param {string} eventType The events that should be listed.
     * @return {Array}
     */
    listeners(eventType: string): Function[];
    listeners(eventType: EventType): Function[];

    /**
     * Emit an event to all registered event listeners.
     *
     * @param {string} eventType The name of the event.
     * @return {boolean} Indication if we've emitted an event.
     */
    emit(eventType: string, ...args: any[]): boolean;
    emit(eventType: EventType, ...args: any[]): boolean;

    /**
     * Add an EventListener that's only called once.
     *
     * @param {string} eventType Name of the event.
     * @param {Function} fn Callback function.
     * @param {Mixed} context The context of the function.
     */
    once(eventType: string, fn: Function, context?: any): IEventDispatcher;
    once(eventType: EventType, fn: Function, context?: any): IEventDispatcher;

    /**
     * Remove event listeners.
     *
     * @param {string} eventType The event we want to remove.
     * @param {Function} fn The listener that we need to find.
     * @param {boolean} once Only remove once listeners.
     */
    off(eventType: string, fn: Function, once?: boolean): IEventDispatcher;
    off(eventType: EventType, fn: Function, once?: boolean): IEventDispatcher;

    /**
     * Remove all listeners or only the listeners for the specified event.
     *
     * @param {string} event The event want to remove all listeners for.
     */
    removeAllListeners(eventType?: string): IEventDispatcher;
    removeAllListeners(eventType?: EventType): IEventDispatcher;
}
