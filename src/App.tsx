/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, FC, ReactElement } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
import { DataProps } from "./App.types";

const App: FC = (): ReactElement => {
  const [people, setPeople] = useState<Array<DataProps>>(data);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index - 1);
    }, 3000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span> Reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, name, title, image, quote } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text color-black">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button
          type="button"
          className="prev"
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          className="next"
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default App;
