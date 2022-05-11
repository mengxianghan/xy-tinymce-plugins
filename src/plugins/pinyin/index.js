import { registerButton } from './button';
import { registerPlaceholderEvent } from '../../utils/event';
import { registerEvent } from './event';

import config from './config';

tinymce.PluginManager.add(config.name, function (editor) {
    registerPlaceholderEvent({ editor });
    registerButton({ editor });
    registerEvent({ editor });

    return {
        getMetaData: () => ({
            name: config.name,
        }),
    };
});
