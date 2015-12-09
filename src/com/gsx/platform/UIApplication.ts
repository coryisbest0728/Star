/**
 * @file The basis platform as abstract.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ApplicationContext} from './context/ApplicationContext';
import {IApplication} from './IApplication';
import {IPlugin} from './IPlugin';
import {UIComponentContainer} from '../components/UIComponentContainer';

export abstract class UIApplication extends UIComponentContainer implements IApplication {

    private params: IUIApplicationParams;
    private theme: string;

    /**
     * The node of the ui application.
     */
    private appNode: Node;

    constructor(params?: IUIApplicationParams) {
        this.theme = 'plain';
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public buildRendering(): void {
        this.appNode = document.body;
        this.renderAttr();
        this.setTheme(this.params.theme);
        var classList: DOMTokenList = (<HTMLElement>this.appNode).classList;
        this.getSkinClass().trim().split(/\s+/).forEach(function (skin: string): void {
            skin && !classList.contains(skin) && classList.add(skin);
        });
        var template: string = this.getTemplate();
        if (template) {
            var virtualElement: HTMLElement = <HTMLElement>this.getVirtualNode();
            virtualElement.innerHTML = template;
            this.getContainerNode().appendChild(virtualElement.firstChild);
        }
    }

    /**
     * Set the theme of the application.
     * @param {string} theme
     */
    public setTheme(theme: string): void {
        var classList: DOMTokenList = document.body.classList;
        if (theme && theme !== this.theme) {
            classList.remove(this.theme);
            this.theme = theme;
        } else {
            this.theme = 'plain';
        }
        classList.add(this.theme);
    }

    /**
     * @override
     */
    public getTemplate(): string {
        return '';
    }

    /**
     * @override
     */
    public getContainerNode(): Node {
        return this.getNode();
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'application';
    }

    /**
     * @override
     */
    public getNode(): Node {
        return this.appNode;
    }

    /**
     * @override
     */
    public getPlugins(): IPlugin[] {
        return [];
    }

    /**
     * @override
     */
    public getApplicationContext(): ApplicationContext {
        return null;
    }

    /**
     * @override
     */
    public run(): void {
        this.getPlugins().forEach(function (plugin: IPlugin): void {
            plugin.startup();
        });
    }

    /**
     * @override
     */
    public destroy(): void {
        this.getPlugins().forEach(function (plugin: IPlugin): void {
            plugin.destroy();
        });
        delete this.params;
        super.destroy();
    }
}

export interface IUIApplicationParams {
    /**
     * The them of this application.
     */
    theme?: string;
}