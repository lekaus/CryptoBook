import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import Layout from "../components/layout";

const Index = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>Here you can view the contacts at the address or leave your own</h1>
      <Button.Group>
        <Button primary onClick={() => router.push("/show")}>
          View
        </Button>
        <Button.Or text="||" />
        <Button positive onClick={() => router.push("/add")}>
          Add
        </Button>
      </Button.Group>
    </Layout>
  );
};

export default Index;
