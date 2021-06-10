import React from "react";
import { SWRConfig } from "swr";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../utils/fetchUtils";

export default function SwrGlobalConfig({ children }) {
  const { userData } = useAuth();
  const token = userData.token;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return (
    <SWRConfig
      value={{
        fetcher: (resource) => fetcher(resource, options),
      }}
    >
      {children}
    </SWRConfig>
  );
}
