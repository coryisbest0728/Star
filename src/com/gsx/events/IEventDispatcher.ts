/**
 * @file The interface of event dispatcher.
 *
 * @author kuanghongrui@baijiahulian.com
 */

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

    /**
     * Return a list of assigned event listeners.
     *
     * @param {string} eventType The events that should be listed.
     * @return {Array}
     * @api public
     */
    listeners(eventType: string): Function[];

    /**
     * Emit an event to all registered event listeners.
     *
     * @param {string} eventType The name of the event.
     * @return {boolean} Indication if we've emitted an event.
     * @api public
     */
    emit(eventType: string, ...args: any[]): boolean;

    /**
     * Add an EventListener that's only called once.
     *
     * @param {string} eventType Name of the event.
     * @param {Function} fn Callback function.
     * @param {Mixed} context The context of the function.
     * @api public
     */
    once(eventType: string, fn: Function, context?: any): IEventDispatcher;

    /**
     * Remove event listeners.
     *
     * @param {string} eventType The event we want to remove.
     * @param {Function} fn The listener that we need to find.
     * @param {boolean} once Only remove once listeners.
     * @api public
     */
    off(eventType: string, fn: Function, once?: boolean): IEventDispatcher;
}
