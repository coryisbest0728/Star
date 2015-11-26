/**
 * @file The form component.
 * plz see <url>http://www.w3school.com.cn/tags/tag_form.asp</url>
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {SkinableComponentContainer} from 'com/gsx/components/SkinableComponentContainer';

export class Form extends SkinableComponentContainer {

    private params: FormParams;

    constructor(params?: FormParams) {
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<form></form>';
    }

    /**
     * @override
     */
    public getContainerNode(): Node {
        return this.getNode();
    }

    /**
     * Set the charset of the server application
     * @param {string} acceptCharset
     * @see http://www.w3school.com.cn/tags/att_form_accept-charset.asp
     */
    public setAcceptCharset(acceptCharset: string): void {
        (<Element>this.getNode()).setAttribute('accept-charset', acceptCharset);
    }

    /**
     * Get the charset of the server application
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_accept-charset.asp
     */
    public getAcceptCharset(): string {
        return (<Element>this.getNode()).getAttribute('accept-charset');
    }

    /**
     * Set the server action url path.
     * @param {string} action
     * @see http://www.w3school.com.cn/tags/att_form_action.asp
     */
    public setAction(action: string): void {
        (<Element>this.getNode()).setAttribute('action', action);
    }

    /**
     * Get the server action url path.
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_action.asp
     */
    public getAction(): string {
        return (<Element>this.getNode()).getAttribute('action');
    }

    /**
     * Turn on the autocomplete or not.
     * @param {boolean} autocomplete
     * @see http://www.w3school.com.cn/tags/att_form_autocomplete.asp
     */
    public setAutocomplete(autocomplete: boolean): void {
        (<Element>this.getNode()).setAttribute('autocomplete', autocomplete ? 'on' : 'off');
    }

    /**
     * Get the autocomplete state.
     * @return {boolean}
     * @see http://www.w3school.com.cn/tags/att_form_autocomplete.asp
     */
    public getAutocomplete(): boolean {
        return (<Element>this.getNode()).getAttribute('autocomplete') === 'on';
    }

    /**
     * Set the enctype of the form.
     * @param {string} enctype
     * @see http://www.w3school.com.cn/tags/att_form_enctype.asp
     */
    public setEnctype(enctype: string): void {
        (<Element>this.getNode()).setAttribute('enctype', enctype || 'application/x-www-form-urlencoded');
    }

    /**
     * Get the form of the form.
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_enctype.asp
     */
    public getEnctype(): string {
        return (<Element>this.getNode()).getAttribute('enctype') || 'application/x-www-form-urlencoded';
    }

    /**
     * Set the method of the form.
     * @param {string} method
     * @see http://www.w3school.com.cn/tags/att_form_method.asp
     */
    public setMethod(method: string): void {
        (<Element>this.getNode()).setAttribute('method', method);
    }

    /**
     * Get the method of the form.
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_method.asp
     */
    public getMethod(): string {
        return (<Element>this.getNode()).getAttribute('method');
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}

/**
 * The initial params of the form
 */
interface FormParams {
    /**
     * @see http://www.w3school.com.cn/tags/att_form_accept-charset.asp
     */
    acceptCharset?: string;

    /**
     * @see http://www.w3school.com.cn/tags/att_form_action.asp
     */
    action?: string;

    /**
     * @see http://www.w3school.com.cn/tags/att_form_autocomplete.asp
     */
    autocomplete?: boolean;

    /**
     * http://www.w3school.com.cn/tags/att_form_enctype.asp
     */
    enctype?: string;

    /**
     * @see http://www.w3school.com.cn/tags/att_form_method.asp
     */
    method?: string;
}
