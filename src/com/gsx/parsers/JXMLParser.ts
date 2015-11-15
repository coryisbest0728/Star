/**
 * @file The parser of parsing the jxml to the ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IParser} from 'com/gsx/parsers/IParser';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class JXMLParser implements IParser {

    /**
     * XML document
     */
    private xmlDoc: any;

    /**
     * dom parser
     */
    private domParser: DOMParser;

    constructor() {
        if (DOMParser) {
            this.domParser = new DOMParser();
        } else { // Internet Explorer
            this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            this.xmlDoc.async = "false";
        }
    }

    /**
     * @override
     */
    public parse(content: string): UIComponent {
        return null;
    }

    /**
     * Parse jxml content to the xml document.
     * @param {string} jxml
     */
    public parseJXML2XMLDocument(jxml: string): XMLDocument {
        if (this.domParser) {
            this.xmlDoc = this.domParser.parseFromString(jxml, "text/xml");
        } else { // Internet Explorer
            this.xmlDoc.loadXML(jxml);
        }
        return <XMLDocument>this.xmlDoc;
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