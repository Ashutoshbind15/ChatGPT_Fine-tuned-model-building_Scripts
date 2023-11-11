import OpenAI from "openai";
import "dotenv/config";

import axios from "axios";
import { v4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var apiUrl = "https://api.videoindexer.ai";
var apiKey = process.env.AZURE_INDEXER_API_KEY;
var accountId = process.env.AZURE_INDEXER_ACCOUNTID;
var accountLocation = "trial";

function createQueryString(parameters) {
  const searchParams = new URLSearchParams(parameters);
  return searchParams.toString();
}

async function getAccessToken() {
  const queryParams = createQueryString({
    allowEdit: "true",
  });

  const getAccountsRequest = await axios.get(
    `${apiUrl}/auth/${accountLocation}/Accounts/${accountId}/AccessToken?${queryParams}`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "x-ms-client-request-id": v4(),
      },
    }
  );

  const accessToken = getAccountsRequest.data.trim('"');
  return accessToken;
}

const videoIndexer = async () => {
  const accessToken = await getAccessToken();

  console.log(accessToken);

  //   const videoIndexerRequest = await axios.get(
  //     `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos`,
  //     {
  //       headers: {
  //         "Ocp-Apim-Subscription-Key": apiKey,
  //         "x-ms-client-request-id": require("uuid").v4(),
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );

  //   console.log(videoIndexerRequest);
};

videoIndexer();
