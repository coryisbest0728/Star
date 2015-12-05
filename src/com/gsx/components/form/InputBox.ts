/**
 * @file The abstract input box component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {FormComponent} from './FormComponent';

export abstract class InputBox extends FormComponent {

    /**
     * The params of inital.
     */
    private params: {disabled?: boolean; readonly?: boolean; specSkinClass?: string;};

    constructor(params?: {disabled?: boolean; readonly?: boolean; specSkinClass?: string;}) {
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplate(): string {
        return '<input class="' + this.getSkinClass() + '" type="' + this.getType() + '"></button>';
    }

    /**
     * Get the type of the input box.
     * @return {string}
     */
    abstract getType(): string;

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return this.getNode();
    }

    /**
     * @override
     */
    public postCreate(): void {
        super.postCreate();
        this.setDisabled(this.params.disabled);
    }

    /**
     * @override
     */
    protected getOriginSpecSkinClass(): string {
        return this.params.specSkinClass || '';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'form-control';
    }

    /**
     * Set placeholder for this input box.
     * @param {string} placeholder
     */
    public setPlaceholder(placeholder: string): void {
        (<Element>this.getFormControlNode()).setAttribute('placeholder', placeholder);
    }

    /**
     * Get placeholder of this input box.
     * @return {string}
     */
    public getPlaceholder(): string {
        return (<Element>this.getFormControlNode()).getAttribute('placeholder');
    }

    /**
     * Get the status of readonly.
     * @return {boolean} Whether readonly or not。
     */
    public getReadOnly(): boolean {
        return (<Element>this.getFormControlNode()).hasAttribute('readonly');
    }

    /**
     * Set the status of button. readonly or not.
     * True is readonly.
     * False is readonly.
     * @param {boolean} readonly The status of readonly.
     */
    public setReadOnly(readonly: boolean): void {
        if (readonly) {
            (<Element>this.getFormControlNode()).setAttribute('readonly', 'readonly');
        } else {
            (<Element>this.getFormControlNode()).removeAttribute('readonly');
        }
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}
