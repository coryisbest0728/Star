/**
 * @file The context of ui application.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ApplicationContext, IApplicationContextParam} from 'com/gsx/platform/context/ApplicationContext';

export class UIApplicationContext extends ApplicationContext {

    private config: IUIApplicationContextParam;

    constructor(jsonConfileContent: string) {
        super(jsonConfileContent);
        this.config = <IUIApplicationContextParam>JSON.parse(jsonConfileContent);
    }
}

export interface IUIApplicationContextParam extends IApplicationContextParam {
    
}