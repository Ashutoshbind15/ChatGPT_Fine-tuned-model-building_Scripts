import "dotenv/config";
import axios from "axios";
import { v4 } from "uuid";

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

const uploadVideo = async (accessToken, videoUrl) => {
  const queryParams = createQueryString({
    name: "test",
    videoUrl: videoUrl,
  });

  const { data } = await axios.post(
    `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos?${queryParams}`,
    null,
    {
      headers: {
        "x-ms-client-request-id": v4(),
        Authorization: `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    }
  );

  console.log(data);
};

const analyzeVideo = async (accessToken, videoId) => {
  const queryParams = createQueryString({
    language: "English",
  });

  const { data } = await axios.get(
    `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos/${videoId}/Index?${queryParams}`,
    {
      headers: {
        "x-ms-client-request-id": v4(),
        Authorization: `Bearer ${accessToken}`,
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    }
  );

  console.log(data);
};

const videoIndexer = async () => {
  const accessToken = await getAccessToken();
  const videourl = process.env.VIDEO_URL;

  // await uploadVideo(accessToken, videourl);

  const videoId = process.env.DEMO_VIDEO_UPLOAD_ID;
  await analyzeVideo(accessToken, videoId);
};

videoIndexer();
