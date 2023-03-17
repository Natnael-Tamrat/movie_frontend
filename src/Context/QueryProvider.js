import React, { useState } from "react";
export const context = React.createContext({ query: "" });

export default function QueryProvider(props) {
  const [query, setQuery] = useState("");
  const [isQuerySubmitted, setIsQuerySubmitted] = useState(false);
  return (
    <context.Provider
      value={{
        query: query,
        setQuery,
        isQuerySubmitted: isQuerySubmitted,
        setIsQuerySubmitted,
      }}
    >
      {props.children}
    </context.Provider>
  );
}
