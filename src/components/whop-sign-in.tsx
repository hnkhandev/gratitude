"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

function WhopSignIn() {
  return (
    <Button
      onClick={async () => await signIn("whop")}
      className="gap-2 text-white bg-whop hover:bg-whop/90"
    >
      Sign in with <WhopLogo />
    </Button>
  );
}

function WhopLogo() {
  return (
    <svg viewBox="0 0 99 24" aria-hidden="true" className="h-6">
      <svg
        width="99"
        height="24"
        viewBox="0 0 2378 489"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-white"
          d="M1201.77 393H1268.67L1344.48 188.887H1345.32L1420.7 393H1488.46L1562.99 96.5699H1496.93L1446.53 301.53H1445.69L1373.69 96.5699H1316.53L1244.54 301.53H1243.69L1193.72 96.5699H1127.23L1201.77 393Z"
          fill="#0E0E0F"
        ></path>
        <path
          className="fill-white"
          d="M1581.97 393H1644.64V273.158C1644.64 240.55 1669.21 218.106 1705.62 218.106C1742.04 218.106 1764.06 238.856 1764.06 273.158V393H1826.74V264.688C1826.74 204.132 1783.54 162.208 1719.17 162.208C1689.53 162.208 1664.12 171.948 1645.49 189.734H1644.64V83.8657H1581.97V393Z"
          fill="#0E0E0F"
        ></path>
        <path
          className="fill-white"
          d="M1975.75 399.352C2049.85 399.352 2102.36 347.689 2102.36 280.78C2102.36 213.872 2049.85 162.208 1975.75 162.208C1902.06 162.208 1849.13 213.872 1849.13 280.78C1849.13 347.689 1902.06 399.352 1975.75 399.352ZM1975.75 344.301C1936.79 344.301 1911.8 317.199 1911.8 280.78C1911.8 244.361 1936.79 217.259 1975.75 217.259C2014.71 217.259 2039.69 244.361 2039.69 280.78C2039.69 317.199 2014.71 344.301 1975.75 344.301Z"
          fill="#0E0E0F"
        ></path>
        <path
          className="fill-white"
          d="M2125.75 488.281H2188.42V375.638H2189.27C2203.67 389.612 2231.62 399.352 2259.57 399.352C2326.05 399.352 2375.6 348.535 2375.6 280.78C2375.6 213.448 2325.63 162.208 2259.14 162.208C2230.35 162.208 2204.09 170.677 2186.73 188.463H2185.88V168.56H2125.75V488.281ZM2249.83 344.301C2215.1 344.301 2188.42 321.857 2188.42 294.755V266.382C2188.42 240.127 2216.37 217.683 2249.4 217.683C2287.09 217.683 2312.93 243.091 2312.93 280.78C2312.93 318.469 2286.67 344.301 2249.83 344.301Z"
          fill="#0E0E0F"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1003.02 76.2078C918.354 -8.17672 781.423 -8.06914 696.888 76.5306L354.531 417.638C447.396 498.99 588.093 495.694 675.597 408.123L1005 78.4698L1003.02 76.2078ZM344.279 78.0858C428.922 -6.62168 566.095 -6.62168 650.737 78.0858L653.31 80.6603L335.963 398.248L180.161 242.328L344.279 78.0858ZM160.446 222.68L5 68.4937C90.1271 -6.49094 219.927 -3.29357 301.244 78.0858L303.77 80.6131L160.446 222.68Z"
          className="fill-white"
        ></path>
      </svg>
    </svg>
  );
}

export default WhopSignIn;
