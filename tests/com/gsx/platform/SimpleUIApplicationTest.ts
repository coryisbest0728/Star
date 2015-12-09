/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {SimpleUIApplication} from 'com/gsx/platform/SimpleUIApplication';

describe('The unit test for the ui application', function () {

    beforeEach(function () {
        this.application = new SimpleUIApplication({});
    });

    it('Creation of the the ui application', function () {
        expect(this.application.getNode() instanceof Node).toBeTruthy('The dom node of this ui application has been created');
        expect(document.body.contains(this.application.getNode()))
            .toBeTruthy('The ui application has been excisted in the document');
        expect(this.application.getParent())
            .toBeNull('This ui application has not any parent component.');
    });
});