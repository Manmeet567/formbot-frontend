import { useState, useEffect } from "react";
import MainResponse from "../components/ResponseComponent/MainResponse";
import axios from "axios";
import { useParams } from "react-router-dom";

function Response() {
  const [formFlow, setFormFlow] = useState(null);
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);
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

  return (
    <div className="response open-sans">
      {loading && <p>Loading...</p>}
      {error ? <p>{error}</p> : <MainResponse formFlow={formFlow} />}
    </div>
  );
}

export default Response;
