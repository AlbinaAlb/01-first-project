import React from 'react'
import styles from './Paginator.module.scss'

let Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  //кол-во юзеров на странице
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < 10) {
      pages.push(i)
    }
  }
  
  return (
    <div>
      {pages.map((p, index) => {
        return (
          <span key={`p_${index}`}
            className={currentPage === p && styles.selectedPage}
            onClick={(e) => {
              onPageChanged(p)
            }}
          >
            {p}
          </span>
        )
      })}
    </div>
  )
}

export default Paginator
