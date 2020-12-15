import React, { useEffect } from "react"
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
  ClojurescriptIcon,
} from "../components/Icons"

const IconWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  padding-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(40px, 40px));
`

const About = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 50)
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Layout location={location}>
      <h2>About me</h2>
      <p>
        I'm a software developer living in Toronto, Ontario. My day to day work
        primarily entails building React frontends and Node APIs, but I also
        have a keen interest in functional programming, WebGL, and machine
        learning. I'm a polyglot; I enjoy learning new programming languages and
        playing around with all sorts of different patterns, frameworks, and
        libraries. I'm learning Clojure at the moment, and I'm absolutely
        enamored of it.
      </p>
      <hr />
      <h2>Tech stack</h2>
      <h4>Work</h4>
      <IconWrapper>
        <TypescriptIcon />
        <ReactIcon />
        <ReduxIcon />
        <SqlIcon />
        <MongoIcon />
      </IconWrapper>
      <h4>Personal</h4>
      <IconWrapper>
        <PythonIcon />
        <RubyIcon />
        <RailsIcon />
        <ClojureIcon />
        <ClojurescriptIcon />
      </IconWrapper>
      <h4>Tools</h4>
      <IconWrapper>
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
        I discovered my love for tinkering with computers when I was about 10
        years old; I really enjoyed building computers and dabbling in
        HTML/Flash. Despite my early interest in tech, it wasn't until much
        later on in life that I decided to make a career out of it. I spent most
        of my early 20s writing, traveling, and doing volunteer work on organic
        farms. In 2014, I taught myself Ruby, and immediately realized that I
        had found my calling. Since then, I have been professionally involved in
        a number of exciting projects and codebases. I am extremely passionate
        about what I do, and I love working on challenging problems that allow
        me to hone my craft and think in new ways.
      </p>
      {/* <hr /> */}
      {/* <h2>Get in touch</h2>
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
      </IconWrapper> */}
    </Layout>
  )
}

export default About
