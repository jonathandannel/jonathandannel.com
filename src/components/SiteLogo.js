import React from "react"
import { Link } from "gatsby"

const SiteLogo = m => {
  return (
    <Link to={`/`}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={m ? 50 : 75}
        height={m ? 50 : 75}
        viewBox="0 0 75.000000 75.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        {" "}
        <g
          transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
          fill="var(--logo)"
          stroke="none"
        >
          {" "}
          <path d="M30 400 l0 -320 75 0 c73 0 75 1 75 25 0 23 -4 25 -45 25 l-45 0 0 270 0 270 45 0 c41 0 45 2 45 25 0 24 -2 25 -75 25 l-75 0 0 -320z"></path>{" "}
          <path d="M565 695 c0 -23 4 -25 43 -25 l42 0 0 -270 0 -270 -42 0 c-39 0 -43 -2 -43 -25 0 -24 2 -25 73 -25 l72 0 0 320 0 320 -72 0 c-71 0 -73 -1 -73 -25z"></path>{" "}
          <path d="M341 646 c-17 -20 -6 -63 18 -71 35 -11 52 5 49 44 -3 30 -7 36 -29 39 -14 2 -31 -4 -38 -12z"></path>{" "}
          <path d="M340 301 c0 -230 -2 -237 -60 -229 -27 4 -30 2 -30 -24 0 -26 3 -28 40 -28 49 0 84 16 99 44 7 13 12 103 13 234 l3 212 -32 0 -33 0 0 -209z"></path>{" "}
        </g>{" "}
      </svg>
    </Link>
  )
}

export default SiteLogo
