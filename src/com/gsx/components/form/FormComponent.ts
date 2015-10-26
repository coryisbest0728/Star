/**
 * @file The abstract form component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {SkinableComponent} from 'com/gsx/components/SkinableComponent';

export class FormComponent extends SkinableComponent {

    /**
     * Get the status of disabled.
     * @return {boolean} Whether disabled or not。
     */
    public getDisabled(): boolean {
        return (<Element>this.getNode()).hasAttribute('disabled');
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
}
