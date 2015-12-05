/**
 * @file The xml traversal of BFT
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IXMLTraversal} from './IXMLTraversal';

export class BFTXMLTraversal implements IXMLTraversal {

    /**
     * @override
     */
    traverse(traversedElement: Element, iteratorfn: (itemElement: Element) => void): void {
        // TODO: BFS traversal.
        iteratorfn(traversedElement);
    }
}
