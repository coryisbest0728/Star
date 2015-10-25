/**
 * @file The skinable ui component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ISkinable} from 'com/gsx/components/ISkinable';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class SkinableComponent extends UIComponent implements ISkinable {

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return '';
    }

    /**
     * @override
     */
    public getSpecSkinClass(): string {
        return '';
    }

    /**
     * Get specific skin class name from component node.
     * @return {string} The specific skin class name.
     */
    protected getSpecSkinClassFromNode(): string {
        var classNames = (<HTMLElement>this.getNode()).className.trim().split(' ');
        var baseSkinClasses = this.getBaseSkinClass().trim().split(' ');
        return classNames.filter(function (className) {
            className = className.trim();
            for (var i = 0, j = baseSkinClasses.length; i < j; ++i) {
                var baseSkinClass = baseSkinClasses[i].trim();
                if (baseSkinClass === className) {
                    return false;
                }
            }
            return true;
        }).join(' ');
    }

    /**
     * Set the spec skin class to change the skin style of the button.
     * @param {string} specSkinClass 
     */
    public setSpecSkinClass(specSkinClass: string): void {
        (<HTMLElement>this.getNode()).className = this.getBaseSkinClass() + ' ' + specSkinClass;
    }
}
