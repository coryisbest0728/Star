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

    var validatedValue1: number = 0;
    var validatedValue2: number = 8767;
    var validatedValue3: number = 8767.34;
    var validatedValue4: number = 8767.3400;
    var validatedValue5: number = -8767.3400;
    var validatedValue6: string = '123';
    var validatedValue7: string = '123.';
    var validatedValue8: string = '123.45';
    var validatedValue9: string = '123.045000';
    var validatedValue10: string = '  5467  ';
    var validatedValue11: string = '  sad  ';
    var validatedValue12: string = '123a789bd345';
    var validatedValue13: string = '1256.er345e';
    var validatedValue14: string = '    ';
    var validatedValue15: string = '';
    var validatedValue16 = undefined;
    var validatedValue17 = null;
    var validatedValue18 = NaN;

    it('Validation of the number validator', function () {
        var validator: IValidator = this.validator;
        expect(validator.validate(validatedValue1)).toBeTruthy(validatedValue1 + ' is a number.');
        expect(validator.validate(validatedValue2)).toBeTruthy(validatedValue2 + ' is a number.');
        expect(validator.validate(validatedValue3)).toBeTruthy(validatedValue3 + ' is a number.');
        expect(validator.validate(validatedValue4)).toBeTruthy(validatedValue4 + ' is a number.');
        expect(validator.validate(validatedValue5)).toBeTruthy(validatedValue5 + ' is a number.');
        expect(validator.validate(validatedValue6)).toBeTruthy('"' + validatedValue6 + '" is a number.');
        expect(validator.validate(validatedValue7)).toBeTruthy('"' + validatedValue7 + '" is a number.');
        expect(validator.validate(validatedValue8)).toBeTruthy('"' + validatedValue8 + '" is a number.');
        expect(validator.validate(validatedValue9)).toBeTruthy('"' + validatedValue9 + '" is a number.');
        expect(validator.validate(validatedValue10)).toBeTruthy('"' + validatedValue10 + '" is a number.');
        expect(validator.validate(validatedValue11)).not.toBeTruthy('"' + validatedValue11 + '" is not a number.');
        expect(validator.validate(validatedValue12)).not.toBeTruthy('"' + validatedValue12 + '" is not a number.');
        expect(validator.validate(validatedValue13)).not.toBeTruthy('"' + validatedValue13 + '" is not a number.');
        expect(validator.validate(validatedValue14)).not.toBeTruthy('"' + validatedValue14 + '" is not a number.');
        expect(validator.validate(validatedValue15)).not.toBeTruthy('"' + validatedValue15 + '" is not a number.');
        expect(validator.validate(validatedValue16)).not.toBeTruthy(validatedValue16 + ' is not a number.');
        expect(validator.validate(validatedValue17)).not.toBeTruthy(validatedValue17 + ' is not a number.');
        expect(validator.validate(validatedValue18)).not.toBeTruthy(validatedValue18 + ' is not a number.');
    });

    it('Async validation of the number validator', function (done) {
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
            validator.validateAsync(validatedValue11),
            validator.validateAsync(validatedValue12),
            validator.validateAsync(validatedValue13),
            validator.validateAsync(validatedValue14),
            validator.validateAsync(validatedValue15),
            validator.validateAsync(validatedValue16),
            validator.validateAsync(validatedValue17),
            validator.validateAsync(validatedValue17)
        ]).then(function (isValids) {
            expect(isValids[0]).toBeTruthy(validatedValue1 + ' is a number.');
            expect(isValids[1]).toBeTruthy(validatedValue2 + ' is a number.');
            expect(isValids[2]).toBeTruthy(validatedValue3 + ' is a number.');
            expect(isValids[3]).toBeTruthy(validatedValue4 + ' is a number.');
            expect(isValids[4]).toBeTruthy(validatedValue5 + ' is a number.');
            expect(isValids[5]).toBeTruthy('"' + validatedValue6 + '" is a number.');
            expect(isValids[6]).toBeTruthy('"' + validatedValue7 + '" is a number.');
            expect(isValids[7]).toBeTruthy('"' + validatedValue8 + '" is a number.');
            expect(isValids[8]).toBeTruthy('"' + validatedValue9 + '" is a number.');
            expect(isValids[9]).toBeTruthy('"' + validatedValue10 + '" is a number.');
            expect(isValids[10]).not.toBeTruthy('"' + validatedValue11 + '" is not a number.');
            expect(isValids[11]).not.toBeTruthy('"' + validatedValue12 + '" is not a number.');
            expect(isValids[12]).not.toBeTruthy('"' + validatedValue13 + '" is not a number.');
            expect(isValids[13]).not.toBeTruthy('"' + validatedValue14 + '" is not a number.');
            expect(isValids[14]).not.toBeTruthy('"' + validatedValue15 + '" is not a number.');
            expect(isValids[15]).not.toBeTruthy(validatedValue16 + ' is not a number.');
            expect(isValids[16]).not.toBeTruthy(validatedValue17 + ' is not a number.');
            expect(isValids[17]).not.toBeTruthy(validatedValue18 + ' is not a number.');
            done();
        });
    });
});
