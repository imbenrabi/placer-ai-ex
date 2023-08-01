import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { PageLayout } from './Components';
import { MeteorBoard } from './Pages';

export const App = () => {

  return (
    <NextUIProvider>
      <PageLayout>
        <MeteorBoard />
      </PageLayout>
    </NextUIProvider>
  )
}
