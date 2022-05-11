import config from './config';

export function getIndex({ editor }) {
    const el = editor.dom.create('div', null, editor.getContent);
    const targetList = el.querySelectorAll(`[data-name="${config.name}"]`);
    return targetList.length;
}

export function formatContent({ editor }) {
    const bm = editor.selection.getBookmark(2, true);
    const el = editor.dom.create('div', null, editor.getContent());
    const tragetList = el.querySelectorAll(`[data-name="${config.name}"]`);
    const firstNumber = Number(
        JSON.parse(editor.dom.getAttrib(tragetList[0], 'data-content') || '{}')
            ?.content ?? 1
    );
    tragetList.forEach((target, index) => {
        const number = index + firstNumber;
        editor.dom.setHTML(target, number);
        editor.dom.setAttribs(target, {
            'data-content': JSON.stringify({ content: String(number) }),
        });
    });
    editor.setContent(el.innerHTML);
    editor.selection.moveToBookmark(bm);

    editor.selection.setCursorLocation(
        editor.selection.getNode().parentNode,
        editor.selection.getRng()?.endOffset
    );
}
