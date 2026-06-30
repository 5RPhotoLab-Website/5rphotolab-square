import dotenv from "dotenv";
dotenv.config();
import pkg from "square";
const { SquareClient, SquareEnvironment } = pkg;

const isSandbox = process.env.SQUARE_ENV === "sandbox";

export const squareEnv = {
  environment: isSandbox ? "sandbox" : "production",
  baseUrl: isSandbox
    ? "https://connect.squareupsandbox.com/v2"
    : "https://connect.squareup.com/v2",
  accessToken: isSandbox
    ? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
    : process.env.SQUARE_PROD_ACCESS_TOKEN,
  locationId: isSandbox
    ? process.env.SQUARE_SANDBOX_LOCATION_ID
    : process.env.SQUARE_PROD_LOCATION_ID,
};

export const squareClient = new SquareClient({
  token: squareEnv.accessToken,
  environment: isSandbox ? SquareEnvironment.Sandbox : SquareEnvironment.Production,
});
