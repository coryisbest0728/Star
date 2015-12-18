/**
 * @file The check box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {LabelledFormComponent} from './LabelledFormComponent';

export abstract class CheckableFormComponent extends LabelledFormComponent {

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
}
