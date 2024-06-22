/* eslint-disable */
import {PropType as VuePropType, VNode as VueVNode} from "@vue/runtime-core";
import {AllowedComponentProps, DefineComponent, FunctionalComponent, Ref as VueRef} from "vue/dist/vue";
import {UnwrapRef as VueUnwrapRef} from "@vue/reactivity";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  export type HTMLTag = keyof HTMLElementTagNameMap;
  export type PropType<T> = VuePropType<T>;
  export type Ref<T> = VueRef<T>;
  export type VNode = VueVNode;
  export type VueAnyComponent<Props = {}> = VueComponent<Props> | VueFC<Props>;
  export type VueComponent<Props = {}> = DefineComponent<Props, {}, any>;
  export type VueFC<Props = {}, Events = {}> = FunctionalComponent<
    Props & AllowedComponentProps,
    Events
  >;
  export type UnwrapRef<T> = VueUnwrapRef<T>;
  export type Lang = "en" | "ru";
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    setI18nLanguage: (lang: Lang) => void;
  }
}

/* eslint-enable */
