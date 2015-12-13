/**
 * @file The ui support of the plugin
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IApplication} from './IApplication';
import {IPlugin} from './IPlugin';
import {ParserFactory} from '../parsers/ParserFactory';
import {UIApplication} from './UIApplication';
import {UIComponent} from '../components/UIComponent';

export abstract class UIPlugin implements IPlugin {

    private componentMap: Object;
    private application: IApplication;

    constructor(application: IApplication) {
        this.application = application;
        this.componentMap = {};
    }

    /**
     * @override
     */
    abstract install(): void;

    /**
     * Add component into the application.
     * @param {UIComponent} component
     */
    public addComponent(component: UIComponent): void {
        this.componentMap[component.getId()] = component;
        (<UIApplication>this.getApplication()).addChild(component);
    }

    /**
     * Remove component into the application.
     * @param {UIComponent} component
     */
    public removeComponent(component: UIComponent): void {
        (<UIApplication>this.getApplication()).removeChild(component);
        delete this.componentMap[component.getId()];
    }

    /**
     * @override
     */
    public getApplication(): IApplication {
        return this.application;
    }

    /**
     * 
     * @param {string} templateStr
     */
    public getUIComponentByTemplate(templateStr: string): UIComponent {
        return ParserFactory.createParser().parse(templateStr);
    }

    /**
     * @override
     */
    public uninstall(): void {
        for (var id in this.componentMap) {
            this.removeComponent(this.componentMap[id]);
        }
        delete this.componentMap;
        delete this.application;
    }
}