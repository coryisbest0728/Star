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
}