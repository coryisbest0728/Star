/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <amd-dependency path="text!./SubmitForm.jxml" />

import {Button} from 'com/gsx/components/form/Button';
import {Form} from 'com/gsx/components/form/Form';
import {FormItem} from 'com/gsx/components/form/FormItem';
import {PasswordBox} from 'com/gsx/components/form/PasswordBox';
import {TextBox} from 'com/gsx/components/form/TextBox';
import {UIPlugin} from 'com/gsx/platform/UIPlugin';

declare var require: (moduleId: string) => string;
export class SubmitFormPlugin extends UIPlugin {

    /**
     * @override
     */
    public install(): void {
        console.log(FormItem);
        console.log(PasswordBox);
        this.addComponent(this.getUIComponentByTemplate(require('text!./SubmitForm.jxml')));
    }

//    /**
//     * Set username
//     * @param {string} username
//     */
//    public setUsername(username: string): void {
//        
//    }
//
//    /**
//     * Get username
//     * @param {string} username
//     */
//    public getUsername(): string {
//        
//    }
//
//    /**
//     * Set password
//     * @param {string} password
//     */
//    public setPassword(password: string): void {
//        
//    }
//
//    /**
//     * Get password
//     * @param {string} password
//     */
//    public getPassword(): string {
//        
//    }

    /**
     * @override
     */
    public uninstall(): void {
        super.uninstall();
    }
}