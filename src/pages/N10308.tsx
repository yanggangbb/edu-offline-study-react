import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";

const N10308 = () => {
  const [color, setColor] = useState<string>("black");
  const colors = ["black", "aqua", "red", "purple", "blue", "green", "yellow", "skyblue", "beige", "gray"]

  useEffect(() => {
    setInterval(() => {
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(selectedColor);
    }, 500)
  }, [])

  return <Stack>
    <Typography variant="h1" color={color}>윤상지가 세상을 구한다...</Typography>
  </Stack>
}

export default N10308;