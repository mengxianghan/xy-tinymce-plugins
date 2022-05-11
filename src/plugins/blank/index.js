import { registerButton } from './button';

import config from './config';

tinymce.PluginManager.add(config.name, function (editor) {
    registerButton({ editor });

    return {
        getMetaData: () => ({
            name: config.name,
        }),
    };
});
