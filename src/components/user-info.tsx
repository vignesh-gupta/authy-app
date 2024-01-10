import { ExtendedUser } from "@/auth";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="font-semibold text-2xl text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="text-xs max-w-[180px] truncate font-mono p-1 bg-slate-100">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="text-xs max-w-[180px] truncate font-mono p-1 bg-slate-100">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">email</p>
          <p className="text-xs max-w-[180px] truncate font-mono p-1 bg-slate-100">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="text-xs max-w-[180px] truncate font-mono p-1 bg-slate-100">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Auth</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
