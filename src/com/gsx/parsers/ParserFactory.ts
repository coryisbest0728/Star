/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IParser} from './IParser';
import {JXMLParser} from './JXMLParser';
import {UIComponent} from '../components/UIComponent';

export abstract class ParserFactory {

    /**
     * create the parser
     * @return {IParser}
     */
    static createParser(): IParser {
        return new JXMLParser();
    }

    /**
     * Parse the template string
     * @param {string} templateStr
     * @return {UIComponent}
     */
    static parse(templateStr: string): UIComponent {
        return ParserFactory.createParser().parse(templateStr);
    }
}