import { renderPlaceholder } from '.';

export function registerPlaceholderEvent({ editor }) {
    // 预处理回填内容
    editor.on('BeforeSetContent', (e) => {
        const el = editor.dom.create('div', null, e?.content ?? '');
        const targetList = el.querySelectorAll('[data-placeholder="1"]');
        // 向符合条件的容器中添加占位容器
        targetList.forEach((item) => {
            if (!item.innerHTML) {
                item.append(renderPlaceholder({ editor }));
            }
        });
        e.content = el.innerHTML;
    });

    // 预处理获取内容
    editor.on('GetContent', (e) => {
        const el = editor.dom.create('div', null, e?.content ?? '');
        const targetList = el.querySelectorAll('[data-name="placeholder"]');
        // 移除占位容器
        targetList.forEach((item) => {
            item.remove();
        });
        e.content = el.innerHTML;
    });
}
