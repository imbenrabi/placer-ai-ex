import React from 'react';
import { Popover, Text } from '@nextui-org/react';


interface YearChangedPopoverProps {
  children: React.ReactNode;
  showYearChangeNotification: boolean;
  setShowYearChangeNotificationToFalse: () => void
}

export const YearChangedPopover: React.FC<YearChangedPopoverProps> = ({ children, setShowYearChangeNotificationToFalse, showYearChangeNotification }) => {
  return (
    <Popover isOpen={showYearChangeNotification} onOpenChange={setShowYearChangeNotificationToFalse}>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>The mass was not found, jumping to first-year where there is a mass that fits the criteria.</Text>
      </Popover.Content>
    </Popover>
  )
}
