/**
 * @file The parser of parsing the jxml to the ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {XMLParser} from 'com/gsx/parsers/XMLParser';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class JXMLParser extends XMLParser {

    /**
     * @override
     */
    public parse(content: string): UIComponent {
        return null;
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
        if (/^\[object UIComponent\-/.test(Clazz.prototype.toString())) { // UIComponent
            var uiComponent: UIComponent = new Clazz();
            var attributes: NamedNodeMap = element.attributes;
            for (var i: number = 0, len: number = attributes.length; i < len; ++i) {
                var attr: Attr = attributes.item(i);
                if (!/^xmlns\:/.test(attr.name)) {
                    uiComponent['set' + this.formatAttrName(attr.name)](attr.value);
                }
            };
            return uiComponent;
        }
        return null;
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