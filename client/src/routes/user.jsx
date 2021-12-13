import { useParams } from "react-router-dom";

const User = () => {
  let userId = useParams();
  return (
    <div>
      <h1>User: {userId.id}</h1>
    </div>
  );
};

export default User;
