import { Navigate } from "react-router-dom";

export const Redirect = ({ link }: { link: string }) => <Navigate to={link} replace />;

export default Redirect;
