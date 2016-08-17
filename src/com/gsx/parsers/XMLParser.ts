/**
 * @file The parser of parsing the jxml to the ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IParser} from './IParser';
import {IParserVisitor} from './IParserVisitor';
import {UIComponent} from '../components/UIComponent';

export abstract class XMLParser implements IParser {

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
     * @abstract
     */
    abstract parse(content: string): UIComponent;

    /**
     * @abstract
     */
    abstract parse(content: string, visitor: IParserVisitor): UIComponent;

    /**
     * Parse xml content to the xml document.
     * @param {string} xml
     * @return {XMLDocument}
     */
    public parseXML2XMLDocument(xml: string): XMLDocument {
        if (this.domParser) {
            this.xmlDoc = this.domParser.parseFromString(xml, "text/xml");
        } else { // Internet Explorer
            this.xmlDoc.loadXML(xml);
        }
        return <XMLDocument>this.xmlDoc;
    }
}
