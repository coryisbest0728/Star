/**
 * @file The JXMLParser unit test.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {Button} from 'com/gsx/components/form/Button';
import {JXMLParser} from 'com/gsx/parsers/JXMLParser';
import {UIComponent} from 'com/gsx/components/UIComponent';

describe('The unit test for the JXMLParser', function () {
    beforeEach(function () {
        this.parser = new JXMLParser();
    });

    it('Parsing JXML template to the xml document', function () {
        var template: string = 
            '<f:Button label="test1" spec-skin-class="btn-success" xmlns:f="com/gsx/components/form"></f:Button>';
        var buttonNodeList: NodeList = this.parser.parseXML2XMLDocument(template).getElementsByTagName('Button');
        expect(buttonNodeList.length).toBe(1);
        var buttonElement: Element = <Element>buttonNodeList[0];
        expect(buttonElement.getAttribute('label')).toBe('test1');
        expect(buttonElement.getAttribute('spec-skin-class')).toBe('btn-success');
        expect(buttonElement.namespaceURI).toBe('com/gsx/components/form');
    });

    it('Parsing the jxml template to the elemnt', function () {
        var template: string = 
            '<f:Button label="test1" spec-skin-class="btn-success" xmlns:f="com/gsx/components/form"></f:Button>';
        var buttonNodeList: NodeList = this.parser.parseXML2XMLDocument(template).getElementsByTagName('Button');
        var buttonElement: Element = <Element>buttonNodeList[0];
        var button: Button = <Button>this.parser.parseElementNS(buttonElement);
        expect(button).not.toBeNull('The button has been parsed.');
        expect(button.getLabel()).toBe('test1');
        expect(button.getSpecSkinClass()).toBe('btn-success');
    });

    it('Parsing the simple jxml template to the ui component', function () {
        var template: string = 
            '<f:Button label="test2" spec-skin-class="btn-success" xmlns:f="com/gsx/components/form"></f:Button>';
        var uicomponent: UIComponent = this.parser.parse(template);
        expect(uicomponent).not.toBeNull('The button has been parsed.');
        var button: Button = <Button>uicomponent;
        expect(button.getLabel()).toBe('test2');
        expect(button.getSpecSkinClass()).toBe('btn-success');
    });

    it('Parsing the complicated jxml template to the ui component', function () {
        var template: string = ''
            + '<f:Form xmlns:f="com/gsx/components/form" action="">'
            +     '<f:TextBox placeholder="Input" name="input" />'
            +     '<f:Select name="select">'
            +         '<f:Option value="1">Test1</f:Option>'
            +         '<f:Option value="2">Test2</f:Option>'
            +         '<f:Option value="3">Test3</f:Option>'
            +         '<f:Option value="4">Test4</f:Option>'
            +     '</f:Select>'
            +     '<f:Button label="click me" />'
            +     '<f:Button>Reset</f:Button>'
            + '</f:Form>';
        var uicomponent: UIComponent = this.parser.parse(template);
        expect(uicomponent).not.toBeNull('The form has been parsed.');
        document.body.appendChild(uicomponent.getNode());
    });
});