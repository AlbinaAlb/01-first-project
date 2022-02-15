import React from 'react'
import styles from './users.module.scss'

let Users = (props) => {
   if (props.users.length === 0) {
        props.setUsers([
          {
            id: 1,
            photoUrl:
              'https://n1s2.starhit.ru/1c/2d/db/1c2ddba2542202e3d5110fe28d026247/444x460_0_d452e08326727590ca643629cd61da96@480x497_0xac120003_12278425171554311041.jpg',
            followed: false,
            fullName: 'Dmitry',
            status: 'I am a boss',
            location: { city: 'Minsk', country: 'Belarus' },
          },
          {
            id: 2,
            photoUrl:
              'https://icdn.lenta.ru/images/2019/12/18/16/20191218163928484/square_320_4228bbfbd5d3f7ba836392280aa08e35.jpg',
            followed: true,
            fullName: 'Sasha',
            status: 'I am a boss too',
            location: { city: 'Moscow', country: 'Russia' },
          },
          {
            id: 3,
            photoUrl:
              'https://vokrug.tv/pic/news/4/a/8/4/4a841c45250c749b1f106b1e493595d4.jpg',
            followed: false,
            fullName: 'Yuliya',
            status: 'I am a boss too',
            location: { city: 'Kiev', country: 'Ukraine' },
          },
        ])
    }
  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} alt="" className={styles.userPhoto} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id)
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id)
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
export default Users
