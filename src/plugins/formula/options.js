import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';

export function useOptions({ editor }) {
    const options = {
        js: editor.getParam('formula_js'),
        delimiter: editor.getParam('formula_delimiter'),
    };

    return {
        js: [],
        delimiter: ['$$', '$$'],
        ...omitBy(options, isEmpty),
    };
}
