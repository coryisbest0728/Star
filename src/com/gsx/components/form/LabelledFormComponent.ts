/**
 * @file The labelled component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {FormComponent} from './FormComponent';

export abstract class LabelledFormComponent extends FormComponent {

    private labelTextNode: Text;

    /**
     * Get the label of the component.
     * @return {string} The label of the component.
     */
    public getLabel(): string {
        if (this.labelTextNode) {
            return this.labelTextNode.data;
        }
        return '';
    }

    /**
     * Set the component label.
     * @param {string} label The component label.
     */
    public setLabel(label: string): void {
        if (this.labelTextNode) {
            this.labelTextNode.data = label;
        } else {
            this.labelTextNode = document.createTextNode(label);
            this.getLabelledNode().appendChild(this.labelTextNode);
        }
    }

    /**
     * @abstract
     * Get the node whitch has inner label.
     */
    abstract getLabelledNode(): Node;
}
