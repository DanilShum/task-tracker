import { defineComponent } from "vue";

import BaseButton from "@/components/ui/buttons/base-button";

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
          whenClick={() => this.setI18nLanguage("en")}
        />

        <BaseButton
          text={"ru"}
          variant="secondary"
          whenClick={() => this.setI18nLanguage("ru")}
        />

        <span>{this.$t("auth.login")}</span>
        <span>/{this.$i18n.locale}</span>
      </div>
    );
  },
});
