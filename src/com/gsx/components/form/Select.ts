/**
 * @file The select component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from 'com/gsx/events/EventType';
import {FormContainerComponent} from 'com/gsx/components/form/FormContainerComponent';
import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {Option, OptionParams} from 'com/gsx/components/form/Option';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class Select extends FormContainerComponent {

    /**
     * The params of inital.
     */
    private params: SelectParams;

    constructor(params?: SelectParams) {
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<select class="' + this.getSkinClass() + '"></select>';
    }

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return this.getNode();
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
    public getValidators(): Array<IValidator> {
        return [];
    }

    /**
     * @override
     */
    public buildRendering(): void {
        super.buildRendering();
        this.addOptions(this.params.options || []);
        this.setDisabled(this.params.disabled);
    }

    /**
     * @override
     */
    protected getOriginSpecSkinClass(): string {
        return this.params.specSkinClass || '';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'c-select';
    }

    /**
     * Add options for the select
     * @param {Array<OptionsParam>}
     */
    public addOptions(options: Array<OptionParams>): void {
        options.forEach(function (option: OptionParams): void {
            this.addOption(option);
        }, this);
    }

    /**
     * Add option for the select
     * @param {OptionsParam}
     */
    public addOption(option: OptionParams): void {
        this.addChild(new Option(option));
    }

    /**
     * Get the selected option of the select.
     * @return {Option}
     */
    public getSelectedOption(): Option {
        return <Option>this.getChildren()[(<HTMLSelectElement>this.getFormControlNode()).selectedIndex];
    }

    /**
     * @override
     */
    public setValue(value: string): void {
        var selectElement: HTMLSelectElement = <HTMLSelectElement>this.getFormControlNode();
        var selectedIndex: number = -1;
        var children: Array<UIComponent> = this.getChildren();
        for (var i: number = 0, len: number = children.length; i < len; ++i) {
            var child: UIComponent = children[i];
            if (child instanceof Option) {
                ++selectedIndex;
                if ((<Option>child).getValue() === value) {
                    break;
                }
            }
        }
        if (selectedIndex >= 0 && selectElement.selectedIndex !== selectedIndex) {
            selectElement.selectedIndex = selectedIndex;
            this.emit(EventType.CHANGE);
        }
    }

    /**
     * @override
     */
    public getValue(): string {
        var selectedOption: Option = this.getSelectedOption();
        if (selectedOption) {
            return selectedOption.getValue();
        }
        return super.getValue();
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}

interface SelectParams {
    /**
     * @see http://www.w3school.com.cn/tags/att_button_disabled.asp
     */
    disabled?: boolean;

    /**
     * The spec button skin class.
     */
    specSkinClass?: string;

    /**
     * The options of select.
     */
    options?: Array<OptionParams>;
}
