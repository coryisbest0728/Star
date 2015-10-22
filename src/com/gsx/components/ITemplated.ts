/**
 * @file 模板接口。
 *
 * @author kuanghongrui@baijiahulian.com
 */

export interface ITemplated {
    /**
     * 获取待渲染的模板字符串。
     */
    getTemplateString(): string;

    /**
     * 根据给定的模板进行渲染。
     */
    buildRendering(): void;
}
