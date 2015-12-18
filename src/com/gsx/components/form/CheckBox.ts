/**
 * @file The check box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from './validator/IValidator';
import {CheckableFormComponent} from './CheckableFormComponent';

export class CheckBox extends CheckableFormComponent {

    /**
     * @override
     */
    public getTemplate(): string {
        return ''
            + '<label class="'+ this.getSkinClass() +'">'
            +     '<input type="checkbox">'
            +     '<span class="c-indicator"></span>'
            + '</label>';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'c-input c-checkbox';
    }

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return (<Element>this.getNode()).querySelector('[type="checkbox"]');
    }

    /**
     * @override
     */
    public getLabelledNode(): Node {
        return this.getNode();
    }

    /**
     * Set the checked status.
     * @param {boolean} value
     */
    public setChecked(checked: boolean): void {
        (<HTMLInputElement>this.getFormControlNode()).checked = checked;
    }

    /**
     * Get the checked.
     * @return {boolean}
     */
    public getChecked(): boolean {
        return (<HTMLInputElement>this.getFormControlNode()).checked;
    }

    /**
     * @override
     */
    public getValidators(): Array<IValidator> {
        return [];
    }
}
