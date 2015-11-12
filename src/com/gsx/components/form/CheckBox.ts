/**
 * @file The check box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {CorrectValidator} from 'com/gsx/components/form/validator/CorrectValidator';
import {IValidatior} from 'com/gsx/components/form/validator/IValidatior';
import {LabelledFormComponent} from 'com/gsx/components/form/LabelledFormComponent';

export class CheckBox extends LabelledFormComponent {

    /**
     * @override
     */
    public getTemplateString(): string {
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
    public getValidators(): Array<IValidatior> {
        return [new CorrectValidator()];
    }
}