/**
 * @file The abstract validator.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/es6-promise/es6-promise.d.ts" />

import {FormComponent} from 'com/gsx/components/form/FormComponent';
import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import Promise = require('es6-promise');

export abstract class Validator implements IValidator {

    private formComponent: FormComponent;

    /**
     * Validating the spec ui component.
     * @return {boolean}
     */
    abstract validate(): boolean;

    /**
     * Async validating the spec ui component.
     * @return {Promise<boolean>}
     */
    abstract validateAsync(): Promise<boolean>;

    /**
     * Set the spec form component for this validator.
     * @param {FormComponent} formComponent
     */
    public setFormComponent(formComponent: FormComponent): void {
        this.formComponent = formComponent;
    }

    /**
     * Get the spec form component for this validator.
     * @return {FormComponent}
     */
    public getFormComponent(): FormComponent {
        return this.formComponent;
    }
}