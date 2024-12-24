import React, { useState } from "react";
import FormNavbar from "../components/FormComponents/FormNavbar/FormNavbar";
import EditForm from "../components/FormComponents/EditForm/EditForm";
import Response from "../components/FormComponents/Response/Response";

function Form() {
  const [currentTab, setCurrentTab] = useState("flow");

  return (
    <div className="form">
      <FormNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "flow" && <EditForm />}
      {currentTab === "response" && <Response />}
    </div>
  );
}

export default Form;
