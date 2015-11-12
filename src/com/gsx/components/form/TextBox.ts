/**
 * @file The text box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {CorrectValidator} from 'com/gsx/components/form/validator/CorrectValidator';
import {InputBox} from 'com/gsx/components/form/InputBox';
import {IValidatior} from 'com/gsx/components/form/validator/IValidatior';

export class TextBox extends InputBox {

    /**
     * @override
     */
    public getType(): string {
        return 'text';
    }

    /**
     * @override
     */
    public getValidators(): Array<IValidatior> {
        return [new CorrectValidator()];
    }

}
