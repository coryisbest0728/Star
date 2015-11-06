/**
 * @file The abstract form component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {SkinableComponent} from 'com/gsx/components/SkinableComponent';

export class FormComponent extends SkinableComponent {

    /**
     * The name of the form component.
     */
    private name: string = '';

    /**
     * The value of the form component.
     */
    private value: Object;

    constructor() {
        super();
        var node: Node = this.getNode();
        node.addEventListener('change', this.emit.bind(this, 'change'));
    }

    /**
     * Get the status of disabled.
     * @return {boolean} Whether disabled or not。
     */
    public getDisabled(): boolean {
        return (<Element>this.getNode()).hasAttribute('disabled');
    }

    /**
     * Get the name of the form component.
     * @return {string} The name of the form component.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Get the value of the form component.
     * @return {string} The value of the form component.
     */
    public getValue(): Object {
        return this.value;
    }

    /**
     * Set the status of button. Disable or enable.
     * True is disabled.
     * False is enabled.
     * @param {boolean} disabled The status of disabled.
     */
    public setDisabled(disabled: boolean): void {
        if (disabled) {
            (<Element>this.getNode()).setAttribute('disabled', 'disabled');
        } else {
            (<Element>this.getNode()).removeAttribute('disabled');
        }
    }

    /**
     * Set the name of the form component.
     * @param {string} name The name of the form component.
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Set the value of the form component.
     * @param {string} value The value of the form component.
     */
    public setValue(value: Object): void {
        this.value = value;
    }
}
