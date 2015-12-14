/**
 * @file The JXMLParser unit test.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {IViewModel} from 'com/gsx/mvvm/IViewModel';
import {IModel} from 'com/gsx/mvvm/IModel';
import {ViewModelDecorator} from 'com/gsx/mvvm/ViewModelDecorator';

describe('The unit test for the ViewModelDecorator', function () {
    beforeEach(function () {
        var virtualElement: HTMLElement = <HTMLElement>document.createElement('div');
        var virtualFrag: DocumentFragment = document.createDocumentFragment();
        virtualFrag.appendChild(virtualElement);
        virtualElement.innerHTML = '<input name="username" value="{{ username }}">';
        this.element = virtualElement.firstChild;
        document.body.appendChild(this.element);
    });

    it('Init', function (done) {
        var self = this;
        var vmd: IViewModel = new ViewModelDecorator(self.element, null);
        var value = 'Test';
        vmd.set('username', value);
//        vmd.set('username', 'qazwsx');
        vmd.watch('username', function (model: IModel): void {
            console.log(model);
            console.log(model.name);
            console.log(model.newValue);
            console.log(model.oldValue);
            expect(self.element.getAttribute('value')).toBe(value);
            done();
        });
        vmd.get('username')
//        expect(vmd.get('username')).toBe(value);
    });

    afterEach(function () {
//        this.element.parentNode.removeChild(this.element);
    });
});