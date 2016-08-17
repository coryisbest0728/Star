/**
 * @file The interface of the parser
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IParserVisitor} from './IParserVisitor';
import {UIComponent} from '../components/UIComponent';

export interface IParser {

    /**
     * Parsing the content string to the ui component.
     * @param {string} The content string of parsed.
     * @return {UIComponent}
     */
    parse(content: string): UIComponent;

    /**
     * Parsing the content string to the ui component.
     * @param {string} The content string of parsed.
     * @param {IParserVisitor} The parser visitor.
     * @return {UIComponent}
     */
    parse(content: string, visitor: IParserVisitor): UIComponent;
}