import React, { useState, useEffect } from 'react'

const ProfileStatusWithHooks = (props) => {
  //типа локальный стейт
  //useState возвращает массив
  //В первом элементе массива первое значение стейта, вторым элементом является ф-я которая будет изменять первый элемент.
  //Деструктурирующее присваивание : editMode = 0 элемент массива (false); setEditMode = 1 элемент (ф-я)
  let [editMode, setEditMode] = useState(false)
  //второй типа локальный стейт
  let [status, setStatusAction] = useState(props.status)

  // [] чтобы useEffect запускался не всегда, а только один раз в момент когда компонент самый первый раз вмонтировался 
  //или при изменении зависимости в нем
  useEffect(() => {
    setStatusAction(props.status)
  }, 
  //если статус при отрисовке будет другим, то эффект перезапустится
  [props.status])

  //при клике на span вызывается activateEditMode, которая меняет стейт на true, тогда вместо спана пояаится инпут
  const activateEditMode = () => {
    setEditMode(true)
  }
  //при потере фокуса инпутом, изменить стейт на false, тогда вместо инпута появится спан
   const deactivateEditMode = () => {
     setEditMode(false)
     props.updateStatus(status)
   }

const onStatusChange = (e) => {
  //узнаем новое значение (e.currentTarget.value) и меняем статус в локальном стейте
    setStatusAction(e.currentTarget.value)
}

  return (
    <div>
      {!editMode && (
        <div>
         <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
            autoFocus={true}
            value={status}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatusWithHooks
