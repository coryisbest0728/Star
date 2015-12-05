/**
 * @file The text box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {InputBox} from './InputBox';
import {IValidator} from './validator/IValidator';

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
