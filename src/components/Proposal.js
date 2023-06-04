import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";
import '../App.css';

const app_id = 1089;
const connection = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic({ connection });

const Proposal = () => {
  const { id } = useParams();
  const proposalContainerRef = useRef(null);

  const proposal_request = {
    proposal: 1,
    subscribe: 1,
    amount: 10,
    basis: "payout",
    contract_type: "CALL",
    currency: "USD",
    duration: 1,
    duration_unit: "m",
    symbol: id,
    barrier: "+0.1",
  };

  const proposalResponse = async (res) => {
    const data = JSON.parse(res.data);
    if (data.error !== undefined) {
      console.log("Error: %s ", data.error.message);
      connection.removeEventListener("message", proposalResponse, false);
      await api.disconnect();
    } else if (data.msg_type === "proposal") {
      if (proposalContainerRef.current) {
        proposalContainerRef.current.innerHTML = `
          <div class="proposal-card">
            <p><strong>Details:</strong> ${data.proposal.longcode}</p>
            <p><strong>Ask Price:</strong> ${data.proposal.display_value}</p>
            <p><strong>Payout:</strong> ${data.proposal.payout}</p>
            <p><strong>Spot:</strong> ${data.proposal.spot}</span></p>
          </div>
        `;
      }
    }
  };

  const getProposal = async () => {
    connection.addEventListener("message", proposalResponse);
    await api.proposal(proposal_request);
  };

  const unsubscribeProposal = () => {
    connection.removeEventListener("message", proposalResponse, false);
  };

  useEffect(() => {
    const proposal = document.querySelector("#proposal");
    proposal.addEventListener("click", getProposal);

    const proposal_unsubscribe = document.querySelector(
      "#proposal-unsubscribe"
    );
    proposal_unsubscribe.addEventListener("click", unsubscribeProposal);

    return () => {
      proposal.removeEventListener("click", getProposal);
      proposal_unsubscribe.removeEventListener("click", unsubscribeProposal);
    };
  }, [id]);

  return (
    <div>
      <button
        style={{
          border: "1px solid darkorchid",
          borderRadius: 5,
          margin: 10,
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: 15,
          fontFamily: "Montserrat",
          cursor: "pointer",
          backgroundColor: "darkorchid",
          color: "white",
          fontWeight: "bold",
          width: "95%",
        }}
        id="proposal"
        className="submitBtn"
      >
        Subscribe proposal
      </button>
      <button hidden id="proposal-unsubscribe" className="resetBtn">
        Unsubscribe proposal
      </button>
      <div ref={proposalContainerRef} id="proposalContainer"></div>
    </div>
  );
};

export default Proposal;
