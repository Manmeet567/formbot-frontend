import { useState, useEffect } from "react";
import MainResponse from "../components/ResponseComponent/MainResponse";
import axios from "axios";
import { useParams } from "react-router-dom";

function Response() {
  const [formFlow, setFormFlow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [responseId, setResponseId] = useState();

  const { formId } = useParams();

  useEffect(() => {
    const fetchFormFlow = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/response/${formId}/get-flow`
        );
        setFormFlow(response.data.flow);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch form flow");
        setLoading(false);
      }
    };

    if (formId) {
      fetchFormFlow();
    }
  }, []);

  const handleSubmitAndUpdateResponse = async (responses) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/response/update-response`,
        { responseId, formId, responses }
      );
      setResponseId(response.data.responseId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="response open-sans">
      {loading && <p>Loading...</p>}
      {error ? (
        <p>{error}</p>
      ) : (
        <MainResponse
          formFlow={formFlow}
          handleSubmitAndUpdateResponse={handleSubmitAndUpdateResponse}
        />
      )}
    </div>
  );
}

export default Response;
