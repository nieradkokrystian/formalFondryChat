import * as React from "react";
import { Separator } from "radix-ui";

const SeparatorDemo = ({className}) => (
  <Separator.Root className={` my-[15px] ${className} bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-3/4 data-[orientation=vertical]:w-px` }/>
);

export default SeparatorDemo;
