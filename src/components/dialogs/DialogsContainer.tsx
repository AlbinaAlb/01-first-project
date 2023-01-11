import { connect } from 'react-redux'
import { actions } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'


//ф-я мапит стейт на пропсы (превращает часть стейта в пропсы)
//настраивает свойства,которые мы берем из стейта
let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
} 

//compose ф-я, которая позволяет получить результат одной функци, а потом обработать его при помощи другой функции
//первые скобки это вызов ф-и, вторые скобки это ф-я которую вернул первый вызов compose
export default compose(
  //connect настраивает контейнерный компонент
  connect(mapStateToProps, {...actions}),
  //вызываем HOC и кладем ему в параметр Dialogs
  withAuthRedirect
)(Dialogs)
