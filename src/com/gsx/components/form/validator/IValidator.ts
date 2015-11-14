/**
 * @file The interface of validator
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/es6-promise/es6-promise.d.ts" />

import {Promise} from 'es6-promise';

export interface IValidator {

    /**
     * Validating the spec ui component.
     * @param {any} validatedValue
     * @return {boolean}
     */
    validate(validatedValue: any): boolean;

    /**
     * Async validating the spec ui component.
     * @param {any} validatedValue
     * @return {Promise<boolean>}
     */
    validateAsync(validatedValue: any): Promise<boolean>;
}