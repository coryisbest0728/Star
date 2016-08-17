/**
 * @file The JXMLParser unit test.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />
/// <amd-dependency path="text!./Binding.jxml" />

import {Binding} from 'com/gsx/mvvm/data/Binding';
import {EventDispatcher} from 'com/gsx/events/EventDispatcher';
import {IViewModel} from 'com/gsx/mvvm/IViewModel';
import {IModel} from 'com/gsx/mvvm/IModel';
import {MVVMVisitor} from 'com/gsx/mvvm/MVVMVisitor';
import {ParserFactory} from 'com/gsx/parsers/ParserFactory';
import {ViewModel} from 'com/gsx/mvvm/ViewModel';
import {UIComponent} from 'com/gsx/components/UIComponent';

import {FormViewModel} from 'com/gsx/mvvm/FormViewModel';

declare var require: (moduleId: string) => string;
describe('The unit test for the Binding', function () {

    it('Test for normal dom', function (done) {
//        console.log(FormViewModel);
        var component: UIComponent = ParserFactory.createParser().parse(
            require('text!./Binding.jxml'), new MVVMVisitor());
        (<any>component).username = 'Cory';
//        (<any>component).user = {
//            nickname: 'Coryisbest'
//        };
//        (<any>component).user.nickname = 'Coryisbest';
//        console.log(component);
//        console.log((<any>component).user);
        document.body.appendChild(component.getNode());
        setInterval(function () {
            console.log((<any>component).user);
        }, 500);
        done();
    });

    afterEach(function () {
//        this.element.parentNode.removeChild(this.element);
    });
});