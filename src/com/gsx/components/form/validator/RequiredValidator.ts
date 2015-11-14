/**
 * @file This validator validate required rule.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/es6-promise/es6-promise.d.ts" />

import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {Promise} from 'es6-promise';

export class RequiredValidator implements IValidator {
    /**
     * @override
     */
    public validate(validatedValue: any): boolean {
        return !!validatedValue || validatedValue === 0;
    }

    /**
     * @override
     */
    validateAsync(validatedValue: any): Promise<boolean> {
        return Promise.resolve(this.validate(validatedValue));
    }
}