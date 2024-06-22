import { notify } from "@kyvg/vue3-notification";

export const copyLink = (link: string) => {
  const input = document.createElement("input");
  let isCopySuccessful = false;

  input.value = link;
  input.style.top = "0";
  input.style.left = "0";
  input.style.position = "fixed";

  document.body.appendChild(input);
  input.focus();
  input.select();

  try {
    isCopySuccessful = document.execCommand("copy");

    isCopySuccessful
      ? notify({ type: "success", title: "success" })
      : notify({ type: "error", title: "error" });
  } catch (err) {
    notify({ type: "error", title: "error" });
  }

  document.body.removeChild(input);
};

export const downloadURI = (uri: string, name?: string) => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = uri;
  if (name) link.download = name;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
