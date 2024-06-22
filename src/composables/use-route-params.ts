import { transform } from "lodash-es";
import { useRoute } from "vue-router";

export const useRouteParams = () => {
  const route = useRoute();

  return transform(route.params, (value) =>
    Array.isArray(value) ? value[0] : value
  );
};
