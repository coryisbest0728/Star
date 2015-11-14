/**
 * @file The text box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {InputBox} from 'com/gsx/components/form/InputBox';
import {IValidator} from 'com/gsx/components/form/validator/IValidator';

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
    public getValidators(): Array<IValidator> {
        return [];
    }

}
