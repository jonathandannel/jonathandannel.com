import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { SocialIcon } from "react-social-icons"

import {
  TypescriptIcon,
  ReactIcon,
  RubyIcon,
  RailsIcon,
  ReduxIcon,
  ClojureIcon,
  SqlIcon,
  PythonIcon,
  LinuxIcon,
  VimIcon,
  MongoIcon,
  GitIcon,
  DockerIcon,
  DebianIcon,
  ExpressIcon,
  JavascriptIcon,
  WebpackIcon,
  NodeIcon,
  ClojurescriptIcon,
  MaterialUiIcon,
} from "../components/Icons"

const IconWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  padding-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(40px, 40px));
`

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <h2>Hey, I'm Jonathan</h2>
      <p>
        I'm a software developer living in Toronto, Ontario. My work is mostly
        focused on building React frontends and Node APIs, but I also have a
        keen interest in functional programming, WebGL, and machine learning.
        I'm a polyglot; I enjoy learning new programming languages and playing
        around with all sorts of different patterns, frameworks, and libraries.
        I'm learning Clojure at the moment, and I'm absolutely enamored of it.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <SocialIcon
            style={{ height: 32, width: 32, marginRight: "1em" }}
            url="http://linkedin.com/in/jonathandannel"
            bgColor={"var(--icons)"}
          />
          <SocialIcon
            style={{ height: 32, width: 32 }}
            url="http://github.com/jonathandannel"
            bgColor={"var(--icons)"}
          />
        </div>
      </div>

      <h2>What I've been up to</h2>
      <ul>
        <li>
          Full stack developer, API designer & mentor{" "}
          <a target="_blank" href="http://petobe.com">
            @ Petobe
          </a>{" "}
          (2020)
        </li>
        <li>
          Contract web developer & temp team lead{" "}
          <a target="_blank" href="http://guidelinesadvertising.com">
            @ Guidelines
          </a>{" "}
          (2020)
        </li>
        <li>
          Software engineer, internal tooling & contract w/ LoyaltyOne Canada{" "}
          <a target="_blank" href="http://quantummob.com">
            @ Quantum Mob
          </a>{" "}
          (2019)
        </li>
        <li>
          Full stack developer
          <a target="_blank" href="http://clausehound.com">
            @ Clausehound
          </a>{" "}
          (2018)
        </li>
        <li>
          Bootcamp grad, first place winner at demo day 🎉{" "}
          <a target="_blank" href="http://lighthouselabs.ca">
            @ Lighthouse Labs
          </a>{" "}
          (2018)
        </li>
      </ul>
      <hr />
      <h2>Tech stack</h2>
      <IconWrapper>
        <JavascriptIcon />
        <TypescriptIcon />
        <NodeIcon />
        <ExpressIcon />
        <ReactIcon />
        <ReduxIcon />
        <MaterialUiIcon />
        <SqlIcon />
        <MongoIcon />
        <WebpackIcon />
      </IconWrapper>
      <IconWrapper>
        <PythonIcon />
        <RubyIcon />
        <RailsIcon />
        <ClojureIcon />
        <ClojurescriptIcon />
        <VimIcon />
        <LinuxIcon />
        <DebianIcon />
        <GitIcon />
        <DockerIcon />
      </IconWrapper>
      <br />
      <hr />
      <h2>My story</h2>
      <p>
        I discovered my love for tinkering with tech when I was about 10 years
        old; I really enjoyed building computers, messing around with Linux, and
        taking apart electronics to see how they worked. Eager to experience
        life, I spent most of my early 20s writing, traveling, and doing
        volunteer work on organic farms. In 2014, I taught myself Ruby, and
        immediately realized that I had found my calling. Since then, I have
        been professionally involved in a number of exciting projects and
        codebases. I am extremely passionate about what I do, and I love working
        on challenging problems that allow me to hone my craft and think in new
        ways.
      </p>
    </Layout>
  )
}

export default About
