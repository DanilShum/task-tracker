import { defineComponent } from "vue";

import { BaseButton, BaseIcon, BaseSelect } from "@/components";
import { useRef } from "@/composables";

export default defineComponent({
  name: "HomeView",

  setup() {
    const [values, setValues] = useRef([3, "6"]);

    return { values, setValues };
  },

  render() {
    const { values, setValues } = this;
    const array: any[] = [];

    for (let i = 0; i < 10000; i++) {
      array.push({ caption: `Caption ${i}`, value: i, label: `Label ${i}` });
    }

    return (
      <div class="w-6/12">
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

        <BaseSelect
          color="blue"
          label={"yrtyr"}
          multi
          options={array}
          value={values}
          whenChange={setValues}
        />

        <span>{this.$t("auth.login")}</span>
        <span>/{this.$i18n.locale}</span>
      </div>
    );
  },
});
