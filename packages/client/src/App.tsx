import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { MeteorBoard, PageLayout } from './components';

export const App = () => {

  return (
    <NextUIProvider>
      <PageLayout>
        <MeteorBoard />
      </PageLayout>
    </NextUIProvider>
  )
}
