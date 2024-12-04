import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import MainContainer from "./MainContainer";

const AboutPage = () => {
  return (
    <MainContainer>
      <div className="mx-auto max-w-4xl px-4 py-8 leading-relaxed">
        <h1 className="sr-only">About QuickChat</h1>

        <img
          className="pointer-events-none mx-auto mb-6 w-full max-w-xs select-none"
          src="/images/quickchat-logo.png"
          alt="Convayto"
        />

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Project Overview</h2>
          <p>
            QuickChat is a real-time messaging application built with React.js and
            Supabase. It offers essential features such as user authentication,
            profile management, and instant messaging. Designed as a learning project,
            QuickChat demonstrates the key functionalities of modern chat applications,
            while focusing on clean and efficient coding practices.
          </p>

        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Goals</h2>
          <ul className="list-disc pl-5">
            <li>To provide a seamless real-time chatting experience.</li>
            <li>To ensure secure user authentication and data management.</li>
            <li>
              To deliver a responsive and user-friendly interface across various
              devices.
            </li>
            <li>
              To implement optimized performance with features like infinite
              pagination and prefetching.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Developer</h2>

          <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
            <img
              src="https://avatars.githubusercontent.com/u/156994715?s=400&u=5cf0f261f162933011e956d1487072726a4f7eb2&v=4"
              alt="Rald's Photo"
              className="h-36 w-36 rounded-md"
            />

            <div>
              <p className="mb-2">
                QuickChat is developed and maintained by{" "}
                <strong className="text-bgAccent dark:text-textAccent-dark">
                  raldpra
                </strong>
                , a passionate web developer dedicated to building and learning.
                Connect with me on LinkedIn, and GitHub.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-textAccent dark:text-textAccent-dark">
            <a
              href="https://www.linkedin.com/in/giraldi-prama-yudistira-032547234"
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
            <a
              href="https://github.com/giraldi07"
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 sm:grid-rows-1">
          <a
            href="https://github.com/giraldi07/quickchat"
            className="flex items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Source Code</span>
            <FaGithub className="ml-2" />
          </a>

          <a
            href="https:/quickchat.vercel.app"
            className="flex items-center justify-center rounded-lg bg-textAccent px-6 py-3 text-white hover:bg-textAccentDim dark:bg-textAccentDim dark:hover:bg-textAccentDim-dark"
            rel="noopener noreferrer"
          >
            <span>QuickChat</span>
            <MdOpenInNew className="ml-2" />
          </a>
        </section>

        <footer className="mt-6 text-center text-sm opacity-70">
          <p>
            © Copyright by{" "}
            <a
              href="https://www.linkedin.com/in/giraldi-prama-yudistira-032547234"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              raldpra
            </a>
            . Licensed under the Apache License 2.0. Do not claim as your own.
          </p>
        </footer>
      </div>
    </MainContainer>
  );
};

export default AboutPage;
