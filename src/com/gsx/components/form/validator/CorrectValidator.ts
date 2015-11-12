/**
 * @file This validator will be always correct.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidatior} from 'com/gsx/components/form/validator/IValidatior';

export class CorrectValidator implements IValidatior {
    /**
     * @override
     */
    public validate(): boolean {
        return true;
    }
}