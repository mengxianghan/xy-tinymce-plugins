import { createApp } from 'vue';
import {
    Button,
    Row,
    Col,
    Tabs,
    Popover,
    Input,
    Space,
    Dropdown,
    Menu,
    Select,
} from 'ant-design-vue';

import Main from './main.vue';

import '@/styles/index.less';

const app = createApp(Main);

app.use(Button)
    .use(Row)
    .use(Col)
    .use(Tabs)
    .use(Popover)
    .use(Input)
    .use(Space)
    .use(Dropdown)
    .use(Menu)
    .use(Select);

app.mount('#app');
