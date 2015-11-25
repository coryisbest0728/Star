/**
 * @file The JXMLParser unit test.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {DFTXMLTraversal} from 'com/gsx/xml/traversal/DFTXMLTraversal';
import {IXMLTraversal} from 'com/gsx/xml/traversal/IXMLTraversal';

describe('The unit test for the XML Traversal', function () {
    beforeEach(function () {
        this.traversal = new DFTXMLTraversal();
    });

    it('Traverse the xml', function () {
        var xml: string = ''
            + '<books>'
            +     '<book1></book1>'
            +     '<book2>'
            +         '<op></op>'
            +         '<op2></op2>'
            +     '</book2>'
            +     '<book3></book3>'
            +     '<book4>'
            +         '<p>'
            +             '<hehe></hehe>'
            +         '</p>'
            +     '</book4>'
            + '</books>';
        this.traversal.traverse(<Element>new DOMParser().parseFromString(xml, 'text/xml').firstChild,
            function (ele: Element, parentElement: Element): void {
                 
            }
         );
    });
});