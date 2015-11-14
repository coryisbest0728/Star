/**
 * @file The unit test for the RequiredValidator
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/tsd.d.ts" />

import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {Promise} from 'es6-promise';
import {RequiredValidator} from 'com/gsx/components/form/validator/RequiredValidator';

describe('The unit test for the RequiredValidator', function () {
    beforeEach(function () {
        this.validator = new RequiredValidator();
    });

    var validatedValue1: number = 0;
    var validatedValue2: number = 8767;
    var validatedValue3: string = '123';
    var validatedValue4: string = '  5467  ';
    var validatedValue5: string = '  sad  ';
    var validatedValue6: string = '123a789bd345';
    var validatedValue7: string = '    ';
    var validatedValue8: string = '';
    var validatedValue9  = undefined;
    var validatedValue10  = null;
    var validatedValue11  = NaN;

    it('Validation of the required validator', function () {
        var validator: IValidator = this.validator;
        expect(validator.validate(validatedValue1)).toBeTruthy(validatedValue1 + ' is a value.');
        expect(validator.validate(validatedValue2)).toBeTruthy(validatedValue2 + ' is a value.');
        expect(validator.validate(validatedValue3)).toBeTruthy('"' + validatedValue3 + '" is a value.');
        expect(validator.validate(validatedValue4)).toBeTruthy('"' + validatedValue4 + '" is a value.');
        expect(validator.validate(validatedValue5)).toBeTruthy('"' + validatedValue5 + '" is a value.');
        expect(validator.validate(validatedValue6)).toBeTruthy('"' + validatedValue6 + '" is a value.');
        expect(validator.validate(validatedValue7)).toBeTruthy('"' + validatedValue7 + '" is a value.');
        expect(validator.validate(validatedValue8)).not.toBeTruthy('"' + validatedValue8 + '" is not a value.');
        expect(validator.validate(validatedValue9)).not.toBeTruthy(validatedValue9 + ' is not a value.');
        expect(validator.validate(validatedValue10)).not.toBeTruthy(validatedValue10 + ' is not a value.');
        expect(validator.validate(validatedValue11)).not.toBeTruthy(validatedValue11 + ' is not a value.');
    });

    it('Async validation of the required validator', function (done) {
        var validator: IValidator = this.validator;
        Promise.all([
            validator.validateAsync(validatedValue1),
            validator.validateAsync(validatedValue2),
            validator.validateAsync(validatedValue3),
            validator.validateAsync(validatedValue4),
            validator.validateAsync(validatedValue5),
            validator.validateAsync(validatedValue6),
            validator.validateAsync(validatedValue7),
            validator.validateAsync(validatedValue8),
            validator.validateAsync(validatedValue9),
            validator.validateAsync(validatedValue10),
            validator.validateAsync(validatedValue11)
        ]).then(function (isValids) {
            expect(isValids[0]).toBeTruthy(validatedValue1 + ' is a value.');
            expect(isValids[1]).toBeTruthy(validatedValue2 + ' is a value.');
            expect(isValids[2]).toBeTruthy('"' + validatedValue3 + '" is a value.');
            expect(isValids[3]).toBeTruthy('"' + validatedValue4 + '" is a value.');
            expect(isValids[4]).toBeTruthy('"' + validatedValue5 + '" is a value.');
            expect(isValids[5]).toBeTruthy('"' + validatedValue6 + '" is a value.');
            expect(isValids[6]).toBeTruthy('"' + validatedValue7 + '" is a value.');
            expect(isValids[7]).not.toBeTruthy('"' + validatedValue8 + '" is not a value.');
            expect(isValids[8]).not.toBeTruthy(validatedValue9 + ' is not a value.');
            expect(isValids[9]).not.toBeTruthy(validatedValue10 + ' is not a value.');
            expect(isValids[10]).not.toBeTruthy(validatedValue11 + ' is not a value.');
            done();
        });
    });
});
