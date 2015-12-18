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
import {ParserFactory} from 'com/gsx/parsers/ParserFactory';
import {ViewModel} from 'com/gsx/mvvm/ViewModel';
import {UIComponent} from 'com/gsx/components/UIComponent';

declare var require: (moduleId: string) => string;
describe('The unit test for the Binding', function () {

    it('Test for normal dom', function () {
        var component: UIComponent = ParserFactory.createParser().parse(require('text!./Binding.jxml'));
        component['username'] = 'Cory';
        document.body.appendChild(component.getNode());
    });

    afterEach(function () {
//        this.element.parentNode.removeChild(this.element);
    });
});