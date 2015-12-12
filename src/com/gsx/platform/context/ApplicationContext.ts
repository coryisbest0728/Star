/**
 * @file The context of application.
 *
 * @author kuanghongrui@baijiahulian.com
 */

export abstract class ApplicationContext {

    private appConfig: IApplicationContextParam;

    constructor(jsonConfileContent: string) {
        this.appConfig = <IApplicationContextParam>JSON.parse(jsonConfileContent);
    }

    /**
     * Get the name of the application.
     * @return {string}
     */
    public getName(): string {
        return this.appConfig.name;
    }

    /**
     * Get the description of the application.
     * @return {string}
     */
    public getDescription(): string {
        return this.appConfig.description;
    }

    /**
     * Get the version of the application.
     * @return {string}
     */
    public getVersion(): string {
        return this.appConfig.version;
    }

    public getPluginClassNames(): string[] {
        return this.appConfig.pluginClassNames;
    }
}

export interface IApplicationContextParam {
    name: string;
    description: string;
    version: string;
    pluginClassNames: string[];
}