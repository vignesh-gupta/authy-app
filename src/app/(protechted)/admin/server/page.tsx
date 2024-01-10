import { currentUserRole } from "@/lib/auth";

const AdminPage = async () => {
  const role = await currentUserRole();

  return <div>Current role: {role}</div>;
};

export default AdminPage;
