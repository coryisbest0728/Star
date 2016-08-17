/**
 * @file The basis platform as abstract.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <amd-dependency path="text!./application.json" />

import {ApplicationContext} from './context/ApplicationContext';
import {IApplication} from './IApplication';
import {IPlugin} from './IPlugin';
import {UIApplicationContext} from './context/UIApplicationContext';
import {UIComponentContainer} from '../components/UIComponentContainer';

declare var require: (moduleId: string) => string;
export abstract class UIApplication extends UIComponentContainer implements IApplication {

    private params: IUIApplicationParams;
    private theme: string;

    constructor(params?: IUIApplicationParams) {
        params = params || {};
        super(params);
        this.params = params;
        this.theme = 'plain';
    }

    /**
     * @override
     */
    public startup(): void {
        this.setTheme(this.params.theme);
        document.body.appendChild(this.getNode());
    }

    /**
     * Set the theme of the application.
     * @param {string} theme
     */
    public setTheme(theme: string): void {
        var classList: DOMTokenList = (<Element>this.getNode()).classList;
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
        return '<div class="' + this.getSkinClass() + '"></div>';
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
    public getPlugins(): IPlugin[] {
        var plugins: IPlugin[] = [];
        this.getApplicationContext().getPluginClassNames().forEach(function (plugnClassName: string): void {
            var simpleName: string = plugnClassName.substr(plugnClassName.lastIndexOf('/') + 1);
            plugins.push(new (window['require'](plugnClassName)[simpleName])(this));
        }, this);
        return plugins;
    }

    /**
     * @override
     */
    public getApplicationContext(): ApplicationContext {
        return new UIApplicationContext(require('text!./application.json'));
    }

    /**
     * @override
     */
    public run(): void {
        this.getPlugins().forEach(function (plugin: IPlugin): void {
            plugin.install();
        });
        this.startup();
    }

    /**
     * @override
     */
    public destroy(): void {
        this.getPlugins().forEach(function (plugin: IPlugin): void {
            plugin.uninstall();
        });
        super.destroy();
        document.body.classList.remove(this.theme);
        delete this.params;
        delete this.theme;
    }
}

export interface IUIApplicationParams {
    /**
     * The them of this application.
     */
    theme?: string;
}