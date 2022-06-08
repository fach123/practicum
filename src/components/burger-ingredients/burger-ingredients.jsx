import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import style from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/api";
import { useDrag } from "react-dnd";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState(0);
  const scrollBlock = useRef(null);
  const scrollLabel_bul = useRef(null);
  const scrollLabel_sauce = useRef(null);
  const scrollLabel_fillings = useRef(null);
  const scrollTabs = useRef(null);
  const { items } = useSelector((store) => store.api);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    console.log("render");
  }, [dispatch]);

  const setCurrentById = (i) => {
    if (current !== i) {
      console.log(current, i);
      setCurrent(i);
      console.log("change");
    }
  };

  const onScroll = (event) => {
    const block = scrollBlock.current;
    let scrollTop = block.scrollTop;

    /*refArray.forEach(function (item,index){
          const nextBlock = item.nextElementSibling;
          const posToNext = nextBlock.offsetTop+nextBlock.clientHeight/2-260;
          if(scrollTop > posToNext){
            setCurrentById(index);
          }
        })
        for(const element of labelOffsets){
      if(scrollTop > element){
        setCurrentById(index);
      }
    }*/
    //console.log(scrollTop,labelOffsets[0])
  };

  useEffect(() => {
    const block = scrollBlock.current;
    block.addEventListener("scroll", onScroll);
    return () => {
      block.removeEventListener("scroll", onScroll);
    };
  }, []);
  const scrollTo = (block) => {
    block.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const goToLabel = (e) => {
    switch (e) {
      case 0:
        setCurrent(e);
        scrollTo(scrollLabel_bul.current);
        break;
      case 1:
        setCurrent(e);
        scrollTo(scrollLabel_sauce.current);
        break;
      case 2:
        setCurrent(e);
        scrollTo(scrollLabel_fillings.current);
        break;
    }
  };
  const ShowItem = React.forwardRef(({ name, type }, ref) => {
    return (
      <>
        {Math.random()}
        <h3 ref={ref} className="text text_type_main-medium mt-10">
          {name}
        </h3>
        <div className={style.content_list}>
          <ShowBurgerIngredient
            filtered={items.filter((item) => item.type === type)}
          />
        </div>
      </>
    );
  });

  const ShowBurgerIngredient = ({ filtered }) => {
    return filtered.map((item) => (
      <BurgerIngredient key={item._id} {...item} />
    ));
  };

  return (
    <div className={`${style.inner} mr-10`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${style.tabs} mt-5`} ref={scrollTabs}>
        <Tab value={0} active={current === 0} onClick={goToLabel}>
          Булки
        </Tab>
        <Tab value={1} active={current === 1} onClick={goToLabel}>
          Соусы
        </Tab>
        <Tab value={2} active={current === 2} onClick={goToLabel}>
          Начинки
        </Tab>
      </div>
      <div ref={scrollBlock} className={`${style.content} custom-scroll`}>
        {
          <>
            <ShowItem name="Булки" type="bun" ref={scrollLabel_bul} />
            <ShowItem name="Соусы" type="sauce" ref={scrollLabel_sauce} />
            <ShowItem name="Начинки" type="main" ref={scrollLabel_fillings} />
          </>
        }
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  setOpenModal: PropTypes.func,
  openModal: PropTypes.object,
};

export default BurgerIngredients;
