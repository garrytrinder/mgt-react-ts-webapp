import * as React from "react";
import { Providers, ProviderState } from "@microsoft/mgt";
import { Get, Login, MgtTemplateProps } from "@microsoft/mgt-react";

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

const MyTemplate = (props: MgtTemplateProps) => {
  const user = props.dataContext;
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

const App: React.FunctionComponent = () => {
  const [isSignedIn] = useIsSignedIn();

  return (
    <div className="App">
      <header>
        <Login />
      </header>
      <pre>{isSignedIn ? "true" : "false"}</pre>
      {isSignedIn && (
        <Get resource="/me" version="v1.0" scopes={["User.Read"]}>
          <MyTemplate template="default" />
        </Get>
      )}
    </div>
  );
};

export default App;
