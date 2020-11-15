import * as React from "react";
import { Providers, ProviderState } from "@microsoft/mgt";
import { Agenda, Login } from "@microsoft/mgt-react";

const useIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
};

const App: React.FunctionComponent = () => {
  const [isSignedIn] = useIsSignedIn();

  return (
    <div className="App">
      <header>
        <Login />
      </header>
      <div>{isSignedIn}</div>
      <div>{isSignedIn && <Agenda />}</div>
    </div>
  );
};

export default App;
