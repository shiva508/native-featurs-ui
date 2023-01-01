import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import SpStackNavigation from "./navigation/SpStackNavigation";
import { init } from "./util/database";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {});
  }, []);
  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="light" />
      <SpStackNavigation />
    </>
  );
}
