import config from './config';

export function registerButton({ editor }) {
    function onSetup(api) {
        editor.formatter.register(config.name, {
            inline: 'span',
            classes: `xe-${config.name}`,
        });

        editor.formatter.formatChanged(config.name, function (state) {
            api.setActive(state);
        });
    }

    function onAction() {
        editor.execCommand('mceToggleFormat', false, config.name);
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
