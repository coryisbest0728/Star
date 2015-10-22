/**
 * @file UIComponent基类。
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ISkinable} from 'com/gsx/components/ISkinable';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class Button extends UIComponent implements ISkinable {

    /**
     * 初始化时传入的参数。
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
     * 获取按钮被禁用状态。
     * @return {boolean} 按钮是否被禁用。
     */
    public getDisabled(): boolean {
        return (<Element>this.getNode()).hasAttribute('disabled');
    }
    
    /**
     * 获取按钮的标签名。
     * @return {string} 按钮的标签名
     */
    public getLabel(): string {
        return (<HTMLElement>this.getNode()).innerHTML;
    }

    /**
     * 设置按钮是否被禁用。
     * @param {boolean} disabled 按钮被禁用状态。
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
