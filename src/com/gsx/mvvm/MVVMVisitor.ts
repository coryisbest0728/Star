/**
 * @file The mvvm visitor.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {Binding} from './data/Binding';
import {IParserVisitor} from '../parsers/IParserVisitor';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
import {UIComponent} from '../components/UIComponent';

export class MVVMVisitor implements IParserVisitor {

    /**
     * @override
     * convert ${} into the model
     */
    public visit(element: Element, component: UIComponent/*, vm: IViewModel*/): void {
        var vm: IViewModel = null;
        var textNodes: Text[] = [];
        if (element.nodeType === 1) { // node
            var attrs: NamedNodeMap = element.attributes;
            for (var i: number = 0, j = attrs.length; i < j; ++i) {
                var attr: Attr = attrs.item(i);
                if (/\$\{([\w|\d|\.]*)\}/g.test(attr.value)) {
                    this.bindByexpression(RegExp.$1, attr, component, vm);
                }
                console.debug(attr.name);
            }
        } else if (element.nodeType === 3) { // text node
            textNodes.push(<Text><Node>element);
        }
        var textNodeMap: Object = this.getTextNodeMap(textNodes);
        for (var exp in textNodeMap) {
            /\$\{([\w|\d|\.]*)\}/g.test(exp);
            var text: Text = textNodeMap[exp];
            text.data = '';
            this.bindByexpression(RegExp.$1, text, component, vm);
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
     * @param {UIComponent} component
     * @param {IViewModel} vm
     */
    private bindByexpression(expression: string, node: Node, component: UIComponent, vm: IViewModel): void {
        if (node instanceof Attr) {
            new Binding().bind(expression, node.name, component, vm);
        } else if (node instanceof Text) {
            // TODO
        }
    }
}