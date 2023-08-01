import { Grid } from "@nextui-org/react";
import React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid>
        {children}
      </Grid>
    </Grid.Container>
  )
}
