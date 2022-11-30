import { useState } from 'react'
import cn from "classnames";
import styles from './Paginator.module.scss'
import stylesButton from '../../button/Button.module.scss'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }: PropsType) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

  let pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
  }

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