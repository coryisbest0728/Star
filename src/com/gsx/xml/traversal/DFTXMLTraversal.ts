/**
 * @file The xml traversal of DFT
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IXMLTraversal} from 'com/gsx/xml/traversal/IXMLTraversal';

export class DFTXMLTraversal implements IXMLTraversal {

    /**
     * @override
     */
    traverse(traversedElement: Element, iteratorfn?: (itemElement: Element) => void): void {
        var currentElement: Element = traversedElement;
        var stack: Element[] = [];
        var hasPoped: boolean = false;
        while (currentElement) {
            if (!hasPoped && currentElement && currentElement.nodeType === 1 && iteratorfn) {
                iteratorfn(currentElement);
            }
            if (!hasPoped && currentElement.nodeType === 1 && currentElement.childNodes.length) {
                stack.push(currentElement);
                currentElement = <Element>currentElement.firstChild;
                hasPoped = false;
            } else { // the leaf node
                if (currentElement.nextSibling) {
                    currentElement = <Element>currentElement.nextSibling;
                    hasPoped = false;
                } else {
                    if (stack.length) {
                        currentElement = stack.pop();
                        hasPoped = true;
                    } else {
                        currentElement = null;
                        hasPoped = false;
                    }
                }
            }
        }
    }
}