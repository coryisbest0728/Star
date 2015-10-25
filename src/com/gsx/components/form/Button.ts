/**
 * @file The button component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ISkinable} from 'com/gsx/components/ISkinable';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class Button extends UIComponent implements ISkinable {

    /**
     * The params of inital.
     */
    private params: {label?: string; disabled?: boolean; specSkinClass?: string;};

    constructor(params?: {label?: string; disabled?: boolean; specSkinClass?: string;}) {
        this.params = params;
        super(params);
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<button class="'
            + this.getBaseSkinClass() + ' ' + this.getSpecSkinClass()
            + '" type="button"></button>';
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
     * Get the status of disabled.
     * @return {boolean} Whether disabled or not。
     */
    public getDisabled(): boolean {
        return (<Element>this.getNode()).hasAttribute('disabled');
    }
    
    /**
     * Get the label of the button.
     * @return {string} The label of the button.
     */
    public getLabel(): string {
        return (<HTMLElement>this.getNode()).innerHTML;
    }

    /**
     * Set the status of button. Disable or enable.
     * True is disabled.
     * False is enabled.
     * @param {boolean} disabled The status of disabled.
     */
    public setDisabled(disabled: boolean): void {
        if (disabled) {
            (<Element>this.getNode()).setAttribute('disabled', 'disabled');
        } else {
            (<Element>this.getNode()).removeAttribute('disabled');
        }
    }

    public setLabel(label: string): void {
        (<HTMLElement>this.getNode()).innerHTML = label;
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
    public getSpecSkinClass(): string {
        return this.params.specSkinClass || 'btn-primary';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}
