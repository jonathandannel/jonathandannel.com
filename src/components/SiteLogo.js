import React from "react"
import { Link } from "gatsby"

const SiteLogo = () => {
  return (
    <Link to={`/`}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="53.000000pt"
        height="53.000000pt"
        viewBox="0 0 53.000000 53.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        {" "}
        <g
          transform="translate(0.000000,53.000000) scale(0.100000,-0.100000)"
          fill="var(--logo)"
          stroke="none"
        >
          {" "}
          <path d="M280 517 c0 -1 9 -27 19 -57 11 -30 22 -76 26 -102 l7 -48 -38 0 c-72 -1 -167 -58 -200 -122 -23 -44 -18 -115 10 -143 75 -75 207 -19 242 102 23 81 16 261 -13 326 -13 27 -29 47 -37 47 -9 0 -16 -1 -16 -3z m47 -286 c-9 -80 -32 -135 -73 -171 -39 -34 -62 -37 -104 -15 -104 54 12 244 149 245 l34 0 -6 -59z"></path>{" "}
        </g>{" "}
      </svg>
    </Link>
  )
}

export default SiteLogo
