import { connect } from 'react-redux'
import {addMessageActionCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { compose } from 'redux'


//ф-я мапит стейт на пропсы (превращает часть стейта в пропсы)
//настраивает свойства,которые мы берем из стейта
let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

//настраивает колбэки, которые мы будем отправлять в презент.компонент
let mapDispatchToProps = (dispatch) => {
  return {
    //достаем из textarea введенное в него значение
    sendMessage: (newMessageText) => {
      dispatch(addMessageActionCreator(newMessageText))
    }
  }
}

//compose ф-я, которая позволяет получить результат одной функци, а потом обработать его при помощи другой функции
//первые скобки это вызов ф-и, вторые скобки это ф-я которую вернул первый вызов compose
export default compose(
  //connect настраивает контейнерный компонент
  connect(mapStateToProps, mapDispatchToProps),
  //вызываем HOC и кладем ему в параметр Dialogs
  withAuthRedirect
)(Dialogs)
