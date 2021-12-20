import React from "react";
import { Container } from "./styles";

interface BulletProps {
  active?: boolean;
}

export const Bullet = ({ active = false }: BulletProps) => {
  return <Container active={active} />;
};
