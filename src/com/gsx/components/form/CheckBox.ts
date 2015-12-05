/**
 * @file The check box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from './validator/IValidator';
import {LabelledFormComponent} from './LabelledFormComponent';

export class CheckBox extends LabelledFormComponent {

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
     * @override
     */
    public getValidators(): Array<IValidator> {
        return [];
    }
}
