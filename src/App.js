import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import TableForm from "./components/TableForm";
import Form from "./components/Form";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Form />
      </ApolloProvider>
    </div>
  );
}

export default App;
