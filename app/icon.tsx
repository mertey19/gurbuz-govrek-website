import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#071A33",
        color: "#E8C978",
        border: "3px solid #D6A84B",
        fontSize: 25,
        fontWeight: 700,
        letterSpacing: "-2px",
      }}
    >
      GG
    </div>,
    size,
  );
}
