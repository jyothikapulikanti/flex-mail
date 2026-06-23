import { initials, avatarColor } from "../../utils/helpers";

export default function Avatar({ email, size = 36 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: avatarColor(email),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.38,
      fontWeight: 700,
      color: "#fff"
    }}>
      {initials(email)}
    </div>
  );
}