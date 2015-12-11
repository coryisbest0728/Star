/**
 * @file The password box component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {InputBox} from './InputBox';
import {IValidator} from './validator/IValidator';

export class PasswordBox extends InputBox {

    /**
     * @override
     */
    public getType(): string {
        return 'password';
    }

    /**
     * @override
     */
    public getValidators(): Array<IValidator> {
        return [];
    }

}
