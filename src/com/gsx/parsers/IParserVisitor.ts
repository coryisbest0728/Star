/**
 * @file The visitor of the parser.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {UIComponent} from '../components/UIComponent';

export interface IParserVisitor {

    /**
     * To visit the parsing.
     * @param {Element} element
     * @param {UIComponent} component
     */
    visit(element: Element, component: UIComponent): void;
}