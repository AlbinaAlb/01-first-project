//это ф-я чтобы избежать дублирования кода follow/unfollow
//ф-я вернет новый массив, который заменит старые свойства на newObjProps
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
  //еребираем юзеров
  return items.map((u) => {
    //если пользователь в стейте совпадает с  пользователем из action (на которого нажали), то 
    if (u[objPropName] === itemId) {
      //копируем юзера и меняем followed на true
      return { ...u, ...newObjProps }
    }
    return u
  })
}
