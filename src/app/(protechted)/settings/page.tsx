import { auth, signOut } from "@/auth";
import React from "react";

const TestPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestPage;
