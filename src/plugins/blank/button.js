import { renderHTML } from './render';

import config from './config';

export function registerButton({ editor }) {
    function onSetup(api) {}

    function onAction() {
        editor.execCommand('mceInsertContent', false, renderHTML({ editor }));
    }

    editor.ui.registry.addToggleButton(config.name, {
        text: config.text,
        icon: config.icon,
        tooltip: config.tooltip,
        onAction,
        onSetup,
    });

    editor.ui.registry.addToggleMenuItem(config.name, {
        text: config.text,
        icon: config.icon,
        onAction,
        onSetup,
    });
}
