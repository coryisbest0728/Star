/**
 * @file The JXMLParser unit test.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {IViewModel} from 'com/gsx/mvvm/IViewModel';
import {IModel} from 'com/gsx/mvvm/IModel';
import {VueViewModel} from 'com/gsx/mvvm/VueViewModel';

describe('The unit test for the VueViewModel', function () {
//    beforeEach(function () {
//        var virtualElement: HTMLElement = <HTMLElement>document.createElement('div');
//        var virtualFrag: DocumentFragment = document.createDocumentFragment();
//        virtualFrag.appendChild(virtualElement);
//        virtualElement.innerHTML = '<input name="username" value="{{ username }}">';
//        this.element = virtualElement.firstChild;
//        document.body.appendChild(this.element);
//    });

//    it('Test for normal dom', function (done) {
//        var virtualElement: HTMLElement = <HTMLElement>document.createElement('div');
//        var virtualFrag: DocumentFragment = document.createDocumentFragment();
//        virtualFrag.appendChild(virtualElement);
//        virtualElement.innerHTML = '<input name="username" value="{{ username }}">';
//        this.element = virtualElement.firstChild;
//        document.body.appendChild(this.element);
//
//        var self = this;
//        var vmd: IViewModel = new VueViewModel(self.element, null);
//        var value = 'Test';
//        vmd.set('username', value);
//        vmd.watch('username', function (model: IModel): void {
//            console.log(model);
//            console.log(model.name);
//            console.log(model.newValue);
//            console.log(model.oldValue);
//            expect(self.element.getAttribute('value')).toBe(value);
//            self.element.parentNode.removeChild(self.element);
//            vmd.destroy();
//            done();
//        });
////        expect(vmd.get('username')).toBe(value);
//    });
//
//    it('Test obj for dom', function () {
//        var virtualElement: HTMLElement = <HTMLElement>document.createElement('div');
//        var virtualFrag: DocumentFragment = document.createDocumentFragment();
//        virtualFrag.appendChild(virtualElement);
//        virtualElement.innerHTML = '<input name="username" value="{{ user.username }}">';
//        this.element = virtualElement.firstChild;
//        document.body.appendChild(this.element);
//        var self = this;
//
//        var vmd: IViewModel = new VueViewModel(self.element, null);
//        var value = 'Test2';
//        vmd.watch('user', function (model: IModel): void {
//            console.log('user:-->', model);
//        });
//        vmd.watch('user.username', function (model: IModel): void {
//            console.log('user.username:-->', model);
//        });
//        vmd.set('user', {
//            username: value
//        });
//    });

//    afterEach(function () {
//        this.element.parentNode.removeChild(this.element);
//    });
});