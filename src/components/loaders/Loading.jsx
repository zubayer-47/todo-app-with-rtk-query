import React from "react";
import loadingCss from "./loading.module.css";

export default function Loading() {
  return (
    <div class={loadingCss["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
