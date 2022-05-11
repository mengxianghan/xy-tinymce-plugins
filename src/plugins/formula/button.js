import config from './config';
import Dialog from './dialog';

export function registerButton({ editor }) {
    let dialog = null;

    function onSetup(api) {
        dialog = new Dialog({ editor });
    }

    function onAction() {
        dialog.open();
    }

    editor.ui.registry.addButton(config.name, {
        text: config.text,
        icon: config.icon,
        tooltip: config.tooltip,
        onAction,
        onSetup,
    });

    editor.ui.registry.addMenuItem(config.name, {
        text: config.text,
        icon: config.icon,
        onAction,
        onSetup,
    });
}
