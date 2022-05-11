export function formatBasicData(data) {
    const result = [];
    return data.map((item) => {
        // 菜单 icon
        let menuIconPath = '';
        switch (item?.layer1?.path) {
            case '/img/shortcut/layer1/':
                menuIconPath = 'assets/formula/shortcut/menu/';
                break;
            case '/img/template/layer1/':
                menuIconPath = 'assets/formula/template/menu/';
                break;
        }

        // 命令 icon
        let commandIconPath = '';
        switch (item?.layer2?.path) {
            case '/img/shortcut/layer2/':
                commandIconPath = 'assets/formula/shortcut/command/';
                break;
            case '/img/template/layer2/':
                commandIconPath = 'assets/formula/template/command/';
                break;
        }
        let commandData = {};
        for (let key in item?.layer2?.cont) {
            commandData[key] = item?.layer2?.cont[key].cont.map((command) => {
                const width = String(
                    command?.size || item?.layer2?.cont[key].defaultsize
                );
                return {
                    type: 'divider' === command.tag ? 'heading' : command.tag,
                    label: 'divider' === command.tag ? command.name : '',
                    icon: command.name,
                    latex: command?.latex ?? '',
                    style: {
                        width: width.endsWith('%') ? width : `${width}em`,
                    },
                };
            });
        }
        let type = item.descript_en ?? item.name;
        return {
            label: item.descript,
            value: type,
            menu: {
                path: menuIconPath,
                list: item.layer1.cont.map((menu) => {
                    return {
                        value: menu.tag,
                        label: menu.descript,
                        icon: menu.name,
                        _visivle: false,
                    };
                }),
            },
            command: {
                path: commandIconPath,
                data: commandData,
            },
        };
    });
}

export function formatAttrData(data) {
    return data.map((item) => {
        return {
            ...item,
            children: item.children.map((child) => {
                return {
                    icon: `assets/formula/immediate/${child.name}`,
                    latex: child.latex,
                    tag: child.tag,
                };
            }),
        };
    });
}

/**
 * 加载所需 js
 */
export function loadJs({ jsList }) {
    const elHead = document.getElementsByTagName('head')[0];
    const scriptList = Array.from(document.getElementsByTagName('script'));
    if (jsList && jsList.length) {
        jsList.forEach((script) => {
            const isLoaded = scriptList.some((o) => {
                const src = o.getAttribute('src');
                return src === script;
            });
            if (!isLoaded) {
                const elScript = document.createElement('script');
                elScript.src = script;
                elScript.setAttribute('type', 'text/javascript');
                elHead.append(elScript);
            }
        });
    }
}
