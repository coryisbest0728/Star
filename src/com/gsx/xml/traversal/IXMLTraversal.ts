/**
 * @file The interface of xml traversal
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface IXMLTraversal {

    /**
     * Traverse xml.
     * @param {Element} traversedElement
     * @param {Function} iteratorfn(itemElement: Element)
     */
    traverse(traversedElement: Element, iteratorfn: (itemElement: Element) => void): void;
}