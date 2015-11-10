/**
 * @file The labelled component in the form.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {FormComponent} from 'com/gsx/components/form/FormComponent';

export abstract class LabelledFormComponent extends FormComponent {

    private labelTextNode: Text;

    /**
     * Get the label of the radio.
     * @return {string} The label of the radio.
     */
    public getLabel(): string {
        if (this.labelTextNode) {
            return this.labelTextNode.data;
        }
        return '';
    }

    /**
     * Set the radio label.
     * @param {string} label The radio label.
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