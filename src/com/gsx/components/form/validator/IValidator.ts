/**
 * @file The interface of validator
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/es6-promise/es6-promise.d.ts" />

import {FormComponent} from 'com/gsx/components/form/FormComponent';
import {Promise} from 'es6-promise';

export interface IValidator {

    /**
     * Validating the spec ui component.
     * @return {boolean}
     */
    validate(): boolean;

    /**
     * Async validating the spec ui component.
     * @return {Promise<boolean>}
     */
    validateAsync(): Promise<boolean>;

    /**
     * Get the form component of validation
     * @return {FormComponent}
     */
    getFormComponent(): FormComponent;
}