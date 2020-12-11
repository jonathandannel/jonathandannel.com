import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { SocialIcon } from "react-social-icons"

import {
  JavascriptIcon,
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
  ExpressIcon,
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
      <h2>About me</h2>
      <p>
        I'm a software developer living in Toronto, Ontario, Canada. My to day
        work primarily entails building React frontends and Node APIs, but I
        also have a keen interest in functional programming, WebGL, and machine
        learning. I'm a polyglot; I enjoy learning new programming languages and
        playing around with all sorts of different patterns, frameworks, and
        libraries. At the moment, I'm learning Clojure and am seriously
        infatuated with it.
      </p>
      <hr />
      <h2>Tech stack</h2>
      <h4>Work</h4>
      <IconWrapper>
        <JavascriptIcon />
        <TypescriptIcon />
        <ExpressIcon />
        <ReactIcon />
        <ReduxIcon />
        <SqlIcon />
      </IconWrapper>
      <h4>Personal</h4>
      <IconWrapper>
        <PythonIcon />
        <RubyIcon />
        <RailsIcon />
        <ClojureIcon />
        <VimIcon />
        <LinuxIcon />
      </IconWrapper>

      <br />
      <hr />
      <h2>My story</h2>
      <p>
        I discovered my love of tinkering with computers when I was about 10
        years old during a series of ill-fated overclocking experiments which
        ultimately led to building a new one from scratch. Despite my early
        affinity for tech, it wasn't until much later on in life that I actually
        decided to make a career out of it. I spent most of my 20s writing,
        traveling, and doing volunteer work on organic farms while picking away
        at university classes. In 2013, I taught myself Ruby, and immediately
        realized that I had found my calling. Since then, I have been
        professionally involved in a number of exciting projects and codebases.
        I am extremely passionate about what I do, and I love working on
        challenging problems that allow me to hone my craft and think in new
        ways.
      </p>
      <hr />
      <h2>Get in touch</h2>
      <IconWrapper>
        <SocialIcon
          url="http://linkedin.com/in/jonathandannel"
          style={{ height: 32, width: 32 }}
          bgColor={"var(--logo)"}
        />
        <SocialIcon
          style={{ height: 32, width: 32 }}
          url="http://github.com/jonathandannel"
          bgColor={"var(--logo)"}
        />
      </IconWrapper>
    </Layout>
  )
}

export default About
