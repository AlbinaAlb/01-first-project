import React, { useState } from 'react'
import cn from "classnames";
import styles from './Paginator.module.scss'
import stylesButton from '../../button/Button.module.scss'

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
  //кол-во порций (напр 30) - т.е. 30 раз надо нажать next чтобы дойти до конца всех пользователей 30*10= 300 страниц юзеров
  //кол-во страниц юзеров(напр 300) / кол-во страниц юзеров, которые видно в одном промежутке-порции(10)
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

  //в массиве 30 порций по 10 страниц в одном
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
  }

  //определяем размер порций (кол-во страниц, которое видно в padinator, напр 10)
   let portionCount = Math.ceil(pagesCount / portionSize)
   let [portionNumber, setPortionNumber] = useState(1);
   let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
   let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <span>
          <button onClick={() => {setPortionNumber(portionNumber - 1)}}
            id="prev"
            className={stylesButton.button}></button>
          <label htmlFor="prev">&#8592;</label>
        </span>
      )}

      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span
              className={
                /* использование нескольких классов: 
              selectedPage - если текущая страница юзеров на экране = странице которую кликнул пользователь, тогда эта страница будет жирным шрифтом
              styles.pageNumber - в любом случае */
                cn(
                  { [styles.selectedPage]: currentPage === p },
                  styles.pageNumber
                )
              }
              key={p}
              onClick={(e) => {
                onPageChanged(p)
              }}>{p}</span>
          )
        })}
      {portionCount > portionNumber && (
        <span>
        <button onClick={() => { setPortionNumber(portionNumber + 1) }} 
          id="next"
          className={stylesButton.button}></button> 
          <label htmlFor="next">&#8594;</label>
        </span>
      )}
    </div>
  )
}

export default Paginator
