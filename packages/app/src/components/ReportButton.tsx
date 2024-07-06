import { Octicons } from "@expo/vector-icons";
import { Button } from "native-base";
import { ComponentProps, useRef } from "react";

import { FFButton } from "./common/FFButton";
import { ReportSheet, ReportSheetMethods } from "./ReportSheet";

type ReportButtonProps = Omit<ComponentProps<typeof Button>, "onPress">;

export const ReportButton = (props: ReportButtonProps) => {
  const modalRef = useRef<ReportSheetMethods>(null);

  return (
    <>
      <FFButton
        onPress={() => modalRef.current?.open()}
        {...props}
        bg="selected"
      >
        <Octicons name="report" size={40} color="white" />
      </FFButton>
      <ReportSheet ref={modalRef} />
    </>
  );
};
