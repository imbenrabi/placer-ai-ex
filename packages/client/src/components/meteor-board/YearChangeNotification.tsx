import React from 'react';
import { Badge, Card, Text, Spacer } from '@nextui-org/react';

export const YearChangeNotification = () => {
  return (
    <>
      <Card css={{ width: '100%' }}>
        <Card.Body>
          <Badge color="warning">Warning</Badge>
          <Text>The mass was not found, jumping to earliest-year where there is a mass that fits the criteria</Text>
        </Card.Body>
      </Card>
      <Spacer y={1} />
    </>
  )
}
