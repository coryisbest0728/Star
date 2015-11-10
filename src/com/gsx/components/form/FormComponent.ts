/**
 * @file The abstract form component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {SkinableComponent} from 'com/gsx/components/SkinableComponent';

export abstract class FormComponent extends SkinableComponent {

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
     * @abstract
     * Get the node of the form control.
     */
    abstract getFormControlNode(): Node;

    /**
     * Get the status of disabled.
     * @return {boolean} Whether disabled or not。
     */
    public getDisabled(): boolean {
        return (<Element>this.getFormControlNode()).hasAttribute('disabled');
    }

    /**
     * Get the name of the form component.
     * @return {string} The name of the form component.
     */
    public getName(): string {
        return (<Element>this.getFormControlNode()).getAttribute('name');
    }

    /**
     * Get the value of the form component.
     * @return {string} The value of the form component.
     */
    public getValue(): Object {
        return (<Element>this.getFormControlNode()).getAttribute('value');
    }

    /**
     * Set the status of button. Disable or enable.
     * True is disabled.
     * False is enabled.
     * @param {boolean} disabled The status of disabled.
     */
    public setDisabled(disabled: boolean): void {
        if (disabled) {
            (<Element>this.getFormControlNode()).setAttribute('disabled', 'disabled');
        } else {
            (<Element>this.getFormControlNode()).removeAttribute('disabled');
        }
    }

    /**
     * Set the name of the form component.
     * @param {string} name The name of the form component.
     */
    public setName(name: string): void {
        (<Element>this.getFormControlNode()).setAttribute('name', name);
    }

    /**
     * Set the value of the form component.
     * @param {string} value The value of the form component.
     */
    public setValue(value: Object): void {
        (<Element>this.getFormControlNode()).setAttribute('value', value.toString());
    }
}
