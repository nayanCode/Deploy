import React, { useState, useEffect } from "react";
import "../App.css";

const Status = (props) => {
  const [steps, setsteps] = useState(props.studentDetails.status);

  return (
    <div>
      <h1>Status</h1>
      <h2>HASH GENERATED:{props.studentDetails.hash}</h2>
      <div class="container py-5">
        {steps == "1" && (
          <div class="main-timeline-4 text-black">
            <div class="timeline-4 left-4">
              <div class="card gradient-custom">
                <div class="card-body p-4">
                  <h2>Request Send to Admin</h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {steps == "2" && (
          <div>
            <div class="main-timeline-4 text-black">
              <div class="timeline-4 left-4">
                <div class="card gradient-custom">
                  <div class="card-body p-4">
                    <h2>Request Send to Admin</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="timeline-4 right-4">
              <div class="card gradient-custom">
                <div class="card-body p-4">
                  <h2>Request Accepted By Admin</h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {steps == "3" && (
       //   <div>
            <div class="main-timeline-4 text-black">
              <div class="timeline-4 left-4">
                <div class="card gradient-custom">
                  <div class="card-body p-4">
                    <h2>Request Send to Admin</h2>
                  </div>
                </div>
              </div>
            
            <div class="timeline-4 right-4">
              <div class="card gradient-custom-4">
                <div class="card-body p-4">
                  <h2>Request Accepted By Admin</h2>
                </div>
              </div>
            </div>
            <div class="timeline-4 left-4">
              <div class="card gradient-custom">
                <div class="card-body p-4">
                  <h2>Document Stored in BlockChain</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
