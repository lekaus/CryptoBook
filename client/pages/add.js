import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/layout";
import provider from "../provider";
import contactFactory from "../contactFactory";

const AddContact = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!telegram) {
      setErrorMessage("at least please enter a Telegram");
    }
    const signer = provider.getSigner();
    const contactFactoryWithSigner = contactFactory.connect(signer);
    console.log(contactFactoryWithSigner.functions);
    try {
      let response;
      if (discord) {
        response = await contactFactoryWithSigner[
          "createContact(string,string)"
        ](telegram, discord);
      } else {
        response = await contactFactoryWithSigner["createContact(string)"](
          telegram
        );
      }
      console.log("response: ", response);
      setSuccessMessage("hash: " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <Form
        error={!!errorMessage}
        success={!!successMessage}
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Telegram"
            value={telegram}
            onChange={(event) => setTelegram(event.target.value)}
            placeholder="Enter here"
          />
          <Form.Field
            control={Input}
            label="Discord"
            value={discord}
            onChange={(event) => setDiscord(event.target.value)}
            placeholder="Enter here"
          />
        </Form.Group>
        <Button primary>save</Button>
        <Message
          style={{ wordBreak: "break-word" }}
          error
          header="Well, what is it!"
          content={errorMessage}
        />
        <Message success header="Success!" content={successMessage} />
      </Form>
    </Layout>
  );
};

export default AddContact;
