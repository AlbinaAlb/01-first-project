import { connect } from 'react-redux'
import {
  addMessageActionCreator,
  updateNewMessageTextActionCreator,
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

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
    updateNewMessageBody: () => {
      dispatch(addMessageActionCreator())
    },
    //изменения с новым текстом, который ввели в textarea идут в state
    sendMessage: (body) => {
      dispatch(updateNewMessageTextActionCreator(body))
    },
  }
}

//Dialogs законектили к стору
//connect настраивает контейнерный компонент, который служит оберткой для презентационного-чистого компонента Dialogs
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
