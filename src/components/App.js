import React, { useEffect, useState } from "react";

import ContentContainer from "./ContentContainer";
import Footer from "./Footer";
import { fetchGroups } from "../api/groups";

const App = () => {
  const [groups, setGroups] = useState([]);

  // Load groups when the component mounts.
  useEffect(() => {
    fetchGroups()
      .then((groups) => {
        setGroups(groups);
        console.debug(groups);
      })
      .catch(console.error);
    return; // Avoid useEffect async warning.
  }, []);

  return (
    <div>
      <ContentContainer groups={groups} />
      {groups.length > 0 && <Footer />}
    </div>
  );
};

export default App;
