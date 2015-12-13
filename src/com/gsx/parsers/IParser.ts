/**
 * @file The interface of the parser
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {UIComponent} from '../components/UIComponent';

export interface IParser {

    /**
     * Parsing the content string to the ui component.
     * @param {string} The content string of parsed.
     * @return {UIComponent}
     */
    parse(content: string): UIComponent;
}