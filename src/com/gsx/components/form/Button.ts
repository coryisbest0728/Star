/**
 * @file The button component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {FormComponent} from 'com/gsx/components/form/FormComponent';

export class Button extends FormComponent {

    /**
     * The params of inital.
     */
    private params: {label?: string; disabled?: boolean; specSkinClass?: string;};

    constructor(params?: {label?: string; disabled?: boolean; specSkinClass?: string;}) {
        this.params = params || {};
        super();
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<button class="' + this.getSkinClass() + '" type="button"></button>';
    }

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return this.getNode();
    }

    /**
     * @override
     */
    public buildRendering(): void {
        super.buildRendering();
        this.setLabel(this.params.label);
        this.setDisabled(this.params.disabled);
    }

    /**
     * Get the label of the button.
     * @return {string} The label of the button.
     */
    public getLabel(): string {
        return (<HTMLElement>this.getFormControlNode()).innerHTML;
    }

    /**
     * @override
     */
    protected getOriginSpecSkinClass(): string {
        return this.params.specSkinClass || 'btn-primary';
    }

    /**
     * Set the button label to display.
     * @param {string} label The button label.
     */
    public setLabel(label: string): void {
        (<HTMLElement>this.getFormControlNode()).innerHTML = label;
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'btn';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}
