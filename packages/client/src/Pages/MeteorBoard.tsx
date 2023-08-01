import React from "react";
import { Input, Grid, Loading, Row, Table } from "@nextui-org/react";
import { Header, YearChangedPopover } from "../Components";
import { useMeteors } from "../hooks";
import { ClientMeteor } from "../../types";

const TableColumns: Array<keyof Omit<ClientMeteor, 'id'>> = ['name', 'mass', 'year']

export const MeteorBoard = () => {
  const {
    isLoading,
    handleMassThresholdChange,
    handleYearChange,
    meteors,
    massThreshold,
    invalidMassThreshold,
    year,
    showYearChangeNotification,
    setShowYearNotificationToFalse
  } = useMeteors();

  return (
    <Grid.Container gap={3} justify='center'>
      <Row>
        <Grid>
          <Header />
        </Grid>
      </Row>
      <Row>
        <Grid>
          <Input
            label="Year"
            type="number"
            value={year}
            onChange={handleYearChange}
            disabled={isLoading}
          />
        </Grid>
        <Grid>
          <Input
            label="Mass Threshold"
            type="text"
            value={massThreshold}
            onChange={handleMassThresholdChange}
            disabled={isLoading}
            status={invalidMassThreshold ? 'error' : undefined}
            helperText={invalidMassThreshold ? "use numbers" : undefined}
          />
          <YearChangedPopover showYearChangeNotification={showYearChangeNotification} setShowYearChangeNotificationToFalse={setShowYearNotificationToFalse} />
        </Grid>
      </Row>
      <Row>
        <Grid>
          <Table
            aria-label="Meteor Dashboard"
            css={{ minWidth: '30vw', height: "calc($space$14 * 10)" }}
          >
            <Table.Header>
              {TableColumns.map(key => <Table.Column key={key}>{key}</Table.Column>)}
            </Table.Header>
            {isLoading ? <Loading /> : <Table.Body items={meteors}>
              {(meteor) => (
                <Table.Row key={meteor.id}>
                  {(columnKey) => <Table.Cell>{meteor[columnKey as keyof Omit<ClientMeteor, 'id'>]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>}
          </Table>
        </Grid>
      </Row>
    </Grid.Container>
  );
}
