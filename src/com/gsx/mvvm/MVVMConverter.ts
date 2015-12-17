/**
 * @file The mvvm converter.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {Binding} from './Binding';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
import {StringUtil} from '../utils/StringUtil';
import {UIComponent} from '../components/UIComponent';
import {ViewModel} from './ViewModel';

export class MVVMConverter {

    /**
     * @param {Element} element The target element.
     * @param {UIComponent} component
     * @param {IViewModel} cxt.
     */
    public convert(element: Element, component: UIComponent, cxt: IViewModel): void {
        var textNodes: Text[] = [];
        if (element.nodeType === 1) { // node
            var attrs: NamedNodeMap = element.attributes;
            for (var i: number = 0, j = attrs.length; i < j; ++i) {
                var attr: Attr = attrs.item(i);
                if (/\$\{([\w|\d|\.]*)\}/g.test(attr.value)) {
                    this.bindByexpression(RegExp.$1, attr, component, cxt);
                }
            }
        } else if (element.nodeType === 3) { // text node
            textNodes.push(<Text><Node>element);
        }
        var textNodeMap: Object = this.getTextNodeMap(textNodes);
        for (var exp in textNodeMap) {
            /\$\{([\w|\d|\.]*)\}/g.test(exp);
            var text: Text = textNodeMap[exp];
            text.data = '';
            this.bindByexpression(RegExp.$1, text, component, cxt);
        }
    }

    private getTextNodeMap(textNodes: Text[]): Object {
        var textNodeMap: Object = {};
        textNodes.forEach(function (textNode: Text): void {
            var data: string = textNode.data;
            var matches: RegExpMatchArray = data.match(/\$\{([\w|\d|\.]*)\}/g);
            if (matches && matches.length > 0) {
                matches.forEach(function(match: string): void {
                    var textData: string = textNode.data;
                    textNode = textNode.splitText(textData.indexOf(match));
                    textNodeMap[match] = textNode;
                    textNode = textNode.splitText(match.length);
                });
            }
        }, this);
        return textNodeMap;
    }

    /**
     * @param {string} expression
     * @param {Node} node Attr/Text
     * @param {IViewModel} cxt
     */
    private bindByexpression(expression: string, node: Node, component: UIComponent, cxt: IViewModel): void {
//        console.log(expression, '======>', node);
        if (node instanceof Attr) {
            new Binding().bind(expression, node.name, component, cxt);
        } else if (node instanceof Text) {
//            cxt.watch(expression, function (model: IModel) {
//                node.data = model.newValue;
//            });
        }
    }
}