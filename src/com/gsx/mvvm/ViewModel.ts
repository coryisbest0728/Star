/**
 * @file The view model implements.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventDispatcher} from '../events/EventDispatcher';
import {IDestroyable} from '../IDestroyable';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
import {StringUtil} from '../utils/StringUtil';

export class ViewModel extends EventDispatcher implements IViewModel, IDestroyable {

    /**
     * @override
     */
    public get(attr: string): IViewModel {
        return null;
    }

    /**
     * @override
     */
    public set(attr: string, value: any): void {
        
    }

    /**
     * @override
     */
    public watch(attr: string, watchHandler: (param: IModel) => void): void {
        
    }

    /**
     * @override
     */
    public destroy(): void {
        this.removeAllListeners();
    }
}