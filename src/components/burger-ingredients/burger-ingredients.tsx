import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import { ShowItem } from "./show-item-ingredient";
import Preloader from "../preloader/preloader";
import {useAppSelector} from "../types";

const BurgerIngredients = (): JSX.Element => {
  const [current, setCurrent] = useState("bul");
  const currentTabRef = useRef("");
  currentTabRef.current = current;
  const scrollBlock = useRef<HTMLDivElement>(null);
  const scrollLabel_bul = useRef<HTMLDivElement>(null);
  const scrollLabel_sauce = useRef<HTMLDivElement>(null);
  const scrollLabel_fillings = useRef(null); //no use
  const scrollTabs = useRef(null);
  const { items } = useAppSelector((store) => store.api);

  const setCurrentById = useCallback((name: string) => {
    if (currentTabRef.current !== name) {
      setCurrent(name);
      console.log(`changed from ${currentTabRef.current} to ${name}`);
    }
  }, []);

  const onScroll = useCallback(() => {
    if (scrollLabel_bul.current && scrollLabel_sauce.current) {
      const rectBul = scrollLabel_bul.current.getBoundingClientRect();
      const rectSauce = scrollLabel_sauce.current.getBoundingClientRect();
      //let rectFillings = scrollLabel_fillings.current.getBoundingClientRect();
      if (rectBul.y < 150 && rectSauce.y > 150) {
        setCurrentById("sauce");
      } else if (rectSauce.y < 150) {
        setCurrentById("fillings");
      } else {
        setCurrentById("bul");
      }
    }
  }, [setCurrentById]);

  useEffect(() => {
    const block = scrollBlock.current;
    if (block) {
      block.addEventListener("scroll", onScroll);
      return () => {
        block.removeEventListener("scroll", onScroll);
      };
    }
  }, [onScroll]);
  const scrollTo = (block: HTMLDivElement | null) => {
    if (block) {
      block.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const goToLabel = (e: React.SetStateAction<string>) => {
    switch (e) {
      case "bul":
        setCurrent(e);
        scrollTo(scrollLabel_bul.current);
        break;
      case "sauce":
        setCurrent(e);
        scrollTo(scrollLabel_sauce.current);
        break;
      case "fillings":
        setCurrent(e);
        scrollTo(scrollLabel_fillings.current);
        break;
      default:
        setCurrent("bul");
        break;
    }
  };

  return (
    <div className={`${style.inner} mr-10`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${style.tabs} mt-5`} ref={scrollTabs}>
        <Tab value={"bul"} active={current === "bul"} onClick={goToLabel}>
          Булки
        </Tab>
        <Tab value={"sauce"} active={current === "sauce"} onClick={goToLabel}>
          Соусы
        </Tab>
        <Tab
          value={"fillings"}
          active={current === "fillings"}
          onClick={goToLabel}
        >
          Начинки
        </Tab>
      </div>
      <div ref={scrollBlock} className={`${style.content} custom-scroll`}>
        {items.length > 0 ? (
          <>
            <ShowItem name="Булки" type="bun" ref={scrollLabel_bul} />
            <ShowItem name="Соусы" type="sauce" ref={scrollLabel_sauce} />
            <ShowItem name="Начинки" type="main" ref={scrollLabel_fillings} />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
