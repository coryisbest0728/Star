/**
 * @file The form view model implements.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {ViewModel} from 'com/gsx/mvvm/ViewModel';

export class FormViewModel extends ViewModel {

    public username: string;

    public password: string;

    public option: number;

    public disabled: boolean;

    public user: Object = {
        nickname: ''
    };

    constructor() {
        super();
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
    }
}