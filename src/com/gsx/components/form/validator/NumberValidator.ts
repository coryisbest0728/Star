/**
 * @file This validator validate number rule.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/es6-promise/es6-promise.d.ts" />

import {IValidator} from './IValidator';
import {Promise} from 'es6-promise';

export class NumberValidator implements IValidator {
    /**
     * @override
     */
    public validate(validatedValue: any): boolean {
        return /^\s*[\+\-]?\s*\d+?\.?\d*?\s*$/.test(validatedValue);
    }

    /**
     * @override
     */
    validateAsync(validatedValue: any): Promise<boolean> {
        return Promise.resolve(this.validate(validatedValue));
    }
}
