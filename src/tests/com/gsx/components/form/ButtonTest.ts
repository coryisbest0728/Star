/**
 * @file 普通按钮单测
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../../lib/typings/tsd.d.ts" />

import {Button} from 'com/gsx/components/form/Button';

describe('简单按钮的测试', function () {
    beforeEach(function () {
        this.button = new Button({
            label: 'Test'
        });
        document.body.appendChild(this.button.getNode());
    });

    it('测试按钮创建', function () {
        expect(this.button.getNode() instanceof Node).toBeTruthy('按钮dom节点已经生成');
        expect(document.body.contains(this.button.getNode())).toBeTruthy('按钮已经放入document环境中');
        expect(this.button.getParent()).toBeNull('按钮没有父亲组件，不在任何容器内。');
    });

    it('测试按钮的label', function () {
        expect(this.button.getLabel()).toBe('Test');

        this.button.setLabel('Test2');
        expect(this.button.getLabel()).toBe('Test2', '按钮的label为Test2');
        expect(this.button.getLabel()).toBe((<HTMLElement>this.button.getNode()).innerHTML, '和渲染出来的label一样为Test2');
    });

    it('测试按钮的disabled状态', function () {
        expect(this.button.getDisabled()).toBe(false);

        this.button.setDisabled(true);
        expect(this.button.getDisabled()).toBe(true, '按钮的disabled为true');
        expect(this.button.getDisabled())
            .toBe((<Element>this.button.getNode()).hasAttribute('disabled'), '按钮已经被禁用');

        this.button.setDisabled(false);
        expect(this.button.getDisabled()).toBe(false, '按钮的disabled为false');
        expect(this.button.getDisabled())
            .toBe((<Element>this.button.getNode()).hasAttribute('disabled'), '按钮已经被启用');
    });

    it('The button\'s width must be 0', function () {
        expect(this.button.getWidth()).toBe(0);
    });

    it('The button\'s height must be 0', function () {
        expect(this.button.getHeight()).toBe(0);
    });

    afterEach(function () {
        this.button.destroy();
    });
});
