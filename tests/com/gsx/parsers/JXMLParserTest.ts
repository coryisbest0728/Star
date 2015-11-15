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
        var template = 
            '<f:Button label="test1" spec-skin-class="btn-success" xmlns:f="com/gsx/components/form"></f:Button>';
        var buttonNodeList: NodeList = this.parser.parseJXML2XMLDocument(template).getElementsByTagName('Button');
        expect(buttonNodeList.length).toBe(1);
        var buttonElement: Element = <Element>buttonNodeList[0];
        expect(buttonElement.getAttribute('label')).toBe('test1');
        expect(buttonElement.getAttribute('spec-skin-class')).toBe('btn-success');
        expect(buttonElement.namespaceURI).toBe('com/gsx/components/form');
    });

    it('Parsing the jxml element to the ui component', function () {
        var template = 
            '<f:Button label="test1" spec-skin-class="btn-success" xmlns:f="com/gsx/components/form"></f:Button>';
        var buttonNodeList: NodeList = this.parser.parseJXML2XMLDocument(template).getElementsByTagName('Button');
        var buttonElement: Element = <Element>buttonNodeList[0];
        var button: Button = <Button>this.parser.parseElementNS(buttonElement);
        expect(button).not.toBeNull('The button has been parsed.');
        expect(button.getLabel()).toBe('test1');
        expect(button.getSpecSkinClass()).toBe('btn-success');
    });
});