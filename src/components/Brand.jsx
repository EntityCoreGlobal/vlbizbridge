import { Link } from "react-router";
import Icon from "./Icon.jsx";

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="VL Bizbridge home">
      <span className="brand-mark" aria-hidden="true">
        <Icon name="bridge" />
      </span>
      <span className="brand-name">
        VL <span>Bizbridge</span>
      </span>
    </Link>
  );
}
