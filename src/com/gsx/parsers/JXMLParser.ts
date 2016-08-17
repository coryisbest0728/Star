/**
 * @file The parser of parsing the jxml to the ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {DFTXMLTraversal} from '../xml/traversal/DFTXMLTraversal';
import {IContainer} from '../components/IContainer';
import {IParserVisitor} from './IParserVisitor';
import {UIComponent} from '../components/UIComponent';
import {StringUtil} from '../utils/StringUtil';
import {XMLParser} from './XMLParser';

export class JXMLParser extends XMLParser {

    /**
     * @override
     */
    public parse(content: string): UIComponent;

    /**
     * @override
     */
    public parse(content: string, visitor: IParserVisitor): UIComponent;

    /**
     * @override
     */
    public parse(content: string, visitor?: any): UIComponent {
        var xmlDoc: XMLDocument = this.parseXML2XMLDocument(content);
        return this.convert2UIComponent(<Element>xmlDoc.firstChild, visitor);
    }

    /**
     * Convert element to the UI Component.
     * @param {Element} rootElement
     * @param {IParserVisitor} visitor
     */
    private convert2UIComponent(rootElement: Element, visitor?: IParserVisitor): UIComponent {
        var rootComponent: UIComponent = null;
        var componentMap: Object = {};
        new DFTXMLTraversal().traverse(rootElement, function (itemElement: Element): void {
            if (itemElement.nodeType === 1) { // node
                var component: UIComponent = this.parseElementNS(itemElement);
                var parentElement: Element = <Element>itemElement.parentElement;
                if (parentElement && componentMap[parentElement.id]) {
                    (<IContainer>componentMap[parentElement.id]).addChild(component);
                } else if (!parentElement) {
                    rootComponent = component;
                }
                componentMap[itemElement.id] = component;
                if (visitor) {
                    visitor.visit(itemElement, component);
                }
            }
        }.bind(this));
        return rootComponent;
    }

    /**
     * Parse the element using its namespace.
     * @param {Element} element
     * @return {UIComponent}
     */
    public parseElementNS(element: Element): UIComponent {
        var simpleClassName: string = this.getSimpleClassName(element);
        var classSet = window['require'](this.getClassPath(element) + simpleClassName);
        var Clazz: any = classSet[simpleClassName];
        // init UIComponent
        var uiComponent: UIComponent = new Clazz();
        var attributes: NamedNodeMap = element.attributes;
        for (var i: number = 0, len: number = attributes.length; i < len; ++i) {
            var attr: Attr = attributes.item(i);
            if (!/^xmlns\:/.test(attr.name)) {
                var setter: Function = <Function>uiComponent['set' + StringUtil.pressStr2UpperCaseInitial(attr.name)];
                var value: any = attr.value;
                if (/^\$\{([\w|\d|\.]*)\}$/.test(value)) {
                    value = '';
                }
                setter && setter.call(uiComponent, value);
            }
        };
        return uiComponent;
    }

    /**
     * Get the class path.
     * The last of the path must be '/'.
     * @param {Element} element
     * @return {string}
     */
    private getClassPath(element: Element): string {
        var ns: string = element.namespaceURI;
        if (ns.lastIndexOf('/') + 1 < ns.length) {
            ns += '/';
        }
        return ns;
    }

    /**
     * Get the simple class name.
     * @param {Element} element
     * @return {string}
     */
    private getSimpleClassName(element: Element): string {
        return element.tagName.replace(new RegExp('^' + element.prefix + '\:'), '');
    }
}
