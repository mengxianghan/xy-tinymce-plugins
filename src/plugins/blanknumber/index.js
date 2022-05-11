import { registerButton } from './button';
import { registerEvent } from './event';

import config from './config';

tinymce.PluginManager.add(config.name, function (editor) {
    registerButton({ editor });
    registerEvent({ editor });

    return {
        getMetaData: () => ({
            name: config.name,
        }),
    };
});
