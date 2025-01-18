import "./CheckResponses.css";
import { useSelector } from "react-redux";
import { LuCalendar } from "react-icons/lu";
import DoughnutChart from "./DoughnutChart";
import { useEffect } from "react";

function CheckResponses({ flow }) {
  const { activeForm, responses } = useSelector((state) => state.form);
  useEffect(() => {
    console.log(responses);
  }, [responses])

  const completeResponses = responses.filter(
    (response) => response.status === "completed"
  ).length;
  const incompleteResponses = responses.filter(
    (response) => response.status === "incomplete"
  ).length;
  const totalResponses = completeResponses + incompleteResponses;
  const completionRate = totalResponses
    ? ((completeResponses / totalResponses) * 100).toFixed(2)
    : 0;

  return (
    <div className="check-responses open-sans">
      {responses?.length > 0 && (
        <div>
          <div className="cr-views-bar">
            <div className="crvb">
              <p>Views</p>
              <p>{activeForm?.visitCount}</p>
            </div>
            <div className="crvb">
              <p>Starts</p>
              <p>{responses?.length}</p>
            </div>
          </div>

          <div className="cr-data-table-wrapper">
            <div className="cr-data-table">
              <table className="crdt-table">
                <thead>
                  <tr>
                    <th className="table-serial-number"></th>
                    <th
                      style={{
                        minWidth: "180px",
                      }}
                    >
                      <LuCalendar
                        style={{
                          fontSize: "20px",
                          marginRight: "5px",
                          paddingTop: "5px",
                        }}
                      />
                      Submitted At
                    </th>
                    {flow
                      ?.filter((header) => header.field !== "Button")
                      .map((header, index) => (
                        <th key={index} style={{ minWidth: "150px" }}>
                          {header.field}
                        </th>
                      ))}
                    <th style={{ minWidth: "150px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response, index) => (
                    <tr key={response._id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(response.submittedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short", // short month name (e.g., "Dec")
                            day: "numeric", // numeric day (e.g., "29")
                          }
                        )}
                        ,{" "}
                        {new Date(response.submittedAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric", // numeric hour
                            minute: "numeric", // numeric minutes
                            hour12: true, // 12-hour clock with AM/PM
                          }
                        )}
                      </td>
                      {flow
                        ?.filter((header) => header.field !== "Button")
                        .map((header, idx) => {
                          const correspondingResponse = response.responses.find(
                            (item) => item._id === header._id
                          );
                          return (
                            <td key={idx}>
                              {correspondingResponse &&
                                correspondingResponse.fieldValue}
                            </td>
                          );
                        })}
                      <td>{response.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-and-percentage">
            <DoughnutChart
              completeResponses={completeResponses}
              incompleteResponses={incompleteResponses}
            />
            <div className="completion-rate">
              <p>Completion Rate</p>
              <p>{completionRate}%</p>
            </div>
          </div>
        </div>
      )}

      {responses?.length == 0 && (
        <div className="no-responses">
          <p className="inter">No Response yet collected</p>
        </div>
      )}
    </div>
  );
}

export default CheckResponses;
