import { defineComponent } from "vue";

import { BaseButton, BaseIcon, BaseInput } from "@/components";

export default defineComponent({
  name: "HomeView",

  setup() {
    return { test: "ss" };
  },

  render() {
    return (
      <div>
        <BaseButton
          color="blue"
          text={"en"}
          v-slots={{ default: () => <BaseIcon name="cross" size={12} /> }}
          whenClick={() => this.setI18nLanguage("en")}
        />

        <BaseButton
          text={"ru"}
          variant="secondary"
          whenClick={() => this.setI18nLanguage("ru")}
        />

        <BaseInput />

        <span>{this.$t("auth.login")}</span>
        <span>/{this.$i18n.locale}</span>
      </div>
    );
  },
});
