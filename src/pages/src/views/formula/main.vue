<template>
    <div class="pa-8-1">
        <a-tabs type="card" class="tab">
            <template #rightExtra>
                <a href="https://katex.org/docs/supported.html" target="_blank"
                    >LaTex 语法参考</a
                >
            </template>
            <a-tab-pane
                v-for="(item, index) in basicList"
                :key="item.value"
                :tab="item.label"
            >
                <a-row :gutter="8" type="flex">
                    <a-col
                        v-for="(menu, menuIndex) in item.menu.list"
                        :key="menu.key"
                        flex="1 0 0"
                    >
                        <a-popover
                            v-model:visible="menu._visible"
                            placement="bottomLeft"
                            arrowPointAtCenter
                            overlayClassName="command-popover"
                            :trigger="['click']"
                        >
                            <a-button class="align-center tab-btn" block>
                                <img
                                    :src="
                                        require(`@/${item.menu.path}${menu.icon}`)
                                    "
                                />
                                <div>{{ menu.label }}</div>
                                <down-outlined class="fs-10" />
                            </a-button>
                            <template #content>
                                <div class="command">
                                    <template
                                        v-for="(command, commandIndex) in item
                                            .command.data[menu.value]"
                                    >
                                        <template
                                            v-if="command.type === 'heading'"
                                        >
                                            <div
                                                class="command__title"
                                                :key="commandIndex"
                                            >
                                                {{ command.label }}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <a
                                                class="command__item"
                                                :key="commandIndex"
                                                :style="command.style"
                                                @click="
                                                    handleInsert(
                                                        command,
                                                        index,
                                                        menuIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    :src="
                                                        require(`@/${item.command.path}${menu.value}/${command.icon}`)
                                                    "
                                                />
                                            </a>
                                        </template>
                                    </template>
                                </div>
                            </template>
                        </a-popover>
                    </a-col>
                </a-row>
            </a-tab-pane>
        </a-tabs>
        <div class="mt-8-1">
            <a-space>
                <a-dropdown
                    v-for="(attr, index) in attrList"
                    :key="index"
                    :trigger="['click']"
                >
                    <a-button class="flex items-center">
                        <component
                            :is="attr.icon"
                            theme="outline"
                            size="15"
                            class="mr-4-1"
                        />
                        {{ attr.label }}
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item
                                v-for="item in attr.children"
                                :key="item.tag"
                                @click="handleInsert(item)"
                            >
                                <img
                                    :src="require(`@/${item.icon}`)"
                                    :alt="item.tag"
                                    class="attr-img"
                                />
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-space>
        </div>
        <div class="mt-8-1">
            <a-textarea
                v-model:value="content"
                placeholder="请输入 LaTex 表达式"
                :rows="6"
                ref="inputRef"
                class="input-control"
                @blur="onBlur"
            ></a-textarea>
        </div>
        <div class="preview pa-8-2 mt-8-1">
            <div v-show="content" ref="previewRef"></div>
            <div v-if="!content" class="preview__empty">
                <img :src="require('@/assets/formula/empty.png')" />
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, nextTick, watch, onBeforeUnmount } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { FontSize, FontSizeTwo, Platte } from '@icon-park/vue-next';
import { formatBasicData, formatAttrData, loadJs } from './utils';
import { basicData, attrData } from './config/data';

import debounce from 'lodash/debounce'

export default {
    components: {
        DownOutlined,
        FontSize,
        FontSizeTwo,
        Platte,
    },
    setup() {
        const basicList = ref([]);
        const attrList = ref([]);
        const content = ref('');
        const startPos = ref(0);
        const endPos = ref(0);
        const inputRef = ref();
        const previewRef = ref();

        onMounted(() => {
            basicList.value = formatBasicData(basicData);
            attrList.value = formatAttrData(attrData);

            window.parent.postMessage(
                {
                    mceAction: 'ready',
                },
                '*'
            );

            window.addEventListener('message', onMessage, false);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('message', onMessage);
        });

        watch(content, debounce(renderFormula, 300));

        /**
         * 快速插入
         */
        function handleInsert({ latex }, index, menuIndex) {
            const elInput = inputRef.value.$el;
            if (endPos.value) {
                content.value = `${content.value.substring(
                    0,
                    startPos.value
                )}${latex}${content.value.substring(
                    endPos.value,
                    content.value.length
                )}`;
            } else {
                content.value = `${content.value}${latex}`;
            }
            nextTick(() => {
                elInput.focus();
                const latexIndex = latex.indexOf('{}');
                const selectionPos =
                    startPos.value +
                    (latexIndex > -1 ? latexIndex + 1 : latex.length);
                elInput.selectionStart = selectionPos;
                elInput.selectionEnd = selectionPos;

                basicList.value[index].menu.list[menuIndex]._visible = false;
            });
        }

        /**
         * 失焦
         */
        function onBlur() {
            const elInput = inputRef.value?.$el;
            if (elInput) {
                startPos.value = elInput.selectionStart;
                endPos.value = elInput.selectionEnd;
            }
        }

        /**
         * 渲染公式
         */
        function renderFormula(val) {
            // 渲染公式
            MathJax.texReset();
            const options = MathJax.getMetricsFor(previewRef.value);
            MathJax.tex2svgPromise(val, options).then((node) => {
                previewRef.value.innerHTML = '';
                if ('' !== val) {
                    previewRef.value.appendChild(node);
                }
            });

            // 将公式发送至插件
            window.parent.postMessage(
                {
                    mceAction: 'change',
                    data: {
                        value: val,
                    },
                },
                '*'
            );
        }

        /**
         * 监听消息
         */
        function onMessage(res) {
            const { data, mceAction } = res?.data;
            switch (mceAction) {
                case 'init':
                    loadJs({ jsList: data?.jsList });
                    const dataContent = data?.data?.content;
                    if (dataContent) {
                        content.value = dataContent;
                    }
                    break;
            }
        }

        return {
            basicList,
            attrList,
            content,
            inputRef,
            previewRef,
            handleInsert,
            onBlur,
        };
    },
};
</script>

<style lang="less">
.command-popover {
    width: 500px;
    height: 320px;

    .ant-popover-content {
        height: 100%;
    }

    .ant-popover-inner {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
}
</style>

<style lang="less" scoped>
.tab {
    &.ant-tabs-top {
        :deep(.ant-tabs-nav) {
            margin-bottom: @margin-xs;
        }
    }

    &-btn {
        line-height: 1;
        height: auto;
        align-items: center;
        font-size: 12px;

        img {
            width: 100%;
            margin: 0 0 2px 0;
        }
    }
}

.command {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    &__title {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
    }

    &__item {
        min-width: 32px;
        min-height: 32px;
        font-size: 14px;
        border: @border-color-base solid 1px;
        border-radius: @border-radius-base;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: @padding-xss;
        transition: all 0.3s;

        &:hover {
            border-color: @primary-color;
        }
    }
}

.input-control {
    font-family: Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
        Bitstream Vera Sans Mono, Courier New, monospace;
}

.preview {
    border: @border-color-base solid 1px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    font-size: 18px;

    &__empty {
        height: 100%;

        img {
            height: 100%;
        }
    }
}

.attr-img {
    width: 160px;
}
</style>
