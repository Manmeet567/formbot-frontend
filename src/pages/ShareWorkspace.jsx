import { useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { addNewWorkspace } from "../redux/slices/authSlice";

function ShareWorkspace() {
  const { userData } = useSelector((state) => state.auth);
  const { inviteToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const validateInviteToken = async () => {
      try {
        const response = await apiClient.get(
          `/workspace/${inviteToken}/validate-invite`
        );
        const { workspaceId, ownerName } = response.data;
        toast.success("Workspace Added.");
        dispatch(addNewWorkspace({ ownerName, workspaceId }));
        navigate(`/workspace/${workspaceId}`);
      } catch (error) {
        console.error(error);
        toast.error("Invalid or expired invite token.");
        navigate(`/workspace/${userData?.workspaceAccess[0]._id}`);
      }
    };

    validateInviteToken();
  }, []);

  return <div className="poppins" style={{background:"var(--bg-color)", color:"var(--text-color)", padding:"50px", fontSize:"30px", height:"100vh"}}>Loading ...</div>;
}

export default ShareWorkspace;
