import Head from 'next/head'
import { useEffect, useState } from 'react';
import moment from 'moment-timezone'
import { duration } from 'moment'

const GOALTIME = "2020-09-10 16:00:00";

function getRemainingTime() {

  const goalDay = moment.tz(GOALTIME, "Europe/Prague");
  const today = moment.tz("Europe/Prague");

  if(goalDay.isBefore(today)){
    return {
      showPassword: true
    }
  }

  const clock = duration(goalDay.diff(today));

  return {
    showPassword: false,
    days: clock.days(),
    hours: clock.hours(),
    minutes: clock.minutes(),
    seconds: clock.seconds()
  }
}

const getPassword = async (setPassword) => {
  const res = await fetch("https://kristy.safar.dev/api/getpassword");
  const data = await res.json();
  setPassword({ password: data.password, received: data.received });
}

export default function Home() {
  const [time, setTime] = useState(getRemainingTime());
  const [password, setPassword] = useState({ value: { password: "Počkej ještě chvíli :-)", received: false }});

  useEffect(() => {
    const timer = setInterval(() => {
      const comingTime = getRemainingTime();
      setTime(comingTime);
      if (comingTime.showPassword){
        if (password.received){
          clearInterval(timer);
        }else{
          getPassword(setPassword);
        }
      }
    }, 1000);
    return () => { clearInterval(timer) }
  }, []);

  const passwordComponent = () => {
    if (time.showPassword) {
      return (
        <h1 className="title">
          {password.password}
        </h1>
      );
    } else {
      return (
      <h1 className="title">
        {addZeros(time.days)}:{addZeros(time.hours)}:{addZeros(time.minutes)}:{addZeros(time.seconds)}
      </h1>
      );
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Překvapení</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {passwordComponent()}
      </main>

      <footer>
        <a
          href="https://safar.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>Developed by <strong>safar.dev</strong></div>
        </a>
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

                .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 6rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

function addZeros(value) {
  const str = String(value);
  if (str.length < 2) {
    return `0${value}`;
  }
  return value;
}
