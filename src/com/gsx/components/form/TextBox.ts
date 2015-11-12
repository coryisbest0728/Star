/**
 * @file The text box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {InputBox} from 'com/gsx/components/form/InputBox';
import {IValidatior} from 'com/gsx/components/form/validator/IValidatior';
import {CorrectValidator} from 'com/gsx/components/form/validator/CorrectValidator';

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
    public getValidator(): IValidatior {
        return new CorrectValidator();
    }

}
