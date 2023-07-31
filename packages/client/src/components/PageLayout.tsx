import React from "react"
import { Grid } from "@nextui-org/react"

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
