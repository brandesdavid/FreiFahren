import { Pressable } from "native-base";
import { ComponentProps, PropsWithChildren } from "react";

type FFButtonProps = PropsWithChildren<ComponentProps<typeof Pressable>>;

export const FFButton = ({ children, ...props }: FFButtonProps) => (
  <Pressable
    backgroundColor="bg"
    borderRadius={24}
    borderColor="bg2"
    borderWidth={3}
    p={1}
    flexDir="row"
    alignItems="center"
    {...props}
  >
    {children}
  </Pressable>
);
