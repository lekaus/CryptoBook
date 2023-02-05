import { useRef, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../components/layout";
import { ethers } from "ethers";
import provider from "../provider";
import contactFactory from "../contactFactory";
import Contact from "../Contact";
import getContactByAddress from "../utils/getContactByAddress";

const ShowContact = () => {
  const [telegram, setTelegram] = useState();
  const [discord, setDiscord] = useState();
  const [desc, setDesc] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const addressRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = addressRef.current.value;
    setErrorMessage("");
    setTelegram("");
    setDiscord("");
    setDesc("");
    setLoading(true);
    if (!address) {
      setErrorMessage("The user's address is what we need...");
      return;
    }
    try {
      const contact = await getContactByAddress(address);
      setTelegram(contact.telegram);
      setDiscord(contact.discord);
      setDesc(contact.desc);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Enter the address here</label>
          <input ref={addressRef} placeholder="right here" />
        </Form.Field>
        <Button loading={isLoading} primary type="submit">
          View
        </Button>
        <Message error header="Well, what is it!" content={errorMessage} />
      </Form>
      {telegram && <h2>Telegram: {telegram}</h2>}
      {discord && <h2>Discord: {discord}</h2>}
      {desc && <h2>Description: {desc}</h2>}
    </Layout>
  );
};

export default ShowContact;
