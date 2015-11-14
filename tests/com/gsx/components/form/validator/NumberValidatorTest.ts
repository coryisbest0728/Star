/**
 * @file The unit test for the NumberValidator
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/tsd.d.ts" />

import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {Promise} from 'es6-promise';
import {NumberValidator} from 'com/gsx/components/form/validator/NumberValidator';

describe('The unit test for the NumberValidator', function () {
    beforeEach(function () {
        this.validator = new NumberValidator();
    });

    var validatedValue1: string = '123';
    var validatedValue2: number = 8767;
    var validatedValue3: string = '123a789bd345';
    var validatedValue4  = undefined;
    var validatedValue5  = null;
    var validatedValue6  = NaN;

    it('Validation of the number validator', function () {
        var validator: IValidator = this.validator;
        expect(validator.validate(validatedValue1)).toBeTruthy('"' + validatedValue1 + '" is a number.');
        expect(validator.validate(validatedValue2)).toBeTruthy(validatedValue2 + ' is a number.');
        expect(validator.validate(validatedValue3)).not.toBeTruthy(validatedValue3 + ' is not a number.');
        expect(validator.validate(validatedValue4)).not.toBeTruthy(validatedValue4 + ' is not a number.');
        expect(validator.validate(validatedValue5)).not.toBeTruthy(validatedValue5 + ' is not a number.');
        expect(validator.validate(validatedValue6)).not.toBeTruthy(validatedValue6 + ' is not a number.');
    });

    it('Async validation of the number validator', function (done) {
        var validator: IValidator = this.validator;
        Promise.all([
            validator.validateAsync(validatedValue1),
            validator.validateAsync(validatedValue2),
            validator.validateAsync(validatedValue3),
            validator.validateAsync(validatedValue4),
            validator.validateAsync(validatedValue5),
            validator.validateAsync(validatedValue6)
        ]).then(function (isValids) {
            expect(isValids[0]).toBeTruthy('"' + validatedValue1 + '" is a number.');
            expect(isValids[1]).toBeTruthy(validatedValue2 + ' is a number.');
            expect(isValids[2]).not.toBeTruthy(validatedValue3 + ' is not a number.');
            expect(isValids[3]).not.toBeTruthy(validatedValue4 + ' is not a number.');
            expect(isValids[4]).not.toBeTruthy(validatedValue5 + ' is not a number.');
            expect(isValids[5]).not.toBeTruthy(validatedValue6 + ' is not a number.');
            done();
        });
    });
});
