/**
 * @file The parser of parsing the jxml to the ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {DFTXMLTraversal} from 'com/gsx/xml/traversal/DFTXMLTraversal';
import {IContainer} from 'com/gsx/components/IContainer';
import {UIComponent} from 'com/gsx/components/UIComponent';
import {XMLParser} from 'com/gsx/parsers/XMLParser';

export class JXMLParser extends XMLParser {

    /**
     * @override
     */
    public parse(content: string): UIComponent {
        var xmlDoc: XMLDocument = this.parseXML2XMLDocument(content);
        return this.convert2UIComponent(<Element>xmlDoc.firstChild);
    }

    /**
     * Convert element to the UI Component.
     * @param {Element} rootElement
     */
    private convert2UIComponent(rootElement: Element): UIComponent {
        var rootComponent: UIComponent = null;
        var componentMap: Object = {};
        new DFTXMLTraversal().traverse(rootElement, function (itemElement: Element): void {
            var component: UIComponent = this.parseElementNS(itemElement);
            var parentElement: Element = <Element>itemElement.parentElement;
            if (parentElement && componentMap[parentElement.id]) {
                (<IContainer>componentMap[parentElement.id]).addChild(component);
            } else if (!parentElement) {
                rootComponent = component;
            }
            componentMap[itemElement.id] = component;
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
        // instance UIComponent
        var uiComponent: UIComponent = new Clazz();
        var attributes: NamedNodeMap = element.attributes;
        for (var i: number = 0, len: number = attributes.length; i < len; ++i) {
            var attr: Attr = attributes.item(i);
            if (!/^xmlns\:/.test(attr.name)) {
                var setter: Function = <Function>uiComponent['set' + this.formatAttrName(attr.name)];
                setter && setter.call(uiComponent, attr.value);
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

    /**
     * Format the attr name.Split - and put the initial char to upper case.
     * @param {string} attrName
     */
    private formatAttrName(attrName: string): string {
        return attrName.split('-').map(function (nameFrag: string): string {
            return nameFrag.replace(/^\w/, function(v: string): string {
                return v.toUpperCase();
            });
        }).join('');
    }
}