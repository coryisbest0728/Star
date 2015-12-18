/**
 * @file The radio component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from './validator/IValidator';
import {CheckableFormComponent} from './CheckableFormComponent';

export class Radio extends CheckableFormComponent {

    /**
     * @override
     */
    public getTemplate(): string {
        return ''
            + '<label class="'+ this.getSkinClass() +'">'
            +     '<input type="radio">'
            +     '<span class="c-indicator"></span>'
            + '</label>';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'c-input c-radio';
    }

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return (<Element>this.getNode()).querySelector('[type="radio"]');
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
