import { defineComponent } from "vue";

import { useProps, useRef } from "@/composables";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    const { msg } = useProps(props);

    const [object, setObject] = useRef<number>();

    return { object, setObject };
  },
  render() {
    return <div>Hellow World</div>;
  },
});
