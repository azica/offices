import type { AxiosResponse } from "axios";

export const downloadRequest = (res: AxiosResponse, name?: string) => {
  const { data, headers } = res;
  const blob = new Blob([data], {
    type: headers["content-type"],
  });
  const downloadUrl = window.URL.createObjectURL(blob);
  const linkUrl = document.createElement("a");

  linkUrl.download = `${name ? name : `${downloadUrl}.${blob.type.split("/").at(-1)}`}`;
  linkUrl.href = downloadUrl;
  document.body.appendChild(linkUrl);
  linkUrl.click();
  document.body.removeChild(linkUrl);
  linkUrl.remove();
};
