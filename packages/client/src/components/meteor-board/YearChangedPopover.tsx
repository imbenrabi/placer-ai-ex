import React from 'react';
import { Popover, Text } from '@nextui-org/react';


interface YearChangedPopoverProps {
  children: React.ReactNode;
  showYearChangeNotification: boolean;
  setShowYearChangeNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

export const YearChangedPopover: React.FC<YearChangedPopoverProps> = ({ children, setShowYearChangeNotification, showYearChangeNotification }) => {
  return (
    <Popover isOpen={showYearChangeNotification} onOpenChange={() => setShowYearChangeNotification(false)}>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>The mass was not found, jumping to first-year where there is a mass that fits the criteria.</Text>
      </Popover.Content>
    </Popover>
  )
}
