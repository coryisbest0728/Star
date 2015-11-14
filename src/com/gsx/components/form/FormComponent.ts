/**
 * @file The abstract form component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from 'com/gsx/events/EventType';
import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {SkinableComponent} from 'com/gsx/components/SkinableComponent';

export abstract class FormComponent extends SkinableComponent {

    /**
     * The name of the form component.
     */
    private name: string = '';

    /**
     * @override
     */
    protected listenerEvents() {
        super.listenerEvents();
        var node: Node = this.getFormControlNode();
        node.addEventListener('change', this.emit.bind(this, EventType.CHANGE));
        node.addEventListener('focus', this.emit.bind(this, EventType.FOCUS));
        node.addEventListener('blur', this.emit.bind(this, EventType.BLUR));
    }

    /**
     * @abstract
     * Get the node of the form control.
     */
    abstract getFormControlNode(): Node;

    /**
     * Get the set validators of this form component.
     * @return {Array<IValidator>}
     */
    abstract getValidators(): Array<IValidator>;

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
    public getValue(): any {
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
    public setValue(value: any): void {
        (<Element>this.getFormControlNode()).setAttribute('value', value);
    }
}
