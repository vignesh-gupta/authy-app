"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import FormError from "@/components/form-error";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole)
    return <FormError message="Insufficient Access for action" />;

  return <>{children}</>;
};

export default RoleGate;
