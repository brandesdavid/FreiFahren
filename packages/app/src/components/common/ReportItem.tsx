import { isNil } from "lodash";
import { Row, Text, View } from "native-base";

import { Report } from "../../api";
import { stations } from "../../data";
import { FFLineTag } from "./FFLineTag";

type ReportItemProps = {
  report: Report;
};

export const ReportItem = ({ report }: ReportItemProps) => {
  const station = stations[report.stationId];

  return (
    <Row space={2} alignItems="flex-start">
      <View alignItems="center">
        <FFLineTag line={report.line} />
        <Text color="fg" textAlign="center" mt={1}>
          {report.timestamp.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
      <View>
        <Text color="white" bold>
          {station.name}
        </Text>
        <Text color="fg" mt={1}>
          {"Richtung "}
          {isNil(report.direction?.name) ? (
            "unbekannt"
          ) : (
            <Text color="white">{report.direction.name}</Text>
          )}
        </Text>
      </View>
    </Row>
  );
};
