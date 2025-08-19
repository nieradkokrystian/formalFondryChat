import * as React from "react";
import { Separator } from "radix-ui";

const SeparatorDemo = () => (
  <Separator.Root className="my-[15px] bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
);

export default SeparatorDemo;
