import React from 'react'

class ProfileStatus extends React.Component {
  //это обычное свойство,которое будет нашим локальным стейтом
  state = {
    editMode: false,
    //локальный стейт должен взять свое значение из приходящих пропсов
    status: this.props.status,
  }

  //при клике на спан editMode изменится на тру
  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    })
    //взять статус из стейта и передать в бизнес
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e) => {
    //узнаем новое значение (e.currentTarget.value) и меняем статус в локальном стейте
    this.setState({
      status: e.currentTarget.value,
    })
  }

  //метод работает когда меняются пропсы или стейт
  componentDidUpdate(prevProps, prevState) {
    //если новый статус не такой же как старый, то изменить статус в локальном стейте и вывести новый
    if(prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {/* если editMode = false, тогда  */}
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || '---'}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ProfileStatus
