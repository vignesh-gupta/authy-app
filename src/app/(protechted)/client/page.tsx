"use client";

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ServerPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo label="🤝Client Component" user={user} />
    </div>
  );
};

export default ServerPage;
